export const portfolioData = {
  name: "Siddhartha Kuchana",
  role: "AI & ML Undergraduate | Full-Stack Developer | AI Engineer",
  education: {
    degree: "B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    institution: "JNTU Hyderabad (JNTUH)",
    graduation: "2027",
    cgpa: "8.41",
    semesters: [
      { sem: "1st Year 1st Sem", sgpa: 7.65 },
      { sem: "1st Year 2nd Sem", sgpa: 7.83 },
      { sem: "2nd Year 1st Sem", sgpa: 8.05 },
      { sem: "2nd Year 2nd Sem", sgpa: 9.00 },
      { sem: "3rd Year 1st Sem", sgpa: 8.80 },
      { sem: "3rd Year 2nd Sem", sgpa: 9.18 },
    ],
  },
  about: `I am an ambitious AI & ML undergraduate with hands-on experience building full-stack applications, machine-learning systems, automation tools, and AI-powered products.

I enjoy turning complex technical problems into practical and reliable software.`,
  skills: {
    languages: ["Python", "C++", "C", "JavaScript", "PHP"],
    ai_ml: [
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Joblib",
      "Sentence Transformers",
      "TensorFlow / TensorFlow Lite",
      "Machine Learning",
      "NLP",
      "Computer Vision",
    ],
    backend: ["FastAPI", "Flask", "REST APIs", "SQLAlchemy", "Uvicorn"],
    frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    databases: ["MySQL", "TiDB", "Pinecone"],
    tools: ["Git", "GitHub", "Selenium", "OpenCV", "MediaPipe"],
  },
  projects: [
    {
      title: "AlignWell",
      category: "Computer Vision / AI / Fitness",
      description:
        "An AI-powered exercise posture correction system that analyzes body posture using computer vision and provides real-time feedback to help users perform exercises with proper form.",
      techStack: [
        "FastAPI",
        "Python",
        "MediaPipe",
        "OpenCV",
        "TensorFlow Lite",
        "JavaScript",
        "WebSockets",
      ],
      features: [
        "Real-time pose detection",
        "Joint angle calculation",
        "Exercise analysis",
        "Posture feedback",
        "Webcam integration",
        "Exercise guidance",
        "Gamified experience",
      ],
      githubLink: "https://github.com/siddharthakuchana/alignwell",
      liveLink: "",
      visual: "alignwell",
      caseStudy: {
        problem:
          "Users often perform exercises incorrectly without real-time guidance, leading to potential injuries.",
        approach:
          "Use MediaPipe pose landmarks to track body joints and calculate relevant joint angles in real-time.",
        challenges:
          "Achieving low-latency real-time pose tracking, optimizing webcam processing, and handling WebSocket communication.",
        result:
          "A real-time feedback system capable of accurately analyzing and correcting exercise posture.",
      },
    },
    {
      title: "AutoResultX",
      category: "Automation / Python / Selenium",
      description:
        "An automation system designed to extract university results from dynamic web portals without manually entering every roll number.",
      techStack: ["Python", "Selenium", "Brave Browser", "Pandas", "Excel"],
      features: [
        "Automatic roll number generation",
        "Dynamic JavaScript page handling",
        "Automated result extraction",
        "SGPA/result extraction",
        "Excel export",
        "Browser automation",
      ],
      githubLink: "https://github.com/siddharthakuchana/autoresultx",
      liveLink: "",
      visual: "autoresultx",
      caseStudy: {
        problem:
          "Manual result checking is repetitive and time-consuming for students and staff.",
        approach:
          "Developed an automated workflow using Selenium to navigate the portal, bypass dynamic loading, and scrape results systematically.",
        challenges:
          "Handling dynamic JavaScript page reloads and avoiding bot detection mechanisms.",
        result:
          "A fully automated extraction tool that accurately exports bulk result data into Excel formats.",
      },
    },
    {
      title: "Career Guidance System",
      category: "AI / Machine Learning / Full Stack",
      description:
        "A web-based career guidance platform that uses machine learning to recommend suitable career paths based on user skills and interests.",
      techStack: [
        "Python",
        "Scikit-learn",
        "NumPy",
        "Joblib",
        "PHP",
        "MySQL",
        "HTML",
        "CSS",
        "JavaScript",
      ],
      features: [
        "Skill-based prediction",
        "Career recommendations",
        "Career information",
        "Roadmap generation",
        "Alumni directory",
        "Authentication",
        "Personalized suggestions",
      ],
      githubLink: "https://github.com/siddharthakuchana/career-guidance",
      liveLink: "",
      visual: "career-guidance",
      caseStudy: {
        problem:
          "Students often struggle to identify the most suitable career path based on their diverse skill sets.",
        approach:
          "Trained a machine learning model on historical career data to classify and recommend optimal career paths.",
        challenges:
          "Cleaning the dataset, integrating the Python ML model with a PHP/MySQL backend.",
        result:
          "An accurate prediction engine providing actionable roadmaps for paths like Data Scientist and AI/ML Specialist.",
      },
    },
  ],
  achievements: [
    "Pursuing B.Tech CSE (AI & ML) at JNTUH with a CGPA of 8.26",
    "Developed multiple end-to-end full-stack applications",
    "Built robust AI/ML models and deployed them in practical systems",
    "Created complex automation tools for web data extraction",
    "Consistent practice in Data Structures & Algorithms (DSA)",
  ],
  journey: [
    {
      year: "2023",
      title: "Started B.Tech / Computer Science journey",
      description: "Began focusing on the fundamentals of computer science and software development.",
    },
    {
      year: "2024",
      title: "Focused on programming and DSA",
      description: "Strengthened algorithmic thinking and built a solid foundation in core programming.",
    },
    {
      year: "2025",
      title: "Started building AI/ML and full-stack projects",
      description: "Applied theoretical knowledge to practical, real-world systems.",
    },
    {
      year: "2026",
      title: "Building advanced AI-powered applications",
      description: "Focusing on complex architectures, computer vision, and NLP systems.",
    },
    {
      year: "2027",
      title: "Expected graduation",
      description: "Looking forward to bringing value to the tech industry as a full-time engineer.",
    },
  ],
  currentlyExploring: [
    "Advanced Machine Learning",
    "Computer Vision",
    "AI Agents",
    "Backend Architecture",
    "System Design",
    "DSA",
    "Generative AI",
  ],
  socials: {
    github: "https://github.com/siddharthakuchana",
    linkedin: "https://linkedin.com/in/siddharthakuchana",
    email: "siddharthakuchana@gmail.com",
    resume: "/resume",
  },
};
