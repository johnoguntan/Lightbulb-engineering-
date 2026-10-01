/**
 * SITE COPY
 * -----------------------------------------------------------------------------
 * Draft copy taken from the Stitch homepage design. The client has NOT
 * confirmed any of it yet. Claims such as warranty length, "0% plastic waste",
 * pricing tiers and test ratings must be checked with the client before launch.
 *
 * Edit text here; the components only lay it out.
 */

const IMG = '/images/lightbulb';

export const ANNOUNCEMENT = 'Free nationwide delivery over ₦50,000 | Custom B2B sampling available';

export const NAV = [
  { href: '/catalog', label: 'Bags & Carry' },
  { href: '/b2b', label: 'Packaging & Boxes' },
  { href: '/b2b#quote', label: 'Custom B2B' },
  { href: '/craft', label: 'Stories' },
];

export const HERO = {
  eyebrow: 'Dual manufacturing ecosystem',
  titleStart: 'Engineered with',
  titleAccent: 'YOU',
  titleEnd: 'in Mind.',
  body: 'Thoughtfully crafted everyday carry and workspace utility by Lightbulb Concepts, paired with high-volume precision packaging solutions by Lightbulb Packaging.',
  primaryCta: { label: 'Explore Concepts (Retail)', href: '/catalog' },
  secondaryCta: { label: 'Discover Packaging (Wholesale)', href: '/b2b' },
  stats: [
    { value: '100%', label: 'Lagos workshop' },
    { value: '3-Year', label: 'Craft guarantee', accent: true },
    { value: '0%', label: 'Plastic waste' },
  ],
  image: `${IMG}/weekender-crimson-guitar.jpg`,
  imageAlt: 'A man playing guitar on warm stone steps beside a crimson Lightbulb weekender bag',
  imagePosition: '50% 60%',
  shopLook: '/catalog/weekender-duffel',
  badges: ['Handcrafted in Lagos', 'Recycled tech fabrics'],
  caption: '3-Year Craftsmanship Warranty',
};

export const PILLARS = {
  eyebrow: 'Two pillars. One standard.',
  title: 'Select Your Purpose',
  intro: 'Whether you need deliberate personal carry essentials or high-precision branded shipping boxes for enterprise rollouts.',
  cards: [
    {
      badge: 'Retail & Everyday Carry',
      icon: 'backpack',
      title: 'Lightbulb Concepts',
      body: 'Backpacks, carry cases, coolers, totes and kids’ bags, made in Lagos for commutes, campuses and everything in between.',
      image: `${IMG}/range-coolers-held.jpg`,
      imageAlt: 'An armful of Lightbulb cooler bags in pink, green, purple, navy and blue',
      cta: { label: 'Shop Collection', href: '/catalog' },
      note: 'Immediate dispatch · Express WAT',
      tone: 'light',
    },
    {
      badge: 'B2B Manufacturing & Wholesale',
      icon: 'precision_manufacturing',
      title: 'Lightbulb Packaging',
      body: 'Branded garment bags, drawstring bags and custom packaging, printed with your logo and made to order for brands and retailers.',
      image: `${IMG}/pack-garment-red.jpg`,
      imageAlt: 'A red branded garment bag made by Lightbulb Packaging',
      cta: { label: 'Order Samples & B2B Tiers', href: '/b2b' },
      note: 'MOQ from 250 units',
      tone: 'muted',
    },
  ],
};

export const SIGNATURE = {
  eyebrow: 'Lightbulb Concepts',
  title: 'Signature Everyday Carry',
  intro: 'Engineered for agile commutes, campus days and long-term utility.',
};

export const CATEGORIES_SECTION = {
  eyebrow: 'Shop by category',
  title: 'Something for every carry',
};

export const LIFESTYLE_BAND = {
  image: `${IMG}/heather-backpack-brown-bike.jpg`,
  imageAlt: 'A man with a brown heathered Lightbulb laptop backpack checking his phone beside a bicycle',
  imagePosition: '70% 50%',
  eyebrow: 'Made in Lagos',
  title: 'Built for the way Lagos moves.',
  body: 'Hard-wearing fabrics, honest zips and shapes that sit close to the body — from the danfo to the office and back.',
  cta: { label: 'Shop backpacks', href: '/catalog?category=Backpacks' },
};

export const B2B = {
  badge: 'Industrial B2B manufacturing',
  title: 'Custom Branded Packaging, Made in Lagos',
  body: 'Garment bags, drawstring bags, mailers and cartons printed with your brand. Built for unboxing impact and everyday handling.',
  tiersLabel: 'Volume pricing schedule',
  // PLACEHOLDER pricing from the design — confirm with client.
  tiers: [
    { qty: '250 units', price: '₦1,200', note: 'per unit' },
    { qty: '1,000 units', price: '₦850', note: 'Save 29%' },
    { qty: '5,000+ units', price: '₦620', note: 'Volume best rate', highlight: true },
  ],
  features: ['FSC-Certified Corrugated', 'Water-Based Soybean Inks', 'Custom Die-Cut Inserts', '7-Day Standard Turnaround'],
  primaryCta: { label: 'Request Free Sample Kit', href: '/b2b#quote' },
  secondaryCta: { label: 'Upload Die-line', href: '/b2b#quote' },
  image: `${IMG}/pack-garment-white.jpg`,
  imageAlt: 'A white and black branded garment bag held up to camera',
  imagePosition: '50% 35%',
  gallery: [
    { src: `${IMG}/pack-drawstring-black.jpg`, alt: 'Black and red branded drawstring bag' },
    { src: `${IMG}/pack-garment-pink.jpg`, alt: 'Pink branded garment bag' },
    { src: `${IMG}/pack-drawstring-cream.jpg`, alt: 'Cream drawstring bag with orange print' },
    { src: `${IMG}/pack-garment-brown.jpg`, alt: 'Brown and beige branded garment bag' },
  ],
  // PLACEHOLDER claim from the design — confirm with client.
  callout: { label: 'Your logo, your colours', body: 'Every piece shown here is printed and stitched for real clients in our Lagos workshop.' },
};

