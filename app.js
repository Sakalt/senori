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
function openBrowser() {
    createWindow('ブラウザ', browserContent());
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

function openCalculator() {
    createWindow('電卓', calculatorContent());
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

function openWeatherApp() {
    createWindow('天気', weatherAppContent());
    getWeatherData();
}

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

const apiKey = 'YOUR_API_KEY'; // ここにあなたのAPIキーを入力してください

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

function openNotepad() {
    createWindow('ノートパッド', notepadContent());
}

function notepadContent() {
    return `
        <textarea id="notepad-text" style="width: 100%; height: calc(100% - 40px);"></textarea>
    `;
}

function openPaintApp() {
    createWindow('ペイント', paintAppContent());
}

function paintAppContent() {
    return `
        <canvas id="paint-canvas" width="400" height="300"></canvas>
        <br>
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

function openCamera() {
    createWindow('カメラ', cameraAppContent());
}

function cameraAppContent() {
    return `
        <video id="camera-stream" width="400" height="300" autoplay></video>
        <br>
        <button onclick="takeSnapshot()">スナップショット</button>
        <canvas id="camera-canvas" width="400" height="300" style="display: none;"></canvas>
    `;
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

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        const video = document.getElementById('camera-stream');
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('カメラの使用が許可されていません。', error);
    });

function openFileExplorer() {
    createWindow('ファイルエクスプローラー', fileExplorerContent());
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

function openTaskManager() {
    createWindow('タスクマネージャー', taskManagerContent());
}

function taskManagerContent() {
    return '<div id="task-list">タスク一覧をここに表示</div>';
}

function openSettings() {
    createWindow('設定', settingsContent());
}

function settingsContent() {
    return `
        <h2>設定</h2>
        <p>ここに設定内容を記述</p>
    `;
}

function openChat() {
    const username = localStorage.getItem('username');
    if (!username) {
        alert('ログインしてください。');
        return;
    }
    document.getElementById('chat-window').style.display = 'block';
}

function sendMessage() {
    const message = document.getElementById('chat-input').value;
    const username = localStorage.getItem('username');
    if (!message) return;
    if (blackList.includes(username)) {
        alert('あなたはブラックリストに入っています。');
        return;
    }
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${message}`;
    document.getElementById('chat-messages').appendChild(messageElement);
    document.getElementById('chat-input').value = '';
}

function closeChat() {
    document.getElementById('chat-window').style.display = 'none';
}

function createWindow(title, content) {
    const appContainer = document.getElementById('app-container');
    const appWindow = document.createElement('div');
    appWindow.className = 'app-window';
    appWindow.innerHTML = `
        <div class="app-title-bar">
            <span>${title}</span>
            <button onclick="closeApp(this)">×</button>
        </div>
        <div class="app-content">
            ${content}
        </div>
    `;
    appContainer.appendChild(appWindow);
}

function closeApp(button) {
    const appWindow = button.closest('.app-window');
    appWindow.style.display = 'none';
}

function maximizeApp(button) {
    const appWindow = button.closest('.app-window');
    appWindow.style.width = '100%';
    appWindow.style.height = '100%';
    appWindow.style.top = '0';
    appWindow.style.left = '0';
}

function minimizeApp(button) {
    const appWindow = button.closest('.app-window');
    appWindow.style.bottom = '0';
}

function restoreApp(button) {
    const appWindow = button.closest('.app-window');
    appWindow.style.bottom = '10%';
}

document.addEventListener('DOMContentLoaded', function () {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('lock-screen').style.display = 'none';
    }
});
