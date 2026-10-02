const app = {
    init() {
        console.log("Career Leap Initializing...");
        this.setupEventListeners();
        this.loadState();
        this.handleInitialView();
        this.initBackground();
    },

    setupEventListeners() {
        document.querySelectorAll('#main-nav li').forEach(item => {
            item.addEventListener('click', () => {
                const view = item.getAttribute('data-view');
                this.switchView(view);
            });
        });
    },

    switchView(viewId) {
        console.log(`Switching to view: ${viewId}`);
        // Update Nav UI
        document.querySelectorAll('#main-nav li').forEach(li => li.classList.remove('active'));
        const activeNav = document.querySelector(`#main-nav li[data-view="${viewId}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Update Content UI
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));

        let viewElement = document.getElementById(`view-${viewId}`);
        if (!viewElement) {
            viewElement = this.createView(viewId);
        }

        viewElement.classList.add('active');
        this.onViewVisible(viewId);
    },

    createView(viewId) {
        const main = document.getElementById('main-content');
        const section = document.createElement('section');
        section.id = `view-${viewId}`;
        section.className = 'view';
        main.appendChild(section);
        return section;
    },

    onViewVisible(viewId) {
        switch (viewId) {
            case 'home':
                this.renderHomeView();
                break;
            case 'diagnostic':
                this.renderDiagnosticView();
                break;
            case 'simulator':
                this.renderSimulatorView();
                simulator.init();
                break;
            case 'development':
                this.renderSimpleView('view-development', 'DEVELOPMENT PATHWAY');
                developmentAgent.init();
                break;
            case 'college':
                this.renderSimpleView('view-college', 'COLLEGE HUB');
                collegeHub.init();
                break;
            case 'passion-project':
                this.renderSimpleView('view-passion-project', 'PROJECT GENERATOR');
                passionProject.init();
                break;
            case 'conversation':
                ciloMentor.renderTabView();
                break;
        }
    },

    renderHomeView() {
        const view = document.getElementById('view-home');
        view.innerHTML = `
            <div class="hero">
                <div class="hero-decoration left"><img src="assets/Cilo.png" alt="Cilo"></div>
                <h1>Welcome to <span class="accent-text">Career Leap</span></h1>
                <div class="hero-decoration right"><img src="assets/star.png" alt="Star"></div>
                <p class="subtitle" style="font-family: 'VT323', monospace; font-size: 1.8rem;">[ MISSION: TURN DREAMS INTO REALITY ]</p>
                <p class="ready-text" style="font-family: 'Press Start 2P', cursive; font-size: 0.8rem; margin-top: 20px; color: var(--accent-teal);">READY TO PLAY?</p>
            </div>
            <div id="cilo-intro">
                <div class="cilo-card" style="border: 4px solid var(--accent-teal); box-shadow: 8px 8px 0px rgba(46, 255, 161, 0.2);">
                    <div class="cilo-avatar" style="border-color: var(--accent-teal); box-shadow: var(--glow-green);"><img src="assets/Cilo.png" alt="Cilo"></div>
                    <div class="cilo-message">
                        <h3>[ HELLO, I'M CILO ]</h3>
                        <p style="font-family: 'VT323', monospace; font-size: 1.4rem;">I'm your AI mentor. I've prepared your career missions and college simulations. Shall we begin the journey?</p>
                        <button class="btn btn-primary" onclick="app.switchView('diagnostic')">START NEW GAME</button>
                    </div>
                </div>
            </div>
        `;
    },

    renderDiagnosticView() {
        const view = document.getElementById('view-diagnostic');
        view.innerHTML = `
            <div class="diagnostic-container">
                <div class="view-header">
                    <h2 class="pixel-text">[ CHARACTER CREATION: DIAGNOSTIC ]</h2>
                </div>
                <div id="diag-selection" class="sim-event-card" style="margin: 20px; border: none; box-shadow: none; text-align: center;">
                    <h3>SELECT MODE</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px; align-items: center; margin-top: 20px;">
                        <button class="btn btn-primary" onclick="diagnosticAgent.start()" style="width: 250px;">FULL MISSION (6 Qs)</button>
                        <button class="btn btn-primary" onclick="app.activateQuizDiag()" style="background: var(--accent-teal); color: #000; width: 250px;">ATTRIBUTES QUIZ (4 Qs)</button>
                        <button class="btn btn-primary" onclick="app.activateFastDiag()" style="background: var(--color-yellow); color: #000; width: 250px;">SPEEDRUN (3 Qs)</button>
                    </div>
                </div>
                <div id="diagnostic-chat-container" class="hidden">
                    <div id="diagnostic-chat"></div>
                    <div class="diagnostic-input-area">
                        <input type="text" id="diag-input" placeholder="Type your transmission...">
                        <button class="btn btn-primary" id="diag-send">SEND</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('diag-send').addEventListener('click', () => this.handleDiagnosticInput());
        document.getElementById('diag-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleDiagnosticInput();
        });
    },

    activateFastDiag() {
        document.getElementById('diag-selection').classList.add('hidden');
        document.getElementById('diagnostic-chat-container').classList.remove('hidden');
        document.querySelector('.diagnostic-input-area').classList.remove('hidden');
        diagnosticAgent.startFastMode();
    },

    activateQuizDiag() {
        diagnosticAgent.startQuizMode();
    },

    renderSimpleView(id, title) {
        const view = document.getElementById(id);
        view.innerHTML = `<h2 class="pixel-text" style="margin-bottom: 30px;">[ ${title} ]</h2><div class="loading">FETCHING DATA...</div>`;
    },

    renderSimulatorView() {
        const view = document.getElementById('view-simulator');
        view.innerHTML = `<h2 class="pixel-text" style="margin-bottom: 30px;">[ CAREER SIMULATOR ]</h2><div class="simulator-container">INITIALIZING WORLD...</div>`;
    },

    handleDiagnosticInput() {
        const input = document.getElementById('diag-input');
        const text = input.value;
        if (text) {
            diagnosticAgent.handleInput(text);
            input.value = '';
        }
    },

    loadState() {
        State.updateUI();
    },

    handleInitialView() {
        this.switchView('home');
    },

    initBackground() {
        this.generateStars();
        this.initCursorGlow();
    },

    generateStars() {
        const container = document.getElementById('star-container');
        if (!container) return;

        const clusterCount = 15;
        for (let i = 0; i < clusterCount; i++) {
            const cluster = document.createElement('div');
            cluster.className = 'star-cluster';
            cluster.style.left = `${Math.random() * 100}%`;
            cluster.style.top = `${Math.random() * 100}%`;

            const starCount = 5 + Math.floor(Math.random() * 5);
            for (let j = 0; j < starCount; j++) {
                const star = document.createElement('div');
                star.className = 'star-dot';
                const size = 1 + Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}px`;
                star.style.top = `${Math.random() * 100}px`;
                star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
                cluster.appendChild(star);
            }
            container.appendChild(cluster);
        }
    },

    initCursorGlow() {
        const glow = document.getElementById('cursor-glow');
        if (!glow) return;

        document.addEventListener('mousemove', (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
            glow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    }
};

window.onload = () => app.init();
