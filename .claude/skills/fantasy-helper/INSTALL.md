# Fantasy Helper Skill

סקיל לקבלת החלטות בפנטזי FPL / ליגת האלופות (ספורט5) / מונדיאל.

## התקנה גלובלית (מומלץ)

הסקיל יהיה זמין בכל פרויקט שתפתח עם Claude Code:

```bash
mkdir -p ~/.claude/skills
cp -r .claude/skills/fantasy-helper ~/.claude/skills/
```

## התקנה ברמת פרויקט בלבד

הקבצים כבר ב-`.claude/skills/fantasy-helper/` — Claude Code יזהה אותם אוטומטית כשתפתח את הפרויקט הזה.

## אימות שהסקיל פועל

פתח את Claude Code בפרויקט (או בכל פרויקט אחר אם התקנת גלובלית) וכתוב משהו כמו:
- "מי הקפטן השבוע ב-FPL?"
- "אני שוקל wildcard בליגת החלומות"
- "איך לבנות סגל למונדיאל?"

הסקיל אמור להיטרגר אוטומטית.

## מבנה הקבצים

```
fantasy-helper/
├── SKILL.md              ← entry point + workflow
├── fpl.md                ← FPL specifics + API reference
├── champions-league.md   ← פנטזי ספורט5
├── world-cup.md          ← פנטזי FIFA 2026
├── sources.md            ← בלוגים ומקורות חיים לכל ליגה
└── scripts/
    └── fpl_fetch.py      ← FPL API helper (Python stdlib only)
```

## בדיקה ידנית של סקריפט ה-FPL

```bash
python3 .claude/skills/fantasy-helper/scripts/fpl_fetch.py current-gw
python3 .claude/skills/fantasy-helper/scripts/fpl_fetch.py top-ep --pos MID --limit 10
```

> אם הסקריפט מחזיר HTTP 403, ה-IP נחסם ע"י Cloudflare (קורה בחלק מסביבות ענן). הסקיל יודע ליפול חזרה ל-`WebFetch` כתשתית חלופית.

## שמירת Team ID של FPL

```bash
python3 .claude/skills/fantasy-helper/scripts/fpl_fetch.py config-set --team-id <YOUR_TEAM_ID>
```

ה-ID נשמר ב-`~/.fantasy/config.json`.
