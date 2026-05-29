/**
 * RC Wedding Stories — Media Data
 * Replace all placeholder URLs with your actual Cloudinary image/video URLs.
 * Format: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/YOUR_PUBLIC_ID
 */

// ─── Showcase Section Video ───────────────────────────────────────────────────
// Paste your Cloudinary video URL here:
// Example: 'https://res.cloudinary.com/YOUR_CLOUD/video/upload/q_auto/your-wedding-video.mp4'
export const showcaseVideoUrl = '/weddingvideo.mp4';

// ─── Hero Story Section Image ─────────────────────────────────────────────────
// Replace with your Cloudinary image URL:
export const heroStoryImage = 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454194/IMG_7508.JPG_rszuxv.jpg';

// ─── Founder Portrait Image ───────────────────────────────────────────────────
// Replace this URL with your actual Cloudinary image link for Chotu's portrait:
export const founderPortrait = 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780043244/ChatGPT_Image_May_29_2026_12_25_59_PM_pzy2yo.png';


// ─── Hero Images ─────────────────────────────────────────────────────────────
export const heroImages = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454187/IMG_7504.JPG_ifsymp.jpg',
    alt: 'Wedding couple portrait',
  },

];


// ─── Featured Works — Home Page Gallery (swap URLs with your Cloudinary links) ──
// Cloudinary 4K URL format:
//   https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/q_auto,f_auto,w_3840/YOUR_PUBLIC_ID
export const featuredImages = [
  { id: 1, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454200/IMG_7505.JPG_dadpjm.jpg', alt: 'Wedding couple portrait', label: 'Priya & Karthik', wide: true, tall: false },
  { id: 2, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454194/IMG_7508.JPG_rszuxv.jpg', alt: 'Romantic wedding ceremony', label: 'Swetha & Rajesh', wide: false, tall: true },
  { id: 3, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456284/IMG_7491.JPG_m79gzc.jpg', alt: 'Grand reception hall', label: 'Divya & Suresh', wide: false, tall: false },
  { id: 4, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456301/IMG_7493.JPG_pzyghh.jpg', alt: 'Candid wedding moment', label: 'Anitha & Venkat', wide: false, tall: false },
  { id: 5, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456267/IMG_7489.JPG_bf2lbv.jpg', alt: 'Bride getting ready', label: 'Lakshmi & Prasad', wide: true, tall: false },
  { id: 6, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454212/IMG_7512.JPG_fwnzyu.jpg', alt: 'Wedding rings close-up', label: 'Mounika & Anil', wide: false, tall: false },
  { id: 7, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454201/IMG_7509.JPG_hps8wp.jpg', alt: 'Bride portrait traditional', label: 'Sravani & Naveen', wide: false, tall: true },
  { id: 8, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454209/IMG_7514.JPG_tfsbw3.jpg', alt: 'Couple first dance', label: 'Padmaja & Ravi', wide: false, tall: false },
  { id: 9, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454187/IMG_7504.JPG_ifsymp.jpg', alt: 'Wedding mandap ceremony', label: 'Bhavani & Srinivas', wide: true, tall: false },
  { id: 10, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454188/IMG_7500_aocokv.jpg', alt: 'Emotional family moment', label: 'Deepika & Kumar', wide: false, tall: false },
  { id: 11, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454193/IMG_7507.JPG_iqysfw.jpg', alt: 'Golden hour couple shoot', label: 'Anusha & Venkat', wide: false, tall: false },
  {
    id: 12, cloudinaryUrl: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454225/IMG_7498_rkswac.jpg', alt: 'Cinematic bridal portrait', label: 'Sirisha & Nagendra', wide: false, tall: true
  },
];

// ─── About Section Images ─────────────────────────────────────────────────────
export const aboutImages = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_900/v1779454209/IMG_7514.JPG_tfsbw3.jpg',
    alt: 'Photographer at work during wedding',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_900/v1779454200/IMG_7505.JPG_dadpjm.jpg',
    alt: 'Wedding couple candid moment',
  },
];

// ─── Gallery / Our Clicks ─────────────────────────────────────────────────────
// Custom panoramic landscape image for the Gallery Section Header:
export const galleryHeaderImage = 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454187/IMG_7504.JPG_ifsymp.jpg';

export const galleryImages = [
  // ── WEDDING ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034626/IMG_7611.JPG_qylpw4.jpg',
    alt: 'Wedding candid moment',
    category: 'wedding',
    tall: true,
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034622/IMG_7621.JPG_jrs0gt.jpg',
    alt: 'Bridal ceremony shot',
    category: 'wedding',
    tall: false,
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034621/IMG_7612.JPG_naqds3.jpg',
    alt: 'Wedding rituals close-up',
    category: 'wedding',
    tall: false,
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034621/IMG_7619.JPG_wisbqm.jpg',
    alt: 'Couple portrait outdoors',
    category: 'wedding',
    tall: true,
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034620/IMG_7620.JPG_pbb74y.jpg',
    alt: 'Romantic wedding frame',
    category: 'wedding',
    tall: false,
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034620/IMG_7618.JPG_twvufe.jpg',
    alt: 'Cinematic wedding moment',
    category: 'wedding',
    tall: false,
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034619/IMG_7613.JPG_h9j3iq.jpg',
    alt: 'Mandap ceremony detail',
    category: 'wedding',
    tall: true,
  },
  {
    id: 8,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034617/IMG_7616.JPG_rngkxi.jpg',
    alt: 'Bride and groom together',
    category: 'wedding',
    tall: false,
  },
  {
    id: 9,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034617/IMG_7617.JPG_yihttp.jpg',
    alt: 'Sacred wedding vows',
    category: 'wedding',
    tall: false,
  },
  {
    id: 10,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034612/IMG_7615.JPG_drp6ut.jpg',
    alt: 'Emotional bridal moment',
    category: 'wedding',
    tall: true,
  },
  {
    id: 11,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034600/IMG_7609.JPG_kwncgi.jpg',
    alt: 'Traditional wedding ceremony',
    category: 'wedding',
    tall: false,
  },
  {
    id: 12,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034613/IMG_7614.JPG_vlf4jy.jpg',
    alt: 'Timeless wedding portrait',
    category: 'wedding',
    tall: false,
  },
  {
    id: 13,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034357/IMG_7607.JPG_t5atsi.jpg',
    alt: 'Wedding celebration candid',
    category: 'wedding',
    tall: true,
  },
  {
    id: 14,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035208/IMG_7623.JPG_vi1wov.jpg',
    alt: 'Beautiful bride portrait',
    category: 'wedding',
    tall: false,
  },
  {
    id: 15,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035209/IMG_7626.JPG_flgjsx.jpg',
    alt: 'Couple first glance',
    category: 'wedding',
    tall: false,
  },
  {
    id: 16,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035211/IMG_7628.JPG_lg7yqz.jpg',
    alt: 'Wedding reception moment',
    category: 'wedding',
    tall: true,
  },
  {
    id: 17,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035211/IMG_7629.JPG_jbupli.jpg',
    alt: 'Joyful wedding candid',
    category: 'wedding',
    tall: false,
  },
  {
    id: 18,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035211/IMG_7627.JPG_bgzmth.jpg',
    alt: 'Intimate wedding detail',
    category: 'wedding',
    tall: false,
  },
  {
    id: 19,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035215/IMG_7636.JPG_c6lhqo.jpg',
    alt: 'Grand wedding entry',
    category: 'wedding',
    tall: true,
  },
  {
    id: 20,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035218/IMG_7640.JPG_txdf8q.jpg',
    alt: 'Emotional family blessing',
    category: 'wedding',
    tall: false,
  },
  {
    id: 21,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035221/IMG_7634.JPG_sezfkz.jpg',
    alt: 'Golden hour wedding shot',
    category: 'wedding',
    tall: false,
  },
  {
    id: 22,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780035223/IMG_7633.JPG_tz955p.jpg',
    alt: 'Couple romantic portrait',
    category: 'wedding',
    tall: true,
  },
  // ── CHILD ────────────────────────────────────────────────────────────────────
  {
    id: 23,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454213/IMG_7503_x7pq0d.jpg',
    alt: 'Child cute portrait',
    category: 'child',
    tall: false,
  },
  {
    id: 24,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454217/IMG_7502_kgnlmu.jpg',
    alt: 'Child playful moment',
    category: 'child',
    tall: false,
  },
  {
    id: 25,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454188/IMG_7500_aocokv.jpg',
    alt: 'Child laughing candid',
    category: 'child',
    tall: true,
  },
  {
    id: 26,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454225/IMG_7498_rkswac.jpg',
    alt: 'Child sweet glance',
    category: 'child',
    tall: false,
  },
  {
    id: 27,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454225/IMG_7499_csmnhf.jpg',
    alt: 'Child festive look',
    category: 'child',
    tall: false,
  },
  {
    id: 28,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456302/IMG_7486.JPG_gs563n.jpg',
    alt: 'Child traditional smile',
    category: 'child',
    tall: true,
  },
  {
    id: 29,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456284/IMG_7491.JPG_m79gzc.jpg',
    alt: 'Child pure joy',
    category: 'child',
    tall: false,
  },
  {
    id: 30,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456267/IMG_7489.JPG_bf2lbv.jpg',
    alt: 'Child cute smile',
    category: 'child',
    tall: false,
  },
  {
    id: 31,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456071/IMG_7491.JPG_pibgis.jpg',
    alt: 'Child celebration frame',
    category: 'child',
    tall: true,
  },
  // ── PRE WEDDING ──────────────────────────────────────────────────────────────
  {
    id: 32,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454187/IMG_7504.JPG_ifsymp.jpg',
    alt: 'Romantic pre-wedding couple',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 33,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454193/IMG_7507.JPG_iqysfw.jpg',
    alt: 'Pre-wedding couple shoot',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 34,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454194/IMG_7508.JPG_rszuxv.jpg',
    alt: 'Pre-wedding outdoor couple',
    category: 'pre-wedding',
    tall: true,
  },
  {
    id: 35,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454200/IMG_7505.JPG_dadpjm.jpg',
    alt: 'Pre-wedding romantic frame',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 36,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454201/IMG_7509.JPG_hps8wp.jpg',
    alt: 'Pre-wedding elegance',
    category: 'pre-wedding',
    tall: true,
  },
  {
    id: 37,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454201/IMG_7510.JPG_lpf3gt.jpg',
    alt: 'Pre-wedding traditional couple',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 38,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454206/IMG_7513.JPG_ryhxv7.jpg',
    alt: 'Pre-wedding mandap frame',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 39,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454209/IMG_7514.JPG_tfsbw3.jpg',
    alt: 'Pre-wedding dance shoot',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 40,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454212/IMG_7512.JPG_fwnzyu.jpg',
    alt: 'Pre-wedding ring shot',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 41,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454216/IMG_7511.JPG_jntvae.jpg',
    alt: 'Pre-wedding cinematic portrait',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 42,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454217/IMG_7506.JPG_niffab.jpg',
    alt: 'Pre-wedding traditional portrait',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 43,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456154/IMG_7497.JPG_hcaerg.jpg',
    alt: 'Pre-wedding warm moments',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 44,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456278/IMG_7496.JPG_sii37o.jpg',
    alt: 'Pre-wedding sweet couple',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 45,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456296/IMG_7495.JPG_mshqyu.jpg',
    alt: 'Pre-wedding couple closeness',
    category: 'pre-wedding',
    tall: true,
  },
  {
    id: 46,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456301/IMG_7493.JPG_pzyghh.jpg',
    alt: 'Pre-wedding cute look',
    category: 'pre-wedding',
    tall: false,
  },
  {
    id: 47,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456301/IMG_7494.JPG_wspyas.jpg',
    alt: 'Pre-wedding beautiful smiles',
    category: 'pre-wedding',
    tall: false,
  },
  // ── EVENT ────────────────────────────────────────────────────────────────────
  {
    id: 50,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034350/IMG_7591.JPG_bpabm4.jpg',
    alt: 'Event candid shot',
    category: 'event',
    tall: true,
  },
  {
    id: 51,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034352/IMG_7596.JPG_dkfglz.jpg',
    alt: 'Event decor detail',
    category: 'event',
    tall: false,
  },
  {
    id: 52,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034353/IMG_7592.JPG_h6wsip.jpg',
    alt: 'Event gathering moment',
    category: 'event',
    tall: false,
  },
  {
    id: 53,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034353/IMG_7593.JPG_i9mh2m.jpg',
    alt: 'Celebration highlight',
    category: 'event',
    tall: true,
  },
  {
    id: 54,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034353/IMG_7599.JPG_ikevi1.jpg',
    alt: 'Event ceremony detail',
    category: 'event',
    tall: false,
  },
  {
    id: 55,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034354/IMG_7600.JPG_dsh97k.jpg',
    alt: 'Grand event hall',
    category: 'event',
    tall: false,
  },
  {
    id: 56,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034359/IMG_7585.JPG_npzqht.jpg',
    alt: 'Event moments captured',
    category: 'event',
    tall: true,
  },
  {
    id: 57,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034358/IMG_7598.JPG_g6zrnk.jpg',
    alt: 'Event photography candid',
    category: 'event',
    tall: false,
  },
  {
    id: 58,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034360/IMG_7605.JPG_m9kaaj.jpg',
    alt: 'Special event portrait',
    category: 'event',
    tall: false,
  },
  {
    id: 59,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034361/IMG_7602.JPG_osynmd.jpg',
    alt: 'Event joyful moment',
    category: 'event',
    tall: true,
  },
  {
    id: 60,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1780034361/IMG_7595.JPG_znlfsy.jpg',
    alt: 'Event group celebration',
    category: 'event',
    tall: false,
  },
  {
    id: 61,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454187/IMG_7504.JPG_ifsymp.jpg',
    alt: 'Event cinematic frame',
    category: 'event',
    tall: false,
  },
  // ── OLD WEDDING (restored) ───────────────────────────────────────────────────
  {
    id: 101,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454200/IMG_7505.JPG_dadpjm.jpg',
    alt: 'Wedding couple portrait',
    category: 'archive',
    tall: false,
  },
  {
    id: 102,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454194/IMG_7508.JPG_rszuxv.jpg',
    alt: 'Romantic wedding ceremony',
    category: 'archive',
    tall: true,
  },
  {
    id: 103,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456301/IMG_7493.JPG_pzyghh.jpg',
    alt: 'Candid wedding moment',
    category: 'archive',
    tall: false,
  },
  {
    id: 104,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456267/IMG_7489.JPG_bf2lbv.jpg',
    alt: 'Bride getting ready',
    category: 'archive',
    tall: false,
  },
  {
    id: 105,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454212/IMG_7512.JPG_fwnzyu.jpg',
    alt: 'Wedding rings close-up',
    category: 'archive',
    tall: false,
  },
  {
    id: 106,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454201/IMG_7509.JPG_hps8wp.jpg',
    alt: 'Bride portrait traditional',
    category: 'archive',
    tall: true,
  },
  {
    id: 107,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454187/IMG_7504.JPG_ifsymp.jpg',
    alt: 'Wedding mandap ceremony',
    category: 'archive',
    tall: false,
  },
  {
    id: 108,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454188/IMG_7500_aocokv.jpg',
    alt: 'Emotional family moment',
    category: 'archive',
    tall: false,
  },
  {
    id: 109,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454193/IMG_7507.JPG_iqysfw.jpg',
    alt: 'Golden hour couple shoot',
    category: 'archive',
    tall: false,
  },
  {
    id: 110,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454225/IMG_7498_rkswac.jpg',
    alt: 'Cinematic bridal portrait',
    category: 'archive',
    tall: true,
  },
  {
    id: 111,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto/f_auto/v1779456301/IMG_7494.JPG_wspyas.jpg',
    alt: 'Candid wedding portrait',
    category: 'archive',
    tall: false,
  },
  {
    id: 112,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto/f_auto/v1779456302/IMG_7486.JPG_gs563n.jpg',
    alt: 'Wedding ceremony moment',
    category: 'archive',
    tall: false,
  },
  {
    id: 113,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456296/IMG_7495.JPG_mshqyu.jpg',
    alt: 'Beautiful bride portrait',
    category: 'archive',
    tall: false,
  },
  {
    id: 114,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456278/IMG_7496.JPG_sii37o.jpg',
    alt: 'Romantic couple candid',
    category: 'archive',
    tall: false,
  },
  {
    id: 115,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456154/IMG_7497.JPG_hcaerg.jpg',
    alt: 'Traditional wedding details',
    category: 'archive',
    tall: false,
  },
  {
    id: 116,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779456071/IMG_7491.JPG_pibgis.jpg',
    alt: 'Groom and bride portrait',
    category: 'archive',
    tall: false,
  },
  {
    id: 117,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454225/IMG_7499_csmnhf.jpg',
    alt: 'Cinematic ceremony detail',
    category: 'archive',
    tall: false,
  },
  {
    id: 118,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454217/IMG_7506.JPG_niffab.jpg',
    alt: 'Wedding celebration joy',
    category: 'archive',
    tall: false,
  },
  {
    id: 119,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454217/IMG_7502_kgnlmu.jpg',
    alt: 'Couple traditional ceremony',
    category: 'archive',
    tall: false,
  },
  {
    id: 120,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454216/IMG_7511.JPG_jntvae.jpg',
    alt: 'Smiling couple portrait',
    category: 'archive',
    tall: false,
  },
  {
    id: 121,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454213/IMG_7503_x7pq0d.jpg',
    alt: 'Bride dynamic entry',
    category: 'archive',
    tall: false,
  },
  {
    id: 122,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454206/IMG_7513.JPG_ryhxv7.jpg',
    alt: 'Mandap rituals',
    category: 'archive',
    tall: false,
  },
  {
    id: 123,
    url: 'https://res.cloudinary.com/dsl7vekda/image/upload/v1779454201/IMG_7510.JPG_lpf3gt.jpg',
    alt: 'Happy bride portrait',
    category: 'archive',
    tall: false,
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const services = [
  {
    id: 1,
    title: 'Wedding Photography',
    subtitle: 'Eternal Moments',
    description:
      'We capture the raw emotion, intimate glances, and timeless elegance of your wedding day. Every frame is a handcrafted story that you will cherish forever.',
    image: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780034621/IMG_7612.JPG_naqds3.jpg',
    gallery: [
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780034621/IMG_7612.JPG_naqds3.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780035215/IMG_7636.JPG_c6lhqo.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780034619/IMG_7613.JPG_h9j3iq.jpg',
    ],
    features: ['Full Day Coverage', 'Second Shooter', 'Edited Gallery', 'Premium Album'],
    price: 'Starting ₹45,000',
    ctaLabel: 'Build a Quote',
    ctaHash: '#quote',
  },
  {
    id: 2,
    title: 'Pre Wedding Photography',
    subtitle: 'Love Before The Vows',
    description:
      'Celebrate your love story with a cinematic pre-wedding shoot in breathtaking locations. We craft dreamy, romantic frames that perfectly set the tone for your big day.',
    image: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454201/IMG_7509.JPG_hps8wp.jpg',
    gallery: [
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454201/IMG_7509.JPG_hps8wp.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454201/IMG_7510.JPG_lpf3gt.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779456296/IMG_7495.JPG_mshqyu.jpg',
    ],
    features: ['Outdoor Locations', 'Cinematic Editing', 'Couple Portraits', 'Golden Hour Shots'],
    price: 'Starting ₹15,000',
    ctaLabel: 'Book Your Story With Us',
    ctaHash: '#quote',
  },
  {
    id: 3,
    title: 'Baby Portraits',
    subtitle: 'Innocent Stories',
    description:
      'Babies are the most authentic subjects. We create playful, heartfelt portraits that freeze fleeting moments of early childhood into lifelong memories.',
    image: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454225/IMG_7499_csmnhf.jpg',
    gallery: [
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454225/IMG_7499_csmnhf.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454225/IMG_7498_rkswac.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454217/IMG_7502_kgnlmu.jpg',
    ],
    features: ['Newborn Sessions', 'Studio Shoots', 'Candid Moments', 'Family Portraits'],
    price: 'Starting ₹12,000',
    ctaLabel: 'Book Your Story With Us',
    ctaHash: '#quote',
  },
  {
    id: 4,
    title: 'Event Organizer',
    subtitle: 'Grand Celebrations',
    description:
      'From corporate galas to milestone parties, we organize and document every detail of your special events with precision, creativity, and artistic vision.',
    image: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780034359/IMG_7585.JPG_npzqht.jpg',
    gallery: [
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780034359/IMG_7585.JPG_npzqht.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780034360/IMG_7605.JPG_m9kaaj.jpg',
      'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1780034361/IMG_7602.JPG_osynmd.jpg',
    ],
    features: ['Corporate Events', 'Birthday Parties', 'Engagements', 'Cultural Events'],
    price: 'Starting ₹18,000',
    ctaLabel: 'Book Your Story With Us',
    ctaHash: '#quote',
  },
];


// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Sravani & Venkatesh',
    date: 'December 2024 · Nellore',
    text: 'Maa pelli photos chusi meeru andariki chupiyalem — RC Wedding Stories team capture chesina oka oka moment chala heart touching ga undi. Muhurtham nundi reception varaku anni andariki nachayi. Thank you so much!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: 2,
    name: 'Lakshmi & Suresh Babu',
    date: 'February 2025 · Nellore',
    text: 'We had a grand Telugu wedding and RC Wedding Stories covered every ritual beautifully — from the Pellikoduku ceremony to the final reception. The cinematic quality is beyond our expectations. Every photo looks like a film still!',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80',
  },
  {
    id: 3,
    name: 'Padmaja & Ramakrishna',
    date: 'November 2024 · Kavali, Nellore',
    text: 'Maa illu varaku vachi anni arrange chesukuni, chala patiently anni moments capture chesaru. Photos chusinappudu maa eyes lo tears vachayi — meeru chala talented photographers. Forever grateful!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    id: 4,
    name: 'Deepika & Anil Kumar',
    date: 'January 2025 · Nellore',
    text: 'RC Wedding Stories is the best photography team in Nellore! Our wedding album is absolutely stunning. The team captured everything from our Haldi to Saptapadi with such artistic vision. Every single guest complimented our photos!',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
  },
  {
    id: 5,
    name: 'Mounika & Prasad',
    date: 'March 2025 · Atmakur, Nellore',
    text: 'Chala affordable ga premium quality photography icharu. Oka frame kuda waste kaadu — anni photos chala beautiful ga unnai. Maa relatives andhariki RC Wedding Stories gurinchi cheppamu, pakka recommend chestam!',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
  },
  {
    id: 6,
    name: 'Sirisha & Nagendra',
    date: 'April 2025 · Nellore',
    text: 'From the very first call to the final delivery, the entire experience was world-class. They captured our Nellore wedding traditions so authentically — the kanyadanam, the talambralu, everything. Truly a treasure for life.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80',
  },
  {
    id: 7,
    name: 'Bhavani & Srinivas',
    date: 'October 2024 · Nellore',
    text: 'Meeru chestharu ani expect chesindi kanna ekkuva chesaru. Maa pelli video chusinappudu cinema chustunna anipinchindi! Background music, editing anni chala professional ga undi. 10/10 recommend!',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80',
  },
  {
    id: 8,
    name: 'Swetha & Rajesh',
    date: 'January 2025 · Gudur, Nellore',
    text: 'Our families were amazed by the photography. The team covered our 3-day wedding without missing even a single moment — from the mehendi night to the bidaai. The photos are simply priceless. Best decision we made!',
    avatar: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=200&q=80',
  },
  {
    id: 9,
    name: 'Anusha & Venkat Rao',
    date: 'February 2025 · Nellore',
    text: 'RC Wedding Stories team chala friendly ga untaru — maa family andharitho chala comfortable ga mingle ayyaru. Tension lekundane anni moments capture chesaru. Maa ammayiki oka beautiful memory icchinanduku chala thanks!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = [
  { value: '500+', label: 'Weddings Captured' },
  { value: '4+', label: 'Years of Experience' },
  { value: '50K+', label: 'Photos Delivered' },
  { value: '100%', label: 'Happy Couples' },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks = {
  instagram: 'https://www.instagram.com/rc_wedding_stories_nellore?igsh=MXRlYzYxYW9rcG5nNw==',
  facebook: 'https://facebook.com/rcweddingstories',
  youtube: 'https://youtube.com/@rcweddingstories',
  whatsapp: 'https://wa.me/917730861421',
};
