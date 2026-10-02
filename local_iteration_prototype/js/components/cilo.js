const ciloMentor = {
    messages: [],

    init() {
        console.log("Cilo Mentor initialized as tab.");
    },

    renderTabView() {
        const view = document.getElementById('view-conversation');
        view.innerHTML = `
            <div class="cilo-tab-container" style="display: flex; height: calc(100vh - 120px);">
                <div class="cilo-sidebar-info" style="width: 300px; padding: 30px; border-right: 4px solid var(--accent-teal); background: rgba(46, 255, 161, 0.05);">
                    <div class="pixel-frog-large" style="width: 150px; height: 150px; margin: 0 auto 20px auto;">
                        <img src="assets/Cilo.png" alt="Cilo" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <h2 class="pixel-text" style="font-size: 1rem; color: var(--accent-teal);">SYSTEM: CILO MENTOR</h2>
                    <p style="font-family: 'VT323', monospace; color: var(--accent-blue); font-size: 1.2rem; margin-top: 10px;">[ STATUS: ONLINE ]</p>
                    <p style="font-family: 'VT323', monospace; margin-top: 30px; font-size: 1.4rem; line-height: 1.4;">I recall your progress across all missions. Ask me anything, or request a strategic debrief.</p>
                </div>
                <div class="chat-main">
                    <div id="cilo-messages" class="chat-history"></div>
                    <div class="chat-input-area">
                        <input type="text" id="cilo-input" placeholder="Enter transmission...">
                        <button id="cilo-send" class="btn btn-primary">SEND</button>
                    </div>
                </div>
            </div>
        `;

        if (this.messages.length === 0) {
            this.addMessage("ai", "Greeting, Explorer. I am Cilo. How can I assist with your career or college strategy today?");
        } else {
            this.messages.forEach(m => this.renderMessage(m.role, m.text));
        }

        const input = document.getElementById('cilo-input');
        const sendBtn = document.getElementById('cilo-send');

        const sendMessage = () => {
            if (input.value.trim()) {
                this.handleChat(input.value);
                input.value = '';
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    },

    async handleChat(text) {
        this.addMessage("user", text);

        const context = `
            Student Profile: ${JSON.stringify(State.user.profile)}
            History: ${JSON.stringify(State.user.history)}
        `;

        const response = await AI.call(text, AI.prompts.cilo.system + "\nContext: " + context);
        if (response) {
            this.addMessage("ai", response);
        }
    },

    addMessage(role, text) {
        this.messages.push({ role, text });
        this.renderMessage(role, text);
    },

    renderMessage(role, text) {
        const container = document.getElementById('cilo-messages');
        if (!container) return;

        const msg = document.createElement('div');
        msg.className = `msg ${role}`;
        msg.textContent = text;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    }
};
