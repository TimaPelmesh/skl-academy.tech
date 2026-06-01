// Templates
const templates = {
    blank: {
        html: '',
        css: '',
        js: ''
    },
    hello: {
        html: `<div class="container">
  <span class="badge">SKL Academy</span>
  <h1>Привет, мир!</h1>
  <p>Это моя первая веб-страница в стиле сайта.</p>
</div>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f8fafc;
  color: #111827;
}

.container {
  text-align: center;
  max-width: 480px;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  margin-bottom: 16px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
}`,
        js: `console.log('Привет, мир!');`
    },
    sklHero: {
        html: `<section class="hero">
  <p class="eyebrow">Бесплатное обучение</p>
  <h1>Учись веб-разработке с SKL Academy</h1>
  <p class="lead">HTML, CSS, JavaScript и практика в одном месте.</p>
  <div class="actions">
    <button class="btn-primary" id="cta">Начать</button>
    <a href="#" class="btn-ghost">Курсы</a>
  </div>
</section>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(145deg, #111827 0%, #1e293b 55%, #312e81 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.hero {
  max-width: 560px;
  text-align: center;
  color: #fff;
}

.eyebrow {
  display: inline-block;
  margin: 0 0 16px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
}

h1 {
  margin: 0 0 16px;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.lead {
  margin: 0 0 28px;
  color: #cbd5e1;
  font-size: 1.05rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.btn-primary {
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  background: #4f46e5;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}

.btn-primary:hover {
  background: #4338ca;
}

.btn-ghost {
  padding: 14px 28px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.08);
}`,
        js: `document.getElementById('cta').addEventListener('click', () => {
  console.log('CTA нажата — добро пожаловать!');
  alert('Отличный старт! Продолжайте редактировать код.');
});`
    },
    sklCards: {
        html: `<div class="page">
  <h2>Наши направления</h2>
  <div class="grid">
    <article class="card">
      <span class="icon">📘</span>
      <h3>HTML & CSS</h3>
      <p>Основы вёрстки и современный дизайн.</p>
      <button class="card-btn">Открыть</button>
    </article>
    <article class="card featured">
      <span class="tag">Популярно</span>
      <span class="icon">⚡</span>
      <h3>JavaScript</h3>
      <p>Интерактив и логика в браузере.</p>
      <button class="card-btn">Открыть</button>
    </article>
    <article class="card">
      <span class="icon">🎯</span>
      <h3>Практика</h3>
      <p>Задачи и мини-проекты.</p>
      <button class="card-btn">Открыть</button>
    </article>
  </div>
</div>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  background: #f8fafc;
  color: #111827;
  padding: 32px 20px;
}

.page {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 28px;
  font-size: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  position: relative;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}

.card.featured {
  border-color: #c7d2fe;
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.12);
}

.tag {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 11px;
  font-weight: 600;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.1);
  padding: 4px 10px;
  border-radius: 999px;
}

.icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 12px;
}

h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

p {
  margin: 0 0 20px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}

.card-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}

.card-btn:hover {
  background: #4338ca;
}`,
        js: `document.querySelectorAll('.card-btn').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    console.log('Карточка', i + 1);
  });
});`
    },
    navbar: {
        html: `<header class="nav">
  <a class="logo" href="#">SKL Academy</a>
  <nav class="links">
    <a href="#" class="active">Главная</a>
    <a href="#">Курсы</a>
    <a href="#">Песочница</a>
  </nav>
  <button class="nav-btn" id="menuBtn">Меню</button>
</header>
<main class="content">
  <h1>Навигация сайта</h1>
  <p>Измените ссылки и стили в редакторе.</p>
</main>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  background: #f8fafc;
}

.nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.logo {
  font-weight: 700;
  color: #4f46e5;
  text-decoration: none;
  font-size: 1.1rem;
}

.links {
  display: flex;
  gap: 8px;
  flex: 1;
}

.links a {
  padding: 8px 14px;
  border-radius: 10px;
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 14px;
}

.links a:hover,
.links a.active {
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
}

.nav-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
}

.content {
  padding: 48px 24px;
  max-width: 640px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 12px;
}

p {
  color: #64748b;
  line-height: 1.6;
}`,
        js: `document.getElementById('menuBtn').addEventListener('click', () => {
  console.log('Мобильное меню — добавьте разметку!');
});`
    },
    badges: {
        html: `<section class="stats">
  <div class="stat">
    <strong>24/7</strong>
    <span>Доступ к материалам</span>
  </div>
  <div class="stat">
    <strong>12+</strong>
    <span>Курсов и модулей</span>
  </div>
  <div class="stat">
    <strong>100%</strong>
    <span>Бесплатно</span>
  </div>
  <div class="stat highlight">
    <strong>∞</strong>
    <span>Практики в песочнице</span>
  </div>
</section>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Montserrat', sans-serif;
  background: #f8fafc;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  max-width: 720px;
  width: 100%;
}

.stat {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
}

.stat.highlight {
  border-color: #a5b4fc;
  background: linear-gradient(180deg, #fff 0%, #eef2ff 100%);
}

.stat strong {
  display: block;
  font-size: 2rem;
  color: #4f46e5;
  margin-bottom: 8px;
}

.stat span {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}`,
        js: `console.log('Статистика — статичный блок без тяжёлых анимаций');`
    },
    tabs: {
        html: `<div class="wrap">
  <div class="tab-list" role="tablist">
    <button class="tab active" data-panel="html">HTML</button>
    <button class="tab" data-panel="css">CSS</button>
    <button class="tab" data-panel="js">JavaScript</button>
  </div>
  <div class="panels">
    <div class="panel active" id="html">Разметка структуры страницы.</div>
    <div class="panel" id="css">Стили, цвета и отступы.</div>
    <div class="panel" id="js">Логика и интерактив.</div>
  </div>
</div>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Montserrat', sans-serif;
  background: #f8fafc;
}

.wrap {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.tab-list {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  background: #f1f5f9;
}

.tab {
  flex: 1;
  padding: 14px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
}

.tab.active {
  background: #fff;
  color: #4f46e5;
  box-shadow: inset 0 -2px 0 #4f46e5;
}

.panels {
  padding: 24px;
}

.panel {
  display: none;
  color: #475569;
  line-height: 1.6;
}

.panel.active {
  display: block;
}`,
        js: `const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.panel;
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(id).classList.add('active');
    console.log('Вкладка:', id);
  });
});`
    },
    todo: {
        html: `<div class="app">
  <h2>Мои задачи</h2>
  <form id="addForm">
    <input type="text" id="taskInput" placeholder="Новая задача..." required>
    <button type="submit">Добавить</button>
  </form>
  <ul id="list">
    <li><label><input type="checkbox"> Изучить HTML</label></li>
    <li><label><input type="checkbox" checked> Сверстать карточку</label></li>
  </ul>
</div>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Montserrat', sans-serif;
  background: #f8fafc;
}

.app {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

h2 {
  margin: 0 0 20px;
  font-size: 1.25rem;
}

#addForm {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

button[type="submit"] {
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

li:last-child {
  border-bottom: none;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 15px;
}

label:has(input:checked) {
  color: #94a3b8;
  text-decoration: line-through;
}`,
        js: `const form = document.getElementById('addForm');
const list = document.getElementById('list');
const input = document.getElementById('taskInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.innerHTML = '<label><input type="checkbox"> ' + text + '</label>';
  list.appendChild(li);
  input.value = '';
  console.log('Добавлено:', text);
});`
    },
    pricing: {
        html: `<div class="plan">
  <p class="label">Тариф</p>
  <h2>Базовый</h2>
  <p class="price"><span>0</span> ₽</p>
  <ul>
    <li>Все курсы на сайте</li>
    <li>Песочница и практика</li>
    <li>Без ограничений по времени</li>
  </ul>
  <button class="cta">Начать бесплатно</button>
</div>`,
        css: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Montserrat', sans-serif;
  background: #f8fafc;
}

.plan {
  width: 100%;
  max-width: 320px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 32px 28px;
  text-align: center;
  box-shadow: 0 12px 32px rgba(79, 70, 229, 0.08);
}

.label {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #4f46e5;
}

h2 {
  margin: 0 0 12px;
}

.price {
  margin: 0 0 24px;
  font-size: 14px;
  color: #64748b;
}

.price span {
  font-size: 3rem;
  font-weight: 700;
  color: #111827;
}

ul {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  text-align: left;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #475569;
}

li::before {
  content: '✓ ';
  color: #4f46e5;
  font-weight: 700;
}

.cta {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #4f46e5;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}

.cta:hover {
  background: #4338ca;
}`,
        js: `document.querySelector('.cta').addEventListener('click', () => {
  console.log('Регистрация — демо-кнопка');
});`
    },
    button: {
        html: `<div class="container">
  <button class="btn" id="myButton">
    Нажми меня!
  </button>
  <p class="counter">Нажатий: <span id="count">0</span></p>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f8fafc;
}

.container {
  text-align: center;
}

.btn {
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: #4f46e5;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
}

.btn:hover {
  background: #4338ca;
}

.counter {
  margin-top: 24px;
  color: #64748b;
  font-size: 18px;
}

#count {
  color: #4f46e5;
  font-weight: 600;
}`,
        js: `let count = 0;
