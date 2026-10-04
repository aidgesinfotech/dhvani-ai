/** [title, body] per group — rendered as numbered steps on the related page. */
export const PROCESS = {
  home: [
    ['Discovery & Scoping', 'We understand your model, target users, languages, modalities, volumes and quality metrics — and translate them into a clear data specification.'],
    ['Guidelines & Pilot', 'We write project guidelines, set acceptance criteria and run a pilot batch so you can validate quality before scaling.'],
    ['Collection at Scale', 'Our global contributor network, mobile & web apps, studios and on-site teams capture data against agreed demographic quotas.'],
    ['Annotation & Processing', 'Human transcription, segmentation, translation and multimodal annotation turn raw data into structured training data.'],
    ['Multi-Layer QA & Validation', 'Reviewer calibration, gold-standard checks and human-in-the-loop validation ensure every batch meets your criteria.'],
    ['Secure Delivery & Integration', 'Data is delivered securely in your tool or format — JSON, SRT, CSV, XML and more — with documentation and ongoing support.'],
  ],
  about: [
    ['Data Collection', 'Purpose-built speech, image, video, egocentric and document data sourced across geographies, languages and environments.'],
    ['Processing & Structuring', 'Transcription, segmentation, translation and metadata tagging that make raw data usable.'],
    ['Annotation & Labeling', 'Human-labeled image, video, audio and text annotation for Computer Vision, Speech AI, NLP and LLMs.'],
    ['Validation & QA', 'Multi-stage quality controls designed around project-specific acceptance criteria.'],
    ['Model Evaluation', 'Human evaluation of AI outputs for correctness, relevance, bias and real-world performance.'],
  ],
  services: [
    ['Requirement Analysis', 'We capture your use case, data specification, languages, volumes, timelines and compliance needs.'],
    ['Solution Design & Pilot', 'We design the workflow, write guidelines and deliver a pilot batch for your sign-off.'],
    ['Production', 'Dedicated teams scale delivery with daily progress tracking and a single point of contact.'],
    ['Quality Assurance', 'Multi-layer QA, sampling and reporting against agreed metrics on every delivery.'],
    ['Delivery & Support', 'Secure delivery in your format, plus revisions, iterations and long-term support.'],
  ],
  collaborate: [
    ['Register', 'Fill the freelancer or vendor registration form with your languages, expertise and experience.'],
    ['Profile Review & Assessment', 'Our partner team reviews your profile and may share a short skill assessment.'],
    ['Onboarding & Guidelines', 'Approved partners receive onboarding, project guidelines and tool access.'],
    ['Project Allocation', 'You are matched to projects that fit your languages, skills and availability.'],
    ['Quality Reviews & Payments', 'Your work is reviewed with feedback, and approved work is paid on time.'],
  ],
};

/** [value, label, subtext] */
export const STATS = [
  ['7+', 'Years of Experience', 'Multilingual delivery since our language-services roots'],
  ['100+', 'Languages & Dialects', 'Indian, global and low-resource languages'],
  ['50+', 'Countries Supported', 'Clients and contributors worldwide'],
  ['275+', 'Projects Delivered', 'Across speech, vision, text and AI solutions'],
  ['Global', 'Contributor Network', 'Native speakers, annotators and specialists'],
  ['End-to-End', 'AI Data & Technology Services', 'From collection to evaluation and AI agents'],
];

/** [quote, name, role] — anonymised sample testimonials; replace with real client quotes from the CMS. */
export const TESTIMONIALS = [
  [
    'Dhvani.ai delivered a balanced multilingual speech dataset across several Indian languages faster than we expected. Speaker metadata and audio specs were consistent from the very first batch.',
    'Head of Speech AI',
    'Conversational AI company · USA',
  ],
  [
    'Their annotation team picked up our LiDAR and 2D labeling guidelines quickly, and the multi-layer QA meant we spent far less time on rework.',
    'Data Operations Lead',
    'Autonomous mobility startup · Europe',
  ],
  [
    'We use Dhvani.ai reviewers to evaluate LLM responses in regional languages. The cultural nuance they bring is something automated metrics simply miss.',
    'Applied Research Manager',
    'Generative AI lab · Singapore',
  ],
  [
    'The egocentric video programme was well-structured — clear task protocols, proper consent and clean metadata. Exactly what our robotics team needed.',
    'Robotics Program Manager',
    'Embodied AI company · USA',
  ],
  [
    'From TTS studio recording to post-production, the audio quality was excellent and the team was responsive throughout the project.',
    'Product Lead, Voice',
    'EdTech platform · India',
  ],
];

