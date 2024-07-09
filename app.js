function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

function saveName() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        localStorage.setItem('username', userInput);
        alert(`ようこそ、${userInput}さん！`);
        document.getElementById('lock-screen').style.display = 'none';
    }
}

function openBrowser() {
    openApp('ブラウザ');
}

function openCalculator() {
    openApp('電卓');
}

function openWeatherApp() {
    openApp('天気アプリ');
}

function openNotepad() {
    openApp('Notepadアプリ');
}

function openPaintApp() {
    openApp('ペイントアプリ');
}

function openClockApp() {
    openApp('時計アプリ');
}

function openTaskManager() {
    openApp('タスクマネージャー');
}

function openSettings() {
    openApp('設定');
}

function openCamera() {
    openApp('カメラ');
}

function openFileExplorer() {
    openApp('ファイルエクスプローラー');
}

function openChat() {
    openApp('チャット');
}

function openApp(appName) {
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `<div class="app-window">${appName}が開かれました</div>`;
}

// ロック画面でEnterキーを押してログインする機能
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        saveName();
    }
});

// 初回訪問時の名前入力
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('lock-screen').style.display = 'none';
    } else {
        document.getElementById('lock-screen').style.display = 'flex';
    }
};
// ウィンドウを作成する関数
function createWindow(title, content) {
    const newWindow = document.createElement('div');
    newWindow.className = 'window';
    newWindow.innerHTML = `
        <div class="title-bar">
            ${title}
            <div>
                <button onclick="minimizeWindow(this)">−</button>
                <button onclick="maximizeWindow(this)">□</button>
                <button onclick="closeWindow(this)">×</button>
            </div>
        </div>
        <div class="content">${content}</div>
    `;
    document.body.appendChild(newWindow);
    makeDraggable(newWindow);
    return newWindow; // ウィンドウ要素を返す
}
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    const username = localStorage.getItem('username');

    function openChat() {
    document.getElementById('chat-window').style.display = 'block';
}

function closeChat() {
    document.getElementById('chat-window').style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    const username = localStorage.getItem('username');

    if (message && !blackList.includes(username)) {
        const chatMessages = document.getElementById('chat-messages');
        const newMessage = document.createElement('div');
        newMessage.innerHTML = `${username}: ${message} <button onclick="banUser('${username}')">Ban</button>`;
        chatMessages.appendChild(newMessage);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (blackList.includes(username)) {
        alert('あなたはブラックリストに追加されています。');
    }
}

function openApp(appName) {
    const appContainer = document.getElementById('app-container');
    const appWindow = document.createElement('div');
    appWindow.className = 'app-window';
    appWindow.innerHTML = `
        <div class="app-title-bar">
            <span>${appName}</span>
            <span>
                <button onclick="minimizeApp(this)">_</button>
                <button onclick="maximizeApp(this)">□</button>
                <button onclick="closeApp(this)">×</button>
            </span>
        </div>
        <div class="app-content">${appName}が開かれました</div>
    `;
    appContainer.appendChild(appWindow);
}

// ロック画面でEnterキーを押してログインする機能
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        saveName();
    }
});

// 初回訪問時の名前入力
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('lock-screen').style.display = 'none';
    } else {
        document.getElementById('lock-screen').style.display = 'flex';
    }
};

// ブラックリストにユーザーを追加する関数
function banUser(username) {
    if (!blackList.includes(username)) {
        blackList.push(username);
        alert(`${username}がブラックリストに追加されました。`);
    }
}

// ブラックリストからユーザーを削除する関数
function removeFromBlackList(username) {
    const index = blackList.indexOf(username);
    if (index > -1) {
        blackList.splice(index, 1);
        alert(`${username}がブラックリストから削除されました。`);
    }
}

function minimizeApp(button) {
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

function closeApp(button) {
    const appWindow = button.closest('.app-window');
    appWindow.remove();
}
function openApp(appName) {
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `<div class="app-window">${appName}が開かれました</div>`;
}

// ロック画面でEnterキーを押してログインする機能
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        saveName();
    }
});

// 初回訪問時の名前入力
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('lock-screen').style.display = 'none';
    } else {
        document.getElementById('lock-screen').style.display = 'flex';
    }
};


// ウィンドウをドラッグ可能にする関数
function makeDraggable(element) {
    let isMouseDown = false;
    let offsetX, offsetY;

    element.querySelector('.title-bar').addEventListener('mousedown', function (e) {
        isMouseDown = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        e.stopPropagation();
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (isMouseDown) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function () {
        isMouseDown = false;
    });
}

// ウィンドウを閉じる関数
function closeWindow(button) {
    button.closest('.window').remove();
}

// ウィンドウを最小化する関数
function minimizeWindow(button) {
    const window = button.closest('.window');
    window.style.display = 'none';
}

// ウィンドウを最大化する関数
function maximizeWindow(button) {
    const window = button.closest('.window');
    window.style.width = '100%';
    window.style.height = '100%';
}

// 電卓アプリを開く関数
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

// タスクマネージャーアプリを開く関数
function openTaskManager() {
    createWindow('タスクマネージャー', taskManagerContent());
}

function taskManagerContent() {
    return '<div id="task-list">タスク一覧をここに表示</div>';
}

// ブラウザアプリを開く関数
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

// 設定アプリを開く関数
function openSettings() {
    createWindow('設定', settingsContent());
}

function settingsContent() {
    return `
        <h2>設定</h2>
        <p>ここに設定内容を記述</p>
    `;
}

// スタートメニューの表示切替関数
function toggleStartMenu() {
    const menu = document.getElementById('start-menu-items');
    menu.classList.toggle('hidden');
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
function openNotepad() {
    createWindow('ノートパッド', notepadContent());
}

function notepadContent() {
    return `
        <textarea id="notepad-text" style="width: 100%; height: calc(100% - 40px);"></textarea>
    `;
}
const apiKey = 'YOUR_API_KEY'; // ここにあなたのAPIキーを入力してください

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
function startMenu() {
    const startMenuElement = document.getElementById('start-menu');
    if (startMenuElement.style.display === 'block') {
        startMenuElement.style.display = 'none';
    } else {
        startMenuElement.style.display = 'block';
    }
}
// app.js
function startMenu() {
    var startMenu = document.getElementById("start-menu");
    if (startMenu.style.display === "none") {
        startMenu.style.display = "block";
    } else {
        startMenu.style.display = "none";
    }
}

function openClockApp() {
    // Hide all other apps
    hideAllApps();

    // Display clock app
    var clockApp = document.getElementById("clockApp");
    clockApp.style.display = "block";

    // Start the clock
    updateClock();
}

function updateClock() {
    var now = new Date();
    var hours = formatTime(now.getHours());
    var minutes = formatTime(now.getMinutes());
    var seconds = formatTime(now.getSeconds());

    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    setTimeout(updateClock, 1000); // Update every second
}

function formatTime(time) {
    return (time < 10 ? "0" : "") + time;
}

function hideAllApps() {
    var apps = document.querySelectorAll(".app-container");
    apps.forEach(function(app) {
        app.style.display = "none";
    });
}
