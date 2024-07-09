let blackList = [];

function saveName() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        localStorage.setItem('username', userInput);
        alert(`ようこそ、${userInput}さん！`);
        document.getElementById('lock-screen').style.display = 'none';
    }
}

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('hidden');
}

function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value;
    const chatMessages = document.getElementById('chat-messages');
    
    if (blackList.includes(message.toLowerCase())) {
        alert('このメッセージには禁止ワードが含まれています。');
        return;
    }

    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    messageInput.value = '';
}

document.getElementById('user-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        saveName();
    }
});

function createWindow(title, content) {
    const appContainer = document.getElementById('app-container');

    const currentApps = appContainer.querySelectorAll('.app-window');
    currentApps.forEach(app => {
        app.style.display = 'none';
    });

    const appWindow = document.createElement('div');
    appWindow.classList.add('app-window');
    appWindow.innerHTML = `
        <div class="app-title-bar">
            <span>${title}</span>
            <button onclick="closeWindow(this)">✕</button>
        </div>
        <div class="app-content">
            ${content}
        </div>
    `;

    appContainer.appendChild(appWindow);
}

function closeWindow(button) {
    const appWindow = button.parentElement.parentElement;
    appWindow.style.display = 'none';
}

function openWindBrowser() {
    createWindow('ブラウザ', browserContent());
}

function browserContent() {
    return `
        <div>
            <input type="text" id="url-input" placeholder="URLを入力してください">
            <button onclick="navigate()">移動</button>
            <br><br>
            <iframe id="browser-frame" width="100%" height="400px" src=""></iframe>
        </div>
    `;
}

function navigate() {
    const urlInput = document.getElementById('url-input').value;
    const browserFrame = document.getElementById('browser-frame');
    
    if (isValidURL(urlInput)) {
        browserFrame.src = urlInput;
    } else {
        alert('有効なURLを入力してください。');
    }
}

function isValidURL(url) {
    const pattern = /^((http|https):\/\/)/;
    return pattern.test(url);
}

function openCalculator() {
    createWindow('電卓', calculatorContent());
}

function calculatorContent() {
    return `
        <div class="calculator">
            <input type="text" id="calc-display" disabled>
            <div>
                <button onclick="appendToDisplay('1')">1</button>
                <button onclick="appendToDisplay('2')">2</button>
                <button onclick="appendToDisplay('3')">3</button>
                <button onclick="performOperation('+')">+</button>
            </div>
            <div>
                <button onclick="appendToDisplay('4')">4</button>
                <button onclick="appendToDisplay('5')">5</button>
                <button onclick="appendToDisplay('6')">6</button>
                <button onclick="performOperation('-')">-</button>
            </div>
            <div>
                <button onclick="appendToDisplay('7')">7</button>
                <button onclick="appendToDisplay('8')">8</button>
                <button onclick="appendToDisplay('9')">9</button>
                <button onclick="performOperation('*')">*</button>
            </div>
            <div>
                <button onclick="clearDisplay()">C</button>
                <button onclick="appendToDisplay('0')">0</button>
                <button onclick="calculateResult()">=</button>
                <button onclick="performOperation('/')">/</button>
            </div>
        </div>
    `;
}

function appendToDisplay(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function performOperation(operation) {
    const display = document.getElementById('calc-display');
    display.value += ` ${operation} `;
}

function clearDisplay() {
    const display = document.getElementById('calc-display');
    display.value = '';
}

function calculateResult() {
    const display = document.getElementById('calc-display');
    display.value = eval(display.value);
}

function openClockApp() {
    createWindow('時計アプリ', clockAppContent());
    updateClock();
}

function clockAppContent() {
    return `
        <div>
            <h1 id="clock">00:00:00</h1>
        </div>
    `;
}

function updateClock() {
    const clockElement = document.getElementById('clock');
    
    const updateTime = () => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    };

    updateTime();
    setInterval(updateTime, 1000);
}

function openTimerApp() {
    createWindow('タイマー', timerAppContent());
}

function timerAppContent() {
    return `
        <div>
            <input type="number" id="timer-input" placeholder="秒数を入力してください">
            <button onclick="startTimer()">スタート</button>
            <button onclick="stopTimer()">ストップ</button>
            <h1 id="timer-display">00:00</h1>
        </div>
    `;
}

let timerInterval;

function startTimer() {
    const input = document.getElementById('timer-input').value;
    const display = document.getElementById('timer-display');
    let time = parseInt(input, 10);

    if (isNaN(time)) {
        alert('有効な時間を入力してください。');
        return;
    }

    display.textContent = formatTime(time);
    
    timerInterval = setInterval(() => {
        time -= 1;
        display.textContent = formatTime(time);
        
        if (time <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function openPaintApp() {
    createWindow('ペイント', paintAppContent());

    const canvas = document.getElementById('paint-canvas');
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', () => isPainting = false);
    canvas.addEventListener('mouseleave', () => isPainting = false);
}

function paintAppContent() {
    return `
        <div>
            <canvas id="paint-canvas" width="500" height="500" style="border:1px solid #000;"></canvas>
            <button onclick="clearCanvas()">クリア</button>
        </div>
    `;
}

let isPainting = false;
let lastX = 0;
let lastY = 0;

function startPainting(e) {
    isPainting = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function paint(e) {
    if (!isPainting) return;
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function clearCanvas() {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isPainting = false;
}
