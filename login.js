document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const resetBtn = document.getElementById("resetBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authLinks = document.getElementById("authLinks");
    const logoutLink = document.getElementById("logoutLink");

    console.log("Script loaded and DOM content is ready");

    // Логика показа/скрытия пароля
    const passwordToggle = document.createElement("button");
    passwordToggle.type = "button";
    passwordToggle.classList.add("btn", "btn-outline-secondary", "btn-sm");
    passwordToggle.textContent = "Show";
    passwordToggle.style.marginTop = "5px";

    passwordInput.parentNode.appendChild(passwordToggle);

    passwordToggle.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggle.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            passwordToggle.textContent = "Show";
        }
    });

    // Валидация email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // При нажатии кнопки "Login"
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Проверка email
        if (!isValidEmail(username)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Проверка логина и пароля
        if (username === "admin@example.com" && password === "1234") {
            console.log("Login successful");
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", "true");

            // Скрытие ссылок авторизации и показ кнопки "Logout"
            authLinks.classList.add("d-none");
            logoutLink.classList.remove("d-none");

            // Закрытие модального окна
            const modalElement = document.getElementById("loginModal");
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                console.log("Closing modal");
                modal.hide();
            }

            // Убираем возможные блокировки
            document.body.style.overflow = "auto";
        } else {
            console.log("Invalid login");
            alert("Invalid email or password.");
        }
    });

    // Сброс формы
    resetBtn.addEventListener("click", () => {
        console.log("Form reset");
        usernameInput.value = "";
        passwordInput.value = "";
    });

    // При нажатии кнопки "Logout"
    logoutBtn.addEventListener("click", () => {
        console.log("Logout button clicked");
        localStorage.removeItem("isLoggedIn");

        // Показ ссылок авторизации и скрытие кнопки "Logout"
        authLinks.classList.remove("d-none");
        logoutLink.classList.add("d-none");

        alert("You have logged out.");
    });

    // Проверка состояния логина при загрузке страницы
    if (localStorage.getItem("isLoggedIn") === "true") {
        console.log("User is already logged in");
        authLinks.classList.add("d-none");
        logoutLink.classList.remove("d-none");
    } else {
        authLinks.classList.remove("d-none");
        logoutLink.classList.add("d-none");
    }

    // Проверка на блокировку прокрутки
    window.addEventListener("scroll", () => {
        console.log("Page scrolled");
    });

    // Обработка прокрутки и блокировки интерфейса
    const modalElement = document.getElementById("loginModal");
    modalElement.addEventListener("hidden.bs.modal", () => {
        console.log("Modal closed, enabling scroll");
        document.body.style.overflow = "auto"; // Разблокировка прокрутки
    });
    
    // Дополнительно разблокируем страницу и задаём явный overflow
    document.body.style.overflow = "auto";
    console.log("Body overflow set to auto");
});

