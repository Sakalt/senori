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
