/** Default imagery served from apps/web/public/images. All URLs remain editable in the CMS. */
const img = (name) => `/images/${name}.jpg`;

export const SERVICE_IMAGES = {
  'speech-data-collection': img('svc-speech'),
  'transcription-translation-qa': img('svc-transcription'),
  'data-annotation': img('svc-annotation'),
  'image-video-data-collection': img('svc-image-video'),
  'egocentric-video-data-collection': img('svc-egocentric'),
  'ocr-document-ai-data': img('svc-ocr'),
  'ai-data-validation-evaluation': img('svc-validation'),
  'studio-recording-tts': img('svc-studio'),
  'agentic-ai-solutions': img('svc-agentic'),
  'ai-business-advertising': img('svc-advertising'),
  'ai-film-making': img('svc-film'),
};

export const POST_COVERS = {
  'what-is-egocentric-video-data': img('svc-egocentric'),
  'building-multilingual-speech-datasets': img('svc-speech'),
  'why-llm-evaluation-needs-humans': img('svc-validation'),
  'ocr-document-ai-training-data': img('svc-ocr'),
};

/** page slug → section key → image_url (for single-image sections). */
export const PAGE_IMAGES = {
  home: {
    hero_extras: img('home-hero'),
    intro: img('home-intro'),
    human_layer: img('home-human'),
  },
  'about-us': {
    intro: img('about-team'),
    human_layer: img('about-human'),
  },
};

/** home showcase item label → image */
export const SHOWCASE_IMAGES = {
  'Egocentric video data collection': img('svc-egocentric'),
  'Speech collection': img('svc-speech'),
  Transcription: img('svc-transcription'),
  'Image annotation solution': img('svc-annotation'),
  'Image & video collection': img('svc-image-video'),
  'AI data validation & evaluation': img('svc-validation'),
  'Studio recording': img('svc-studio'),
};

/** Hero visuals for inner pages (section key `hero_media`). */
export const HERO_MEDIA = {
  services: { image_url: img('svc-annotation'), image_label: 'Dhvani.ai annotation workspace' },
  'collaborate-with-us': { image_url: img('collaborate-hero'), image_label: 'Partnership meeting at the Dhvani.ai office' },
  'contact-us': { image_url: img('contact-office'), image_label: 'Dhvani.ai office reception' },
};
