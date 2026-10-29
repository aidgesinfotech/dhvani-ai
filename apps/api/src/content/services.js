/**
 * Services master content for Dhvani.ai.
 * `body` drives every block of the service detail page and is editable in the CMS.
 */
export const SERVICES = [
  {
    title: 'Speech Dataset Collection',
    slug: 'speech-data-collection',
    category: 'AI Data Collection',
    icon: 'mic',
    featured: 1,
    tags: ['ASR', 'TTS', 'Conversational AI'],
    image_label: 'Speech data collection — contributor recording on mobile app & acoustic studio',
    excerpt:
      'End-to-end speech data collection for ASR, TTS and Conversational AI — through mobile app, web app and acoustic studio recording, across 100+ languages.',
    description:
      'Dhvani.ai delivers end-to-end Speech Dataset Collection services designed for training and evaluating modern Speech AI, ASR, TTS, and Conversational AI systems. We enable large-scale, high-quality voice data collection through multiple secure recording channels, ensuring flexibility, scalability, and global reach.',
    seo_title: 'Speech Data Collection Services | Multilingual Speech Datasets | Dhvani.ai',
    seo_description:
      'Multilingual speech dataset collection for ASR, TTS and Conversational AI via mobile app, web app and acoustic studio. Native speakers across 100+ languages.',
    body: {
      tagline: 'Speech Datasets for Natural Language Processing',
      overview:
        'Dhvani.ai delivers end-to-end Speech Dataset Collection services designed for training and evaluating modern Speech AI, ASR, TTS, and Conversational AI systems. We enable large-scale, high-quality voice data collection through multiple secure recording channels, ensuring flexibility, scalability, and global reach.\n\nFrom wake-word and command datasets to hundreds of hours of spontaneous conversational speech, every programme is designed around your model’s real users — their languages, accents, age groups, devices and acoustic environments. Scripts, prompts, speaker demographics and recording specifications are agreed upfront, so the data you receive is balanced, consistent and ready to train on.',
      highlights: [
        'Multilingual speech collection across 100+ languages',
        'Native speakers with demographic balancing',
        'Scripted, semi-scripted, and spontaneous speech',
        'Quality-controlled recording standards',
        'Secure data handling and compliance-ready workflows',
      ],
      blocks_title: 'Data Collection Channels',
      blocks: [
        {
          title: 'Mobile App-Based Collection',
          icon: 'smartphone',
          body: 'Secure voice data collection via Android & iOS applications, enabling scalable crowd-based and controlled speech recording across diverse demographics and accents.',
        },
        {
          title: 'Web App Recording',
          icon: 'globe',
          body: 'Browser-based speech collection for fast onboarding, remote participation, and enterprise-controlled recording workflows without device limitations.',
        },
        {
          title: 'Acoustic Studio Recording',
          icon: 'headphones',
          body: 'Professional, studio-grade speech recording in controlled acoustic environments, ideal for TTS, AI dubbing, voice cloning, audiobooks, and high-fidelity speech datasets.',
        },
      ],
      groups_title: 'Speech Data We Collect',
      groups: [
        {
          title: 'Speech Types',
          items: [
            'Scripted read speech',
            'Semi-scripted prompts',
            'Spontaneous & conversational speech',
            'Wake words & voice commands',
            'Call-centre style dialogues',
          ],
        },
        {
          title: 'Speaker Coverage',
          items: [
            'Native speakers across 100+ languages',
            'Regional accents & dialects',
            'Age & gender balanced cohorts',
            'Child, adult & senior voices (with consent)',
          ],
        },
        {
          title: 'Recording Conditions',
          items: [
            'Studio-grade quiet rooms',
            'Real-world noisy environments',
            'In-car, home & office acoustics',
            'Multiple devices & microphones',
          ],
        },
      ],
      use_cases: [
        'Automatic Speech Recognition (ASR)',
        'Text-to-Speech (TTS) & voice cloning',
        'Conversational AI & voice assistants',
        'Speaker identification & verification',
        'Keyword spotting & wake-word detection',
        'Call analytics & IVR systems',
      ],
      quality: [
        'Audio specification checks (sample rate, bit depth, SNR)',
        'Script adherence & pronunciation review',
        'Speaker metadata validation',
        'Informed consent captured for every contributor',
        'Secure, access-controlled storage & transfer',
      ],
      formats: ['WAV', 'FLAC', 'MP3', 'JSON metadata', 'CSV manifests', 'Client Tool'],
      closing: 'Dhvani.ai ensures accurate, diverse, and production-ready speech datasets—at global scale.',
      faqs: [
        {
          question: 'Which recording channels do you use for speech data?',
          answer:
            'We collect through our Android & iOS mobile app, a browser-based web app, and professional acoustic studios. The channel is chosen based on the audio quality, scale and speaker diversity your model needs.',
        },
        {
          question: 'Can you balance speakers by age, gender and accent?',
          answer:
            'Yes. Demographic balancing is planned at the start of every project. We recruit native speakers against agreed quotas and validate speaker metadata before delivery.',
        },
        {
          question: 'Do you support low-resource and regional languages?',
          answer:
            'Yes. We cover 100+ languages and dialects, including many Indian and low-resource languages that are hard to source elsewhere.',
        },
      ],
    },
  },
  {
    title: 'Transcription, Segmentation, Proofreading, Translation & QA',
    slug: 'transcription-translation-qa',
    category: 'Data Processing & Annotation',
    icon: 'languages',
    featured: 1,
    tags: ['100% Human-Made', '100+ Languages', 'JSON · SRT'],
    image_label: 'Linguists transcribing and reviewing multilingual audio',
    excerpt:
      '100% human-made transcription, segmentation, proofreading, translation and multilingual QA — built for AI training, compliance and content localization.',
    description:
      'Dhvani.ai provides end-to-end language data services with a strong focus on accuracy, consistency, and global linguistic coverage. All transcription work is 100% human-made, ensuring natural language understanding, cultural accuracy, and enterprise-grade quality.',
    seo_title: 'Human Transcription, Translation & Language QA Services | Dhvani.ai',
    seo_description:
      '100% human-made transcription, segmentation, proofreading, translation and multilingual QA in 100+ languages. Delivered in JSON, SRT, TXT, CSV, XML or your tool.',
    body: {
      tagline: '100% Human-Made Transcription Services',
      overview:
        'Dhvani.ai provides end-to-end language data services with a strong focus on accuracy, consistency, and global linguistic coverage. All transcription work is 100% human-made, ensuring natural language understanding, cultural accuracy, and enterprise-grade quality.\n\nWe support 100+ GlobalX languages, delivering scalable transcription and language services for AI training, compliance, and content localization.',
      highlights: [
        '100% human-made transcription',
        'Verified multilingual quality checks',
        '100+ GlobalX languages covered',
        'Client Tool, JSON File & SRT delivery',
        'Global data collection & processing',
      ],
      blocks_title: 'Our Capabilities',
      blocks: [
        {
          title: 'Human-Made Transcription',
          icon: 'headphones',
          body: 'High-accuracy verbatim and clean-read transcription for speech, audio, and video data.',
        },
        {
          title: 'Segmentation & Structuring',
          icon: 'scissors',
          body: 'Sentence-level and time-stamped segmentation optimized for ASR, NLP, and LLM training pipelines.',
        },
        {
          title: 'Proofreading & Editing',
          icon: 'pen-tool',
          body: 'Linguistic review to ensure grammatical accuracy, consistency, and adherence to client style guides.',
        },
        {
          title: 'Translation & Localization',
          icon: 'globe',
          body: 'Multilingual translation with native-language experts, maintaining semantic meaning and cultural relevance.',
        },
        {
          title: 'Quality Assurance (QA)',
          icon: 'badge-check',
          body: 'Verified multilingual QA with multi-stage review processes to meet enterprise and research-grade standards.',
        },
      ],
      groups_title: 'Delivery, Styles & Content',
      groups: [
        {
          title: 'Delivery & Integration',
          items: [
            'Client tools or secure platforms supported',
            'Output formats: JSON, SRT, TXT, CSV, XML',
            'Scalable global data collection and processing workflows',
          ],
        },
        {
          title: 'Transcription Styles',
          items: [
            'Verbatim (fillers, false starts & non-speech events)',
            'Clean-read / intelligent verbatim',
            'Speaker-attributed transcripts',
            'Time-stamped & sentence-segmented output',
          ],
        },
        {
          title: 'Content We Handle',
          items: [
            'Speech & ASR datasets',
            'Interviews, webinars & workshops',
            'Call recordings & meetings',
            'Video, media & e-learning content',
          ],
        },
      ],
      use_cases: [
        'ASR model training & benchmarking',
        'NLP and LLM training corpora',
        'Subtitles & closed captions',
        'Compliance & legal records',
        'Content localization',
        'Research & academic data',
      ],
      quality: [
        'Multi-stage linguistic review',
        'Client style-guide adherence',
        'Native-language reviewers',
        'Accuracy sampling & scoring',
        'Confidential handling under NDA',
      ],
      formats: ['JSON', 'SRT', 'TXT', 'CSV', 'XML', 'Client Tool'],
      closing: 'Dhvani.ai delivers reliable, multilingual language data—built for accuracy, scale, and AI readiness.',
      faqs: [
        {
          question: 'Is your transcription done by humans or machines?',
          answer:
            'All transcription work is 100% human-made by trained, native-language transcribers. Tools may assist with workflow, but every transcript is produced and reviewed by people.',
        },
        {
          question: 'Can you work inside our annotation or transcription tool?',
          answer:
            'Yes. We work in client tools and secure platforms, or deliver in JSON, SRT, TXT, CSV or XML to match your pipeline.',
        },
        {
          question: 'How do you assure transcription quality?',
          answer:
            'Every project goes through multi-stage review: transcription, proofreading and verified multilingual QA, with accuracy sampling against your acceptance criteria.',
        },
      ],
    },
  },
  {
    title: 'Data Annotation Services',
    slug: 'data-annotation',
    category: 'Data Processing & Annotation',
    icon: 'tags',
    featured: 1,
    tags: ['Image & Video', 'Audio & Text', 'LLM & NLP'],
    image_label: 'Annotation workspace — bounding boxes, polygons and LiDAR point cloud',
    excerpt:
      'Enterprise-grade annotation across image, video, audio and text — bounding boxes, segmentation, LiDAR, speaker labeling, NER and LLM instruction data.',
    description:
      'Dhvani.ai provides enterprise-grade annotation services across Image, Video, Audio, and Text, purpose-built for training and evaluating Computer Vision, Speech AI, NLP, and Large Language Models (LLMs). Our annotation pipelines combine expert human annotators, automation, and multi-stage QA to deliver high-accuracy, scalable, and compliant datasets.',
    seo_title: 'AI Data Annotation Services | Image, Video, Audio, Text & LLM | Dhvani.ai',
    seo_description:
      'Data annotation for Computer Vision, Speech AI, NLP and LLMs: 2D/3D bounding boxes, polygons, segmentation, LiDAR, speaker diarization, NER and instruction tuning.',
    body: {
      tagline: 'Annotation Services for LLM, NLP, Vision & Speech AI',
      overview:
        'Dhvani.ai provides enterprise-grade annotation services across Image, Video, Audio, and Text, purpose-built for training and evaluating Computer Vision, Speech AI, NLP, and Large Language Models (LLMs).\n\nOur annotation pipelines combine expert human annotators, automation, and multi-stage QA to deliver high-accuracy, scalable, and compliant datasets.',
      highlights: [
        '2D – 3D Bounding Box, Polygon, Semantic',
        'LiDAR Annotation',
        'Speaker Labeling on Audio Datasets',
        'Large Language Model (LLM) & Natural Language Processing (NLP)',
        'Image Annotation Solutions',
      ],
      blocks_title: 'How Our Annotation Pipeline Works',
      blocks: [
        {
          title: 'Expert Human Annotators',
          icon: 'users',
          body: 'Trained annotators and domain specialists who follow detailed project guidelines and edge-case playbooks.',
        },
        {
          title: 'Automation-Assisted Labeling',
          icon: 'cpu',
          body: 'Pre-labeling and tooling accelerate throughput while humans make every final judgement call.',
        },
        {
          title: 'Multi-Stage QA',
          icon: 'badge-check',
          body: 'Human-in-the-loop validation with multilayer QA, reviewer calibration and agreement scoring.',
        },
      ],
      groups_title: 'Annotation Capabilities',
      groups: [
        {
          title: 'Image & Video Annotation',
          items: [
            '2D & 3D Bounding Boxes',
            'Polygon Annotation',
            'Semantic & Instance Segmentation',
            'Object Detection, Tracking & Scene Classification',
            'LiDAR & Point Cloud Annotation for autonomous and spatial AI systems',
          ],
        },
        {
          title: 'Audio Annotation',
          items: [
            'Speaker Labeling & Diarization',
            'Speech segmentation & time alignment',
            'Emotion, intent, and acoustic labeling',
            'ASR-ready and conversational AI datasets',
          ],
        },
        {
          title: 'Text & NLP Annotation',
          items: [
            'Named Entity Recognition (NER)',
            'Intent & sentiment labeling',
            'Text classification & span tagging',
            'Instruction tuning and prompt datasets for LLMs',
          ],
        },
        {
          title: 'Built for LLM & NLP Training',
          items: [
            'Human-labeled, high-quality text annotations',
            'Structured datasets for LLM fine-tuning, evaluation, and alignment',
            'Multilingual coverage across 100+ languages',
            'Consistent tagging schemas and annotation guidelines',
          ],
        },
      ],
      use_cases: [
        'Autonomous vehicles & robotics',
        'Retail & e-commerce vision',
        'Medical imaging AI',
        'Speech & conversational AI',
        'LLM fine-tuning & alignment',
        'Document & OCR AI',
      ],
      quality: [
        'Human-in-the-loop validation with multilayer QA',
        'Client tools and custom workflows supported',
        'Consistent tagging schemas and annotation guidelines',
        'Secure, scalable, and compliance-ready pipelines',
      ],
      formats: ['Client Tool', 'JSON', 'CSV', 'XML', 'SRT', 'COCO / YOLO (on request)'],
      closing: 'Dhvani.ai transforms raw data into AI-ready intelligence—accurate, scalable, and production-grade.',
      faqs: [
        {
          question: 'Which annotation types do you support?',
          answer:
            '2D & 3D bounding boxes, polygons, semantic & instance segmentation, object tracking, LiDAR & point cloud, speaker diarization, emotion & intent labeling, NER, sentiment, classification and LLM instruction / prompt datasets.',
        },
        {
          question: 'Can you annotate in our own labeling platform?',
          answer:
            'Yes. We regularly work inside client tools and custom workflows, and can also deliver in JSON, CSV, XML or SRT.',
        },
        {
          question: 'How do you keep labels consistent across large teams?',
          answer:
            'We use written guidelines, gold-standard samples, reviewer calibration and multi-layer QA so tagging stays consistent across annotators and batches.',
        },
      ],
    },
  },
  {
    title: 'Image & Video Dataset Collection',
    slug: 'image-video-data-collection',
    category: 'AI Data Collection',
    icon: 'camera',
    featured: 1,
    tags: ['On-Site', 'Crowd-Sourced', 'Computer Vision'],
    image_label: 'Diverse image & video capture across people, products and environments',
    excerpt:
      'Globally diverse, ethically sourced image and video datasets — collected on-site and through crowd-sourced programmes — for Computer Vision and Generative AI.',
    description:
      'Dhvani.ai delivers high-quality image and video datasets designed to train and validate Computer Vision and Generative AI models at global scale. We provide flexible and secure data collection through on-site deployments and crowd-sourced programs, ensuring diversity, realism, and compliance across regions and demographics.',
    seo_title: 'Image & Video Data Collection Services for Computer Vision | Dhvani.ai',
    seo_description:
      'On-site and crowd-sourced image and video data collection for Computer Vision and Generative AI: facial recognition, object detection, retail, product and commercial video datasets.',
    body: {
      tagline: 'Global Excellence in Diverse Image & Video Collection',
      overview:
        'Dhvani.ai delivers high-quality image and video datasets designed to train and validate Computer Vision and Generative AI models at global scale.\n\nWe provide flexible and secure data collection through on-site deployments and crowd-sourced programs, ensuring diversity, realism, and compliance across regions and demographics. High-quality visual data for Computer Vision and AI model development.',
      highlights: [
        'High Quality Global Data Collection',
        'Facial Recognition AI Training data',
        'On-Site Data Collection Services',
        'Crowd-Sourced Data Collection',
        'Commercial Video Data Collection',
      ],
      blocks_title: 'Data Collection Models',
      blocks: [
        {
          title: 'On-Site Data Collection Services',
          icon: 'map-pin',
          body: 'Controlled, location-based image and video capture using standardized protocols—ideal for regulated, sensitive, or high-precision use cases.',
        },
        {
          title: 'Crowd-Sourced Data Collection',
          icon: 'globe',
          body: 'Scalable global contributor networks enabling rapid collection of diverse real-world images and videos across environments, devices, and demographics.',
        },
        {
          title: 'Commercial Video Data Collection',
          icon: 'video',
          body: 'Commercial video datasets designed to support AI, computer vision, and real-world business applications. Collect customized video data across retail, workplaces, public environments, products, services, and commercial activities to help organizations develop, train, and evaluate advanced AI models.',
        },
      ],
      groups_title: 'What We Support',
      groups: [
        {
          title: 'Image Data',
          items: [
            'Image collection',
            'Image classification',
            'Object detection',
            'Image segmentation',
            'Human-centric datasets',
            'Product images',
            'Retail images',
            'OCR images',
            'Custom image datasets',
          ],
        },
        {
          title: 'Commercial Video Data',
          items: [
            'Retail stores & shopper activity',
            'Workplaces & industrial workflows',
            'Public environments (privacy-aware)',
            'Products & services in use',
            'Commercial and business activities',
          ],
        },
        {
          title: 'Key Capabilities',
          items: [
            'Diverse environmental and demographic coverage',
            'High-resolution image & video capture',
            'Metadata tagging and demographic balancing',
            'Privacy-aware and consent-driven workflows',
            'Global compliance and quality assurance',
          ],
        },
      ],
      use_cases: [
        'Facial Recognition AI Training',
        'Object detection and tracking',
        'Scene understanding and activity recognition',
        'Retail, automotive, healthcare, and smart city AI',
        'Generative AI training & fine-tuning',
      ],
      quality: [
        'Privacy-aware and consent-driven workflows',
        'Resolution, lighting & framing checks',
        'Metadata accuracy validation',
        'Demographic balancing against agreed quotas',
        'Secure transfer & storage',
      ],
      formats: ['JPG / PNG / RAW', 'MP4 / MOV', 'JSON metadata', 'CSV manifests', 'Client Tool'],
      closing:
        'Dhvani.ai ensures globally diverse, ethically sourced, and AI-ready image and video datasets—built for real-world performance.',
      faqs: [
        {
          question: 'What is the difference between on-site and crowd-sourced collection?',
          answer:
            'On-site collection uses controlled locations and standardized protocols for sensitive or high-precision needs. Crowd-sourced collection uses our global contributor network for speed, scale and real-world diversity.',
        },
        {
          question: 'How do you handle consent for human-centric images?',
          answer:
            'Every participant gives informed consent before capture. Workflows are privacy-aware, and personal metadata is handled securely and anonymised where required.',
        },
      ],
    },
  },
  {
    title: 'Egocentric Video Data Collection',
    slug: 'egocentric-video-data-collection',
    category: 'AI Data Collection',
    icon: 'video',
    featured: 1,
    tags: ['First-Person', 'Robotics', 'Video Understanding'],
    image_label: 'First-person POV video — hands interacting with objects during a task',
    excerpt:
      'First-person video data for next-generation AI — real-world activities, interactions and task workflows captured from the human point of view.',
    description:
      'Real-world video datasets designed for Computer Vision, Video Understanding, Robotics, and AI systems. First-person (egocentric) video datasets for training, fine-tuning, and evaluating next-generation AI systems.',
    seo_title: 'Egocentric Video Data Collection | First-Person Video Datasets | Dhvani.ai',
    seo_description:
      'First-person egocentric video datasets for robotics, video understanding and embodied AI — real-world activities, object manipulation and task workflows captured at scale.',
    body: {
      tagline: 'Real-World Video Data for Smarter AI',
      overview:
        'Real-world video datasets designed for Computer Vision, Video Understanding, Robotics, and AI systems. First-person (egocentric) video datasets for training, fine-tuning, and evaluating next-generation AI systems.\n\nCapture real-world human activities, interactions, object manipulation, and task workflows from a first-person perspective using structured, scalable data collection programs.\n\nUsing head-mounted cameras, smart glasses and wearable rigs, our contributors record how people actually see and do things — in kitchens, workshops, warehouses, stores and streets — giving robots and AI assistants the human perspective they need to understand and act in the physical world.',
      highlights: [
        'First-person video data for next-generation AI',
        'Human activities, interactions & object manipulation',
        'Structured, scalable data collection programs',
        'Diverse environments, people & regions',
        'Consent-driven, privacy-aware capture',
      ],
      blocks_title: 'How We Capture',
      blocks: [
        {
          title: 'Wearable Capture Rigs',
          icon: 'eye',
          body: 'Head-mounted cameras, smart glasses and chest mounts configured to your resolution, frame-rate and field-of-view requirements.',
        },
        {
          title: 'Scripted Task Programs',
          icon: 'list-checks',
          body: 'Step-by-step task protocols — cooking, assembly, repair, packing — so every recording covers the actions your model must learn.',
        },
        {
          title: 'Natural Activity Capture',
          icon: 'activity',
          body: 'Unscripted daily-life recordings that capture genuine behaviour, variation and the long tail of real-world situations.',
        },
        {
          title: 'Annotation-Ready Delivery',
          icon: 'tags',
          body: 'Optional step segmentation, action labels and object tags delivered alongside raw footage and metadata.',
        },
      ],
      groups_title: 'Coverage',
      groups: [
        {
          title: 'Activities We Capture',
          items: [
            'Cooking & household tasks',
            'Assembly, repair & DIY',
            'Warehouse & industrial workflows',
            'Retail & shopping journeys',
            'Outdoor navigation & commuting',
            'Hand–object interactions',
          ],
        },
        {
          title: 'Metadata & Labels',
          items: [
            'Activity & step segmentation',
            'Action and object labels',
            'Hand pose & interaction tags',
            'Scene & environment metadata',
            'Participant demographics (anonymised)',
          ],
        },
      ],
      use_cases: [
        'Robotics & embodied AI',
        'Video understanding models',
        'AR / smart-glasses assistants',
        'Action recognition & anticipation',
        'World models & simulation',
        'Human–robot interaction',
      ],
      quality: [
        'Capture-spec checks (resolution, FPS, stability)',
        'Task-completion and protocol review',
        'Face & PII blurring where required',
        'Informed consent from every participant',
        'Secure, encrypted transfer',
      ],
      formats: ['MP4 / MOV', 'JSON metadata', 'CSV manifests', 'Client Tool'],
      closing:
        'Dhvani.ai delivers egocentric video datasets that teach AI how the world looks — and works — through human eyes.',
      faqs: [
        { question: 'What is egocentric video data?', answer: 'It is first-person footage, usually from a head-mounted camera or smart glasses. The clip shows what a person sees while they act — hands, objects and the task.' },
        { question: 'Who is this dataset for?', answer: 'Robotics and embodied AI teams, video-understanding labs, AR and smart-glasses products, and action-recognition or world-model research.' },
        { question: 'Can you design custom task scripts?', answer: 'Yes. We write step-by-step protocols around the actions, objects and rooms your model must learn, then run them across contributors.' },
        { question: 'What cameras and rigs do you use?', answer: 'Head-mounted cameras, smart glasses and chest mounts, set to your resolution, frame rate and field of view.' },
        { question: 'Can you record ultrawide footage?', answer: 'Yes. Ultrawide first-person passes keep hands, the workspace and the surrounding scene in one frame.' },
        { question: 'Do you capture with audio and without audio?', answer: 'Both. Silent clips teach motion and objects. Audio clips keep speech, tool sounds and room noise when you need them.' },
        { question: 'Which environments can you film in?', answer: 'Kitchens, homes, workshops, warehouses, stores, streets and other everyday places matched to your brief.' },
        { question: 'How do you handle faces and consent?', answer: 'Every participant consents before recording. Faces are blurred when required, and files move over encrypted transfer.' },
        { question: 'Can you label actions, hands and objects?', answer: 'Yes. Optional labels cover steps, actions, objects, hand interactions and scene metadata, shipped with the raw video.' },
        { question: 'How do you check quality?', answer: 'Reviewers check resolution, frame rate, stability, task completion and whether the protocol was followed.' },
        { question: 'Can we start with a pilot?', answer: 'Yes. Most programmes start with a short pilot so you can check framing and labels before the same setup is scaled.' },
        { question: 'What file formats do you deliver?', answer: 'MP4 or MOV, JSON metadata, CSV manifests, or delivery into your own tool.' },
      ],
    },
  },
  {
    title: 'OCR & Document AI Data',
    slug: 'ocr-document-ai-data',
    category: 'AI Data Collection',
    icon: 'scan-text',
    featured: 0,
    tags: ['OCR', 'Document AI', 'IDP'],
    image_label: 'Handwritten and printed multilingual documents being labeled',
    excerpt:
      'Turn complex documents into AI-ready training data — handwritten and printed text, forms, receipts, invoices, IDs and multilingual documents.',
    description:
      'Turn complex documents into AI-ready training data. Dhvani.ai collects, transcribes and annotates real-world documents to train OCR, Document AI and Intelligent Document Processing systems across scripts, languages and layouts.',
    seo_title: 'OCR Data Collection & Document AI Training Data | Dhvani.ai',
    seo_description:
      'OCR and Document AI training data: handwritten and printed text, forms, receipts, invoices, ID and business documents, multilingual documents, classification and OCR annotation.',
    body: {
      tagline: 'Turn complex documents into AI-ready training data.',
      overview:
        'Turn complex documents into AI-ready training data.\n\nDhvani.ai collects, transcribes and annotates real-world documents to train OCR, Document AI and Intelligent Document Processing systems. Our multilingual teams handle Indian and global scripts, messy handwriting, low-quality scans and complex layouts — so your models perform on the documents your customers actually upload.',
      highlights: [
        'Handwritten & printed text',
        'Forms, receipts & invoices',
        'Identity & business documents',
        'Multilingual documents',
        'Document classification & OCR annotation',
      ],
      blocks_title: 'What We Deliver',
      blocks: [
        {
          title: 'Document Collection',
          icon: 'file-text',
          body: 'Consent-based collection of real and synthetic-safe documents across formats, scripts, devices and capture conditions.',
        },
        {
          title: 'OCR Transcription',
          icon: 'type',
          body: 'Line, word and character-level transcription of printed and handwritten text by native-script annotators.',
        },
        {
          title: 'Layout & Field Annotation',
          icon: 'layout-grid',
          body: 'Bounding boxes, key-value pairs, tables and reading order labeled for structured extraction models.',
        },
        {
          title: 'Document Classification',
          icon: 'folder-tree',
          body: 'Labeling documents by type, language and quality to train routing and classification models.',
        },
      ],
      groups_title: 'We Support',
      groups: [
        {
          title: 'Document Types',
          items: [
            'Handwritten text',
            'Printed text',
            'Forms',
            'Receipts',
            'Invoices',
            'Identity documents',
            'Business documents',
            'Multilingual documents',
          ],
        },
        {
          title: 'Annotation Services',
          items: [
            'Document classification',
            'OCR annotation',
            'Key-value extraction',
            'Table structure labeling',
            'Reading-order & layout tagging',
          ],
        },
      ],
      use_cases: ['OCR', 'Document AI', 'Intelligent Document Processing', 'Handwriting Recognition', 'KYC & identity verification', 'Accounts payable automation'],
      quality: [
        'Native-script transcribers & reviewers',
        'Character-level accuracy checks',
        'PII masking & secure handling',
        'Consistent field schemas',
        'Multi-stage QA',
      ],
      formats: ['JSON', 'XML', 'CSV', 'Client Tool'],
      closing: 'Dhvani.ai turns real-world paperwork into structured, AI-ready training data.',
      faqs: [
        {
          question: 'Do you handle Indian scripts and handwriting?',
          answer:
            'Yes. Our native-script teams transcribe and annotate printed and handwritten documents in Indian and international languages.',
        },
        {
          question: 'How is sensitive document data protected?',
          answer:
            'Identity and business documents are handled in access-controlled environments with PII masking and secure transfer, aligned to your compliance requirements.',
        },
      ],
    },
  },
  {
    title: 'AI Data Validation & Evaluation',
    slug: 'ai-data-validation-evaluation',
    category: 'Validation & Evaluation',
    icon: 'shield-check',
    featured: 1,
    tags: ['LLM Evaluation', 'Human-in-the-Loop', 'Multimodal'],
    image_label: 'Human reviewers scoring AI model outputs across text, speech and images',
    excerpt:
      'Human-in-the-loop validation of training data and AI model outputs — multimodal, multilingual LLM evaluation for accuracy, safety and real-world performance.',
    description:
      'Dhvani.ai delivers enterprise-grade AI data validation and model evaluation services to ensure training data and AI outputs meet the highest standards of accuracy, reliability, and real-world performance. We specialize in multimodal and multilingual human-in-the-loop validation, helping organizations reduce bias, improve model precision, and confidently deploy AI systems at scale.',
    seo_title: 'LLM Evaluation & AI Model Evaluation Services | Data Validation | Dhvani.ai',
    seo_description:
      'Human-in-the-loop AI data validation and LLM / AI model evaluation across text, speech, image and video. Custom rubrics, bias detection and multilingual reviewers.',
    body: {
      tagline: 'Training Data Validation, AI Model Evaluation',
      overview:
        'Dhvani.ai delivers enterprise-grade AI data validation and model evaluation services to ensure training data and AI outputs meet the highest standards of accuracy, reliability, and real-world performance.\n\nWe specialize in multimodal and multilingual human-in-the-loop validation, helping organizations reduce bias, improve model precision, and confidently deploy AI systems at scale.',
      highlights: [
        'Training Data Validation',
        'AI Model Evaluation',
        'Multimodal & multilingual human validation of outputs for accuracy',
        'Human validation across text, speech, image, and video',
        'Bias detection & performance improvement',
      ],
      blocks_title: 'Our Validation & Evaluation Capabilities',
      blocks: [
        {
          title: 'Training Data Validation',
          icon: 'database',
          body: 'Quality checks for labeled and unlabeled datasets to ensure consistency, completeness, and compliance before model training.',
        },
        {
          title: 'AI Model Evaluation',
          icon: 'brain',
          body: 'Human evaluation of AI model outputs to assess correctness, relevance, and contextual understanding.',
        },
        {
          title: 'Multimodal & Multilingual Validation',
          icon: 'globe',
          body: 'Human verification across text, speech, image, and video, supporting global languages and regional nuances.',
        },
        {
          title: 'Human-in-the-Loop QA',
          icon: 'users',
          body: 'Expert reviewers validating AI outputs for accuracy, bias detection, and performance improvement.',
        },
      ],
      groups_title: 'Evaluation Methods',
      groups: [
        {
          title: 'LLM Evaluation',
          items: [
            'Response correctness & factuality',
            'Helpfulness, tone & instruction-following',
            'Side-by-side preference ranking (RLHF)',
            'Safety, toxicity & bias review',
            'Multilingual & cultural accuracy',
          ],
        },
        {
          title: 'Speech & Vision Evaluation',
          items: [
            'ASR word-error review',
            'TTS naturalness & MOS scoring',
            'Object detection precision checks',
            'Generated image & video assessment',
          ],
        },
      ],
      use_cases: [
        'ASR & TTS model accuracy validation',
        'LLM output evaluation and alignment',
        'Computer Vision model performance testing',
        'Conversational AI and chatbot QA',
        'Generative AI output assessment',
      ],
      quality: [
        'Multi-layer QA frameworks and reviewer calibration',
        'Custom evaluation metrics and scoring rubrics',
        'Secure workflows aligned with GDPR, HIPAA, and ISO 9001:2015',
        'Scalable evaluation pipelines from pilot to enterprise',
      ],
      formats: ['JSON', 'CSV', 'Client Tool', 'Custom dashboards'],
      closing: 'Dhvani.ai ensures your AI systems are validated by humans—so they perform with confidence in the real world.',
      faqs: [
        {
          question: 'Do you evaluate LLMs in Indian and low-resource languages?',
          answer:
            'Yes. Our native-language reviewers evaluate LLM outputs across 100+ languages, including Indian and regional languages where cultural nuance matters.',
        },
        {
          question: 'Can you use our scoring rubric?',
          answer:
            'Yes. We work with your rubric or co-design custom evaluation metrics, then calibrate reviewers before production starts.',
        },
        {
          question: 'What compliance standards do your workflows follow?',
          answer:
            'Our secure workflows are aligned with GDPR, HIPAA and ISO 9001:2015 practices, and we sign NDAs and data-processing agreements as required.',
        },
      ],
    },
  },
  {
    title: 'Studio Recording (TTS – Text-to-Speech Data)',
    slug: 'studio-recording-tts',
    category: 'Voice & Studio',
    icon: 'audio-lines',
    featured: 1,
    tags: ['TTS', 'AI Dubbing', 'Prompt Recording'],
    image_label: 'Professional voice artist recording in an acoustic studio',
    excerpt:
      'Professional studio recording for TTS, AI dubbing and prompt recording — high-fidelity speech data from native voice talent in 100+ languages.',
    description:
      'Dhvani.ai provides professional studio recording services delivering high-fidelity Text-to-Speech (TTS) and speech datasets for advanced AI and ML speech applications. With access to acoustically controlled studios, professional equipment, and native voice talent worldwide, we create production-ready audio that meets enterprise and research-grade standards.',
    seo_title: 'TTS Studio Recording, AI Dubbing & Voice Data | Dhvani.ai',
    seo_description:
      'Studio-grade TTS and speech dataset recording, AI dubbing and prompt recording with native voice talent across 100+ languages. Clean, consistent audio for AI.',
    body: {
      tagline: 'Voice & Speech Solutions',
      overview:
        'Dhvani.ai provides professional studio recording services delivering high-fidelity Text-to-Speech (TTS) and speech datasets for advanced AI and ML speech applications.\n\nWith access to acoustically controlled studios, professional equipment, and native voice talent worldwide, we create production-ready audio that meets enterprise and research-grade standards.',
      highlights: [
        'Professional recordings for AI and ML speech applications',
        'AI Dubbing and Prompt Recording',
        'Native voice talent across 100+ languages',
        'Controlled acoustic environments',
        'Audio and video production',
      ],
      blocks_title: 'Voice & Speech Solutions',
      blocks: [
        {
          title: 'TTS & Speech Dataset Recording',
          icon: 'mic',
          body: 'Studio-grade recordings for neural TTS, ASR training, and speech synthesis models.',
        },
        {
          title: 'AI Dubbing & Prompt Recording',
          icon: 'clapperboard',
          body: 'Multilingual dubbing, scripted prompts, and conversational recordings for voice assistants and generative speech models.',
        },
        {
          title: 'Professional AI Speech Data',
          icon: 'brain',
          body: 'Clean, consistent audio optimized for AI training, fine-tuning, and evaluation.',
        },
      ],
      groups_title: 'Production & Standards',
      groups: [
        {
          title: 'Production Use Cases',
          items: [
            'Virtual Assistants & Conversational AI',
            'E-Learning & E-Education Platforms',
            'Audiobooks & Podcasts',
            'IVR, Navigation & Smart Devices',
            'Speech Model Evaluation & Benchmarking',
            'Audio and Video Production',
          ],
        },
        {
          title: 'Quality & Standards',
          items: [
            'Native speakers across 100+ languages',
            'Controlled acoustic environments',
            'Consistent loudness and audio formats',
            'Human QA and post-production review',
            'Secure, compliant data workflows',
          ],
        },
      ],
      use_cases: [
        'Neural TTS voices',
        'Voice cloning (with talent consent)',
        'Virtual assistants',
        'E-learning narration',
        'Audiobooks & podcasts',
        'IVR & smart devices',
      ],
      quality: [
        'Acoustically treated studios',
        'Consistent mic chain & loudness',
        'Script & pronunciation direction',
        'Human QA and post-production review',
        'Talent release & consent documentation',
      ],
      formats: ['WAV 48kHz / 24-bit', 'FLAC', 'Aligned transcripts', 'JSON metadata'],
      closing: 'Dhvani.ai delivers studio-quality speech data—clear, natural, and built for next-generation AI voice systems.',
      faqs: [
        {
          question: 'Can you record a full TTS voice in a regional language?',
          answer:
            'Yes. We cast native voice talent, prepare phonetically balanced scripts and record in controlled studios to build TTS voices in Indian and international languages.',
        },
        {
          question: 'Do you provide post-production?',
          answer:
            'Yes. Every recording goes through human QA and post-production review for noise, loudness consistency and script accuracy.',
        },
      ],
    },
  },
  {
    title: 'Agentic AI Solutions',
    slug: 'agentic-ai-solutions',
    category: 'AI Solutions',
    icon: 'bot',
    featured: 1,
    tags: ['AI Agents', 'AI Chatbots', 'WhatsApp AI'],
    image_label: 'AI agent dashboard automating chats, tasks and business workflows',
    excerpt:
      'From AI data to intelligent action — AI agents, AI chatbots, WhatsApp AI, business automation and custom AI solutions for real business workflows.',
    description:
      'Dhvani.ai is expanding from AI data into Agentic AI and intelligent automation. We design and deploy AI agents, chatbots and automation that connect AI with real business processes — helping organizations move from traditional workflows to intelligent automation.',
    seo_title: 'Agentic AI Solutions, AI Agents & AI Chatbot Development | Dhvani.ai',
    seo_description:
      'AI agents, AI chatbots, WhatsApp AI, business automation and custom AI applications. Move from traditional workflows to intelligent automation with Dhvani.ai.',
    body: {
      tagline: 'From AI Data to Intelligent Action',
      overview:
        'Dhvani.ai is expanding from AI data into Agentic AI and intelligent automation.\n\nOur technology capabilities extend beyond data services. We develop AI-powered business solutions designed to help organizations move from traditional workflows to intelligent automation — grounded in the same multilingual, human-validated data expertise that powers our datasets.',
      highlights: [
        'AI Agents for defined business tasks',
        'AI Chatbots for customers & employees',
        'WhatsApp AI automation',
        'Business process automation',
        'Custom AI solutions',
      ],
      blocks_title: 'What We Develop',
      blocks: [
        {
          title: 'AI Agents',
          icon: 'bot',
          body: 'AI systems designed to perform defined business tasks — task-oriented agents built around your specific business workflows.',
        },
        {
          title: 'AI Chatbots',
          icon: 'message-square',
          body: 'Intelligent conversational experiences for customers and employees, in the languages your users speak.',
        },
        {
          title: 'WhatsApp AI',
          icon: 'message-circle',
          body: 'AI-powered customer communication, engagement and business automation through WhatsApp.',
        },
        {
          title: 'Business Automation',
          icon: 'workflow',
          body: 'Connect AI with repetitive business processes — AI-driven workflows connecting people, systems, and business processes.',
        },
        {
          title: 'Custom AI Solutions',
          icon: 'puzzle',
          body: 'Purpose-built AI applications for specific business requirements, aligned with your operational needs.',
        },
      ],
      groups_title: 'Capabilities & Integrations',
      groups: [
        {
          title: 'What Our AI Agents Can Do',
          items: [
            'Answer customer queries 24/7',
            'Qualify leads & book appointments',
            'Process documents & extract data',
            'Update CRMs, sheets & internal tools',
            'Route tickets & escalate to humans',
            'Generate reports & summaries',
          ],
        },
        {
          title: 'Integrations',
          items: [
            'WhatsApp Business API',
            'Websites & mobile apps',
            'CRMs & helpdesks',
            'Google Workspace & Microsoft 365',
            'Payment & ERP systems',
            'Custom APIs & databases',
          ],
        },
      ],
      use_cases: [
        'Customer support automation',
        'Sales & lead qualification',
        'HR & employee helpdesk',
        'Order tracking & notifications',
        'Internal knowledge assistants',
        'Back-office process automation',
      ],
      quality: [
        'Grounded on your business data',
        'Human hand-off & guardrails',
        'Multilingual conversations',
        'Secure data handling',
        'Continuous monitoring & improvement',
      ],
      formats: [],
      closing: 'Dhvani.ai helps you move from AI data to intelligent action — automation that works the way your business does.',
      faqs: [
        {
          question: 'What is the difference between an AI chatbot and an AI agent?',
          answer:
            'A chatbot holds conversations. An AI agent goes further — it can take actions such as updating records, booking appointments or processing documents within defined business rules.',
        },
        {
          question: 'Can you build a WhatsApp AI assistant for my business?',
          answer:
            'Yes. We build WhatsApp AI for customer engagement, support and automation using the WhatsApp Business API, integrated with your existing systems.',
        },
        {
          question: 'Do your chatbots support Indian languages?',
          answer:
            'Yes. Our multilingual expertise means chatbots and agents can converse in Hindi, Gujarati and many other Indian and international languages.',
        },
      ],
    },
  },
  {
    title: 'AI Business Advertising',
    slug: 'ai-business-advertising',
    category: 'Creative AI',
    icon: 'megaphone',
    featured: 0,
    tags: ['AI Ads', 'Brand Campaigns', 'Multilingual'],
    image_label: 'AI-generated ad creatives across social, video and outdoor formats',
    excerpt:
      'AI-powered advertising — video ads, product visuals, voice-overs and multilingual campaigns produced faster and at scale, with human creative direction.',
    description:
      'Dhvani.ai brings the power of generative AI to business advertising. We combine AI-generated visuals, synthetic voice, multilingual scripting and human creative direction to produce high-impact ad campaigns — in a fraction of the traditional time and cost.',
    seo_title: 'AI Business Advertising | AI Video Ads & Creative Campaigns | Dhvani.ai',
    seo_description:
      'AI-powered business advertising: AI video ads, product visuals, AI voice-overs, avatars and multilingual campaign localization for brands across India and the world.',
    body: {
      tagline: 'Generative AI Advertising for Modern Brands',
      overview:
        'Dhvani.ai brings the power of generative AI to business advertising. We combine AI-generated visuals, synthetic voice, multilingual scripting and human creative direction to produce high-impact ad campaigns — in a fraction of the traditional time and cost.\n\nWhether you need a product launch film, a month of social creatives or the same campaign in ten regional languages, our creative team uses AI to move faster without losing brand quality. Every asset is directed, reviewed and refined by people who understand your audience.',
      highlights: [
        'AI video ads & reels',
        'AI product photography & visuals',
        'AI voice-overs in 100+ languages',
        'AI avatars & spokespersons',
        'Multilingual campaign localization',
      ],
      blocks_title: 'What We Create',
      blocks: [
        {
          title: 'AI Video Ads',
          icon: 'film',
          body: 'Short-form and long-form ad films created with generative video, motion design and professional editing.',
        },
        {
          title: 'AI Product Visuals',
          icon: 'image',
          body: 'Studio-quality product shots, lifestyle scenes and campaign key visuals — without expensive photo shoots.',
        },
        {
          title: 'AI Voice-Overs & Jingles',
          icon: 'mic',
          body: 'Natural AI voices and music beds, or human voice talent from our studio network, in the language of your audience.',
        },
        {
          title: 'AI Avatars & Spokespersons',
          icon: 'user-round',
          body: 'Consistent digital presenters for explainers, announcements and personalised video messaging.',
        },
        {
          title: 'Campaign Localization',
          icon: 'languages',
          body: 'One master campaign adapted into regional and international languages with native script and cultural review.',
        },
        {
          title: 'Performance Creative Variants',
          icon: 'trending-up',
          body: 'Multiple hooks, formats and aspect ratios generated quickly so your team can test and scale what works.',
        },
      ],
      groups_title: 'Formats & Platforms',
      groups: [
        {
          title: 'Formats We Produce',
          items: [
            'Social media reels & shorts',
            'YouTube & OTT pre-roll ads',
            'Product demo & explainer videos',
            'Static & carousel creatives',
            'Regional-language campaign versions',
            'Digital signage & outdoor creatives',
          ],
        },
        {
          title: 'Platforms',
          items: ['Instagram & Facebook', 'YouTube', 'LinkedIn', 'WhatsApp campaigns', 'Google Ads', 'OTT & connected TV'],
        },
      ],
      use_cases: [
        'Product launches',
        'Festive & seasonal campaigns',
        'Regional & vernacular marketing',
        'E-commerce & D2C brands',
        'Real estate & hospitality',
        'B2B & corporate communication',
      ],
      quality: [
        'Human creative direction on every project',
        'Brand-guideline adherence',
        'Native-language script review',
        'Commercially safe, licensed assets',
        'Fast revision cycles',
      ],
      formats: ['MP4 (9:16, 1:1, 16:9)', 'PNG / JPG', 'WAV / MP3', 'Editable project files (on request)'],
      closing: 'Dhvani.ai helps brands advertise smarter — AI speed, human taste, every language.',
      faqs: [
        {
          question: 'Is AI-generated advertising safe to use commercially?',
          answer:
            'We use licensed, commercially usable tools and assets, and every deliverable is reviewed by our team for brand safety before release.',
        },
        {
          question: 'Can one campaign be made in multiple languages?',
          answer:
            'Yes. Multilingual localization is a core strength — we adapt scripts, voice-overs and on-screen text into regional and international languages.',
        },
      ],
    },
  },
  {
    title: 'AI Film Making',
    slug: 'ai-film-making',
    category: 'Creative AI',
    icon: 'clapperboard',
    featured: 0,
    tags: ['AI Video', 'Storytelling', 'Post-Production'],
    image_label: 'Cinematic AI-generated film still with storyboard frames',
    excerpt:
      'AI-assisted film making — from script and storyboard to AI-generated scenes, characters, voice, music, dubbing and post-production.',
    description:
      'Dhvani.ai’s AI Film Making studio blends generative AI with cinematic storytelling. From concept to final cut, we use AI for pre-visualisation, scene generation, character creation, voice, music and multilingual dubbing — guided by experienced human storytellers and editors.',
    seo_title: 'AI Film Making Studio | AI Video Production & Dubbing | Dhvani.ai',
    seo_description:
      'AI film making from script to screen: AI storyboards, scene and character generation, AI voice, music, dubbing, subtitling and post-production for brands and creators.',
    body: {
      tagline: 'Cinematic Storytelling, Powered by AI',
      overview:
        'Dhvani.ai’s AI Film Making studio blends generative AI with cinematic storytelling. From concept to final cut, we use AI for pre-visualisation, scene generation, character creation, voice, music and multilingual dubbing — guided by experienced human storytellers and editors.\n\nAI removes the biggest barriers of traditional production — locations, sets, crews and long timelines — so ambitious ideas become achievable for brands, educators and creators. Our team keeps the craft human: story, emotion, pacing and polish.',
      highlights: [
        'Script, storyboard & pre-visualisation',
        'AI scene & character generation',
        'AI voice, dubbing & music',
        'Editing, colour & VFX',
        'Multilingual releases',
      ],
      blocks_title: 'Our Film Services',
      blocks: [
        {
          title: 'Script & Storyboarding',
          icon: 'pen-tool',
          body: 'Concept development, screenplay and AI-assisted storyboards that let you see the film before production begins.',
        },
        {
          title: 'AI Scene & Character Generation',
          icon: 'wand-sparkles',
          body: 'Consistent characters, worlds and shots created with state-of-the-art generative video and image models.',
        },
        {
          title: 'AI Voice, Dubbing & Music',
          icon: 'audio-lines',
          body: 'Voice performances, multilingual dubbing and original scores — combining AI tools with our professional studio network.',
        },
        {
          title: 'Post-Production & VFX',
          icon: 'film',
          body: 'Editing, colour grading, sound design and visual effects to give every frame a cinematic finish.',
        },
        {
          title: 'Multilingual Releases',
          icon: 'languages',
          body: 'Subtitling and dubbing into regional and international languages so your story travels further.',
        },
        {
          title: 'Brand & Corporate Films',
          icon: 'building-2',
          body: 'Brand stories, product films, CSR documentaries and training films produced faster and more affordably.',
        },
      ],
      groups_title: 'What We Make & How',
      groups: [
        {
          title: 'What We Create',
          items: [
            'Short films & concept films',
            'Brand films & documentaries',
            'Music videos',
            'Animated explainers',
            'Training & e-learning films',
            'Social storytelling series',
          ],
        },
        {
          title: 'Production Pipeline',
          items: [
            'Concept & script',
            'AI storyboard & pre-vis',
            'Scene generation & compositing',
            'Voice, music & sound design',
            'Edit, grade & VFX',
            'Dubbing & subtitling',
          ],
        },
      ],
      use_cases: [
        'Brand storytelling',
        'Film pitches & pre-visualisation',
        'E-learning & training content',
        'Music & entertainment',
        'Social media series',
        'Corporate communication',
      ],
      quality: [
        'Human directors & editors on every film',
        'Character & style consistency checks',
        'Licensed, commercially safe outputs',
        'Professional sound & colour finishing',
        'Transparent milestone reviews',
      ],
      formats: ['4K / 1080p MP4', 'ProRes (on request)', 'SRT subtitles', 'Stems & project files (on request)'],
      closing: 'Dhvani.ai turns bold ideas into cinematic stories — powered by AI, crafted by people.',
      faqs: [
        {
          question: 'How long does an AI film take to produce?',
          answer:
            'Timelines depend on length and complexity, but AI pre-visualisation and scene generation typically shorten production from months to weeks.',
        },
        {
          question: 'Can you dub our existing film into other languages?',
          answer:
            'Yes. Building on our language heritage, we provide AI-assisted and human dubbing plus subtitling into regional and international languages.',
        },
      ],
    },
  },
];
