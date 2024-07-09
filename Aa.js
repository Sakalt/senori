<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winder3.0</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="lock-screen">
        <input type="text" id="user-input" placeholder="名前を教えてください">
        <button onclick="saveName()">保存</button>
    </div>
    <button id="start-button" onclick="toggleStartMenu()">スタート</button>
    <div id="start-menu" class="animated-menu hidden">
        <ul id="start-menu-items">
            <li><button onclick="openBrowser()">ブラウザ</button></li>
            <li><button onclick="openCalculator()">電卓</button></li>
            <li><button onclick="openWeatherApp()">天気アプリ</button></li>
            <li><button onclick="openNotepad()">ノートパッド</button></li>
            <li><button onclick="openPaintApp()">ペイント</button></li>
            <li><button onclick="openClockApp()">時計アプリ</button></li>
            <li><button onclick="openTaskManager()">タスクマネージャー</button></li>
            <li><button onclick="openSettings()">設定</button></li>
            <li><button onclick="openCamera()">カメラ</button></li>
            <li><button onclick="openFileExplorer()">ファイルエクスプローラー</button></li>
            <li><button onclick="openChat()">チャット</button></li>
        </ul>
    </div>
    <div id="app-container"></div>
    <div id="chat-window" class="app-window">
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="メッセージを入力">
        <button onclick="sendMessage()">送信</button>
        <button onclick="closeChat()">閉じる</button>
    </div>
    <footer>
        <p>©windersoft(fiction)</p>
    </footer>
    <script defer src="app.js"></script>
</body>
</html>
/* styles.css */

/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body */
body {
    font-family: Arial, sans-serif;
    background: url('壁紙.jpg') no-repeat center center fixed;
    background-size: cover;
}

/* Lock Screen */
#lock-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    z-index: 1000;
}

#user-input {
    font-size: 1.5rem;
    padding: 10px;
    margin-right: 10px;
}

button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
}

/* Start Menu */
#start-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1001; /* Ensure it's above other elements */
}

#start-menu {
    position: fixed;
    top: 60px;
    left: 20px;
    width: 200px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 1000;
}

#start-menu-items {
    list-style-type: none;
    padding: 10px;
}

#start-menu-items li {
    margin-bottom: 5px;
}

#start-menu-items li button {
    display: block;
    width: 100%;
    padding: 8px;
    text-align: left;
    background-color: #fff;
    border: none;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}

#start-menu-items li button:hover {
    background-color: #e0e0e0;
}

/* Animated Menu */
.animated-menu {
    animation: fadeIn 0.5s ease-in-out;
}

.hidden {
    display: none;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* App Windows */
.app-window {
    position: fixed;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    max-height: 400px;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.5s ease-in-out forwards;
    z-index: 1001;
    overflow: hidden;
}

.app-title-bar {
    background: #393939;
    color: white;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.app-title-bar button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
}

/* Chat Window */
#chat-window {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 400px;
    background: white;
    border: 1px solid #ccc;
    display: none;
    flex-direction: column;
    z-index: 1001;
}

#chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    border-bottom: 1px solid #ccc;
}

#chat-input {
    padding: 10px;
    border: none;
    border-top: 1px solid #ccc;
    flex-shrink: 0;
}

