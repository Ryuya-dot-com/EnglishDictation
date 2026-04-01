// --- 状態管理 ---
let allQuestions = [];
let playQueue = [];
let currentIndex = 0;
let mistakeCount = 0;
let settings = { mode: 'practice', type: 'sentence', count: 10 };

// --- DOM要素の取得 ---
const screens = {
    setup: document.getElementById('setup-screen'),
    play: document.getElementById('play-screen'),
    result: document.getElementById('result-screen')
};

// --- 初期化処理 ---
window.onload = async () => {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error("Network response was not ok");
        allQuestions = await response.json();
        // 音声エンジンを事前にロード
        speechSynthesis.getVoices();
    } catch (error) {
        alert("JSONデータの読み込みに失敗しました。ローカル環境で直接HTMLを開いている場合、ブラウザのセキュリティ制限(CORS)により読み込めないことがあります。GitHub Pages等にアップロードして確認してください。");
        console.error(error);
    }
};

// --- 画面切り替え ---
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// --- ゲーム開始 ---
document.getElementById('start-btn').addEventListener('click', () => {
    if (allQuestions.length === 0) return alert("データが読み込まれていません。");

    // 設定の取得
    settings.mode = document.getElementById('setting-mode').value;
    settings.type = document.getElementById('setting-type').value;
    settings.count = parseInt(document.getElementById('setting-count').value, 10);

    // 問題のシャッフルと抽出
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    playQueue = shuffled.slice(0, Math.min(settings.count, shuffled.length));
    
    currentIndex = 0;
    mistakeCount = 0;
    showScreen('play');
    loadQuestion();
});

// --- 問題の読み込みと表示 ---
function loadQuestion() {
    const q = playQueue[currentIndex];
    
    document.getElementById('progress-text').textContent = `問題: ${currentIndex + 1} / ${playQueue.length}`;
    document.getElementById('category-badge').textContent = q.category;
    document.getElementById('ja-text').textContent = q.ja;
    
    const displayEl = document.getElementById('en-display');
    const hintEl = document.getElementById('en-hint');
    const inputEl = document.getElementById('type-input');

    inputEl.value = "";
    inputEl.classList.remove('error');
    hintEl.textContent = "";

    if (settings.type === 'blank') {
        // 穴埋めモード
        displayEl.textContent = q.en.replace(q.blankWord, "[ " + "_".repeat(q.blankWord.length) + " ]");
        if (settings.mode === 'practice') hintEl.textContent = q.blankWord;
    } else {
        // フルセンテンスモード
        displayEl.textContent = " "; // プレースホルダー
        if (settings.mode === 'practice') hintEl.textContent = q.en;
    }

    // 自動で音声を再生
    setTimeout(() => playAudio(q.en), 300);
    inputEl.focus();
}

// --- 音声再生 (Web Speech API) ---
function playAudio(text) {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const uttr = new SpeechSynthesisUtterance(text);
    
    // 高品質な英語ボイスを優先的に探す
    const voices = speechSynthesis.getVoices();
    const engVoices = voices.filter(v => v.lang.startsWith('en'));
    const goodVoice = engVoices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Siri')) || engVoices[0];
    
    if (goodVoice) uttr.voice = goodVoice;
    uttr.rate = 0.85; // 高校生が聞き取りやすいよう少しゆっくり
    speechSynthesis.speak(uttr);
}

document.getElementById('audio-btn').addEventListener('click', () => {
    playAudio(playQueue[currentIndex].en);
    document.getElementById('type-input').focus();
});

// --- タイピング判定 ---
document.getElementById('type-input').addEventListener('input', (e) => {
    const q = playQueue[currentIndex];
    const targetText = settings.type === 'blank' ? q.blankWord : q.en;
    const inputText = e.target.value;
    const inputEl = document.getElementById('type-input');

    if (targetText.startsWith(inputText)) {
        inputEl.classList.remove('error');
        // 正解完了
        if (inputText === targetText) {
            inputEl.disabled = true; // 連続入力を防ぐ
            setTimeout(() => {
                inputEl.disabled = false;
                currentIndex++;
                if (currentIndex >= playQueue.length) {
                    showResult();
                } else {
                    loadQuestion();
                }
            }, 600); // 正解後の余韻
        }
    } else {
        // ミスタイプ
        inputEl.classList.add('error');
        mistakeCount++;
    }
});

// --- リザルト画面表示 ---
function showResult() {
    document.getElementById('res-total').textContent = playQueue.length;
    document.getElementById('res-miss').textContent = mistakeCount;
    showScreen('result');
}

document.getElementById('retry-btn').addEventListener('click', () => {
    showScreen('setup');
});