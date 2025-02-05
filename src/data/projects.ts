export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  technologies?: string[];
  links: {
    live?: string;
    github?: string;
  };
  details: {
    challenge: string;
    solution: string;
    impact: string;
  };
  images: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'research-gpt',
    title: 'ResearchGPT',
    description: 'An advanced AI-powered research paper generation platform built with React, TypeScript, and Tailwind CSS, enabling users to create high-quality academic papers with customizable configurations.',
    thumbnail: '/images/researchgpt.webp', // Replace with an appropriate image URL
    category: 'Research and Education',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'jsPDF', 'html2canvas'],
    links: {
      live: 'https://gemini-research.vercel.app', // Replace with the actual live URL if available
      github: 'https://github.com/Aayush518/GeminiResearch/' // Replace with the actual GitHub repo URL
    },
    details: {
      challenge: 'Creating a platform for generating structured, high-quality academic research papers with advanced AI models, customizable configurations, and support for multiple citation styles.',
      solution: 'Developed a user-friendly React-based interface with TypeScript, integrating advanced AI models such as DeepSeek R1 and Gemini 2.0 for generating research content. Implemented features like real-time progress updates, multi-page previews, PDF export, and customizable academic configurations (word count, references, citation styles, etc.).',
      impact: 'Empowered students, researchers, and professionals to efficiently generate well-structured academic papers, reducing the time and effort required for content creation and academic formatting.'
    },
    images: [
      '/images/researchgpt.webp' 
    ],
    featured: true
  },
  {
    id: 'ai-content-creator-pro',
    title: 'AI Content Creator Pro',
    description: 'A powerful, modern AI-powered content creation platform built with React, TypeScript, and Google\'s Gemini AI for generating diverse content types including memes, stories, recipes, poems, speeches, and more.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    category: 'Content Generation',
    technologies: ['React', 'TypeScript', 'Google Gemini AI', 'Tailwind CSS', 'Framer Motion'],
    links: {
      live: 'https://ai-content-creator-pro.vercel.app'
    },
    details: {
      challenge: 'Building a versatile content generation platform that can create multiple types of content with emotional intelligence while maintaining a modern, user-friendly interface.',
      solution: 'Implemented a modular architecture using React and TypeScript, integrating Google\'s Gemini AI for content generation across 10 different content types with 5 distinct emotional tones. Created a glass-morphic UI design with fluid animations for an enhanced user experience.',
      impact: 'Streamlined the content creation process by enabling users to generate high-quality, emotionally-intelligent content across various formats with just a few clicks, making content creation accessible to everyone.'
    },
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995'
    ],
    featured: true
  },
  {
    id: 'Rule-based Nepali Arpabet Converter',
    title: 'Rule-based Nepali Arpabet Converter',
    description: 'A tool for converting Nepali text to Arpabet phonemes',
    thumbnail: '/images/Nepali_Arpabet.webp',
    category: 'Speech Technology',
    technologies: ['Python', 'NLP', 'TTS', 'ASR'],
    links: {
      live: 'https://nepali-arpabet.vercel.app'
    },
    details: {
      challenge: 'Developing a tool for converting Nepali text to Arpabet phonemes',
      solution: 'Developed a rule-based approach for converting Nepali text to Arpabet phonemes',
      impact: 'Simplified the process of converting Nepali text to Arpabet phonemes'
    },
    images: [
      '/images/Nepali_Arpabet.webp',    ],
    featured: true
  },
  {
    id: 'Resume Maker',
    title: 'Resume Maker',
    description: 'A tool for creating professional resumes in minutes',
    thumbnail: '/images/Resume_maker.webp',
    category: 'Web Development',
    technologies: ['React', 'Typescript', 'Vite'],
    links: {
      live: 'https://resume-builder-git-main-adhikareeprayushs-projects.vercel.app'
    },
    details: {
      challenge: 'Developing a tool for creating professional resumes in minutes with smooth experience',
      solution: 'Developed a React app that allows users to create professional resumes in minutes',
      impact: 'Simplified the process of creating professional resumes in minutes'
    },
    images: [
      '/images/Resume_maker.webp'
    ],
    featured: true
  },
  {
    id: 'Immersive-MusicBrowser',
    title: 'Immersive-MusicBrowser',
    description: 'A music browser for immersive listening experience',
    thumbnail: '/images/music-1.webp',
    category: 'Web Development',
    technologies: ['Typescript', 'CSS'],
    links: {
      live: 'https://immersive-music-browser.vercel.app'
    },
    details: {
      challenge: 'Developing a local music browser for immersive listening experience',
      solution: 'Developed a local music browser for immersive listening experience',
      impact: 'Simplified the process of listening to music'
    },
    images: [
      '/images/music-1.webp',
      '/images/music2.webp',
      '/images/music-3.webp'
    ],
    featured: true
  },
  {
    id: 'Transcription-Studio',
    title: 'Audio Transcription Studio',
    description: 'Professional Audio Transcription & Verification Tool',
    thumbnail: '/images/audtrans3.webp',
    category: 'Web Development, Speech Technology',
    technologies: ['Typescript', 'JS', 'CSS'],
    links: {
      live: 'https://transcription-studio.vercel.app/'
    },
    details: {
      challenge: "Creating an efficient audio transcription verification and editing system",
      solution: "Developed a professional-grade transcription studio with audio playback and text editing capabilities",
      impact: "Streamlined the transcription verification workflow by combining audio playback, text editing, and verification status tracking in one interface"
    },
    images: [
      '/images/audtrans1.webp',
      '/images/audtrans2.webp',
      '/images/audtrans3.webp'
    ],
    featured: true
  },
  {
    id: 'StoryVerse',
    title: 'StoryVerse: Decentralized Story Universe Platform',
    description: 'A platform revolutionizing storytelling with blockchain-based story NFTs, collaborative universe building, and decentralized governance.',
    thumbnail: '/images/storyverse8.webp', 
    category: 'Web Development, Blockchain, Storytelling',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'IPFS', 'Ethereum'],
    links: {
        github: 'https://github.com/Aayush518/StoryVerse',
        live: 'https://drive.google.com/file/d/1PC4UtJJo6Pa__Oe_HQMWOMkpuP-YRWdK/view?usp=sharing' 
    },
    details: {
        challenge: 'Facilitating decentralized storytelling with collaborative tools, NFTs, and blockchain technology.',
        solution: 'Developed a UI for a decentralized storytelling platform where stories, characters, and universes are tokenized as NFTs, enabling authors to collaborate, monetize, and govern their creations.',
        impact: 'Empowered authors with true ownership of their work, introduced innovative revenue-sharing models, and created a community-driven storytelling ecosystem.'
    },
    images: [
        '/images/storyverse1.webp', 
        '/images/storyverse2.webp',
        '/images/storyverse3.webp',
        '/images/storyverse4.webp',
        '/images/storyverse5.webp', 
        '/images/storyverse6.webp',
        '/images/storyverse7.webp',
        '/images/storyverse8.webp',
        '/images/storyverse9.webp',
        '/images/storyverse10.webp',
        '/images/storyverse11.webp',
        '/images/storyverse12.webp',
        '/images/storyverse13.webp',
        '/images/storyverse14.webp',
        '/images/storyverse16.webp',
        '/images/storyverse17.webp',
        '/images/storyverse18.webp',
        '/images/storyverse19.webp',
        '/images/storyverse20.webp'
       
    ],
    featured: true
},
{
  id: 'Immersive-3D-Portfolio template',
  title: 'Immersive 3D Portfolio template',
  description: 'Interactive 3D portfolio template built with Three.js and React, featuring custom shaders and animations',
  thumbnail: '/images/portfolio1.webp',
  category: 'Web Development, 3D Graphics',
  technologies: ['Three.js', 'React', 'WebGL', 'TypeScript'],
  links: {
    live: 'https://fluffy-dollop.vercel.app/'
  },
  details: {
    challenge: 'Creating an immersive and interactive 3D portfolio template that showcases modern web development capabilities',
    solution: 'Developed a 3D portfolio using Three.js and React with custom shaders and animations for a unique user experience',
    impact: 'Demonstrated the potential of modern web technologies for creating visually stunning and interactive experiences'
  },
  images: [
    '/images/portfolio1.webp',
    '/images/portfolio2.webp',
    '/images/portfolio3.webp',
    '/images/portfolio4.webp',
    '/images/portfolio5.webp',
    '/images/portfolio6.webp',
    '/images/portfolio7.webp',
    '/images/portfolio8.webp',
    '/images/portfolio9.webp',
    '/images/portfolio10.webp',
    '/images/portfolio11.webp'

  ],
  featured: true
},
{
  "id": "coderunner",
  "title": "Python Code Runner",
  "description": "A web-based Python code execution environment with time and space complexity analysis, featuring real-time execution and input handling",
  "thumbnail": "/images/coderun1.webp",
  "category": "Web Development, Programming Tools",
  "technologies": ["Flask", "Python", "JavaScript", "HTML", "CSS"],
  "links": {
    "live": "https://coderunner-yrwm.onrender.com/"
  },
  "details": {
    "challenge": "Creating a secure and efficient web-based Python code execution environment with complexity analysis",
    "solution": "Developed a Flask-based backend with input sanitization, time complexity analysis, and memory tracking, combined with a responsive frontend interface",
    "impact": "Provides developers with a tool for testing Python code snippets with complexity analysis and input handling"
  },
  "images": [
    "/images/coderun1.webp",
    "/images/coderun2.webp",
    "/images/coderun3.webp",
    "/images/coderun4.webp",
  ],
  "featured": true
},
{
  "id": "audio-dataset-handler",
  "title": "Audio Dataset Handler",
  "description": "A web-based tool for managing and transcribing audio datasets, featuring audio recording, transcription management, and file handling capabilities",
  "thumbnail": "/images/flaskaudiorecord.webp",
  "category": "Web Development, Audio Processing",
  "technologies": ["Flask", "Python", "JavaScript", "HTML", "CSS", "TailwindCSS"],
  "links": {
    "github": "https://github.com/Aayush518/Audio-Dataset-Handler"
  },
  "details": {
    "challenge": "Creating a user-friendly interface for managing audio datasets and transcriptions with real-time recording and editing capabilities",
    "solution": "Developed a Flask-based backend with audio file handling, transcription management, and conversion features, combined with a responsive frontend interface using TailwindCSS",
    "impact": "Provides researchers and developers with a tool for efficiently managing and transcribing audio datasets, suitable for machine learning and data processing tasks"
  },
  "images": [
    "/images/flaskaudiorecord.webp",
  ],
  "featured": true
},
{
  "id": "tclient",
  "title": "BitTorrent Client",
  "description": "A sleek, modern BitTorrent client with a dark-inspired interface built using React and Node.js, featuring real-time download progress, peer connection information, and detailed file statistics. This project was developed with complete reference to Kim's implementation of the BitTorrent protocol, which served as the foundation for our protocol implementation",
  "thumbnail": "/images/Tclient.webp",
  "category": "Web Development, Networking",
  "technologies": ["React", "Node.js", "Express", "JavaScript", "CSS"],
  "links": {
    "github": "https://github.com/Aayush518/TClient-didactic-parakeet"
  },
  "details": {
    "challenge": "Creating a user-friendly and efficient BitTorrent client with real-time tracking and modern interface",
    "solution": "Developed a custom BitTorrent protocol implementation with Node.js backend and React frontend, featuring real-time progress tracking, peer management, and detailed statistics",
    "impact": "Provides an educational and practical tool for understanding and working with the BitTorrent protocol, suitable for both learning and personal use",
  },
  "images": [
    "/images/Tclient.webp"
  ],
  "featured": true
},
{
  "id": "MithoMitho",
  "title": "MithoMitho/Se-Trails",
  "description": "A comprehensive foodie companion web application designed for Pokhara Valley, featuring robust user authentication with email OTP verification and password reset capabilities. The platform enables users to discover restaurants through an intuitive search system, access detailed establishment information, and maintain a personalized dining history with interactive map integration. Users can create their own culinary trails by adding visited restaurants to their personal map, complete with visit details and interactive indicators. The application includes social features allowing users to connect with friends, view their dining activities, and share experiences. Built with Flask and modern front-end technologies, MithoMitho ensures real-time data accuracy through automated scraping from various sources, all wrapped in a responsive design that works seamlessly across all devices. A sample prototype for the concept is available in the link : https://setrails.netlify.app and the github link is : https://github.com/Aayush518/Se-trails-Your-food-companion/tree/main",
  "thumbnail": "/images/mithomitho.webp",
  "category": "Web Development, Full Stack",
  "technologies": ["Python", "Flask", "PostgreSQL", "SQLAlchemy", "HTML5", "CSS", "Bootstrap", "JavaScript", "jQuery"],
  "links": {
    "github": "https://drive.google.com/file/d/1H019Kxr00dNqQV0XxcU1MQygOJEtolWV/view?usp=sharing",
    "live": "https://drive.google.com/file/d/1H019Kxr00dNqQV0XxcU1MQygOJEtolWV/view?usp=sharing"
  },
  "details": {
    "challenge": "Creating a comprehensive platform that combines restaurant discovery, personal dining history tracking, and social connectivity while ensuring real-time data accuracy and user engagement",
    "solution": "Developed a full-stack application using Flask and PostgreSQL, implementing features like email OTP verification, interactive maps for dining history, and real-time restaurant data scraping",
    "impact": "Provides food enthusiasts in Pokhara Valley with a complete platform to discover, track, and share their dining experiences while building a community of food lovers"
  },
  "images": [
    "/images/mithomitho.webp"
  ],
  "featured": true
},
{
  "id": "CryptArithmeticSolver",
  "title": "CryptArithmeticSolver",
  "description": "A web-based cryptarithmetic puzzle solver application built with Flask and Google OR-Tools. The platform allows users to input cryptarithmetic equations and solves them using constraint programming techniques. It provides a user-friendly interface to quickly solve puzzles like SEND + MORE = MONEY or extended puzzles with multiple terms, displaying all possible solutions along with solving statistics. The application is designed for puzzle enthusiasts and educators, offering a seamless experience for exploring and understanding cryptarithmetic problems.",
  "thumbnail": "/images/crypt1.webp",
  "category": "Web Development, Mathematical Puzzles",
  "technologies": ["Python", "Flask", "Google OR-Tools", "HTML5", "CSS", "Bootstrap", "JavaScript"],
  "links": {
    "github": "https://github.com/Aayush518/CryptArithmeticSolver"
  },
  "details": {
    "challenge": "Developing an efficient solver for cryptarithmetic puzzles with support for unique constraints like non-zero leading digits and ensuring all letters map to distinct digits.",
    "solution": "Built a full-stack web application using Flask for the backend and Google OR-Tools for solving the puzzles. Implemented a dynamic input system to handle different types of puzzles, including standard and extended equations, with real-time feedback.",
    "impact": "Provides a powerful tool for solving and learning cryptarithmetic puzzles, making it accessible to students, educators, and puzzle enthusiasts worldwide."
  },
  "images": [
    "/images/crypt1.webp",
    "/images/crypt2.webp"
  ],
  "featured": true
},
{
  "id": "NepaliTTS",
  "title": "Nepali Text-to-Speech Synthesis",
  "description": "A Nepali text-to-speech synthesis system using Tacotron2 for melspectrogram generation and HiFi-GAN as the vocoder. The system generates high-quality synthesized Nepali speech from input text, leveraging deep learning techniques to produce natural-sounding output. It includes text preprocessing, model fine-tuning on Nepali datasets, and post-processing techniques to enhance naturalness.",
  "thumbnail": "/images/tts.jpg",
  "category": "Speech Synthesis, Natural Language Processing",
  "technologies": ["Python", "Tacotron2", "HiFi-GAN", "TensorFlow", "PyTorch", "NLP"],
  "links": {
    "github": "https://docs.google.com/forms/d/e/1FAIpQLSelwj4pp_5k_kS534pU2VvZgBCA9lIn3186Dvzr_jl5Ml_a9A/viewform"
  },
  "details": {
    "challenge": "Developing a high-quality text-to-speech system for Nepali, an under-resourced language, with limited availability of large speech datasets and handling Nepali-specific phonemes and pronunciations.",
    "solution": "Implemented a two-phase approach using Tacotron2 for melspectrogram generation and HiFi-GAN for vocoding. Fine-tuned pre-trained models on Nepali datasets and employed incremental learning to continually update the model with new data.",
    "impact": "Achieved a Mean Opinion Score of 4.03 for naturalness, the highest among all previous Nepali Text-to-Speech tasks, providing a valuable tool for Nepali language technology and accessibility."
  },
  "images": [
    "/images/tts.jpg",
  ],
  "featured": true
},
{
  "id": "ResumeRanker",
  "title": "AI-Powered Resume Ranking System",
  "description": "An intelligent resume analysis and ranking system that uses natural language processing and machine learning techniques to evaluate and score resumes based on job requirements. The system extracts key information from resumes, matches them against job descriptions, and provides a ranked list of candidates, streamlining the recruitment process.",
  "thumbnail": "/images/resumea1.webp",
  "category": "Artificial Intelligence, Human Resources",
  "technologies": ["Python", "NLP", "Machine Learning", "TensorFlow", "spaCy", "Flask", "React"],
  "links": {
    "github": "https://github.com/example/resume-ranker"
  },
  "details": {
    "challenge": "Developing an efficient and accurate system to analyze large volumes of resumes, extract relevant information, and rank candidates based on job-specific criteria while eliminating bias in the screening process.",
    "solution": "Implemented a multi-stage pipeline using NLP for text extraction, machine learning for feature engineering, and a ranking algorithm based on semantic similarity. Integrated with ATS systems for seamless data flow and user-friendly interface for recruiters.",
    "impact": "Significantly reduced time spent on resume screening, improved candidate-job matching accuracy, and provided data-driven insights for hiring decisions, enhancing overall recruitment efficiency."
  },
  "images": [
    "/images/resumea1.webp",
    "/images/resumea2.webp",
    "/images/resumea3.webp",
    "/images/resumea4.webp",
    "/images/resumea5.webp",
    "/images/resumea6.webp"
  ],
  "featured": true
},
{
  "id": "Hive-Hostel",
  "title": "HostelHive - Student Budget Tracker",
  "description": "A comprehensive budget tracking and management application designed specifically for hostel and college students. HostelHive helps students manage their expenses, track budgets, and gain financial insights through an intuitive and user-friendly interface. The platform offers features like expense categorization, budget planning, and visual analytics to help students maintain financial discipline and make informed spending decisions.",
  "thumbnail": "/images/hive1.webp",
  "category": "Web Development, Financial Management",
  "technologies": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Next-Auth", "Zod", "PostgreSQL"],
  "links": {
    "github": "https://github.com/Aayush518/Hive-Hostel"
  },
  "details": {
    "challenge": "Creating a secure and scalable budget tracking solution tailored for students, with features like authentication, expense tracking, and interactive dashboards while ensuring a seamless user experience.",
    "solution": "Developed a full-stack application using Next.js for the frontend and backend, Prisma for database management, and Next-Auth for secure authentication. Implemented robust form validation with Zod and provided a responsive UI with Tailwind CSS. The dashboard features interactive charts and visualizations powered by Recharts.",
    "impact": "Empowers students to take control of their finances by providing a centralized platform for budget management, leading to better financial habits and reduced overspending."
  },
  "images": [
    "/images/hive1.webp",
    "/images/hive2.webp",
    "/images/hive3.webp",
    "/images/hive4.webp",
    "/images/hive5.webp",
    "/images/hive6.webp",
    "/images/hive7.webp",
    "/images/hive8.webp",
    "/images/hive9.webp",
    "/images/hive10.webp",
  ],
  "featured": true
},
{
  "id": "NepaliSpeechAPC",
  "title": "Nepali Speech Recognition APC",
  "description": "A deep learning system using Autoregressive Predictive Coding for recognizing and processing Nepali speech keywords, enabling accurate speech recognition and analysis in the Nepali language.",
  "thumbnail": "/images/tts.jpg",
  "category": "Speech Processing",
  "technologies": ["Python", "PyTorch", "Deep Learning", "Signal Processing", "Wandb"],
  "links": {
    "live": "https://nepaliapc.vercel.app/"
  },
  "details": {
    "challenge": "Developing an accurate speech recognition system for Nepali language keywords with limited data availability, requiring robust feature extraction and handling of diverse acoustic conditions.",
    "solution": "Implemented an Autoregressive Predictive Coding model with comprehensive data augmentation, MFCC feature extraction, and multi-stage evaluation framework for accurate keyword recognition in Nepali speech.",
    "impact": "Successfully recognized over 65 Nepali keywords with high accuracy, expanded the training dataset 30x through augmentation, and enabled robust speech processing capabilities for the Nepali language."
  },
  "images": [
    "/images/tts.jpg",

  ],
  "featured": true
},{
  "id": "Blogs",
  "title": "Blogs",
  "description": "A collection of my blog posts on various topics and technologies.",
  "thumbnail": "/images/blogs2.webp",
  "category": "Writing",
  "technologies": [],
  "links": {
    "live": "https://blogs-five-phi.vercel.app/"
  },
"details": {
  "challenge": "Creating engaging and informative blog posts on a wide range of topics and technologies.",
  "solution": "Developed and published blog posts on a diverse range of topics, including web development, machine learning, and personal growth.", 
  "impact": "Provided valuable insights and knowledge to readers, fostering a deeper understanding of various topics and technologies." 
},  
"images": [
  "/images/blogs1.webp",
  "/images/blogs2.webp",
  "/images/blogs3.webp",
  "/images/blogs4.webp",
  "/images/blogs5.webp",
  "/images/blogs6.webp",
],
"featured": true
},
{
  id: 'Harmony Hub',
  title: 'Harmony Hub',
  description: 'A music playlist for my personal sanctuary of sound',
  thumbnail: '/images/music1.webp',
  category: 'Music',
  technologies: ['Typescript'],
  links: {
    live: 'https://crispy-rotary-phone-psi.vercel.app/'
  },
  details: {
    challenge: 'Creating a music playlist for relaxation and focus',
    solution: 'Curated a collection of calming and inspiring music tracks for relaxation and focus',
    impact: 'Provides a soothing and immersive listening experience for personal reflection and creativity'
  },
  images: [    '/images/music1.webp',
    '/images/music2 copy.webp',
  ],
  featured: true
},
{
  id: 'neural-g2p-nepali',
  title: 'Neural Grapheme-to-Phoneme Conversion for Nepali',
  description: 'A deep learning-based solution for converting Nepali text to ARPABET phonemes using sequence-to-sequence models.',
  thumbnail: '/images/Nepali_Arpabet.webp',
  category: 'Speech Technology',
  technologies: ['Python', 'Deep Learning', 'LSTM', 'Seq2Seq', 'NLP'],
  links: {
    live: 'https://neural-g2p-nepali.vercel.app'
  },
  details: {
    challenge: 'Creating a robust and accurate grapheme-to-phoneme conversion model for an under-resourced language like Nepali.',
    solution: 'Developed an LSTM-based encoder-decoder sequence-to-sequence model trained on 10,000 Nepali transcriptions, achieving a Word Error Rate (WER) of 0.0184.',
    impact: 'Demonstrated the potential of deep learning in addressing linguistic challenges for low-resource languages, aiding advancements in TTS and ASR systems for Nepali.'
  },
  images: [
    '/images/neural-g2p-nepali-model-architecture.png',
    '/images/neural-g2p-training-loss.png'
  ],
  featured: true
},
];  



