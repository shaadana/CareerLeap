const State = {
    user: {
        profile: JSON.parse(localStorage.getItem('cl_profile')) || null,
        history: JSON.parse(localStorage.getItem('cl_history')) || {
            simulations: [],
            conversations: []
        }
    },

    saveProfile(profileData) {
        this.user.profile = profileData;
        localStorage.setItem('cl_profile', JSON.stringify(profileData));
        this.updateUI();
    },

    updateUI() {
        const userNameEl = document.querySelector('.user-name');
        const userStatusEl = document.querySelector('.user-status');

        if (this.user.profile) {
            userNameEl.textContent = this.user.profile.name || 'Friend';
            userStatusEl.textContent = this.user.profile.careerInterest || 'Exploring';
        }
    }
};
