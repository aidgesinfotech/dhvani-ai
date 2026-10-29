/**
 * Page + section content for Dhvani.ai.
 * Each page's `sections` object is stored as page_sections rows (key → JSON) and is fully editable in the CMS.
 */

export const SETTINGS = {
  site_name: 'Dhvani.ai',
  logo_url: '',
  tagline: 'AI is Future',
  phone: '+91 99041 99042',
  whatsapp: '+917046070460',
  email: 'support@dhvani.ai.in',
  address: 'FF4-410, LE City Centre, Opp. District Court, Collector Office OP Road, Diwalipura, Vadodara, Gujarat 390007, India',
  city: 'Vadodara, Gujarat, India',
  business_hours: 'Mon – Sat · 10:00 AM – 7:00 PM IST',
  footer_blurb:
    'Dhvani.Ai — Building Data for the Future of AI. Let’s build the future of AI together. Let’s innovate, collaborate, and grow together in the AI-powered world.',
  cta_label: "Let's Talk",
  linkedin: '',
  instagram: '',
  facebook: '',
  youtube: '',
  x: '',
  seo_default_title: 'Dhvani.ai — AI Training Data, Data Collection & AI Solutions Company',
  seo_default_description:
    'Dhvani.ai builds the data that builds AI: multilingual speech, image, video and text datasets, annotation, LLM evaluation, studio recording and Agentic AI solutions across 100+ languages.',
};

const CLOSING_CTA = {
  eyebrow: 'Get in Touch',
  title: 'Ready to scale your AI data pipeline?',
  body: 'Let’s collaborate to build the data that drives the next generation of intelligent systems.',
  cta_primary: 'Start a Project',
  cta_secondary: 'Explore Services',
};