export const PHILOSOPHY = {
  eyebrow: 'The philosophy',
  title: 'Crafted with Deliberate Restraint',
  body: 'We combine local Lagos craftsmanship with industrial rigor. Every seam, fold, and joint is engineered to eliminate unnecessary bulk while extending lifespan.',
  cards: [
    {
      icon: 'directions_walk',
      title: 'Designed for Modern Movement',
      body: 'Tested for daily transit across bustling cities, hot-desking, and work-from-anywhere setups. Slim profiles with maximum internal capacity.',
      link: { label: 'Zero wasted volume', href: '/catalog' },
    },
    {
      icon: 'recycling',
      title: 'Zero Plastic Packaging',
      body: '100% biodegradable and recyclable paper structures made locally in Lagos. Soy-based inks, water-activated tapes, and zero synthetic coatings.',
      link: { label: 'Closed-loop cycle', href: '/craft' },
    },
    {
      icon: 'hub',
      title: 'Direct B2B Integration',
      body: 'A frictionless wholesale ordering portal for growing consumer brands. Automated reordering, custom die-line storage, and rapid warehousing dispatches.',
      link: { label: 'Enterprise client portal', href: '/b2b' },
    },
  ],
};

export const COMMUNITY = {
  eyebrow: 'Everyday utility in action',
  title: '@lbngconcepts & @lightbulbng on the move',
  link: { label: 'Join the community', href: 'https://instagram.com/lbngconcepts' }, // confirm handle
  photos: [
    { src: `${IMG}/weekender-crimson-arch.jpg`, alt: 'Man leaning against a stone arch holding a crimson Lightbulb weekender' },
    { src: `${IMG}/backpack-olive-lifestyle-woman.jpg`, alt: 'Woman opening the front pocket of an olive Lightbulb backpack' },
    { src: `${IMG}/flap-backpack-crimson-worn.jpg`, alt: 'Smiling man holding a crimson flap-top Lightbulb backpack' },
    { src: `${IMG}/kids-pair-lifestyle.jpg`, alt: 'A child holding giraffe and lion Lightbulb lunch bags' },
    { src: `${IMG}/backpack-crimson-lifestyle-steps.jpg`, alt: 'Man seated on steps with a crimson Lightbulb backpack' },
    { src: `${IMG}/heather-backpack-brown-laptop.jpg`, alt: 'Sliding a laptop into a brown Lightbulb backpack' },
    { src: `${IMG}/lifestyle-truck-packing.jpg`, alt: 'Packing Lightbulb bags into the back of a pickup truck' },
  ],
  // Real customer quotes only. Leave empty until the client supplies them —
  // the section hides itself when there are none.
  testimonials: [],
};

export const NEWSLETTER = {
  title: 'Join the Lightbulb Circle',
  body: 'Receive 10% off your first retail order or claim a complimentary B2B packaging die-line consultation.',
  placeholder: 'Enter corporate or personal email',
  cta: 'Claim Offer',
};

export const FOOTER = {
  blurb: 'Engineered with you in mind. Bridging industrial precision, tactile everyday carry, and bespoke wholesale manufacturing.',
  badges: [
    { icon: 'verified', label: '3-Year Warranty on Everyday Carry' },
    { icon: 'recycling', label: '100% Recycled & Certified Pulp Packaging' },
  ],
  columns: [
    {
      title: 'Products',
      links: [
        { label: 'Backpacks', href: '/catalog?category=Backpacks' },
        { label: 'Carry Cases', href: '/catalog?category=Cases' },
        { label: 'Lunch & Coolers', href: '/catalog?category=Lunch%20%26%20Coolers' },
        { label: 'Kids', href: '/catalog?category=Kids' },
        { label: 'Totes', href: '/catalog?category=Totes' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'B2B Volume Quoting', href: '/b2b' },
        { label: 'Sample Kit Request', href: '/b2b#quote' },
        { label: 'Spec Comparison', href: '/compare' },
        { label: 'Our Story', href: '/craft' },
      ],
    },
  ],
  studio: {
    title: 'Studio',
    name: 'Lagos Showroom & HQ',
    address: ['15 Salawu Onikoyi Street', 'Ifako-Gbagada, Lagos, Nigeria'],
    hours: 'Mon – Fri: 8am – 6pm WAT',
  },
  dispatches: {
    title: 'Engineering Dispatches',
    body: 'Be first to preview capsule releases, material innovations, and enterprise manufacturing case studies.',
    fine: 'Strictly quality content. Unsubscribe anytime.',
  },
};
