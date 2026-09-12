// Події історії
const keyEvents = [
  { 
    title: "Бій під Крутами (1918 рік)", 
    short: "Студенти та курсанти стримали наступ більшовицьких військ на Київ.",
    full: "29 січня 1918 року біля залізничної станції Крути близько 500 українських студентів, юнаків та козаків протистояли 4-тисячній більшовицькій армії Муравйова.\n\nЗавдяки цьому затримано наступ ворога на 4 дні, що дало змогу УНР підписати Берестейський мирний договір і отримати міжнародне визнання."
  },
  { 
    title: "Акт Злуки УНР та ЗУНР (1919 рік)", 
    short: "Урочисте проголошення соборності українських земель на Софійському майдані.",
    full: "22 січня 1919 року відбулося об'єднання Західноукраїнської Народної Республіки та Української Народної Республіки в єдину якісну державну систему.\n\nЦя подія стала символом віковічного прагнення українців до соборності та єдності."
  }
];

// Географічні факти
const geoFacts = [
  { 
    title: "Амазонка — річка без жодного мосту", 
    short: "Найповноводніша річка планети. Вона не має жодного мосту через свій гігантський розлив.",
    full: "Амазонка скидає в Атлантичний океан близько 20% усієї прісної води річок планети.\n\nГоловна причина відсутності мостів — густі непрохідні джунглі та масштабні сезонні розливи, під час яких ширина річки збільшується в десятки разів."
  },
  { 
    title: "Гора Еверест (Джомолунгма)", 
    short: "Найвища вершина світу (8848,86 м), яка щороку зростає через рух тектонічних плит.",
    full: "Еверест розташований у Гімалаях на кордоні Непалу та Китаю.\n\nЧерез постійне зіткнення Індійської та Євразійської тектонічних плит Гімалайські гори продовжують підніматися, а сама вершина зростає приблизно на 4 міліметри на рік."
  }
];

// База питань для тесту "Перевір себе"
const quizQuestions = [
  {
    question: "Хто був першим Президентом незалежної України?",
    options: ["Михайло Грушевський", "Леонід Кравчук", "Леонід Кучма"],
    correct: 1,
    explanation: "Правильно! Леонід Кравчук був обраний першим Президентом України 1 грудня 1991 року."
  },
  {
    question: "Яке озеро є найглибшим у світі?",
    options: ["Озеро Байкал", "Озеро Верхнє", "Озеро Вікторія"],
    correct: 0,
    explanation: "Правильно! Глибина Байкалу сягає 1642 метрів."
  },
  {
    question: "В якому році було прийнято Конституцію України?",
    options: ["1991 рік", "1996 рік", "2004 рік"],
    correct: 1,
    explanation: "Правильно! Основний Закон України ухвалено 28 червня 1996 року."
  },
  {
    question: "Який океан є найбільшим за площею?",
    options: ["Атлантичний", "Індійський", "Тихий"],
    correct: 2,
    explanation: "Вірно! Тихий океан займає понад 178 мільйонів км²."
  }
];

let currentQuizIndex = 0;
let currentEvent = null;
let currentGeo = null;

// Ініціалізація сторінки
function initPage() {
  currentEvent = keyEvents[Math.floor(Math.random() * keyEvents.length)];
  document.getElementById('event-content').innerHTML = `<strong>${currentEvent.title}</strong> — ${currentEvent.short}`;

  currentGeo = geoFacts[Math.floor(Math.random() * geoFacts.length)];
  document.getElementById('geo-content').innerHTML = `<strong>${currentGeo.title}</strong> — ${currentGeo.short}`;

  currentQuizIndex = Math.floor(Math.random() * quizQuestions.length);
  renderQuizQuestion();
}

// Відображення питання
function renderQuizQuestion() {
  const quiz = quizQuestions[currentQuizIndex];
  document.getElementById('quiz-question').textContent = quiz.question;

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';

  quiz.options.forEach((optionText, idx) => {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    label.innerHTML = `<input type="radio" name="quiz" value="${idx}"> ${optionText}`;
    optionsContainer.appendChild(label);
  });

  const resultBox = document.getElementById('quiz-result');
  resultBox.style.display = 'none';
  resultBox.className = 'quiz-result';

  document.getElementById('quiz-submit-btn').style.display = 'inline-block';
  document.getElementById('quiz-next-btn').style.display = 'none';
}

// Перевірка відповіді
function checkQuizAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  const resultBox = document.getElementById('quiz-result');

  if (!selectedOption) {
    alert('Будь ласка, оберіть варіант відповіді!');
    return;
  }

  const answerIdx = parseInt(selectedOption.value);
  const quiz = quizQuestions[currentQuizIndex];

  if (answerIdx === quiz.correct) {
    resultBox.textContent = `🎯 ${quiz.explanation}`;
    resultBox.className = 'quiz-result correct';
  } else {
    resultBox.textContent = `❌ Неправильно. Спробуй ще раз або переходь до наступного питання!`;
    resultBox.className = 'quiz-result incorrect';
  }

  resultBox.style.display = 'block';
  document.getElementById('quiz-submit-btn').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'inline-block';
}

// Перехід до наступного питання
function loadNextQuestion() {
  currentQuizIndex = (currentQuizIndex + 1) % quizQuestions.length;
  renderQuizQuestion();
}

// Модальне вікно
function openModal(type) {
  const modal = document.getElementById('info-modal');
  const title = document.getElementById('modal-title');
  const text = document.getElementById('modal-text');

  if (type === 'event' && currentEvent) {
    title.textContent = `📜 ${currentEvent.title}`;
    text.textContent = currentEvent.full;
  } else if (type === 'geo' && currentGeo) {
    title.textContent = `🌍 ${currentGeo.title}`;
    text.textContent = currentGeo.full;
  }

  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('info-modal').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", initPage);
