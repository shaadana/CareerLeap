const passionProject = {
    async init() {
        this.renderGenerator();
    },

    renderGenerator() {
        const view = document.getElementById('view-passion-project');
        view.innerHTML = `
            <div class="simulator-container">
                <div class="view-header">
                    <h2 class="pixel-text">[ PROJECT GENERATOR: MISSION BRIEFING ]</h2>
                </div>
                
                <div class="sim-event-card" style="margin-top: 20px;">
                    <div class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="form-group">
                            <label class="pixel-label">INTERESTS / SKILLS</label>
                            <input type="text" id="pp-interests" placeholder="e.g. Coding, Art, Space..." class="pp-input">
                        </div>
                        <div class="form-group">
                            <label class="pixel-label">PRIMARY GOAL</label>
                            <input type="text" id="pp-goals" placeholder="e.g. Help climate, build app..." class="pp-input">
                        </div>
                        <div class="form-group">
                            <label class="pixel-label">OUTPUT TYPE</label>
                            <select id="pp-output-type" class="pp-input">
                                <option value="Application/Software">Application/Software</option>
                                <option value="Research Paper">Research Paper</option>
                                <option value="Social Campaign">Social Campaign</option>
                                <option value="Creative Work (Art/Music)">Creative Work (Art/Music)</option>
                                <option value="Business/Startup">Business/Startup</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="pixel-label">TIMEFRAME</label>
                            <select id="pp-timeframe" class="pp-input">
                                <option value="2 Weeks (Sprint)">2 Weeks (Sprint)</option>
                                <option value="1 Month (Camp)">1 Month (Camp)</option>
                                <option value="3 Months (Summer)">3 Months (Summer)</option>
                                <option value="Academic Year (Legacy)">Academic Year (Legacy)</option>
                            </select>
                        </div>
                        <div class="form-group" style="grid-column: span 2;">
                            <label class="pixel-label">EXTERNAL DATA / RESOURCES</label>
                            <textarea id="pp-resources" placeholder="Do you have access to any specific tools, mentors, or data?" class="pp-input" style="height: 80px;"></textarea>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" style="margin-top: 30px; width: 100%;" onclick="passionProject.generateProject()">[ GENERATE MISSION PLAN ]</button>
                    
                    <div id="project-output" style="margin-top: 32px;"></div>
                </div>
            </div>
        `;
    },

    async generateProject() {
        const interests = document.getElementById('pp-interests').value;
        const goals = document.getElementById('pp-goals').value;
        const outputType = document.getElementById('pp-output-type').value;
        const timeframe = document.getElementById('pp-timeframe').value;
        const resources = document.getElementById('pp-resources').value;
        const output = document.getElementById('project-output');

        if (!interests || !goals) {
            output.innerHTML = "<p style='color: var(--color-coral); font-family: \"VT323\", monospace;'>[ ERROR: REQUIRED FIELDS EMPTY ]</p>";
            return;
        }

        output.innerHTML = "<div class='loading'>SYNTHESIZING MISSION PARAMETERS...</div>";

        const prompt = `
            Generate a detailed Passion Project plan for a teen with:
            Interests: ${interests}
            Goals: ${goals}
            Target Output: ${outputType}
            Timeframe: ${timeframe}
            Resources: ${resources}
            
            Profile: ${JSON.stringify(State.user.profile || {})}
            
            Output as JSON:
            - title: Catchy project name
            - hook: One sentence on why it's impressive for college admissions.
            - vision: High-level overview of the final result.
            - milestones: Array of 4 strings (short descriptions) based on the ${timeframe} timeframe.
            - techStack: 3 suggested tools/technologies.
            - uniqueAngle: What makes this project stand out.
        `;

        const response = await AI.call(prompt, "You are a passion project mentor for high-achieving teens. Ensure the project is both ambitious and realistic.");
        const project = AI.parseJSON(response);

        if (project) {
            output.innerHTML = `
                <div class="result-card" style="border-left: 5px solid var(--accent-teal); animation: slideIn 0.5s ease;">
                    <h2 class="pixel-text" style="color: var(--accent-teal); font-size: 1.2rem;">MISSION: ${project.title}</h2>
                    <p style="font-family: 'VT323', monospace; font-size: 1.2rem; display: block; margin: 10px 0; color: var(--text-secondary); text-transform: uppercase;">[ ${project.hook} ]</p>
                    
                    <div style="margin: 20px 0; font-family: 'VT323', monospace; font-size: 1.3rem;">
                        <h3 style="color: var(--accent-blue);">VISION</h3>
                        <p>${project.vision}</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <h3 style="font-family: 'VT323', monospace; color: var(--accent-blue);">MILESTONES</h3>
                            <ul style="font-family: 'VT323', monospace; font-size: 1.1rem; list-style-type: '> ';">
                                ${project.milestones.map(m => {
                const text = typeof m === 'object' ? (m.description || m.title || m.step || JSON.stringify(m)) : m;
                return `<li>${text}</li>`;
            }).join('')}
                            </ul>
                        </div>
                        <div>
                            <h3 style="font-family: 'VT323', monospace; color: var(--accent-blue);">TECH STACK</h3>
                            <div class="tags">
                                ${project.techStack.map(t => `<span class="tag" style="background: rgba(0, 210, 255, 0.1); border: 1px solid var(--accent-blue);">${t}</span>`).join('')}
                            </div>
                            <h3 style="font-family: 'VT323', monospace; color: var(--accent-blue); margin-top: 15px;">UNIQUE ANGLE</h3>
                            <p style="font-family: 'VT323', monospace;">${project.uniqueAngle}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            output.innerHTML = "<p style='color: var(--color-coral);'>[ SYSTEM ERROR: FAILED TO GENERATE MISSION ]</p>";
        }
    }
};
