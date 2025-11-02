// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('careerPathUsers')) || [];
        this.init();
    }

    init() {
        this.checkExistingSession();
        this.setupEventListeners();
    }

    checkExistingSession() {
        const savedUser = localStorage.getItem('careerPathCurrentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    setupEventListeners() {
        // Auth modal
        const authModal = document.getElementById('authModal');
        const signInBtn = document.getElementById('signInBtn');
        const closeBtn = document.querySelector('.close');
        const switchForms = document.querySelectorAll('.switch-form');

        signInBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.style.display = 'block';
        });

        closeBtn?.addEventListener('click', () => {
            authModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        });

        // Form switching
        switchForms.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const formType = e.target.dataset.form;
                this.switchAuthForm(formType);
            });
        });

        // Form submissions
        document.getElementById('login')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signup')?.addEventListener('submit', (e) => this.handleSignup(e));
        document.getElementById('signOutBtn')?.addEventListener('click', (e) => this.handleSignout(e));
    }

    switchAuthForm(formType) {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${formType}Form`).classList.add('active');
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('careerPathCurrentUser', JSON.stringify(user));
            this.updateUI();
            document.getElementById('authModal').style.display = 'none';
            e.target.reset();
           this.showNotification('Welcome to NewGen Advisory! Account created successfully!', 'success');
        } else {
            this.showNotification('Invalid email or password', 'error');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            id: Date.now().toString(),
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            results: [],
            savedCareers: [],
            joined: new Date().toISOString()
        };

        if (this.users.find(u => u.email === userData.email)) {
            this.showNotification('Email already exists', 'error');
            return;
        }

        this.users.push(userData);
        localStorage.setItem('careerPathUsers', JSON.stringify(this.users));
        
        this.currentUser = userData;
        localStorage.setItem('careerPathCurrentUser', JSON.stringify(userData));
        this.updateUI();
        document.getElementById('authModal').style.display = 'none';
        e.target.reset();
        this.showNotification('Account created successfully!', 'success');
    }

    handleSignout() {
        this.currentUser = null;
        localStorage.removeItem('careerPathCurrentUser');
        this.updateUI();
        this.showNotification('Signed out successfully', 'info');
    }

    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userGreeting = document.getElementById('userGreeting');
        const dashboardBtn = document.getElementById('dashboardBtn');

        if (this.currentUser) {
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            userMenu.style.alignItems = 'center';
            userMenu.style.gap = '15px';
            userGreeting.textContent = `Hello, ${this.currentUser.name}`;
            dashboardBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showDashboard();
            });
        } else {
            authButtons.style.display = 'block';
            userMenu.style.display = 'none';
            this.hideDashboard();
        }
    }

    showDashboard() {
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('dashboardUserName').textContent = this.currentUser.name;
        this.loadDashboardData();
    }

    hideDashboard() {
        document.getElementById('dashboard').style.display = 'none';
    }

    loadDashboardData() {
        // Load recent results
        const recentResults = document.getElementById('recentResults');
        if (this.currentUser.results.length > 0) {
            const latestResult = this.currentUser.results[this.currentUser.results.length - 1];
            recentResults.innerHTML = `
                <div class="result-summary">
                    <h4>Latest Assessment</h4>
                    <p>Completed: ${new Date(latestResult.date).toLocaleDateString()}</p>
                    <p>Top Match: ${latestResult.careers[0]?.name || 'N/A'} (${latestResult.careers[0]?.match || 0}%)</p>
                </div>
            `;
        } else {
            recentResults.innerHTML = '<p>No assessment results yet.</p>';
        }

        // Load saved careers
        const savedCareers = document.getElementById('savedCareers');
        if (this.currentUser.savedCareers.length > 0) {
            savedCareers.innerHTML = this.currentUser.savedCareers.map(career => `
                <div class="saved-career">
                    <strong>${career.name}</strong>
                    <span>${career.category}</span>
                </div>
            `).join('');
        } else {
            savedCareers.innerHTML = '<p>No saved careers yet.</p>';
        }
    }

    saveResult(resultData) {
        if (!this.currentUser) return false;

        resultData.id = Date.now().toString();
        resultData.date = new Date().toISOString();
        
        this.currentUser.results.push(resultData);
        this.updateUserData();
        return true;
    }

    saveCareer(careerData) {
        if (!this.currentUser) return false;

        if (!this.currentUser.savedCareers.find(c => c.id === careerData.id)) {
            this.currentUser.savedCareers.push(careerData);
            this.updateUserData();
            return true;
        }
        return false;
    }

    updateUserData() {
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = this.currentUser;
            localStorage.setItem('careerPathUsers', JSON.stringify(this.users));
            localStorage.setItem('careerPathCurrentUser', JSON.stringify(this.currentUser));
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 2001;
            animation: slideInRight 0.3s ease-out;
        `;

        const colors = {
            success: '#4bb543',
            error: '#dc3545',
            info: '#4361ee',
            warning: '#ffc107'
        };

        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize auth system
const authSystem = new AuthSystem();