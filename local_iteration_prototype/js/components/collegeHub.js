const collegeHub = {
    async init() {
        this.renderHub();
    },

    renderHub() {
        const view = document.getElementById('view-college');
        view.innerHTML = `
            <div class="simulator-container">
                <div class="hero" style="margin-bottom: 30px;">
                    <h1>College <span class="accent-text">Hub</span></h1>
                    <p style="font-family: 'VT323', monospace;">[ MISSION: STRATEGIC ADMISSIONS READINESS ]</p>
                </div>
                
                <div class="hub-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div class="sim-event-card" onclick="collegeHub.renderStrengthMeasurer()" style="cursor:pointer;">
                        <h3>💪 Application Strength</h3>
                        <p style="font-family: 'VT323', monospace;">[ FULL ANALYSIS ]</p>
                    </div>
                    <div class="sim-event-card" onclick="collegeHub.renderQuickCheck()" style="cursor:pointer; border-color: var(--color-yellow);">
                        <h3>⚡ Quick Check</h3>
                        <p style="font-family: 'VT323', monospace;">[ SPEED EVALUATION ]</p>
                    </div>
                    <div class="sim-event-card" onclick="collegeHub.renderEssayJudger()" style="cursor:pointer; grid-column: span 2;">
                        <h3>✍️ Essay Judger</h3>
                        <p style="font-family: 'VT323', monospace;">[ FEEDBACK TRANMISSION ]</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderStrengthMeasurer() {
        const view = document.getElementById('view-college');
        view.innerHTML = `
            <div class="simulator-container">
                <div class="sim-event-card">
                    <h2>Application Strength Measurer</h2>
                    <p>Input your academic and personal stats for an AI evaluation.</p>
                    <textarea id="app-stats" placeholder="e.g. GPA 3.8, SAT 1450, Robotics Club (3 years), Volunteered at hospital..." class="pp-input" style="height: 150px; margin-top: 16px;"></textarea>
                    <button class="btn btn-primary" style="margin-top: 16px;" onclick="collegeHub.evaluateStrength()">[ ANALYZE APPLICATION ]</button>
                    <div id="strength-result" style="margin-top: 24px; font-family: 'VT323', monospace; font-size: 1.2rem;"></div>
                </div>
                <button class="btn" onclick="collegeHub.init()">BACK</button>
            </div>
        `;
    },

    async evaluateStrength() {
        const stats = document.getElementById('app-stats').value;
        const resultDiv = document.getElementById('strength-result');
        if (!stats.trim()) return;

        resultDiv.innerHTML = "AI is evaluating your application stats...";

        const prompt = `Analyze this student's college application profile: "${stats}". Provide a detailed evaluation of strengths, weaknesses, and 3 actionable next steps. Use supportive, strategic language. Keep it structured.`;
        const response = await AI.call(prompt, "You are a senior college admissions strategist.");

        resultDiv.innerHTML = `<div class="reflection-text" style="white-space: pre-wrap;">${response}</div>`;
    },

    renderEssayJudger() {
        const view = document.getElementById('view-college');
        view.innerHTML = `
            <div class="simulator-container">
                <div class="sim-event-card">
                    <h2>AI Essay Judger</h2>
                    <p>Paste your essay below for deep structural and narrative feedback.</p>
                    <textarea id="essay-text" placeholder="Paste your essay here..." class="pp-input" style="height: 300px; margin-top: 16px;"></textarea>
                    <button class="btn btn-primary" style="margin-top: 16px;" onclick="collegeHub.judgeEssay()">[ REVIEW TRANSCRIPT ]</button>
                    <div id="essay-result" style="margin-top: 24px; font-family: 'VT323', monospace; font-size: 1.2rem;"></div>
                </div>
                <button class="btn" onclick="collegeHub.init()">BACK</button>
            </div>
        `;
    },

    async judgeEssay() {
        const essay = document.getElementById('essay-text').value;
        const resultDiv = document.getElementById('essay-result');
        if (!essay.trim()) return;

        resultDiv.innerHTML = "Critiquing your narrative mission...";

        const prompt = `Evaluate this college essay draft for narrative structure, authenticity, voice, and clarity. 
            Essay: "${essay}"
            Provide:
            1. Structural Advice
            2. Voice & Tone analysis
            3. 3-4 Specific improvement areas (do NOT rewrite it for them).`;

        const response = await AI.call(prompt, "You are an expert college essay coach who values the student's authentic voice.");
        resultDiv.innerHTML = `<div class="reflection-text" style="white-space: pre-wrap;">${response}</div>`;
    },

    renderQuickCheck() {
        const view = document.getElementById('view-college');
        view.innerHTML = `
            <div class="simulator-container">
                <div class="sim-event-card" style="border-color: var(--color-yellow);">
                    <h2>⚡ QUICK CHECK: SPEED EVALUATION</h2>
                    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                        <input type="text" id="qc-gpa" placeholder="GPA (e.g. 3.8)" class="qc-input">
                        <input type="text" id="qc-sat" placeholder="SAT/ACT (e.g. 1450 or N/A)" class="qc-input">
                        <input type="text" id="qc-ec" placeholder="Top Extracurricular (e.g. Robotics Captain)" class="qc-input">
                        <button class="btn btn-primary" style="background: var(--color-yellow); color: #000;" onclick="collegeHub.runQuickCheck()">[ RUN SPEED EVAL ]</button>
                    </div>
                    <div id="qc-result" style="margin-top: 24px; font-family: 'VT323', monospace; font-size: 1.2rem;"></div>
                </div>
                <button class="btn" onclick="collegeHub.init()">BACK</button>
            </div>
        `;
    },

    async runQuickCheck() {
        const gpa = document.getElementById('qc-gpa').value;
        const sat = document.getElementById('qc-sat').value;
        const ec = document.getElementById('qc-ec').value;
        const resultDiv = document.getElementById('qc-result');

        if (!gpa || !ec) {
            resultDiv.innerHTML = "[ ERROR: MISSING CORE STATS ]";
            return;
        }

        resultDiv.innerHTML = "CALCULATING PROBABILITY...";

        const prompt = `Perform a high-speed college application evaluation for a student with GPA ${gpa}, SAT ${sat}, and a top extracurricular of ${ec}. Provide a list of 3 strengths and 2 immediate focus areas. Keep it very concise (bullet points).`;
        const response = await AI.call(prompt, "You are a speed-focused admissions bot.");
        resultDiv.innerHTML = `<div style="white-space: pre-wrap;">${response}</div>`;
    }
};