/** [category, question, answer] */
export const FAQS = [
  ['General', 'What does Dhvani.ai do?', 'Dhvani.ai is a global AI data collection and AI solutions company. We collect, process, annotate, validate and evaluate multilingual, multimodal data for NLP, LLM, speech and computer vision — and we build AI agents, chatbots and automation on top of it.'],
  ['General', 'Which types of AI data do you provide?', 'Speech datasets, egocentric and commercial video, image datasets, OCR and document data, human transcription and translation, image/video/audio/text annotation, LLM and AI model evaluation, and studio-recorded TTS data.'],
  ['General', 'How many languages do you support?', 'We cover 100+ GlobalX languages and dialects with native speakers, linguists and reviewers — including Indian and low-resource languages.'],
  ['General', 'Can you handle large-scale projects?', 'Yes. Our operating model scales from pilot projects to large, multi-country production programmes through our global contributor network and dedicated project teams.'],
  ['General', 'Do you offer a pilot before full production?', 'Yes. Most engagements start with a pilot batch so you can validate quality, guidelines and formats before we scale.'],
  ['General', 'How do you ensure data quality?', 'Through structured guidelines, reviewer calibration, gold-standard checks, human-in-the-loop validation and multi-stage QA measured against your acceptance criteria.'],
  ['General', 'Is the data ethically sourced?', 'Yes. Every contributor and participant gives informed consent, and our workflows are privacy-aware and compliance-ready.'],
  ['General', 'How is my data kept secure?', 'We use access-controlled environments, encrypted transfer, NDA-bound teams and workflows aligned with GDPR, HIPAA and ISO 9001:2015 practices.'],
  ['General', 'Can you work in our tools?', 'Yes. We work inside client tools and secure platforms, or deliver in JSON, SRT, TXT, CSV, XML and other standard formats.'],
  ['General', 'Where is Dhvani.ai located?', 'Our head office is in Vadodara, Gujarat, India, and we serve clients and contributors across 50+ countries.'],

  ['Services', 'What is the typical turnaround time?', 'It depends on volume, languages and complexity. After the pilot we share a delivery plan with weekly milestones so timelines are transparent.'],
  ['Services', 'Do you provide custom datasets or off-the-shelf data?', 'We specialise in custom data collection designed around your requirements. Where suitable, we can also discuss existing datasets.'],
  ['Services', 'Can you combine collection, annotation and evaluation in one project?', 'Yes. One of our strengths is managing the full lifecycle under one ecosystem, with a single point of contact.'],
  ['Services', 'Do you support LLM fine-tuning and RLHF data?', 'Yes. We create instruction-tuning and prompt datasets, preference rankings and human evaluations for LLM fine-tuning, evaluation and alignment.'],
  ['Services', 'What output formats do you deliver?', 'Client Tool, JSON, SRT, TXT, CSV and XML for language data; WAV/FLAC for audio; MP4/MOV for video; and COCO/YOLO-style formats for vision on request.'],
  ['Services', 'Do you build AI chatbots and WhatsApp AI?', 'Yes. Our Agentic AI practice builds AI agents, AI chatbots, WhatsApp AI and business automation integrated with your systems.'],
  ['Services', 'How is pricing calculated?', 'Pricing depends on modality, language, volume, quality level and turnaround. We share a transparent quote after scoping — usually per hour of audio, per asset or per task.'],
  ['Services', 'Do you sign NDAs and data-processing agreements?', 'Yes. We routinely sign NDAs and DPAs before any data is shared.'],

  ['Collaborate', 'Who can join the Dhvani.ai network?', 'Freelancers (transcribers, translators, annotators, voice artists, evaluators, field collectors) and vendors (LSPs, annotation companies, studios, data-collection agencies) from anywhere in the world.'],
  ['Collaborate', 'Is there any fee to register?', 'No. Registering as a freelancer or vendor with Dhvani.ai is completely free.'],
  ['Collaborate', 'Which languages are in demand?', 'We regularly need Indian languages, regional dialects and many international and low-resource languages. List every language you can cover in the form.'],
  ['Collaborate', 'Do I need prior experience?', 'Experience helps, but many projects offer training and guidelines. Strong language skills, attention to detail and reliability matter most.'],
  ['Collaborate', 'How and when are payments made?', 'Payment terms are shared per project. Approved work is paid on time via standard bank transfer or other agreed methods.'],
  ['Collaborate', 'Can I work remotely?', 'Yes. Most freelancer projects are remote. Some data-collection or studio projects may require on-site participation.'],
  ['Collaborate', 'How long does onboarding take?', 'After registration our partner team reviews your profile. If there is a match, onboarding with guidelines and tool access usually follows within days.'],
  ['Collaborate', 'What documents should vendors share?', 'A company profile, team size, languages and services offered, relevant experience and any certifications. You can upload your company profile in the form.'],

  ['Contact', 'How quickly will you respond?', 'Our team responds to project enquiries within one business day.'],
  ['Contact', 'What details should I include in my enquiry?', 'Your use case, data type, languages, approximate volumes, timeline and any quality or compliance requirements.'],
  ['Contact', 'Can I call or WhatsApp you directly?', 'Yes — call or WhatsApp us on +91 99041 99042 during business hours.'],
  ['Contact', 'I want to join as a freelancer — should I use this form?', 'Please use the Collaborate With Us page so your profile reaches our partner team directly.'],
];