const button = document.getElementById('myButton');
const countSpan = document.getElementById('count');

button.addEventListener('click', () => {
  count++;
  countSpan.textContent = count;
  console.log('Клик! Счётчик:', count);
});`
    },
    card: {
        html: `<div class="card">
  <div class="card-image">
    <span class="emoji">🎨</span>
  </div>
  <div class="card-content">
    <h2 class="card-title">Красивая карточка</h2>
    <p class="card-text">
      Это пример карточки с современным дизайном. 
      Можно использовать для товаров, статей или проектов.
    </p>
    <div class="card-footer">
      <span class="price">$99</span>
      <button class="buy-btn">Купить</button>
    </div>
  </div>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f0f2f5;
}

.card {
  width: 320px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 16px 40px rgba(79, 70, 229, 0.15);
}

.card-image {
  height: 180px;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji {
  font-size: 64px;
}

.card-content {
  padding: 24px;
}

.card-title {
  margin: 0 0 12px;
  font-size: 20px;
  color: #1a1a2e;
}

.card-text {
  margin: 0 0 20px;
  color: #666;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: #4f46e5;
}

.buy-btn {
  padding: 10px 24px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.buy-btn:hover {
  background: #4338ca;
}`,
        js: `const buyBtn = document.querySelector('.buy-btn');

buyBtn.addEventListener('click', () => {
  alert('Товар добавлен в корзину!');
  console.log('Покупка совершена');
});`
    },
    form: {
        html: `<div class="form-container">
  <h1>Вход</h1>
  <form id="loginForm">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="your@email.com" required>
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input type="password" id="password" placeholder="••••••••" required>
    </div>
    <button type="submit" class="submit-btn">Войти</button>
  </form>
  <p class="signup-link">Нет аккаунта? <a href="#">Регистрация</a></p>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f8fafc;
}

.form-container {
  width: 360px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  margin: 0 0 32px;
  text-align: center;
  color: #1a1a2e;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.submit-btn:hover {
  background: #4338ca;
}

.signup-link {
  margin-top: 24px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.signup-link a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}`,
        js: `const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  console.log('Вход:', { email, password: '***' });
  alert('Добро пожаловать, ' + email + '!');
});`
    },
    flexbox: {
        html: `<div class="flex-container">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background: #f8fafc;
  box-sizing: border-box;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 40px);
}

