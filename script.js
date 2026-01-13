document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORS ---
    const authModal = document.getElementById('authModal');
    const closeBtn = document.querySelector('.close-btn'); // Matches your HTML
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    // UI State Elements
    const loggedOutUI = document.getElementById('logged-out-UI');
    const loggedInUI = document.getElementById('logged-in-UI');
    const userDisplayName = document.getElementById('user-display-name');

    // --- 1. MODAL CONTROL ---

    const closeModal = () => {
        authModal.style.display = 'none';
        // Reset forms if they exist
        document.getElementById('loginForm')?.reset();
        document.getElementById('registerForm')?.reset();
    };

    // Open Login (Sign In button)
    document.querySelectorAll('.signin').forEach(btn => {
        btn.onclick = (e) => {
            // Prevent login logic if it's the "Logout" button which shares the class
            if (btn.id === 'logout-btn') return; 
            
            e.preventDefault();
            loginContainer.style.display = 'block';
            if(registerContainer) registerContainer.style.display = 'none';
            authModal.style.display = 'flex'; // Use flex to center
        };
    });

    // Open Register (Get Started button)
    document.querySelectorAll('.get-started').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            loginContainer.style.display = 'none';
            if(registerContainer) registerContainer.style.display = 'block';
            authModal.style.display = 'flex';
        };
    });

    // Close button click
    if (closeBtn) closeBtn.onclick = closeModal;

    // Click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === authModal) closeModal();
    });

    // --- 2. AUTHENTICATION LOGIC ---

    const loginUser = (userData) => {
        localStorage.setItem("activeUser", JSON.stringify(userData));
        if (userDisplayName) userDisplayName.innerText = "Hello, " + userData.name;
        if (loggedOutUI) loggedOutUI.style.display = "none";
        if (loggedInUI) loggedInUI.style.display = "flex";
        closeModal();
    };

    // Check Login State on Load
    const savedUser = localStorage.getItem("activeUser");
    if (savedUser) {
        loginUser(JSON.parse(savedUser));
    }

    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPassword').value;
            const storedUser = localStorage.getItem(`userDB_${email}`);

            if (storedUser) {
                const userData = JSON.parse(storedUser);
                if (userData.pass === pass) {
                    loginUser(userData);
                } else {
                    alert("Incorrect password.");
                }
            } else {
                alert("Email not found. Please register.");
            }
        };
    }

    // Handle Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem("activeUser");
            window.location.reload();
        };
    }
});