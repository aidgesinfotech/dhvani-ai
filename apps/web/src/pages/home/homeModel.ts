export type HeroChip = { label: string; tone: 'gold' | 'cyan' };

export type Contributor = {
  name: string;
  country: string;
  flag: string;
  projects: number;
  photo: string;
  languages: string[];
  types: string[];
  tasks: string;
  glow?: string;
};

export type CountryCard = {
  country: string;
  flag: string;
  languages: string[];
  tasks: string;
  glow?: string;
};

export type TaskCard = {
  title: string;
  subtitle: string;
  body: string;
  icon: string;
};

export type MapRegion = {
  name: string;
  people: string;
  activity: number;
  langs: string[];
  tasks: [string, number][];
};

export type HomeSection = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  cards: string[];
  bullets: string[];
};

export type HomeContent = {
  seoTitle: string;
  seoDescription: string;
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    body: string;
    chips: HeroChip[];
    primaryLabel: string;
    primaryHint: string;
    primaryTo: string;
    secondaryLabel: string;
    secondaryHint: string;
    secondaryTo: string;
    image: string;
  };
  contributorsLabel: string;
  contributors: Contributor[];
  countriesEyebrow: string;
  countriesTitle: string;
  countriesBody: string;
  countries: CountryCard[];
  tasks: TaskCard[];
  regions: MapRegion[];
  sections: HomeSection[];
};

export const TASK_ICONS = [
  { id: 'mic', label: 'Microphone' },
  { id: 'text', label: 'Text' },
  { id: 'image', label: 'Image' },
  { id: 'video', label: 'Video' },
  { id: 'ocr', label: 'Document' },
  { id: 'label', label: 'Label' },
  { id: 'qa', label: 'Review' },
  { id: 'multi', label: 'Multimodal' },
  { id: 'studio', label: 'Studio' },
  { id: 'eval', label: 'Evaluation' },
  { id: 'agent', label: 'Agent' },
  { id: 'chat', label: 'Chat' },
  { id: 'ads', label: 'Advertising' },
] as const;