const COMPANY = 'Dhvani.ai';
const EMAIL = 'support@dhvani.ai.in';

export const PRIVACY_BLOCKS = [
  { heading: 'Overview', body: `${COMPANY} (“we”, “us”, or “our”) respects your privacy. This Privacy Policy explains how we collect, use, store and protect personal information when you use our website, submit our forms, participate in data-collection programmes, or work with us as a client, freelancer or vendor.` },
  { heading: 'Information We Collect', body: 'Contact and identity details (name, email, phone, country, city, company); professional information you share with us (languages, expertise, experience, resumes and company profiles); project communications; and technical data such as IP address, browser type and basic usage analytics.\n\nFor AI data-collection programmes, we may collect voice recordings, images, videos or documents only with the informed consent of the participant and strictly as described in the programme’s consent terms.' },
  { heading: 'How We Use Information', body: 'To respond to enquiries and deliver our services; to evaluate and onboard freelancers and vendors; to run consent-based data-collection programmes for our clients; to improve our website and services; to send service updates and, where permitted, newsletters; and to meet legal and compliance obligations.' },
  { heading: 'Consent for AI Data Contributors', body: 'Participants in speech, image, video or document collection are informed about the purpose, use and retention of their data before contributing. Participation is voluntary, and contributors can contact us to ask questions or exercise their rights at any time.' },
  { heading: 'Sharing of Information', body: 'We do not sell personal information. Data-collection outputs are shared with clients only as defined in the consent terms and client agreements. We may share information with trusted service providers (hosting, email, analytics) bound by confidentiality, or when required by law.' },
  { heading: 'Data Security & Retention', body: 'We use access-controlled environments, encrypted transfer, NDA-bound teams and workflows aligned with GDPR, HIPAA and ISO 9001:2015 practices. We retain personal data only as long as necessary for the purposes described or as required by law.' },
  { heading: 'Your Rights', body: 'Depending on your location, you may request access to, correction of, or deletion of your personal data, object to or restrict processing, and withdraw consent where processing is based on consent. Contact us to exercise these rights.' },
  { heading: 'Cookies', body: 'Our website may use essential and analytics cookies to keep the site working and understand usage. You can control cookies through your browser settings.' },
  { heading: 'Contact', body: `For privacy questions or requests, email ${EMAIL} or write to us at our head office in Vadodara, Gujarat, India.` },
];

export const TERMS_BLOCKS = [
  { heading: 'Agreement', body: `By accessing or using the ${COMPANY} website and services, you agree to these Terms of Service. If you do not agree, please do not use our website or services.` },
  { heading: 'Our Services', body: `${COMPANY} provides AI data collection, transcription, translation, annotation, data validation, AI model evaluation, studio recording, Agentic AI and creative AI services. The scope, deliverables, timelines, pricing and quality criteria of any engagement are defined in a separate written proposal or agreement.` },
  { heading: 'Use of the Website', body: 'You agree to provide accurate information in our forms, use the website only for lawful purposes, and not attempt to disrupt, scrape or misuse the website, its forms or its content.' },
  { heading: 'Freelancers & Vendors', body: 'Submitting a registration does not guarantee work. Project allocation, rates and terms are agreed separately. Partners must follow project guidelines, confidentiality obligations and data-protection requirements.' },
  { heading: 'Confidentiality & Data', body: 'We treat client data as confidential and handle it under the terms of the applicable agreement, NDA or data-processing agreement.' },
  { heading: 'Intellectual Property', body: `All website content, branding, logos and materials are owned by ${COMPANY} unless stated otherwise. Ownership of project deliverables is governed by the relevant client agreement.` },
  { heading: 'Limitation of Liability', body: `To the fullest extent permitted by law, ${COMPANY} is not liable for indirect, incidental or consequential damages arising from use of the website. Liability for services is limited as set out in the applicable agreement.` },
  { heading: 'Governing Law', body: 'These terms are governed by the laws of India, and courts at Vadodara, Gujarat shall have jurisdiction, unless otherwise agreed in writing.' },
  { heading: 'Changes', body: 'We may update these Terms from time to time. Continued use of the website after changes are posted means you accept the revised Terms.' },
  { heading: 'Contact', body: `Questions about these Terms? Email ${EMAIL}.` },
];

export const LEGAL_PAGES = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    seo_title: 'Privacy Policy | Dhvani.ai',
    seo_description: 'How Dhvani.ai collects, uses and protects personal information, including consent for AI data contributors.',
    hero_eyebrow: 'Legal',
    hero_title: 'Privacy Policy',
    hero_subtitle: 'How we collect, use and protect your information — including data shared by AI data contributors.',
    blocks: PRIVACY_BLOCKS,
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    seo_title: 'Terms of Service | Dhvani.ai',
    seo_description: 'Terms governing the use of the Dhvani.ai website and services.',
    hero_eyebrow: 'Legal',
    hero_title: 'Terms of Service',
    hero_subtitle: 'The terms that govern use of our website and services.',
    blocks: TERMS_BLOCKS,
  },
];
