const quizScreens = {
    setup: document.getElementById("quiz-setup-screen"),
    play: document.getElementById("quiz-play-screen"),
    result: document.getElementById("quiz-result-screen")
};

const quizElements = {
    sectionSelect: document.getElementById("quiz-section"),
    categorySelect: document.getElementById("quiz-category"),
    countSelect: document.getElementById("quiz-count"),
    orderSelect: document.getElementById("quiz-order"),
    setupStatus: document.getElementById("quiz-setup-status"),
    startBtn: document.getElementById("quiz-start-btn"),
    progressText: document.getElementById("quiz-progress-text"),
    sectionBadge: document.getElementById("quiz-section-badge"),
    categoryBadge: document.getElementById("quiz-category-badge"),
    scoreText: document.getElementById("quiz-score-text"),
    remainingText: document.getElementById("quiz-remaining-text"),
    instruction: document.getElementById("quiz-instruction"),
    questionText: document.getElementById("quiz-question-text"),
    options: document.getElementById("quiz-options"),
    liveFeedback: document.getElementById("quiz-live-feedback"),
    feedbackPanel: document.getElementById("quiz-feedback-panel"),
    feedbackTitle: document.getElementById("quiz-feedback-title"),
    correctText: document.getElementById("quiz-correct-text"),
    userText: document.getElementById("quiz-user-text"),
    pointText: document.getElementById("quiz-point-text"),
    nextBtn: document.getElementById("quiz-next-btn"),
    resultTotal: document.getElementById("quiz-result-total"),
    resultCorrect: document.getElementById("quiz-result-correct"),
    resultIncorrect: document.getElementById("quiz-result-incorrect"),
    resultAccuracy: document.getElementById("quiz-result-accuracy"),
    resultNote: document.getElementById("quiz-result-note"),
    reviewList: document.getElementById("quiz-review-list"),
    retryBtn: document.getElementById("quiz-retry-btn"),
    topBtn: document.getElementById("quiz-top-btn")
};

let allQuizItems = [];
let quizQueue = [];
let quizResults = [];
let currentQuizIndex = 0;
let currentAnsweredIndex = null;
let lastQuizSettings = null;

window.addEventListener("DOMContentLoaded", initGrammarQuiz);

async function initGrammarQuiz() {
    bindQuizEvents();

    try {
        const response = await fetch("docs/grammar-review-quiz.md");
        if (!response.ok) {
            throw new Error("quiz markdown not loaded");
        }

        const markdown = await response.text();
        allQuizItems = parseQuizMarkdown(markdown);
        populateSectionOptions();
        populateCategoryOptions();
        updateQuizSetupStatus();
        quizElements.startBtn.disabled = allQuizItems.length === 0;
    } catch (error) {
        console.error(error);
        quizElements.startBtn.disabled = true;
        quizElements.setupStatus.textContent = "問題データの読み込みに失敗しました。ローカルサーバー経由で開いてください。";
    }
}

function bindQuizEvents() {
    quizElements.sectionSelect.addEventListener("change", () => {
        populateCategoryOptions();
        updateQuizSetupStatus();
    });
    quizElements.categorySelect.addEventListener("change", updateQuizSetupStatus);
    quizElements.countSelect.addEventListener("change", updateQuizSetupStatus);
    quizElements.orderSelect.addEventListener("change", updateQuizSetupStatus);
    quizElements.startBtn.addEventListener("click", startQuizSession);
    quizElements.nextBtn.addEventListener("click", goToNextQuizQuestion);
    quizElements.retryBtn.addEventListener("click", () => {
        if (!lastQuizSettings) {
            showQuizScreen("setup");
            return;
        }
        startQuizSession(lastQuizSettings);
    });
    quizElements.topBtn.addEventListener("click", () => showQuizScreen("setup"));
}