.box {
  width: 100px;
  height: 100px;
  background: #4f46e5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
  cursor: pointer;
}

.box:hover {
  background: #4338ca;
}

/* Попробуйте изменить эти свойства! */
/*
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly
align-items: flex-start | flex-end | center | stretch | baseline
flex-direction: row | row-reverse | column | column-reverse
*/`,
        js: `const boxes = document.querySelectorAll('.box');

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    console.log('Клик по боксу', index + 1);
    box.style.background = \`hsl(\${Math.random() * 360}, 70%, 50%)\`;
  });
});`
    },
    grid: {
        html: `<div class="grid-container">
  <div class="item header">Header</div>
  <div class="item sidebar">Sidebar</div>
  <div class="item main">Main Content</div>
  <div class="item widget">Widget</div>
  <div class="item footer">Footer</div>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background: #f8fafc;
  box-sizing: border-box;
}

.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "header header header"
    "sidebar main widget"
    "footer footer footer";
  gap: 16px;
  min-height: calc(100vh - 40px);
}

.item {
  background: #4f46e5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; background: #6366f1; }
.main { grid-area: main; background: #818cf8; }
.widget { grid-area: widget; }
.footer { grid-area: footer; }

/* Попробуйте изменить grid-template-areas! */`,
        js: `const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('click', () => {
    const name = item.textContent;
    console.log('Клик по:', name);
  });
});

console.log('CSS Grid layout загружен!');
console.log('Попробуйте изменить grid-template-areas в CSS.');`
    }
};

