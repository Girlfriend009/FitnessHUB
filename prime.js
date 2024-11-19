// Получение ссылок и элементов
const toggleClockBtn = document.getElementById('toggleClockBtn');
const clock = document.getElementById('clock');
const digitalTime = document.getElementById('digitalTime');
const currentDate = document.getElementById('currentDate');
const themeToggle = document.querySelector('.theme-toggle');
const randomColorBtn = document.getElementById('randomColorBtn');
const tfvygb = document.getElementById('random');

// Элемент для вывода ошибки
let intervalId;
let isDarkTheme = localStorage.getItem('theme') === 'dark';

// Применение темы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Применение сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    isDarkTheme = savedTheme === 'dark';

    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.querySelector('i').classList.toggle('fa-moon', isDarkTheme);
    themeToggle.querySelector('i').classList.toggle('fa-sun', !isDarkTheme);
});

// Показ/скрытие часов
toggleClockBtn?.addEventListener('click', () => {
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
    document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${(now.getSeconds() / 60) * 360 + 90}deg)`;
    document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${(now.getMinutes() / 60) * 360 + (now.getSeconds() / 60) * 6 + 90}deg)`;
    document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${(now.getHours() % 12) / 12 * 360 + (now.getMinutes() / 60) * 30 + 90}deg)`;
    digitalTime.textContent = now.toLocaleTimeString();
    currentDate.textContent = now.toLocaleDateString();
}

// Переключение темы
themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.querySelector('i').classList.toggle('fa-moon', isDarkTheme);
    themeToggle.querySelector('i').classList.toggle('fa-sun', !isDarkTheme);
});

// Генерация случайного цвета
randomColorBtn?.addEventListener('click', () => {
    document.body.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    return '#' + Array.from({ length: 6 }).map(() => letters[Math.floor(Math.random() * 16)]).join('');
}

tfvygb?.addEventListener('click', () => {
    tfvygb.style.backgroundColor = 'red';
});

// Инициализация AOS
AOS.init({
    duration: 1000,
    once: true
});

// Звуковой эффект для кнопки бронирования
const clickSound = new Audio('click.mp3');

const bookButtons = document.querySelectorAll('.btn-book');
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
        alert('Booking functionality coming soon!');
    });
});

// Фильтрация карточек
const filterButtons = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        classCards.forEach(card => {
            card.style.display = (filterValue === 'all' || card.classList.contains(filterValue)) ? 'block' : 'none';
        });
    });
});
