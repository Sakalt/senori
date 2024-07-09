// App.js

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

function openCalculator() {
    createWindow('電卓', calculatorContent());
}

function openWeatherApp() {
    createWindow('天気アプリ', weatherAppContent());
}

function openNotepad() {
    createWindow('ノートパッド', notepadContent());
}

function openPaintApp() {
    createWindow('ペイント', paintAppContent());

    const canvas = document.getElementById('paint-canvas');
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', () => isPainting = false);
    canvas.addEventListener('mouseleave', () => isPainting = false);
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

function openClockApp() {
    createWindow('時計', clockAppContent());
    updateClock();
}

function clockAppContent() {
    return `
        <div>
            <span id="clock-display">00:00:00</span>
        </div>
    `;
}

function updateClock() {
    const clockElement = document.getElementById('clock-display');

    const updateTime = () => {
        const now = new Date();
        const hours = formatTime(now.getHours());
        const minutes = formatTime(now.getMinutes());
        const seconds = formatTime(now.getSeconds());
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    };

    updateTime();
    setInterval(updateTime, 1000);
}

function formatTime(time) {
    return (time < 10 ? "0" : "") + time;
}

function openTaskManager() {
    createWindow('タスクマネージャー', taskManagerContent());
}

function openSettings() {
    createWindow('設定', settingsContent());
}

function openCamera() {
    createWindow('カメラ', cameraAppContent());

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            const video = document.getElementById('camera-stream');
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.error('カメラの使用が許可されていません。', error);
        });
}

function takeSnapshot() {
    const video = document.getElementById('camera-stream');
    const canvas = document.getElementById('camera-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL('image/png');
    window.open(image);
}

function openFileExplorer() {
    createWindow('ファイルエクスプローラー', fileExplorerContent());
}

function openChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = 'block';
}

// ペイントアプリ
function paintAppContent() {
    return `
        <div>
            <canvas id="paint-canvas" width="800" height="600"></canvas>
            <br>
            <button onclick="clearCanvas()">クリア</button>
        </div>
    `;
}

// ブラウザアプリ
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
    // URLの簡易なバリデーション
    const pattern = /^((http|https):\/\/)/;
    return pattern.test(url);
}
