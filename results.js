// Enhanced Results Visualization with New Features
class ResultsVisualization {
    constructor() {
        this.currentResults = null;
        this.motivationalQuotes = [
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "Your career is what you're paid for. Your calling is what you're made for.",
                author: "Alan Alda"
            },
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "Your time is limited, don't waste it living someone else's life.",
                author: "Steve Jobs"
            },
            {
                text: "Believe you can and you're halfway there.",
                author: "Theodore Roosevelt"
            }
        ];
    }

    generateResults(results) {
        this.currentResults = results;
        this.displayProgressBars(results);
        this.displayCareerDetails(results);
        this.showMotivationalQuote();
        this.generateCareerTimeline();
        
        // Enable sharing
        this.setupSharing(results);
    }

    displayProgressBars(results) {
        const container = document.getElementById('careerProgressBars');
        container.innerHTML = '';

        // Sort categories by match percentage
        const sortedCategories = Object.values(results)
            .sort((a, b) => b.match - a.match);

        sortedCategories.forEach(category => {
            const matchPercentage = category.match.toFixed(2);
            const progressBar = this.createProgressBar(category.name, matchPercentage, this.getCategoryColor(category.name));
            container.appendChild(progressBar);
        });

        // Animate progress bars
        setTimeout(() => {
            this.animateProgressBars();
        }, 100);
    }

    createProgressBar(careerName, percentage, color) {
        const item = document.createElement('div');
        item.className = 'career-match-item';
        
        item.innerHTML = `
            <div class="career-match-header">
                <span class="career-name">${careerName}</span>
                <span class="career-percentage">${percentage}%</span>
            </div>
            <div class="match-progress-bar">
                <div class="match-progress-fill" style="width: 0%; background-color: ${color};"></div>
            </div>
        `;

        item.dataset.percentage = percentage;
        return item;
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.match-progress-fill');
        
        progressBars.forEach((bar, index) => {
            const percentage = bar.parentElement.parentElement.dataset.percentage;
            setTimeout(() => {
                this.animateProgressBar(bar, percentage);
            }, index * 200);
        });
    }

    animateProgressBar(element, targetPercentage) {
        let width = 0;
        const duration = 1500;
        const increment = targetPercentage / (duration / 16);
        
        const animate = () => {
            if (width < targetPercentage) {
                width += increment;
                element.style.width = width + '%';
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    showMotivationalQuote() {
        const quoteContainer = document.getElementById('motivationalQuote');
        const randomQuote = this.motivationalQuotes[Math.floor(Math.random() * this.motivationalQuotes.length)];
        
        quoteContainer.querySelector('.quote-text').textContent = `"${randomQuote.text}"`;
        quoteContainer.querySelector('.quote-author').textContent = `- ${randomQuote.author}`;
        
        // Animate quote appearance
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            quoteContainer.style.transition = 'all 0.6s ease';
            quoteContainer.style.opacity = '1';
            quoteContainer.style.transform = 'translateY(0)';
        }, 500);
    }

    generateCareerTimeline() {
        const timelineContainer = document.getElementById('timelineContainer');
        timelineContainer.innerHTML = '';

        const timelineData = [
            { year: 'Year 1', content: 'Skill Development & Foundation Building' },
            { year: 'Year 2', content: 'Entry-Level Position & Practical Experience' },
            { year: 'Year 3', content: 'Specialization & Advanced Training' },
            { year: 'Year 4', content: 'Mid-Level Role & Leadership Development' },
            { year: 'Year 5', content: 'Senior Position & Mentorship' }
        ];

        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.style.animationDelay = `${index * 0.2}s`;
            
            timelineItem.innerHTML = `
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-content">${item.content}</div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });
    }

    setupSharing(results) {
        const shareBtn = document.getElementById('shareResultsBtn');
        
        shareBtn.addEventListener('click', () => {
            this.shareResults(results);
        });
    }

    shareResults(results) {
        const topCategory = Object.values(results)
            .sort((a, b) => b.match - a.match)[0];
        
        const shareText = `I just discovered my perfect career match with NewGen Advisory! My top match is ${topCategory.name} with ${topCategory.match.toFixed(2)}% compatibility. Discover yours too!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Career Match Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                authSystem.showNotification('Results copied to clipboard!', 'success');
            });
        }
    }

    displayCareerDetails(results) {
        const container = document.getElementById('careerDetails');
        let html = '';

        // Get top 3 categories by match
        const topCategories = Object.values(results)
            .sort((a, b) => b.match - a.match)
            .slice(0, 3);
        
        topCategories.forEach(category => {
            html += `<h4>${category.name} (${category.match.toFixed(2)}% match)</h4>`;
            category.careers.slice(0, 2).forEach(career => {
                html += `
                    <div class="career-item" data-career='${JSON.stringify(career).replace(/'/g, "&#39;")}'>
                        <h4>${career.name}</h4>
                        <p class="career-match">${career.match.toFixed(2)}% Match</p>
                        <p><strong>Description:</strong> ${career.description}</p>
                        <p><strong>Skills:</strong> ${career.skills.join(', ')}</p>
                        <p><strong>Salary:</strong> ${career.salary} | <strong>Growth:</strong> ${career.growth}</p>
                    </div>
                `;
            });
        });
        
        container.innerHTML = html;

        // Add click handlers to career items
        document.querySelectorAll('.career-item').forEach(item => {
            item.addEventListener('click', () => {
                const careerData = JSON.parse(item.dataset.career);
                this.showCareerDetails(careerData);
            });
        });
    }

    getCategoryColor(categoryName) {
        const colors = {
            'Technology': '#4cc9f0',
            'Healthcare': '#f72585',
            'Business': '#7209b7',
            'Creative Industries': '#ff9e00',
            'Education': '#3a0ca3',
            'Engineering': '#2ec4b6'
        };
        return colors[categoryName] || '#666';
    }

    showCareerDetails(career) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${career.name}</h2>
                <p><strong>Match Score:</strong> ${career.match.toFixed(2)}%</p>
                <p><strong>Description:</strong> ${career.description}</p>
                <p><strong>Average Salary:</strong> ${career.salary}</p>
                <p><strong>Job Growth Outlook:</strong> ${career.growth}</p>
                <p><strong>Key Skills Needed:</strong> ${career.skills.join(', ')}</p>
                <div class="modal-actions">
                    <button class="btn" id="saveCareerBtn">Save Career</button>
                    <button class="btn btn-outline" id="closeModalBtn">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.close');
        const closeModalBtn = modal.querySelector('#closeModalBtn');
        const saveBtn = modal.querySelector('#saveCareerBtn');
        
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

    saveCareer(career) {
        if (authSystem.saveCareer({
            id: Date.now().toString(),
            ...career,
            savedDate: new Date().toISOString()
        })) {
            authSystem.showNotification('Career saved to your dashboard!', 'success');
        } else {
            authSystem.showNotification('Career already saved', 'info');
        }
    }
}

// Initialize results visualization
const resultsVisualization = new ResultsVisualization();