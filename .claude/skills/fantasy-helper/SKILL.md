---
name: fantasy-helper
description: Decision support for fantasy football across Fantasy Premier League (FPL), Sport5 Champions League fantasy ("ליגת החלומות"), and FIFA World Cup fantasy. Use when the user asks for help picking a captain/vice-captain, planning transfers/trades, deciding when to play a chip (Wildcard / Bench Boost / Triple Captain / Free Hit), drafting or building a squad, or evaluating a player. Triggers on Hebrew terms like "פנטזי", "קפטן", "ויס קפטן", "העברה", "טרייד", "צ'יפ", "וויילדקארד", "ליגת החלומות", "פנטזי פרמייר ליג", "פנטזי מונדיאל", and English equivalents. Pulls live data from the official FPL API plus relevant blogs/news for the specific gameweek, and balances short-term GW value with long-term planning.
---

# Fantasy Helper

עוזר החלטות לפנטזי שלוש ליגות:
1. **FPL** — Fantasy Premier League (הרשמי)
2. **CL** — פנטזי ליגת האלופות של ספורט5 ("ליגת החלומות")
3. **WC** — פנטזי מונדיאל (FIFA World Cup Fantasy)

המשתמש דובר עברית. **פלט**: סיכום + נימוקים בעברית, נתונים/שמות שחקנים/מטריקות באנגלית.
**גישת סיכון**: מאוזנת — סיכון חכם רק כשהאפסייד מצדיק.

## When to use

הפעל כשהמשתמש מבקש החלטה אופרטיבית בפנטזי, כולל אך לא רק:
- בחירת קפטן / ויס-קפטן למחזור הבא
- העברות (transfers / trades), כולל hit של -4 או יותר
- שימוש בצ'יפ: Wildcard, Free Hit, Bench Boost, Triple Captain, Limitless, Assistant Manager (FPL), או צ'יפים ספציפיים ל-CL/WC
- בניית קבוצה ראשונית / Draft / חוקי תקציב
- שאלות פר-שחקן ("האם להוציא את X לטובת Y?")
- בחירת פורמציה ויצירת lineup

## Operating workflow

עבוד לפי הסדר הזה — אל תקצר שלבים אלא אם המשתמש כבר סיפק את המידע.

### 1. זהה את הליגה

אם המשתמש לא ציין במפורש, שאל בקצרה: "FPL, ליגת האלופות (ספורט5), או מונדיאל?"
לכל ליגה יש קובץ הנחיות נפרד — קרא אותו כשזיהית:
- FPL → קרא `fpl.md`
- ליגת האלופות → קרא `champions-league.md`
- מונדיאל → קרא `world-cup.md`

### 2. זהה את סוג ההחלטה

קטגוריות:
- **Captain/VC** — בחירת קפטן + ויס לקראת המחזור
- **Transfers** — מי נכנס, מי יוצא, האם hit של -4 משתלם
- **Chips** — מתי ואיך להפעיל צ'יפ
- **Build/Draft** — סגל מאפס או עדכון מבני
- **Player evaluation** — שאלה ספציפית על שחקן

### 3. אסוף מידע על הקבוצה

סדר עדיפות לאיסוף נתוני הקבוצה:

1. **FPL Team ID** — אם המשתמש סיפק או שמור ב-`~/.fantasy/config.json`, השתמש ב-`scripts/fpl_fetch.py` כדי למשוך את הסגל, יתרת הבנק, free transfers, היסטוריית chips, ו-EP לכל שחקן. אם אין ID שמור, שאל פעם אחת ושמור אותו (ראה `fpl.md` § "Saving Team ID").
2. **צילום מסך** — אם המשתמש העלה צילום מסך מהאפליקציה, קרא ממנו את הסגל, התקציב, וה-fixtures הנראים. זה הזרימה העיקרית ל-CL ו-WC.
3. **שאלות** — רק אם אין צילום ואין ID. שאל בקצרה: סגל נוכחי (15 שחקנים ל-FPL, מותאם לליגה האחרת), בנק, free transfers, צ'יפים זמינים, lineup קודם.

עבור פנטזי ספורט5 — לא ידוע על Team ID ציבורי. ברירת המחדל: צילום מסך או שאלות. אם תיתקל בקושי במזהי שחקנים, **שאל את המשתמש** במקום לנחש.

### 4. אסוף מידע חי לאותו מחזור

זה החלק שלא מקצרים. למחזור הספציפי הנוכחי:

#### FPL
- הרץ `scripts/fpl_fetch.py bootstrap` ו-`scripts/fpl_fetch.py fixtures --gw <N>` כדי לקבל: כל השחקנים, ep_this/ep_next, מחירים, form, status (פציעה/ספק), הסיכוי לשחק (chance_of_playing_this_round), ICT, fixtures והדירוג שלהם (FDR).
- קרא בלוגים/מקורות לפי `sources.md` § FPL — לפחות 2-3 מקורות איכותיים למחזור הנוכחי. השתמש ב-`WebFetch` לדפים ספציפיים שאתה כבר מכיר, וב-`WebSearch` ("FPL gameweek N captaincy", "FPL injury news GW N", "FPL price changes GW N") לחדשות טריות, פציעות, רוטציה, והודעות מאמן (presser quotes).
- בדוק: **DGW/BGW** (Double/Blank Gameweeks) קרובים, fixture swings ל-5 מחזורים קדימה.

