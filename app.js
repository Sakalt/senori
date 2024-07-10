let blackList = [];

// ログイン関数
function saveName() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        localStorage.setItem('username', userInput);
        alert(`ようこそ、${userInput}さん！`);
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
    }
}

// スタートメニューの切り替え
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('hidden');
}

// メッセージ送信関数
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

// ウィンドウを作成する関数
function createWindow(title, content) {
    const appContainer = document.getElementById('app-container');

    // 既存のウィンドウを非表示にする
    const currentWindows = appContainer.querySelectorAll('.app-window');
    currentWindows.forEach(window => {
        window.style.display = 'none';
    });

    // 新しいウィンドウを作成して追加する
    const newWindow = document.createElement('div');
    newWindow.classList.add('app-window');
    newWindow.innerHTML = `
        <div class="app-title-bar" onmousedown="startDrag(event, this.parentElement)">
            <span>${title}</span>
            <button onclick="closeWindow(this)">✕</button>
        </div>
        <div class="app-content">
            ${content}
        </div>
    `;

    appContainer.appendChild(newWindow);
}

// ウィンドウを閉じる関数
function closeWindow(button) {
    const window = button.parentElement.parentElement;
    window.style.display = 'none';
}

// ウィンドウのドラッグ可能な実装
function startDrag(event, element) {
    event.preventDefault();
    const offsetX = event.clientX - element.getBoundingClientRect().left;
    const offsetY = event.clientY - element.getBoundingClientRect().top;

    function moveAt(e) {
        element.style.left = e.pageX - offsetX + 'px';
        element.style.top = e.pageY - offsetY + 'px';
    }

    function stopDrag() {
        document.removeEventListener('mousemove', moveAt);
        document.removeEventListener('mouseup', stopDrag);
    }

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', stopDrag);
}

// 電卓アプリ
function openCalculator() {
    createWindow('電卓', calculatorContent());
}

function calculatorContent() {
    return `
        <input type="text" id="calc-input" readonly>
        <div id="calc-buttons">
            <button onclick="appendCalcInput('7')">7</button>
            <button onclick="appendCalcInput('8')">8</button>
            <button onclick="appendCalcInput('9')">9</button>
            <button onclick="appendCalcInput('/')">/</button>
            <button onclick="appendCalcInput('4')">4</button>
            <button onclick="appendCalcInput('5')">5</button>
            <button onclick="appendCalcInput('6')">6</button>
            <button onclick="appendCalcInput('*')">*</button>
            <button onclick="appendCalcInput('1')">1</button>
            <button onclick="appendCalcInput('2')">2</button>
            <button onclick="appendCalcInput('3')">3</button>
            <button onclick="appendCalcInput('-')">-</button>
            <button onclick="appendCalcInput('0')">0</button>
            <button onclick="appendCalcInput('.')">.</button>
            <button onclick="calculateResult()">=</button>
            <button onclick="appendCalcInput('+')">+</button>
            <button onclick="appendCalcInput('√')">√</button>
            <button onclick="clearCalcInput()">C</button>
        </div>
    `;
}

function appendCalcInput(value) {
    const calcInput = document.getElementById('calc-input');
    if (value === '√') {
        calcInput.value = Math.sqrt(parseFloat(calcInput.value));
    } else {
        calcInput.value += value;
    }
}

function calculateResult() {
    const calcInput = document.getElementById('calc-input');
    try {
        calcInput.value = eval(calcInput.value);
    } catch {
        calcInput.value = 'Error';
    }
}

function clearCalcInput() {
    document.getElementById('calc-input').value = '';
}

// 時計アプリ
function openClockApp() {
    createWindow('時計', clockAppContent());
    updateClock();
}

function clockAppContent() {
    return `
        <div id="clock">
            <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
        </div>
    `;
}

function updateClock() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const updateTime = () => {
        const now = new Date();
        hoursElement.textContent = formatTime(now.getHours());
        minutesElement.textContent = formatTime(now.getMinutes());
        secondsElement.textContent = formatTime(now.getSeconds());
    };

    updateTime();
    setInterval(updateTime, 1000);
}

function formatTime(time) {
    return (time < 10 ? "0" : "") + time;
}

// ペイントアプリ
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
        <canvas id="paint-canvas" width="400" height="300"></canvas>
        <button onclick="clearCanvas()">クリア</button>
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
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';

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

// メモ帳アプリ
function openNotepad() {
    createWindow('メモ帳', notepadContent());
}

function notepadContent() {
    return `
        <textarea id="notepad-textarea" rows="10" cols="30"></textarea>
    `;
}

// ブラウザアプリ
function openWindBrowser() {
    createWindow('ブラウザ', browserContent());
}

function browserContent() {
    return `
        <input type="text" id="browser-url" placeholder="URLを入力">
        <button onclick="navigateToURL()">移動</button>
        <iframe id="browser-frame" width="100%" height="100%"></iframe>
    `;
}

function navigateToURL() {
    const url = document.getElementById('browser-url').value;
    const browserFrame = document.getElementById('browser-frame');
    browserFrame.src = url;
}
