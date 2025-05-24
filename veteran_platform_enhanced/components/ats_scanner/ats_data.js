// ATS Scanner Data
const atsData = {
  // Common keywords by industry
  industryKeywords: {
    technology: [
      "software", "development", "programming", "agile", "scrum", "java", "python", "javascript", 
      "cloud", "aws", "azure", "devops", "ci/cd", "automation", "algorithms", "data structures",
      "full-stack", "front-end", "back-end", "api", "microservices", "database", "sql", "nosql"
    ],
    healthcare: [
      "patient care", "medical", "clinical", "healthcare", "treatment", "diagnosis", "therapy",
      "patient records", "hipaa", "compliance", "regulations", "certification", "patient safety",
      "medical equipment", "healthcare management", "patient satisfaction", "quality improvement"
    ],
    finance: [
      "financial analysis", "accounting", "budgeting", "forecasting", "financial reporting",
      "risk management", "compliance", "regulations", "banking", "investment", "portfolio",
      "financial planning", "audit", "tax", "revenue", "cost reduction", "profit", "loss"
    ],
    manufacturing: [
      "production", "quality control", "supply chain", "inventory management", "lean manufacturing",
      "six sigma", "process improvement", "safety", "maintenance", "operations", "logistics",
      "procurement", "materials", "assembly", "fabrication", "inspection", "quality assurance"
    ],
    logistics: [
      "supply chain", "logistics", "transportation", "warehouse", "inventory", "distribution",
      "shipping", "receiving", "procurement", "fleet management", "route optimization",
      "order fulfillment", "customs", "import", "export", "freight", "3pl", "4pl"
    ],
    security: [
      "security", "protection", "surveillance", "monitoring", "risk assessment", "threat analysis",
      "security protocols", "access control", "security clearance", "incident response",
      "security operations", "investigations", "physical security", "information security"
    ],
    project_management: [
      "project management", "program management", "agile", "scrum", "waterfall", "pmbok",
      "stakeholder management", "requirements gathering", "scope management", "schedule management",
      "risk management", "budget management", "resource allocation", "project planning"
    ],
    leadership: [
      "leadership", "management", "team building", "strategic planning", "vision", "mission",
      "organizational development", "change management", "performance management", "coaching",
      "mentoring", "conflict resolution", "decision making", "delegation", "motivation"
    ],
    operations: [
      "operations management", "process improvement", "workflow optimization", "resource allocation",
      "operational efficiency", "cost reduction", "quality management", "performance metrics",
      "kpis", "continuous improvement", "business process", "operational excellence"
    ]
  },
  
  // Common military skills and their civilian equivalents
  militaryToCivilianSkills: {
    "squad leader": ["team leader", "supervisor", "manager"],
    "platoon sergeant": ["operations manager", "department manager", "team lead"],
    "company commander": ["director", "senior manager", "executive"],
    "operations officer": ["operations manager", "project manager", "program director"],
    "logistics specialist": ["supply chain manager", "logistics coordinator", "inventory manager"],
    "intelligence analyst": ["data analyst", "research analyst", "business intelligence"],
    "communications specialist": ["communications coordinator", "it specialist", "network technician"],
    "medic": ["healthcare specialist", "emergency medical technician", "medical assistant"],
    "military police": ["security specialist", "law enforcement", "security manager"],
    "combat engineer": ["civil engineer", "construction manager", "project engineer"],
    "maintenance technician": ["maintenance manager", "equipment technician", "facilities manager"],
    "drill instructor": ["trainer", "instructor", "learning and development specialist"],
    "reconnaissance": ["research", "analysis", "strategic planning"],
    "weapons specialist": ["technical specialist", "systems expert", "equipment manager"],
    "field artillery": ["operations specialist", "technical coordinator", "systems analyst"]
  },
  
  // Common ATS format issues
  formatIssues: {
    tables: "Tables are often not properly parsed by ATS systems. Convert to bullet points or plain text.",
    graphics: "Graphics, images, and charts are typically ignored by ATS systems and may cause parsing errors.",
    headers_footers: "Information in headers and footers may be missed by ATS systems.",
    columns: "Multiple column layouts can confuse ATS systems. Use a single column format.",
    text_boxes: "Text boxes may not be properly read by ATS systems.",
    fancy_fonts: "Unusual or decorative fonts may not be properly recognized. Stick to standard fonts.",
    special_characters: "Special characters and symbols may cause parsing errors.",
    pdfs: "Some ATS systems struggle with PDFs. Consider having a .docx version available.",
    hyperlinks: "Some ATS systems may not properly handle hyperlinks or may strip them out."
  },
  
  // Common content issues
  contentIssues: {
    passive_voice: "Passive voice makes achievements sound less impactful. Use active voice instead.",
    vague_statements: "Vague statements don't demonstrate specific skills or achievements.",
    lack_of_metrics: "Quantifiable achievements are more impactful than general statements.",
    missing_keywords: "Missing industry-specific keywords can cause your resume to be filtered out.",
    irrelevant_information: "Irrelevant information dilutes the impact of your relevant experience.",
    inconsistent_tense: "Inconsistent verb tense can make your resume appear unprofessional.",
    too_much_jargon: "Excessive military jargon may not be understood by civilian recruiters.",
    acronyms: "Unexplained acronyms may not be understood by ATS systems or recruiters.",
    generic_skills: "Generic skills without context don't demonstrate your unique value."
  },
  
  // Improvement suggestions templates
  improvementSuggestions: {
    keywords: [
      "Add more industry-specific keywords related to {missing_keywords}.",
      "Include keywords from the job description such as {missing_keywords}.",
      "Strengthen your keyword presence by adding {missing_keywords} to your skills section."
    ],
    format: [
      "Convert the {format_issue} to a more ATS-friendly format.",
      "Remove {format_issue} as they may cause parsing errors in ATS systems.",
      "Simplify the formatting by eliminating {format_issue}."
    ],
    content: [
      "Replace passive voice phrases like '{passive_example}' with active voice.",
      "Add specific metrics to quantify your achievement in '{vague_statement}'.",
      "Translate military terminology '{military_term}' to civilian equivalent '{civilian_term}'."
    ],
    organization: [
      "Consider reorganizing your sections to prioritize {priority_section}.",
      "Add a dedicated {missing_section} section to highlight relevant experience.",
      "Consolidate similar information from {section1} and {section2} for clarity."
    ]
  },
  
  // Sample job descriptions by industry
  sampleJobDescriptions: {
    technology: `
      Senior Software Engineer
      
      Job Description:
      We are seeking an experienced Senior Software Engineer to join our development team. The ideal candidate will have a strong background in software development, with expertise in Java, Python, and cloud technologies.
      
      Responsibilities:
      - Design, develop, and maintain high-quality software solutions
      - Collaborate with cross-functional teams to define, design, and ship new features
      - Write clean, maintainable code with appropriate documentation
      - Participate in code reviews and mentor junior developers
      - Troubleshoot and resolve complex technical issues
      
      Requirements:
      - Bachelor's degree in Computer Science or related field
      - 5+ years of experience in software development
      - Proficiency in Java, Python, and JavaScript
      - Experience with cloud platforms (AWS, Azure, or GCP)
      - Knowledge of microservices architecture and RESTful APIs
      - Experience with agile development methodologies
      - Strong problem-solving skills and attention to detail
      - Excellent communication and teamwork abilities
    `,
    
    project_management: `
      Project Manager
      
      Job Description:
      We are looking for a skilled Project Manager to oversee and coordinate projects from initiation to completion. The successful candidate will ensure that all projects are delivered on time, within scope, and within budget.
      
      Responsibilities:
      - Develop project plans, including timelines, milestones, and resource allocation
      - Coordinate internal resources and third parties/vendors for the execution of projects
      - Manage changes to project scope, schedule, and costs using appropriate verification techniques
      - Measure project performance using appropriate tools and techniques
      - Create and maintain comprehensive project documentation
      
      Requirements:
      - Bachelor's degree in Business Administration or related field
      - PMP certification preferred
      - 3+ years of project management experience
      - Strong knowledge of project management methodologies (Agile, Scrum, Waterfall)
      - Experience with project management software (MS Project, JIRA, etc.)
      - Excellent communication and leadership skills
      - Strong organizational and time management abilities
      - Problem-solving and decision-making capabilities
    `,
    
    security: `
      Security Operations Manager
      
      Job Description:
      We are seeking a Security Operations Manager to oversee our security programs and ensure the protection of our personnel, facilities, and assets. The ideal candidate will have a strong background in security operations and risk management.
      
      Responsibilities:
      - Develop and implement security policies, procedures, and protocols
      - Manage security personnel and coordinate security operations
      - Conduct risk assessments and implement appropriate security measures
      - Investigate security incidents and prepare detailed reports
      - Maintain relationships with law enforcement and emergency services
      
      Requirements:
      - Bachelor's degree in Criminal Justice, Security Management, or related field
      - 5+ years of experience in security operations or law enforcement
      - Knowledge of security systems, access control, and surveillance technologies
      - Experience with emergency response planning and crisis management
      - Strong leadership and team management skills
      - Excellent communication and reporting abilities
      - Ability to make quick decisions in high-pressure situations
    `,
    
    logistics: `
      Supply Chain Manager
      
      Job Description:
      We are looking for an experienced Supply Chain Manager to optimize our supply chain operations and ensure efficient delivery of products to our customers. The successful candidate will oversee all supply chain activities and implement strategies to improve performance.
      
      Responsibilities:
      - Develop and implement supply chain strategies to maximize efficiency and minimize costs
      - Manage inventory levels and warehouse operations
      - Coordinate with suppliers, manufacturers, and transportation providers
      - Monitor and analyze supply chain performance metrics
      - Identify and implement process improvements
      
      Requirements:
      - Bachelor's degree in Supply Chain Management, Business, or related field
      - 5+ years of experience in supply chain management or logistics
      - Knowledge of supply chain management software and ERP systems
      - Experience with inventory management and warehouse operations
      - Strong analytical and problem-solving skills
      - Excellent negotiation and relationship management abilities
      - Certification in supply chain management (CSCP, CPIM) preferred
    `
  },
  
  // ATS scoring criteria
  scoringCriteria: {
    keyword_match: {
      weight: 0.35,
      description: "Percentage of job description keywords found in resume"
    },
    format_compatibility: {
      weight: 0.25,
      description: "How well the resume format works with ATS systems"
    },
    content_quality: {
      weight: 0.25,
      description: "Quality of content including active voice, metrics, and specificity"
    },
    section_organization: {
      weight: 0.15,
      description: "How well the resume sections are organized for ATS scanning"
    }
  },
  
  // Common ATS-friendly section headings
  atsFriendlySections: [
    "Professional Summary",
    "Summary",
    "Experience",
    "Work Experience",
    "Employment History",
    "Skills",
    "Technical Skills",
    "Core Competencies",
    "Education",
    "Certifications",
    "Professional Development",
    "Awards",
    "Achievements",
    "Publications",
    "References"
  ],
  
  // Sample resume parsing results
  sampleParsingResults: {
    sections_found: ["summary", "experience", "skills", "education"],
    section_headings: {
      summary: "Professional Summary",
      experience: "Military Experience",
      skills: "Skills & Qualifications",
      education: "Education & Training"
    },
    format_issues: [
      "tables",
      "special_characters"
    ],
    content_issues: [
      "passive_voice",
      "military_jargon",
      "lack_of_metrics"
    ]
  }
};

export default atsData;
