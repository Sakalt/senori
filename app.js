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
