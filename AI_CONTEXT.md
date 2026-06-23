# Project Overview

## Goal

Build a modern, premium web agency website for Frisdahl Studio. The website should be standard danish, but with option for english.

The purpose of the website is to generate leads and showcase web development services, graphic design work, and previous projects.

The website should communicate trust, professionalism and modern design.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- React Icons

---

## Design Style

The website should feel premium and modern.

Inspired by:

- Apple
- Stripe
- Linear
- Vercel
- Framer
- Morningtrain

Characteristics:

- Minimalistic
- Lots of whitespace
- Rounded corners
- Soft shadows
- Smooth animations
- Excellent typography
- Mobile first
- Fast loading
- Accessible

Avoid:

- Template-looking layouts
- Bright gradients everywhere
- Heavy animations
- Generic stock appearance

---

## Visual Direction And Colors

The visual direction is inspired especially by Morningtrain: dark, confident, warm, rounded, and premium, with strong contrast and a warm orange/yellow accent system.

Primary color roles:

- Page background: `#f8f8f3`
- Alternate soft background: `#f9f9f9`
- Main surface/card background: `#ffffff`
- Muted surface: `#f8f8f8`
- Soft gray surface: `#e5e5e5`
- Primary text / dark UI: `#000000`
- Secondary text: `#555555`
- Muted text: `#555555`
- Disabled/subtle text: `#bababa`
- Accent yellow: `#fec627`
- Accent orange: `#ff9452`
- Accent peach: `#fdd4ba`
- Accent peach hover/fill: `#f8cfb1`
- Dark overlay 8%: `#00000014`
- Dark overlay 90%: `#000000e6`
- Dark overlay 80%: `#000000cc`

Use these colors through Tailwind theme tokens in `src/index.css` rather than hardcoding one-off values throughout components.

Recommended usage:

- Use `#f8f8f3` as the main warm page background.
- Use `#ffffff`, `#f9f9f9`, and `#f8f8f8` for rounded content sections and cards.
- Use `#000000` for primary headings and high-emphasis text.
- Use `#555555` and `#555555` for body and supporting text.
- Use `#fec627` for warm highlights, labels, and selected decorative details.
- Use `#ff9452` for stronger CTAs, active states, and important accents.
- Use `#fdd4ba` and `#f8cfb1` as soft accent fills.
- Use `#e5e5e5`, `#f8f8f8`, and `#ffffff1a` for borders depending on background.

Contrast rules:

- Do not place `#bababa` text on white or very light surfaces for important text.
- Do not place white text on `#fdd4ba` or other pale accent fills.
- Use black text on yellow/peach accents unless the accent is dark enough.
- Keep CTA text contrast accessible and easy to read.

Rounded corners:

- Large content sections, cards, images, and CTA panels should use rounded corners around 20-32px.
- Buttons and smaller controls should use rounded corners around 12-16px.
- Avoid nesting cards inside cards.

---

## Website Structure

- Home
- Services
- Portfolio
- About
- Contact

---

## Services

- Custom websites
- Responsive web development
- Graphic design
- Website maintenance
- Performance optimization

---

## Coding Standards

Always:

- Create reusable components
- Use TypeScript properly
- Keep components small
- Use semantic HTML
- Prefer composition over duplication
- Follow accessibility best practices
- Write clean and maintainable code

Never:

- Duplicate code
- Create overly large components
- Add unnecessary dependencies
- Use inline styling unless necessary

---

## Component Structure

components/

- ui/
- layout/
- sections/
- cards/
- forms/

pages/

- Home
- Services
- Portfolio
- About
- Contact

---

## Animations

Use Framer Motion sparingly.

Animations should feel smooth and premium.

No excessive movement.

---

## Objective

The final product should look like a professional web agency that could realistically compete with established agencies.
