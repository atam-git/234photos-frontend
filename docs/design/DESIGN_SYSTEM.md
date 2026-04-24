# 234photos Design System

Extracted from existing components. All new UI must follow these patterns exactly.

---

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| Brand Red | `#EE2B24` | Primary CTA buttons, links, accents, active states |
| Brand Red Hover | `#d42520` | Hover state for red buttons |
| Black | `#111` | Primary text, nav items, dark buttons |
| Dark | `#1A1A1A` | Headings, card titles |
| Dark Navy | `#191B26` | Section headings (Collections) |
| White | `#FFFFFF` | Backgrounds, card surfaces |
| Light Gray BG | `#F5F5F7` | Alternate section backgrounds |
| Border Gray | `#D0D0D0` | Input borders, outline buttons |
| Divider | `#E8E8E8` / `#EBEBEB` | Dividers, separators |
| Text Muted | `#777` / `#888` / `#999` | Subtitles, metadata, secondary text |
| Text Mid | `#444` / `#555` / `#666` | Body text, list items |
| Overlay Dark | `bg-black/70` | Full-bleed section overlays |
| Overlay Light | `bg-black/30` | Image hover overlays |
| Footer BG | `#000000` | Footer background |
| Footer Surface | `#1A1A1A` | Footer icon buttons |
| Gold Accent | `#B5860B` | "Save 20%" badge, pricing labels |

---

## Typography

**Font:** `var(--font-jakarta), Plus Jakarta Sans, sans-serif` — used on ALL text via inline style or Tailwind.

| Role | Size | Weight | Class |
|------|------|--------|-------|
| Hero H1 | `text-[54px]` | `font-semibold` | `tracking-[-0.03em] leading-[1.1]` |
| Section H2 | `text-[22px]–text-[32px]` | `font-bold` / `font-extrabold` | `tracking-[-0.3px]–tracking-[-0.8px]` |
| Card H3 | `text-[20px]` | `font-bold` | `leading-[1.3]` |
| Card H4 | `text-[14px]` | `font-semibold` | `leading-[1.4]` |
| Body | `text-[15px]–text-[16px]` | `font-normal` | `leading-relaxed` |
| Body Small | `text-[13px]–text-[13.5px]` | `font-medium` | `leading-[19.5px]` |
| Caption / Meta | `text-[12px]–text-[13px]` | `font-normal` | `text-[#999]` |
| Label / Badge | `text-[11px]` | `font-bold` | `uppercase tracking-[1px]–tracking-[1.5px]` |
| Button | `text-[13.5px]–text-[14.5px]` | `font-semibold` / `font-bold` | |
| Stats Number | `text-[32px]–text-[48px]` | `font-bold` / `font-extrabold` | `tracking-[-0.5px]–tracking-[-1.5px]` |

---

## Spacing & Layout

- Max content width: `max-w-[1280px] mx-auto`
- Max header width: `max-w-[1440px] mx-auto`
- Section padding: `py-16 px-5 md:px-10 lg:px-20`
- Inner padding: `px-0 sm:px-6`
- Card gap: `gap-4` / `gap-5`
- Grid gap (images): `gap-[10px]`

---

## Border Radius

| Usage | Value |
|-------|-------|
| Buttons (pill) | `rounded-full` |
| Cards | `rounded-2xl` (16px) |
| Image tiles | `rounded-xl` (12px) / `rounded-[14px]` |
| Small elements | `rounded-lg` (8px) / `rounded-md` |
| Badges | `rounded-full` / `rounded` (4px) |

---

## Buttons

### Primary (Red)
```
bg-[#EE2B24] text-white rounded-full px-[22px]–px-[30px] py-[9px]–py-[13px]
text-[13.5px]–text-[14.5px] font-semibold hover:bg-[#d42520] transition-colors
```

### Secondary (Black)
```
bg-[#111] text-white rounded-full px-5 py-[9px]
text-[13.5px] font-semibold hover:bg-[#333] transition-colors
```

### Outline (Border)
```
border border-[#D0D0D0] text-[#111] rounded-full px-5 py-[9px]
text-[13.5px] font-medium hover:bg-gray-50 transition-colors
```

### Outline Red
```
border border-[#EE2B24] text-[#EE2B24] rounded-lg px-5 py-2.5
text-[13px] font-semibold hover:bg-[#EE2B24] hover:text-white transition-colors
```

### Ghost / Text Link
```
text-[#EE2B24] text-[13px] font-semibold hover:underline
```

---

## Filter / Tab Pills

### Active
```
bg-[#111] border-[#111] text-white font-semibold rounded-full border px-3.5 py-[5px] text-[13px]
```

