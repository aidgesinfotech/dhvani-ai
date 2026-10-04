/**
 * Blog posts. `content` uses a light markdown subset:
 * "## " / "### " headings, "- " bullet lists, "> " quotes, blank line between paragraphs.
 */
export const POSTS = [
  {
    title: 'What Is Egocentric Video Data — and Why Robotics AI Needs It',
    slug: 'what-is-egocentric-video-data',
    category: 'Video Data',
    author: 'Dhvani.ai Team',
    read_minutes: 6,
    published_at: '2026-09-18',
    tags: ['Egocentric Video', 'Robotics', 'Computer Vision'],
    cover_label: 'First-person video of hands performing a kitchen task',
    excerpt:
      'First-person video is quickly becoming one of the most valuable data types in AI. Here is what egocentric data is, why robotics and AR teams want it, and how to collect it well.',
    seo_title: 'What Is Egocentric Video Data? A Guide for Robotics & AI Teams | Dhvani.ai',
    seo_description:
      'Learn what egocentric (first-person) video data is, why robotics, AR and video-understanding models need it, and best practices for collecting it at scale.',
    content: `Most video on the internet is filmed from the outside looking in. A camera watches a person cook, assemble furniture or walk down a street. But robots and AI assistants do not experience the world that way — they need to see it from the inside, the way a person does while doing the task. That is exactly what egocentric video captures.

## What is egocentric video data?

Egocentric video is recorded from a first-person point of view, usually with a head-mounted camera, smart glasses or a chest-mounted rig. The footage shows what the wearer sees: their hands, the objects they handle, the tools they reach for and the environment around them.

Because it captures intent and action at the same time, egocentric data teaches models not just *what* is in a scene, but *how* people interact with it.

## Why AI teams want it

- **Robotics and embodied AI:** robots learn manipulation skills by watching how humans grasp, move and use objects.
- **AR and smart-glasses assistants:** an assistant that sees what you see can guide you step by step.
- **Video understanding:** action recognition, anticipation and step segmentation improve dramatically with first-person data.
- **World models:** large models that simulate the physical world need diverse, real-world human activity.

## What makes a good egocentric dataset

> Volume matters — but diversity, structure and consent matter more.

A useful dataset covers many people, homes, workplaces, regions and lighting conditions. It follows clear task protocols so key actions are captured consistently, and it includes rich metadata: activity labels, step boundaries, environment details and anonymised participant demographics.

### Structured and natural capture

The best programmes combine **scripted tasks** — such as "prepare tea" or "assemble this shelf" — with **natural, unscripted** daily activity. Scripted tasks guarantee coverage; natural capture brings the long tail of real behaviour.

### Privacy and consent

Every participant must give informed consent, and footage should be reviewed for bystanders and personal information, with blurring applied where required.

## How Dhvani.ai helps

Dhvani.ai runs structured, scalable egocentric video programmes across diverse environments and demographics — from wearable rig setup and task design to capture, QA, metadata and optional annotation. If you are building robots, AR assistants or video models, we can help you design a dataset that reflects how the world really works.`,
  },
  {
    title: 'Building Multilingual Speech Datasets for 100+ Languages',
    slug: 'building-multilingual-speech-datasets',
    category: 'Speech Data',
    author: 'Dhvani.ai Team',
    read_minutes: 7,
    published_at: '2026-09-05',
    tags: ['Speech Data', 'ASR', 'TTS', 'Multilingual'],
    cover_label: 'Speakers recording prompts on a mobile app in different languages',
    excerpt:
      'Speech AI only works as well as the voices it was trained on. A practical look at planning speech datasets that cover languages, accents, demographics and real acoustic conditions.',
    seo_title: 'How to Build Multilingual Speech Datasets for ASR & TTS | Dhvani.ai',
    seo_description:
      'A practical guide to multilingual speech data collection: speaker demographics, scripted vs spontaneous speech, recording channels, quality checks and low-resource languages.',
    content: `Voice assistants, call-centre analytics and text-to-speech systems are expanding into every market. Yet many models still struggle with regional accents, code-switching and noisy real-world audio. The fix almost always starts with better speech data.

## Start with your users, not your script

Before writing a single prompt, define who will use your product. Which languages and dialects? Which age groups? Which devices — phones, smart speakers, cars? Which environments — quiet homes, busy streets, call centres?

These answers become **demographic quotas** and **recording specifications** that keep the dataset balanced.

## Choose the right type of speech

- **Scripted read speech** — fast to collect and easy to transcribe; great for coverage of vocabulary and phonemes.
- **Semi-scripted prompts** — contributors respond to scenarios in their own words.
- **Spontaneous conversation** — the most natural data, essential for conversational AI.
- **Commands and wake words** — short utterances for keyword spotting.

Most production ASR systems need a blend of all four.

## Pick the right recording channel

### Mobile app collection

Android and iOS apps reach large, diverse speaker pools quickly and capture real device acoustics.

### Web app recording

Browser-based recording makes onboarding fast and works well for remote and enterprise-controlled programmes.

### Acoustic studio recording

For TTS voices, AI dubbing and voice cloning, studio-grade audio in a controlled environment is non-negotiable.

## Quality is a process, not a step

Good speech programmes check audio specifications (sample rate, bit depth, signal-to-noise ratio), script adherence, pronunciation and speaker metadata — continuously, not just at the end. Human review catches issues automated checks miss, such as wrong language, mumbled prompts or background speakers.

## Don't forget low-resource languages

Many of the world's languages have very little public speech data. Reaching native speakers of these languages — and transcribing them accurately — requires local networks and linguistic expertise.

## How Dhvani.ai helps

Dhvani.ai collects speech data through mobile app, web app and acoustic studio channels across 100+ languages, with native speakers, demographic balancing, scripted and spontaneous speech, and quality-controlled, consent-driven workflows. Tell us about your model and we will design a dataset around it.`,
  },
  {
    title: 'Human-in-the-Loop: Why LLM Evaluation Still Needs People',
    slug: 'why-llm-evaluation-needs-humans',
    category: 'LLM Evaluation',
    author: 'Dhvani.ai Team',
    read_minutes: 6,
    published_at: '2026-08-22',
    tags: ['LLM Evaluation', 'Human-in-the-Loop', 'RLHF'],
    cover_label: 'Reviewers comparing AI model responses side by side',
    excerpt:
      'Automated benchmarks are useful, but they cannot judge tone, cultural nuance or real-world helpfulness. Why human evaluation remains essential for trustworthy LLMs.',
    seo_title: 'Why LLM Evaluation Still Needs Human Reviewers | Dhvani.ai',
    seo_description:
      'Automated metrics miss tone, safety and cultural nuance. Learn how human-in-the-loop LLM evaluation, custom rubrics and multilingual reviewers improve AI quality.',
    content: `Large language models are evaluated on dozens of public benchmarks. Scores keep rising — yet users still encounter answers that are confidently wrong, culturally off or unhelpful. The gap between benchmark performance and real-world quality is where human evaluation earns its place.

## What automated metrics miss

Automated metrics are fast and cheap, but they struggle with:

- **Factual correctness** in open-ended answers
- **Helpfulness** — did the response actually solve the user's problem?
- **Tone and safety** — is it respectful, appropriate and free of harmful content?
- **Cultural and linguistic nuance**, especially in regional languages
- **Instruction-following** across complex, multi-step prompts

## How human evaluation works

### Custom rubrics

Good evaluation starts with a clear rubric: what does a great, acceptable or failing answer look like for *your* product? Rubrics turn subjective judgement into consistent scores.

### Side-by-side preference ranking

Reviewers compare two or more responses and choose the better one. These preferences power RLHF and help teams choose between model versions.

### Reviewer calibration

Before production, reviewers score the same samples and discuss disagreements until they align. Ongoing agreement checks keep quality stable.

> A model is only as trustworthy as the process used to evaluate it.

## Multilingual evaluation is different

Translating an English benchmark into Hindi or Gujarati does not create a fair test. Native-language reviewers catch unnatural phrasing, wrong honorifics and culturally inappropriate content that translated benchmarks never surface.

## Beyond text

Modern AI is multimodal. Human evaluation also matters for ASR accuracy, TTS naturalness, computer vision precision and generated images and video.

## How Dhvani.ai helps

Dhvani.ai provides multimodal, multilingual human-in-the-loop validation and AI model evaluation — training-data validation, LLM output evaluation and alignment, conversational AI QA and generative AI assessment — with custom metrics, reviewer calibration and secure workflows aligned with GDPR, HIPAA and ISO 9001:2015 practices.`,
  },
  {
    title: 'OCR & Document AI: Preparing Training Data for Real-World Documents',
    slug: 'ocr-document-ai-training-data',
    category: 'Document AI',
    author: 'Dhvani.ai Team',
    read_minutes: 5,
    published_at: '2026-08-08',
    tags: ['OCR', 'Document AI', 'IDP'],
    cover_label: 'Handwritten forms and printed invoices with labeled fields',
    excerpt:
      'Invoices, receipts, ID cards and handwritten forms are messy. Here is how to build OCR and Document AI training data that holds up in production.',
    seo_title: 'OCR & Document AI Training Data: A Practical Guide | Dhvani.ai',
    seo_description:
      'How to prepare OCR and Document AI training data: document types, handwriting, multilingual scripts, layout and key-value annotation, PII handling and QA.',
    content: `Intelligent Document Processing promises to turn piles of paperwork into structured data. In practice, models often fail on the documents customers actually upload: crumpled receipts, faded stamps, mixed scripts and handwriting. Better training data closes that gap.

## Know your document universe

List every document type your model must handle — invoices, receipts, forms, identity documents, business letters — and every language and script. Then think about capture conditions: flatbed scans, phone photos, shadows, skew and low resolution.

## The core annotation tasks

- **Document classification** — what type of document is this?
- **OCR transcription** — exact text at line, word or character level
- **Layout annotation** — headers, paragraphs, tables and reading order
- **Key-value extraction** — invoice number, date, total, name and other fields
- **Table structure** — rows, columns and cell relationships

## Handwriting and multilingual scripts

Handwritten text and Indian scripts are where generic datasets fall short. Native-script annotators are essential to transcribe accurately and to recognise ambiguous characters correctly.

## Handle personal data carefully

Identity and financial documents contain sensitive information. Work in access-controlled environments, mask PII where appropriate and keep a clear chain of custody.

## Measure quality at the character level

Field-level accuracy matters for extraction, but character-level checks catch the small errors that break downstream automation — a wrong digit in an invoice total, for example.

## How Dhvani.ai helps

Dhvani.ai supports handwritten and printed text, forms, receipts, invoices, identity, business and multilingual documents — with document classification and OCR annotation for OCR, Document AI, Intelligent Document Processing and handwriting recognition applications.`,
  },
];
