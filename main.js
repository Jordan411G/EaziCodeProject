// Enhanced Main Application Controller with Fixed Navigation and Dark Mode
class NewGenAdvisoryApp {
    constructor() {
        this.careerFields = {
            technology: {
                name: "Technology",
                description: "Careers in software development, IT, cybersecurity, and digital innovation",
                color: "#4cc9f0",
                icon: "💻"
            },
            healthcare: {
                name: "Healthcare",
                description: "Medical professions, patient care, research, and health services",
                color: "#f72585",
                icon: "🏥"
            },
            business: {
                name: "Business",
                description: "Management, marketing, finance, and corporate leadership roles",
                color: "#7209b7",
                icon: "💼"
            },
            creative: {
                name: "Creative Industries",
                description: "Design, arts, media, and creative content creation",
                color: "#ff9e00",
                icon: "🎨"
            },
            education: {
                name: "Education",
                description: "Teaching, administration, counseling, and educational services",
                color: "#3a0ca3",
                icon: "📚"
            },
            engineering: {
                name: "Engineering",
                description: "Technical design, construction, and problem-solving roles",
                color: "#2ec4b6",
                icon: "⚙️"
            }
        };
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupScrollProgress();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupCareerNavigation();
        this.setupCareerFilters();
        this.populateCareerCards();
        this.initializeWelcomeMessage();
        this.setupGlobalEventListeners();
    }

    setupCareerNavigation() {
        const careersSection = document.getElementById('careers');
        if (!careersSection) return;

        const existingNav = document.querySelector('.career-navigation');
        if (existingNav) {
            existingNav.remove();
        }
        
        const careerNav = this.createCareerNavigation();
        const sectionTitle = careersSection.querySelector('.section-title');
        
        if (sectionTitle) {
            sectionTitle.parentNode.insertBefore(careerNav, sectionTitle.nextSibling);
        } else {
            careersSection.insertBefore(careerNav, careersSection.firstChild);
        }
    }

    createCareerNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'career-navigation';
        
        let navHTML = `
            <div class="career-nav-header">
                <h3>Explore Career Fields</h3>
                <p>Browse careers by industry and field of interest</p>
            </div>
            <div class="career-nav-grid">
        `;

        // Add "All Careers" option
        navHTML += `
            <div class="career-nav-item active" data-field="all">
                <div class="career-nav-icon" style="background-color: var(--primary)">
                    🌟
                </div>
                <div class="career-nav-content">
                    <h4>All Careers</h4>
                    <p>Explore all available career paths across every field</p>
                    <span class="career-count">${this.getAllCareersCount()} careers</span>
                </div>
            </div>
        `;

        Object.entries(this.careerFields).forEach(([key, field]) => {
            navHTML += `
                <div class="career-nav-item" data-field="${key}">
                    <div class="career-nav-icon" style="background-color: ${field.color}">
                        ${field.icon}
                    </div>
                    <div class="career-nav-content">
                        <h4>${field.name}</h4>
                        <p>${field.description}</p>
                        <span class="career-count">${this.getCareerCount(key)} careers</span>
                    </div>
                </div>
            `;
        });

        navHTML += `</div>`;
        navContainer.innerHTML = navHTML;

        // Add click handlers
        navContainer.querySelectorAll('.career-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const field = item.dataset.field;
                this.filterCareersByField(field);
            });
        });

        return navContainer;
    }

    getAllCareersCount() {
        return 30;
    }

    getCareerCount(field) {
        const careerData = {
            technology: 5,
            healthcare: 5,
            business: 5,
            creative: 5,
            education: 5,
            engineering: 5
        };
        return careerData[field] || 0;
    }

    filterCareersByField(field) {
        // Update navigation active state
        document.querySelectorAll('.career-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.career-nav-item[data-field="${field}"]`).classList.add('active');

        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${field}"]`);
        if (filterBtn) {
            filterBtn.classList.add('active');
        }

        // Apply the filter
        this.applyCareerFilter(field);
    }

    applyCareerFilter(filter) {
        const careerCards = document.querySelectorAll('.path-card');
        let visibleCount = 0;
        
        careerCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Update career count in navigation
        this.updateVisibleCareerCount(visibleCount, filter);
    }

    updateVisibleCareerCount(count, filter) {
        const activeNavItem = document.querySelector('.career-nav-item.active');
        if (activeNavItem) {
            const countElement = activeNavItem.querySelector('.career-count');
            if (countElement) {
                countElement.textContent = `${count} careers`;
            }
        }
    }

    setupCareerFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        // Ensure "All" filter is active by default
        const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilter && !allFilter.classList.contains('active')) {
            allFilter.classList.add('active');
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterCareersByField(filter);
            });
        });
    }

    // Update the populateCareerCards method to handle existing HTML cards
