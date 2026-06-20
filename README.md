# Link Hills Medical Centre — Website

A modern redesign of [linkhillsmedical.co.za](https://linkhillsmedical.co.za), keeping the
practice's original brand photos and blue + green medical colour scheme while refreshing the
layout, typography and interactions.

## Highlights
- Responsive single-page layout with sticky glass header and mobile drawer nav
- Hero with opening-hours card, trust strip and animated stats
- Services, medical staff, online appointment request, FAQ accordion and contact map sections
- Scroll-spy navigation and reveal-on-scroll animations (vanilla JS, no dependencies)
- Real brand assets reused from the original site (logo, service icons, doctor photos)

## Structure
```
index.html            Markup for the full page
assets/css/style.css  Styles and responsive rules
assets/js/main.js     Navigation, scroll-spy and reveal interactions
assets/images/        Brand photos and icons
```

## Running locally
It's a static site — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Practice details
- **Address:** 2 Niagara Drive, Waterfall, KwaZulu-Natal
- **Phone:** 031 763 3834
- **Email:** office@linkhillsmedical.co.za
- **Hours:** Mon–Fri 07:30–17:00 · Sat 08:00–12:00
