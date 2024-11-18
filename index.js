// Получение ссылок и элементов
const authLinks = document.getElementById('authLinks');
const logoutLink = document.getElementById('logoutLink');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const toggleClockBtn = document.getElementById('toggleClockBtn');
const clock = document.getElementById('clock');
const digitalTime = document.getElementById('digitalTime');
const currentDate = document.getElementById('currentDate');
const themeToggle = document.getElementById('themeToggle');
const randomColorBtn = document.getElementById('randomColorBtn');
const tfvygb = document.getElementById('random');

// Элемент для вывода ошибки
const emailError = document.getElementById('error-message'); // Элемент для ошибки почты

let intervalId;
let isDarkTheme = localStorage.getItem('theme') === 'dark'; // Получение темы из локального хранилища

// Применение темы при загрузке страницы
document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
themeToggle.querySelector('i').classList.toggle('fa-sun', !isDarkTheme);
themeToggle.querySelector('i').classList.toggle('fa-moon', isDarkTheme);

// Показ/скрытие часов
toggleClockBtn.addEventListener('click', () => {
    const isClockHidden = clock.style.display === 'none';
    clock.style.display = isClockHidden ? 'block' : 'none';
    digitalTime.style.display = isClockHidden ? 'block' : 'none';
    currentDate.style.display = isClockHidden ? 'block' : 'none';
    toggleClockBtn.textContent = isClockHidden ? 'Hide Clock' : 'Show Clock';

    if (isClockHidden) {
        startClock();
    } else {
        clearInterval(intervalId);
    }
});

// Функция для запуска часов
function startClock() {
    updateClock();
    intervalId = setInterval(updateClock, 1000);
}

// Функция для обновления времени
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${(seconds / 60) * 360 + 90}deg)`;
    document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${(minutes / 60) * 360 + (seconds / 60) * 6 + 90}deg)`;
    document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${(hours % 12) / 12 * 360 + (minutes / 60) * 30 + 90}deg)`;

    digitalTime.textContent = now.toLocaleTimeString();
    currentDate.textContent = now.toLocaleDateString();
}

// Данные пользователей
const users = {
    'akhmetovislam2005@gmail.com': 'kindking009',
    'user2': 'password2'
};

// Проверка корректности почты с помощью регулярного выражения
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// Авторизация пользователя
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Проверка почты
    if (!isValidEmail(username)) {
        // Добавляем ошибку в поле ввода
        usernameInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block'; // Показываем сообщение об ошибке
        return;
    } else {
        usernameInput.classList.remove('error');
        emailError.style.display = 'none'; // Убираем сообщение об ошибке
    }

    if (users[username] === password) {
        alert('Login successful!');
        authLinks.classList.add('d-none');
        logoutLink.classList.remove('d-none');
        document.getElementById('loginContainer').classList.add('d-none'); // Скрыть форму входа
    } else {
        alert('Invalid username or password.');
    }
});

// Выход из аккаунта
logoutLink.addEventListener('click', () => {
    authLinks.classList.remove('d-none');
    logoutLink.classList.add('d-none');
    document.getElementById('loginContainer').classList.remove('d-none'); // Показать форму входа
    alert('You have logged out.');
});

// Очистка полей ввода
document.getElementById('resetBtn').addEventListener('click', () => {
    usernameInput.value = '';
    passwordInput.value = '';
});

// Переключение темы с сохранением
themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light'); // Сохранение темы в локальном хранилище
    themeToggle.querySelector('i').classList.toggle('fa-sun', !isDarkTheme);
    themeToggle.querySelector('i').classList.toggle('fa-moon', isDarkTheme);
});

// Генерация случайного цвета
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    return '#' + Array.from({ length: 6 }).map(() => letters[Math.floor(Math.random() * 16)]).join('');
}

// Изменение цвета фона
randomColorBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = getRandomColor();
});

// Пример изменения цвета кнопки
tfvygb.addEventListener('click', () => {
    tfvygb.style.backgroundColor = 'red';
});
