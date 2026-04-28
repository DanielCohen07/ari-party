# מקורות לקריאה לפני המלצה

חוקי שימוש:
- **תמיד קרא לפחות 2-3 מקורות מהליגה הרלוונטית** לפני שנותנים המלצה למחזור הנוכחי
- **עדיפות לתוכן מה-72 שעות האחרונות** — חדשות פציעות וציטוטי מאמן
- אם paywall או blocked, רשום בפלט "מקור X לא נגיש" וקח מקורות חינמיים
- צטט בסוף הפלט את כל מה שנקרא בפועל

## FPL — Fantasy Premier League

### Tier 1 — לקרוא תמיד
- **r/FantasyPL** — `https://www.reddit.com/r/FantasyPL/` ספציפית הפוסטים: `[Gameweek N Discussion]`, `[Captain Poll GW N]`, `[Daily Discussion]`. דעות מאות אלפי מנג'רים.
- **Fantasy Football Scout** — `https://www.fantasyfootballscout.co.uk/` ה-Gameweek Preview, Scout Picks, ו-Daily Press Conference Notes. חלק paywall (Members), אבל הרבה תוכן חינמי.
- **FPL Form** — `https://www.fplform.com/` סטטיסטיקת form, fixture difficulty, EP מחושב.
- **FPL Reddit Stats Bot** — מקורות אגרגציה של בלוגים שונים בפוסט הסקירה השבועי.

### Tier 2 — קרא אם זמן מאפשר או כדי לאמת
- **Ben Crellin** — `https://twitter.com/BenCrellin` — תוצאות BPS, prediction צמודות
- **FFScout Pundits** (Pras, Az, Mark Sutherns) — וידאו previews
- **FPL Family** — YouTube channel
- **Magnus Carlsen FPL** — נדיר אבל חזק כשפעיל
- **Let's Talk FPL** — YouTube
- **OpenGoal Football App** — captain polls

### Press conferences — קריטי לפציעות
- חיפוש ב-WebSearch: `"<club> press conference <date>"` — האזן לציטוטים על שחקנים ספציפיים
- **PremierInjuries.com** — `https://www.premierinjuries.com/` — מסד פציעות מתעדכן

### Fixtures & data
- **Fantasy.PremierLeague.com /api/bootstrap-static** — official EP, prices, status
- **Premier League official** — `https://www.premierleague.com/fixtures` ל-fixtures מאומתים
- **Understat** — `https://understat.com/` — xG, xA, xGI

## CL — פנטזי ליגת האלופות (ספורט5)

### Tier 1
- **UEFA.com Champions League** — fixtures, lineups רשמיים, סטטיסטיקה
  - `https://www.uefa.com/uefachampionsleague/`
- **FotMob** — `https://www.fotmob.com/` — predicted lineups, xG, סטטיסטיקה מתעדכנת
- **WhoScored** — `https://www.whoscored.com/` — דירוגים ופרדיקציות
- **r/FantasyChampionsLeague** — קהילה קטנה אבל זה השלב הכי קרוב לקהילת פנטזי UCL

### Tier 2
- **Fantasy Football Scout — UCL Hub** (כשקיים)
- **Twitter @FantasyUCL, @CL_Fantasy_Tips**
- **TransferMarkt** — סטטוס פציעות ושעות
- **בעברית**: כתבות פנטזי בספורט5/ONE/וואלה ספורט לקראת המחזור

### Press releases
- חפש ב-WebSearch: `"<club> Champions League injury news"` 24-48 שעות לפני משחק
- בדוק Twitter רשמי של מועדונים לציטוטים על rotation

## WC — פנטזי מונדיאל

### Tier 1
- **fantasy.fifa.com** — האתר הרשמי. price changes, ownership, deadline.
- **Fantasy Football Scout — World Cup Hub** — לקראת ובמהלך הטורניר
- **FIFA.com / FIFA app** — predicted lineups, fixtures, נתוני שחקנים רשמיים
- **r/FantasyMondial** או r/FantasyFootballScout — שרשור פנטזי מונדיאל

### Tier 2
- **BBC Sport, ESPN, The Athletic** — ניתוחי פרה-משחק
- **Twitter @WorldCupFantasy, @FFScout**
- **Squads.com / TransferMarkt** — סגלים ופציעות

### לפני הטורניר
- חיפוש: `"World Cup 2026 squads <country>"` — סגלים סופיים
- חיפוש: `"World Cup 2026 fantasy team selection"` — בנייה ראשונית

## תהליך מומלץ לקריאה (per gameweek)

לכל המלצה משמעותית, הפעל את הזרימה:

1. **WebSearch ספציפי למחזור** (3-4 שאילתות):
   - `"FPL gameweek <N> tips"` (החלף ל-`UCL fantasy round <N>` / `World Cup matchday <N>`)
   - `"<league> captain <gameweek>"`
   - `"<league> injuries <date>"`
   - `"<league> price changes <gameweek>"` (FPL בלבד)

2. **WebFetch** ל-2-3 התוצאות הכי איכותיות (FFScout, Reddit threads, news outlet רשמי)

3. **API/data fetch**:
   - FPL: הרץ `scripts/fpl_fetch.py` ל-bootstrap, fixtures, ו-team
   - CL/WC: קרא נתונים מצילום או שאל

4. **Cross-check פציעות 24 שעות אחרונות** — חובה לפני המלצה סופית

5. **רק אז** כתוב את הפלט בפורמט הסטנדרטי