### Inactive
```
border-[#DDD] text-[#666] font-medium rounded-full border px-3.5 py-[5px] text-[13px]
hover:border-[#999] hover:text-[#444]
```

### Content Type Tabs (Hero style)
```
Active: bg-[#F0F0F0] text-[#111] font-semibold rounded-lg px-3.5 py-[7px] text-[13.5px]
Inactive: text-[#888] font-medium rounded-lg px-3.5 py-[7px] text-[13.5px] hover:text-[#444] hover:bg-gray-50
```

---

## Cards

### Image Card (Category / Trending)
```
relative block rounded-xl overflow-hidden group bg-[#1A1A1A]
shadow-[0_2px_8px_0_rgba(0,0,0,0.08)]
img: w-full h-full object-cover transition-transform duration-300 group-hover:scale-105
overlay: absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200
```

### Content Card (Blog side article)
```
flex items-stretch bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow
```

### Pricing Card
```
bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-sm
Featured: border-2 border-[#EE2B24]
```

### Collection Card
```
group block — mosaic image grid h-[180px] rounded-xl overflow-hidden
h3: text-[14px] font-semibold text-[#191B26] group-hover:text-[#EE2B24] transition-colors
```

---

## Section Patterns

### Section Header (standard)
```tsx
<div className="flex justify-between items-baseline w-full">
  <h2 className="text-[#111] text-[22px] font-bold leading-[33px] tracking-[-0.3px]"
      style={{ fontFamily: 'var(--font-jakarta)...' }}>
    Section title
  </h2>
  <a href="#" className="text-[#EE2B24] text-[13px] font-semibold hover:underline whitespace-nowrap">
    See all →
  </a>
</div>
```

### Section Header (editorial style)
```tsx
<span className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.2px]">
  Eyebrow label
</span>
<h2 className="text-[#111] text-[28px] md:text-[32px] font-bold tracking-[-0.5px]">
  Section title
</h2>
<p className="text-[#666] text-[14px] leading-[21px]">Subtitle</p>
```

### Alternating BG
- White sections: `bg-white`
- Gray sections: `bg-[#F5F5F7]`
- Dark sections: `bg-black` (footer) or full-bleed image with `bg-black/70` overlay

---

## Image Overlays & Gradients

```
Gradient bottom (category cards): bg-gradient-to-b from-transparent via-black/18 to-black/65
Gradient bottom (featured article): bg-gradient-to-t from-black/80 via-black/20 to-transparent
Fade left (gallery): bg-gradient-to-r from-white to-transparent
Fade right (gallery): bg-gradient-to-l from-white to-transparent
```

---

## Badges

```
Brand Red: bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[1px] px-2 py-1 rounded
Dark overlay: bg-black/75 text-white text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded
Gold: bg-[#B5860B] text-white text-[12px] font-bold px-3 py-1 rounded-full
Check icon: circle stroke #EE2B24/25, fill #FFF0F0, checkmark stroke #EE2B24
```

---

## Search Bar

```
h-[58px] rounded-full bg-white shadow-[0_2px_0_0_#E8E8E8,0_0_0_1px_#E8E8E8] overflow-hidden
- Camera icon: w-14 flex-shrink-0, icon stroke #BBBBBB
- Divider: w-px h-[22px] bg-[#E8E8E8]
- Input: flex-1 px-4 text-[15.5px] text-[#111] placeholder-[#BBB]
- Submit button: h-11 px-[22px] bg-[#EE2B24] rounded-full, icon + "Search" text-[14.5px] font-semibold
```

---

## Header

```
sticky top-0 z-[100] bg-white h-[60px]
Scrolled: shadow-sm border-b border-black/10
Nav items: text-[13.5px] font-medium text-[#111] hover:bg-gray-100 rounded-md px-3 py-2
Auth: Log in = outline border-[#D0D0D0] rounded-full | Sign up = bg-[#111] rounded-full
```

---

## Transitions & Shadows

```
Hover scale: transition-transform duration-300 group-hover:scale-105
Hover opacity: transition-opacity duration-200
Color transitions: transition-colors (default 150ms)
Card hover shadow: hover:shadow-md transition-shadow
Search bar shadow: shadow-[0_2px_0_0_#E8E8E8,0_0_0_1px_#E8E8E8]
Image card shadow: shadow-[0_1px_8px_0_rgba(0,0,0,0.08)]
```

---

## Scrollbar

```
scrollbar-hide (custom utility in globals.css)
```

---

## Icons

- Library: `lucide-react` (ChevronDown, Menu, X)
- Custom SVGs inline for search, camera, social icons
- Stroke color for muted icons: `#BBBBBB` / `#555` / `#666`