export const PAGES = [
  /* ------------------------------------------------------------------ HOME */
  {
    slug: 'home',
    title: 'Home',
    seo_title: 'Dhvani.ai — AI is the Future. We Build the Data That Builds AI.',
    seo_description:
      'Global AI training data company: speech datasets, egocentric & commercial video, image collection, 100% human transcription, annotation, LLM evaluation, TTS studio recording and Agentic AI.',
    hero_eyebrow: 'AI is the Future',
    hero_title: 'We Build the Data That Builds AI',
    hero_subtitle:
      'Dhvani.ai — global leader in AI training data, video datasets, custom data collection, AI agents and intelligent business automation. We deliver multilingual, multimodal datasets for NLP, LLM and computer vision. Whatever you need, we’re ready to build with you.',
    hero_cta_primary: "Let's Build the Future of AI Together",
    hero_cta_secondary: 'Explore Services',
    sections: {
      hero_extras: {
        note: 'AI is the Future — and we build its foundation through data.',
        image_url: '',
        image_label: 'Robot image — AI presenting (hero visual)',
        modalities: ['Speech', 'Video', 'Image', 'Text', 'LLM'],
        floating_cards: [
          { value: '100+', label: 'Languages & dialects' },
          { value: '50+', label: 'Countries supported' },
          { value: '275+', label: 'Projects delivered' },
        ],
      },
      capability_marquee: {
        items: [
          'Speech Datasets',
          'Egocentric Video',
          'Image & Video Collection',
          'Human Transcription',
          '2D – 3D Annotation',
          'LiDAR Labeling',
          'LLM Evaluation',
          'TTS Studio Recording',
          'OCR & Document AI',
          'AI Agents',
          'WhatsApp AI',
          'AI Film Making',
        ],
      },
      intro: {
        eyebrow: 'From Data to Intelligent AI',
        title: 'One ecosystem — from raw data to intelligent AI.',
        body: 'We bring together data collection, data quality, AI development, and intelligent automation under one ecosystem.',
        body_secondary:
          'Most AI teams stitch together separate vendors for collection, transcription, annotation, evaluation and deployment. Dhvani.ai gives you one accountable partner across the entire lifecycle — with native-language expertise, a global contributor network and quality engineering built into every step.',
        offer_title: 'What We Offer',
        offers: [
          { title: 'Scalable', icon: 'trending-up', body: 'From pilot projects to large-scale deployments.' },
          { title: 'Customized', icon: 'sliders-horizontal', body: 'Data and AI solutions designed around your requirements.' },
          { title: 'Quality Focused', icon: 'badge-check', body: 'Structured collection and quality-control processes.' },
          {
            title: 'Technology Driven',
            icon: 'cpu',
            body: 'Built for modern AI, Computer Vision, and Agentic AI applications.',
          },
        ],
        image_url: '',
        image_label: 'Data-to-AI ecosystem visual',
      },
      showcase: {
        eyebrow: 'Services',
        title: 'AI is the Future',
        title_accent: 'We Build the Data That Builds AI',
        body: 'Scroll through our core data services — each one engineered to give your models the real-world, multilingual data they need.',
        items: [
          {
            kicker: 'Egocentric Video Data Collection',
            title: 'Real-World Video Data for Smarter AI',
            subtitle: 'First-person video data for next-generation AI.',
            points: ['First-person POV capture', 'Human activities & object manipulation', 'Robotics & video understanding'],
            image_url: '',
            image_label: 'Egocentric video data collection',
            link: '/services/egocentric-video-data-collection',
          },
          {
            kicker: 'Speech Dataset Collection',
            title: 'Speech Datasets for Natural Language Processing',
            subtitle: 'Data collection – Mobile App (Android + Apple Store), WebApp, Acoustic Studio.',
            points: ['We cover 100+ GlobalX languages', 'Native speakers, demographic balance', 'Scripted & spontaneous speech'],
            image_url: '',
            image_label: 'Speech collection',
            link: '/services/speech-data-collection',
          },
          {
            kicker: 'Transcriptions, Segmentation, Proofreading, Translation, QA',
            title: '100% Human-Made Transcription Services',
            subtitle: 'We cover 100+ GlobalX languages — Client Tool, JSON File, SRT.',
            points: ['Verified multilingual quality checks', 'Global data collection', 'Time-stamped segmentation'],
            image_url: '',
            image_label: 'Transcription',
            link: '/services/transcription-translation-qa',
          },
          {
            kicker: 'Annotation — Image & Video | Audio & Text',
            title: '2D – 3D Bounding Box, Polygon, Semantic',
            subtitle: 'LiDAR annotation, speaker labeling on audio datasets, LLM & NLP.',
            points: ['LiDAR Annotation', 'Speaker Labeling on Audio Dataset', 'Large Language Model (LLM) & NLP'],
            image_url: '',
            image_label: 'Image annotation solution',
            link: '/services/data-annotation',
          },
          {
            kicker: 'Image & Video Dataset Collection',
            title: 'Global Excellence in Diverse Image & Video Collection',
            subtitle: 'On-Site Data Collection Services · Crowd-Sourced Data Collection.',
            points: ['Facial Recognition AI training', 'High Quality Global Data Collection', 'Commercial video datasets'],
            image_url: '',
            image_label: 'Image & video collection',
            link: '/services/image-video-data-collection',
          },
          {
            kicker: 'AI Data Validation & Evaluation Services',
            title: 'Training Data Validation, AI Model Evaluation',
            subtitle: 'Multimodal & multilingual human validation of outputs for accuracy.',
            points: ['Human validation across text, speech, image & video', 'LLM output evaluation', 'Bias detection'],
            image_url: '',
            image_label: 'AI data validation & evaluation',
            link: '/services/ai-data-validation-evaluation',
          },
          {
            kicker: 'Studio Recording (TTS – Text to Speech Data)',
            title: 'Voice & Speech Solutions',
            subtitle: 'AI Dubbing and Prompt Recording — professional recordings for AI and ML speech applications.',
            points: [
              'Audio and Video Production',
              'Virtual Assistant, E-Learning & E-Education',
              'Audiobook and Podcast',
            ],
            image_url: '',
            image_label: 'Studio recording',
            link: '/services/studio-recording-tts',
          },
        ],
      },
      languages: {
        eyebrow: 'Global Language Coverage',
        title: 'We cover 100+ GlobalX languages',
        body: 'Native speakers, linguists and reviewers across Indian, Asian, European, African and Middle-Eastern languages — including many low-resource languages.',
        items: [
          'Hindi', 'Gujarati', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'Odia',
          'Assamese', 'Urdu', 'English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Arabic', 'Mandarin',
          'Japanese', 'Korean', 'Indonesian', 'Vietnamese', 'Thai', 'Turkish', 'Russian', 'Swahili', 'Persian', 'Nepali',
        ],
      },
      services_intro: {
        eyebrow: 'What We Do',
        title: 'Complete AI data & technology services',
        body: 'From collecting raw speech, video and documents to evaluating LLM outputs and deploying AI agents — every service is available on its own or as one end-to-end programme.',
      },
      process_intro: {
        eyebrow: 'How We Deliver',
        title: 'From Raw Data to AI-Ready Intelligence',
        body: 'A proven delivery framework that takes your project from first conversation to production-grade datasets — with quality built into every step.',
      },
      agentic: {
        eyebrow: 'Agentic AI',
        title: 'From AI Data to Intelligent Action',
        body: 'Dhvani.ai is expanding from AI data into Agentic AI and intelligent automation — helping organizations move from traditional workflows to AI that gets work done.',
        items: [
          { title: 'AI Agents', icon: 'bot', body: 'AI systems designed to perform defined business tasks.' },
          { title: 'AI Chatbots', icon: 'message-square', body: 'Intelligent customer and employee experiences.' },
          { title: 'WhatsApp AI', icon: 'message-circle', body: 'AI-powered customer communication and automation.' },
          { title: 'Business Automation', icon: 'workflow', body: 'Connect AI with repetitive business processes.' },
          { title: 'Custom AI Solutions', icon: 'puzzle', body: 'Purpose-built AI applications for specific business requirements.' },
        ],
        cta: 'Explore Agentic AI',
        link: '/services/agentic-ai-solutions',
      },
      human_layer: {
        eyebrow: 'Human Intelligence + AI',
        title: 'The Human Layer Behind Better AI',
        body: 'The most advanced AI systems still depend on human intelligence. Dhvani.ai combines human expertise with technology and automation to create reliable AI data pipelines.',
        pillars: [
          {
            title: 'Global Data Collection',
            icon: 'globe',
            body: 'Purpose-built datasets sourced across geographies, languages, demographics, and real-world environments.',
          },
          {
            title: 'Human Intelligence',
            icon: 'users',
            body: 'Trained contributors, linguistic expertise, domain specialists, and human-in-the-loop workflows.',
          },
          {
            title: 'AI & Automation',
            icon: 'cpu',
            body: 'Technology-enabled workflows that accelerate collection, processing, validation, and evaluation.',
          },
          {
            title: 'Quality Engineering',
            icon: 'badge-check',
            body: 'Multi-stage quality controls designed around project-specific acceptance criteria.',
          },
          {
            title: 'Enterprise Delivery',
            icon: 'building-2',
            body: 'Scalable operational models designed for pilots, production programs, and complex global deployments.',
          },
        ],
        image_url: '',
        image_label: 'Human reviewers working alongside AI',
      },
      stats_intro: {
        eyebrow: 'Our Global Scale',
        title: 'Built across borders. Designed for the world.',
        body: 'Years of multilingual delivery experience, a global contributor network and hundreds of completed projects.',
      },
      industries: {
        eyebrow: 'Industries We Power',
        title: 'Data for AI that works in the real world',
        body: 'Our datasets and AI solutions support teams building products across every major industry.',
        items: [
          { title: 'Conversational & Voice AI', icon: 'mic', body: 'ASR, TTS, voice assistants and call analytics in 100+ languages.' },
          { title: 'Robotics & Embodied AI', icon: 'bot', body: 'Egocentric video and manipulation data for robots that learn from people.' },
          { title: 'Automotive & Mobility', icon: 'car', body: 'LiDAR, 2D/3D annotation and in-cabin speech for autonomous systems.' },
          { title: 'Retail & E-commerce', icon: 'shopping-bag', body: 'Product, shelf and shopper datasets for visual search and analytics.' },
          { title: 'Healthcare & Life Sciences', icon: 'heart-pulse', body: 'HIPAA-aligned workflows for medical speech, imaging and documents.' },
          { title: 'BFSI & Document AI', icon: 'landmark', body: 'OCR, KYC and invoice data for intelligent document processing.' },
          { title: 'Smart Cities & Security', icon: 'building-2', body: 'Scene, activity and facial recognition data collected with consent.' },
          { title: 'EdTech & Media', icon: 'graduation-cap', body: 'E-learning voice-overs, dubbing, captions and AI-generated content.' },
        ],
      },
      quality: {
        eyebrow: 'Quality & Compliance',
        title: 'Enterprise-grade quality. Secure by design.',
        body: 'Every dataset passes through multi-layer QA and secure, consent-driven workflows — so you can train and deploy with confidence.',
        items: [
          { title: 'Multi-Layer QA', icon: 'layers', body: 'Reviewer calibration, gold-standard checks and agreement scoring on every batch.' },
          { title: 'Consent-Driven Sourcing', icon: 'file-check', body: 'Informed consent and ethical sourcing for every contributor and participant.' },
          { title: 'Secure Workflows', icon: 'lock', body: 'Access-controlled environments, encrypted transfer and NDA-bound teams.' },
          { title: 'Custom Acceptance Criteria', icon: 'target', body: 'Quality metrics and scoring rubrics defined around your project.' },
        ],
        standards: ['GDPR-aligned', 'HIPAA-aligned', 'ISO 9001:2015 practices', 'NDA & DPA ready'],
        formats_title: 'Delivery Formats',
        formats: ['Client Tool', 'JSON', 'SRT', 'TXT', 'CSV', 'XML', 'WAV / FLAC', 'MP4'],
      },
      testimonials_intro: {
        eyebrow: 'Client Voices',
        title: 'Trusted by teams building AI',
        body: 'What AI teams say about working with Dhvani.ai.',
      },
      collaborate_teaser: {
        eyebrow: 'Collaborate With Us',
        title: 'Great AI is built by great people.',
        body: 'We collaborate with freelancers, agencies, and vendors worldwide to deliver high-quality, scalable, and ethical AI data solutions.',
        freelancer_title: 'I Am a Freelancer',
        freelancer_body: 'Linguists, transcribers, annotators, voice artists and data contributors — work on global AI projects from anywhere.',
        vendor_title: 'I Am a Vendor',
        vendor_body: 'Agencies, studios and data companies — partner with us on long-term, large-scale AI data programmes.',
        cta: 'Join Our Network',
      },
      faq_intro: {
        eyebrow: 'Frequently Asked',
        title: 'Questions, answered.',
        body: 'Everything you need to know about working with Dhvani.ai. Can’t find your answer? Our team is happy to help.',
      },
      closing_cta: CLOSING_CTA,
    },
  },

  /* ------------------------------------------------------------------ ABOUT */
  {
    slug: 'about-us',
    title: 'About Us',
    seo_title: 'About Dhvani.ai | Global AI Data Collection & AI Solutions Company',
    seo_description:
      'Dhvani.ai is a global AI data collection and AI solutions company, built across borders and designed for the world — combining human intelligence, AI and quality engineering.',
    hero_eyebrow: 'About Dhvani.ai',
    hero_title: 'Global AI Data Collection & AI Solutions Company',
    hero_subtitle:
      'Built Across Borders. Designed for the World. Dhvani.ai supports the complete AI data lifecycle — from collection to model evaluation — and builds AI solutions on top of it.',
    hero_cta_primary: 'Work With Us',
    hero_cta_secondary: 'Our Services',
    sections: {
      intro: {
        eyebrow: 'End-to-End AI Data Services',
        title: 'From Raw Data to AI-Ready Intelligence',
        body: 'Dhvani.ai supports the AI data lifecycle from collection to model evaluation.\n\n“Dhvani” means sound and voice — and that is where our story begins. Rooted in language and multilingual communication, we have grown into a global AI data partner delivering speech, image, video and text datasets, annotation, validation and evaluation for teams building the next generation of AI.\n\nToday we combine a global contributor network, native-language expertise and technology-enabled workflows to deliver data that is accurate, diverse and fit for purpose — and we are extending that expertise into AI agents and intelligent automation.',
        highlights: ['Collection', 'Annotation', 'Validation', 'Evaluation', 'AI Solutions'],
        image_url: '',
        image_label: 'Dhvani.ai team / office visual',
      },
      real_world: {
        eyebrow: 'AI Data, Built for the Real World',
        title: 'Data that is not only large — but right.',
        body: 'Today’s AI systems operate across languages, cultures, environments, devices, and human interactions. That requires data that is not only large—but accurate, diverse, representative, structured, and fit for purpose.',
        combines_title: 'Dhvani.ai combines:',
        items: [
          {
            title: 'Global Data Collection',
            icon: 'globe',
            body: 'Purpose-built datasets sourced across geographies, languages, demographics, and real-world environments.',
          },
          {
            title: 'Human Intelligence',
            icon: 'users',
            body: 'Trained contributors, linguistic expertise, domain specialists, and human-in-the-loop workflows.',
          },
          {
            title: 'AI & Automation',
            icon: 'cpu',
            body: 'Technology-enabled workflows that accelerate collection, processing, validation, and evaluation.',
          },
          {
            title: 'Quality Engineering',
            icon: 'badge-check',
            body: 'Multi-stage quality controls designed around project-specific acceptance criteria.',
          },
          {
            title: 'Enterprise Delivery',
            icon: 'building-2',
            body: 'Scalable operational models designed for pilots, production programs, and complex global deployments.',
          },
        ],
      },
      human_layer: {
        eyebrow: 'Human Intelligence + AI',
        title: 'The Human Layer Behind Better AI',
        body: 'The most advanced AI systems still depend on human intelligence.\n\nDhvani.ai combines human expertise with technology and automation to create reliable AI data pipelines. Machines bring speed and scale; people bring judgement, context, cultural understanding and accountability. Together, they produce data you can trust.',
        points: [
          'Native-language linguists and reviewers',
          'Domain specialists for complex projects',
          'Human-in-the-loop validation at every stage',
          'Automation that accelerates — never replaces — judgement',
        ],
        image_url: '',
        image_label: 'Human-in-the-loop review visual',
      },
      lifecycle_intro: {
        eyebrow: 'The AI Data Lifecycle',
        title: 'We support every stage of your AI data lifecycle',
        body: 'Engage us for a single stage or the complete journey — from the first recording to the final evaluation report.',
      },
      beyond: {
        eyebrow: 'Beyond Data',
        title: 'From AI Data to AI Solutions',
        body: 'Our technology capabilities extend beyond data services. Dhvani.ai also develops AI-powered business solutions designed to help organizations move from traditional workflows to intelligent automation.',
        items: [
          { title: 'AI Agents', icon: 'bot', body: 'Task-oriented AI agents designed around specific business workflows.' },
          { title: 'AI Chatbots', icon: 'message-square', body: 'Intelligent conversational experiences for customers and employees.' },
          { title: 'WhatsApp AI', icon: 'message-circle', body: 'AI-powered customer engagement and business automation through WhatsApp.' },
          { title: 'Intelligent Automation', icon: 'workflow', body: 'AI-driven workflows connecting people, systems, and business processes.' },
          { title: 'Custom AI Applications', icon: 'puzzle', body: 'Purpose-built AI solutions aligned with specific operational requirements.' },
        ],
      },
      scale: {
        eyebrow: 'Our Global Scale',
        title: 'Numbers that reflect our reach',
        body: 'Built across borders — trusted on projects across continents, languages and modalities.',
      },
      heritage: {
        eyebrow: 'Our Roots',
        title: 'Rooted in language. Built for AI.',
        body: 'Dhvani.ai began as a multilingual language-services company with deep roots in Vadodara, Gujarat, India — recognised as a Distinguished Member of the American Translators Association (ATA).\n\nYears of translating, localising, transcribing, dubbing and interpreting across 100+ Indian and 200+ international languages gave us something AI teams now need most: the ability to source, understand and quality-check human language at scale, with cultural nuance intact.',
        badge: 'Distinguished Member — American Translators Association (ATA)',
        services_title: 'Language services that shaped us',
        services: [
          'Translation & Transcreation',
          'Transcription',
          'Localization',
          'Voice Over, Dubbing & Subtitling',
          'Interpretation',
          'Accessibility & PDF Remediation',
          'Creative Media Localisation',
        ],
      },
      values: {
        eyebrow: 'What Drives Us',
        title: 'Vision, mission & values',
        items: [
          {
            title: 'Our Vision',
            icon: 'eye',
            body: 'To be the world’s most trusted partner for the human-quality data and AI solutions that power intelligent systems in every language.',
          },
          {
            title: 'Our Mission',
            icon: 'target',
            body: 'To build accurate, diverse and ethically sourced AI data — and turn it into practical AI that helps organizations work smarter.',
          },
          {
            title: 'Quality First',
            icon: 'badge-check',
            body: 'Every dataset is measured against clear acceptance criteria and reviewed by people before it reaches you.',
          },
          {
            title: 'Ethics & Consent',
            icon: 'shield-check',
            body: 'Informed consent, fair treatment of contributors and privacy-aware workflows are non-negotiable.',
          },
          {
            title: 'Security',
            icon: 'lock',
            body: 'Access-controlled environments, NDAs and secure transfer protect your data and IP.',
          },
          {
            title: 'Partnership',
            icon: 'handshake',
            body: 'Transparent communication and flexible engagement from pilot to enterprise scale.',
          },
        ],
      },
      why: {
        eyebrow: 'Why Dhvani.ai',
        title: 'Why AI teams choose us',
        items: [
          { title: 'One partner, full lifecycle', body: 'Collection, processing, annotation, validation, evaluation and AI solutions under one roof.' },
          { title: '100+ languages', body: 'Native speakers and linguists across Indian, global and low-resource languages.' },
          { title: 'Real-world diversity', body: 'Demographic balancing across regions, environments and devices.' },
          { title: 'Flexible scale', body: 'From a quick pilot to large-scale, multi-country production programmes.' },
          { title: 'Your tools, your formats', body: 'Client tools supported; delivery in JSON, SRT, TXT, CSV, XML and more.' },
          { title: 'Responsive team', body: 'A dedicated project manager and clear reporting from day one.' },
        ],
      },
      closing_cta: {
        eyebrow: 'Let’s Build Together',
        title: 'Let’s build the future of AI together.',
        body: 'Tell us what you are building. We’ll design the data — and the AI — to get you there.',
        cta_primary: 'Contact Us',
        cta_secondary: 'Explore Services',
      },
    },
  },

  /* --------------------------------------------------------------- SERVICES */
  {
    slug: 'services',
    title: 'Services',
    seo_title: 'AI Data Collection, Annotation, LLM Evaluation & AI Solutions | Dhvani.ai Services',
    seo_description:
      'Explore Dhvani.ai services: speech, image, egocentric video and OCR data collection, human transcription & translation, annotation, AI validation & LLM evaluation, TTS studio recording, Agentic AI and creative AI.',
    hero_eyebrow: 'Our Services',
    hero_title: 'AI data and AI solutions — under one ecosystem.',
    hero_subtitle:
      'Multilingual, multimodal datasets for NLP, LLM and computer vision — plus AI agents, automation and creative AI. Engage one service or the complete lifecycle.',
    hero_cta_primary: 'Discuss Your Project',
    hero_cta_secondary: 'Talk to an Expert',
    sections: {
      intro: {
        eyebrow: 'End-to-End',
        title: 'Everything your AI needs — from the first sample to the final model.',
        body: 'Our services are organised around the AI lifecycle. Start wherever you are: collect new data, process and label what you already have, validate and evaluate your models, or turn AI into business automation.',
        pillars: [
          { title: 'Collect', icon: 'database', body: 'Speech, image, video, egocentric and document data from a global contributor network.' },
          { title: 'Process', icon: 'tags', body: 'Human transcription, translation, segmentation and multimodal annotation.' },
          { title: 'Validate', icon: 'shield-check', body: 'Training-data validation and human evaluation of AI and LLM outputs.' },
          { title: 'Build', icon: 'bot', body: 'AI agents, chatbots, WhatsApp AI, automation and creative AI production.' },
        ],
      },
      catalog: {
        eyebrow: 'Service Catalogue',
        title: 'Explore our services',
        body: 'Each service links to a detailed page with capabilities, use cases, quality standards and delivery formats.',
      },
      channels: {
        eyebrow: 'How We Collect',
        title: 'Flexible collection channels for every project',
        body: 'We choose the right mix of channels for the quality, scale and diversity your model needs.',
        items: [
          { title: 'Mobile App (Android + iOS)', icon: 'smartphone', body: 'Scalable crowd-based and controlled recording across demographics and accents.' },
          { title: 'Web App', icon: 'globe', body: 'Browser-based collection for fast onboarding and remote participation.' },
          { title: 'Acoustic Studio', icon: 'headphones', body: 'Studio-grade recording for TTS, dubbing and high-fidelity speech.' },
          { title: 'On-Site Collection', icon: 'map-pin', body: 'Controlled, location-based capture with standardized protocols.' },
          { title: 'Crowd-Sourced Network', icon: 'users', body: 'Global contributors for rapid, diverse real-world data.' },
        ],
      },
      process_intro: {
        eyebrow: 'Our Process',
        title: 'How every engagement runs',
        body: 'A transparent, milestone-based process — so you always know what is happening, what is next and how quality is measured.',
      },
      formats: {
        eyebrow: 'Integration',
        title: 'Delivered the way your pipeline expects',
        body: 'We work inside your tools or deliver in standard formats with documented schemas and manifests.',
        items: ['Client Tool', 'JSON', 'SRT', 'TXT', 'CSV', 'XML', 'WAV / FLAC', 'MP4 / MOV', 'COCO / YOLO'],
      },
      faq_intro: {
        eyebrow: 'Services FAQ',
        title: 'Questions about our services',
        body: 'Answers to the questions AI teams ask us most often before starting a project.',
      },
      closing_cta: {
        eyebrow: 'Start a Project',
        title: 'Not sure where to start?',
        body: 'Share your use case and we’ll recommend the right mix of data and AI services — usually starting with a quick pilot.',
        cta_primary: 'Book a Consultation',
        cta_secondary: 'Collaborate With Us',
      },
    },
  },

  /* ------------------------------------------------------------ COLLABORATE */
  {
    slug: 'collaborate-with-us',
    title: 'Collaborate With Us',
    seo_title: 'Collaborate With Us — Freelancers & Vendors | Dhvani.ai',
    seo_description:
      'Join Dhvani.ai as a freelancer or vendor partner. Long-term, global opportunities in AI data collection, annotation, validation, transcription, translation and voice recording.',
    hero_eyebrow: 'Collaborate With Us – Freelancers & Vendors',
    hero_title: 'Great AI is built by great people.',
    hero_subtitle:
      'At Dhvani.ai, we collaborate with freelancers, agencies, and vendors worldwide to deliver high-quality, scalable, and ethical AI data solutions.',
    hero_cta_primary: 'I Am a Freelancer',
    hero_cta_secondary: 'I Am a Vendor',
    sections: {
      intro: {
        eyebrow: 'Why Partner With Us',
        title: 'Long-term, global opportunities',
        body: 'Whether you are an individual contributor or an established service provider, Dhvani.ai offers long-term, global opportunities across AI data collection, annotation, validation, and language services.',
      },
      benefits: {
        eyebrow: 'Benefits',
        title: 'What you get as a Dhvani.ai partner',
        items: [
          { title: 'Global Projects', icon: 'globe', body: 'Work on AI programmes for clients across continents and industries.' },
          { title: 'Steady, Long-Term Work', icon: 'calendar-check', body: 'Ongoing pipelines rather than one-off tasks for reliable partners.' },
          { title: 'Fair & Timely Payments', icon: 'wallet', body: 'Transparent rates and on-time payouts for approved work.' },
          { title: 'Work From Anywhere', icon: 'laptop', body: 'Remote-first projects with flexible schedules for freelancers.' },
          { title: 'Training & Guidelines', icon: 'graduation-cap', body: 'Clear project guidelines, onboarding and feedback to help you grow.' },
          { title: 'Ethical & Secure', icon: 'shield-check', body: 'Consent-driven, privacy-aware projects with professional standards.' },
        ],
      },
      opportunities: {
        eyebrow: 'Opportunity Areas',
        title: 'Where you can contribute',
        items: [
          { title: 'Data Collection', icon: 'database', body: 'Speech, image, video and egocentric data contribution and coordination.' },
          { title: 'Transcription & Translation', icon: 'languages', body: 'Human transcription, proofreading, translation and localization.' },
          { title: 'Annotation & Labeling', icon: 'tags', body: 'Image, video, LiDAR, audio and text annotation for AI models.' },
          { title: 'Validation & Evaluation', icon: 'shield-check', body: 'Reviewing AI and LLM outputs for accuracy, safety and bias.' },
          { title: 'Voice & Studio Recording', icon: 'mic', body: 'Voice artists and studios for TTS, dubbing and prompt recording.' },
          { title: 'Language QA', icon: 'badge-check', body: 'Native-language quality reviewers and linguistic leads.' },
        ],
      },
      roles: {
        freelancer_title: 'For Freelancers',
        freelancer_body: 'Individual professionals and contributors who want to work on global AI projects.',
        freelancer_roles: [
          'Transcribers & proofreaders',
          'Translators & linguists',
          'Data annotators',
          'Voice artists & speakers',
          'AI output evaluators',
          'Field data collectors',
        ],
        vendor_title: 'For Vendors',
        vendor_body: 'Agencies, studios and companies that can deliver capacity, quality and scale.',
        vendor_roles: [
          'Language service providers (LSPs)',
          'Annotation & BPO companies',
          'Recording studios',
          'Field research & data collection agencies',
          'Video production houses',
          'Technology & AI partners',
        ],
      },
      process_intro: {
        eyebrow: 'How It Works',
        title: 'From application to your first project',
        body: 'A simple, transparent onboarding process for freelancers and vendors.',
      },
      form_intro: {
        title: 'Vendor Registration Form – Dhvani.ai',
        body: 'Please fill the details below and we’ll be in touch right away.',
      },
      faq_intro: {
        eyebrow: 'Partner FAQ',
        title: 'Questions from freelancers & vendors',
        body: 'Common questions about joining the Dhvani.ai network.',
      },
      closing_cta: {
        eyebrow: 'Join the Network',
        title: 'Help build the data that builds AI.',
        body: 'Register today and our partner team will reach out with opportunities that match your languages and expertise.',
        cta_primary: 'Register Now',
        cta_secondary: 'Contact Us',
      },
    },
  },

  /* ------------------------------------------------------------------- BLOG */
  {
    slug: 'blog',
    title: 'Our Blog',
    seo_title: 'Our Blog — AI Data, LLM Evaluation & Agentic AI Insights | Dhvani.ai',
    seo_description:
      'Insights from Dhvani.ai on AI training data, speech datasets, egocentric video, annotation, LLM evaluation, OCR and Agentic AI.',
    hero_eyebrow: 'Our Blog',
    hero_title: 'Insights on the data that builds AI.',
    hero_subtitle:
      'Practical guides and perspectives on AI training data, multilingual speech, video datasets, annotation, LLM evaluation and Agentic AI.',
    hero_cta_primary: null,
    hero_cta_secondary: null,
    sections: {
      newsletter: {
        title: 'Get AI data insights in your inbox',
        body: 'Occasional, useful updates on datasets, evaluation and AI solutions. No spam.',
      },
    },
  },

  /* ---------------------------------------------------------------- CONTACT */
  {
    slug: 'contact-us',
    title: 'Contact Us',
    seo_title: 'Contact Dhvani.ai — Start Your AI Data Project',
    seo_description:
      'Contact Dhvani.ai in Vadodara, India for AI data collection, annotation, LLM evaluation, studio recording and Agentic AI. Call / WhatsApp +91 99041 99042.',
    hero_eyebrow: 'Get in Touch',
    hero_title: 'Ready to scale your AI data pipeline?',
    hero_subtitle:
      'Let’s collaborate to build the data that drives the next generation of intelligent systems. Tell us about your project — our team responds within one business day.',
    hero_cta_primary: null,
    hero_cta_secondary: null,
    sections: {
      form: {
        title: 'Tell us about your project',
        body: 'Share a few details and the right specialist will get back to you.',
      },
      next_steps: {
        eyebrow: 'What Happens Next',
        title: 'From message to pilot — fast',
        items: [
          { title: 'We review your brief', icon: 'inbox', body: 'A specialist studies your use case, languages, volumes and timelines.' },
          { title: 'Scoping call', icon: 'phone-call', body: 'We discuss requirements, quality metrics and the best delivery approach.' },
          { title: 'Proposal & pilot', icon: 'rocket', body: 'You receive a clear proposal — usually starting with a small pilot batch.' },
        ],
      },
      office: {
        eyebrow: 'Head Office',
        title: 'Visit us in Vadodara',
        body: 'Our head office is in the heart of Vadodara, Gujarat — serving clients and contributors across 50+ countries.',
      },
      faq_intro: {
        eyebrow: 'Before You Reach Out',
        title: 'Quick answers',
        body: 'A few things clients usually ask before getting in touch.',
      },
    },
  },
];