/* Footer */
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    z-index: 1000;
}
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
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value;
    const chatMessages = document.getElementById('chat-messages');
    
    // Example of blackList functionality (not fully implemented)
    if (blackList.includes(message.toLowerCase())) {
        alert('This message contains blacklisted words.');
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

    // Close all other apps
    const currentApps = appContainer.querySelectorAll('.app-window');
    currentApps.forEach(app => {
        app.style.display = 'none';
    });

    // Create new app window
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

function calculatorContent() {
    return `
        <input type="text" id="calc-display" disabled>
        <br>
        <button onclick="inputCalc('1')">1</button>
        <button onclick="inputCalc('2')">2</button>
        <button onclick="inputCalc('3')">3</button>
        <button onclick="inputCalc('+')">+</button>
        <br>
        <button onclick="inputCalc('4')">4</button>
        <button onclick="inputCalc('5')">5</button>
        <button onclick="inputCalc('6')">6</button>
        <button onclick="inputCalc('-')">-</button>
        <br>
        <button onclick="inputCalc('7')">7</button>
        <button onclick="inputCalc('8')">8</button>
        <button onclick="inputCalc('9')">9</button>
        <button onclick="inputCalc('*')">*</button>
        <br>
        <button onclick="inputCalc('0')">0</button>
        <button onclick="inputCalc('/')">/</button>
        <button onclick="inputCalc('=')">=</button>
        <button onclick="inputCalc('C')">C</button>
    `;
}

function inputCalc(value) {
    const display = document.getElementById('calc-display');
    if (value === 'C') {
        display.value = '';
    } else if (value === '=') {
        display.value = eval(display.value);
    } else {
        display.value += value;
    }
}

function taskManagerContent() {
    return '<div id="task-list">タスク一覧をここに表示</div>';
}

function openTaskManager() {
    createWindow('タスクマネージャー', taskManagerContent());
}

function browserContent() {
    return `
        <input type="text" id="browser-url" placeholder="URLを入力">
        <button onclick="loadUrl()">移動</button>
        <iframe id="browser-frame" style="width: 100%; height: calc(100% - 30px);"></iframe>
    `;
}

function loadUrl() {
    const url = document.getElementById('browser-url').value;
    document.getElementById('browser-frame').src = url;
}

function openBrowser() {
    createWindow('ブラウザ', browserContent());
}

function settingsContent() {
    return `
        <h2>設定</h2>
        <p>ここに設定内容を記述</p>
    `;
}

function openSettings() {
    createWindow('設定', settingsContent());
}

function paintAppContent() {
    return `
        <canvas id="paint-canvas" width="400" height="300"></canvas>
        <br>
        <button onclick="clearCanvas()">クリア</button>
    `;
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

function cameraAppContent() {
    return `
        <video id="camera-stream" width="400" height="300" autoplay></video>
        <br>
        <button onclick="takeSnapshot()">スナップショット</button>
        <canvas id="camera-canvas" width="400" height="300" style="display: none;"></canvas>
    `;
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

function fileExplorerContent() {
    return `
        <div id="file-explorer">
            <ul id="file-list">
                <li>ファイル1.txt</li>
                <li>ファイル2.jpg</li>
                <li>フォルダ1
                    <ul>
                        <li>サブファイル1.txt</li>
                        <li>サブファイル2.jpg</li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
}

function openFileExplorer() {
    createWindow('ファイルエクスプローラー', fileExplorerContent());
}

function notepadContent() {
    return `
        <textarea id="notepad-text" style="width: 100%; height: calc(100% - 40px);"></textarea>
    `;
}

function openNotepad() {
    createWindow('ノートパッド', notepadContent());
}

const apiKey = 'eed0e1ad95aa9f7c9598eddb139a16f5'; // ここにあなたのAPIキーを入力してください

function weatherAppContent() {
    return `
        <div id="weather-info">
            <h2 id="weather-city"></h2>
            <p id="weather-description"></p>
            <p id="weather-temperature"></p>
            <p id="weather-humidity"></p>
        </div>
    `;
}

function openWeatherApp() {
    createWindow('天気', weatherAppContent());
    getWeatherData();
}

function getWeatherData() {
    const city = 'Tokyo'; // 取得したい都市の名前を設定
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cityElement = document.getElementById('weather-city');
            const descElement = document.getElementById('weather-description');
            const tempElement = document.getElementById('weather-temperature');
            const humidityElement = document.getElementById('weather-humidity');

            cityElement.textContent = data.name;
            descElement.textContent = `天気: ${data.weather[0].description}`;
            tempElement.textContent = `気温: ${data.main.temp} °C`;
            humidityElement.textContent = `湿度: ${data.main.humidity} %`;
        })
        .catch(error => {
            console.error('天気情報の取得に失敗しました。', error);
        });
}

function clockAppContent() {
    return `
        <div id="clockApp">
            <h2 id="hours"></h2>
            <h2 id="minutes"></h2>
            <h2 id="seconds"></h2>
        </div>
    `;
}

function openClockApp() {
    hideAllApps();
    createWindow('時計', clockAppContent());
    updateClock();
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

function hideAllApps() {
    const appContainers = document.querySelectorAll('.app-container .app-window');
    appContainers.forEach(app => {
        app.style.display = 'none';
    });
}
