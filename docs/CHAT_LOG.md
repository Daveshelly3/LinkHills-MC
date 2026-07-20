# Link Hills Medical Centre — Website Redesign

**Project:** Modern redesign of [linkhillsmedical.co.za](https://linkhillsmedical.co.za)
**Live site:** https://linkhills-medical.vercel.app
**Repo branch:** `claude/linkhills-medical-redesign-xitvm5`
**Date:** July 2026

A transcript of the working session between the user and Claude Code, summarising each request and what was done.

---

## 1. Recreate the website (modern redesign)

**User:** "https://linkhillsmedical.co.za look at this website i want you to recreate it with the same colours and photos but more modern"

**Done:**
- Studied the original site: family health centre in Waterfall, KZN — "Caring for your family", 30+ years, Syntro-P Health Centre of Excellence.
- Downloaded the real brand assets (logo, service icons, doctor photos, JDJ logo, opening-times image) straight from the live site.
- Identified the palette: medical **blue + green**, drawn from the logo and imagery.
- Built a modern, responsive single-page site:
  - `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/images/`
  - Sticky glass header + mobile drawer nav, hero with opening-hours card, trust strip, services, medical staff, appointments, FAQ accordion, contact + map, footer.
  - Scroll-spy nav, reveal-on-scroll animations, back-to-top — vanilla JS, no dependencies.
- Contact details preserved: 2 Niagara Drive, Waterfall, KZN · 031 763 3834 · office@linkhillsmedical.co.za · Mon–Fri 07:30–17:00, Sat 08:00–12:00.

---

## 2. Bookings go through another service; physio & dentist are independent

**User:** "The bookings go through another website/service and the physio and dentist are on prem but not a part of the practice"

**Done:**
- Discovered bookings run through **RecoMed** (a separate booking page per GP).
- Replaced the placeholder booking form with real RecoMed links per doctor (staff cards + appointments section + top bar).
- Marked **Physiotherapy** and **Dentistry** as *"independent practices located on our premises"* (tags + notes), and updated the FAQ to match.

---

## 3. Make it appear first in search (SEO)

**User:** "Interact with the og website and ensure all the clickable things work properly - and I want the website to be first appearing when people search online"

**Done:**
- Crawled the original site and matched every link. Fixed the phone link (original's was malformed; ours uses a proper `tel:`). Added the Facebook link.
- Added full SEO:
  - Keyword-focused title/description, canonical URL, geo tags, Open Graph + Twitter cards.
  - JSON-LD structured data: `MedicalClinic` (address, geo, hours, services) + `FAQPage`.
  - `robots.txt` and `sitemap.xml`.
- Explained the owner-side steps needed to actually rank #1: deploy to the real domain, claim the Google Business Profile, submit the sitemap, gather reviews.

---

## 4. Buying a new domain

**User:** "Can I buy a new domain — this one expires at the end of the year. But for now I need one as close as possible"

**Done / advised:**
- The domain-availability tool and DNS/WHOIS lookups were unavailable in the environment, so live checks weren't possible from Claude's side.
- Recommendation: closest possible = same name, new TLD — **`linkhillsmedical.com`** as the top pick (most trusted). Alternatives: `.africa`, `.co`, `.health`, `.net/.org`.
- Noted that **renewing the `.co.za`** is usually cheap and keeps existing Google ranking — buying `.com` *and* renewing `.co.za`, both pointing at the same site, is the strongest setup.
- Suggested checking availability/price at a SA registrar (domains.co.za, xneelo/Hetzner) or GoDaddy/Namecheap.

---

## 5. View the site + mobile/PC friendly

**User:** "I want to see the website … And make mobile and pc friendly"

**Done:**
- The Vercel deploy and domain tools were approval-gated and wouldn't run.
- Installed a headless browser (Playwright Chromium) and rendered real screenshots at **desktop (1440px)** and **mobile (390px)** — confirming the layout is already fully responsive (hamburger menu, stacked hero, full-width buttons on mobile).
- Added a `.gitignore` so the screenshot tooling stays out of the repo.

---

## 6. Deploy via the Vercel CLI

**User:** "do it through the vercel cli like the tp app" → provided a Vercel access token

**Done:**
- Authenticated the Vercel CLI with the token, created and linked project **`linkhills-medical`**, and deployed to **production**.
- **Live URL:** https://linkhills-medical.vercel.app (HTTP 200, content verified).
- Reminder given to **revoke the token** since it was pasted into chat.

---

## 7. Design tweaks

**User:** "I dont like the gradients, change that. the opening hours square is very blury. remove dr seetal from the meet the doctors section"

**Done:**
- **Gradients removed** — all replaced with solid brand colours (blue icons/CTAs, green badge/accent).
- **Blurry square fixed** — it was a low-res 20KB image (`lhmc-opening-times.jpg`) blown up large. Replaced with a crisp, CSS-rendered "Care under one roof" panel.
- **Dr Seetal removed** from Meet the Doctors; the three GPs centred.
- Committed, pushed, redeployed.

---

## 8. Interact with the site (found & fixed a bug)

**User:** "interact with it"

**Done:**
- Drove the live site with a real browser — **13/13 interactions passed** (nav scroll, scroll-spy, FAQ accordion, 6 RecoMed links, tel/mailto/Facebook, map, back-to-top, sticky header, mobile menu).
- **Bug found & fixed:** the mobile menu drawer's background collapsed (the header's `backdrop-filter` made it the containing block, shrinking the drawer's height), so hero text bled through. Fixed with an explicit viewport height + a dimming backdrop (layered below the header), plus close-on-backdrop-click and Escape.

---

## 9. "What's happening here" — giant black plus (cache bug)

**User:** (screenshot of a huge unstyled `+` icon) "whats happening here"

**Done:**
- Diagnosed: the new panel was rendering **without its CSS**. The `vercel.json` had set assets to `Cache-Control: max-age=31536000, immutable`, so the browser served a year-old cached `style.css` that had no styles for the new panel.
- **Fix:** changed the cache policy to `max-age=0, must-revalidate` and added `?v=` version tags to the CSS/JS links to bust the stuck cache. Verified the panel icon rendered correctly (26×26).

---

## 10. Redesign the "Care under one roof" panel

**User:** "redesign this - logos must be consistant and the address is cut off"

**Done:**
- **Consistent icons** — replaced the mismatched mix (3 raster line-art + 2 flat green SVGs) with one uniform inline-SVG set on matching blue chips (medical bag, physio figure, tooth, droplet, heart).
- **Address fixed** — moved the "Est. 30+ years" badge to the top-right so it no longer covered the address; wrapped the address onto two lines so it's fully visible.

---

## 11. Add deeper per-service info with awards

**User:** "go to the og website and click on the GP under services - you'll see it shows more deeper info with awards and things. that must be added for each service"

**Done:**
- Pulled the deeper content from the original services page and added an accessible **"Learn more" modal** to each service:
  - **General Practice** — services, chronic conditions managed, and a *Recognition & accreditation* block (Best of Durban 2024 badge, SA Centre for Diabetes accreditation, Syntro-P Centre of Excellence) + "Book a GP" CTA.
  - **Physiotherapy** — techniques, conditions treated, **Dr Pam Dawson** contact (031 763 3892).
  - **Dentistry** — full treatment list, **Dr Sarika Seetal** contact (031 763 3164).
  - **Pathology** — JDJ Diagnostics detail + partner logo.
  - **Nursing** — services and new-patient assessments.
- Unified the Services card icons to the consistent SVG set.
- Downloaded and committed real assets: the Best of Durban badge, team group photo, Dr Pam Dawson photo.
- Modals are accessible: open on click, close via X / backdrop / Escape, focus handling, body-scroll lock.

---

## 12. Fix all bugs + suggest improvements

**User:** "go through the website and fix all the bugs and suggest any improvments"

**Bugs found & fixed:**
- **Mobile horizontal scroll** — the off-canvas drawer parked 300px off the right edge made the page 675px wide on a 375px screen. Fixed with `overflow-x: clip` on `html`+`body` (verified it doesn't break the sticky header).

**Checked & clean:** HTTP 200, zero JS console errors, all 5 modals work, no duplicate IDs, single H1, no broken images, no desktop overflow, mobile modals fit. (The "empty alt" images were the decorative booking-row avatars — correct as-is.)

**Improvements made:** keyboard focus rings, `prefers-reduced-motion` support, lazy-loading of below-the-fold images.

**Improvements suggested (not yet done):**
1. Real award badge (the Best of Durban image is a "vote for us" promo).
2. Proper favicon (currently the JPG logo).
3. A proper 1200×630 social share image (`og:image`).
4. Use the downloaded team group photo (About or a team strip).
5. Doctor bios ("Learn more" in Medical Staff).
6. A real working contact form (e.g. via Formspree).
7. Add back a privacy policy page.

---

## Key facts & assets

| Item | Value |
| --- | --- |
| Live URL | https://linkhills-medical.vercel.app |
| Vercel project | `linkhills-medical` (team `daveshelly3-5094s-projects`) |
| Git branch | `claude/linkhills-medical-redesign-xitvm5` |
| Address | 2 Niagara Drive, Waterfall, KwaZulu-Natal |
| Phone | 031 763 3834 |
| Email | office@linkhillsmedical.co.za |
| Hours | Mon–Fri 07:30–17:00 · Sat 08:00–12:00 |
| Bookings | RecoMed (per-GP pages) |
| Physio | Dr Pam Dawson · 031 763 3892 · independent, on-site |
| Dentist | Dr Sarika Seetal · 031 763 3164 · independent, on-site |
| Pathology | JDJ Diagnostics |
| GPs | Dr Sean Duffey, Dr Carrie-Anne Grinaker, Dr Heidi Duvel |

## Project structure

```
index.html              Full page markup + JSON-LD structured data
assets/css/style.css    Styles, responsive rules, modal + panel styling
assets/js/main.js       Nav, scroll-spy, reveal animations, service modals
assets/images/          Real brand photos, icons, award badge, team photo
robots.txt              Crawler directives
sitemap.xml             Sitemap for search engines
vercel.json             Static hosting config + cache headers
README.md               Project overview
```

## Outstanding reminders

- **Revoke the Vercel access token** at vercel.com/account/tokens (it was pasted into chat and reused for deploys; the live site stays up after revoking).
- **Domain:** decide between renewing `.co.za`, buying `.com`, or both — then the SEO URLs (canonical, OG, sitemap, structured data) get updated to match.
