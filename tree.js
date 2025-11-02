// Enhanced Career Tree Visualization with Realistic Tree Design
class CareerTreeVisualization {
    constructor() {
        this.canvas = document.getElementById('careerTree');
        this.ctx = this.canvas.getContext('2d');
        this.tooltip = this.createTooltip();
        this.currentResults = null;
        this.animationProgress = 0;
        this.isAnimating = false;
    }

    createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    generateTree(results) {
        this.currentResults = results;
        this.animationProgress = 0;
        this.isAnimating = true;
        this.resizeCanvas();
        this.animateTreeGrowth(results);
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = Math.max(500, container.clientHeight);
        
        // Add growing animation class
        this.canvas.classList.add('tree-growing');
    }

    animateTreeGrowth(results) {
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            this.animationProgress = Math.min(elapsed / duration, 1);
            
            this.drawTree(results, this.animationProgress);
            
            if (this.animationProgress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
                this.canvas.classList.remove('tree-growing');
            }
        };
        
        animate();
    }

    drawTree(results, progress) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const groundY = this.canvas.height - 50;
        const trunkBaseY = groundY;
        const trunkHeight = 120 * progress;
        
        // Draw ground
        this.drawGround(centerX, groundY, progress);
        
        // Draw trunk with gradient
        this.drawTrunk(centerX, trunkBaseY, trunkHeight, progress);
        
        const categories = Object.values(results);
        const totalBranches = categories.length;
        const baseAngle = -Math.PI / 2; // Start upward
        
        categories.forEach((category, index) => {
            const angle = baseAngle + (index - (totalBranches - 1) / 2) * (Math.PI / (totalBranches + 1));
            this.drawMainBranch(centerX, trunkBaseY - trunkHeight, angle, category, progress, index);
        });
    }

    drawGround(centerX, groundY, progress) {
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, groundY, this.canvas.width, this.canvas.height - groundY);
        
        // Add some grass texture
        this.ctx.fillStyle = '#2d5016';
        for (let i = 0; i < this.canvas.width; i += 4) {
            if (Math.random() > 0.7) {
                const height = 2 + Math.random() * 3;
                this.ctx.fillRect(i, groundY - height * progress, 2, height * progress);
            }
        }
    }

    drawTrunk(centerX, baseY, height, progress) {
        const trunkWidth = 25 * progress;
        
        // Trunk gradient
        const trunkGradient = this.ctx.createLinearGradient(centerX - trunkWidth, baseY, centerX + trunkWidth, baseY - height);
        trunkGradient.addColorStop(0, '#5D4037');
        trunkGradient.addColorStop(1, '#8B4513');
        
        this.ctx.fillStyle = trunkGradient;
        this.ctx.beginPath();
        this.ctx.roundRect(centerX - trunkWidth/2, baseY - height, trunkWidth, height, trunkWidth/2);
        this.ctx.fill();
        
        // Add bark texture
        this.ctx.strokeStyle = '#4E342E';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < height; i += 8) {
            const y = baseY - i;
            const variation = Math.sin(i * 0.1) * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX - trunkWidth/2 + variation, y);
            this.ctx.lineTo(centerX + trunkWidth/2 + variation, y);
            this.ctx.stroke();
        }
    }

    drawMainBranch(startX, startY, angle, category, progress, branchIndex) {
        const branchLength = (80 + (category.match / 100) * 120) * progress;
        const branchWidth = (5 + (category.match / 100) * 10) * progress;
        const curvature = 0.3 + Math.sin(branchIndex) * 0.2; // Natural curve variation
        
        // Calculate end point with curvature
        const controlX = startX + Math.cos(angle) * branchLength * 0.5;
        const controlY = startY + Math.sin(angle) * branchLength * 0.5 - branchLength * curvature;
        const endX = startX + Math.cos(angle) * branchLength;
        const endY = startY + Math.sin(angle) * branchLength - branchLength * curvature * 0.5;
        
        // Draw curved branch
        this.drawCurvedBranch(startX, startY, controlX, controlY, endX, endY, branchWidth, this.getCategoryColor(category.name));
        
        // Draw sub-branches (careers)
        this.drawSubBranches(endX, endY, angle, category, progress);
        
        // Draw leaves/cluster at end
        this.drawLeafCluster(endX, endY, category, progress);
        
        // Draw category label
        if (progress > 0.8) {
            this.drawCategoryLabel(endX, endY, category, angle);
        }
    }

    drawCurvedBranch(startX, startY, controlX, controlY, endX, endY, width, color) {
        // Branch gradient
        const branchGradient = this.ctx.createLinearGradient(startX, startY, endX, endY);
        branchGradient.addColorStop(0, color);
        branchGradient.addColorStop(1, this.lightenColor(color, 30));
        
        this.ctx.strokeStyle = branchGradient;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        this.ctx.stroke();
    }

    drawSubBranches(branchX, branchY, parentAngle, category, progress) {
        const careerCount = Math.min(3, category.careers.length);
        
        category.careers.slice(0, careerCount).forEach((career, index) => {
            const subAngle = parentAngle + (index - (careerCount - 1) / 2) * (Math.PI / 6);
            const subLength = (30 + (career.match / 100) * 50) * progress;
            const subWidth = (2 + (career.match / 100) * 6) * progress;
            
            const subEndX = branchX + Math.cos(subAngle) * subLength;
            const subEndY = branchY + Math.sin(subAngle) * subLength;
            
            // Draw sub-branch
            this.ctx.strokeStyle = this.getCareerColor(career.match);
            this.ctx.lineWidth = subWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(branchX, branchY);
            this.ctx.lineTo(subEndX, subEndY);
            this.ctx.stroke();
            
            // Draw career leaf
            this.drawCareerLeaf(subEndX, subEndY, career, progress);
            
            // Store career position for interactivity
            if (!this.canvas.careerPoints) this.canvas.careerPoints = [];
            this.canvas.careerPoints.push({
                x: subEndX, 
                y: subEndY, 
                size: 8 + (career.match / 100) * 8,
                career
            });
        });
    }

    drawLeafCluster(x, y, category, progress) {
        const leafCount = 8;
        const baseSize = 15 * progress;
        const color = this.getCategoryColor(category.name);
        
        for (let i = 0; i < leafCount; i++) {
            const angle = (i / leafCount) * Math.PI * 2;
            const distance = 10 + Math.random() * 20;
            const leafX = x + Math.cos(angle) * distance * progress;
            const leafY = y + Math.sin(angle) * distance * progress;
            const size = baseSize * (0.7 + Math.random() * 0.6);
            
            this.drawLeaf(leafX, leafY, size, color);
        }
    }

    drawCareerLeaf(x, y, career, progress) {
        const size = (8 + (career.match / 100) * 8) * progress;
        const color = this.getCareerColor(career.match);
        
        this.drawLeaf(x, y, size, color);
    }

    drawLeaf(x, y, size, color) {
        // Leaf gradient
        const leafGradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
        leafGradient.addColorStop(0, this.lightenColor(color, 40));
        leafGradient.addColorStop(1, color);
        
        this.ctx.fillStyle = leafGradient;
        this.ctx.beginPath();
        
        // Draw leaf shape (slightly oval)
        this.ctx.ellipse(x, y, size, size * 0.7, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add leaf vein
        this.ctx.strokeStyle = this.lightenColor(color, 20);
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x - size * 0.3, y - size * 0.2);
        this.ctx.lineTo(x + size * 0.3, y + size * 0.2);
        this.ctx.stroke();
    }

    drawCategoryLabel(x, y, category, angle) {
        this.ctx.fillStyle = '#2d5016';
        this.ctx.font = `bold 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Adjust label position based on branch angle
        const offsetX = Math.cos(angle) * 25;
        const offsetY = Math.sin(angle) * 25;
        
        this.ctx.fillText(`${category.name}`, x + offsetX, y + offsetY);
        this.ctx.font = `12px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
        this.ctx.fillText(`${category.match}%`, x + offsetX, y + offsetY + 16);
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (
            0x1000000 + 
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
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

    getCareerColor(match) {
        if (match >= 85) return '#4bb543'; // Green
        if (match >= 70) return '#ffc107'; // Yellow
        return '#dc3545'; // Red
    }

    setupInteractivity() {
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    handleMouseMove(e) {
        if (this.isAnimating) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const career = this.getCareerAtPoint(x, y);
        
        if (career) {
            this.canvas.style.cursor = 'pointer';
            this.showTooltip(e.clientX, e.clientY, career);
        } else {
            this.canvas.style.cursor = 'default';
            this.hideTooltip();
        }
    }

    handleClick(e) {
        if (this.isAnimating) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const career = this.getCareerAtPoint(x, y);
        
        if (career) {
            this.showCareerDetails(career);
        }
    }

    getCareerAtPoint(x, y) {
        if (!this.canvas.careerPoints) return null;
        
        for (const point of this.canvas.careerPoints) {
            const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
            if (distance <= point.size) {
                return point.career;
            }
        }
        return null;
    }

    showTooltip(x, y, career) {
        this.tooltip.innerHTML = `
            <h4>${career.name}</h4>
            <div class="match">${career.match}% Match</div>
            <div>${career.description}</div>
        `;
        this.tooltip.style.left = (x + 10) + 'px';
        this.tooltip.style.top = (y + 10) + 'px';
        this.tooltip.classList.add('show');
    }

    hideTooltip() {
        this.tooltip.classList.remove('show');
    }

    showCareerDetails(career) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${career.name}</h2>
                <p><strong>Match Score:</strong> ${career.match}%</p>
                <p><strong>Description:</strong> ${career.description}</p>
                <p><strong>Average Salary:</strong> ${career.salary}</p>
                <p><strong>Job Growth Outlook:</strong> ${career.growth}</p>
                <p><strong>Key Skills Needed:</strong> ${career.skills.join(', ')}</p>
                <button class="btn" id="saveCareerBtn">Save Career</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#saveCareerBtn').addEventListener('click', () => {
            this.saveCareer(career);
            modal.remove();
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
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

// Initialize career tree visualization
const careerTreeVisualization = new CareerTreeVisualization();

// Setup interactivity after a short delay to ensure DOM is ready
setTimeout(() => {
    careerTreeVisualization.setupInteractivity();
}, 1000);