function parseQuizMarkdown(markdown) {
    const lines = markdown.split(/\r?\n/);
    const items = [];
    let currentSection = "";
    let currentItem = null;

    for (const rawLine of lines) {
        const line = rawLine.trim();

        if (line.startsWith("## ")) {
            const title = line.replace(/^##\s+/, "").trim();
            if (/^\d+\.\s+/.test(title)) {
                currentSection = title;
            }
            continue;
        }

        if (line.startsWith("### ")) {
            if (isCompleteQuizItem(currentItem)) {
                items.push(currentItem);
            }
            currentItem = {
                section: currentSection || "未分類",
                category: line.replace(/^###\s+/, "").trim(),
                question: "",
                options: [],
                correctIndex: -1,
                explanation: ""
            };
            continue;
        }

        if (!currentItem) {
            continue;
        }

        const questionMatch = line.match(/^\*\*Q\.\*\*\s*(.+)$/);
        if (questionMatch) {
            currentItem.question = stripInlineMarkdown(questionMatch[1]);
            continue;
        }

        const optionMatch = line.match(/^(\d+)\.\s+(.+)$/);
        if (optionMatch) {
            currentItem.options.push(stripInlineMarkdown(optionMatch[2]));
            continue;
        }

        const correctMatch = line.match(/^\*\*正解\*\*:\s*`?(\d+)`?/);
        if (correctMatch) {
            currentItem.correctIndex = Number(correctMatch[1]) - 1;
            continue;
        }

        const pointMatch = line.match(/^\*\*ポイント\*\*:\s*(.+)$/);
        if (pointMatch) {
            currentItem.explanation = stripInlineMarkdown(pointMatch[1]);
        }
    }

    if (isCompleteQuizItem(currentItem)) {
        items.push(currentItem);
    }

    return items;
}

function isCompleteQuizItem(item) {
    return Boolean(
        item &&
        item.category &&
        item.question &&
        item.options.length === 4 &&
        item.correctIndex >= 0 &&
        item.explanation
    );
}

function stripInlineMarkdown(text) {
    return String(text)
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .trim();
}

function populateSectionOptions() {
    const sections = [...new Set(allQuizItems.map((item) => item.section))];
    quizElements.sectionSelect.innerHTML = '<option value="all">すべて</option>';
    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section;
        option.textContent = section;
        quizElements.sectionSelect.appendChild(option);
    });
}

function populateCategoryOptions() {
    const items = getFilteredQuizItems({
        section: quizElements.sectionSelect.value,
        category: "all"
    });
    const categories = [...new Set(items.map((item) => item.category))];
    const previous = quizElements.categorySelect.value;

    quizElements.categorySelect.innerHTML = '<option value="all">すべて</option>';
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        quizElements.categorySelect.appendChild(option);
    });

    if (categories.includes(previous)) {
        quizElements.categorySelect.value = previous;
    }
}

function readQuizSettings() {
    return {
        section: quizElements.sectionSelect.value,
        category: quizElements.categorySelect.value,
        count: quizElements.countSelect.value,
        order: quizElements.orderSelect.value
    };
}

function getFilteredQuizItems(filters) {
    return allQuizItems.filter((item) => {
        const sectionMatch = !filters.section || filters.section === "all" || item.section === filters.section;
        const categoryMatch = !filters.category || filters.category === "all" || item.category === filters.category;
        return sectionMatch && categoryMatch;
    });
}

function updateQuizSetupStatus() {
    const settings = readQuizSettings();
    const pool = getFilteredQuizItems(settings);
    const count = settings.count === "all" ? pool.length : Math.min(Number(settings.count), pool.length);

    if (pool.length === 0) {
        quizElements.setupStatus.textContent = "条件に合う問題がありません。セクションやカテゴリを見直してください。";
        quizElements.startBtn.disabled = true;
        return;
    }

    quizElements.startBtn.disabled = false;
    quizElements.setupStatus.textContent = `${pool.length}問から${count}問を出題します。`;
}

function startQuizSession(forcedSettings) {
    const settings = forcedSettings || readQuizSettings();
    const pool = getFilteredQuizItems(settings);

    if (pool.length === 0) {
        updateQuizSetupStatus();
        return;
    }

    const orderedPool = settings.order === "random" ? shuffleArray(pool) : [...pool];
    const count = settings.count === "all" ? orderedPool.length : Math.min(Number(settings.count), orderedPool.length);

    lastQuizSettings = { ...settings };
    quizQueue = orderedPool.slice(0, count);
    quizResults = [];
    currentQuizIndex = 0;
    currentAnsweredIndex = null;

    renderQuizQuestion();
    showQuizScreen("play");
}

function renderQuizQuestion() {
    const item = quizQueue[currentQuizIndex];
    if (!item) {
        renderQuizResults();
        return;
    }

    currentAnsweredIndex = null;
    quizElements.progressText.textContent = `問題: ${currentQuizIndex + 1} / ${quizQueue.length}`;
    quizElements.sectionBadge.textContent = item.section;
    quizElements.categoryBadge.textContent = item.category;
    quizElements.scoreText.textContent = `正解: ${quizResults.filter((result) => result.isCorrect).length}問`;
    quizElements.remainingText.textContent = `残り: ${quizQueue.length - currentQuizIndex}問`;
    quizElements.instruction.textContent = `${item.category} の見分け方を確認してください。`;
    quizElements.questionText.textContent = item.question;
    quizElements.liveFeedback.textContent = "最も適切なものを 1 つ選んでください。";
    quizElements.feedbackPanel.classList.add("hidden");
    quizElements.options.innerHTML = "";

    item.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "secondary-btn quiz-option-btn";
        button.innerHTML = `<strong>${index + 1}.</strong><span>${escapeHtml(option)}</span>`;
        button.addEventListener("click", () => submitQuizAnswer(index));
        quizElements.options.appendChild(button);
    });
}

