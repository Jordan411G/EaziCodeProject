/// Enhanced Quiz System with All 30 Questions and Auto-Advance
class QuizSystem {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.personalityTraits = {
            analytical: 0,
            creative: 0,
            social: 0,
            practical: 0,
            leadership: 0,
            technical: 0,
            organized: 0,
            adaptable: 0
        };
        this.init();
    }

    init() {
        this.loadQuestions();
        this.setupEventListeners();
        this.showQuestion(0);
    }

    loadQuestions() {
        // All 30 questions - 15 personality, 15 aptitude
        this.questions = [
            // Personality Questions (1-15)
            {
                id: 1,
                text: "When faced with a complex problem, I prefer to:",
                type: "personality",
                tooltip: "This measures your problem-solving approach and analytical thinking style",
                options: [
                    { text: "Break it down into smaller parts and analyze each one", traits: { analytical: 3, organized: 2 } },
                    { text: "Brainstorm creative solutions and think outside the box", traits: { creative: 3, adaptable: 1 } },
                    { text: "Discuss it with others and get different perspectives", traits: { social: 3, leadership: 1 } },
                    { text: "Find a practical, hands-on approach to solve it", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 2,
                text: "In a team project, I'm most comfortable:",
                type: "personality",
                tooltip: "Reveals your preferred team role and collaboration style",
                options: [
                    { text: "Analyzing data and researching information", traits: { analytical: 3, technical: 1 } },
                    { text: "Coming up with innovative ideas and designs", traits: { creative: 3, adaptable: 1 } },
                    { text: "Coordinating team members and facilitating discussions", traits: { social: 2, leadership: 3 } },
                    { text: "Building and implementing the actual solution", traits: { practical: 3, technical: 2 } }
                ]
            },
            {
                id: 3,
                text: "My ideal work environment would be:",
                type: "personality",
                tooltip: "Shows your preferred work atmosphere and conditions",
                options: [
                    { text: "A quiet space where I can focus deeply on complex tasks", traits: { analytical: 3, organized: 2 } },
                    { text: "A dynamic, creative space with freedom to experiment", traits: { creative: 3, adaptable: 2 } },
                    { text: "A collaborative office with lots of team interaction", traits: { social: 3, leadership: 1 } },
                    { text: "A hands-on setting where I can see tangible results", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 4,
                text: "I consider myself to be:",
                type: "personality",
                tooltip: "Assesses your self-perception and natural tendencies",
                options: [
                    { text: "Logical and systematic in my approach", traits: { analytical: 3, organized: 2 } },
                    { text: "Imaginative and innovative", traits: { creative: 3, adaptable: 1 } },
                    { text: "Empathetic and good with people", traits: { social: 3, leadership: 1 } },
                    { text: "Resourceful and good at practical tasks", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 5,
                text: "When making decisions, I usually:",
                type: "personality",
                tooltip: "Evaluates your decision-making process and preferences",
                options: [
                    { text: "Analyze all the data and consider logical consequences", traits: { analytical: 3, organized: 1 } },
                    { text: "Go with my intuition and creative instincts", traits: { creative: 3, adaptable: 2 } },
                    { text: "Consult with others and consider their opinions", traits: { social: 3, leadership: 1 } },
                    { text: "Consider what has worked well in practical situations", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 6,
                text: "In my free time, I typically:",
                type: "personality",
                tooltip: "Reveals your natural interests and leisure preferences",
                options: [
                    { text: "Read books or research topics that interest me", traits: { analytical: 3, organized: 1 } },
                    { text: "Engage in creative hobbies like art or writing", traits: { creative: 3, adaptable: 1 } },
                    { text: "Spend time with friends or participate in group activities", traits: { social: 3, leadership: 1 } },
                    { text: "Work on DIY projects or learn practical skills", traits: { practical: 3, technical: 2 } }
                ]
            },
            {
                id: 7,
                text: "When learning something new, I prefer:",
                type: "personality",
                tooltip: "Shows your learning style and knowledge acquisition preferences",
                options: [
                    { text: "Structured courses with clear objectives", traits: { analytical: 2, organized: 3 } },
                    { text: "Exploring freely and discovering through experimentation", traits: { creative: 3, adaptable: 2 } },
                    { text: "Learning in groups with discussion and collaboration", traits: { social: 3, leadership: 1 } },
                    { text: "Hands-on practice and real-world applications", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 8,
                text: "I'm most motivated by:",
                type: "personality",
                tooltip: "Identifies your primary sources of motivation and drive",
                options: [
                    { text: "Solving complex puzzles and intellectual challenges", traits: { analytical: 3, technical: 1 } },
                    { text: "Expressing myself creatively and making things beautiful", traits: { creative: 3, adaptable: 1 } },
                    { text: "Helping others and making a positive impact", traits: { social: 3, leadership: 1 } },
                    { text: "Achieving tangible results and practical outcomes", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 9,
                text: "When working on a project, I tend to:",
                type: "personality",
                tooltip: "Reveals your project management and work style",
                options: [
                    { text: "Plan everything carefully before starting", traits: { analytical: 2, organized: 3 } },
                    { text: "Start with a general idea and let it evolve", traits: { creative: 3, adaptable: 2 } },
                    { text: "Collaborate closely with others throughout", traits: { social: 3, leadership: 1 } },
                    { text: "Jump right in and learn as I go", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 10,
                text: "I handle stress best when I can:",
                type: "personality",
                tooltip: "Shows your stress management and coping mechanisms",
                options: [
                    { text: "Analyze the situation and create a systematic plan", traits: { analytical: 3, organized: 2 } },
                    { text: "Find creative ways to approach the challenge", traits: { creative: 3, adaptable: 2 } },
                    { text: "Talk it through with supportive people", traits: { social: 3, leadership: 1 } },
                    { text: "Take practical action to address the issue", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 11,
                text: "In social situations, I usually:",
                type: "personality",
                tooltip: "Assesses your social interaction style and comfort levels",
                options: [
                    { text: "Observe and analyze the dynamics before engaging", traits: { analytical: 3, organized: 1 } },
                    { text: "Enjoy bringing creative energy and new ideas", traits: { creative: 3, adaptable: 1 } },
                    { text: "Feel comfortable leading conversations and activities", traits: { social: 2, leadership: 3 } },
                    { text: "Focus on practical matters and getting things done", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 12,
                text: "My communication style is:",
                type: "personality",
                tooltip: "Evaluates how you prefer to communicate and express ideas",
                options: [
                    { text: "Precise and detailed", traits: { analytical: 3, organized: 1 } },
                    { text: "Expressive and imaginative", traits: { creative: 3, adaptable: 1 } },
                    { text: "Warm and engaging", traits: { social: 3, leadership: 1 } },
                    { text: "Direct and to the point", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 13,
                text: "When faced with change, I typically:",
                type: "personality",
                tooltip: "Shows your adaptability and response to change",
                options: [
                    { text: "Analyze the implications carefully", traits: { analytical: 3, organized: 1 } },
                    { text: "Get excited about new possibilities", traits: { creative: 2, adaptable: 3 } },
                    { text: "Consider how it will affect people involved", traits: { social: 3, leadership: 1 } },
                    { text: "Focus on adapting practically to the new situation", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 14,
                text: "I measure success by:",
                type: "personality",
                tooltip: "Reveals your personal definition of success and achievement",
                options: [
                    { text: "Solving complex problems effectively", traits: { analytical: 3, technical: 1 } },
                    { text: "Creating something original and meaningful", traits: { creative: 3, adaptable: 1 } },
                    { text: "Positive impact on others and relationships", traits: { social: 3, leadership: 1 } },
                    { text: "Tangible results and practical achievements", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 15,
                text: "My approach to rules and procedures is:",
                type: "personality",
                tooltip: "Assesses your attitude toward structure and guidelines",
                options: [
                    { text: "Follow them carefully and systematically", traits: { analytical: 2, organized: 3 } },
                    { text: "See them as guidelines that can be adapted", traits: { creative: 2, adaptable: 3 } },
                    { text: "Consider how they affect people and relationships", traits: { social: 3, leadership: 1 } },
                    { text: "Focus on the practical purpose they serve", traits: { practical: 3, technical: 1 } }
                ]
            },

            // Aptitude Questions (16-30)
            {
                id: 16,
                text: "I enjoy activities that involve:",
                type: "aptitude",
                tooltip: "Identifies your natural interests and enjoyable activities",
                options: [
                    { text: "Solving puzzles and logical challenges", traits: { analytical: 3, technical: 1 } },
                    { text: "Creating art, music, or writing", traits: { creative: 3, adaptable: 1 } },
                    { text: "Helping and teaching others", traits: { social: 3, leadership: 1 } },
                    { text: "Building or fixing things with my hands", traits: { practical: 3, technical: 2 } }
                ]
            },
            {
                id: 17,
                text: "My strongest academic subjects were typically:",
                type: "aptitude",
                tooltip: "Reveals your academic strengths and natural abilities",
                options: [
                    { text: "Mathematics and sciences", traits: { analytical: 3, technical: 2 } },
                    { text: "Arts and literature", traits: { creative: 3, adaptable: 1 } },
                    { text: "Social sciences and languages", traits: { social: 3, leadership: 1 } },
                    { text: "Technical and vocational subjects", traits: { practical: 3, technical: 3 } }
                ]
            },
            {
                id: 18,
                text: "I'm most proud of my ability to:",
                type: "aptitude",
                tooltip: "Shows your self-perceived strengths and capabilities",
                options: [
                    { text: "Think critically and solve complex problems", traits: { analytical: 3, technical: 1 } },
                    { text: "Generate original ideas and think creatively", traits: { creative: 3, adaptable: 1 } },
                    { text: "Communicate effectively and understand people", traits: { social: 3, leadership: 2 } },
                    { text: "Get things done efficiently and practically", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 19,
                text: "When learning new software or technology, I:",
                type: "aptitude",
                tooltip: "Assesses your approach to technology and learning new tools",
                options: [
                    { text: "Enjoy understanding how it works technically", traits: { analytical: 2, technical: 3 } },
                    { text: "Like exploring its creative possibilities", traits: { creative: 3, adaptable: 1 } },
                    { text: "Prefer learning with others in a group setting", traits: { social: 3, leadership: 1 } },
                    { text: "Focus on practical applications that get results", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 20,
                text: "In problem-solving, my natural approach is:",
                type: "aptitude",
                tooltip: "Reveals your instinctive problem-solving methodology",
                options: [
                    { text: "Break it down logically step by step", traits: { analytical: 3, organized: 2 } },
                    { text: "Brainstorm multiple creative approaches", traits: { creative: 3, adaptable: 2 } },
                    { text: "Discuss it with others to gain perspectives", traits: { social: 3, leadership: 1 } },
                    { text: "Try practical solutions and learn from results", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 21,
                text: "I'm particularly good at:",
                type: "aptitude",
                tooltip: "Identifies your specific skills and natural talents",
                options: [
                    { text: "Analyzing data and spotting patterns", traits: { analytical: 3, technical: 1 } },
                    { text: "Coming up with innovative ideas", traits: { creative: 3, adaptable: 1 } },
                    { text: "Understanding and motivating people", traits: { social: 3, leadership: 2 } },
                    { text: "Making things work in practical situations", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 22,
                text: "When presented with a new concept, I first:",
                type: "aptitude",
                tooltip: "Shows how you process and understand new information",
                options: [
                    { text: "Analyze its logical structure and components", traits: { analytical: 3, organized: 1 } },
                    { text: "Imagine its creative possibilities", traits: { creative: 3, adaptable: 1 } },
                    { text: "Consider how it relates to people and society", traits: { social: 3, leadership: 1 } },
                    { text: "Think about its practical applications", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 23,
                text: "My natural talent lies in:",
                type: "aptitude",
                tooltip: "Reveals your innate abilities and natural strengths",
                options: [
                    { text: "Logical reasoning and critical thinking", traits: { analytical: 3, technical: 1 } },
                    { text: "Creative expression and artistic ability", traits: { creative: 3, adaptable: 1 } },
                    { text: "Building relationships and understanding emotions", traits: { social: 3, leadership: 1 } },
                    { text: "Practical skills and manual dexterity", traits: { practical: 3, technical: 2 } }
                ]
            },
            {
                id: 24,
                text: "When organizing information, I prefer:",
                type: "aptitude",
                tooltip: "Assesses your information management and organization style",
                options: [
                    { text: "Detailed systems and categories", traits: { analytical: 2, organized: 3 } },
                    { text: "Visual and creative representations", traits: { creative: 3, adaptable: 1 } },
                    { text: "Discussions and group consensus", traits: { social: 3, leadership: 1 } },
                    { text: "Practical, action-oriented lists", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 25,
                text: "I learn best through:",
                type: "aptitude",
                tooltip: "Identifies your optimal learning methods and preferences",
                options: [
                    { text: "Reading and independent study", traits: { analytical: 3, organized: 1 } },
                    { text: "Experimentation and creative exploration", traits: { creative: 3, adaptable: 2 } },
                    { text: "Group discussions and collaborative projects", traits: { social: 3, leadership: 1 } },
                    { text: "Hands-on practice and real applications", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 26,
                text: "My attention to detail is:",
                type: "aptitude",
                tooltip: "Evaluates your observational skills and precision",
                options: [
                    { text: "Excellent - I notice small inconsistencies", traits: { analytical: 3, organized: 2 } },
                    { text: "Good when it comes to creative elements", traits: { creative: 3, adaptable: 1 } },
                    { text: "Focused on interpersonal dynamics", traits: { social: 3, leadership: 1 } },
                    { text: "Strong for practical and functional aspects", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 27,
                text: "When leading a project, I naturally:",
                type: "aptitude",
                tooltip: "Reveals your natural leadership style and approach",
                options: [
                    { text: "Create detailed plans and systems", traits: { analytical: 2, organized: 3 } },
                    { text: "Inspire with vision and creative direction", traits: { creative: 2, leadership: 3 } },
                    { text: "Build team cohesion and collaboration", traits: { social: 2, leadership: 3 } },
                    { text: "Focus on practical execution and results", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 28,
                text: "I'm particularly skilled at:",
                type: "aptitude",
                tooltip: "Identifies your specific areas of expertise and skill",
                options: [
                    { text: "Working with numbers and data analysis", traits: { analytical: 3, technical: 2 } },
                    { text: "Visual design and aesthetic judgment", traits: { creative: 3, adaptable: 1 } },
                    { text: "Mediating conflicts and building consensus", traits: { social: 3, leadership: 2 } },
                    { text: "Technical troubleshooting and repair", traits: { practical: 3, technical: 3 } }
                ]
            },
            {
                id: 29,
                text: "My approach to time management is:",
                type: "aptitude",
                tooltip: "Shows how you organize and manage your time",
                options: [
                    { text: "Highly structured and planned", traits: { analytical: 2, organized: 3 } },
                    { text: "Flexible and adaptable to inspiration", traits: { creative: 2, adaptable: 3 } },
                    { text: "Balanced with team needs and availability", traits: { social: 3, leadership: 1 } },
                    { text: "Focused on practical priorities", traits: { practical: 3, technical: 1 } }
                ]
            },
            {
                id: 30,
                text: "I excel in situations that require:",
                type: "aptitude",
                tooltip: "Identifies the types of challenges where you perform best",
                options: [
                    { text: "Deep concentration and analytical thinking", traits: { analytical: 3, technical: 1 } },
                    { text: "Creative problem-solving and innovation", traits: { creative: 3, adaptable: 2 } },
                    { text: "Interpersonal skills and teamwork", traits: { social: 3, leadership: 1 } },
                    { text: "Practical skills and hands-on work", traits: { practical: 3, technical: 2 } }
                ]
            }
        ];
    }

    setupEventListeners() {
        document.getElementById('takeTestBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('prevBtn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('retakeTestBtn')?.addEventListener('click', () => this.retakeTest());
    }

    showQuestion(index) {
        this.currentQuestionIndex = index;
        const question = this.questions[index];
        
        // Add fade transition
        const questionContainer = document.querySelector('.question-container');
        questionContainer.style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('questionText').textContent = question.text;
            document.getElementById('questionTooltip').textContent = question.tooltip;
            
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, optionIndex) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                if (this.answers[index] === optionIndex) {
                    optionElement.classList.add('selected');
                }
                optionElement.textContent = option.text;
                optionElement.addEventListener('click', () => this.selectOption(optionIndex));
                optionsContainer.appendChild(optionElement);
            });
            
            this.updateProgress();
            this.updateNavigation();
            
            questionContainer.style.opacity = '1';
            questionContainer.style.transform = 'translateY(0)';
        }, 300);
    }

    selectOption(optionIndex) {
        this.answers[this.currentQuestionIndex] = optionIndex;
        
        // Visual feedback
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelectorAll('.option')[optionIndex].classList.add('selected');
        
        // Auto-advance with smooth transition
        setTimeout(() => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.showQuestion(this.currentQuestionIndex + 1);
            } else {
                this.submitQuiz();
            }
        }, 600);
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.showQuestion(this.currentQuestionIndex - 1);
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        
        // Update navigation buttons
        document.getElementById('prevBtn').disabled = this.currentQuestionIndex === 0;
    }

    updateNavigation() {
        document.getElementById('prevBtn').disabled = this.currentQuestionIndex === 0;
    }

    calculateResults() {
        // Reset traits
        this.personalityTraits = {
            analytical: 0,
            creative: 0,
            social: 0,
            practical: 0,
            leadership: 0,
            technical: 0,
            organized: 0,
            adaptable: 0
        };

        // Calculate trait scores
        Object.keys(this.answers).forEach(questionIndex => {
            const answerIndex = this.answers[questionIndex];
            const question = this.questions[questionIndex];
            const selectedOption = question.options[answerIndex];
            
            Object.keys(selectedOption.traits).forEach(trait => {
                this.personalityTraits[trait] += selectedOption.traits[trait];
            });
        });

        // Normalize scores (0-100)
        const maxPossibleScore = Object.values(this.personalityTraits).reduce((a, b) => Math.max(a, b), 0);
        Object.keys(this.personalityTraits).forEach(trait => {
            this.personalityTraits[trait] = Math.round((this.personalityTraits[trait] / maxPossibleScore) * 100);
        });

        return this.generateCareerMatches();
    }

    generateCareerMatches() {
        const careerCategories = {
            technology: {
                name: "Technology",
                traits: { analytical: 0.25, technical: 0.35, creative: 0.15, practical: 0.15, organized: 0.10 },
                careers: [
                    { name: "Software Developer", match: 0, description: "Create applications and digital solutions", salary: "$110,000", growth: "22%", skills: ["Programming", "Problem Solving", "Algorithms"] },
                    { name: "Data Scientist", match: 0, description: "Extract insights from complex data", salary: "$120,000", growth: "31%", skills: ["Statistics", "Machine Learning", "Python"] },
                    { name: "Cybersecurity Analyst", match: 0, description: "Protect systems from digital threats", salary: "$102,000", growth: "33%", skills: ["Network Security", "Risk Assessment", "Incident Response"] },
                    { name: "UX/UI Designer", match: 0, description: "Design user-friendly digital experiences", salary: "$85,000", growth: "16%", skills: ["User Research", "Wireframing", "Prototyping"] },
                    { name: "IT Project Manager", match: 0, description: "Lead technology projects and teams", salary: "$95,000", growth: "11%", skills: ["Project Management", "Agile", "Budgeting"] }
                ]
            },
            healthcare: {
                name: "Healthcare",
                traits: { social: 0.35, analytical: 0.25, practical: 0.25, organized: 0.15 },
                careers: [
                    { name: "Registered Nurse", match: 0, description: "Provide patient care and medical support", salary: "$77,000", growth: "6%", skills: ["Patient Care", "Medical Knowledge", "Communication"] },
                    { name: "Physical Therapist", match: 0, description: "Help patients recover mobility and function", salary: "$91,000", growth: "15%", skills: ["Rehabilitation", "Anatomy", "Therapeutic Exercise"] },
                    { name: "Medical Researcher", match: 0, description: "Conduct studies to advance medical knowledge", salary: "$88,000", growth: "8%", skills: ["Research Methods", "Data Analysis", "Scientific Writing"] },
                    { name: "Physician Assistant", match: 0, description: "Provide healthcare services under supervision", salary: "$115,000", growth: "27%", skills: ["Diagnosis", "Treatment", "Patient Education"] },
                    { name: "Healthcare Administrator", match: 0, description: "Manage healthcare facilities and services", salary: "$104,000", growth: "28%", skills: ["Management", "Healthcare Laws", "Operations"] }
                ]
            },
            business: {
                name: "Business",
                traits: { leadership: 0.30, social: 0.25, analytical: 0.25, organized: 0.20 },
                careers: [
                    { name: "Marketing Manager", match: 0, description: "Develop strategies to promote products", salary: "$135,000", growth: "10%", skills: ["Digital Marketing", "Strategy", "Analytics"] },
                    { name: "Financial Analyst", match: 0, description: "Analyze financial data for business decisions", salary: "$81,000", growth: "9%", skills: ["Financial Modeling", "Excel", "Data Analysis"] },
                    { name: "HR Specialist", match: 0, description: "Manage employee relations and recruitment", salary: "$62,000", growth: "8%", skills: ["Recruitment", "Employee Relations", "Compliance"] },
                    { name: "Management Consultant", match: 0, description: "Advise organizations on business strategy", salary: "$86,000", growth: "14%", skills: ["Problem Solving", "Analysis", "Communication"] },
                    { name: "Sales Manager", match: 0, description: "Lead sales teams and develop strategies", salary: "$130,000", growth: "5%", skills: ["Sales", "Leadership", "Strategy"] }
                ]
            },
            creative: {
                name: "Creative Industries",
                traits: { creative: 0.40, social: 0.20, practical: 0.20, adaptable: 0.20 },
                careers: [
                    { name: "Graphic Designer", match: 0, description: "Create visual content for various media", salary: "$53,000", growth: "3%", skills: ["Adobe Creative Suite", "Typography", "Branding"] },
                    { name: "Content Strategist", match: 0, description: "Plan and create engaging content", salary: "$74,000", growth: "12%", skills: ["Content Creation", "SEO", "Social Media"] },
                    { name: "UX Designer", match: 0, description: "Design user-friendly digital experiences", salary: "$97,000", growth: "16%", skills: ["User Research", "Wireframing", "Prototyping"] },
                    { name: "Video Producer", match: 0, description: "Create and edit video content", salary: "$65,000", growth: "12%", skills: ["Video Editing", "Storytelling", "Production"] },
                    { name: "Art Director", match: 0, description: "Oversee visual style and creative direction", salary: "$100,000", growth: "4%", skills: ["Creative Direction", "Design", "Team Management"] }
                ]
            },
            education: {
                name: "Education",
                traits: { social: 0.40, leadership: 0.25, creative: 0.20, organized: 0.15 },
                careers: [
                    { name: "Teacher", match: 0, description: "Educate and inspire students", salary: "$61,000", growth: "4%", skills: ["Curriculum Development", "Classroom Management", "Instruction"] },
                    { name: "School Counselor", match: 0, description: "Support student development and well-being", salary: "$58,000", growth: "8%", skills: ["Counseling", "Student Development", "Crisis Management"] },
                    { name: "Education Administrator", match: 0, description: "Lead educational institutions and programs", salary: "$98,000", growth: "4%", skills: ["Leadership", "Budget Management", "Policy"] },
                    { name: "Curriculum Developer", match: 0, description: "Design educational programs and materials", salary: "$67,000", growth: "6%", skills: ["Instructional Design", "Assessment", "Research"] },
                    { name: "Special Education Teacher", match: 0, description: "Work with students with special needs", salary: "$61,000", growth: "8%", skills: ["Special Education", "Individualized Planning", "Patience"] }
                ]
            },
            engineering: {
                name: "Engineering",
                traits: { analytical: 0.30, technical: 0.30, practical: 0.25, organized: 0.15 },
                careers: [
                    { name: "Mechanical Engineer", match: 0, description: "Design and develop mechanical systems", salary: "$90,000", growth: "4%", skills: ["CAD", "Thermodynamics", "Mechanical Design"] },
                    { name: "Civil Engineer", match: 0, description: "Plan and oversee construction projects", salary: "$88,000", growth: "5%", skills: ["Structural Design", "Project Management", "AutoCAD"] },
                    { name: "Electrical Engineer", match: 0, description: "Design electrical systems and components", salary: "$101,000", growth: "3%", skills: ["Circuit Design", "Power Systems", "Electronics"] },
                    { name: "Environmental Engineer", match: 0, description: "Develop solutions to environmental problems", salary: "$92,000", growth: "4%", skills: ["Environmental Science", "Regulations", "Problem Solving"] },
                    { name: "Biomedical Engineer", match: 0, description: "Combine engineering and medical principles", salary: "$92,000", growth: "6%", skills: ["Biology", "Medical Devices", "Research"] }
                ]
            }
        };

        // Calculate matches for each category
        Object.keys(careerCategories).forEach(categoryKey => {
            const category = careerCategories[categoryKey];
            let categoryMatch = 0;
            let totalWeight = 0;
            
            Object.keys(category.traits).forEach(trait => {
                categoryMatch += this.personalityTraits[trait] * category.traits[trait];
                totalWeight += category.traits[trait];
            });
            
            category.match = Math.round(categoryMatch / totalWeight);
            
            // Calculate matches for individual careers with more variation
            category.careers.forEach(career => {
                const baseMatch = category.match;
                const variation = (Math.random() * 20) - 10; // -10 to +10 variation
                career.match = Math.max(60, Math.min(95, baseMatch + variation));
            });
            
            // Sort careers by match
            category.careers.sort((a, b) => b.match - a.match);
        });

        return careerCategories;
    }

    submitQuiz() {
        if (Object.keys(this.answers).length < this.questions.length) {
            // If not all questions answered, show alert and scroll to first unanswered
            const unansweredIndex = this.findFirstUnanswered();
            this.showQuestion(unansweredIndex);
            alert('Please answer all questions before submitting.');
            return;
        }

        const results = this.calculateResults();
        this.displayResults(results);
        
        // Save results if user is logged in
        if (authSystem.currentUser) {
            authSystem.saveResult({
                careers: Object.values(results).flatMap(cat => cat.careers.slice(0, 2)),
                personalityTraits: this.personalityTraits,
                date: new Date().toISOString()
            });
        }
    }

    findFirstUnanswered() {
        for (let i = 0; i < this.questions.length; i++) {
            if (this.answers[i] === undefined) {
                return i;
            }
        }
        return 0;
    }

    displayResults(results) {
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        newGenApp.updateCareerCardsWithMatches(results);
        // Generate results visualization
        resultsVisualization.generateResults(results);
        
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }

    retakeTest() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.personalityTraits = {
            analytical: 0,
            creative: 0,
            social: 0,
            practical: 0,
            leadership: 0,
            technical: 0,
            organized: 0,
            adaptable: 0
        };
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        this.showQuestion(0);
        
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize quiz system
const quizSystem = new QuizSystem();