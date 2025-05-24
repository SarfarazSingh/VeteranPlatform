// ATS Scanner JavaScript
import atsData from './ats_data.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let resumeFile = null;
    let resumeText = ""; // In a real implementation, this would be extracted from the uploaded file
    let jobDescription = "";
    let selectedIndustry = "";
    let scanResults = {
        overallScore: 0,
        keywordScore: 0,
        formatScore: 0,
        contentScore: 0,
        sectionScore: 0,
        keywordsFound: [],
        keywordsMissing: [],
        formatStrengths: [],
        formatIssues: [],
        sectionsDetected: [],
        sectionsMissing: [],
        contentStrengths: [],
        contentIssues: [],
        militaryTerms: [],
        improvements: {
            keywords: [],
            format: [],
            content: [],
            sections: []
        }
    };

    // DOM Elements
    const uploadArea = document.getElementById('uploadArea');
    const resumeUpload = document.getElementById('resumeUpload');
    const browseButton = document.getElementById('browseButton');
    const uploadedFile = document.getElementById('uploadedFile');
    const fileName = document.getElementById('fileName');
    const removeFile = document.getElementById('removeFile');
    const jobDescriptionInput = document.getElementById('jobDescription');
    const jobTitleInput = document.getElementById('jobTitleInput');
    const industrySelect = document.getElementById('industrySelect');
    const sampleJobsDropdown = document.getElementById('sampleJobsDropdown');
    const scanButton = document.getElementById('scanButton');
    const resultsContainer = document.getElementById('resultsContainer');
    const scanningProgress = document.getElementById('scanningProgress');
    const scanResults = document.getElementById('scanResults');
    const scanProgressBar = document.getElementById('scanProgressBar');
    const scanStatusText = document.getElementById('scanStatusText');
    const resumeGeneratorLink = document.getElementById('resumeGeneratorLink');
    const downloadReportBtn = document.getElementById('downloadReportBtn');

    // Event Listeners
    
    // File Upload Handling
    uploadArea.addEventListener('click', function() {
        resumeUpload.click();
    });

    browseButton.addEventListener('click', function(e) {
        e.stopPropagation();
        resumeUpload.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    resumeUpload.addEventListener('change', function() {
        if (this.files.length) {
            handleFileUpload(this.files[0]);
        }
    });

    removeFile.addEventListener('click', function(e) {
        e.stopPropagation();
        resetFileUpload();
    });

    // Sample Job Description Handling
    sampleJobsDropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const industry = this.getAttribute('data-industry');
            const jobTitle = this.textContent.trim();
            
            jobTitleInput.value = jobTitle;
            jobDescriptionInput.value = atsData.sampleJobDescriptions[industry];
            industrySelect.value = industry;
        });
    });

    // Scan Button
    scanButton.addEventListener('click', function() {
        if (!validateInputs()) {
            return;
        }
        
        // Get inputs
        jobDescription = jobDescriptionInput.value;
        selectedIndustry = industrySelect.value;
        
        // Show results container and scanning progress
        resultsContainer.classList.remove('d-none');
        scanningProgress.classList.remove('d-none');
        scanResults.classList.add('d-none');
        
        // Simulate scanning process
        simulateScanningProcess();
    });

    // Download Report Button
    downloadReportBtn.addEventListener('click', function() {
        generatePDFReport();
    });

    // Resume Generator Link
    resumeGeneratorLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../resume_generator/index.html';
    });

    // Functions
    
    // Handle File Upload
    function handleFileUpload(file) {
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (!validTypes.includes(file.type)) {
            alert('Please upload a PDF or DOCX file.');
            return;
        }
        
        resumeFile = file;
        fileName.textContent = file.name;
        uploadedFile.classList.remove('d-none');
        
        // In a real implementation, we would extract text from the file here
        // For demo purposes, we'll simulate having resume text
        simulateResumeTextExtraction(file);
    }

    // Reset File Upload
    function resetFileUpload() {
        resumeFile = null;
        resumeText = "";
        resumeUpload.value = '';
        uploadedFile.classList.add('d-none');
    }

    // Validate Inputs
    function validateInputs() {
        if (!resumeFile) {
            alert('Please upload your resume.');
            return false;
        }
        
        if (!jobDescriptionInput.value.trim()) {
            alert('Please enter a job description.');
            return false;
        }
        
        return true;
    }

    // Simulate Resume Text Extraction
    function simulateResumeTextExtraction(file) {
        // In a real implementation, we would use PDF.js or similar to extract text
        // For demo purposes, we'll use a sample resume text based on file type
        
        if (file.type === 'application/pdf') {
            resumeText = `
                John Doe
                123 Main St, Anytown, USA
                john.doe@email.com | (555) 123-4567
                
                PROFESSIONAL SUMMARY
                Dedicated and detail-oriented military veteran with 8 years of experience in logistics and supply chain management. Proven track record of improving operational efficiency and implementing cost-saving measures. Seeking to leverage my leadership skills and technical expertise in a civilian logistics role.
                
                MILITARY EXPERIENCE
                Logistics Specialist, U.S. Army
                2012 - 2020
                • Managed inventory of over 5,000 items valued at $10M with 99.8% accuracy
                • Supervised a team of 12 personnel in daily logistics operations
                • Implemented new tracking system that reduced processing time by 35%
                • Coordinated transportation of critical supplies across multiple locations
                • Received commendation for exceptional performance during deployment
                
                EDUCATION
                Bachelor of Science in Business Administration
                American Military University, 2018
                
                MILITARY TRAINING
                • Advanced Logistics Operations Course, 2016
                • Leadership Development Program, 2015
                • Supply Chain Management Certification, 2014
                
                SKILLS
                • Inventory Management
                • Team Leadership
                • Process Improvement
                • Supply Chain Operations
                • Microsoft Office Suite
                • SAP Logistics Module
                
                ACHIEVEMENTS
                • Awarded Soldier of the Quarter for exceptional performance
                • Reduced operational costs by 22% through process improvements
                • Maintained zero safety incidents during 3-year tenure as team leader
            `;
        } else {
            resumeText = `
                Jane Smith
                456 Oak Ave, Somewhere, USA
                jane.smith@email.com | (555) 987-6543
                
                SUMMARY
                Combat-tested Marine Corps veteran with 10 years of experience in security operations and team leadership. Expert in risk assessment, emergency response, and personnel management. Seeking to transition my military security expertise to a civilian security management role.
                
                EXPERIENCE
                Squad Leader, U.S. Marine Corps
                2010 - 2020
                • Led squad of 13 Marines during multiple deployments
                • Conducted security assessments and implemented protection measures
                • Trained team members on security protocols and emergency procedures
                • Maintained 100% accountability of sensitive equipment worth $2M
                • Served as liaison between unit and battalion command
                
                EDUCATION & TRAINING
                Associate Degree in Criminal Justice
                Community College of the Marine Corps, 2016
                
                Military Training:
                • Advanced Security Operations, 2018
                • Tactical Leadership Course, 2015
                • Emergency Response Planning, 2013
                
                TECHNICAL SKILLS
                • Security Systems
                • Threat Assessment
                • Emergency Response
                • Personnel Management
                • Report Writing
                • Surveillance Equipment
                
                SOFT SKILLS
                • Leadership
                • Communication
                • Problem Solving
                • Adaptability
                • Attention to Detail
                • Teamwork
            `;
        }
    }

    // Simulate Scanning Process
    function simulateScanningProcess() {
        let progress = 0;
        const interval = setInterval(function() {
            progress += 5;
            scanProgressBar.style.width = progress + '%';
            
            // Update status text based on progress
            if (progress < 20) {
                scanStatusText.textContent = "Extracting resume content...";
            } else if (progress < 40) {
                scanStatusText.textContent = "Analyzing job description...";
            } else if (progress < 60) {
                scanStatusText.textContent = "Matching keywords...";
            } else if (progress < 80) {
                scanStatusText.textContent = "Evaluating format compatibility...";
            } else {
                scanStatusText.textContent = "Generating recommendations...";
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(function() {
                    scanningProgress.classList.add('d-none');
                    scanResults.classList.remove('d-none');
                    performAnalysis();
                }, 500);
            }
        }, 100);
    }

    // Perform Analysis
    function performAnalysis() {
        // In a real implementation, this would analyze the actual resume text against the job description
        // For demo purposes, we'll simulate the analysis with realistic results
        
        // Reset results
        scanResults = {
            overallScore: 0,
            keywordScore: 0,
            formatScore: 0,
            contentScore: 0,
            sectionScore: 0,
            keywordsFound: [],
            keywordsMissing: [],
            formatStrengths: [],
            formatIssues: [],
            sectionsDetected: [],
            sectionsMissing: [],
            contentStrengths: [],
            contentIssues: [],
            militaryTerms: [],
            improvements: {
                keywords: [],
                format: [],
                content: [],
                sections: []
            }
        };
        
        // Analyze keywords
        analyzeKeywords();
        
        // Analyze format
        analyzeFormat();
        
        // Analyze content
        analyzeContent();
        
        // Analyze sections
        analyzeSections();
        
        // Calculate overall score
        calculateOverallScore();
        
        // Generate improvement suggestions
        generateImprovementSuggestions();
        
        // Update UI with results
        updateResultsUI();
    }

    // Analyze Keywords
    function analyzeKeywords() {
        // Get industry keywords
        let industryKeywords = [];
        if (selectedIndustry && atsData.industryKeywords[selectedIndustry]) {
            industryKeywords = atsData.industryKeywords[selectedIndustry];
        } else {
            // If no industry selected, use a mix of keywords from different industries
            const industries = Object.keys(atsData.industryKeywords);
            for (let i = 0; i < 3; i++) {
                const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
                industryKeywords = industryKeywords.concat(atsData.industryKeywords[randomIndustry].slice(0, 5));
            }
        }
        
        // Extract keywords from job description
        const jobKeywords = extractKeywordsFromJobDescription(jobDescription);
        
        // Combine and deduplicate keywords
        const allKeywords = [...new Set([...industryKeywords, ...jobKeywords])];
        
        // Check which keywords are in the resume
        const resumeTextLower = resumeText.toLowerCase();
        
        for (const keyword of allKeywords) {
            if (resumeTextLower.includes(keyword.toLowerCase())) {
                scanResults.keywordsFound.push(keyword);
            } else {
                scanResults.keywordsMissing.push(keyword);
            }
        }
        
        // Calculate keyword score (0-100)
        const totalKeywords = scanResults.keywordsFound.length + scanResults.keywordsMissing.length;
        scanResults.keywordScore = Math.round((scanResults.keywordsFound.length / totalKeywords) * 100);
    }

    // Extract Keywords from Job Description
    function extractKeywordsFromJobDescription(jobDesc) {
        // In a real implementation, this would use NLP to extract important keywords
        // For demo purposes, we'll use a simple approach
        
        const commonWords = ['and', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with', 'of', 'by', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could'];
        
        // Split job description into words
        const words = jobDesc.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Count word frequency
        const wordCounts = {};
        for (const word of words) {
            if (word.length > 3 && !commonWords.includes(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        }
        
        // Extract phrases (2-3 words)
        const phrases = [];
        const jobDescLower = jobDesc.toLowerCase();
        
        // Check for common job-related phrases
        const commonPhrases = [
            'project management', 'team leadership', 'problem solving', 'decision making',
            'communication skills', 'attention to detail', 'time management', 'critical thinking',
            'customer service', 'quality assurance', 'process improvement', 'strategic planning',
            'risk management', 'budget management', 'performance management', 'change management',
            'resource allocation', 'stakeholder management', 'conflict resolution', 'data analysis',
            'technical support', 'system administration', 'network security', 'database management',
            'software development', 'web development', 'mobile development', 'cloud computing',
            'artificial intelligence', 'machine learning', 'business intelligence', 'data visualization',
            'supply chain', 'inventory management', 'logistics coordination', 'warehouse management',
            'financial analysis', 'budget planning', 'cost reduction', 'revenue growth',
            'market research', 'competitive analysis', 'customer acquisition', 'brand management',
            'content creation', 'social media', 'digital marketing', 'email marketing',
            'human resources', 'talent acquisition', 'employee training', 'performance evaluation'
        ];
        
        for (const phrase of commonPhrases) {
            if (jobDescLower.includes(phrase)) {
                phrases.push(phrase);
            }
        }
        
        // Sort words by frequency and get top 15
        const topWords = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15)
            .map(entry => entry[0]);
        
        // Combine top words and phrases, remove duplicates
        return [...new Set([...topWords, ...phrases])];
    }

    // Analyze Format
    function analyzeFormat() {
        // In a real implementation, this would analyze the actual resume format
        // For demo purposes, we'll simulate format analysis
        
        // Simulate format strengths
        scanResults.formatStrengths = [
            'Standard section headings used',
            'Single column layout',
            'Consistent formatting',
            'Appropriate use of bullet points',
            'Clean, readable font'
        ];
        
        // Simulate format issues (randomly select 1-3 issues)
        const possibleIssues = Object.keys(atsData.formatIssues);
        const numIssues = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < numIssues; i++) {
            const randomIssue = possibleIssues[Math.floor(Math.random() * possibleIssues.length)];
            if (!scanResults.formatIssues.includes(randomIssue)) {
                scanResults.formatIssues.push(randomIssue);
            }
        }
        
        // Calculate format score (0-100)
        const totalFormatPoints = scanResults.formatStrengths.length + scanResults.formatIssues.length;
        scanResults.formatScore = Math.round((scanResults.formatStrengths.length / totalFormatPoints) * 100);
    }

    // Analyze Content
    function analyzeContent() {
        // In a real implementation, this would analyze the actual resume content
        // For demo purposes, we'll simulate content analysis
        
        // Simulate content strengths
        scanResults.contentStrengths = [
            'Quantifiable achievements included',
            'Strong action verbs used',
            'Relevant skills highlighted',
            'Appropriate level of detail',
            'Clear and concise language'
        ];
        
        // Simulate content issues (randomly select 1-3 issues)
        const possibleIssues = Object.keys(atsData.contentIssues);
        const numIssues = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < numIssues; i++) {
            const randomIssue = possibleIssues[Math.floor(Math.random() * possibleIssues.length)];
            if (!scanResults.contentIssues.includes(randomIssue)) {
                scanResults.contentIssues.push(randomIssue);
            }
        }
        
        // Identify military terms that need civilian translation
        const resumeTextLower = resumeText.toLowerCase();
        const militaryTerms = Object.keys(atsData.militaryToCivilianSkills);
        
        for (const term of militaryTerms) {
            if (resumeTextLower.includes(term.toLowerCase())) {
                scanResults.militaryTerms.push({
                    military: term,
                    civilian: atsData.militaryToCivilianSkills[term][0]
                });
            }
        }
        
        // Calculate content score (0-100)
        const totalContentPoints = scanResults.contentStrengths.length + scanResults.contentIssues.length;
        scanResults.contentScore = Math.round((scanResults.contentStrengths.length / totalContentPoints) * 100);
    }

    // Analyze Sections
    function analyzeSections() {
        // In a real implementation, this would analyze the actual resume sections
        // For demo purposes, we'll simulate section analysis
        
        // Simulate detected sections
        scanResults.sectionsDetected = [
            'Professional Summary',
            'Experience',
            'Education',
            'Skills',
            'Achievements'
        ];
        
        // Determine missing recommended sections
        const recommendedSections = [
            'Professional Summary',
            'Experience',
            'Education',
            'Skills',
            'Certifications',
            'Achievements',
            'Technical Skills'
        ];
        
        for (const section of recommendedSections) {
            if (!scanResults.sectionsDetected.includes(section)) {
                scanResults.sectionsMissing.push(section);
            }
        }
        
        // Calculate section score (0-100)
        const totalSections = recommendedSections.length;
        scanResults.sectionScore = Math.round((scanResults.sectionsDetected.length / totalSections) * 100);
    }

    // Calculate Overall Score
    function calculateOverallScore() {
        // Use weighted average of individual scores
        const weights = atsData.scoringCriteria;
        
        scanResults.overallScore = Math.round(
            (scanResults.keywordScore * weights.keyword_match.weight) +
            (scanResults.formatScore * weights.format_compatibility.weight) +
            (scanResults.contentScore * weights.content_quality.weight) +
            (scanResults.sectionScore * weights.section_organization.weight)
        );
    }

    // Generate Improvement Suggestions
    function generateImprovementSuggestions() {
        // Keyword improvements
        if (scanResults.keywordsMissing.length > 0) {
            // Group missing keywords into batches of 3-5
            const keywordBatches = [];
            for (let i = 0; i < scanResults.keywordsMissing.length; i += 4) {
                keywordBatches.push(scanResults.keywordsMissing.slice(i, i + 4).join(', '));
            }
            
            // Generate suggestions for each batch
            for (const batch of keywordBatches) {
                const suggestionTemplates = atsData.improvementSuggestions.keywords;
                const randomTemplate = suggestionTemplates[Math.floor(Math.random() * suggestionTemplates.length)];
                
                scanResults.improvements.keywords.push(randomTemplate.replace('{missing_keywords}', batch));
            }
        }
        
        // Format improvements
        for (const issue of scanResults.formatIssues) {
            const suggestionTemplates = atsData.improvementSuggestions.format;
            const randomTemplate = suggestionTemplates[Math.floor(Math.random() * suggestionTemplates.length)];
            
            scanResults.improvements.format.push(randomTemplate.replace('{format_issue}', issue));
        }
        
        // Content improvements
        for (const issue of scanResults.contentIssues) {
            const suggestionTemplates = atsData.improvementSuggestions.content;
            let suggestion = "";
            
            switch (issue) {
                case 'passive_voice':
                    suggestion = "Replace passive voice phrases with active voice. For example, change 'Responsibilities were managed' to 'Managed responsibilities'.";
                    break;
                case 'vague_statements':
                    suggestion = "Add specific details to vague statements. For example, change 'Improved efficiency' to 'Improved efficiency by 30% through process automation'.";
                    break;
                case 'lack_of_metrics':
                    suggestion = "Add quantifiable metrics to your achievements. For example, include numbers, percentages, dollar amounts, or time frames.";
                    break;
                case 'missing_keywords':
                    suggestion = "Incorporate more industry-specific keywords throughout your resume, especially in your skills section and job descriptions.";
                    break;
                case 'too_much_jargon':
                    suggestion = "Replace military jargon with civilian equivalents that hiring managers will understand.";
                    break;
                default:
                    suggestion = atsData.contentIssues[issue];
            }
            
            scanResults.improvements.content.push(suggestion);
        }
        
        // Section improvements
        for (const section of scanResults.sectionsMissing) {
            scanResults.improvements.sections.push(`Add a dedicated "${section}" section to highlight relevant experience and skills.`);
        }
    }

    // Update Results UI
    function updateResultsUI() {
        // Update overall score
        document.getElementById('overallScoreDisplay').textContent = scanResults.overallScore;
        document.getElementById('scoreGaugeFill').style.background = `conic-gradient(#0d6efd 0%, #0d6efd ${scanResults.overallScore}%, #e9ecef ${scanResults.overallScore}%)`;
        
        // Update score rating text
        const scoreRatingText = document.getElementById('scoreRatingText');
        if (scanResults.overallScore >= 80) {
            scoreRatingText.textContent = 'Your Resume is ATS-Friendly';
            scoreRatingText.className = 'mb-3 text-success';
        } else if (scanResults.overallScore >= 60) {
            scoreRatingText.textContent = 'Your Resume Needs Minor Improvements';
            scoreRatingText.className = 'mb-3 text-warning';
        } else {
            scoreRatingText.textContent = 'Your Resume Needs Significant Improvements';
            scoreRatingText.className = 'mb-3 text-danger';
        }
        
        // Update score breakdown
        document.getElementById('keywordScore').textContent = `${scanResults.keywordScore}/100`;
        document.getElementById('keywordScoreBar').style.width = `${scanResults.keywordScore}%`;
        
        document.getElementById('formatScore').textContent = `${scanResults.formatScore}/100`;
        document.getElementById('formatScoreBar').style.width = `${scanResults.formatScore}%`;
        
        document.getElementById('contentScore').textContent = `${scanResults.contentScore}/100`;
        document.getElementById('contentScoreBar').style.width = `${scanResults.contentScore}%`;
        
        document.getElementById('sectionScore').textContent = `${scanResults.sectionScore}/100`;
        document.getElementById('sectionScoreBar').style.width = `${scanResults.sectionScore}%`;
        
        // Update keyword analysis
        updateKeywordAnalysis();
        
        // Update format analysis
        updateFormatAnalysis();
        
        // Update content analysis
        updateContentAnalysis();
        
        // Update improvement suggestions
        updateImprovementSuggestions();
    }

    // Update Keyword Analysis
    function updateKeywordAnalysis() {
        const foundKeywordsList = document.getElementById('foundKeywordsList');
        const missingKeywordsList = document.getElementById('missingKeywordsList');
        const keywordMatchRate = document.getElementById('keywordMatchRate');
        const keywordMatchBar = document.getElementById('keywordMatchBar');
        
        // Clear previous content
        foundKeywordsList.innerHTML = '';
        missingKeywordsList.innerHTML = '';
        
        // Update match rate
        const matchRate = scanResults.keywordScore;
        keywordMatchRate.textContent = `${matchRate}%`;
        keywordMatchBar.style.width = `${matchRate}%`;
        
        // Update found keywords
        for (const keyword of scanResults.keywordsFound) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${keyword}
                <span class="badge bg-success rounded-pill">
                    <i class="bi bi-check"></i>
                </span>
            `;
            foundKeywordsList.appendChild(li);
        }
        
        // Update missing keywords
        for (const keyword of scanResults.keywordsMissing) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${keyword}
                <span class="badge bg-danger rounded-pill">
                    <i class="bi bi-x"></i>
                </span>
            `;
            missingKeywordsList.appendChild(li);
        }
    }

    // Update Format Analysis
    function updateFormatAnalysis() {
        const formatStrengthsList = document.getElementById('formatStrengthsList');
        const formatIssuesList = document.getElementById('formatIssuesList');
        const formatCompatibilityRate = document.getElementById('formatCompatibilityRate');
        const formatCompatibilityBar = document.getElementById('formatCompatibilityBar');
        const detectedSections = document.getElementById('detectedSections');
        const missingSections = document.getElementById('missingSections');
        
        // Clear previous content
        formatStrengthsList.innerHTML = '';
        formatIssuesList.innerHTML = '';
        detectedSections.innerHTML = '';
        missingSections.innerHTML = '<h6>Recommended Additional Sections:</h6>';
        
        // Update compatibility rate
        const compatibilityRate = scanResults.formatScore;
        formatCompatibilityRate.textContent = `${compatibilityRate}%`;
        formatCompatibilityBar.style.width = `${compatibilityRate}%`;
        
        // Update format strengths
        for (const strength of scanResults.formatStrengths) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                ${strength}
            `;
            formatStrengthsList.appendChild(li);
        }
        
        // Update format issues
        for (const issue of scanResults.formatIssues) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                <strong>${issue}:</strong> ${atsData.formatIssues[issue]}
            `;
            formatIssuesList.appendChild(li);
        }
        
        // Update detected sections
        for (const section of scanResults.sectionsDetected) {
            const badge = document.createElement('span');
            badge.className = 'badge bg-primary section-badge';
            badge.textContent = section;
            detectedSections.appendChild(badge);
        }
        
        // Update missing sections
        if (scanResults.sectionsMissing.length === 0) {
            const p = document.createElement('p');
            p.className = 'text-success';
            p.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>All recommended sections are present.';
            missingSections.appendChild(p);
        } else {
            for (const section of scanResults.sectionsMissing) {
                const badge = document.createElement('span');
                badge.className = 'badge bg-secondary section-badge';
                badge.textContent = section;
                missingSections.appendChild(badge);
            }
        }
    }

    // Update Content Analysis
    function updateContentAnalysis() {
        const contentAnalysisTable = document.getElementById('contentAnalysisTable');
        const militaryTranslationTable = document.getElementById('militaryTranslationTable');
        const contentQualityRate = document.getElementById('contentQualityRate');
        const contentQualityBar = document.getElementById('contentQualityBar');
        
        // Clear previous content
        contentAnalysisTable.innerHTML = '';
        militaryTranslationTable.innerHTML = '';
        
        // Update quality rate
        const qualityRate = scanResults.contentScore;
        contentQualityRate.textContent = `${qualityRate}%`;
        contentQualityBar.style.width = `${qualityRate}%`;
        
        // Update content strengths
        for (const strength of scanResults.contentStrengths) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${strength}</td>
                <td><i class="bi bi-check-circle-fill content-status-icon status-good"></i></td>
                <td>Good practice detected in your resume</td>
            `;
            contentAnalysisTable.appendChild(tr);
        }
        
        // Update content issues
        for (const issue of scanResults.contentIssues) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${issue.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                <td><i class="bi bi-exclamation-triangle-fill content-status-icon status-bad"></i></td>
                <td>${atsData.contentIssues[issue]}</td>
            `;
            contentAnalysisTable.appendChild(tr);
        }
        
        // Update military translations
        if (scanResults.militaryTerms.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td colspan="2" class="text-center">No military terms requiring translation were detected.</td>
            `;
            militaryTranslationTable.appendChild(tr);
        } else {
            for (const term of scanResults.militaryTerms) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${term.military}</td>
                    <td>${term.civilian}</td>
                `;
                militaryTranslationTable.appendChild(tr);
            }
        }
    }

    // Update Improvement Suggestions
    function updateImprovementSuggestions() {
        const keywordImprovementsList = document.getElementById('keywordImprovementsList');
        const formatImprovementsList = document.getElementById('formatImprovementsList');
        const contentImprovementsList = document.getElementById('contentImprovementsList');
        const sectionImprovementsList = document.getElementById('sectionImprovementsList');
        
        // Clear previous content
        keywordImprovementsList.innerHTML = '';
        formatImprovementsList.innerHTML = '';
        contentImprovementsList.innerHTML = '';
        sectionImprovementsList.innerHTML = '';
        
        // Update keyword improvements
        if (scanResults.improvements.keywords.length === 0) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = 'No keyword improvements needed.';
            keywordImprovementsList.appendChild(li);
        } else {
            for (const improvement of scanResults.improvements.keywords) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <div class="improvement-item">
                        <h6>Add Missing Keywords</h6>
                        <p>${improvement}</p>
                    </div>
                `;
                keywordImprovementsList.appendChild(li);
            }
        }
        
        // Update format improvements
        if (scanResults.improvements.format.length === 0) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = 'No format improvements needed.';
            formatImprovementsList.appendChild(li);
        } else {
            for (const improvement of scanResults.improvements.format) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <div class="improvement-item">
                        <h6>Improve Format Compatibility</h6>
                        <p>${improvement}</p>
                    </div>
                `;
                formatImprovementsList.appendChild(li);
            }
        }
        
        // Update content improvements
        if (scanResults.improvements.content.length === 0) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = 'No content improvements needed.';
            contentImprovementsList.appendChild(li);
        } else {
            for (const improvement of scanResults.improvements.content) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <div class="improvement-item">
                        <h6>Enhance Content Quality</h6>
                        <p>${improvement}</p>
                    </div>
                `;
                contentImprovementsList.appendChild(li);
            }
        }
        
        // Update section improvements
        if (scanResults.improvements.sections.length === 0) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = 'No section improvements needed.';
            sectionImprovementsList.appendChild(li);
        } else {
            for (const improvement of scanResults.improvements.sections) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <div class="improvement-item">
                        <h6>Optimize Section Organization</h6>
                        <p>${improvement}</p>
                    </div>
                `;
                sectionImprovementsList.appendChild(li);
            }
        }
    }

    // Generate PDF Report
    function generatePDFReport() {
        const { jsPDF } = window.jspdf;
        
        // Create new PDF document
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Add title
        doc.setFontSize(20);
        doc.setTextColor(13, 110, 253); // Bootstrap primary color
        doc.text('ATS Compatibility Report', 105, 20, { align: 'center' });
        
        // Add date
        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125); // Bootstrap secondary color
        const today = new Date();
        doc.text(`Generated on ${today.toLocaleDateString()}`, 105, 27, { align: 'center' });
        
        // Add overall score
        doc.setFontSize(16);
        doc.setTextColor(33, 37, 41); // Bootstrap dark color
        doc.text('Overall ATS Compatibility Score', 20, 40);
        
        doc.setFontSize(24);
        doc.setTextColor(13, 110, 253); // Bootstrap primary color
        doc.text(`${scanResults.overallScore}%`, 20, 50);
        
        // Add score rating
        doc.setFontSize(14);
        if (scanResults.overallScore >= 80) {
            doc.setTextColor(25, 135, 84); // Bootstrap success color
            doc.text('Your Resume is ATS-Friendly', 60, 50);
        } else if (scanResults.overallScore >= 60) {
            doc.setTextColor(255, 193, 7); // Bootstrap warning color
            doc.text('Your Resume Needs Minor Improvements', 60, 50);
        } else {
            doc.setTextColor(220, 53, 69); // Bootstrap danger color
            doc.text('Your Resume Needs Significant Improvements', 60, 50);
        }
        
        // Add score breakdown
        doc.setFontSize(12);
        doc.setTextColor(33, 37, 41); // Bootstrap dark color
        doc.text('Score Breakdown:', 20, 60);
        
        doc.setFontSize(10);
        doc.text(`Keyword Match: ${scanResults.keywordScore}/100`, 25, 67);
        doc.text(`Format Compatibility: ${scanResults.formatScore}/100`, 25, 73);
        doc.text(`Content Quality: ${scanResults.contentScore}/100`, 25, 79);
        doc.text(`Section Organization: ${scanResults.sectionScore}/100`, 25, 85);
        
        // Add keyword analysis
        doc.setFontSize(14);
        doc.setTextColor(13, 110, 253); // Bootstrap primary color
        doc.text('Keyword Analysis', 20, 100);
        
        doc.setFontSize(10);
        doc.setTextColor(33, 37, 41); // Bootstrap dark color
        doc.text(`Found Keywords (${scanResults.keywordsFound.length}):`, 20, 107);
        
        let y = 113;
        for (let i = 0; i < Math.min(scanResults.keywordsFound.length, 5); i++) {
            doc.text(`• ${scanResults.keywordsFound[i]}`, 25, y);
            y += 5;
        }
        
        if (scanResults.keywordsFound.length > 5) {
            doc.text(`• ... and ${scanResults.keywordsFound.length - 5} more`, 25, y);
            y += 5;
        }
        
        y += 5;
        doc.text(`Missing Keywords (${scanResults.keywordsMissing.length}):`, 20, y);
        y += 6;
        
        for (let i = 0; i < Math.min(scanResults.keywordsMissing.length, 5); i++) {
            doc.text(`• ${scanResults.keywordsMissing[i]}`, 25, y);
            y += 5;
        }
        
        if (scanResults.keywordsMissing.length > 5) {
            doc.text(`• ... and ${scanResults.keywordsMissing.length - 5} more`, 25, y);
            y += 5;
        }
        
        // Add format analysis
        y += 10;
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(13, 110, 253); // Bootstrap primary color
        doc.text('Format Analysis', 20, y);
        y += 7;
        
        doc.setFontSize(10);
        doc.setTextColor(33, 37, 41); // Bootstrap dark color
        
        if (scanResults.formatIssues.length === 0) {
            doc.text('No format issues detected.', 20, y);
            y += 5;
        } else {
            doc.text('Format Issues:', 20, y);
            y += 6;
            
            for (const issue of scanResults.formatIssues) {
                const text = `• ${issue}: ${atsData.formatIssues[issue]}`;
                const textLines = doc.splitTextToSize(text, 170);
                doc.text(textLines, 25, y);
                y += 5 * textLines.length;
            }
        }
        
        // Add content analysis
        y += 10;
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(13, 110, 253); // Bootstrap primary color
        doc.text('Content Analysis', 20, y);
        y += 7;
        
        doc.setFontSize(10);
        doc.setTextColor(33, 37, 41); // Bootstrap dark color
        
        if (scanResults.contentIssues.length === 0) {
            doc.text('No content issues detected.', 20, y);
            y += 5;
        } else {
            doc.text('Content Issues:', 20, y);
            y += 6;
            
            for (const issue of scanResults.contentIssues) {
                const text = `• ${issue.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${atsData.contentIssues[issue]}`;
                const textLines = doc.splitTextToSize(text, 170);
                doc.text(textLines, 25, y);
                y += 5 * textLines.length;
            }
        }
        
        // Add military translations
        if (scanResults.militaryTerms.length > 0) {
            y += 5;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            doc.text('Military to Civilian Translations:', 20, y);
            y += 6;
            
            for (const term of scanResults.militaryTerms) {
                doc.text(`• "${term.military}" → "${term.civilian}"`, 25, y);
                y += 5;
            }
        }
        
        // Add improvement suggestions
        y += 10;
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(13, 110, 253); // Bootstrap primary color
        doc.text('Recommended Improvements', 20, y);
        y += 7;
        
        doc.setFontSize(10);
        doc.setTextColor(33, 37, 41); // Bootstrap dark color
        
        // Keyword improvements
        if (scanResults.improvements.keywords.length > 0) {
            doc.text('Keyword Improvements:', 20, y);
            y += 6;
            
            for (const improvement of scanResults.improvements.keywords) {
                const textLines = doc.splitTextToSize(`• ${improvement}`, 170);
                doc.text(textLines, 25, y);
                y += 5 * textLines.length;
            }
        }
        
        // Format improvements
        if (scanResults.improvements.format.length > 0) {
            y += 5;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            doc.text('Format Improvements:', 20, y);
            y += 6;
            
            for (const improvement of scanResults.improvements.format) {
                const textLines = doc.splitTextToSize(`• ${improvement}`, 170);
                doc.text(textLines, 25, y);
                y += 5 * textLines.length;
            }
        }
        
        // Content improvements
        if (scanResults.improvements.content.length > 0) {
            y += 5;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            doc.text('Content Improvements:', 20, y);
            y += 6;
            
            for (const improvement of scanResults.improvements.content) {
                const textLines = doc.splitTextToSize(`• ${improvement}`, 170);
                doc.text(textLines, 25, y);
                y += 5 * textLines.length;
            }
        }
        
        // Section improvements
        if (scanResults.improvements.sections.length > 0) {
            y += 5;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            doc.text('Section Improvements:', 20, y);
            y += 6;
            
            for (const improvement of scanResults.improvements.sections) {
                const textLines = doc.splitTextToSize(`• ${improvement}`, 170);
                doc.text(textLines, 25, y);
                y += 5 * textLines.length;
            }
        }
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(108, 117, 125); // Bootstrap secondary color
            doc.text(`Veteran Transition Platform - ATS Compatibility Report - Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
        }
        
        // Save the PDF
        doc.save('ATS_Compatibility_Report.pdf');
    }
});
