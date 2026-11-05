/**
 * Page + section content for Dhvani.ai.
 * Each page's `sections` object is stored as page_sections rows (key → JSON) and is fully editable in the CMS.
 */

export const SETTINGS = {
  site_name: 'Dhvani.ai',
  logo_url: '',
  tagline: 'AI is Future',
  phone: '',
  whatsapp: '917046070460',
  whatsapp_uk: '447311304787',
  email: 'support@dhvani.ai.in',
  address: 'FF4-410, LE City Centre, Opp. District Court, Collector Office OP Road, Diwalipura, Vadodara, Gujarat 390007, India',
  city: 'Vadodara, Gujarat, India',
  business_hours: 'Mon – Sat · 10:00 AM – 7:00 PM IST',
  footer_blurb:
    'Dhvani.Ai — Building Data for the Future of AI. Let’s build the future of AI together. Let’s innovate, collaborate, and grow together in the AI-powered world.',
  newsletter_eyebrow: 'Newsletter',
  newsletter_title: 'Stay ahead in AI data.',
  newsletter_body: 'Insights on datasets, LLM evaluation and Agentic AI — no spam.',
  eva_kicker: 'Chat bot',
  eva_name: 'Eva',
  eva_message: 'Hi Eva, I would like to talk to Dhvani.ai.',
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
    seo_title: 'Dhvani.ai — We Build Data for AI Models',
    seo_description:
      'Dhvani.Ai connects global AI teams with a distributed crowd network to collect, annotate and prepare high-quality data in multiple languages, across countries, for real-world AI applications.',
    hero_eyebrow: 'Global AI data sourcing',
    hero_title: 'We Build Data for AI Models.',
    hero_subtitle:
      'Dhvani.Ai connects global AI teams with a distributed crowd network to collect, annotate and prepare high-quality data in multiple languages, across countries, for real-world AI applications.',
    hero_cta_primary: 'For AI Clients',
    hero_cta_secondary: 'For Contributors',
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
    seo_title: 'About Dhvani.ai | Global AI Data Collection, Crowdsourcing & AI Solutions',
    seo_description:
      'Dhvani.Ai is a global AI Data Collection, Crowdsourcing and AI Solutions Company connecting AI labs with worldwide data resources across Computer Vision, Generative AI, Physical AI, Agentic AI and Creative AI.',
    hero_eyebrow: 'About Us',
    hero_title: 'Global AI Data Collection, Crowdsourcing & AI Solutions Company',
    hero_subtitle:
      'We Are Connecting Global AI Labs with Worldwide Data Resources to Power the Future of Artificial Intelligence.',
    hero_cta_primary: 'Discuss Your AI Data Requirements',
    hero_cta_secondary: 'Work With Us',
    sections: {
      intro: {
        eyebrow: 'Who We Are',
        title: 'Built for the next generation of AI',
        body: 'Dhvani.Ai is a global AI Data Collection, Crowdsourcing and AI Solutions Company supporting artificial intelligence companies, AI research labs, LLM developers, technology enterprises and startups worldwide.\n\nWe connect global AI labs, technology innovators and enterprise organizations with the data resources, human intelligence and technology capabilities required to develop, train, evaluate and scale the next generation of intelligent AI systems.\n\nFrom developing intelligent robotics systems and autonomous solutions to building enterprise-grade AI platforms powered by Large Language Models (LLMs), Dhvani.Ai supports the evolving AI ecosystem with global data resources, specialized data operations and technology solutions.',
      },
      audiences: {
        crowd_eyebrow: 'For Contributors & Partners',
        crowd_title: 'Connecting AI Businesses with Global Crowd Resources',
        crowd_kicker: 'Crowd · freelancers · agencies',
        crowd_body:
          'For AI companies and technology enterprises, Dhvani.Ai offers dataset preparation services through crowdworkers, freelancers, vendors, recruitment agencies and field partners. We provide opportunities to participate in global AI data collection and data processing projects through our partner network.\n\nDhvani.Ai brings together AI businesses, global data resources and technology capabilities to help build the next generation of artificial intelligence.',
        crowd_cta: 'Work With Us',
        client_eyebrow: 'For AI Labs & Enterprise Clients',
        client_title: 'Global data resources for serious AI programmes',
        client_kicker: 'Discuss your AI data requirements',
        client_body:
          'From developing intelligent robotics systems and autonomous solutions to building enterprise-grade AI platforms powered by Large Language Models (LLMs), Dhvani.Ai supports the evolving AI ecosystem with global data resources, specialized data operations and technology solutions for AI research labs and enterprise teams.',
        client_cta: 'Discuss Your AI Data Requirements',
      },
      domains: {
        eyebrow: 'Data Collection Domains',
        title: 'Our capabilities span five key AI technology domains',
        body: 'Computer Vision, Generative AI, Physical AI, Agentic AI and Creative AI — the data-collection version of how we support each domain.',
        items: [
          {
            title: '01. Computer Vision',
            icon: 'eye',
            body: 'Enabling AI systems to interpret, analyze and understand images, videos and real-world visual environments.',
          },
          {
            title: '02. Generative AI',
            icon: 'sparkles',
            body: 'Supporting the development and advancement of AI models that generate text, images, audio, video and multimodal content.',
          },
          {
            title: '03. Physical AI',
            icon: 'cpu',
            body: 'Supporting intelligent robotics, autonomous systems and real-world AI applications through human activity, egocentric video and environmental data.',
          },
          {
            title: '04. Agentic AI',
            icon: 'bot',
            body: 'Enabling intelligent AI agents and autonomous workflows that can reason, plan, make decisions and execute tasks.',
          },
          {
            title: '05. Creative AI',
            icon: 'clapperboard',
            body: 'Supporting AI-powered creative applications across digital content, visual media, audio, music and multimedia experiences.',
          },
        ],
      },
      ecosystem: {
        eyebrow: 'Global Partner & Crowdsourcing Ecosystem',
        title: 'Global Partner & Crowdsourcing Ecosystem',
        body: 'Dhvani.Ai is building a global ecosystem of crowdworkers, freelancers, native language speakers, field data collection agencies, recruitment partners, vendors and technology specialists to support the growing demand for high-quality AI training data and AI solutions.\n\nOur partner ecosystem brings together independent contributors, professional agencies and strategic technology partners to deliver scalable, flexible and quality-driven AI data solutions worldwide.',
        categories: [
          'Crowdworkers & Individual Contributors',
          'Freelancers & Independent Professionals',
          'Native Speakers & Language Specialists',
          'Field Data Collection Agencies',
          'Recruitment & Crowdsourcing Partners',
          'AI Data Vendors & Service Providers',
          'Technology & Development Partners',
        ],
        closing:
          'Together, we connect global opportunities with local expertise, empowering people and organizations to contribute to the future of artificial intelligence.',
      },
      vision_mission: {
        eyebrow: 'Our Vision · Mission & Values Globally',
        title: 'Vision and Mission',
        items: [
          {
            title: 'Our Vision',
            body: 'To become a trusted global partner in AI data collection, crowdsourcing and technology solutions, empowering the next generation of artificial intelligence through global collaboration and innovation.',
          },
          {
            title: 'Our Mission',
            body: 'To connect AI innovators and enterprises with reliable global data resources, skilled human contributors and technology capabilities, delivering scalable, high-quality data and AI solutions across industries and markets.',
          },
        ],
      },
      values: {
        eyebrow: 'Our Core Values',
        title: 'What we stand for globally',
        items: [
          {
            title: 'Innovation',
            icon: 'sparkles',
            body: 'Embracing emerging technologies and continuously advancing AI data capabilities.',
          },
          {
            title: 'Quality & Excellence',
            icon: 'badge-check',
            body: 'Maintaining high standards of accuracy, consistency and quality across every project.',
          },
          {
            title: 'Global Collaboration',
            icon: 'globe',
            body: 'Building strong partnerships with clients, contributors, agencies and technology providers worldwide.',
          },
          {
            title: 'Integrity & Transparency',
            icon: 'shield-check',
            body: 'Promoting ethical practices, accountability and transparent business relationships.',
          },
          {
            title: 'People & Partnership',
            icon: 'handshake',
            body: 'Valuing human intelligence, diverse expertise and the global contributor community.',
          },
          {
            title: 'Scalability & Reliability',
            icon: 'workflow',
            body: 'Delivering flexible, dependable and scalable solutions to meet evolving client requirements.',
          },
        ],
      },
      security: {
        eyebrow: 'Security',
        title: 'How we protect data and people',
        body: 'Security expectations are built into every programme — for clients, contributors and partners.',
        items: [
          { title: 'Data Confidentiality', body: 'Protecting sensitive client and project information.' },
          { title: 'Privacy & Consent', body: 'Supporting responsible data collection with appropriate participant consent.' },
          { title: 'Controlled Access', body: 'Restricting data access based on project roles and authorization.' },
          { title: 'Secure Data Handling', body: 'Following agreed procedures for data transfer, storage and processing.' },
          { title: 'Compliance & Governance', body: 'Respecting applicable privacy laws and client-specific requirements.' },
          { title: 'Partner Accountability', body: 'Communicating security expectations to contributors and project partners.' },
        ],
      },
      scale: {
        eyebrow: 'Our Global Scale',
        title: 'Numbers that reflect our reach',
        body: 'Built across borders — trusted on projects across continents, languages and modalities.',
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
    hero_title: 'Organised across five AI technology domains.',
    hero_subtitle:
      'Computer Vision, Generative AI, Physical AI, Agentic AI and Creative AI — multilingual data collection, annotation, evaluation and AI solutions under one ecosystem.',
    hero_cta_primary: 'Discuss Your Project',
    hero_cta_secondary: 'Talk to an Expert',
    sections: {
      intro: {
        eyebrow: 'Service Taxonomy',
        title: 'Five domains. One delivery partner.',
        body: 'Browse the catalogue by domain — the same taxonomy used in the header Services menu — then open any service for capabilities, quality standards and delivery formats.',
        pillars: [
          { title: 'Computer Vision', icon: 'eye', body: 'Image & video collection, OCR / document AI, and image & video annotation for visual models.' },
          { title: 'Generative AI', icon: 'sparkles', body: 'Speech & audio datasets, transcription, studio TTS recording, and AI response evaluation.' },
          { title: 'Physical AI', icon: 'cpu', body: 'Egocentric and real-world activity video for robotics, industrial workflows and mobility.' },
          { title: 'Agentic AI', icon: 'bot', body: 'AI agents, chatbots, WhatsApp API workflows, business automation and custom AI solutions.' },
          { title: 'Creative AI', icon: 'clapperboard', body: 'AI business advertising, product videos and AI-assisted film making.' },
        ],
      },
      catalog: {
        eyebrow: 'Service Catalogue',
        title: 'Explore our services',
        body: 'Filter by Computer Vision, Generative AI, Physical AI, Agentic AI or Creative AI. Each card opens a full service page.',
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
      'Contact Dhvani.ai in Vadodara, India for AI data collection, annotation, LLM evaluation, studio recording and Agentic AI. WhatsApp +91 70460 70460 or +44 73113 04787.',
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