// Theme
const THEME_STORAGE_KEY = 'skl-playground-theme';
const CM_THEMES = { light: 'eclipse', dark: 'darcula' };

// CodeMirror instances
let htmlEditor, cssEditor, jsEditor;

// DOM Elements
const preview = document.getElementById('preview');
const consoleOutput = document.getElementById('consoleOutput');
const tabs = document.querySelectorAll('.tab');
const editorContainers = document.querySelectorAll('.editor-container');
const mobileTabs = document.querySelectorAll('.mobile-tab');
const downloadBtn = document.getElementById('downloadBtn');
const refreshBtn = document.getElementById('refreshBtn');
const newTabBtn = document.getElementById('newTabBtn');
const resetBtn = document.getElementById('resetBtn');
const clearConsole = document.getElementById('clearConsole');
const dropdown = document.getElementById('templateDropdown');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    initTheme();
    initCodeMirror();
    setupEventListeners();
    if (!loadFromStorage()) {
        loadTemplate('sklHero');
    }
}

function isDarkTheme() {
    return document.body.classList.contains('dark-theme');
}

function applyCodeMirrorTheme() {
    const theme = isDarkTheme() ? CM_THEMES.dark : CM_THEMES.light;
    [htmlEditor, cssEditor, jsEditor].forEach(ed => {
        if (ed) ed.setOption('theme', theme);
    });
}

function applyPlaygroundThemeClasses(dark) {
    document.body.classList.toggle('dark-theme', dark);
    document.documentElement.classList.toggle('dark-theme', dark);
    applyCodeMirrorTheme();
}

function setPlaygroundTheme(dark, persist) {
    applyPlaygroundThemeClasses(dark);
    if (persist !== false) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
        } catch (e) { /* ignore */ }
    }
}

function togglePlaygroundTheme(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const willBeDark = !isDarkTheme();

    function apply() {
        setPlaygroundTheme(willBeDark, true);
    }

    try {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reducedMotion && typeof document.startViewTransition === 'function') {
            document.startViewTransition(apply);
            return;
        }
    } catch (err) { /* fallback below */ }

    document.body.classList.add('theme-switching');
    apply();
    window.setTimeout(() => document.body.classList.remove('theme-switching'), 320);
}

function readPreferredDarkTheme() {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'dark') return true;
        if (saved === 'light') return false;
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
        return false;
    }
}

function initTheme() {
    setPlaygroundTheme(readPreferredDarkTheme(), false);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', togglePlaygroundTheme);
    }
}

function initCodeMirror() {
    // HTML Editor
    htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
        mode: 'htmlmixed',
        theme: 'eclipse',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: false
    });

    // CSS Editor
    cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
        mode: 'css',
        theme: 'eclipse',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: false
    });

    // JS Editor
    jsEditor = CodeMirror.fromTextArea(document.getElementById('jsCode'), {
        mode: 'javascript',
        theme: 'eclipse',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: false
    });

    // Update preview on change
    const debounceUpdate = debounce(updatePreview, 400);
    htmlEditor.on('change', debounceUpdate);
    cssEditor.on('change', debounceUpdate);
    jsEditor.on('change', debounceUpdate);

    // Save to storage on change
    const debounceSave = debounce(saveToStorage, 1000);
    htmlEditor.on('change', debounceSave);
    cssEditor.on('change', debounceSave);
    jsEditor.on('change', debounceSave);

    applyCodeMirrorTheme();
}

function bindClick(el, handler) {
    if (el) el.addEventListener('click', handler);
}