export const DEFAULT_HOME: HomeContent = {
  seoTitle: 'Dhvani.ai — We Build Data for AI Models',
  seoDescription:
    'Dhvani.Ai connects global AI teams with a distributed crowd network to collect, annotate and prepare high-quality data in multiple languages, across countries, for real-world AI applications.',
  hero: {
    eyebrow: 'Global AI data sourcing',
    line1: 'We Build Data',
    line2: 'for AI Models.',
    body: 'Dhvani.Ai connects global AI teams with a distributed crowd network to collect, annotate and prepare high-quality data in multiple languages, across countries, for real-world AI applications.',
    chips: [],
    primaryLabel: 'For AI Clients',
    primaryHint: 'Discuss Your Data Needs',
    primaryTo: '/contact-us',
    secondaryLabel: 'For Contributors',
    secondaryHint: 'Register & Get Projects',
    secondaryTo: '/collaborate-with-us#freelancer',
    image: '/images/hero-contributor.jpg',
  },
  contributorsLabel: 'Contributors',
  contributors: [
    { name: 'Ananya R.', country: 'India', flag: '🇮🇳', projects: 5, photo: '/images/contributor-ananya.jpg', languages: ['Hindi', 'Gujarati', 'English', 'Tamil'], types: ['Speech', 'Text', 'OCR'], tasks: 'Speech and documents', glow: 'border-fuchsia-400/55 shadow-[0_0_18px_rgba(232,121,249,0.4)]' },
    { name: 'Maria D.', country: 'Philippines', flag: '🇵🇭', projects: 3, photo: '/images/contributor-maria.jpg', languages: ['Filipino', 'Cebuano', 'English'], types: ['Speech', 'Transcription', 'Text'], tasks: 'Speech and transcripts', glow: 'border-sky-400/55 shadow-[0_0_18px_rgba(56,189,248,0.4)]' },
    { name: 'Lucas M.', country: 'Brazil', flag: '🇧🇷', projects: 4, photo: '/images/contributor-lucas.jpg', languages: ['Portuguese', 'English'], types: ['Speech', 'Image', 'Annotation'], tasks: 'Images and video', glow: 'border-lime-300/55 shadow-[0_0_18px_rgba(190,242,100,0.35)]' },
    { name: 'Sofia R.', country: 'Mexico', flag: '🇲🇽', projects: 3, photo: '/images/contributor-sofia.jpg', languages: ['Spanish', 'English'], types: ['Speech', 'Text', 'QA'], tasks: 'Spanish voice data', glow: 'border-orange-400/55 shadow-[0_0_18px_rgba(251,146,60,0.4)]' },
    { name: 'Kenji T.', country: 'Japan', flag: '🇯🇵', projects: 4, photo: '/images/contributor-kenji.jpg', languages: ['Japanese', 'English'], types: ['Speech', 'Text', 'Evaluation'], tasks: 'Speech and evaluation', glow: 'border-rose-400/55 shadow-[0_0_18px_rgba(251,113,133,0.4)]' },
    { name: 'Aisha K.', country: 'UAE', flag: '🇦🇪', projects: 3, photo: '/images/contributor-aisha.jpg', languages: ['Arabic', 'English'], types: ['Speech', 'Text', 'Annotation'], tasks: 'Arabic speech notes', glow: 'border-amber-300/55 shadow-[0_0_18px_rgba(252,211,77,0.35)]' },
    { name: 'Thabo M.', country: 'South Africa', flag: '🇿🇦', projects: 4, photo: '/images/contributor-thabo.jpg', languages: ['English', 'Afrikaans', 'Zulu', 'Xhosa'], types: ['Speech', 'Image', 'Video'], tasks: 'Speech, image, video', glow: 'border-emerald-400/55 shadow-[0_0_18px_rgba(52,211,153,0.4)]' },
    { name: 'Élise L.', country: 'France', flag: '🇫🇷', projects: 3, photo: '/images/contributor-elise.jpg', languages: ['French', 'English'], types: ['Speech', 'Text', 'Annotation'], tasks: 'French voice notes', glow: 'border-blue-400/55 shadow-[0_0_18px_rgba(96,165,250,0.4)]' },
    { name: 'David S.', country: 'United States', flag: '🇺🇸', projects: 5, photo: '/images/contributor-david.jpg', languages: ['English', 'Spanish'], types: ['Speech', 'Image', 'Evaluation'], tasks: 'Speech and images', glow: 'border-pink-400/55 shadow-[0_0_18px_rgba(244,114,182,0.4)]' },
    { name: 'Emily C.', country: 'Canada', flag: '🇨🇦', projects: 4, photo: '/images/contributor-emily.jpg', languages: ['English', 'French'], types: ['Speech', 'Transcription', 'QA'], tasks: 'Images and QA', glow: 'border-violet-400/55 shadow-[0_0_18px_rgba(167,139,250,0.4)]' },
    { name: 'Rizky A.', country: 'Indonesia', flag: '🇮🇩', projects: 3, photo: '/images/contributor-rizky.jpg', languages: ['Indonesian', 'Javanese'], types: ['Speech', 'Text', 'Image'], tasks: 'Speech and images', glow: 'border-cyan-400/55 shadow-[0_0_18px_rgba(34,211,238,0.4)]' },
    { name: 'Chinelo E.', country: 'Nigeria', flag: '🇳🇬', projects: 4, photo: '/images/contributor-chinelo.jpg', languages: ['English', 'Hausa', 'Yoruba', 'Igbo'], types: ['Speech', 'Transcription', 'Evaluation'], tasks: 'Speech and evaluation', glow: 'border-purple-400/55 shadow-[0_0_18px_rgba(192,132,252,0.4)]' },
  ],
  countriesEyebrow: 'Countries & languages',
  countriesTitle: 'From your country, in your language',
  countriesBody: 'Languages we collect in each country — the same ones contributors speak on their tasks.',
  countries: [
    { country: 'India', flag: '🇮🇳', languages: ['Hindi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Kannada', 'Malayalam', 'Odia', 'Punjabi', 'Urdu'], tasks: 'Speech, OCR documents, images, video', glow: 'border-fuchsia-400/45 shadow-[0_0_22px_rgba(232,121,249,0.28)]' },
    { country: 'Philippines', flag: '🇵🇭', languages: ['Filipino', 'Cebuano', 'English'], tasks: 'Speech, transcription, conversations', glow: 'border-sky-400/45 shadow-[0_0_22px_rgba(56,189,248,0.28)]' },
    { country: 'Indonesia', flag: '🇮🇩', languages: ['Indonesian', 'Javanese'], tasks: 'Speech, text, image collection', glow: 'border-lime-300/45 shadow-[0_0_22px_rgba(190,242,100,0.24)]' },
    { country: 'Japan', flag: '🇯🇵', languages: ['Japanese'], tasks: 'Speech, transcription, AI evaluation', glow: 'border-rose-400/45 shadow-[0_0_22px_rgba(251,113,133,0.28)]' },
    { country: 'Brazil', flag: '🇧🇷', languages: ['Brazilian Portuguese'], tasks: 'Speech, images, video', glow: 'border-amber-300/45 shadow-[0_0_22px_rgba(252,211,77,0.26)]' },
    { country: 'Mexico', flag: '🇲🇽', languages: ['Mexican Spanish'], tasks: 'Speech, transcription, text annotation', glow: 'border-orange-400/45 shadow-[0_0_22px_rgba(251,146,60,0.28)]' },
    { country: 'Kenya', flag: '🇰🇪', languages: ['Swahili', 'English'], tasks: 'Speech, transcription, text', glow: 'border-emerald-400/45 shadow-[0_0_22px_rgba(52,211,153,0.28)]' },
    { country: 'Nigeria', flag: '🇳🇬', languages: ['English', 'Hausa', 'Yoruba', 'Igbo'], tasks: 'Speech, text, language QA', glow: 'border-violet-400/45 shadow-[0_0_22px_rgba(167,139,250,0.28)]' },
    { country: 'France', flag: '🇫🇷', languages: ['French'], tasks: 'Speech, transcription, translation QA', glow: 'border-blue-400/45 shadow-[0_0_22px_rgba(96,165,250,0.28)]' },
    { country: 'Germany', flag: '🇩🇪', languages: ['German'], tasks: 'Speech, text annotation, AI evaluation', glow: 'border-yellow-300/45 shadow-[0_0_22px_rgba(253,224,71,0.24)]' },
    { country: 'Egypt', flag: '🇪🇬', languages: ['Arabic', 'Egyptian Arabic'], tasks: 'Speech, transcription, conversational data', glow: 'border-cyan-400/45 shadow-[0_0_22px_rgba(34,211,238,0.28)]' },
    { country: 'United States', flag: '🇺🇸', languages: ['American English', 'Spanish'], tasks: 'Speech, image/video collection, AI evaluation', glow: 'border-pink-400/45 shadow-[0_0_22px_rgba(244,114,182,0.28)]' },
    { country: 'Canada', flag: '🇨🇦', languages: ['Canadian English', 'Canadian French'], tasks: 'Speech, transcription, language QA', glow: 'border-purple-400/45 shadow-[0_0_22px_rgba(192,132,252,0.28)]' },
    { country: 'Australia', flag: '🇦🇺', languages: ['Australian English'], tasks: 'Speech, image/video collection', glow: 'border-teal-300/45 shadow-[0_0_22px_rgba(94,234,212,0.26)]' },
  ],
  tasks: [
    { title: 'Speech & Audio Data', subtitle: 'Speak to train AI', body: 'Collect multilingual speech recordings, voice samples, conversations, and audio prompts for ASR, speech recognition, and text-to-speech (TTS) projects.', icon: 'mic' },
    { title: 'Text Data', subtitle: 'Write to train language models', body: 'Create multilingual text, conversational prompts, question-answer pairs, translations, and dialect-specific content for LLM training and evaluation.', icon: 'text' },
    { title: 'Image Collection', subtitle: 'Capture data for computer vision', body: 'Photograph real-world objects, products, environments, and everyday scenes for image classification, object detection, and visual AI training.', icon: 'image' },
    { title: 'Video & Egocentric Data', subtitle: 'Record real-world actions for AI', body: 'Capture video clips, first-person activities, and human-object interactions for video understanding, robotics, and embodied AI projects.', icon: 'video' },
    { title: 'Documents & OCR', subtitle: 'Turn documents into AI training data', body: 'Collect printed and handwritten documents for OCR, handwriting recognition, document classification, and information extraction projects.', icon: 'ocr' },
    { title: 'Annotation & Labeling', subtitle: 'Label data to teach AI', body: 'Annotate images, videos, audio, and text using bounding boxes, transcription, classification, segmentation, and other project-specific labels.', icon: 'label' },
    { title: 'Quality Assurance', subtitle: 'Validate data quality for AI', body: 'Review annotations, verify transcripts, check image and video submissions, and flag errors against project guidelines and quality benchmarks.', icon: 'qa' },
    { title: 'Multimodal Data', subtitle: 'Connect data across modalities', body: 'Source and prepare combined text, speech, image, and video datasets for multimodal models and real-world AI applications.', icon: 'multi' },
    { title: 'Studio Recording', subtitle: 'Record voices for speech AI', body: 'Record scripted speech, TTS training prompts, wake words, and voice datasets for speech synthesis, voice recognition, and conversational AI.', icon: 'studio' },
    { title: 'AI Data Evaluation', subtitle: 'Evaluate and improve AI models', body: 'Compare AI-generated responses, rate answer quality, assess relevance and accuracy, and provide human feedback for LLM evaluation and model benchmarking.', icon: 'eval' },
    { title: 'Agentic AI', subtitle: 'Build AI agents that take action', body: 'Develop and support agentic AI workflows, tool-using agents, and task automation to help businesses streamline complex processes and build intelligent AI solutions.', icon: 'agent' },
    { title: 'AI Chatbots & Conversational AI', subtitle: 'Create smarter AI conversations', body: 'Build and support AI-powered chatbots and virtual assistants for customer support, multilingual conversations, knowledge retrieval, and automated business interactions.', icon: 'chat' },
    { title: 'AI Video & Product Advertising', subtitle: 'Turn products into engaging video ads', body: 'Create AI-powered product promotional videos, marketing creatives, product demonstrations, and social media advertising content for brands and businesses.', icon: 'ads' },
  ],
  regions: [
    { name: 'India', people: '20K+', activity: 100, langs: ['Hindi', 'Gujarati', 'Tamil', 'Bengali', 'Marathi', 'Telugu'], tasks: [['Read speech · Hindi', 56], ['Conversational turns · Gujarati', 53], ['Street & storefront photos · India', 23]] },
    { name: 'Southeast Asia', people: '8K+', activity: 40, langs: ['Bahasa', 'Thai', 'Vietnamese', 'Tagalog'], tasks: [['Read speech · Bahasa', 61], ['Street signage photos', 44], ['Conversational turns · Thai', 38]] },
    { name: 'Middle East', people: '5K+', activity: 25, langs: ['Arabic', 'Farsi', 'Turkish'], tasks: [['Read speech · Arabic', 58], ['Storefront photos', 41], ['Conversational turns · Turkish', 33]] },
    { name: 'Europe', people: '6K+', activity: 30, langs: ['German', 'French', 'Spanish', 'Polish', 'English'], tasks: [['Read speech · German', 64], ['Retail shelf images', 47], ['RLHF preference pairs', 52]] },
    { name: 'North America', people: '5K+', activity: 25, langs: ['English (US)', 'Spanish (US)', 'French (CA)'], tasks: [['Read speech · English (US)', 71], ['Egocentric kitchen video', 36], ['RLHF preference pairs', 68]] },
    { name: 'Latin America', people: '3K+', activity: 15, langs: ['Portuguese (BR)', 'Spanish (LATAM)'], tasks: [['Read speech · Portuguese', 49], ['Street signage photos', 34], ['Conversational turns · Spanish', 42]] },
    { name: 'Africa', people: '3K+', activity: 15, langs: ['Swahili', 'Yoruba', 'Amharic', 'Zulu'], tasks: [['Read speech · Swahili', 57], ['Street & storefront photos', 28], ['Conversational turns · Yoruba', 31]] },
  ],
  sections: [
    { id: 'network', label: 'Contributor network', eyebrow: 'Crowd Network', title: 'Powered by a', accent: 'Global Contributor Network', body: 'We work with a distributed network of vetted contributors who collect real-world data — speech, images, video and text — on their own devices, in their own languages and environments. Every submission moves through automated checks and human review before it becomes part of a dataset.', cards: [], bullets: ['Screened and trained per project', 'Native speakers across regions', 'Real devices, real environments', 'Centralised quality control'] },
    { id: 'data-types', label: 'Data types', eyebrow: 'Data Types', title: 'Data That Teaches AI How', accent: 'the Real World Works', body: 'Every dataset starts with people recording, photographing, writing and judging in real conditions. These are the data types we collect, annotate and validate.', cards: ['Voice & Speech', 'Images', 'Video', 'Text', 'Human Preference', 'Geospatial Data', 'OCR & Document Data', 'Multimodal Data'], bullets: [] },
    { id: 'workflow', label: 'Workflow', eyebrow: 'Crowd Collection Workflow', title: 'Distributed Collection.', accent: 'Centralized Quality Control.', body: 'Contributors in many cities work at the same time on their own devices. Every submission then passes the same review and validation gates, so the dataset you receive is consistent no matter who recorded it.', cards: ['Recruit', 'Assign Tasks', 'Collect', 'Review', 'Validate', 'Deliver'], bullets: [] },
    { id: 'examples', label: 'Real-world examples', eyebrow: 'Real-World Collection', title: 'From Human Experience to', accent: 'AI Training Data', body: 'What collection looks like in practice: people completing structured tasks on their own phones and laptops, with every submission tracked, checked and traceable.', cards: ['Recording voice samples on a smartphone', 'Photographing documents, products and roads', 'Recording short videos of everyday activities', 'Completing conversational AI tasks', 'Comparing two AI responses', 'Labeling images'], bullets: [] },
    { id: 'pipeline', label: 'Pipeline', eyebrow: 'AI Training Data Categories', title: 'Built for Every Stage of the', accent: 'AI Data Pipeline', body: "From the first recording on a contributor's phone to the feedback that fine-tunes a model, every stage is run by trained people and checked before it moves on.", cards: ['Data Collection', 'Human Preference Data', 'Data Annotation', 'Data Labeling', 'Data Transcription', 'Data Validation', 'Data Curation', 'Dataset Quality Assurance', 'RLHF / Human Feedback', 'AI Response Evaluation'], bullets: [] },
    { id: 'quality', label: 'Quality', eyebrow: 'Quality Control', title: 'Quality Is Built Into', accent: 'Every Dataset', body: "Quality isn't a final inspection. It is checked at seven points, from who we let in to what we ship, so large datasets stay consistent and reliable.", cards: ['Contributor Screening', 'Task Instructions', 'Automated Checks', 'Human Review', 'Multi-Level Validation', 'Quality Scoring', 'Final Dataset'], bullets: [] },
    { id: 'use-cases', label: 'Use cases', eyebrow: 'Enterprise Use Cases', title: 'Helping AI Teams Build', accent: 'Better Models', body: 'Whatever your model does, it learns from data people created. We collect and prepare that data for the teams building these systems.', cards: ['Generative AI', 'Computer Vision', 'Speech AI', 'Autonomous Systems', 'Robotics', 'Search & Recommendation', 'Conversational AI', 'Document Intelligence', 'AI Safety & Evaluation', 'Multilingual AI'], bullets: [] },
    { id: 'regions', label: 'Map intro', eyebrow: 'Geographic Scale', title: 'Data Collection Across', accent: 'Regions and Languages', body: 'Contributors in every major market collect speech, images, video and text in their own languages and environments — coordinated from our head office in Vadodara, India.', cards: [], bullets: [] },
    { id: 'operations', label: 'Operations', eyebrow: 'Data Operations', title: 'Data Operations You Can', accent: 'See Running', body: 'Every project runs through one operations console: contributors, tasks, review queues, quality and coverage, tracked day by day.', cards: ['Tasks completed per day', 'Tasks by modality', 'Contributor activity', 'Task completion', 'Geographic distribution'], bullets: [] },
    { id: 'why-us', label: 'Why us', eyebrow: 'Why Dhvani.ai', title: 'Why Companies', accent: 'Work With Us', body: '', cards: ['Scale', 'Speed', 'Diversity', 'Quality', 'Customization', 'Security'], bullets: [] },
    { id: 'faq', label: 'FAQ intro', eyebrow: 'FAQ', title: 'Questions AI teams ask us', accent: '', body: 'How we collect, validate and deliver human-generated training data.', cards: [], bullets: [] },
    { id: 'start', label: 'Closing', eyebrow: 'Start a Project', title: 'Need Real-World Data for Your Next', accent: 'AI Model?', body: "Tell us what your AI model needs. We'll design the collection, annotation, validation, and delivery workflow around your requirements.", cards: [], bullets: [] },
  ],
};

export function mergeHome(saved: Partial<HomeContent> | null | undefined): HomeContent {
  if (!saved || typeof saved !== 'object' || !saved.hero) return DEFAULT_HOME;
  return {
    ...DEFAULT_HOME,
    ...saved,
    hero: {
      ...DEFAULT_HOME.hero,
      ...saved.hero,
      chips: saved.hero.chips ?? DEFAULT_HOME.hero.chips,
      primaryHint: saved.hero.primaryHint || DEFAULT_HOME.hero.primaryHint,
      secondaryHint: saved.hero.secondaryHint || DEFAULT_HOME.hero.secondaryHint,
    },
    contributors: saved.contributors?.length ? saved.contributors : DEFAULT_HOME.contributors,
    countries: saved.countries?.length ? saved.countries : DEFAULT_HOME.countries,
    tasks: saved.tasks?.length ? saved.tasks : DEFAULT_HOME.tasks,
    regions: saved.regions?.length ? saved.regions : DEFAULT_HOME.regions,
    sections: saved.sections?.length ? saved.sections : DEFAULT_HOME.sections,
  };
}
