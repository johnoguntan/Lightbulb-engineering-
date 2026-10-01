/**
 * PRODUCT CATALOGUE
 * -----------------------------------------------------------------------------
 * Every photo is the client's real product (public/images/lightbulb, taken from
 * the /images shoot folder).
 *
 * Everything marked PLACEHOLDER — names, prices, descriptions — is NOT
 * client-supplied yet. Names and one-liners only describe what the photos show.
 * A product with `price: null` shows "Price coming soon" and can't be added to
 * the bag. Set a number (in naira) to switch it on.
 *
 * Each colour has its own photos: studio shot first (shown on cards), lifestyle
 * shot second (revealed on hover), then extras for the product gallery.
 */

const I = (name) => `/images/lightbulb/${name}.jpg`;

const RAW_PRODUCTS = [
  {
    slug: 'everyday-backpack',
    name: 'Everyday Backpack', // PLACEHOLDER
    category: 'Backpacks',
    categoryLabel: 'Backpack',
    price: null, // PLACEHOLDER
    tag: 'Signature',
    description: 'A clean, rounded daypack with a zip front pocket and mesh side pockets.',
    colours: [
      { id: 'olive', name: 'Olive', hex: '#556b3f', images: [I('backpack-olive-studio-front'), I('backpack-olive-lifestyle-woman'), I('backpack-olive-studio-side'), I('backpack-olive-worn'), I('backpack-olive-studio-angle')] },
      { id: 'navy', name: 'Navy', hex: '#23324d', images: [I('backpack-navy-lifestyle-shoulder'), I('backpack-navy-lifestyle-colonnade')] },
      { id: 'crimson', name: 'Crimson', hex: '#9b1c24', images: [I('backpack-crimson-studio-front'), I('backpack-crimson-lifestyle-steps'), I('backpack-crimson-studio-side'), I('set-crimson-backpack-case')] },
      { id: 'lime', name: 'Lime', hex: '#a7b24a', images: [I('backpack-lime-studio-front'), I('backpack-lime-worn'), I('backpack-lime-studio-side'), I('backpack-lime-worn-side')] },
    ],
  },
  {
    slug: 'heather-laptop-backpack',
    name: 'Heather Laptop Backpack', // PLACEHOLDER
    category: 'Backpacks',
    categoryLabel: 'Laptop Backpack',
    price: null,
    tag: 'Laptop Ready',
    description: 'A slim, structured backpack in two-tone heathered fabric with a padded laptop section.',
    colours: [
      { id: 'brown', name: 'Brown / Grey', hex: '#4e342e', images: [I('heather-backpack-brown-studio'), I('heather-backpack-brown-bike'), I('heather-backpack-brown-laptop'), I('heather-backpack-brown-worn'), I('heather-backpack-brown-detail'), I('heather-backpack-brown-set')] },
      { id: 'crimson', name: 'Crimson / Grey', hex: '#b3202c', images: [I('heather-backpack-crimson-set')] },
      { id: 'navy', name: 'Navy Stripe', hex: '#2b3a67', images: [I('heather-backpack-navy-set')] },
    ],
  },
  {
    slug: 'weekender-duffel',
    name: 'Weekender Duffel', // PLACEHOLDER
    category: 'Travel',
    categoryLabel: 'Duffel',
    price: null,
    tag: 'Travel',
    description: 'A roomy crimson holdall with twin handles and a shoulder strap, built for weekends away.',
    colours: [
      { id: 'crimson', name: 'Crimson', hex: '#8e1b2b', images: [I('weekender-crimson-balcony'), I('weekender-crimson-guitar'), I('weekender-crimson-colonnade'), I('weekender-crimson-arch'), I('lifestyle-truck-packing')] },
    ],
  },
  {
    slug: 'flap-backpack',
    name: 'Flap-Top Backpack', // PLACEHOLDER
    category: 'Backpacks',
    categoryLabel: 'Backpack',
    price: null,
    tag: 'New',
    description: 'A squared-off backpack with carry handles and a contrast flap pocket.',
    colours: [
      { id: 'crimson-pink', name: 'Crimson / Blush', hex: '#9e2f3c', images: [I('flap-backpack-crimson-worn'), I('flap-backpack-crimson-truck')] },
    ],
  },
  {
    slug: 'carry-case',
    name: 'Carry Case', // PLACEHOLDER
    category: 'Cases',
    categoryLabel: 'Carry Case',
    price: null,
    tag: '10 Colours',
    description: 'A structured zip case with a top grab handle and detachable shoulder strap.',
    colours: [
      { id: 'crimson', name: 'Crimson / Grey', hex: '#b3202c', images: [I('case-crimson-studio'), I('case-crimson-lifestyle-shoulder'), I('case-crimson-lifestyle-carry')] },
      { id: 'olive', name: 'Olive', hex: '#556b3f', images: [I('case-olive-lifestyle-carry'), I('case-olive-lifestyle-shoulder'), I('case-olive-lifestyle-hand'), I('set-olive-backpack-case')] },
      { id: 'brown', name: 'Brown / Grey', hex: '#5a4033', images: [I('case-brown-studio'), I('case-brown-lifestyle-shoulder'), I('case-brown-lifestyle-carry')] },
      { id: 'denim', name: 'Denim Blue', hex: '#2f4a8a', images: [I('case-denim-studio'), I('case-denim-lifestyle-carry'), I('case-denim-lifestyle-hold')] },
      { id: 'black', name: 'Black', hex: '#1b1c1d', images: [I('case-black-studio'), I('case-black-studio-angle')] },
      { id: 'navy', name: 'Navy', hex: '#1f2a44', images: [I('case-navy-studio')] },
      { id: 'green', name: 'Forest', hex: '#1f5a45', images: [I('case-green-studio')] },
      { id: 'red', name: 'Red', hex: '#c8202f', images: [I('case-red-lifestyle')] },
      { id: 'pink', name: 'Pink', hex: '#e8339a', images: [I('case-pink-studio'), I('case-pink-studio-strap')] },
      { id: 'purple', name: 'Purple', hex: '#9b3fd6', images: [I('case-purple-studio'), I('case-purple-studio-strap')] },
    ],
  },
  {
    slug: 'insulated-lunch-cooler',
    name: 'Insulated Lunch Cooler', // PLACEHOLDER
    category: 'Lunch & Coolers',
    categoryLabel: 'Cooler Bag',
    price: null,
    tag: 'Insulated',
    description: 'A tall cooler tote with twin handles, a shoulder strap and mesh side pockets.',
    colours: [
      { id: 'green', name: 'Forest', hex: '#1f5a45', images: [I('cooler-green-studio'), I('cooler-green-studio-side'), I('cooler-green-set')] },
      { id: 'blue', name: 'Blue', hex: '#1e5bd8', images: [I('cooler-blue-studio'), I('cooler-blue-lifestyle'), I('cooler-blue-studio-strap')] },
      { id: 'navy', name: 'Navy', hex: '#1f2a44', images: [I('cooler-navy-studio'), I('cooler-navy-lifestyle'), I('cooler-navy-set')] },
      { id: 'pink', name: 'Pink', hex: '#e8339a', images: [I('cooler-pink-studio'), I('cooler-pink-lifestyle'), I('cooler-pink-set')] },
      { id: 'purple', name: 'Purple', hex: '#9b3fd6', images: [I('cooler-purple-studio'), I('cooler-purple-set')] },
    ],
  },
  {
    slug: 'kids-character-lunch-bag',
    name: 'Kids’ Character Lunch Bag', // PLACEHOLDER
    category: 'Kids',
    categoryLabel: 'Kids',
    price: null,
    tag: 'Kids',
    description: 'A round, zip-around lunch bag with a friendly animal face and a small carry handle.',
    colours: [
      { id: 'giraffe', name: 'Giraffe', hex: '#f5b21a', images: [I('kids-giraffe-studio'), I('kids-giraffe-lifestyle'), I('kids-giraffe-studio-side'), I('kids-giraffe-lifestyle-hold')] },
      { id: 'lion', name: 'Lion', hex: '#f2c230', images: [I('kids-lion-studio'), I('kids-lion-lifestyle'), I('kids-lion-studio-side'), I('kids-pair-lifestyle')] },
    ],
  },
  {
    slug: 'custom-name-bag',
    name: 'Custom Name Bag', // PLACEHOLDER
    category: 'Kids',
    categoryLabel: 'Custom Print',
    price: null,
    tag: 'Personalised',
    description: 'A round zip bag printed with a name of your choice.',
    colours: [
      { id: 'yellow', name: 'Yellow', hex: '#f2c230', images: [I('name-bag-cat-studio'), I('round-bag-yellow-lifestyle'), I('name-bag-giraffe-studio'), I('name-bag-giraffe-lifestyle'), I('name-bag-pair-lifestyle')] },
    ],
  },
  {
    slug: 'canvas-tote',
    name: 'Canvas Carry Tote', // PLACEHOLDER
    category: 'Totes',
    categoryLabel: 'Tote',
    price: null,
    tag: 'Leather Handles',
    description: 'A wide canvas tote with leather handles, a zip top and a woven strap tab.',
    colours: [
      { id: 'brown', name: 'Tobacco', hex: '#8a5a33', images: [I('tote-brown-studio'), I('tote-brown-studio-alt'), I('tote-brown-top'), I('tote-brown-detail')] },
      { id: 'blue', name: 'Sky', hex: '#1ea7e0', images: [I('tote-blue-studio'), I('tote-blue-studio-side')] },
    ],
  },
];