function setupEventListeners() {
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });

    // Dropdown
    bindClick(dropdownToggle, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropdown) dropdown.classList.toggle('open');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const templateName = item.dataset.template;
            loadTemplate(templateName);
            if (dropdown) dropdown.classList.remove('open');
        });
    });

    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', (e) => e.stopPropagation());
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Buttons
    bindClick(downloadBtn, downloadHTML);
    bindClick(refreshBtn, updatePreview);
    bindClick(newTabBtn, openInNewTab);
    bindClick(clearConsole, () => { if (consoleOutput) consoleOutput.innerHTML = ''; });
    bindClick(resetBtn, () => {
        if (confirm('Сбросить код к шаблону Hero-блок?')) {
            loadTemplate('sklHero');
        }
    });

    // Mobile tabs
    mobileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const view = tab.dataset.view;
            mobileTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (view === 'preview') {
                document.body.classList.add('show-preview');
            } else {
                document.body.classList.remove('show-preview');
            }
        });
    });

    // Console messages from iframe
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'console') {
            const line = document.createElement('div');
            line.className = `console-line console-${e.data.level}`;
            line.textContent = e.data.args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            consoleOutput.appendChild(line);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
    });

    // Setup resizer
    setupResizer();
}

function switchTab(tabName) {
    tabs.forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabName);
    });
    
    editorContainers.forEach(c => {
        c.classList.toggle('active', c.id === `${tabName}-editor`);
    });

    // Refresh CodeMirror
    setTimeout(() => {
        if (tabName === 'html') htmlEditor.refresh();
        if (tabName === 'css') cssEditor.refresh();
        if (tabName === 'js') jsEditor.refresh();
    }, 10);
}

function loadTemplate(name) {
    const template = templates[name];
    if (!template) return;

    htmlEditor.setValue(template.html);
    cssEditor.setValue(template.css);
    jsEditor.setValue(template.js);

    updatePreview();
    saveToStorage();
}

function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const consoleOverride = `
    <script>
        (function() {
            const methods = ['log', 'warn', 'error', 'info'];
            methods.forEach(method => {
                const original = console[method];
                console[method] = function(...args) {
                    parent.postMessage({
                        type: 'console',
                        level: method,
                        args: args
                    }, '*');
                    original.apply(console, args);
                };
            });
            
            window.onerror = function(msg, url, line) {
                parent.postMessage({
                    type: 'console',
                    level: 'error',
                    args: ['Error: ' + msg + ' (line ' + line + ')']
                }, '*');
            };
        })();
    <\/script>`;

    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
    ${consoleOverride}
</head>
<body>
    ${html}
    <script>${js}<\/script>
</body>
</html>`;

    consoleOutput.innerHTML = '';
    preview.srcdoc = fullHTML;
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function saveToStorage() {
    try {
        const data = {
            html: htmlEditor.getValue(),
            css: cssEditor.getValue(),
            js: jsEditor.getValue()
        };
        localStorage.setItem('web-playground-code', JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save to localStorage');
    }
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem('web-playground-code');
        if (!saved) return false;
        const data = JSON.parse(saved);
        if (data.html === undefined) return false;
        htmlEditor.setValue(data.html);
        cssEditor.setValue(data.css || '');
        jsEditor.setValue(data.js || '');
        updatePreview();
        return true;
    } catch (e) {
        console.warn('Could not load from localStorage');
        return false;
    }
}

function downloadHTML() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const fullHTML = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
${css}
    </style>
</head>
<body>
    ${html}
    <script>
${js}
    <\/script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
}

function openInNewTab() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}<\/script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

function setupResizer() {
    const resizer = document.getElementById('resizer');
    const editorsPanel = document.querySelector('.editors-panel');
    if (!resizer || !editorsPanel) return;
    let isResizing = false;
    let startX, startWidth;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = editorsPanel.offsetWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const diff = e.clientX - startX;
        const newWidth = Math.max(300, Math.min(startWidth + diff, window.innerWidth - 300));
        editorsPanel.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            // Refresh CodeMirror after resize
            htmlEditor.refresh();
            cssEditor.refresh();
            jsEditor.refresh();
        }
    });
}
