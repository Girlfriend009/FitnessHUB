const authLinks = document.getElementById('authLinks');
        const logoutLink = document.getElementById('logoutLink');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        // Mock user data
        const users = {
            'user1': 'password1',
            'user2': 'password2'
        };

        // Handle login
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;

            if (users[username] && users[username] === password) {
                alert('Login successful!');
                authLinks.classList.add('d-none');
                logoutLink.classList.remove('d-none');
                $('#loginModal').modal('hide'); // Hide the modal
            } else {
                alert('Invalid username or password.');
            }
        });

        // Handle logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            authLinks.classList.remove('d-none');
            logoutLink.classList.add('d-none');
            alert('You have logged out.');
        });

        // Handle reset
        document.getElementById('resetBtn').addEventListener('click', function() {
            usernameInput.value = '';
            passwordInput.value = '';
        });

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true
        });

        // Theme Toggle
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', () => {
            document.body.setAttribute('data-theme',
                document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
            themeIcon.classList.toggle('fa-moon');
            themeIcon.classList.toggle('fa-sun');
        });

        // Sound Effect for Book Now Button
    const clickSound = new Audio('click.mp3'); // Ensure this path is correct

      // Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        classCards.forEach(card => {
            // Show all classes if "all" is selected
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                // Check if the card has the correct class
                if (card.classList.contains(filterValue)) {
                    card.style.display = 'block'; // Show card
                } else {
                    card.style.display = 'none'; // Hide card
                }
            }
        });
    });
});


       // Booking Functionality for Book Now Button
    const bookButtons = document.querySelectorAll('.btn-book');

bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Play the click sound
        clickSound.currentTime = 0; // Reset sound to the start
        clickSound.play();

        alert('Booking functionality coming soon!');
    });
});

