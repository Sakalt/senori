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

function openChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('hidden');
}

function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value;
    const chatMessages = document.getElementById('chat-messages');
    
    if (blackList.includes(message.toLowerCase())) {
        alert('このメッセージにはブラックリストの単語が含まれています。');
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
        <button onclick="inputCalc('.')">.</button>
        <button onclick="calculate()">=</button>
        <button onclick="inputCalc('/')">/</button>
        <br>
        <button onclick="clearCalc()">C</button>
    `;
}

function openCalculator() {
    createWindow('電卓', calculatorContent());
}

function inputCalc(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function calculate() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}

function clearCalc() {
    document.getElementById('calc-display').value = '';
}

function paintContent() {
    return `
        <canvas id="paint-canvas" width="500" height="500" style="border: 1px solid black;"></canvas>
        <br>
        <button onclick="clearCanvas()">クリア</button>
    `;
}

function openPaint() {
    createWindow('ペイント', paintContent());
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    let painting = false;

    canvas.addEventListener('mousedown', () => {
        painting = true;
        ctx.beginPath();
    });

    canvas.addEventListener('mouseup', () => {
        painting = false;
    });

    canvas.addEventListener('mousemove', draw);

    function draw(event) {
        if (!painting) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
}

function clearCanvas() {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function weatherContent() {
    return `
        <div id="weather-info">
            <p>天気情報を取得しています...</p>
        </div>
    `;
}

function openWeather() {
    createWindow('天気', weatherContent());
    fetchWeather();
}

function fetchWeather() {
    // ダミーデータを使用
    setTimeout(() => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <p>現在の天気: 晴れ</p>
            <p>気温: 25°C</p>
        `;
    }, 1000);
}

function cameraContent() {
    return `
        <video id="camera-stream" width="500" height="500" autoplay></video>
        <br>
        <button onclick="stopCamera()">カメラ停止</button>
    `;
}

function openCamera() {
    createWindow('カメラ', cameraContent());
    const video = document.getElementById('camera-stream');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            video.srcObject = stream;
            video.play();
        });
    }
}

function stopCamera() {
    const video = document.getElementById('camera-stream');
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => {
        track.stop();
    });

    video.srcObject = null;
}

function timerContent() {
    return `
        <input type="number" id="timer-input" placeholder="秒数を入力">
        <button onclick="startTimer()">開始</button>
        <div id="timer-display"></div>
    `;
}

function openTimer() {
    createWindow('タイマー', timerContent());
}

function startTimer() {
    const timerInput = document.getElementById('timer-input').value;
    const timerDisplay = document.getElementById('timer-display');
    let timeLeft = parseInt(timerInput);

    const interval = setInterval(() => {
        timerDisplay.textContent = `残り時間: ${timeLeft}秒`;
        timeLeft -= 1;
        if (timeLeft < 0) {
            clearInterval(interval);
            alert('タイマーが終了しました！');
        }
    }, 1000);
}

function clockContent() {
    return `
        <div id="clock-display"></div>
    `;
}

function openClock() {
    createWindow('時計', clockContent());
    const clockDisplay = document.getElementById('clock-display');
    setInterval(() => {
        const now = new Date();
        clockDisplay.textContent = now.toLocaleTimeString();
    }, 1000);
}

function settingsContent() {
    return `
        <h2>設定</h2>
        <label for="change-name">名前の変更:</label>
        <input type="text" id="change-name" placeholder="新しい名前を入力">
        <br><br>
        <label for="brightness">画面の明るさ:</label>
        <input type="range" id="brightness" min="0" max="100" value="50">
        <br><br>
        <button onclick="changeName()">名前を変更する</button>
        <button onclick="adjustBrightness()">明るさを調整する</button>
    `;
}

function openSettings() {
    createWindow('設定', settingsContent());
}

function changeName() {
    const newName = document.getElementById('change-name').value;
    if (newName) {
        localStorage.setItem('username', newName);
        alert(`名前が${newName}に変更されました！`);
    } else {
        alert('新しい名前を入力してください。');
    }
}

function adjustBrightness() {
    const brightnessValue = document.getElementById('brightness').value;
    document.body.style.opacity = brightnessValue / 100;
}
