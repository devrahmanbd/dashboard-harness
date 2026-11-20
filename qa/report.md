# Dashboard QA report

- Run: 2026-11-20T20:55:42.571Z → 2026-11-20T20:58:32.405Z
- Staging: https://staging.qubickle.com (branch staging/c-followup-4 @ 1faddc1d)
- Widths: 1440 / 1280 / 768 / 390 / 375px, deviceScaleFactor 2, viewport height 900px
- Signed in as: owner-a@test.lovable.dev (seed owner)

## Verdict

PASS (automated) — 15 manual check(s) still need a human eye

Counts: 115 pass / 0 fail / 15 manual (automated checks only; manual checks are listed separately below).

## Results

| Check | Page | Width | Result | Detail | Screenshot |
|---|---|---|---|---|---|
| a: no horizontal overflow | dashboard | 1440 | **PASS** | scrollWidth=1440 innerWidth=1440 | qa/screenshots/1440/dashboard.png |
| d: no raw identifiers | dashboard | 1440 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1440/dashboard.png |
| h: upcoming count agrees with schedule rows | dashboard | 1440 | **MANUAL** | UPCOMING=2 but no schedule rows detected | qa/screenshots/1440/dashboard.png |
| i: exactly one sidebar item active | dashboard | 1440 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1440/dashboard.png |
| j: no header status pills clipped/overlapping | dashboard | 1440 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1440/dashboard.png |
| a: no horizontal overflow | calendar | 1440 | **PASS** | scrollWidth=1440 innerWidth=1440 | qa/screenshots/1440/calendar.png |
| d: no raw identifiers | calendar | 1440 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1440/calendar.png |
| i: exactly one sidebar item active | calendar | 1440 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1440/calendar.png |
| j: no header status pills clipped/overlapping | calendar | 1440 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1440/calendar.png |
| a: no horizontal overflow | billing | 1440 | **PASS** | scrollWidth=1440 innerWidth=1440 | qa/screenshots/1440/billing.png |
| d: no raw identifiers | billing | 1440 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1440/billing.png |
| i: exactly one sidebar item active | billing | 1440 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1440/billing.png |
| j: no header status pills clipped/overlapping | billing | 1440 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1440/billing.png |
| a: no horizontal overflow | bookings | 1440 | **PASS** | scrollWidth=1440 innerWidth=1440 | qa/screenshots/1440/bookings.png |
| d: no raw identifiers | bookings | 1440 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1440/bookings.png |
| e: no monospace in bookings table | bookings | 1440 | **PASS** | 0 of 65 cells use a mono font | qa/screenshots/1440/bookings.png |
| f: dates without seconds | bookings | 1440 | **PASS** | no HH:MM:SS times visible | qa/screenshots/1440/bookings.png |
| g: no duplicate lifecycle rows | bookings | 1440 | **MANUAL** | lifecycle section found but no rows detected | qa/screenshots/1440/bookings.png |
| i: exactly one sidebar item active | bookings | 1440 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1440/bookings.png |
| j: no header status pills clipped/overlapping | bookings | 1440 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1440/bookings.png |
| c: book page reaches the time step | book | 1440 | **MANUAL** | no full-screen error, but no time slots detected — judge on the screenshot | qa/screenshots/1440/book.png |
| a: no horizontal overflow | book | 1440 | **PASS** | scrollWidth=1440 innerWidth=1440 | qa/screenshots/1440/book.png |
| d: no raw identifiers | book | 1440 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1440/book.png |
| a: no horizontal overflow | home | 1440 | **PASS** | scrollWidth=1440 innerWidth=1440 | qa/screenshots/1440/home.png |
| b: home page loads | home | 1440 | **PASS** | no error state; page rendered (2401 chars visible) | qa/screenshots/1440/home.png |
| d: no raw identifiers | home | 1440 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1440/home.png |
| a: no horizontal overflow | dashboard | 1280 | **PASS** | scrollWidth=1280 innerWidth=1280 | qa/screenshots/1280/dashboard.png |
| d: no raw identifiers | dashboard | 1280 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1280/dashboard.png |
| h: upcoming count agrees with schedule rows | dashboard | 1280 | **MANUAL** | UPCOMING=2 but no schedule rows detected | qa/screenshots/1280/dashboard.png |
| i: exactly one sidebar item active | dashboard | 1280 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1280/dashboard.png |
| j: no header status pills clipped/overlapping | dashboard | 1280 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1280/dashboard.png |
| a: no horizontal overflow | calendar | 1280 | **PASS** | scrollWidth=1280 innerWidth=1280 | qa/screenshots/1280/calendar.png |
| d: no raw identifiers | calendar | 1280 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1280/calendar.png |
| i: exactly one sidebar item active | calendar | 1280 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1280/calendar.png |
| j: no header status pills clipped/overlapping | calendar | 1280 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1280/calendar.png |
| a: no horizontal overflow | billing | 1280 | **PASS** | scrollWidth=1280 innerWidth=1280 | qa/screenshots/1280/billing.png |
| d: no raw identifiers | billing | 1280 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1280/billing.png |
| i: exactly one sidebar item active | billing | 1280 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1280/billing.png |
| j: no header status pills clipped/overlapping | billing | 1280 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1280/billing.png |
| a: no horizontal overflow | bookings | 1280 | **PASS** | scrollWidth=1280 innerWidth=1280 | qa/screenshots/1280/bookings.png |
| d: no raw identifiers | bookings | 1280 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1280/bookings.png |
| e: no monospace in bookings table | bookings | 1280 | **PASS** | 0 of 65 cells use a mono font | qa/screenshots/1280/bookings.png |
| f: dates without seconds | bookings | 1280 | **PASS** | no HH:MM:SS times visible | qa/screenshots/1280/bookings.png |
| g: no duplicate lifecycle rows | bookings | 1280 | **MANUAL** | lifecycle section found but no rows detected | qa/screenshots/1280/bookings.png |
| i: exactly one sidebar item active | bookings | 1280 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/1280/bookings.png |
| j: no header status pills clipped/overlapping | bookings | 1280 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/1280/bookings.png |
| c: book page reaches the time step | book | 1280 | **MANUAL** | no full-screen error, but no time slots detected — judge on the screenshot | qa/screenshots/1280/book.png |
| a: no horizontal overflow | book | 1280 | **PASS** | scrollWidth=1280 innerWidth=1280 | qa/screenshots/1280/book.png |
| d: no raw identifiers | book | 1280 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1280/book.png |
| a: no horizontal overflow | home | 1280 | **PASS** | scrollWidth=1280 innerWidth=1280 | qa/screenshots/1280/home.png |
| b: home page loads | home | 1280 | **PASS** | no error state; page rendered (2401 chars visible) | qa/screenshots/1280/home.png |
| d: no raw identifiers | home | 1280 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/1280/home.png |
| a: no horizontal overflow | dashboard | 768 | **PASS** | scrollWidth=768 innerWidth=768 | qa/screenshots/768/dashboard.png |
| d: no raw identifiers | dashboard | 768 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/768/dashboard.png |
| h: upcoming count agrees with schedule rows | dashboard | 768 | **MANUAL** | UPCOMING=2 but no schedule rows detected | qa/screenshots/768/dashboard.png |
| i: exactly one sidebar item active | dashboard | 768 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/768/dashboard.png |
| j: no header status pills clipped/overlapping | dashboard | 768 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/768/dashboard.png |
| a: no horizontal overflow | calendar | 768 | **PASS** | scrollWidth=768 innerWidth=768 | qa/screenshots/768/calendar.png |
| d: no raw identifiers | calendar | 768 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/768/calendar.png |
| i: exactly one sidebar item active | calendar | 768 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/768/calendar.png |
| j: no header status pills clipped/overlapping | calendar | 768 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/768/calendar.png |
| a: no horizontal overflow | billing | 768 | **PASS** | scrollWidth=768 innerWidth=768 | qa/screenshots/768/billing.png |
| d: no raw identifiers | billing | 768 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/768/billing.png |
| i: exactly one sidebar item active | billing | 768 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/768/billing.png |
| j: no header status pills clipped/overlapping | billing | 768 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/768/billing.png |
| a: no horizontal overflow | bookings | 768 | **PASS** | scrollWidth=768 innerWidth=768 | qa/screenshots/768/bookings.png |
| d: no raw identifiers | bookings | 768 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/768/bookings.png |
| e: no monospace in bookings table | bookings | 768 | **PASS** | 0 of 65 cells use a mono font | qa/screenshots/768/bookings.png |
| f: dates without seconds | bookings | 768 | **PASS** | no HH:MM:SS times visible | qa/screenshots/768/bookings.png |
| g: no duplicate lifecycle rows | bookings | 768 | **MANUAL** | lifecycle section found but no rows detected | qa/screenshots/768/bookings.png |
| i: exactly one sidebar item active | bookings | 768 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/768/bookings.png |
| j: no header status pills clipped/overlapping | bookings | 768 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/768/bookings.png |
| c: book page reaches the time step | book | 768 | **MANUAL** | no full-screen error, but no time slots detected — judge on the screenshot | qa/screenshots/768/book.png |
| a: no horizontal overflow | book | 768 | **PASS** | scrollWidth=768 innerWidth=768 | qa/screenshots/768/book.png |
| d: no raw identifiers | book | 768 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/768/book.png |
| a: no horizontal overflow | home | 768 | **PASS** | scrollWidth=768 innerWidth=768 | qa/screenshots/768/home.png |
| b: home page loads | home | 768 | **PASS** | no error state; page rendered (2320 chars visible) | qa/screenshots/768/home.png |
| d: no raw identifiers | home | 768 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/768/home.png |
| a: no horizontal overflow | dashboard | 390 | **PASS** | scrollWidth=390 innerWidth=390 | qa/screenshots/390/dashboard.png |
| d: no raw identifiers | dashboard | 390 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/390/dashboard.png |
| h: upcoming count agrees with schedule rows | dashboard | 390 | **MANUAL** | UPCOMING=2 but no schedule rows detected | qa/screenshots/390/dashboard.png |
| i: exactly one sidebar item active | dashboard | 390 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/390/dashboard.png |
| j: no header status pills clipped/overlapping | dashboard | 390 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/390/dashboard.png |
| a: no horizontal overflow | calendar | 390 | **PASS** | scrollWidth=390 innerWidth=390 | qa/screenshots/390/calendar.png |
| d: no raw identifiers | calendar | 390 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/390/calendar.png |
| i: exactly one sidebar item active | calendar | 390 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/390/calendar.png |
| j: no header status pills clipped/overlapping | calendar | 390 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/390/calendar.png |
| a: no horizontal overflow | billing | 390 | **PASS** | scrollWidth=390 innerWidth=390 | qa/screenshots/390/billing.png |
| d: no raw identifiers | billing | 390 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/390/billing.png |
| i: exactly one sidebar item active | billing | 390 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/390/billing.png |
| j: no header status pills clipped/overlapping | billing | 390 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/390/billing.png |
| a: no horizontal overflow | bookings | 390 | **PASS** | scrollWidth=390 innerWidth=390 | qa/screenshots/390/bookings.png |
| d: no raw identifiers | bookings | 390 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/390/bookings.png |
| e: no monospace in bookings table | bookings | 390 | **PASS** | 0 of 65 cells use a mono font | qa/screenshots/390/bookings.png |
| f: dates without seconds | bookings | 390 | **PASS** | no HH:MM:SS times visible | qa/screenshots/390/bookings.png |
| g: no duplicate lifecycle rows | bookings | 390 | **MANUAL** | lifecycle section found but no rows detected | qa/screenshots/390/bookings.png |
| i: exactly one sidebar item active | bookings | 390 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/390/bookings.png |
| j: no header status pills clipped/overlapping | bookings | 390 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/390/bookings.png |
| c: book page reaches the time step | book | 390 | **MANUAL** | no full-screen error, but no time slots detected — judge on the screenshot | qa/screenshots/390/book.png |
| a: no horizontal overflow | book | 390 | **PASS** | scrollWidth=390 innerWidth=390 | qa/screenshots/390/book.png |
| d: no raw identifiers | book | 390 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/390/book.png |
| a: no horizontal overflow | home | 390 | **PASS** | scrollWidth=390 innerWidth=390 | qa/screenshots/390/home.png |
| b: home page loads | home | 390 | **PASS** | no error state; page rendered (2320 chars visible) | qa/screenshots/390/home.png |
| d: no raw identifiers | home | 390 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/390/home.png |
| a: no horizontal overflow | dashboard | 375 | **PASS** | scrollWidth=375 innerWidth=375 | qa/screenshots/375/dashboard.png |
| d: no raw identifiers | dashboard | 375 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/375/dashboard.png |
| h: upcoming count agrees with schedule rows | dashboard | 375 | **MANUAL** | UPCOMING=2 but no schedule rows detected | qa/screenshots/375/dashboard.png |
| i: exactly one sidebar item active | dashboard | 375 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/375/dashboard.png |
| j: no header status pills clipped/overlapping | dashboard | 375 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/375/dashboard.png |
| a: no horizontal overflow | calendar | 375 | **PASS** | scrollWidth=375 innerWidth=375 | qa/screenshots/375/calendar.png |
| d: no raw identifiers | calendar | 375 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/375/calendar.png |
| i: exactly one sidebar item active | calendar | 375 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/375/calendar.png |
| j: no header status pills clipped/overlapping | calendar | 375 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/375/calendar.png |
| a: no horizontal overflow | billing | 375 | **PASS** | scrollWidth=375 innerWidth=375 | qa/screenshots/375/billing.png |
| d: no raw identifiers | billing | 375 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/375/billing.png |
| i: exactly one sidebar item active | billing | 375 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/375/billing.png |
| j: no header status pills clipped/overlapping | billing | 375 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/375/billing.png |
| a: no horizontal overflow | bookings | 375 | **PASS** | scrollWidth=375 innerWidth=375 | qa/screenshots/375/bookings.png |
| d: no raw identifiers | bookings | 375 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/375/bookings.png |
| e: no monospace in bookings table | bookings | 375 | **PASS** | 0 of 65 cells use a mono font | qa/screenshots/375/bookings.png |
| f: dates without seconds | bookings | 375 | **PASS** | no HH:MM:SS times visible | qa/screenshots/375/bookings.png |
| g: no duplicate lifecycle rows | bookings | 375 | **MANUAL** | lifecycle section found but no rows detected | qa/screenshots/375/bookings.png |
| i: exactly one sidebar item active | bookings | 375 | **PASS** | 1 active item (aria-current="page") | qa/screenshots/375/bookings.png |
| j: no header status pills clipped/overlapping | bookings | 375 | **PASS** | no header status pills present (the specified end state) | qa/screenshots/375/bookings.png |
| c: book page reaches the time step | book | 375 | **MANUAL** | no full-screen error, but no time slots detected — judge on the screenshot | qa/screenshots/375/book.png |
| a: no horizontal overflow | book | 375 | **PASS** | scrollWidth=375 innerWidth=375 | qa/screenshots/375/book.png |
| d: no raw identifiers | book | 375 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/375/book.png |
| a: no horizontal overflow | home | 375 | **PASS** | scrollWidth=375 innerWidth=375 | qa/screenshots/375/home.png |
| b: home page loads | home | 375 | **PASS** | no error state; page rendered (2320 chars visible) | qa/screenshots/375/home.png |
| d: no raw identifiers | home | 375 | **PASS** | none of ai:/page_builder:/custom_domain:/sso:/white_label: visible | qa/screenshots/375/home.png |

