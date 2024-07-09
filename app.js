let blackList = [];
let username = localStorage.getItem('username');

document.addEventListener('DOMContentLoaded', function() {
    if (!username) {
        showLockScreen();
    } else {
        hideLockScreen();
    }
});

function showLockScreen() {
    const lockScreen = document.getElementById('lock-screen');
    lockScreen.style.display = 'flex';
}

function hideLockScreen() {
    const lockScreen = document.getElementById('lock-screen');
    lockScreen.style.display = 'none';
}

function saveName() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        localStorage.setItem('username', userInput);
        username = userInput;
        alert(`ようこそ、${userInput}さん！`);
        hideLockScreen();
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

function openTaskManager() {
    createWindow('タスクマネージャー', taskManagerContent());
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

function openPaintApp() {
    createWindow('ペイント', paintAppContent());
}

function openCamera() {
    createWindow('カメラ', cameraAppContent());
}

function openPhotosApp() {
    createWindow('フォトス', photosAppContent());
}

function calculatorContent() {
    return `
        <div id="calculator">
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
            <button onclick="inputCalc('√')">√</button>
        </div>
    `;
}

function inputCalc(value) {
    const display = document.getElementById('calc-display');
    if (value === 'C') {
        display.value = '';
    } else if (value === '=') {
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = 'Error';
        }
    } else if (value === '√') {
        display.value = Math.sqrt(eval(display.value));
    } else {
        display.value += value;
    }
}

const apiKey = 'eed0e1ad95aa9f7c9598eddb139a16f5';

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
    const city = 'Tokyo';
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

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('hidden');
}

function openBrowser() {
    createWindow('ブラウザ', browserContent());
}

function browserContent() {
    return `
        <div id="browser">
            <input type="text" id="url-input" placeholder="URLを入力してください">
            <button onclick="loadPage()">読み込み</button>
            <iframe id="browser-frame" src="" frameborder="0"></iframe>
        </div>
    `;
}

function loadPage() {
    const urlInput = document.getElementById('url-input').value;
    const browserFrame = document.getElementById('browser-frame');
    browserFrame.src = urlInput;
}

function openPaintApp() {
    createWindow('ペイント', paintAppContent());
}

function paintAppContent() {
    return `
        <div id="paint">
            <canvas id="paint-canvas" width="800" height="600"></canvas>
            <br>
            <button onclick="clearCanvas()">クリア</button>
            <button onclick="exportCanvas()">RGBAエクスポート</button>
        </div>
    `;
}

let paintCanvas;
let paintContext;

function initPaintApp() {
    paintCanvas = document.getElementById('paint-canvas');
    paintContext = paintCanvas.getContext('2d');
    paintContext.lineWidth = 5;
    paintContext.lineCap = 'round';
    paintContext.strokeStyle = '#000000';

    paintCanvas.addEventListener('mousedown', startPaint);
    paintCanvas.addEventListener('mousemove', drawPaint);
    paintCanvas.addEventListener('mouseup', endPaint);
    paintCanvas.addEventListener('mouseout', endPaint);
}

function startPaint(event) {
    paintContext.beginPath();
    paintContext.moveTo(event.offsetX, event.offsetY);
    paintCanvas.addEventListener('mousemove', drawPaint);
}

function drawPaint(event) {
    paintContext.lineTo(event.offsetX, event.offsetY);
    paintContext.stroke();
}

function endPaint() {
    paintCanvas.removeEventListener('mousemove', drawPaint);
}

function clearCanvas() {
    paintContext.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
}

function exportCanvas() {
    const imageData = paintContext.getImageData(0, 0, paintCanvas.width, paintCanvas.height);
    const data = imageData.data;
    const rgbaValues = [];

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3] / 255; // Normalize alpha value

        rgbaValues.push(`rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`);
    }

    console.log('RGBA values:', rgbaValues);
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initPaintApp();
});