populateCareerCards() {
    const container = document.getElementById('careerPathsContainer');
    if (!container) {
        console.log('Career paths container not found');
        return;
    }
    
    // Check if career cards already exist in HTML
    const existingCards = container.querySelectorAll('.path-card');
    if (existingCards.length > 0) {
        console.log('Career cards already exist in HTML, setting up event listeners');
        this.setupCareerCardEventListeners();
        this.applyCareerFilter('all');
        return;
    }
    
    // If no existing cards, create them dynamically
    const allCareers = this.getAllCareersData();
    container.innerHTML = '';

    allCareers.forEach(career => {
        const careerCard = this.createCareerCard(career);
        container.appendChild(careerCard);
    });

    this.applyCareerFilter('all');
}

setupCareerCardEventListeners() {
    const careerCards = document.querySelectorAll('.path-card');
    const saveButtons = document.querySelectorAll('.save-career-btn');
    
    careerCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if save button was clicked
            if (e.target.classList.contains('save-career-btn')) {
                return;
            }
            
            const title = card.querySelector('h3').textContent;
            const category = card.dataset.category;
            const description = card.querySelector('p').textContent;
            const skills = card.querySelector('.career-skill').textContent.replace('Key Skills:', '').trim();
            const salary = card.querySelector('.salary').textContent.replace('💰', '').trim();
            const growth = card.querySelector('.growth').textContent.replace('📈', '').trim();
            
            const career = {
                category: category,
                title: title,
                description: description,
                skills: skills.split(', '),
                salary: salary,
                growth: growth,
                match: null
            };
            
            this.showCareerDetails(career);
        });
    });
    
    saveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.path-card');
            const title = card.querySelector('h3').textContent;
            const category = card.dataset.category;
            const description = card.querySelector('p').textContent;
            const skills = card.querySelector('.career-skill').textContent.replace('Key Skills:', '').trim();
            const salary = card.querySelector('.salary').textContent.replace('💰', '').trim();
            const growth = card.querySelector('.growth').textContent.replace('📈', '').trim();
            
            const career = {
                category: category,
                title: title,
                description: description,
                skills: skills.split(', '),
                salary: salary,
                growth: growth,
                match: null
            };
            
            this.saveCareer(career);
        });
    });
}
    getAllCareersData() {
        return [
            // Technology Careers
            {
                category: "technology",
                title: "Software Developer",
                description: "Create applications and systems that power our digital world",
                skills: ["Programming", "Problem Solving", "Algorithms"],
                salary: "$110,000",
                growth: "22%",
                match: null
            },
            {
                category: "technology",
                title: "Data Scientist",
                description: "Extract insights from complex data using statistical methods",
                skills: ["Statistics", "Machine Learning", "Python"],
                salary: "$120,000",
                growth: "31%",
                match: null
            },
            {
                category: "technology",
                title: "Cybersecurity Analyst",
                description: "Protect systems and networks from digital threats",
                skills: ["Network Security", "Risk Assessment", "Incident Response"],
                salary: "$102,000",
                growth: "33%",
                match: null
            },
            {
                category: "technology",
                title: "UX/UI Designer",
                description: "Design user-friendly and visually appealing digital experiences",
                skills: ["User Research", "Wireframing", "Prototyping"],
                salary: "$85,000",
                growth: "16%",
                match: null
            },
            {
                category: "technology",
                title: "IT Project Manager",
                description: "Lead technology projects and coordinate development teams",
                skills: ["Project Management", "Agile", "Budgeting"],
                salary: "$95,000",
                growth: "11%",
                match: null
            },

            // Healthcare Careers
            {
                category: "healthcare",
                title: "Registered Nurse",
                description: "Provide patient care and medical support in various settings",
                skills: ["Patient Care", "Medical Knowledge", "Communication"],
                salary: "$77,000",
                growth: "6%",
                match: null
            },
            {
                category: "healthcare",
                title: "Physical Therapist",
                description: "Help patients recover mobility and physical function",
                skills: ["Rehabilitation", "Anatomy", "Therapeutic Exercise"],
                salary: "$91,000",
                growth: "15%",
                match: null
            },
            {
                category: "healthcare",
                title: "Medical Researcher",
                description: "Conduct studies to advance medical knowledge and treatments",
                skills: ["Research Methods", "Data Analysis", "Scientific Writing"],
                salary: "$88,000",
                growth: "8%",
                match: null
            },
            {
                category: "healthcare",
                title: "Physician Assistant",
                description: "Provide healthcare services under physician supervision",
                skills: ["Diagnosis", "Treatment", "Patient Education"],
                salary: "$115,000",
                growth: "27%",
                match: null
            },
            {
                category: "healthcare",
                title: "Healthcare Administrator",
                description: "Manage healthcare facilities and coordinate medical services",
                skills: ["Management", "Healthcare Laws", "Operations"],
                salary: "$104,000",
                growth: "28%",
                match: null
            },

            // Business Careers
            {
                category: "business",
                title: "Marketing Manager",
                description: "Develop strategies to promote products and build brands",
                skills: ["Digital Marketing", "Strategy", "Analytics"],
                salary: "$135,000",
                growth: "10%",
                match: null
            },
            {
                category: "business",
                title: "Financial Analyst",
                description: "Analyze financial data to guide business decisions",
                skills: ["Financial Modeling", "Excel", "Data Analysis"],
                salary: "$81,000",
                growth: "9%",
                match: null
            },
            {
                category: "business",
                title: "HR Specialist",
                description: "Manage employee relations, recruitment, and development",
                skills: ["Recruitment", "Employee Relations", "Compliance"],
                salary: "$62,000",
                growth: "8%",
                match: null
            },
            {
                category: "business",
                title: "Management Consultant",
                description: "Advise organizations on business strategy and operations",
                skills: ["Problem Solving", "Analysis", "Communication"],
                salary: "$86,000",
                growth: "14%",
                match: null
            },
            {
                category: "business",
                title: "Sales Manager",
                description: "Lead sales teams and develop revenue strategies",
                skills: ["Sales", "Leadership", "Strategy"],
                salary: "$130,000",
                growth: "5%",
                match: null
            },

            // Creative Careers
            {
                category: "creative",
                title: "Graphic Designer",
                description: "Create visual content for various media and platforms",
                skills: ["Adobe Creative Suite", "Typography", "Branding"],
                salary: "$53,000",
                growth: "3%",
                match: null
            },
            {
                category: "creative",
                title: "Content Strategist",
                description: "Plan and create engaging content across multiple channels",
                skills: ["Content Creation", "SEO", "Social Media"],
                salary: "$74,000",
                growth: "12%",
                match: null
            },
            {
                category: "creative",
                title: "Video Producer",
                description: "Create and edit video content for various purposes",
                skills: ["Video Editing", "Storytelling", "Production"],
                salary: "$65,000",
                growth: "12%",
                match: null
            },
            {
                category: "creative",
                title: "Art Director",
                description: "Oversee visual style and creative direction for projects",
                skills: ["Creative Direction", "Design", "Team Management"],
                salary: "$100,000",
                growth: "4%",
                match: null
            },
            {
                category: "creative",
                title: "UX Designer",
                description: "Design user-friendly digital experiences and interfaces",
                skills: ["User Research", "Wireframing", "Prototyping"],
                salary: "$97,000",
                growth: "16%",
                match: null
            },

            // Education Careers
            {
                category: "education",
                title: "Teacher",
                description: "Educate and inspire students in various subjects",
                skills: ["Curriculum Development", "Classroom Management", "Instruction"],
                salary: "$61,000",
                growth: "4%",
                match: null
            },
            {
                category: "education",
                title: "School Counselor",
                description: "Support student development and academic success",
                skills: ["Counseling", "Student Development", "Crisis Management"],
                salary: "$58,000",
                growth: "8%",
                match: null
            },
            {
                category: "education",
                title: "Education Administrator",
                description: "Lead educational institutions and academic programs",
                skills: ["Leadership", "Budget Management", "Policy"],
                salary: "$98,000",
                growth: "4%",
                match: null
            },
            {
                category: "education",
                title: "Curriculum Developer",
                description: "Design educational programs and learning materials",
                skills: ["Instructional Design", "Assessment", "Research"],
                salary: "$67,000",
                growth: "6%",
                match: null
            },
            {
                category: "education",
                title: "Special Education Teacher",
                description: "Work with students with special needs and disabilities",
                skills: ["Special Education", "Individualized Planning", "Patience"],
                salary: "$61,000",
                growth: "8%",
                match: null
            },

            // Engineering Careers
            {
                category: "engineering",
                title: "Mechanical Engineer",
                description: "Design and develop mechanical systems and devices",
                skills: ["CAD", "Thermodynamics", "Mechanical Design"],
                salary: "$90,000",
                growth: "4%",
                match: null
            },
            {
                category: "engineering",
                title: "Civil Engineer",
                description: "Plan and oversee construction and infrastructure projects",
                skills: ["Structural Design", "Project Management", "AutoCAD"],
                salary: "$88,000",
                growth: "5%",
                match: null
            },
            {
                category: "engineering",
                title: "Electrical Engineer",
                description: "Design electrical systems, circuits, and components",
                skills: ["Circuit Design", "Power Systems", "Electronics"],
                salary: "$101,000",
                growth: "3%",
                match: null
            },
            {
                category: "engineering",
                title: "Environmental Engineer",
                description: "Develop solutions to environmental challenges",
                skills: ["Environmental Science", "Regulations", "Problem Solving"],
                salary: "$92,000",
                growth: "4%",
                match: null
            },
            {
                category: "engineering",
                title: "Biomedical Engineer",
                description: "Combine engineering principles with medical science",
                skills: ["Biology", "Medical Devices", "Research"],
                salary: "$92,000",
                growth: "6%",
                match: null
            }
        ];
    }

    createCareerCard(career) {
        const card = document.createElement('div');
        card.className = 'path-card';
        card.dataset.category = career.category;
        
        const fieldInfo = this.careerFields[career.category];
        
        const hasMatch = career.match !== null && career.match !== undefined;
        const matchDisplay = hasMatch ? `<div class="career-match-badge">${career.match}% Match</div>` : '';
        
        card.innerHTML = `
            <div class="path-image" style="background-color: ${fieldInfo.color}">
                ${fieldInfo.icon} ${fieldInfo.name}
            </div>
            <div class="path-content">
                <div class="career-header">
                    <h3>${career.title}</h3>
                    ${matchDisplay}
                </div>
                <p>${career.description}</p>
                <div class="career-details">
                    <div class="career-skill">
                        <strong>Key Skills:</strong> ${career.skills.join(', ')}
                    </div>
                    <div class="career-metrics">
                        <span class="salary">💰 ${career.salary}</span>
                        <span class="growth">📈 ${career.growth} growth</span>
                    </div>
                </div>
                <button class="btn save-career-btn" style="margin-top: 15px; padding: 8px 15px; font-size: 0.9rem;">
                    Save Career
                </button>
            </div>
        `;

        const saveBtn = card.querySelector('.save-career-btn');
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.saveCareer(career);
        });

        card.addEventListener('click', () => {
            this.showCareerDetails(career);
        });

        return card;
    }

    saveCareer(career) {
        if (authSystem.currentUser) {
            if (authSystem.saveCareer({
                id: Date.now().toString(),
                ...career,
                savedDate: new Date().toISOString()
            })) {
                authSystem.showNotification('Career saved to your dashboard!', 'success');
            } else {
                authSystem.showNotification('Career already saved', 'info');
            }
        } else {
            authSystem.showNotification('Please sign in to save careers', 'warning');
            document.getElementById('signInBtn').click();
        }
    }

    showCareerDetails(career) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        const fieldInfo = this.careerFields[career.category];
        const hasMatch = career.match !== null && career.match !== undefined;
        const matchDisplay = hasMatch ? `<p><strong>Your Match:</strong> ${career.match}%</p>` : '';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="career-modal-header" style="border-left: 4px solid ${fieldInfo.color}">
                    <h2>${career.title}</h2>
                    <div class="career-field-badge" style="background-color: ${fieldInfo.color}">
                        ${fieldInfo.icon} ${fieldInfo.name}
                    </div>
                </div>
                ${matchDisplay}
                <p><strong>Description:</strong> ${career.description}</p>
                <p><strong>Average Salary:</strong> ${career.salary}</p>
                <p><strong>Job Growth Outlook:</strong> ${career.growth}</p>
                <p><strong>Key Skills Needed:</strong> ${career.skills.join(', ')}</p>
                <div class="modal-actions">
                    <button class="btn" id="saveCareerModalBtn">Save Career</button>
                    <button class="btn btn-outline" id="closeModalBtn">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.close');
        const closeModalBtn = modal.querySelector('#closeModalBtn');
        const saveBtn = modal.querySelector('#saveCareerModalBtn');
        
        const closeModal = () => modal.remove();
        
        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        saveBtn.addEventListener('click', () => {
            this.saveCareer(career);
            closeModal();
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    updateCareerCardsWithMatches(results) {
        const careerCards = document.querySelectorAll('.path-card');
        
        const matchMap = {};
        Object.values(results).forEach(category => {
            category.careers.forEach(career => {
                matchMap[career.name] = career.match;
            });
        });

        careerCards.forEach(card => {
            const careerTitle = card.querySelector('h3').textContent;
            const matchScore = matchMap[careerTitle];
            
            if (matchScore !== undefined) {
                let matchBadge = card.querySelector('.career-match-badge');
                if (!matchBadge) {
                    const careerHeader = card.querySelector('.career-header');
                    matchBadge = document.createElement('div');
                    matchBadge.className = 'career-match-badge';
                    careerHeader.appendChild(matchBadge);
                }
                matchBadge.textContent = `${matchScore.toFixed(2)}% Match`;
                card.dataset.matchScore = matchScore;
            }
        });
    }

    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('newgen-theme') || 'light';
        
        document.body.classList.toggle('dark', savedTheme === 'dark');
        this.updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', (e) => {
            const isDark = document.body.classList.toggle('dark');
            const theme = isDark ? 'dark' : 'light';
            
            localStorage.setItem('newgen-theme', theme);
            this.updateThemeIcon(theme);
            this.createRipple(themeToggle, e);
        });
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;

        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
            });
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    setupNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    initializeWelcomeMessage() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const userName = prompt("Please enter your name:");
                if (userName && userName.trim() !== "") {
                    const welcomeMessage = document.getElementById('welcomeMessage');
                    if (welcomeMessage) {
                        welcomeMessage.textContent = `Welcome, ${userName.trim()}!`;
                        welcomeMessage.style.display = 'block';
                        
                        setTimeout(() => {
                            welcomeMessage.style.display = 'none';
                        }, 5000);
                    }
                }
            }, 1000);
        });
    }

    setupGlobalEventListeners() {
        window.addEventListener('resize', this.debounce(() => {
            // Handle responsive adjustments
        }, 250));

        this.showLoadingAnimation();
    }

    showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--light);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading NewGen Advisory...</p>
            </div>
        `;

        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
const newGenApp = new NewGenAdvisoryApp();