function formatNaira(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`;
}

// Derive the fields the views/cart expect, so the raw data above stays simple.
export const PRODUCTS = RAW_PRODUCTS.map((p) => ({
  longDescription: null,
  specs: {},
  ...p,
  id: p.slug,
  materials: p.colours,
  images: p.colours.flatMap((c) => c.images).filter((src, i, all) => all.indexOf(src) === i),
  formattedPrice: p.price == null ? 'Price coming soon' : formatNaira(p.price),
  purchasable: p.price != null,
}));

export const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

/** Category tiles for "Shop by category" — one strong photo each. */
export const CATEGORY_TILES = [
  { name: 'Backpacks', image: I('backpack-navy-lifestyle-shoulder'), position: '50% 30%' },
  { name: 'Travel', image: I('weekender-crimson-arch'), position: '50% 55%' },
  { name: 'Cases', image: I('case-crimson-lifestyle-shoulder'), position: '50% 45%' },
  { name: 'Lunch & Coolers', image: I('range-coolers-held'), position: '50% 50%' },
  { name: 'Kids', image: I('kids-pair-lifestyle'), position: '50% 50%' },
  { name: 'Totes', image: I('tote-brown-studio'), position: '50% 50%' },
];

/** Returns the product for a slug, or undefined if it doesn't exist. */
export function findProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductBySlug(slug) {
  return findProductBySlug(slug) || PRODUCTS[0];
}
