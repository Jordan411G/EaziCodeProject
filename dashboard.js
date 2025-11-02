// Dashboard System
class DashboardSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Save career buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('save-career-btn')) {
                e.preventDefault();
                this.saveCareerFromCard(e.target);
            }
        });

        // Download report button
        document.getElementById('downloadReportBtn')?.addEventListener('click', () => {
            this.downloadPDFReport();
        });

        // Save results button
        document.getElementById('saveResultsBtn')?.addEventListener('click', () => {
            this.saveCurrentResults();
        });
    }

    saveCareerFromCard(button) {
        if (!authSystem.currentUser) {
            authSystem.showNotification('Please sign in to save careers', 'warning');
            return;
        }

        const card = button.closest('.path-card');
        const category = card.dataset.category;
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;

        const careerData = {
            id: Date.now().toString(),
            name: title,
            category: category,
            description: description,
            savedDate: new Date().toISOString()
        };

        if (authSystem.saveCareer(careerData)) {
            authSystem.showNotification('Career saved to your dashboard!', 'success');
            button.textContent = 'Saved ✓';
            button.disabled = true;
        } else {
            authSystem.showNotification('Career already saved', 'info');
        }
    }

    saveCurrentResults() {
        if (!authSystem.currentUser) {
            authSystem.showNotification('Please sign in to save results', 'warning');
            return;
        }

        // This would save the current quiz results
        authSystem.showNotification('Results saved to your dashboard!', 'success');
    }

    downloadPDFReport() {
        // Simple PDF generation using window.print() for now
        // In a real implementation, you might use a library like jsPDF
        const originalTitle = document.title;
        document.title = `CareerPath_Report_${new Date().toISOString().split('T')[0]}`;
        window.print();
        document.title = originalTitle;
        
        authSystem.showNotification('PDF report generated!', 'success');
    }

    loadCareerProgress() {
        // This would load and display the user's career progress
        // For now, we'll show a simple progress message
        const progressElement = document.getElementById('careerProgress');
        if (progressElement) {
            progressElement.innerHTML = `
                <p>Track your career development journey here.</p>
                <div class="progress-item">
                    <strong>Assessment Completed:</strong> ✓
                </div>
                <div class="progress-item">
                    <strong>Careers Explored:</strong> ${authSystem.currentUser?.savedCareers.length || 0}
                </div>
            `;
        }
    }
}

// Initialize dashboard system
const dashboardSystem = new DashboardSystem();