#### CL (ספורט5)
- קרא `champions-league.md`. אם המשתמש לא העלה צילום, בקש lineup וערכים.
- חפש דרך WebSearch בעברית: "פנטזי ליגת האלופות מחזור X טיפים ספורט5", "פנטזי החלומות קפטן".
- קרא מהאתר של ספורט5 אם דף הפנטזי מציג נתונים פתוחים (price, form, ownership). הימנע ממידע ב-paywall.
- בדוק את הרכבי הקבוצות, פציעות, וסטטיסטיקות מ-UEFA.com / FotMob / WhoScored.

#### WC (מונדיאל)
- קרא `world-cup.md`.
- מקורות: `fantasy.fifa.com`, FFScout World Cup hub, Reddit r/FantasyMondial, חדשות נבחרות פציעות.
- בפנטזי מונדיאל דאג להבנות את התקציב סביב fixtures group stage, ולהבין את החוקים הספציפיים של הצ'יפים שלו (לרוב Limitless ו-Wildcard לכל שלב).

### 5. הצלב מידע למחזור + ארוך טווח

**מחזור נוכחי**: צפי דקות, יריב, FDR, form, EP, חדשות פציעות / השעיות / רוטציה.
**ארוך טווח (5+ מחזורים)**: רצף fixtures, swings צפויים, חזרת שחקנים מפציעות, חלונות העברה.

**אל תיתן המלצה שמשפרת את המחזור הנוכחי על חשבון 4 הבאים** — אלא אם זה הטריגר המוצהר (כגון Triple Captain).

### 6. כתוב את הפלט

פורמט קבוע (ראה דוגמה למטה):

```
## המלצה
<משפט אחד ברור: מה לעשות עכשיו>

## נתוני מפתח (GW <N>)
| שחקן | מחיר | form | EP | יריב | FDR | minutes risk |
| --- | --- | --- | --- | --- | --- | --- |

## נימוק
<2-4 משפטים בעברית — למה זה הכי חכם, למה לא ההמלצה הברורה האחרת>

## אלטרנטיבות
- Plan B: <שם> — <למה זה אחר, ומתי הוא עדיף>
- Plan C (differential, ownership <10%): <שם> — <upside ו-downside>

## סיכונים
- <Risk 1>: <impact, mitigation>
- <Risk 2>: ...

## תחזית EP
- ההמלצה: <X.X EP>
- חלופה הקרובה: <Y.Y EP>
- (ל-FPL: השתמש ב-ep_this/ep_next; אחרת חישוב גס: avg_pts_last_5 * fixture_multiplier)

## ראייה ארוכת טווח
<אם ההמלצה משנה את התמונה ל-3-5 מחזורים, ציין מסלול: "GW N: זה. GW N+1: לשקול X. GW N+2: ...">

## מקורות שנקראו
- <bullet של כל URL/בלוג שנקרא בפועל>
```

### 7. אזהרות סטנדרטיות

לפני שליחה, וודא:
- **לא המצאת שחקנים, מחירים או fixtures**. אם API נכשל או חסר נתון, הצהר במפורש.
- **fixtures**: שמור על העובדה שמחזור FPL = שבוע, מחזור CL = round של ה-league phase, מחזור WC = matchday קבוצתי או ko round.
- **Deadline**: ציין את המועד האחרון לשינויים אם הוא נראה ב-API/אתר.
- **Chips already used**: אל תמליץ על צ'יפ שהמשתמש כבר ניצל בעונה.

## Files in this skill

- `SKILL.md` — הקובץ הזה, הזרימה הראשית
- `fpl.md` — פרטי FPL (API endpoints, חוקי בונוס, צ'יפים, שמירת Team ID)
- `champions-league.md` — פנטזי ליגת האלופות בספורט5
- `world-cup.md` — פנטזי מונדיאל
- `sources.md` — בלוגים, פודקאסטים, ומקורות חדשות לכל ליגה
- `scripts/fpl_fetch.py` — סקריפט שליפה מה-FPL API הציבורי

## Examples

### דוגמה 1: שאלת קפטן ב-FPL

**משתמש**: "מי הקפטן השבוע?"

**זרימה**:
1. שאל איזו ליגה (אם לא ברור) → "FPL".
2. אם יש Team ID שמור: הרץ fetch + bootstrap. אחרת בקש Team ID או lineup.
3. הרץ `WebSearch "FPL captain GW <N>"`, קרא 1-2 תוצאות מובילות. הוסף `WebFetch` לבלוג FFScout אם יש GW preview.
4. בנה את הטבלה: 3-4 candidates עם EP, fixture, ownership.
5. החזר פלט בפורמט הסטנדרטי.

### דוגמה 2: Wildcard ב-CL

**משתמש**: "אני שוקל לפתוח wildcard בליגת החלומות, שווה?"

**זרימה**:
1. ליגה = CL → טען `champions-league.md`.
2. בקש צילום של הסגל הנוכחי + התקציב + lineup של הקבוצות הקרובות.
3. WebSearch בעברית + אנגלית למידע על הסיבוב הקרוב + פציעות.
4. בנה team מומלץ פוסט-WC, השווה ל-team הנוכחי.
5. אם הדלתא ב-EP ל-3 הסיבובים הבאים < ערך השמירה של הצ'יפ ל-late stage — המלץ לדחות.
