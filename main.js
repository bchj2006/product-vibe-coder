// Food Data
const foods = [
    { name: '매콤한 떡볶이', emoji: '🍡' },
    { name: '바삭한 치킨', emoji: '🍗' },
    { name: '따끈한 라면', emoji: '🍜' },
    { name: '육즙 가득 삼겹살', emoji: '🥓' },
    { name: '신선한 초밥', emoji: '🍣' },
    { name: '치즈 듬뿍 피자', emoji: '🍕' },
    { name: '담백한 샌드위치', emoji: '🥪' },
    { name: '불맛 나는 짜장면', emoji: '🥡' },
    { name: '영양 만점 비빔밥', emoji: '🥗' },
    { name: '시원한 냉면', emoji: '🧊' },
    { name: '든든한 국밥', emoji: '🍲' },
    { name: '달콤한 디저트', emoji: '🍰' },
    { name: '육회 비빔밥', emoji: '🐂' },
    { name: '부드러운 스테이크', emoji: '🥩' },
    { name: '매콤 달콤 닭강정', emoji: '🐔' }
];

// DOM Elements
const recommendBtn = document.getElementById('recommend-btn');
const foodName = document.getElementById('food-name');
const foodEmoji = document.getElementById('food-emoji');
const historyList = document.getElementById('history-list');

// State
let isSpinning = false;
const history = [];

/**
 * Get random food from list
 */
function getRandomFood() {
    const randomIndex = Math.floor(Math.random() * foods.length);
    return foods[randomIndex];
}

/**
 * Update UI with new food recommendation
 */
function recommendFood() {
    if (isSpinning) return;
    
    isSpinning = true;
    recommendBtn.textContent = '고르는 중...';
    recommendBtn.disabled = true;

    // Spinning Animation logic
    let counter = 0;
    const interval = setInterval(() => {
        const tempFood = getRandomFood();
        foodEmoji.textContent = tempFood.emoji;
        foodName.textContent = tempFood.name;
        counter++;

        // End animation
        if (counter > 15) {
            clearInterval(interval);
            finalizeSelection();
        }
    }, 80);
}

/**
 * Finalize selection and update history
 */
function finalizeSelection() {
    const finalFood = getRandomFood();
    
    // UI Update with Animation
    foodEmoji.textContent = finalFood.emoji;
    foodName.textContent = finalFood.name;
    
    // Scale animation for emphasis
    foodEmoji.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.4)' },
        { transform: 'scale(1)' }
    ], { duration: 500, easing: 'ease-out' });

    // Update history
    addToHistory(finalFood.name);

    // Reset state
    isSpinning = false;
    recommendBtn.textContent = '다시 추천받기';
    recommendBtn.disabled = false;
}

/**
 * Add recommended food to history list
 */
function addToHistory(name) {
    if (history.includes(name)) return;
    
    history.unshift(name);
    if (history.length > 5) history.pop(); // Keep last 5

    // Update History UI
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Event Listeners
recommendBtn.addEventListener('click', recommendFood);

// Initialize with a fun interaction
console.log('🚀 푸드 바이브 서비스가 시작되었습니다!');