function submitQuizAnswer(selectedIndex) {
    if (currentAnsweredIndex !== null) {
        return;
    }

    const item = quizQueue[currentQuizIndex];
    const optionButtons = [...quizElements.options.querySelectorAll(".quiz-option-btn")];
    const isCorrect = selectedIndex === item.correctIndex;
    currentAnsweredIndex = selectedIndex;

    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === item.correctIndex) {
            button.classList.add("is-correct");
        }
        if (index === selectedIndex && !isCorrect) {
            button.classList.add("is-wrong");
        }
    });

    quizResults.push({
        ...item,
        selectedIndex,
        isCorrect
    });

    quizElements.liveFeedback.textContent = isCorrect ? "正解です。" : "不正解です。ポイントを確認してください。";
    quizElements.feedbackTitle.textContent = isCorrect ? "正解です" : "ここを確認";
    quizElements.correctText.textContent = `${item.correctIndex + 1}. ${item.options[item.correctIndex]}`;
    quizElements.userText.textContent = `${selectedIndex + 1}. ${item.options[selectedIndex]}`;
    quizElements.pointText.textContent = item.explanation;
    quizElements.nextBtn.textContent = currentQuizIndex === quizQueue.length - 1 ? "結果を見る" : "次の問題へ";
    quizElements.feedbackPanel.classList.remove("hidden");
}

function goToNextQuizQuestion() {
    if (currentAnsweredIndex === null) {
        return;
    }

    currentQuizIndex += 1;
    if (currentQuizIndex >= quizQueue.length) {
        renderQuizResults();
        return;
    }

    renderQuizQuestion();
}

function renderQuizResults() {
    const correctCount = quizResults.filter((result) => result.isCorrect).length;
    const incorrectCount = quizResults.length - correctCount;
    const accuracy = quizResults.length === 0 ? 0 : Math.round((correctCount / quizResults.length) * 100);
    const missedItems = quizResults.filter((result) => !result.isCorrect);

    quizElements.resultTotal.textContent = String(quizResults.length);
    quizElements.resultCorrect.textContent = String(correctCount);
    quizElements.resultIncorrect.textContent = String(incorrectCount);
    quizElements.resultAccuracy.textContent = `${accuracy}%`;
    quizElements.resultNote.textContent = missedItems.length === 0
        ? "全問正解です。次は別カテゴリや全範囲で確認してください。"
        : `間違えた ${missedItems.length} 問を見直して、カテゴリの見分け方を固めましょう。`;

    quizElements.reviewList.innerHTML = "";
    if (missedItems.length === 0) {
        const card = document.createElement("div");
        card.className = "review-card is-clean";
        card.innerHTML = `
            <div class="review-header">
                <h4>復習候補はありません</h4>
                <span class="review-priority">All Correct</span>
            </div>
            <p>今回の範囲では迷いが少ない状態です。条件を変えてもう一度試せます。</p>
        `;
        quizElements.reviewList.appendChild(card);
    } else {
        missedItems.forEach((item) => {
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
                <div class="review-header">
                    <h4>${escapeHtml(item.category)}</h4>
                    <span class="review-priority">${escapeHtml(item.section)}</span>
                </div>
                <p class="review-diff">${escapeHtml(item.question)}</p>
                <p><strong>正解:</strong> ${escapeHtml(`${item.correctIndex + 1}. ${item.options[item.correctIndex]}`)}</p>
                <p><strong>あなたの選択:</strong> ${escapeHtml(`${item.selectedIndex + 1}. ${item.options[item.selectedIndex]}`)}</p>
                <p>${escapeHtml(item.explanation)}</p>
            `;
            quizElements.reviewList.appendChild(card);
        });
    }

    showQuizScreen("result");
}

function showQuizScreen(screenName) {
    Object.values(quizScreens).forEach((screen) => screen.classList.remove("active"));
    quizScreens[screenName].classList.add("active");
}

function shuffleArray(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
