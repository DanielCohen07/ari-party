# Fantasy Premier League — Reference

## Season basics (current as of 2025/26)

- 15 שחקנים בסגל: 2 GK, 5 DEF, 5 MID, 3 FWD
- תקציב פתיחה: £100m
- Starting XI חוקי: 1 GK + 3-5 DEF + 2-5 MID + 1-3 FWD
- מקסימום 3 שחקנים מאותה קבוצה
- Free transfers: עד 5 צבירה (cap הועלה החל מ-2024/25)
- Hit: -4 נקודות לכל transfer מעבר לזכאות
- 38 GWs, חוקי DGW/BGW נקבעים על בסיס דחיות
- צ'יפים: Wildcard ×2 (אחד לפני GW20, אחד אחרי), Free Hit ×2, Bench Boost ×2, Triple Captain ×2, **Assistant Manager** (חדש בעונה האחרונה — בודק את חוקי העונה הנוכחית בעת השימוש)

> ⚠️ **תמיד וודא חוקי עונה ב-`bootstrap-static`** — חוקי הצ'יפים והתקציב משתנים בין עונות. השדה `chips` ב-API מציג מה זמין כעת.

## FPL Public API endpoints

ה-API ציבורי, ללא אימות, JSON. השתמש ב-`scripts/fpl_fetch.py` או `WebFetch` ישירות.

> ⚠️ **Cloudflare**: ייתכן ש-IP מסוימים יקבלו 403. אם הסקריפט נכשל עם 403, נסה `WebFetch` של אותו URL כ-fallback — זה רץ בתשתית של Claude וה-headers שלו לרוב עוברים.

| מטרה | URL |
| --- | --- |
| כל השחקנים, קבוצות, ו-events | `https://fantasy.premierleague.com/api/bootstrap-static/` |
| Fixtures (אופציונלי `?event=N`) | `https://fantasy.premierleague.com/api/fixtures/` |
| היסטוריה ופרטי שחקן | `https://fantasy.premierleague.com/api/element-summary/{player_id}/` |
| היסטוריית מנג'ר | `https://fantasy.premierleague.com/api/entry/{team_id}/history/` |
| picks למחזור ספציפי | `https://fantasy.premierleague.com/api/entry/{team_id}/event/{gw}/picks/` |
| transfers היסטוריה | `https://fantasy.premierleague.com/api/entry/{team_id}/transfers/` |
| Live nieuws של המחזור | `https://fantasy.premierleague.com/api/event/{gw}/live/` |
| ליגות קלאסיות | `https://fantasy.premierleague.com/api/leagues-classic/{league_id}/standings/` |

### שדות שימושיים ב-`bootstrap-static.elements[]` (כל שחקן)

- `id`, `web_name`, `team`, `element_type` (1=GK, 2=DEF, 3=MID, 4=FWD)
- `now_cost` (×0.1m), `cost_change_event`
- `form`, `points_per_game`, `total_points`
- `selected_by_percent` (ownership), `transfers_in_event`, `transfers_out_event`
- `ep_this`, `ep_next` — **Expected Points רשמי של FPL למחזור הנוכחי והבא**
- `chance_of_playing_this_round` (75/50/25/0 או null), `news`, `status` (a/d/i/n/s/u)
- `ict_index`, `expected_goals`, `expected_assists`, `expected_goal_involvements`
- `minutes`, `starts`, `bonus`, `bps`

### Status codes

- `a` — available
- `d` — doubtful (קרא `news` ו-`chance_of_playing_this_round`)
- `i` — injured
- `s` — suspended
- `u` — unavailable (עזב את הליגה)
- `n` — not in squad

## Saving Team ID

קובץ קונפיגורציה: `~/.fantasy/config.json`

```json
{
  "fpl": {
    "team_id": 1234567
  }
}
```

זרימת קבלה:
1. בפעם הראשונה שאתה צריך FPL team data, בדוק `~/.fantasy/config.json`. אם לא קיים — צור.
2. אם אין `fpl.team_id`, **שאל את המשתמש**: "מה ה-FPL Team ID שלך? תוכל למצוא אותו בכתובת בדף הקבוצה (fantasy.premierleague.com/entry/<ID>/event/<GW>)."
3. שמור אחרי הקבלה.

```bash
mkdir -p ~/.fantasy
# כתוב/עדכן את הקובץ — אל תדרוס שדות אחרים
```

## Decision frameworks

### Captain choice

מטריקות לדירוג (סדר חשיבות):
1. `ep_this` של ה-API (הבסיס).
2. תיקון ידני: כפול ×1.05-1.15 אם המשחק ביתי מול תחתית הטבלה, ÷1.05-1.10 אם חוץ מול top-6 או fixture שני ב-DGW.
3. **רוטציה / שירות נבחרת** — הקטן בהתאם.
4. Set-piece duties (penalty taker רשמי = +0.3 EP).
5. Form 5 משחקים אחרונים (`form`).
6. Ownership — **לא משפיע על EP** אבל משפיע על rank-protection בליגות.

ב-DGW: שקול Triple Captain רק אם שני המשחקים home + FDR ≤ 3 לכל אחד + השחקן בטוח ב-90 דקות בשניהם.

### Transfers

המלץ על hit -4 רק אם **EP delta ≥ 4 על פני 3-4 GWs** של ההעברה.

חישוב פשוט:
```
delta = (EP_in_gw1 + EP_in_gw2 + ...) - (EP_out_gw1 + EP_out_gw2 + ...)
```

עבור משבר פציעות (`status == 'i'` או `chance_of_playing_this_round <= 25`), המעבר כמעט תמיד מוצדק גם ללא hit ייצור EP חיובי.

### Chip strategy

- **Wildcard 1 (לפני GW20)**: השתמש לפני fixture swing משמעותי, לרוב GW8-12.
- **Wildcard 2 (אחרי GW20)**: שמור ל-DGW ענקי או תחילת קמפיין שני (לרוב GW28+).
- **Free Hit**: BGW עם 4+ blanks, או DGW מבודד.
- **Bench Boost**: רק כשכל ה-15 משחקים ויש להם FDR ממוצע ≤ 3. דורש סגל מלא וחזק על הספסל.
- **Triple Captain**: DGW + Premium asset + 2 fixtures ביתיים נוחים.

## Known biases to flag

- **Recency bias**: form גבוה אחרי 2 משחקים ≠ ראיה מספקת.
- **Ownership chase**: חזרת template אחרי שבוע גרוע — ודא ש-EP מצדיק, לא רק חרדה מ-rank.
- **Differential trap**: ownership <5% עם EP זהה לשחקן template — האפסייד ב-rank קטן יחסית לסיכון.

## Useful queries

תמיד למחזור הנוכחי, השתמש בסקריפט:
```bash
python3 ~/.claude/skills/fantasy-helper/scripts/fpl_fetch.py current-gw
python3 ~/.claude/skills/fantasy-helper/scripts/fpl_fetch.py top-ep --gw <N> --pos MID --limit 15
python3 ~/.claude/skills/fantasy-helper/scripts/fpl_fetch.py team --team-id <ID> --gw <N>
python3 ~/.claude/skills/fantasy-helper/scripts/fpl_fetch.py fixtures --gw <N>
python3 ~/.claude/skills/fantasy-helper/scripts/fpl_fetch.py player --name "Salah"
```
