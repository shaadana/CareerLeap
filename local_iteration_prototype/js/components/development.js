const developmentAgent = {
    async init() {
        if (!State.user.profile) {
            this.showError("Please complete the Diagnostic first!");
            return;
        }
        this.renderPathway();
    },

    async renderPathway() {
        const view = document.getElementById('view-development');
        view.innerHTML = `<div class="simulator-container"><div class="sim-event-card" style="text-align:center;"><h2>Generating Your Personalized Pathway...</h2></div></div>`;

        const profile = State.user.profile;
        const prompt = `
            Based on this student's profile, generate a personalized skill development pathway.
            Profile: ${JSON.stringify(profile)}
            
            Provide a JSON response with this exact structure:
            {
              "title": "The [Name] Path to [Career]",
              "skills": [
                { "name": "Skill Name", "description": "Short description", "resources": [{ "type": "Video", "title": "Resource Title" }] }
              ],
              "milestone": "A specific project description string"
            }
        `;

        const response = await AI.call(prompt, "Be specific and actionable.");
        const pathway = AI.parseJSON(response);

        if (pathway) {
            view.innerHTML = `
                <div class="simulator-container">
                    <div class="sim-event-card">
                        <h2>${pathway.title}</h2>
                        <div class="pathway-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px;">
                            ${pathway.skills.map(s => `
                                <div class="result-card">
                                    <h3 style="color: var(--accent-blue);">${s.name}</h3>
                                    <p style="font-size: 0.9rem; margin-bottom: 12px;">${s.description}</p>
                                    <h4>Curated Resources</h4>
                                    <ul>
                                        ${s.resources.map(r => `<li>📍 [${r.type}] ${r.title}</li>`).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                        <div class="result-card" style="margin-top: 24px; border-color: var(--accent-teal);">
                            <h3 style="color: var(--accent-teal);">Recommended Passion Project</h3>
                            <p>${typeof pathway.milestone === 'object' ? (pathway.milestone.description || pathway.milestone.title || JSON.stringify(pathway.milestone)) : pathway.milestone}</p>
                            <button class="btn btn-primary" style="margin-top: 16px; background: var(--accent-teal);" onclick="app.switchView('passion-project')">Plan This Project</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            this.showError("Failed to generate pathway.");
        }
    },

    showError(msg) {
        document.getElementById('view-development').innerHTML = `<p>${msg}</p>`;
    }
};
