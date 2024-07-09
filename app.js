// app.js

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
        alert('このメッセージには禁止されている言葉が含まれています。');
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
        <button onclick="inputCalc('.')">.</button>
        <button onclick="calculate()">=</button>
        <button onclick="inputCalc('/')">/</button>
        <br>
        <button onclick="clearCalc()">C</button>
    `;
}

function inputCalc(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function calculate() {
    const display = document.getElementById('calc-display');
    display.value = eval(display.value);
}

function clearCalc() {
    const display = document.getElementById('calc-display');
    display.value = '';
}

// Functions to open different apps
function openBrowser() {
    createWindow('ブラウザ', '<iframe src="https://www.google.com" width="100%" height="100%"></iframe>');
}

function openCalculator() {
    createWindow('電卓', calculatorContent());
}

function openWeatherApp() {
    createWindow('天気アプリ', '天気情報を表示します...');
}

function openNotepad() {
    createWindow('ノートパッド', '<textarea style="width: 100%; height: 90%;"></textarea>');
}

function openPaintApp() {
    createWindow('ペイント', 'ペイントアプリ...');
}

function openClockApp() {
    createWindow('時計アプリ', '時計を表示します...');
}

function openTaskManager() {
    createWindow('タスクマネージャー', 'タスク情報を表示します...');
}

function openSettings() {
    createWindow('設定', '設定オプションを表示します...');
}

function openCamera() {
    createWindow('カメラ', '<video autoplay></video>');
}

function openFileExplorer() {
    createWindow('ファイルエクスプローラー', 'ファイルを表示します...');
}

function openChat() {
    createWindow('チャット', `
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="メッセージを入力">
        <button onclick="sendMessage()">送信</button>
    `);
}
