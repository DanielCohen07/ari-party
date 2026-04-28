#!/usr/bin/env python3
"""FPL API helper for the fantasy-helper skill.

Public, unauthenticated endpoints. Pulls bootstrap-static, fixtures, team picks,
and player details. Outputs JSON or formatted tables for the agent to consume.

Usage:
  fpl_fetch.py current-gw
  fpl_fetch.py bootstrap [--raw]
  fpl_fetch.py fixtures [--gw N]
  fpl_fetch.py top-ep [--gw N] [--pos GK|DEF|MID|FWD] [--limit 15] [--max-cost 15.0]
  fpl_fetch.py team [--team-id ID] [--gw N]
  fpl_fetch.py player --name "Salah"
  fpl_fetch.py config-set --team-id ID
  fpl_fetch.py config-show
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

API = "https://fantasy.premierleague.com/api"
CONFIG_PATH = Path.home() / ".fantasy" / "config.json"

POS_MAP = {1: "GK", 2: "DEF", 3: "MID", 4: "FWD"}
POS_NAME_TO_ID = {v: k for k, v in POS_MAP.items()}
STATUS_LABEL = {
    "a": "available",
    "d": "doubtful",
    "i": "injured",
    "s": "suspended",
    "u": "unavailable",
    "n": "not in squad",
}


USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)


def http_get(url: str) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        if e.code == 403:
            die(
                f"HTTP 403 for {url}. The FPL API may be Cloudflare-blocked from this network. "
                "Try from a different network, or fall back to WebFetch in the agent."
            )
        die(f"HTTP {e.code} for {url}: {e.reason}")
    except urllib.error.URLError as e:
        die(f"Network error for {url}: {e.reason}")


def die(msg: str) -> None:
    print(f"error: {msg}", file=sys.stderr)
    sys.exit(1)


def load_config() -> dict:
    if not CONFIG_PATH.exists():
        return {}
    try:
        return json.loads(CONFIG_PATH.read_text())
    except json.JSONDecodeError:
        die(f"config at {CONFIG_PATH} is not valid JSON")
        return {}


def save_config(cfg: dict) -> None:
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    CONFIG_PATH.write_text(json.dumps(cfg, indent=2))


def get_team_id(cli_value: int | None) -> int:
    if cli_value:
        return cli_value
    cfg = load_config()
    tid = cfg.get("fpl", {}).get("team_id")
    if not tid:
        die("no team_id provided and none saved. Run: fpl_fetch.py config-set --team-id <ID>")
    return tid


def bootstrap() -> dict:
    return http_get(f"{API}/bootstrap-static/")


def current_gw_from_bootstrap(b: dict) -> int:
    for ev in b["events"]:
        if ev.get("is_current"):
            return ev["id"]
    for ev in b["events"]:
        if ev.get("is_next"):
            return ev["id"]
    return b["events"][0]["id"]


def cmd_current_gw(args):
    b = bootstrap()
    gw = current_gw_from_bootstrap(b)
    ev = next(e for e in b["events"] if e["id"] == gw)
    print(json.dumps({
        "gw": gw,
        "name": ev["name"],
        "deadline_time": ev["deadline_time"],
        "is_current": ev.get("is_current", False),
        "is_next": ev.get("is_next", False),
        "average_entry_score": ev.get("average_entry_score"),
        "highest_score": ev.get("highest_score"),
    }, indent=2))


def cmd_bootstrap(args):
    b = bootstrap()
    if args.raw:
        print(json.dumps(b))
        return
    summary = {
        "total_players": b["total_players"],
        "events_count": len(b["events"]),
        "teams_count": len(b["teams"]),
        "elements_count": len(b["elements"]),
        "phases": [p["name"] for p in b["phases"]],
        "current_gw": current_gw_from_bootstrap(b),
    }
    print(json.dumps(summary, indent=2))


def cmd_fixtures(args):
    url = f"{API}/fixtures/"
    if args.gw:
        url += f"?event={args.gw}"
    fx = http_get(url)
    b = bootstrap()
    teams = {t["id"]: t["short_name"] for t in b["teams"]}
    rows = []
    for f in fx:
        rows.append({
            "id": f["id"],
            "gw": f.get("event"),
            "kickoff": f.get("kickoff_time"),
            "home": teams.get(f["team_h"]),
            "away": teams.get(f["team_a"]),
            "home_fdr": f.get("team_h_difficulty"),
            "away_fdr": f.get("team_a_difficulty"),
            "finished": f.get("finished"),
            "score": f"{f.get('team_h_score')}-{f.get('team_a_score')}" if f.get("finished") else None,
        })
    print(json.dumps(rows, indent=2))


def cmd_top_ep(args):
    b = bootstrap()
    teams = {t["id"]: t["short_name"] for t in b["teams"]}
    elements = b["elements"]
    pos_id = POS_NAME_TO_ID.get(args.pos.upper()) if args.pos else None

    def ep_value(e):
        # Use ep_next when args.gw is not the current GW or by default; else ep_this
        if args.gw is None:
            return float(e.get("ep_next") or 0)
        cur = current_gw_from_bootstrap(b)
        if args.gw == cur:
            return float(e.get("ep_this") or 0)
        return float(e.get("ep_next") or 0)

    filtered = []
    for e in elements:
        if pos_id and e["element_type"] != pos_id:
            continue
        if args.max_cost and (e["now_cost"] / 10.0) > args.max_cost:
            continue
        if e.get("status") in ("u", "n"):
            continue
        filtered.append(e)

    filtered.sort(key=ep_value, reverse=True)
    rows = []
    for e in filtered[: args.limit]:
        rows.append({
            "name": e["web_name"],
            "team": teams.get(e["team"]),
            "pos": POS_MAP[e["element_type"]],
            "cost": e["now_cost"] / 10.0,
            "form": float(e["form"] or 0),
            "ppg": float(e["points_per_game"] or 0),
            "ep_this": float(e.get("ep_this") or 0),
            "ep_next": float(e.get("ep_next") or 0),
            "ownership_%": float(e["selected_by_percent"] or 0),
            "status": STATUS_LABEL.get(e["status"], e["status"]),
            "chance_this": e.get("chance_of_playing_this_round"),
            "news": e.get("news") or None,
            "xgi_per90": float(e.get("expected_goal_involvements_per_90") or 0),
            "ict": float(e.get("ict_index") or 0),
        })
    print(json.dumps(rows, indent=2, ensure_ascii=False))


def cmd_team(args):
    team_id = get_team_id(args.team_id)
    b = bootstrap()
    gw = args.gw or current_gw_from_bootstrap(b)
    teams = {t["id"]: t["short_name"] for t in b["teams"]}
    el_by_id = {e["id"]: e for e in b["elements"]}

    picks = http_get(f"{API}/entry/{team_id}/event/{gw}/picks/")
    history = http_get(f"{API}/entry/{team_id}/history/")

    chips_used = [c["name"] for c in history.get("chips", [])]
    current = next((h for h in history.get("current", []) if h["event"] == gw), None)

    rows = []
    for p in picks["picks"]:
        e = el_by_id[p["element"]]
        rows.append({
            "slot": p["position"],
            "name": e["web_name"],
            "team": teams.get(e["team"]),
            "pos": POS_MAP[e["element_type"]],
            "cost": e["now_cost"] / 10.0,
            "is_captain": p["is_captain"],
            "is_vice": p["is_vice_captain"],
            "multiplier": p["multiplier"],
            "ep_this": float(e.get("ep_this") or 0),
            "ep_next": float(e.get("ep_next") or 0),
            "status": STATUS_LABEL.get(e["status"], e["status"]),
            "chance_this": e.get("chance_of_playing_this_round"),
            "news": e.get("news") or None,
        })

    output = {
        "team_id": team_id,
        "gw": gw,
        "active_chip": picks.get("active_chip"),
        "chips_used": chips_used,
        "bank": picks["entry_history"]["bank"] / 10.0,
        "team_value": picks["entry_history"]["value"] / 10.0,
        "free_transfers": current.get("event_transfers") if current else None,
        "points": picks["entry_history"]["points"],
        "total_points": picks["entry_history"]["total_points"],
        "rank": picks["entry_history"]["rank"],
        "overall_rank": picks["entry_history"]["overall_rank"],
        "picks": rows,
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))


def cmd_player(args):
    b = bootstrap()
    teams = {t["id"]: t["short_name"] for t in b["teams"]}
    needle = args.name.lower()
    matches = [
        e for e in b["elements"]
        if needle in e["web_name"].lower()
        or needle in e["first_name"].lower()
        or needle in e["second_name"].lower()
    ]
    if not matches:
        die(f"no player matches '{args.name}'")
    rows = []
    for e in matches[:10]:
        detail = http_get(f"{API}/element-summary/{e['id']}/")
        recent_history = detail.get("history", [])[-5:]
        rows.append({
            "id": e["id"],
            "name": f"{e['first_name']} {e['second_name']}",
            "web_name": e["web_name"],
            "team": teams.get(e["team"]),
            "pos": POS_MAP[e["element_type"]],
            "cost": e["now_cost"] / 10.0,
            "form": float(e["form"] or 0),
            "ppg": float(e["points_per_game"] or 0),
            "total_points": e["total_points"],
            "ep_this": float(e.get("ep_this") or 0),
            "ep_next": float(e.get("ep_next") or 0),
            "ownership_%": float(e["selected_by_percent"] or 0),
            "transfers_in_event": e["transfers_in_event"],
            "transfers_out_event": e["transfers_out_event"],
            "status": STATUS_LABEL.get(e["status"], e["status"]),
            "chance_this": e.get("chance_of_playing_this_round"),
            "news": e.get("news") or None,
            "minutes": e.get("minutes"),
            "starts": e.get("starts"),
            "xg": float(e.get("expected_goals") or 0),
            "xa": float(e.get("expected_assists") or 0),
            "last_5": [
                {
                    "gw": h["round"],
                    "minutes": h["minutes"],
                    "points": h["total_points"],
                    "bonus": h["bonus"],
                    "bps": h["bps"],
                }
                for h in recent_history
            ],
            "upcoming_fixtures": [
                {
                    "gw": f.get("event"),
                    "opponent": teams.get(f.get("team_a") if f.get("is_home") else f.get("team_h")),
                    "home": f.get("is_home"),
                    "fdr": f.get("difficulty"),
                }
                for f in detail.get("fixtures", [])[:5]
            ],
        })
    print(json.dumps(rows, indent=2, ensure_ascii=False))


def cmd_config_set(args):
    cfg = load_config()
    cfg.setdefault("fpl", {})
    if args.team_id:
        cfg["fpl"]["team_id"] = args.team_id
    save_config(cfg)
    print(json.dumps(cfg, indent=2))


def cmd_config_show(args):
    cfg = load_config()
    print(json.dumps(cfg, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("current-gw")

    p_boot = sub.add_parser("bootstrap")
    p_boot.add_argument("--raw", action="store_true")

    p_fix = sub.add_parser("fixtures")
    p_fix.add_argument("--gw", type=int)

    p_top = sub.add_parser("top-ep")
    p_top.add_argument("--gw", type=int)
    p_top.add_argument("--pos", choices=["GK", "DEF", "MID", "FWD", "gk", "def", "mid", "fwd"])
    p_top.add_argument("--limit", type=int, default=15)
    p_top.add_argument("--max-cost", type=float)

    p_team = sub.add_parser("team")
    p_team.add_argument("--team-id", type=int)
    p_team.add_argument("--gw", type=int)

    p_player = sub.add_parser("player")
    p_player.add_argument("--name", required=True)

    p_cfg_set = sub.add_parser("config-set")
    p_cfg_set.add_argument("--team-id", type=int)

    sub.add_parser("config-show")

    args = parser.parse_args()
    handlers = {
        "current-gw": cmd_current_gw,
        "bootstrap": cmd_bootstrap,
        "fixtures": cmd_fixtures,
        "top-ep": cmd_top_ep,
        "team": cmd_team,
        "player": cmd_player,
        "config-set": cmd_config_set,
        "config-show": cmd_config_show,
    }
    handlers[args.cmd](args)


if __name__ == "__main__":
    main()
