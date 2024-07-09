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
