# Design System Document

## 1. Overview & Creative North Star: "The Architectural Atelier"

This design system is built to transform the digital presence of a home improvement brand from a service provider into a high-end curator of space. The **Creative North Star is "The Architectural Atelier."** 

We move away from the "contractor template" by embracing a high-end editorial aesthetic. This is achieved through intentional asymmetry—allowing imagery to break the grid—and a sophisticated layering of tonal surfaces. By treating the screen as a physical gallery space rather than a flat document, we convey craftsmanship, precision, and authority. This system prioritizes breathing room (white space) and typographic scale to ensure every interaction feels deliberate and premium.

---

## 2. Colors & Surface Philosophy

The palette leverages deep, authoritative navies and charcoals to establish trust, while "Terracotta" (`secondary`) provides a nod to the raw materials of masonry and craftsmanship.

### The "No-Line" Rule
To maintain an editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. Use `surface_container_low` for large content blocks sitting on a `surface` background. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use Material Design tiers to define "nested" depth:
*   **Base Layer:** `surface` (#fbf8ff) for main page backgrounds.
*   **Section Layer:** `surface_container_low` (#f4f2ff) to group related content modules.
*   **Object Layer:** `surface_container_lowest` (#ffffff) for cards or interactive elements to create a "lifted" effect without heavy shadows.

### The "Glass & Gradient" Rule
To avoid a "flat" corporate look, use Glassmorphism for floating navigation and overlay cards. Use `surface` at 80% opacity with a `backdrop-filter: blur(12px)`. For Hero sections and primary CTAs, apply a subtle linear gradient from `primary` (#051125) to `primary_container` (#1b263b) to provide "visual soul."

---

## 3. Typography: Editorial Authority

We use a dual-typeface system to balance modern geometry with functional legibility.

*   **Display & Headlines (Manrope):** This is our "Brand Voice." Manrope’s geometric structure feels architectural. Use `display-lg` for hero statements with tight letter-spacing (-0.02em) to command attention.
*   **Body & Titles (Work Sans):** Chosen for its humanist qualities and exceptional readability at scale. `body-lg` should be the standard for descriptive text to maintain an airy, premium feel.
*   **Utility (Inter):** Reserved for `label-md` and `label-sm`. Its neutral, technical character is used for "technical specs" or "process steps," reinforcing the "Atelier" expertise.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface_container_lowest` card on a `surface_container_low` section. This creates a soft, natural lift.
*   **Ambient Shadows:** For floating elements (like a premium quote calculator), use extra-diffused shadows. 
    *   *Specs:* `box-shadow: 0 10px 40px rgba(24, 26, 46, 0.06);` (using a tinted version of `on_surface`).
*   **The "Ghost Border" Fallback:** If a container requires definition against a complex image, use a Ghost Border: `outline_variant` (#c5c6cd) at 15% opacity. Never use 100% opaque borders.
*   **Asymmetric Overlaps:** Position high-quality imagery so it partially overlaps two different surface tiers. This breaks the "90s web look" and creates a modern, layered composition.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on_primary` text. Use `md` (0.375rem) roundedness. No border. Apply a subtle gradient for depth.
*   **Secondary (Craft Accent):** `secondary` background. Use this sparingly for high-intent CTAs (e.g., "Request a Quote").
*   **Tertiary:** Ghost style. No background, `primary` text, with a `surface_variant` hover state.

### Input Fields
*   **Style:** Use the "Subtle Fill" approach. Background is `surface_container`, with a 2px bottom-only border in `outline`.
*   **Focus State:** Transition the bottom border to `secondary` (Terracotta) to signify craftsmanship and attention.

### Cards & Lists
*   **Rule:** Forbid the use of horizontal divider lines.
*   **Implementation:** Separate list items using vertical white space (use the 1.5rem spacing increment) or a very subtle background shift on hover (`surface_container_high`). 
*   **Portfolio Cards:** Use `surface_container_lowest` with a "Ghost Border" and an image that occupies 100% of the top width.

### Signature Component: The "Material Swatch" Chip
*   **Context:** For choosing paint colors or finishes.
*   **Style:** Circular `full` roundedness, using `surface_container_highest` for the stroke. When selected, use the `secondary` color as a high-contrast ring.

---

## 6. Do's and Don'ts

### Do
*   **Do** use `surface_bright` to highlight active cards or featured testimonials.
*   **Do** allow images to "bleed" off the edge of the container to create an expansive, high-end feel.
*   **Do** use `headline-lg` for section headers, ensuring at least 80px of top margin to provide "breathing room."
*   **Do** use `tertiary` (#001224) for footer backgrounds to ground the site in professional charcoal tones.

### Don't
*   **Don't** use black (#000000). Use `primary` (#051125) or `on_surface` (#181a2e) for all "black" text to maintain tonal depth.
*   **Don't** use standard drop shadows (e.g., `0 2px 4px black`). They look "cheap." Always use the Ambient Shadow spec.
*   **Don't** use 1px dividers between navigation items. Use spacing and typographic weight (`label-md` bold) to create separation.
*   **Don't** crowd the layout. If a section feels "busy," increase the background color contrast between the section and the base surface.