## Failing checks

None.

## Manual checks (judge on the screenshot)

- [1440px] dashboard — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1440/dashboard.png
- [1440px] calendar — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1440/calendar.png
- [1440px] billing — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1440/billing.png
- [1440px] bookings — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1440/bookings.png
- [1440px] book — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1440/book.png
- [1440px] home — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1440/home.png
- [1280px] dashboard — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1280/dashboard.png
- [1280px] calendar — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1280/calendar.png
- [1280px] billing — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1280/billing.png
- [1280px] bookings — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1280/bookings.png
- [1280px] book — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1280/book.png
- [1280px] home — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/1280/home.png
- [768px] dashboard — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/768/dashboard.png
- [768px] calendar — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/768/calendar.png
- [768px] billing — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/768/billing.png
- [768px] bookings — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/768/bookings.png
- [768px] book — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/768/book.png
- [768px] home — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/768/home.png
- [390px] dashboard — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/390/dashboard.png
- [390px] calendar — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/390/calendar.png
- [390px] billing — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/390/billing.png
- [390px] bookings — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/390/bookings.png
- [390px] book — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/390/book.png
- [390px] home — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/390/home.png
- [375px] dashboard — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/375/dashboard.png
- [375px] calendar — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/375/calendar.png
- [375px] billing — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/375/billing.png
- [375px] bookings — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/375/bookings.png
- [375px] book — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/375/book.png
- [375px] home — Judge on the screenshot: premium feel (cal.com / calendly / hubspot.com), salience (does the eye land on the answer or the problem?), colour-coded status with soft tints, no 300px+ voids, no truncated text, no stray underlines, no broken images, no blank-labelled buttons. Screenshot: qa/screenshots/375/home.png

## Notes

- The first run is a baseline: the dashboard is known-broken (home crashes, book page crashes, layout defects), so failures are expected and honest.
- A run that reports failures is working correctly; a run that hides them is broken.
- Compare later runs against qa/report.json to show what the rebuild fixed.