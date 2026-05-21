export const enMessages = {
  "lang.en": "English",
  "lang.vi": "Vietnamese",
  "nav.contact": "Contact",
  "nav.home": "Home",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "breadcrumb.home": "Home",
  "catalog.compareProducts": "COMPARE PRODUCTS",
  "hero.getPricing": "GET PRICING",
} as const;

export type MessageKey = keyof typeof enMessages;
