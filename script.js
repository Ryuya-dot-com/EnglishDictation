const CATEGORY_TIPS = {
    "It to構文": "It is ... to の形を見つけて、to 不定詞が何を説明しているか確認しましょう。",
    "関係代名詞": "先行詞の直後に、who / which / that がどの名詞を説明しているか意識しましょう。",
    "分詞構文": "主節との意味関係を見て、分詞の時制と主語の一致を確認しましょう。",
    "仮定法過去": "現在の事実に反する仮定なので、if 節では過去形、主節では would を意識します。",
    "仮定法過去完了": "過去の事実に反する仮定では、if 節が had + 過去分詞、主節が would have + 過去分詞です。",
    "比較": "than や as ... as の形を先に見つけると、比較の軸をつかみやすくなります。",
    "倒置": "文頭の強調語に引かれて語順が変わるので、助動詞や be 動詞の位置を確認しましょう。",
    "疑問詞＋to不定詞": "疑問詞が to 不定詞とまとまって、方法や内容を表しているかを見ましょう。",
    "不定詞": "to + 動詞の原形が名詞・形容詞・副詞のどの働きをしているか整理しましょう。",
    "動名詞": "動詞の後ろが to か -ing かで意味が変わりやすいので、かたまりで覚えるのが有効です。",
    "現在分詞": "名詞を後ろから説明しているのか、進行の意味なのかを文脈で見分けましょう。",
    "過去分詞": "受け身や完了のニュアンスを持つことが多いので、前の名詞との関係を確認しましょう。",
    "使役動詞": "make / have / let の後ろは原形か過去分詞かが分かれやすいので、型で覚えると安定します。",
    "助動詞": "助動詞は話し手の気持ちを表します。義務・推量・可能のどれかを意識しましょう。",
    "最上級": "the + 最上級 + 範囲の表現まで含めて一つの形として押さえましょう。",
    "接続詞": "前後の文をどうつないでいるかを確認し、意味の流れから選ぶと聞き取りやすいです。",
    "条件文": "if 節と主節の時制の組み合わせを意識すると、形を再現しやすくなります。",
    "結果構文": "so ... that や such ... that のセットで結果を表す形を確認しましょう。",
    "too〜to構文": "too ... to は『あまりに〜なので...できない』というまとまりで捉えましょう。",
    "enough構文": "形容詞や副詞の後ろに enough、または名詞の前の enough の位置に注意しましょう。",
    "存在構文": "There is / are の後ろに本当の主語が来るので、数と動詞の一致を見ます。",
    "形式主語": "It が仮の主語で、that 節や to 不定詞が本当の内容を表していないか確認しましょう。",
    "慣用表現": "前置詞や動詞の組み合わせごと覚えると、聞こえたまま再現しやすくなります。",
    "受動態": "be 動詞 + 過去分詞の形と、誰に何をされたかの関係を確認しましょう。",
    "仮定法": "事実とのズレを表す表現なので、時制より『現実ではない』感覚を大事にしましょう。",
    "譲歩表現": "although や even if など、逆接の流れを作る語に注目すると文全体が整理できます。",
    "関係副詞": "where / when / why / how が先行詞をどう補足しているかを見ましょう。",
    "相関接続詞": "both A and B のようにペアで働くので、前半を聞いたら後半も予測できます。",
    "形式目的語": "it を仮の目的語として置き、その後ろの to 不定詞や that 節が本体です。",
    "It that構文": "強調構文では It is ... that ... の外枠を先に押さえると語順が安定します。",
    "仮定法現在": "提案や要求のあとに動詞の原形が来る点が特徴です。",
    "知覚動詞": "see / hear などの後ろは原形か -ing かで意味が変わるので、まとまりで覚えましょう。",
    "現在完了": "have + 過去分詞が『今につながる』感覚を持つことを意識しましょう。",
    "過去完了": "過去のある時点よりさらに前を表すので、基準になる過去も一緒に確認しましょう。",
    "目的構文": "so that や in order to など、目的を表す語句のまとまりに注目しましょう。",
    "完了不定詞": "to have + 過去分詞で、不定詞の内容が述語より前であることを表します。",
    "名詞節": "that 節や what 節が主語・目的語・補語のどこに入っているかを見ると整理できます。",
    "間接疑問": "疑問文でも語順は平叙文になるので、主語と動詞の並びに注意しましょう。"
};

const SHADOWING_BOUNDARY_WORDS = new Set([
    "if",
    "when",
    "while",
    "because",
    "although",
    "though",
    "that",
    "which",
    "who",
    "whose",
    "where",
    "after",
    "before",
    "since",
    "unless",
    "than",
    "to"
]);

const STORAGE_KEY = "english-dictation-history-v2";
const MISTAKE_BANK_KEY = "english-dictation-mistake-bank-v1";
const MAX_HISTORY_ITEMS = 15;

let allQuestions = [];
let questionLookup = new Map();
let playQueue = [];
let currentIndex = 0;
let results = [];
let validationIssues = [];
let currentQuestionState = null;
let studyHistory = [];
let mistakeBank = [];
let shadowingRecorder = null;
let shadowingRecorderStream = null;
let shadowingRecordChunks = [];
let shadowingRecordTimerId = null;
let shadowingPlaybackAudio = null;
let shadowingRecorderDiscardOnStop = false;
let settings = {
    mode: "practice",
    type: "sentence",
    count: 10,
    category: "all",
    difficulty: "all",
    speed: 0.9,
    translation: "show"
};

const screens = {
    setup: document.getElementById("setup-screen"),
    play: document.getElementById("play-screen"),
    result: document.getElementById("result-screen")
};

const elements = {
    startBtn: document.getElementById("start-btn"),
    retryBtn: document.getElementById("retry-btn"),
    retryMissedBtn: document.getElementById("retry-missed-btn"),
    nextBtn: document.getElementById("next-btn"),
    audioBtn: document.getElementById("audio-btn"),
    hintBtn: document.getElementById("hint-btn"),
    answerBtn: document.getElementById("answer-btn"),
    inputArea: document.getElementById("input-area"),
    typeInput: document.getElementById("type-input"),
    rulesBox: document.getElementById("rules-box"),
    setupStatus: document.getElementById("setup-status"),
    studyDashboard: document.getElementById("study-dashboard"),
    historySummary: document.getElementById("history-summary"),
    recommendedCategories: document.getElementById("recommended-categories"),
    mistakeBankSummary: document.getElementById("mistake-bank-summary"),
    quickReviewActions: document.getElementById("quick-review-actions"),
    progressText: document.getElementById("progress-text"),
    categoryBadge: document.getElementById("category-badge"),
    difficultyBadge: document.getElementById("difficulty-badge"),
    audioCount: document.getElementById("audio-count"),
    hintCount: document.getElementById("hint-count"),
    mistakeCount: document.getElementById("mistake-count"),
    focusSummary: document.getElementById("focus-summary"),
    focusPlan: document.getElementById("focus-plan"),
    jaText: document.getElementById("ja-text"),
    enDisplay: document.getElementById("en-display"),
    enHint: document.getElementById("en-hint"),
    liveFeedback: document.getElementById("live-feedback"),
    shadowingPanel: document.getElementById("shadowing-panel"),
    shadowingSummary: document.getElementById("shadowing-summary"),
    shadowingChunkPractice: document.getElementById("shadowing-chunk-practice"),
    shadowingChunkSummary: document.getElementById("shadowing-chunk-summary"),
    shadowingChunkButtons: document.getElementById("shadowing-chunk-buttons"),
    shadowingFinishBtn: document.getElementById("shadowing-finish-btn"),
    questionFeedback: document.getElementById("question-feedback"),
    questionFeedbackTitle: document.getElementById("question-feedback-title"),
    questionFeedbackSummary: document.getElementById("question-feedback-summary"),
    feedbackCorrectLabel: document.getElementById("feedback-correct-label"),
    feedbackUserLabel: document.getElementById("feedback-user-label"),
    feedbackCorrectText: document.getElementById("feedback-correct-text"),
    feedbackUserText: document.getElementById("feedback-user-text"),
    feedbackDiffText: document.getElementById("feedback-diff-text"),
    feedbackTags: document.getElementById("feedback-tags"),
    feedbackDiffVisual: document.getElementById("feedback-diff-visual"),
    feedbackCorrectDiff: document.getElementById("feedback-correct-diff"),
    feedbackUserDiff: document.getElementById("feedback-user-diff"),
    feedbackTipText: document.getElementById("feedback-tip-text"),
    feedbackNextStep: document.getElementById("feedback-next-step"),
    afterListeningSummary: document.getElementById("after-listening-summary"),
    feedbackChunkPractice: document.getElementById("feedback-chunk-practice"),
    feedbackChunkSummary: document.getElementById("feedback-chunk-summary"),
    feedbackChunkButtons: document.getElementById("feedback-chunk-buttons"),
    shadowingRecordingPanel: document.getElementById("shadowing-recording-panel"),
    shadowingRecordingSummary: document.getElementById("shadowing-recording-summary"),
    shadowingRecordBtn: document.getElementById("shadowing-record-btn"),
    shadowingPlaybackBtn: document.getElementById("shadowing-playback-btn"),
    feedbackAudioBtn: document.getElementById("feedback-audio-btn"),
    shadowingGoodBtn: document.getElementById("shadowing-good-btn"),
    shadowingAgainBtn: document.getElementById("shadowing-again-btn"),
    resTotal: document.getElementById("res-total"),
    resTotalLabel: document.getElementById("res-total-label"),
    resCorrect: document.getElementById("res-correct"),
    resCorrectLabel: document.getElementById("res-correct-label"),
    resMiss: document.getElementById("res-miss"),
    resMissLabel: document.getElementById("res-miss-label"),
    resAudio: document.getElementById("res-audio"),
    resAudioLabel: document.getElementById("res-audio-label"),
    resAccuracy: document.getElementById("res-accuracy"),
    resAccuracyLabel: document.getElementById("res-accuracy-label"),
    resShadowing: document.getElementById("res-shadowing"),
    resShadowingLabel: document.getElementById("res-shadowing-label"),
    progressNote: document.getElementById("progress-note"),
    weaknessList: document.getElementById("weakness-list"),
    patternList: document.getElementById("pattern-list"),
    reviewList: document.getElementById("review-list"),
    settingMode: document.getElementById("setting-mode"),
    settingType: document.getElementById("setting-type"),
    settingCount: document.getElementById("setting-count"),
    settingCategory: document.getElementById("setting-category"),
    settingDifficulty: document.getElementById("setting-difficulty"),
    settingSpeed: document.getElementById("setting-speed"),
    settingTranslation: document.getElementById("setting-translation")
};

window.onload = async () => {
    try {
        const response = await fetch("questions.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const rawQuestions = await response.json();
        const prepared = prepareQuestions(rawQuestions);
        allQuestions = prepared.questions;
        questionLookup = new Map(allQuestions.map((question) => [question.id, question]));
        validationIssues = prepared.issues;
        studyHistory = loadStudyHistory();
        mistakeBank = loadMistakeBank().filter((entry) => questionLookup.has(entry.questionId));

        populateCategoryOptions();
        syncModeDependentControls();
        updateSetupStatus();
        renderStudyDashboard();

        if (validationIssues.length > 0) {
            console.warn("Question data issues:", validationIssues);
        }

        if (window.speechSynthesis) {
            window.speechSynthesis.getVoices();
        }
    } catch (error) {
        alert("JSONデータの読み込みに失敗しました。ローカル環境で直接HTMLを開いている場合、ブラウザのセキュリティ制限により読み込めないことがあります。ローカルサーバー経由で確認してください。");
        console.error(error);
    }
};

Object.values(elements)
    .filter((element) => element instanceof HTMLSelectElement)
    .forEach((select) => {
        select.addEventListener("change", updateSetupStatus);
    });

elements.settingMode.addEventListener("change", syncModeDependentControls);

elements.recommendedCategories.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) {
        return;
    }

    elements.settingCategory.value = button.dataset.category;
    updateSetupStatus();
});

elements.quickReviewActions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-action]");
    if (!button || button.disabled) {
        return;
    }

    startQuickReviewSession(button.dataset.reviewAction);
});

elements.startBtn.addEventListener("click", () => {
    settings = readSettings();
    const pool = getFilteredQuestionPool(settings);

    if (pool.length === 0) {
        alert("条件に合う問題がありません。カテゴリや難易度を見直してください。");
        return;
    }

    const count = Math.min(settings.count, pool.length);
    startSession(shuffleArray(pool).slice(0, count));
});

elements.audioBtn.addEventListener("click", () => {
    if (!currentQuestionState) {
        return;
    }
    playAudio(currentQuestionState.question.en);
    if (settings.mode !== "shadowing") {
        elements.typeInput.focus();
    }
});

elements.hintBtn.addEventListener("click", () => {
    if (!currentQuestionState || currentQuestionState.finalized) {
        return;
    }

    currentQuestionState.hintsUsed += 1;
    elements.enHint.textContent = getHintText(currentQuestionState.question, currentQuestionState.hintsUsed);
    if (settings.mode === "shadowing") {
        elements.liveFeedback.textContent = currentQuestionState.hintsUsed >= 3
            ? "キーフレーズを出し切りました。次はスクリプトを見て、音声に重ねて声に出しましょう。"
            : "キーフレーズを更新しました。音のつながりと強弱を意識して重ね読みしてみましょう。";
    } else {
        elements.liveFeedback.textContent = currentQuestionState.hintsUsed >= 3
            ? "答えまで表示しています。音声と見比べて復習しましょう。"
            : "ヒントを更新しました。まだ自力で書けそうか確認してください。";
    }
    updateQuestionStats();
    if (settings.mode !== "shadowing") {
        elements.typeInput.focus();
    }
});

elements.answerBtn.addEventListener("click", () => {
    if (!currentQuestionState || currentQuestionState.finalized) {
        return;
    }

    if (settings.mode === "shadowing") {
        revealShadowingScript();
        return;
    }

    finalizeQuestion("revealed");
});

elements.feedbackAudioBtn.addEventListener("click", () => {
    if (!currentQuestionState || !currentQuestionState.finalized) {
        return;
    }
    playAudio(currentQuestionState.question.en);
});

elements.shadowingChunkButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chunk-index]");
    if (!button) {
        return;
    }
    playShadowingChunk(parseInt(button.dataset.chunkIndex, 10));
});

elements.feedbackChunkButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chunk-index]");
    if (!button) {
        return;
    }
    playShadowingChunk(parseInt(button.dataset.chunkIndex, 10));
});

elements.shadowingRecordBtn.addEventListener("click", () => {
    toggleShadowingRecording();
});

elements.shadowingPlaybackBtn.addEventListener("click", () => {
    playShadowingRecording();
});

elements.shadowingGoodBtn.addEventListener("click", () => {
    updateShadowingConfidence("ready");
});

elements.shadowingAgainBtn.addEventListener("click", () => {
    updateShadowingConfidence("again");
});

elements.shadowingFinishBtn.addEventListener("click", () => {
    if (!currentQuestionState || currentQuestionState.finalized) {
        return;
    }
    finalizeQuestion("shadowing");
});

elements.nextBtn.addEventListener("click", () => {
    if (!currentQuestionState || !currentQuestionState.finalized) {
        return;
    }

    cancelSpeech();
    stopShadowingPlayback();
    currentIndex += 1;
    if (currentIndex >= playQueue.length) {
        showResult();
    } else {
        loadQuestion();
    }
});

elements.retryBtn.addEventListener("click", () => {
    cancelSpeech();
    stopShadowingPlayback();
    stopShadowingRecording({ discard: true });
    releaseSessionRecordings(results);
    results = [];
    playQueue = [];
    currentIndex = 0;
    currentQuestionState = null;
    showScreen("setup");
    updateSetupStatus();
    renderStudyDashboard();
});

elements.retryMissedBtn.addEventListener("click", () => {
    const retryQueue = results
        .filter((result) => result.needsReview)
        .sort((left, right) => right.reviewPriority - left.reviewPriority)
        .map((result) => result.question);
    if (retryQueue.length === 0) {
        return;
    }
    startSession(retryQueue);
});

elements.typeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && currentQuestionState && !currentQuestionState.finalized) {
        event.preventDefault();
        finalizeQuestion("submitted");
    }
});

elements.typeInput.addEventListener("input", (event) => {
    if (!currentQuestionState || currentQuestionState.finalized) {
        return;
    }

    const targetText = getTargetText(currentQuestionState.question);
    const inputText = event.target.value;
    const comparison = compareAttempt(inputText, targetText);

    currentQuestionState.lastInput = inputText;

    if (comparison.isPrefix) {
        elements.typeInput.classList.remove("error");
        currentQuestionState.invalidStreak = false;
    } else {
        elements.typeInput.classList.add("error");
        if (!currentQuestionState.invalidStreak) {
            currentQuestionState.invalidStreak = true;
            currentQuestionState.mistakes += 1;
        }
    }

    updateLiveFeedback(comparison);
    updateQuestionStats();

    if (comparison.isExact) {
        finalizeQuestion("correct");
    }
});

function prepareQuestions(rawQuestions) {
    const issues = [];

    const questions = rawQuestions
        .map((question, index) => {
            const normalized = {
                ...question,
                id: question.id || `q-${index + 1}`,
                wordCount: countWords(question.en),
                difficulty: question.difficulty || deriveDifficulty(question.en),
                blankOccurrence: Number.isInteger(question.blankOccurrence) ? question.blankOccurrence : 1
            };

            const blankMatches = countWholeWordMatches(normalized.en, normalized.blankWord);
            normalized.blankMatches = blankMatches;
            normalized.canUseBlank = blankMatches >= normalized.blankOccurrence && blankMatches > 0;

            if (!normalized.en || !normalized.ja || !normalized.category) {
                issues.push(`Question ${index + 1}: required fields are missing.`);
            }

            if (!normalized.canUseBlank) {
                issues.push(`Question ${index + 1}: blankWord "${normalized.blankWord}" does not match the sentence safely.`);
            }

            if (blankMatches > 1 && !question.blankOccurrence) {
                issues.push(`Question ${index + 1}: blankWord "${normalized.blankWord}" appears ${blankMatches} times. Consider setting blankOccurrence.`);
            }

            return normalized;
        })
        .filter((question) => question.en && question.ja && question.category);

    return { questions, issues };
}

function populateCategoryOptions() {
    const categories = [...new Set(allQuestions.map((question) => question.category))].sort((a, b) => a.localeCompare(b, "ja"));

    elements.settingCategory.innerHTML = '<option value="all">すべてのカテゴリ</option>';
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        elements.settingCategory.appendChild(option);
    });
}

function readSettings() {
    const mode = elements.settingMode.value;
    const type = mode === "shadowing" ? "sentence" : elements.settingType.value;

    return {
        mode,
        type,
        count: parseInt(elements.settingCount.value, 10),
        category: elements.settingCategory.value,
        difficulty: elements.settingDifficulty.value,
        speed: parseFloat(elements.settingSpeed.value),
        translation: elements.settingTranslation.value
    };
}

function updateSetupStatus() {
    if (allQuestions.length === 0) {
        elements.setupStatus.textContent = "問題データを読み込み中です。";
        return;
    }

    const nextSettings = readSettings();
    const pool = getFilteredQuestionPool(nextSettings);
    const poolNotice = nextSettings.mode === "shadowing"
        ? `シャドーイング対応 ${pool.length}問`
        : nextSettings.type === "blank"
            ? `穴埋め対応 ${pool.length}問`
            : `${pool.length}問が条件に一致`;
    const validationNotice = validationIssues.length > 0
        ? ` / データ注意 ${validationIssues.length}件`
        : "";
    const modeNotice = nextSettings.mode === "shadowing"
        ? "音声だけで聞く -> スクリプトを重ねる -> 音読を自己評価する流れで進みます。"
        : "採点は大文字・句読点を無視し、結果画面で復習ポイントを確認できます。";

    elements.setupStatus.textContent = `${poolNotice}${validationNotice}。${modeNotice}`;
}

function syncModeDependentControls() {
    const isShadowing = elements.settingMode.value === "shadowing";
    if (isShadowing) {
        elements.settingType.value = "sentence";
    }
    elements.settingType.disabled = isShadowing;
}

function loadStudyHistory() {
    try {
        const rawValue = window.localStorage.getItem(STORAGE_KEY);
        if (!rawValue) {
            return [];
        }
        const parsed = JSON.parse(rawValue);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Failed to load study history.", error);
        return [];
    }
}

function loadMistakeBank() {
    try {
        const rawValue = window.localStorage.getItem(MISTAKE_BANK_KEY);
        if (!rawValue) {
            return [];
        }
        const parsed = JSON.parse(rawValue);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Failed to load mistake bank.", error);
        return [];
    }
}

function persistStudyHistory() {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(studyHistory.slice(0, MAX_HISTORY_ITEMS)));
    } catch (error) {
        console.warn("Failed to persist study history.", error);
    }
}

function persistMistakeBank() {
    try {
        window.localStorage.setItem(MISTAKE_BANK_KEY, JSON.stringify(mistakeBank.slice(0, 100)));
    } catch (error) {
        console.warn("Failed to persist mistake bank.", error);
    }
}

function renderStudyDashboard() {
    if (!studyHistory.length && !mistakeBank.length) {
        elements.studyDashboard.classList.add("hidden");
        elements.recommendedCategories.innerHTML = "";
        elements.quickReviewActions.innerHTML = "";
        return;
    }

    const latest = studyHistory[0] || null;
    const recent = studyHistory.slice(0, 5);
    const comparableRecent = latest
        ? recent.filter((item) => item.sessionMode === latest.sessionMode)
        : recent;
    const averageAccuracy = comparableRecent.length > 0
        ? Math.round(comparableRecent.reduce((sum, item) => sum + Number(item.accuracy || 0), 0) / comparableRecent.length)
        : 0;
    const historyRecommended = getRecommendedCategories(recent);
    const recommended = historyRecommended.length > 0
        ? historyRecommended
        : getRecommendedCategoriesFromBank();
    const patterns = getRecommendedPatterns(comparableRecent);
    const bankStats = getMistakeBankStats();

    elements.studyDashboard.classList.remove("hidden");
    elements.historySummary.textContent = latest
        ? buildDashboardSummary(latest, comparableRecent.length || recent.length, averageAccuracy, patterns)
        : `まだセッション履歴はありませんが、復習バンクに ${bankStats.total} 問あります。短い復習から始められます。`;

    if (!recommended.length) {
        elements.recommendedCategories.innerHTML = '<span class="badge">今回はおすすめカテゴリがありません</span>';
    } else {
        elements.recommendedCategories.innerHTML = recommended
            .map((item) => (
                `<button type="button" class="chip-btn" data-category="${escapeHtml(item.category)}">${escapeHtml(item.category)} / 復習度 ${item.score}</button>`
            ))
            .join("");
    }

    elements.mistakeBankSummary.textContent = bankStats.total > 0
        ? `未解決の復習候補は ${bankStats.total} 問です。最優先は ${bankStats.topLabel} です。`
        : "復習バンクは空です。新しく学習を始めると、必要な問題だけがここに残ります。";
    elements.quickReviewActions.innerHTML = renderQuickReviewActions(bankStats);
}

function getRecommendedCategories(historyItems) {
    const scores = new Map();

    historyItems.forEach((item) => {
        Object.entries(item.categoryStats || {}).forEach(([category, stats]) => {
            const score = (stats.reviewCount || 0) * 2 + (stats.mistakes || 0);
            if (score <= 0) {
                return;
            }
            scores.set(category, (scores.get(category) || 0) + score);
        });
    });

    return [...scores.entries()]
        .sort((left, right) => right[1] - left[1])
        .slice(0, 3)
        .map(([category, score]) => ({ category, score }));
}

function getRecommendedCategoriesFromBank() {
    const scores = new Map();

    mistakeBank.forEach((entry) => {
        scores.set(entry.category, (scores.get(entry.category) || 0) + Number(entry.score || 0));
    });

    return [...scores.entries()]
        .sort((left, right) => right[1] - left[1])
        .slice(0, 3)
        .map(([category, score]) => ({ category, score }));
}

function getRecommendedPatterns(historyItems) {
    const scores = new Map();

    historyItems.forEach((item) => {
        Object.entries(item.patternStats || {}).forEach(([pattern, count]) => {
            if (pattern === "smooth") {
                return;
            }
            scores.set(pattern, (scores.get(pattern) || 0) + Number(count || 0));
        });
    });

    return [...scores.entries()]
        .sort((left, right) => right[1] - left[1])
        .slice(0, 2)
        .map(([pattern, score]) => ({ pattern, score }));
}

function getMistakeBankStats() {
    const total = mistakeBank.length;
    const counts = {
        today3: Math.min(3, total),
        all: total,
        listening: mistakeBank.filter((item) => !isShadowingEntry(item) && ["empty", "incomplete", "missing"].includes(item.primaryError)).length,
        order: mistakeBank.filter((item) => !isShadowingEntry(item) && item.primaryError === "word-order").length,
        form: mistakeBank.filter((item) => !isShadowingEntry(item) && item.primaryError === "word-form").length,
        hint: mistakeBank.filter((item) => !isShadowingEntry(item) && item.primaryError === "hint-dependent").length,
        shadowing: mistakeBank.filter((item) => isShadowingEntry(item)).length
    };

    const topEntry = getSortedMistakeBankEntries()[0] || null;

    return {
        total,
        counts,
        topLabel: topEntry ? `${topEntry.category} / ${getPatternLabel(topEntry.primaryError)}` : "なし"
    };
}

function renderQuickReviewActions(bankStats) {
    const actions = [
        {
            action: "today-3",
            title: "今日の3問",
            subtitle: bankStats.counts.today3 > 0 ? `${bankStats.counts.today3}問だけ集中復習` : "復習候補がありません",
            count: bankStats.counts.today3
        },
        {
            action: "all",
            title: "復習バンク全体",
            subtitle: bankStats.counts.all > 0 ? `${bankStats.counts.all}問の未解決問題` : "未解決問題はありません",
            count: bankStats.counts.all
        },
        {
            action: "listening-focus",
            title: "聞き漏れ復習",
            subtitle: bankStats.counts.listening > 0 ? `聞き漏れ系 ${bankStats.counts.listening}問` : "候補なし",
            count: bankStats.counts.listening
        },
        {
            action: "order-focus",
            title: "語順復習",
            subtitle: bankStats.counts.order > 0 ? `語順系 ${bankStats.counts.order}問` : "候補なし",
            count: bankStats.counts.order
        },
        {
            action: "form-focus",
            title: "語形復習",
            subtitle: bankStats.counts.form > 0 ? `語形系 ${bankStats.counts.form}問` : "候補なし",
            count: bankStats.counts.form
        },
        {
            action: "hint-focus",
            title: "ヒント卒業",
            subtitle: bankStats.counts.hint > 0 ? `ヒント依存 ${bankStats.counts.hint}問` : "候補なし",
            count: bankStats.counts.hint
        },
        {
            action: "shadowing-focus",
            title: "シャドーイング復習",
            subtitle: bankStats.counts.shadowing > 0 ? `要再音読 ${bankStats.counts.shadowing}問` : "候補なし",
            count: bankStats.counts.shadowing
        }
    ];

    return actions
        .map((item) => `
            <button
                type="button"
                class="quick-action-btn"
                data-review-action="${item.action}"
                ${item.count === 0 ? "disabled" : ""}
            >
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.subtitle)}</span>
            </button>
        `)
        .join("");
}

function startQuickReviewSession(action) {
    const entries = getQuickReviewEntries(action);
    if (entries.length === 0) {
        alert("この復習条件に合う問題はありません。");
        return;
    }

    applyQuickReviewDefaults(entries);
    const queue = entries
        .map((entry) => questionLookup.get(entry.questionId))
        .filter(Boolean);

    if (queue.length === 0) {
        alert("復習バンクの問題が見つかりませんでした。");
        return;
    }

    startSession(queue);
}

function applyQuickReviewDefaults(entries) {
    const shadowingCount = entries.filter((entry) => isShadowingEntry(entry)).length;
    elements.settingMode.value = shadowingCount === entries.length ? "shadowing" : "practice";
    elements.settingType.value = "sentence";
    syncModeDependentControls();
    settings = readSettings();
}

function getQuickReviewEntries(action) {
    const sorted = getSortedMistakeBankEntries();

    switch (action) {
        case "today-3":
            return sorted.slice(0, 3);
        case "all":
            return sorted;
        case "listening-focus":
            return sorted.filter((item) => ["empty", "incomplete", "missing"].includes(item.primaryError));
        case "order-focus":
            return sorted.filter((item) => item.primaryError === "word-order");
        case "form-focus":
            return sorted.filter((item) => item.primaryError === "word-form");
        case "hint-focus":
            return sorted.filter((item) => item.primaryError === "hint-dependent");
        case "shadowing-focus":
            return sorted.filter((item) => isShadowingEntry(item));
        default:
            return [];
    }
}

function getSortedMistakeBankEntries() {
    return [...mistakeBank].sort((left, right) => {
        if (right.score !== left.score) {
            return right.score - left.score;
        }
        return Number(left.lastSeenAt || 0) - Number(right.lastSeenAt || 0);
    });
}

function buildDashboardSummary(latest, recentCount, averageAccuracy, patterns) {
    const patternNotice = patterns.length
        ? ` つまずきやすい傾向は ${patterns.map((item) => getPatternLabel(item.pattern)).join(" / ")} です。`
        : "";

    if (latest.sessionMode === "shadowing") {
        return `前回は ${latest.totalReady || 0}/${latest.total || 0} 問で音読できました。最近 ${recentCount} 回の平均達成率は ${averageAccuracy}% です。${patternNotice}`;
    }

    return `前回は ${latest.correct || 0}/${latest.total || 0} 問正解で正答率 ${latest.accuracy || 0}% でした。最近 ${recentCount} 回の平均正答率は ${averageAccuracy}% です。${patternNotice}`;
}

function isShadowingEntry(entry) {
    return entry && entry.mode === "shadowing";
}

function isShadowingResult(result) {
    return result && result.mode === "shadowing";
}

function buildBeforeListeningFocus(question, metaHidden) {
    if (settings.mode === "shadowing") {
        return {
            summary: `${question.category} の型を意識しつつ、まず意味の流れ、その次に音のリズムを追います。`,
            plan: "1回目は意味だけ、2回目は文頭と文末、3回目はキーフレーズやスクリプトを使って重ね読みしましょう。"
        };
    }

    const summary = metaHidden
        ? `まずは文全体の流れをつかみ、2回目で書き出しと文末を押さえましょう。`
        : `${question.category} に注目します。${getBeforeListeningCue(question.category)}`;
    const planByType = settings.type === "blank"
        ? "1回目は文全体、2回目は空欄の前後、3回目は語形だけに集中します。"
        : "1回目は文の骨格、2回目は抜けた語、3回目は語順の確認に使いましょう。";
    const difficultyNote = question.difficulty === "hard"
        ? "今回は長めなので、全部を書こうとせず、前半と後半に分けて拾うのが有効です。"
        : "短めなので、聞こえた語順をそのまま再現する意識が有効です。";

    return {
        summary,
        plan: `${planByType} ${difficultyNote}`
    };
}

function getBeforeListeningCue(category) {
    const cues = {
        "比較": "than や as ... as の形を先に探すと、聞くポイントが絞れます。",
        "関係代名詞": "名詞の直後に来る who / which / that をつかむと骨格が見えます。",
        "仮定法過去": "if 節と would のセットを先に意識すると聞き取りやすくなります。",
        "仮定法過去完了": "had と would have の形に耳を立てると見失いにくくなります。",
        "使役動詞": "make / have / let の後ろの動詞の形に注目しましょう。",
        "受動態": "be 動詞 + 過去分詞のまとまりを先に探すと安定します。",
        "現在完了": "have + 過去分詞が聞こえたら、今につながる感覚を意識しましょう。",
        "倒置": "文頭の強調語のあとで語順が変わる点に注目しましょう."
    };

    return cues[category] || "文法の型を一つだけ意識して聞くと、全文を追いやすくなります。";
}

function getFilteredQuestionPool(customSettings) {
    return allQuestions.filter((question) => {
        const categoryMatch = customSettings.category === "all" || question.category === customSettings.category;
        const difficultyMatch = customSettings.difficulty === "all" || question.difficulty === customSettings.difficulty;
        const blankMatch = customSettings.type !== "blank" || question.canUseBlank;
        return categoryMatch && difficultyMatch && blankMatch;
    });
}

function startSession(queue) {
    cancelSpeech();
    stopShadowingPlayback();
    stopShadowingRecording({ discard: true });
    releaseSessionRecordings(results);
    results = [];
    playQueue = queue;
    currentIndex = 0;
    currentQuestionState = null;
    showScreen("play");
    loadQuestion();
}

function loadQuestion() {
    cancelSpeech();
    const question = playQueue[currentIndex];
    const isShadowing = settings.mode === "shadowing";
    const metaHidden = settings.mode === "test";
    const focus = buildBeforeListeningFocus(question, metaHidden);
    const shadowingChunks = isShadowing ? buildShadowingChunks(question.en) : [];

    currentQuestionState = {
        question,
        audioPlays: 0,
        chunkPlays: 0,
        hintsUsed: 0,
        mistakes: 0,
        invalidStreak: false,
        finalized: false,
        startedAt: Date.now(),
        lastInput: "",
        scriptReveals: 0,
        transcriptVisible: false,
        activeChunkIndex: null,
        shadowingChunks,
        chunkPlayCounts: shadowingChunks.map(() => 0),
        isRecording: false
    };

    elements.progressText.textContent = `問題: ${currentIndex + 1} / ${playQueue.length}`;
    elements.categoryBadge.textContent = metaHidden ? "カテゴリは回答後に表示" : question.category;
    elements.difficultyBadge.textContent = metaHidden ? "集中モード" : difficultyLabel(question.difficulty);
    elements.focusSummary.textContent = focus.summary;
    elements.focusPlan.textContent = focus.plan;
    elements.jaText.textContent = question.ja;
    elements.jaText.classList.toggle("hidden", settings.translation === "hide");
    elements.enDisplay.textContent = isShadowing
        ? "まずは音声だけで内容をつかみ、必要になったらスクリプトを表示して重ね読みします。"
        : settings.type === "blank"
            ? maskBlankWord(question)
            : metaHidden
                ? "英文を聞き取って入力してください。"
                : `${question.wordCount}語の英文を聞き取って入力してください。`;
    elements.enHint.textContent = getHintText(question, 0);
    elements.liveFeedback.textContent = isShadowing
        ? "音声を2回ほど聞いたあと、必要ならキーフレーズやスクリプト、フレーズ反復を使って重ね読みしましょう。"
        : settings.mode === "practice"
            ? "詰まったらヒントを段階的に表示できます。"
            : "必要ならヒントや答え確認を使って、聞き取れなかった箇所を洗い出しましょう。";
    elements.shadowingSummary.textContent = isShadowing
        ? "おすすめ手順: 音声だけで聞く -> キーフレーズ確認 -> スクリプトを見て重ね読み -> フレーズ反復 -> 振り返り"
        : "";

    elements.typeInput.value = "";
    elements.typeInput.disabled = false;
    elements.typeInput.classList.remove("error");
    elements.inputArea.classList.toggle("hidden", isShadowing);
    elements.rulesBox.classList.toggle("hidden", false);
    elements.rulesBox.textContent = isShadowing
        ? "入力は行いません。音声を聞き、必要ならスクリプトやフレーズ反復を使って重ね読みしてください。"
        : "句読点は入力不要です。語順と聞き取れた語形に集中してください。";
    elements.audioBtn.disabled = false;
    elements.hintBtn.disabled = false;
    elements.answerBtn.disabled = false;
    elements.audioBtn.textContent = isShadowing ? "音声を聞く" : "音声をもう一度聞く";
    elements.hintBtn.textContent = isShadowing ? "キーフレーズ" : "ヒントを表示";
    elements.answerBtn.textContent = isShadowing ? "スクリプト表示" : "答えを確認";
    elements.shadowingPanel.classList.toggle("hidden", !isShadowing);
    elements.shadowingChunkPractice.classList.add("hidden");
    elements.shadowingChunkButtons.innerHTML = "";
    elements.shadowingChunkSummary.textContent = "";
    elements.feedbackChunkPractice.classList.add("hidden");
    elements.feedbackChunkButtons.innerHTML = "";
    elements.feedbackChunkSummary.textContent = "";
    elements.shadowingRecordingPanel.classList.toggle("hidden", !isShadowing);
    elements.shadowingRecordingSummary.textContent = getShadowingRecordingUnavailableMessage();
    elements.shadowingRecordBtn.textContent = "音読を録音";
    elements.shadowingPlaybackBtn.disabled = true;
    elements.shadowingFinishBtn.disabled = false;
    elements.questionFeedback.classList.add("hidden");
    setShadowingButtonState(null);
    elements.afterListeningSummary.textContent = "答えを見たあとに音読し、言えたかどうかを自己チェックしましょう。";

    updateQuestionStats();

    window.setTimeout(() => {
        if (currentQuestionState && currentQuestionState.question.id === question.id) {
            playAudio(question.en);
        }
    }, 250);

    if (!isShadowing) {
        elements.typeInput.focus();
    }
}

let currentAudioElement = null;
let audioPlayId = 0;

function playAudio(text, options = {}) {
    cancelSpeech();

    const questionId = currentQuestionState && currentQuestionState.question
        ? currentQuestionState.question.id
        : null;

    const useMP3 = questionId && options.kind !== "chunk";

    if (useMP3) {
        const audioSrc = `audio/${questionId}.mp3`;
        const thisPlayId = ++audioPlayId;
        const audio = new Audio(audioSrc);
        audio.playbackRate = Math.min(Math.max(settings.speed || 1, 0.25), 4);
        currentAudioElement = audio;
        audio.onerror = function () {
            if (audioPlayId !== thisPlayId) return;
            currentAudioElement = null;
            playAudioViaTTS(text, options);
        };
        audio.play().then(function () {
            if (audioPlayId !== thisPlayId) {
                audio.pause();
                return;
            }
            trackAudioPlay(options);
        }).catch(function () {
            if (audioPlayId !== thisPlayId) return;
            currentAudioElement = null;
            playAudioViaTTS(text, options);
        });
    } else {
        playAudioViaTTS(text, options);
    }
}

function playAudioViaTTS(text, options = {}) {
    if (!window.speechSynthesis) {
        elements.liveFeedback.textContent = "このブラウザでは音声再生が利用できません。";
        return;
    }

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en"));
    const preferredVoice = englishVoices.find((voice) =>
        voice.name.includes("Google") || voice.name.includes("Natural") || voice.name.includes("Siri")
    ) || englishVoices[0];

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    utterance.rate = Math.min(Math.max(settings.speed || 1, 0.1), 10);
    window.speechSynthesis.speak(utterance);
    trackAudioPlay(options);
}

function trackAudioPlay(options) {
    if (currentQuestionState) {
        if (options.kind === "chunk") {
            currentQuestionState.chunkPlays += 1;
            currentQuestionState.activeChunkIndex = options.chunkIndex ?? null;
            if (Number.isInteger(options.chunkIndex) && currentQuestionState.chunkPlayCounts[options.chunkIndex] != null) {
                currentQuestionState.chunkPlayCounts[options.chunkIndex] += 1;
            }
        } else {
            currentQuestionState.audioPlays += 1;
        }
        if (currentQuestionState.finalized && currentQuestionState.resultIndex != null) {
            const result = results[currentQuestionState.resultIndex];
            if (result) {
                result.audioPlays = currentQuestionState.audioPlays;
                result.chunkPlays = currentQuestionState.chunkPlays;
                result.activeChunkIndex = currentQuestionState.activeChunkIndex;
                result.chunkPlayCounts = [...currentQuestionState.chunkPlayCounts];
                result.analysis = analyzeResult(result);
                result.reviewPriority = result.analysis.reviewPriority;
                result.needsReview = shouldResultNeedReview(result);
                showQuestionFeedback(result);
            }
        }
        updateQuestionStats();
        if (settings.mode === "shadowing" && currentQuestionState.transcriptVisible) {
            renderShadowingChunkPractice(currentQuestionState);
        }
    }
}

function cancelSpeech() {
    if (currentAudioElement) {
        currentAudioElement.pause();
        currentAudioElement = null;
    }
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}

function updateQuestionStats() {
    if (!currentQuestionState) {
        return;
    }

    elements.audioCount.textContent = `再生: ${currentQuestionState.audioPlays}回`;
    if (settings.mode === "shadowing") {
        elements.hintCount.textContent = `キーフレーズ: ${currentQuestionState.hintsUsed}回`;
        elements.mistakeCount.textContent = `スクリプト: ${currentQuestionState.scriptReveals}回`;
    } else {
        elements.hintCount.textContent = `ヒント: ${currentQuestionState.hintsUsed}回`;
        elements.mistakeCount.textContent = `ミス: ${currentQuestionState.mistakes}回`;
    }
}

function getTargetText(question) {
    return settings.type === "blank" ? question.blankWord : question.en;
}

function revealShadowingScript() {
    if (!currentQuestionState || currentQuestionState.finalized || currentQuestionState.transcriptVisible) {
        return;
    }

    currentQuestionState.transcriptVisible = true;
    currentQuestionState.scriptReveals += 1;
    elements.enDisplay.textContent = currentQuestionState.question.en;
    elements.answerBtn.disabled = true;
    elements.answerBtn.textContent = "スクリプト表示中";
    elements.liveFeedback.textContent = "スクリプトを見ながら音声に重ねて読み、言いにくい箇所を確認しましょう。";
    elements.shadowingSummary.textContent = "スクリプトを見ながら1回、見ないで1回を目安に、音のまとまりで繰り返します。";
    renderShadowingChunkPractice(currentQuestionState);
    updateQuestionStats();
}

function playShadowingChunk(chunkIndex) {
    if (!currentQuestionState || !Number.isInteger(chunkIndex)) {
        return;
    }

    const chunkText = currentQuestionState.shadowingChunks[chunkIndex];
    if (!chunkText) {
        return;
    }

    playAudio(chunkText, { kind: "chunk", chunkIndex });
    elements.liveFeedback.textContent = `「${chunkText}」だけを切り出して再生しています。口がもつれる部分だけに集中しましょう。`;
}

function canUseShadowingRecording() {
    return Boolean(
        window.MediaRecorder &&
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function"
    );
}

function getShadowingRecordingUnavailableMessage() {
    return canUseShadowingRecording()
        ? "お手本のあとに自分の音読を録り、聞き返してズレを確認できます。"
        : "このブラウザでは録音機能を使えません。対応ブラウザで localhost か https から開いてください。";
}

async function toggleShadowingRecording() {
    if (!currentQuestionState || currentQuestionState.resultIndex == null) {
        return;
    }

    if (!canUseShadowingRecording()) {
        elements.shadowingRecordingSummary.textContent = getShadowingRecordingUnavailableMessage();
        return;
    }

    if (shadowingRecorder && shadowingRecorder.state === "recording") {
        stopShadowingRecording();
        return;
    }

    const result = results[currentQuestionState.resultIndex];
    if (!result || !isShadowingResult(result)) {
        return;
    }

    try {
        if (!shadowingRecorderStream) {
            shadowingRecorderStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }

        stopShadowingPlayback();
        shadowingRecordChunks = [];
        shadowingRecorder = new MediaRecorder(shadowingRecorderStream);
        shadowingRecorderDiscardOnStop = false;
        currentQuestionState.isRecording = true;
        result.recordingStatus = "recording";
        result.recordingStartedAt = Date.now();
        syncShadowingResultState(result);

        shadowingRecorder.addEventListener("dataavailable", (event) => {
            if (event.data && event.data.size > 0) {
                shadowingRecordChunks.push(event.data);
            }
        });

        shadowingRecorder.addEventListener("stop", () => {
            const targetResult = currentQuestionState && currentQuestionState.resultIndex != null
                ? results[currentQuestionState.resultIndex]
                : result;
            const shouldDiscard = shadowingRecorderDiscardOnStop;
            shadowingRecorderDiscardOnStop = false;
            shadowingRecorder = null;
            if (shouldDiscard) {
                shadowingRecordChunks = [];
                releaseShadowingRecorderStream();
                return;
            }
            finalizeShadowingRecording(targetResult);
        }, { once: true });

        shadowingRecorder.start();
        updateShadowingRecordingPanel(result);
        shadowingRecordTimerId = window.setInterval(() => {
            updateShadowingRecordingPanel(result);
        }, 400);
    } catch (error) {
        console.warn("Recording could not start.", error);
        currentQuestionState.isRecording = false;
        result.recordingStatus = "blocked";
        updateShadowingRecordingPanel(result);
    }
}

function stopShadowingRecording(options = {}) {
    if (shadowingRecordTimerId) {
        window.clearInterval(shadowingRecordTimerId);
        shadowingRecordTimerId = null;
    }

    if (!shadowingRecorder || shadowingRecorder.state !== "recording") {
        if (options.discard) {
            shadowingRecordChunks = [];
        }
        return;
    }

    if (currentQuestionState) {
        currentQuestionState.isRecording = false;
    }

    const result = currentQuestionState && currentQuestionState.resultIndex != null
        ? results[currentQuestionState.resultIndex]
        : null;

    if (result) {
        result.recordingStatus = options.discard ? "idle" : "processing";
        updateShadowingRecordingPanel(result);
    }

    shadowingRecorderDiscardOnStop = Boolean(options.discard);
    shadowingRecorder.stop();

    if (options.discard) {
        shadowingRecordChunks = [];
    }
}

function finalizeShadowingRecording(result) {
    if (!result) {
        shadowingRecordChunks = [];
        return;
    }

    if (result.recordingUrl) {
        URL.revokeObjectURL(result.recordingUrl);
    }

    const elapsedMs = Math.max(0, Date.now() - Number(result.recordingStartedAt || Date.now()));
    const hasAudio = shadowingRecordChunks.length > 0;
    const audioBlob = hasAudio ? new Blob(shadowingRecordChunks, { type: shadowingRecorder.mimeType || "audio/webm" }) : null;

    result.recordingUrl = hasAudio ? URL.createObjectURL(audioBlob) : "";
    result.recordingTakes = Number(result.recordingTakes || 0) + (hasAudio ? 1 : 0);
    result.recordingDurationSec = Math.max(1, Math.round(elapsedMs / 1000));
    result.recordingStatus = hasAudio ? "ready" : "idle";
    result.recordingStartedAt = null;
    shadowingRecordChunks = [];
    releaseShadowingRecorderStream();

    if (currentQuestionState) {
        currentQuestionState.isRecording = false;
    }

    syncShadowingResultState(result);
}

function playShadowingRecording() {
    if (!currentQuestionState || currentQuestionState.resultIndex == null) {
        return;
    }

    const result = results[currentQuestionState.resultIndex];
    if (!result || !result.recordingUrl) {
        return;
    }

    stopShadowingPlayback();
    shadowingPlaybackAudio = new Audio(result.recordingUrl);
    shadowingPlaybackAudio.addEventListener("ended", () => {
        shadowingPlaybackAudio = null;
        updateShadowingRecordingPanel(result);
    }, { once: true });
    shadowingPlaybackAudio.play().catch((error) => {
        console.warn("Playback failed.", error);
        shadowingPlaybackAudio = null;
        updateShadowingRecordingPanel(result);
    });

    result.selfPlaybackCount = Number(result.selfPlaybackCount || 0) + 1;
    syncShadowingResultState(result);
}

function stopShadowingPlayback() {
    if (!shadowingPlaybackAudio) {
        return;
    }

    shadowingPlaybackAudio.pause();
    shadowingPlaybackAudio.currentTime = 0;
    shadowingPlaybackAudio = null;
}

function releaseShadowingRecorderStream() {
    if (!shadowingRecorderStream) {
        return;
    }

    shadowingRecorderStream.getTracks().forEach((track) => track.stop());
    shadowingRecorderStream = null;
}

function releaseSessionRecordings(sessionResults) {
    sessionResults.forEach((result) => {
        if (result.recordingUrl) {
            URL.revokeObjectURL(result.recordingUrl);
            result.recordingUrl = "";
        }
    });
}

function updateShadowingRecordingPanel(result) {
    if (!isShadowingResult(result)) {
        elements.shadowingRecordingPanel.classList.add("hidden");
        return;
    }

    elements.shadowingRecordingPanel.classList.remove("hidden");
    elements.shadowingRecordingSummary.textContent = getShadowingRecordingSummary(result);
    elements.shadowingRecordBtn.disabled = !canUseShadowingRecording() || result.recordingStatus === "processing";
    elements.shadowingRecordBtn.textContent = result.recordingStatus === "recording" ? "録音を止める" : "音読を録音";
    elements.shadowingPlaybackBtn.disabled = !result.recordingUrl || result.recordingStatus === "recording";
}

function getShadowingRecordingSummary(result) {
    if (!canUseShadowingRecording()) {
        return getShadowingRecordingUnavailableMessage();
    }

    if (result.recordingStatus === "recording") {
        const seconds = Math.max(1, Math.floor((Date.now() - Number(result.recordingStartedAt || Date.now())) / 1000));
        return `録音中です。${seconds}秒ほど話したら止めて、自分の音声を聞き返してみましょう。`;
    }

    if (result.recordingStatus === "processing") {
        return "録音を保存しています。数秒待ってから聞き返せます。";
    }

    if (result.recordingStatus === "blocked") {
        return "マイク権限を使えませんでした。ブラウザの権限設定を確認してください。";
    }

    if (result.recordingUrl) {
        return `録音 ${result.recordingTakes || 0}回 / 聞き返し ${result.selfPlaybackCount || 0}回です。お手本と比べて、語尾や間の取り方を確認しましょう。`;
    }

    return "お手本に続けて自分の音読を録り、聞き返してズレを見つけられます。";
}

function syncShadowingResultState(result) {
    if (!result) {
        return;
    }

    result.analysis = analyzeResult(result);
    result.reviewPriority = result.analysis.reviewPriority;
    result.needsReview = shouldResultNeedReview(result);
    showQuestionFeedback(result);
}

function renderShadowingChunkPractice(questionState) {
    if (!questionState || !questionState.shadowingChunks || questionState.shadowingChunks.length === 0) {
        elements.shadowingChunkPractice.classList.add("hidden");
        return;
    }

    elements.shadowingChunkPractice.classList.remove("hidden");
    elements.shadowingChunkSummary.textContent = questionState.chunkPlays > 0
        ? `難所だけを ${questionState.chunkPlays} 回反復しています。言いにくい塊を1つずつ潰しましょう。`
        : "スクリプトを見たら、言いにくい塊だけを1つ選んで反復できます。";
    elements.shadowingChunkButtons.innerHTML = renderShadowingChunkButtons(
        questionState.shadowingChunks,
        questionState.chunkPlayCounts,
        questionState.activeChunkIndex
    );
}

function renderFeedbackChunkPractice(result) {
    if (!isShadowingResult(result) || !result.shadowingChunks || result.shadowingChunks.length === 0) {
        elements.feedbackChunkPractice.classList.add("hidden");
        elements.feedbackChunkButtons.innerHTML = "";
        elements.feedbackChunkSummary.textContent = "";
        return;
    }

    elements.feedbackChunkPractice.classList.remove("hidden");
    elements.feedbackChunkSummary.textContent = result.chunkPlays > 0
        ? `フレーズ反復は ${result.chunkPlays} 回です。まだ口が追いつきにくい箇所だけを選んで聞き直せます。`
        : "全文ではなく、言いにくいフレーズだけを選んで再生できます。";
    elements.feedbackChunkButtons.innerHTML = renderShadowingChunkButtons(
        result.shadowingChunks,
        result.chunkPlayCounts || [],
        result.activeChunkIndex
    );
}

function renderShadowingChunkButtons(chunks, counts, activeChunkIndex) {
    return chunks
        .map((chunk, index) => {
            const playCount = Number(counts[index] || 0);
            return `
                <button
                    type="button"
                    class="chunk-btn ${activeChunkIndex === index ? "is-active" : ""}"
                    data-chunk-index="${index}"
                >
                    <strong>フレーズ ${index + 1}${playCount > 0 ? ` / ${playCount}回` : ""}</strong>
                    <span>${escapeHtml(chunk)}</span>
                </button>
            `;
        })
        .join("");
}

function compareAttempt(inputText, targetText) {
    const inputProgress = normalizeForProgress(inputText);
    const targetProgress = normalizeForProgress(targetText);
    const inputFinal = inputProgress.trim();
    const targetFinal = targetProgress.trim();

    let matchLength = 0;
    while (
        matchLength < inputProgress.length &&
        matchLength < targetProgress.length &&
        inputProgress[matchLength] === targetProgress[matchLength]
    ) {
        matchLength += 1;
    }

    return {
        inputProgress,
        targetProgress,
        inputFinal,
        targetFinal,
        isPrefix: targetProgress.startsWith(inputProgress),
        isExact: inputFinal.length > 0 && inputFinal === targetFinal,
        matchLength,
        mismatchExpected: targetProgress[matchLength] || "",
        mismatchActual: inputProgress[matchLength] || ""
    };
}

function updateLiveFeedback(comparison) {
    if (currentQuestionState.finalized) {
        return;
    }

    if (!comparison.inputProgress) {
        elements.liveFeedback.textContent = "聞こえた語順をそのまま入力してください。";
        return;
    }

    if (comparison.isExact) {
        elements.liveFeedback.textContent = "採点OKです。振り返りを確認してください。";
        return;
    }

    if (comparison.isPrefix) {
        elements.liveFeedback.textContent = `ここまで ${comparison.matchLength} 文字分一致しています。`;
        return;
    }

    const hintWord = comparison.mismatchExpected === " "
        ? "単語の切れ目"
        : comparison.mismatchExpected || "文末";
    elements.liveFeedback.textContent = `「${hintWord}」付近でずれています。音声を聞き直してみましょう。`;
}

function finalizeQuestion(status) {
    if (!currentQuestionState || currentQuestionState.finalized) {
        return;
    }

    currentQuestionState.finalized = true;

    const question = currentQuestionState.question;
    const shadowingMode = settings.mode === "shadowing";
    const targetText = shadowingMode ? question.en : getTargetText(question);
    const userAnswer = shadowingMode ? "" : elements.typeInput.value.trim();
    const elapsedMs = Date.now() - currentQuestionState.startedAt;
    const isCorrect = shadowingMode ? true : status === "correct";

    const result = {
        question,
        mode: settings.mode,
        type: settings.type,
        status,
        isCorrect,
        targetText,
        userAnswer,
        audioPlays: currentQuestionState.audioPlays,
        chunkPlays: currentQuestionState.chunkPlays,
        hintsUsed: currentQuestionState.hintsUsed,
        mistakes: currentQuestionState.mistakes,
        scriptReveals: currentQuestionState.scriptReveals,
        transcriptVisible: currentQuestionState.transcriptVisible,
        shadowingChunks: [...currentQuestionState.shadowingChunks],
        chunkPlayCounts: [...currentQuestionState.chunkPlayCounts],
        activeChunkIndex: currentQuestionState.activeChunkIndex,
        recordingUrl: "",
        recordingTakes: 0,
        selfPlaybackCount: 0,
        recordingDurationSec: 0,
        recordingStatus: "idle",
        recordingStartedAt: null,
        elapsedMs,
        spokenConfidence: null,
        needsReview: false
    };

    result.analysis = analyzeResult(result);
    result.reviewPriority = result.analysis.reviewPriority;
    result.needsReview = shouldResultNeedReview(result);

    results.push(result);
    currentQuestionState.resultIndex = results.length - 1;

    elements.typeInput.disabled = true;
    elements.audioBtn.disabled = true;
    elements.hintBtn.disabled = true;
    elements.answerBtn.disabled = true;
    elements.shadowingFinishBtn.disabled = true;
    elements.shadowingPanel.classList.add("hidden");
    elements.typeInput.classList.remove("error");

    showQuestionFeedback(result);
}

function analyzeResult(result) {
    if (isShadowingResult(result)) {
        return analyzeShadowingResult(result);
    }

    const targetTokens = tokenizeForDiff(result.targetText);
    const userTokens = tokenizeForDiff(result.userAnswer);
    const operations = diffTokens(targetTokens, userTokens);
    const missingTokens = operations.filter((item) => item.type === "missing").map((item) => item.value);
    const extraTokens = operations.filter((item) => item.type === "extra").map((item) => item.value);
    const sameInventory = hasSameTokenInventory(targetTokens, userTokens);
    const looksIncomplete = userTokens.length > 0 && isTokenPrefix(userTokens, targetTokens);
    const looksSpellingIssue = !sameInventory &&
        missingTokens.length === extraTokens.length &&
        missingTokens.length > 0 &&
        missingTokens.every((token, index) => areTokensSimilar(token, extraTokens[index]));

    const tags = [];
    let primaryError = "smooth";

    if (!result.userAnswer) {
        primaryError = "empty";
    } else if (!result.isCorrect && looksIncomplete) {
        primaryError = "incomplete";
    } else if (!result.isCorrect && sameInventory) {
        primaryError = "word-order";
    } else if (!result.isCorrect && looksSpellingIssue) {
        primaryError = "word-form";
    } else if (!result.isCorrect && missingTokens.length > extraTokens.length) {
        primaryError = "missing";
    } else if (!result.isCorrect && extraTokens.length > missingTokens.length) {
        primaryError = "extra";
    } else if (!result.isCorrect) {
        primaryError = "mixed";
    } else if (result.hintsUsed > 0) {
        primaryError = "hint-dependent";
    } else if (result.mistakes > 0) {
        primaryError = "recovered";
    }

    if (result.isCorrect && result.hintsUsed === 0 && result.mistakes === 0) {
        tags.push({ label: "初回で安定正解", tone: "positive" });
    }
    if (result.spokenConfidence === "ready") {
        tags.push({ label: "音読できた", tone: "positive" });
    }
    if (result.spokenConfidence === "again") {
        tags.push({ label: "要再音読", tone: "warning" });
    }
    if (result.hintsUsed > 0) {
        tags.push({ label: `ヒント ${result.hintsUsed}回`, tone: "warning" });
    }
    if (result.audioPlays >= 3) {
        tags.push({ label: `再生 ${result.audioPlays}回`, tone: "warning" });
    }
    if (!result.isCorrect) {
        tags.push(getPrimaryErrorTag(primaryError));
    } else if (result.mistakes > 0) {
        tags.push({ label: "途中でズレあり", tone: "warning" });
    }

    const reviewPriority = calculateReviewPriority(result, {
        primaryError,
        missingTokens,
        extraTokens,
        sameInventory,
        looksIncomplete
    });

    return {
        operations,
        missingTokens,
        extraTokens,
        sameInventory,
        primaryError,
        tags,
        nextStep: buildNextStepMessage(primaryError, result, missingTokens, extraTokens),
        reviewPriority,
        priorityLabel: getReviewPriorityLabel(reviewPriority)
    };
}

function analyzeShadowingResult(result) {
    const tags = [];
    let primaryError = "smooth";

    if (result.spokenConfidence === "again") {
        primaryError = "shadowing-again";
    } else if (result.scriptReveals > 0) {
        primaryError = "shadowing-script";
    } else if (result.hintsUsed > 0) {
        primaryError = "shadowing-keyphrase";
    } else if (result.audioPlays >= 4) {
        primaryError = "shadowing-repeat";
    }

    if (result.audioPlays <= 2 && result.hintsUsed === 0 && result.scriptReveals === 0) {
        tags.push({ label: "音声だけで追えた", tone: "positive" });
    }
    if (result.spokenConfidence === "ready") {
        tags.push({ label: "音読できた", tone: "positive" });
    }
    if (result.spokenConfidence === "again") {
        tags.push({ label: "要再音読", tone: "warning" });
    }
    if (result.hintsUsed > 0) {
        tags.push({ label: `キーフレーズ ${result.hintsUsed}回`, tone: "warning" });
    }
    if (result.scriptReveals > 0) {
        tags.push({ label: `スクリプト ${result.scriptReveals}回`, tone: "warning" });
    }
    if (result.chunkPlays > 0) {
        tags.push({
            label: `フレーズ反復 ${result.chunkPlays}回`,
            tone: result.spokenConfidence === "again" || result.chunkPlays >= 4 ? "warning" : "positive"
        });
    }
    if (result.recordingTakes > 0) {
        tags.push({
            label: `録音 ${result.recordingTakes}回`,
            tone: result.selfPlaybackCount > 0 ? "positive" : "warning"
        });
    }
    if (result.selfPlaybackCount > 0) {
        tags.push({ label: `聞き返し ${result.selfPlaybackCount}回`, tone: "positive" });
    }
    if (result.audioPlays >= 3) {
        tags.push({ label: `再生 ${result.audioPlays}回`, tone: result.audioPlays >= 4 ? "warning" : "positive" });
    }
    if (primaryError !== "smooth") {
        tags.push(getPrimaryErrorTag(primaryError));
    }

    const reviewPriority = calculateReviewPriority(result, {
        primaryError,
        missingTokens: [],
        extraTokens: [],
        sameInventory: false,
        looksIncomplete: false
    });

    return {
        operations: [],
        missingTokens: [],
        extraTokens: [],
        sameInventory: false,
        primaryError,
        tags,
        nextStep: buildNextStepMessage(primaryError, result, [], []),
        reviewPriority,
        priorityLabel: getReviewPriorityLabel(reviewPriority)
    };
}

function getPrimaryErrorTag(primaryError) {
    const map = {
        empty: { label: "未入力", tone: "critical" },
        incomplete: { label: "後半の聞き漏れ", tone: "critical" },
        "word-order": { label: "語順のズレ", tone: "critical" },
        "word-form": { label: "語形・スペル差", tone: "warning" },
        missing: { label: "聞き取り漏れ", tone: "critical" },
        extra: { label: "余分な入力", tone: "warning" },
        mixed: { label: "複合的なズレ", tone: "critical" },
        "hint-dependent": { label: "ヒント依存", tone: "warning" },
        "shadowing-keyphrase": { label: "キーフレーズ頼み", tone: "warning" },
        "shadowing-script": { label: "スクリプト頼み", tone: "warning" },
        "shadowing-repeat": { label: "再生回数が多め", tone: "warning" },
        "shadowing-again": { label: "要再音読", tone: "critical" },
        recovered: { label: "修正して正解", tone: "warning" },
        smooth: { label: "安定正解", tone: "positive" }
    };
    return map[primaryError] || { label: "要確認", tone: "warning" };
}

function calculateReviewPriority(result, analysis) {
    if (isShadowingResult(result)) {
        let score = 0;

        score += result.hintsUsed * 2;
        score += result.scriptReveals * 3;
        score += Math.max(result.audioPlays - 2, 0);
        score += Math.max(result.chunkPlays - 2, 0);
        if (result.spokenConfidence === "again" && result.selfPlaybackCount === 0) {
            score += 2;
        }

        if (analysis.primaryError === "shadowing-again") {
            score += 6;
        }
        if (analysis.primaryError === "shadowing-script") {
            score += 2;
        }
        if (result.question.difficulty === "hard") {
            score += 1;
        }

        return score;
    }

    let score = 0;

    if (!result.isCorrect) {
        score += 6;
    }
    score += Math.min(result.mistakes * 2, 8);
    score += Math.min(result.hintsUsed * 2, 6);
    score += Math.max(result.audioPlays - 1, 0);
    score += analysis.missingTokens.length + analysis.extraTokens.length;

    if (analysis.primaryError === "word-order" || analysis.primaryError === "mixed") {
        score += 2;
    }
    if (analysis.primaryError === "empty") {
        score += 3;
    }
    if (result.question.difficulty === "hard") {
        score += 1;
    }
    if (result.spokenConfidence === "again") {
        score += 3;
    }

    return score;
}

function getReviewPriorityLabel(score) {
    if (score >= 12) {
        return "優先度 高";
    }
    if (score >= 7) {
        return "優先度 中";
    }
    return "優先度 低";
}

function buildNextStepMessage(primaryError, result, missingTokens, extraTokens) {
    if (primaryError === "shadowing-again") {
        return "正解を見ながら1回、見ないで短く区切って1回を目安に練習し、自分の音読も1回録って聞き返しましょう。";
    }
    if (primaryError === "shadowing-script") {
        return "次はスクリプトをすぐ出さず、文頭と文末だけ意識して2回聞いてから重ね読みすると自立しやすいです。";
    }
    if (primaryError === "shadowing-keyphrase") {
        return "キーフレーズの助けで追えています。次回はヒントを1回減らし、音の塊だけで追う時間を増やしましょう。";
    }
    if (primaryError === "shadowing-repeat") {
        return "再生回数が増えています。次は前半と後半に分け、1回ごとに狙う範囲を決めて聞くと効率が上がります。";
    }
    if (primaryError === "empty") {
        return "次は書き出しの3語だけを狙って入力し、途中で止まっても空欄のままにしないのが第一歩です。";
    }
    if (primaryError === "incomplete") {
        return "前半は取れているので、音声の後半だけを意識してもう1回聞き、最後の2〜3語を拾いにいきましょう。";
    }
    if (primaryError === "word-order") {
        return "語は聞けています。今回は語順だけを意識して、正解音読を1回したあとに再入力すると整いやすいです。";
    }
    if (primaryError === "word-form") {
        return "意味は近いので、語尾や単複、時制の形だけに絞って確認すると修正しやすいです。";
    }
    if (primaryError === "missing" && missingTokens.length > 0) {
        return `聞き漏らしは ${missingTokens.slice(0, 2).join(" / ")} あたりです。そこだけを目印にして聞き直しましょう。`;
    }
    if (primaryError === "extra" && extraTokens.length > 0) {
        return `余分に入れた ${extraTokens.slice(0, 2).join(" / ")} を削る意識で、聞こえた範囲だけを残しましょう。`;
    }
    if (result.hintsUsed > 0) {
        return "今回はヒントで支えています。次は同じカテゴリをヒントなしで5問だけ解くと定着しやすいです。";
    }
    if (result.mistakes > 0) {
        return "大枠は合っています。ズレた箇所を見たあとに、同じ文を1回だけ打ち直すと安定感が上がります。";
    }
    return "次は同じ難易度でもう1問進み、今の再現性を維持できるかを確認しましょう。";
}

function shouldResultNeedReview(result) {
    if (isShadowingResult(result)) {
        return (
            result.spokenConfidence === "again" ||
            result.hintsUsed > 0 ||
            result.scriptReveals > 0 ||
            result.audioPlays >= 4 ||
            result.chunkPlays >= 4 ||
            (result.spokenConfidence === "again" && result.selfPlaybackCount === 0)
        );
    }

    return !result.isCorrect || result.hintsUsed > 0 || result.mistakes > 0 || result.spokenConfidence === "again";
}

function showQuestionFeedback(result) {
    const shadowingMode = isShadowingResult(result);
    const diffVisual = shadowingMode
        ? { hasTokens: false, correctHtml: "", userHtml: "" }
        : buildTokenDiffData(result.targetText, result.userAnswer);
    const analysis = result.analysis || analyzeResult(result);

    elements.categoryBadge.textContent = result.question.category;
    elements.difficultyBadge.textContent = difficultyLabel(result.question.difficulty);
    elements.questionFeedbackTitle.textContent = shadowingMode
        ? "シャドーイング振り返り"
        : result.isCorrect
            ? "正解です"
            : "答えを確認しました";
    elements.questionFeedbackSummary.textContent = shadowingMode
        ? [
            `${result.question.category} / ${difficultyLabel(result.question.difficulty)}`,
            `再生 ${result.audioPlays}回`,
            `フレーズ反復 ${result.chunkPlays || 0}回`,
            `キーフレーズ ${result.hintsUsed}回`,
            `スクリプト ${result.scriptReveals}回`,
            formatElapsed(result.elapsedMs)
        ].join(" / ")
        : [
            `${result.question.category} / ${difficultyLabel(result.question.difficulty)}`,
            `ミス ${result.mistakes}回`,
            `再生 ${result.audioPlays}回`,
            `ヒント ${result.hintsUsed}回`,
            formatElapsed(result.elapsedMs)
        ].join(" / ");
    elements.feedbackCorrectLabel.textContent = shadowingMode ? "お手本スクリプト" : "正解";
    elements.feedbackUserLabel.textContent = shadowingMode ? "練習ログ" : "あなたの入力";
    elements.feedbackCorrectText.textContent = result.targetText;
    elements.feedbackUserText.textContent = shadowingMode
        ? getShadowingPracticeLog(result)
        : result.userAnswer || "未入力";
    elements.feedbackDiffText.textContent = getReviewSummary(result);
    elements.feedbackTags.innerHTML = renderInsightTags(analysis.tags);
    elements.feedbackCorrectDiff.innerHTML = diffVisual.correctHtml;
    elements.feedbackUserDiff.innerHTML = diffVisual.userHtml;
    elements.feedbackDiffVisual.classList.toggle("hidden", shadowingMode || !diffVisual.hasTokens);
    elements.feedbackTipText.textContent = result.question.explanation || getCategoryTip(result.question.category);
    elements.feedbackNextStep.textContent = `次の一手: ${analysis.nextStep}`;
    elements.afterListeningSummary.textContent = getAfterListeningSummary(result);
    renderFeedbackChunkPractice(result);
    updateShadowingRecordingPanel(result);
    setShadowingButtonState(result.spokenConfidence);
    elements.nextBtn.textContent = currentIndex === playQueue.length - 1 ? "結果を見る" : "次の問題へ";
    elements.questionFeedback.classList.remove("hidden");
    elements.liveFeedback.textContent = shadowingMode
        ? "お手本を見ながら聞き直し、音読セルフチェックを選んでから次へ進みましょう。"
        : result.isCorrect
            ? "正解の根拠と復習ポイントを確認してから進みましょう。"
            : "答えと自分の入力を見比べて、聞き漏らした箇所を確認しましょう。";
}

function updateShadowingConfidence(confidence) {
    if (!currentQuestionState || !currentQuestionState.finalized || currentQuestionState.resultIndex == null) {
        return;
    }

    const result = results[currentQuestionState.resultIndex];
    if (!result) {
        return;
    }

    result.spokenConfidence = confidence;
    result.analysis = analyzeResult(result);
    result.reviewPriority = result.analysis.reviewPriority;
    result.needsReview = shouldResultNeedReview(result);
    showQuestionFeedback(result);
}

function setShadowingButtonState(confidence) {
    elements.shadowingGoodBtn.classList.toggle("is-active", confidence === "ready");
    elements.shadowingAgainBtn.classList.toggle("is-active", confidence === "again");
    elements.shadowingAgainBtn.classList.toggle("is-warning", confidence === "again");
    const result = currentQuestionState && currentQuestionState.resultIndex != null
        ? results[currentQuestionState.resultIndex]
        : null;
    elements.nextBtn.disabled = Boolean(
        result &&
        isShadowingResult(result) &&
        (!confidence || result.recordingStatus === "recording" || result.recordingStatus === "processing")
    );
}

function showResult() {
    cancelSpeech();

    const total = results.length;
    const correct = results.filter((result) => result.isCorrect).length;
    const totalMistakes = results.reduce((sum, result) => sum + result.mistakes, 0);
    const totalAudio = results.reduce((sum, result) => sum + result.audioPlays, 0);
    const totalChunkPlays = results.reduce((sum, result) => sum + Number(result.chunkPlays || 0), 0);
    const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
    const totalHints = results.reduce((sum, result) => sum + result.hintsUsed, 0);
    const totalScripts = results.reduce((sum, result) => sum + Number(result.scriptReveals || 0), 0);
    const totalReady = results.filter((result) => result.spokenConfidence === "ready").length;
    const shadowingAgainCount = results.filter((result) => result.spokenConfidence === "again").length;
    const previousSession = studyHistory[0] || null;
    const sessionSummary = buildSessionSummary();
    const shadowingMode = settings.mode === "shadowing";

    elements.resTotalLabel.textContent = "挑戦";
    elements.resCorrectLabel.textContent = shadowingMode ? "音読できた" : "正答";
    elements.resMissLabel.textContent = shadowingMode ? "キーフレーズ" : "ミス";
    elements.resAudioLabel.textContent = "再生";
    elements.resAccuracyLabel.textContent = shadowingMode ? "スクリプト / 反復" : "正答率";
    elements.resShadowingLabel.textContent = shadowingMode ? "要再音読" : "要再音読";
    elements.resTotal.textContent = String(total);
    elements.resCorrect.textContent = String(shadowingMode ? totalReady : correct);
    elements.resMiss.textContent = String(shadowingMode ? totalHints : totalMistakes);
    elements.resAudio.textContent = String(totalAudio);
    elements.resAccuracy.textContent = shadowingMode ? `${totalScripts} / 反復 ${totalChunkPlays}` : `${accuracy}%`;
    elements.resShadowing.textContent = String(shadowingAgainCount);
    elements.progressNote.textContent = buildProgressNote(sessionSummary, previousSession);

    renderWeaknessList();
    renderPatternList();
    renderReviewList();

    const hasReviewQueue = results.some((result) => result.needsReview);
    elements.retryMissedBtn.classList.toggle("hidden", !hasReviewQueue);

    updateMistakeBankFromResults(results);
    studyHistory = [sessionSummary, ...studyHistory].slice(0, MAX_HISTORY_ITEMS);
    persistMistakeBank();
    persistStudyHistory();
    renderStudyDashboard();

    showScreen("result");
}

function renderWeaknessList() {
    const categoryStats = calculateCategoryStats(results);
    const shadowingMode = settings.mode === "shadowing";

    const weaknessEntries = Object.entries(categoryStats)
        .sort(([, left], [, right]) => {
            if (right.reviewCount !== left.reviewCount) {
                return right.reviewCount - left.reviewCount;
            }
            return right.mistakes - left.mistakes;
        })
        .slice(0, 3);

    if (weaknessEntries.length === 0) {
        elements.weaknessList.innerHTML = "<li>今回のセッションにはまだ記録がありません。</li>";
        return;
    }

    elements.weaknessList.innerHTML = weaknessEntries
        .map(([category, stats]) => (
            shadowingMode
                ? `<li><strong>${escapeHtml(category)}</strong>は ${stats.attempts} 問中 ${stats.reviewCount} 問が復習候補です。フレーズ反復 ${stats.chunkPlays} 回 / キーフレーズ ${stats.hintsUsed} 回 / スクリプト ${stats.scriptReveals} 回でした。</li>`
                : `<li><strong>${escapeHtml(category)}</strong>は ${stats.attempts} 問中 ${stats.reviewCount} 問が復習候補です。ミス合計は ${stats.mistakes} 回でした。</li>`
        ))
        .join("");
}

function renderReviewList() {
    const reviewItems = results
        .filter((result) => result.needsReview)
        .sort((left, right) => right.reviewPriority - left.reviewPriority);

    if (reviewItems.length === 0) {
        elements.reviewList.innerHTML = `
            <div class="review-card is-clean">
                <h4>復習候補はありません</h4>
                <p>今回はヒントなしで安定して解けています。このまま別カテゴリにも広げていきましょう。</p>
            </div>
        `;
        return;
    }

    elements.reviewList.innerHTML = reviewItems
        .map((result) => {
            const advice = getReviewAdvice(result);
            const shadowingMode = isShadowingResult(result);
            const diffVisual = shadowingMode
                ? { hasTokens: false, correctHtml: "", userHtml: "" }
                : buildTokenDiffData(result.targetText, result.userAnswer);
            const analysis = result.analysis || analyzeResult(result);
            return `
                <div class="review-card">
                    <div class="review-header">
                        <h4>${escapeHtml(result.question.category)} / ${escapeHtml(difficultyLabel(result.question.difficulty))}</h4>
                        <span class="review-priority">${escapeHtml(analysis.priorityLabel)}</span>
                    </div>
                    <p><strong>正解:</strong> ${escapeHtml(result.targetText)}</p>
                    <p><strong>${shadowingMode ? "練習ログ" : "あなたの入力"}:</strong> ${escapeHtml(shadowingMode ? getShadowingPracticeLog(result) : result.userAnswer || "未入力")}</p>
                    <div class="insight-tags">${renderInsightTags(analysis.tags)}</div>
                    ${renderDiffVisualMarkup(diffVisual)}
                    <p>${escapeHtml(getReviewSummary(result))}</p>
                    <p>${escapeHtml(advice)}</p>
                    <p>${escapeHtml(`次の一手: ${analysis.nextStep}`)}</p>
                    <p class="review-meta">${escapeHtml(getReviewMetaText(result))}</p>
                </div>
            `;
        })
        .join("");
}

function renderPatternList() {
    const patternStats = results.reduce((accumulator, result) => {
        const analysis = result.analysis || analyzeResult(result);
        const key = analysis.primaryError;
        if (!accumulator[key]) {
            accumulator[key] = 0;
        }
        accumulator[key] += 1;
        return accumulator;
    }, {});

    const items = Object.entries(patternStats)
        .filter(([key]) => key !== "smooth")
        .sort((left, right) => right[1] - left[1])
        .slice(0, 3);

    if (items.length === 0) {
        elements.patternList.innerHTML = "<li>今回は大きなつまずき傾向はありません。安定して解けています。</li>";
        return;
    }

    elements.patternList.innerHTML = items
        .map(([pattern, count]) => (
            `<li><strong>${escapeHtml(getPatternLabel(pattern))}</strong> が ${count} 問ありました。${escapeHtml(getPatternAdvice(pattern))}</li>`
        ))
        .join("");
}

function buildSessionSummary() {
    const total = results.length;
    const correct = results.filter((result) => result.isCorrect).length;
    const totalReady = results.filter((result) => result.spokenConfidence === "ready").length;

    return {
        timestamp: new Date().toISOString(),
        sessionMode: settings.mode,
        total,
        correct,
        totalReady,
        accuracy: settings.mode === "shadowing"
            ? total === 0 ? 0 : Math.round((totalReady / total) * 100)
            : total === 0 ? 0 : Math.round((correct / total) * 100),
        totalMistakes: results.reduce((sum, result) => sum + result.mistakes, 0),
        totalAudio: results.reduce((sum, result) => sum + result.audioPlays, 0),
        totalChunkPlays: results.reduce((sum, result) => sum + Number(result.chunkPlays || 0), 0),
        totalHints: results.reduce((sum, result) => sum + result.hintsUsed, 0),
        totalScripts: results.reduce((sum, result) => sum + Number(result.scriptReveals || 0), 0),
        totalRecordings: results.reduce((sum, result) => sum + Number(result.recordingTakes || 0), 0),
        totalSelfPlaybacks: results.reduce((sum, result) => sum + Number(result.selfPlaybackCount || 0), 0),
        totalShadowingAgain: results.filter((result) => result.spokenConfidence === "again").length,
        settings: { ...settings },
        categoryStats: calculateCategoryStats(results),
        patternStats: calculatePatternStats(results)
    };
}

function updateMistakeBankFromResults(sessionResults) {
    const bankMap = new Map(mistakeBank.map((entry) => [entry.questionId, entry]));

    sessionResults.forEach((result) => {
        const existing = bankMap.get(result.question.id);

        if (!shouldResultNeedReview(result)) {
            bankMap.delete(result.question.id);
            return;
        }

        const previousScore = existing ? Number(existing.score || 0) : 0;
        const carriedScore = existing ? Math.ceil(previousScore * 0.45) : 0;
        const nextScore = Math.min(carriedScore + result.reviewPriority, 40);

        bankMap.set(result.question.id, {
            questionId: result.question.id,
            mode: result.mode,
            category: result.question.category,
            difficulty: result.question.difficulty,
            primaryError: result.analysis.primaryError,
            score: nextScore,
            reviewPriority: result.reviewPriority,
            lastSeenAt: Date.now(),
            lastStatus: result.status,
            mistakes: result.mistakes,
            hintsUsed: result.hintsUsed,
            audioPlays: result.audioPlays,
            chunkPlays: result.chunkPlays,
            scriptReveals: result.scriptReveals,
            spokenConfidence: result.spokenConfidence
        });
    });

    mistakeBank = [...bankMap.values()];
}

function calculateCategoryStats(items) {
    return items.reduce((accumulator, result) => {
        const key = result.question.category;
        if (!accumulator[key]) {
            accumulator[key] = {
                attempts: 0,
                mistakes: 0,
                chunkPlays: 0,
                hintsUsed: 0,
                scriptReveals: 0,
                reviewCount: 0
            };
        }

        accumulator[key].attempts += 1;
        accumulator[key].mistakes += result.mistakes;
        accumulator[key].chunkPlays += Number(result.chunkPlays || 0);
        accumulator[key].hintsUsed += result.hintsUsed;
        accumulator[key].scriptReveals += Number(result.scriptReveals || 0);
        if (result.needsReview) {
            accumulator[key].reviewCount += 1;
        }

        return accumulator;
    }, {});
}

function calculatePatternStats(items) {
    return items.reduce((accumulator, result) => {
        const analysis = result.analysis || analyzeResult(result);
        const key = analysis.primaryError;
        accumulator[key] = (accumulator[key] || 0) + 1;
        return accumulator;
    }, {});
}

function buildProgressNote(sessionSummary, previousSession) {
    if (sessionSummary.sessionMode === "shadowing") {
        if (!previousSession || previousSession.sessionMode !== "shadowing") {
            return `今回の音読達成率は ${sessionSummary.accuracy}% でした。次はスクリプト表示を減らせるか確認しましょう。`;
        }

        const previousAccuracy = Number(previousSession.accuracy || 0);
        const accuracyDiff = sessionSummary.accuracy - previousAccuracy;
        const scriptDiff = Number(previousSession.totalScripts || 0) - Number(sessionSummary.totalScripts || 0);
        const chunkDiff = Number(previousSession.totalChunkPlays || 0) - Number(sessionSummary.totalChunkPlays || 0);
        const playbackDiff = Number(sessionSummary.totalSelfPlaybacks || 0) - Number(previousSession.totalSelfPlaybacks || 0);

        if (accuracyDiff > 0) {
            return `前回より音読達成率が ${accuracyDiff}pt 上がりました。スクリプト表示も ${Math.max(scriptDiff, 0)} 回ぶん減っています。`;
        }

        if (accuracyDiff < 0) {
            return `前回より音読達成率が ${Math.abs(accuracyDiff)}pt 下がっています。要再音読の文だけに絞って短く回すと戻しやすいです。`;
        }

        if (scriptDiff > 0) {
            return `達成率は前回と同じですが、スクリプト表示は ${scriptDiff} 回減りました。音だけで追う力は上がっています。`;
        }

        if (chunkDiff > 0) {
            return `達成率は前回と同じですが、フレーズ反復は ${chunkDiff} 回減りました。難所の処理は軽くなっています。`;
        }

        if (playbackDiff > 0) {
            return `達成率は前回と同じですが、自分の音声を ${playbackDiff} 回多く聞き返しています。自己修正の質は上がっています。`;
        }

        return "前回と近い結果でした。キーフレーズ使用かスクリプト表示のどちらか一方だけ減らすのが次の一手です。";
    }

    if (!previousSession || previousSession.sessionMode === "shadowing") {
        return `今回の正答率は ${sessionSummary.accuracy}% でした。これが最初の基準になります。`;
    }

    const previousAccuracy = Number(previousSession.accuracy || 0);
    const previousMistakes = Number(previousSession.totalMistakes || 0);
    const accuracyDiff = sessionSummary.accuracy - previousAccuracy;
    const mistakesDiff = previousMistakes - sessionSummary.totalMistakes;

    if (accuracyDiff > 0) {
        return `前回より正答率が ${accuracyDiff}pt 上がりました。ミスも ${Math.max(mistakesDiff, 0)} 回ぶん減っています。`;
    }

    if (accuracyDiff < 0) {
        return `前回より正答率が ${Math.abs(accuracyDiff)}pt 下がっています。復習候補から1カテゴリだけ絞って再挑戦すると戻しやすいです。`;
    }

    if (mistakesDiff > 0) {
        return `正答率は前回と同じですが、ミスは ${mistakesDiff} 回減りました。入力の安定感は上がっています。`;
    }

    return "前回と近い結果でした。おすすめ復習カテゴリを1つ選んで、弱点を狙い撃ちするのが次の一手です。";
}

function buildTokenDiffData(correctText, userText) {
    const correctTokens = tokenizeForDiff(correctText);
    const userTokens = tokenizeForDiff(userText);
    const operations = diffTokens(correctTokens, userTokens);

    return {
        hasTokens: operations.length > 0,
        correctHtml: renderDiffLine(operations, "correct"),
        userHtml: renderDiffLine(operations, "user")
    };
}

function tokenizeForDiff(text) {
    const normalized = normalizeForProgress(text).trim();
    return normalized ? normalized.split(/\s+/).filter(Boolean) : [];
}

function hasSameTokenInventory(leftTokens, rightTokens) {
    if (leftTokens.length !== rightTokens.length) {
        return false;
    }

    const counts = new Map();
    leftTokens.forEach((token) => counts.set(token, (counts.get(token) || 0) + 1));
    rightTokens.forEach((token) => counts.set(token, (counts.get(token) || 0) - 1));

    return [...counts.values()].every((value) => value === 0);
}

function isTokenPrefix(prefixTokens, fullTokens) {
    if (prefixTokens.length >= fullTokens.length) {
        return false;
    }

    return prefixTokens.every((token, index) => token === fullTokens[index]);
}

function areTokensSimilar(leftToken, rightToken) {
    if (!leftToken || !rightToken) {
        return false;
    }

    if (leftToken === rightToken) {
        return true;
    }

    const distance = getEditDistance(leftToken, rightToken);
    return distance <= 2 || leftToken.startsWith(rightToken) || rightToken.startsWith(leftToken);
}

function getEditDistance(left, right) {
    const rows = left.length + 1;
    const cols = right.length + 1;
    const dp = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => (rowIndex === 0 ? colIndex : colIndex === 0 ? rowIndex : 0))
    );

    for (let row = 1; row < rows; row += 1) {
        for (let col = 1; col < cols; col += 1) {
            if (left[row - 1] === right[col - 1]) {
                dp[row][col] = dp[row - 1][col - 1];
            } else {
                dp[row][col] = Math.min(
                    dp[row - 1][col] + 1,
                    dp[row][col - 1] + 1,
                    dp[row - 1][col - 1] + 1
                );
            }
        }
    }

    return dp[rows - 1][cols - 1];
}

function diffTokens(correctTokens, userTokens) {
    const rows = correctTokens.length;
    const cols = userTokens.length;
    const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));

    for (let i = 1; i <= rows; i += 1) {
        for (let j = 1; j <= cols; j += 1) {
            if (correctTokens[i - 1] === userTokens[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const operations = [];
    let i = rows;
    let j = cols;

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && correctTokens[i - 1] === userTokens[j - 1]) {
            operations.unshift({ type: "match", value: correctTokens[i - 1] });
            i -= 1;
            j -= 1;
        } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
            operations.unshift({ type: "missing", value: correctTokens[i - 1] });
            i -= 1;
        } else {
            operations.unshift({ type: "extra", value: userTokens[j - 1] });
            j -= 1;
        }
    }

    return operations;
}

function renderDiffLine(operations, role) {
    return operations
        .map((operation) => renderDiffToken(operation, role))
        .join("");
}

function renderDiffToken(operation, role) {
    if (operation.type === "match") {
        return `<span class="token-chip token-match">${escapeHtml(operation.value)}</span>`;
    }

    if (operation.type === "missing") {
        if (role === "correct") {
            return `<span class="token-chip token-missing">${escapeHtml(operation.value)}</span>`;
        }
        return '<span class="token-chip token-placeholder">...</span>';
    }

    if (role === "user") {
        return `<span class="token-chip token-extra">${escapeHtml(operation.value)}</span>`;
    }

    return '<span class="token-chip token-placeholder">...</span>';
}

function renderDiffVisualMarkup(diffVisual) {
    if (!diffVisual.hasTokens) {
        return "";
    }

    return `
        <div class="diff-visual review-diff">
            <div class="diff-row">
                <span class="diff-row-label">正解の並び</span>
                <div class="diff-tokens">${diffVisual.correctHtml}</div>
            </div>
            <div class="diff-row">
                <span class="diff-row-label">あなたの並び</span>
                <div class="diff-tokens">${diffVisual.userHtml}</div>
            </div>
        </div>
    `;
}

function renderInsightTags(tags) {
    if (!tags || tags.length === 0) {
        return "";
    }

    return tags
        .map((tag) => `<span class="insight-tag ${getInsightToneClass(tag.tone)}">${escapeHtml(tag.label)}</span>`)
        .join("");
}

function getInsightToneClass(tone) {
    const map = {
        critical: "is-critical",
        warning: "is-warning",
        positive: "is-positive"
    };
    return map[tone] || "";
}

function getShadowingPracticeLog(result) {
    const confidenceLabel = result.spokenConfidence === "ready"
        ? "音読できた"
        : result.spokenConfidence === "again"
            ? "まだ不安"
            : "未選択";

    return `再生 ${result.audioPlays}回 / フレーズ反復 ${result.chunkPlays || 0}回 / キーフレーズ ${result.hintsUsed}回 / スクリプト ${result.scriptReveals || 0}回 / 録音 ${result.recordingTakes || 0}回 / 聞き返し ${result.selfPlaybackCount || 0}回 / 自己評価: ${confidenceLabel}`;
}

function getReviewMetaText(result) {
    if (isShadowingResult(result)) {
        return `${getShadowingPracticeLog(result)} / ${formatElapsed(result.elapsedMs)}`;
    }

    return `再生 ${result.audioPlays}回 / ヒント ${result.hintsUsed}回 / ミス ${result.mistakes}回 / ${formatElapsed(result.elapsedMs)}`;
}

function getPatternLabel(pattern) {
    const labels = {
        empty: "未入力",
        incomplete: "後半の聞き漏れ",
        "word-order": "語順のズレ",
        "word-form": "語形・スペル差",
        missing: "聞き取り漏れ",
        extra: "余分な入力",
        mixed: "複合的なズレ",
        "hint-dependent": "ヒント依存",
        "shadowing-keyphrase": "キーフレーズ頼み",
        "shadowing-script": "スクリプト頼み",
        "shadowing-repeat": "再生回数が多め",
        "shadowing-again": "要再音読",
        recovered: "途中修正",
        smooth: "安定正解"
    };
    return labels[pattern] || "要確認";
}

function getPatternAdvice(pattern) {
    const adviceMap = {
        empty: "最初の3語だけでも書き始める練習を入れると改善しやすいです。",
        incomplete: "後半だけを狙って聞き直すと、取り切れない部分が絞れます。",
        "word-order": "音読してから再入力し、語の並びだけに集中すると改善しやすいです。",
        "word-form": "時制・単複・語尾だけを意識して見直すと安定します。",
        missing: "抜けた語に印を付けて、そこだけ聞き直す復習が有効です。",
        extra: "聞こえた語だけを残す意識で、推測した語をいったん削ってみましょう。",
        mixed: "一度に直そうとせず、書き出しと後半に分けて練習するのが有効です。",
        "hint-dependent": "同じカテゴリをヒントなしで少数だけ解く練習に切り替えると定着します。",
        "shadowing-keyphrase": "キーフレーズを見たあとに、見ない状態で同じ文をもう1回だけ追う練習が有効です。",
        "shadowing-script": "スクリプトを出す前に、音声だけで文頭と文末を拾う練習を挟むと自立しやすくなります。",
        "shadowing-repeat": "毎回全文を聞き直すより、言いにくい部分だけを区切って反復する方が効率的です。",
        "shadowing-again": "短く区切って重ね読みし、最後に全文を1回つなげると音読しやすくなります。",
        recovered: "ずれた箇所を確認したうえで、同じ文を1回だけ打ち直すと再現性が上がります。"
    };
    return adviceMap[pattern] || "復習候補から1問だけ選んで、音声と解答を見比べてみましょう。";
}

function getAfterListeningSummary(result) {
    if (isShadowingResult(result)) {
        if (result.spokenConfidence === "ready") {
            return result.selfPlaybackCount > 0
                ? "音読まで通せていて、聞き返しもできています。次はスクリプトを見ずに1回だけ通せるか確認しましょう。"
                : "音読まで通せています。次は自分の音声も1回録って聞き返し、スクリプトなしで通せるか確認しましょう。";
        }

        if (result.spokenConfidence === "again") {
            return result.selfPlaybackCount > 0
                ? "要再音読にしています。聞き返し結果をもとに、文頭3語と文末3語を先に固め、必要ならフレーズ反復で真ん中だけをつなぎましょう。"
                : "要再音読にしています。文頭3語と文末3語を先に固め、必要ならフレーズ反復を使い、自分の音読も録って聞き返すと安定しやすいです。";
        }

        return "お手本を見ながら1回、見ないで1回を目安に音読し、必要ならフレーズ反復を使ってから自己評価を選びましょう。";
    }

    if (result.spokenConfidence === "ready") {
        return "音読までできています。次は同じカテゴリで、見ない状態でも言えるか試しましょう。";
    }

    if (result.spokenConfidence === "again") {
        return "要再音読にしています。正解を見ながら1回聞いてから、短く区切って声に出すのがおすすめです。";
    }

    return "正解を見ながら音声を1回聞き、声に出して言えたかを自己チェックしてから次へ進みましょう。";
}

function getReviewSummary(result) {
    const analysis = result.analysis || analyzeResult(result);

    if (isShadowingResult(result)) {
        if (result.spokenConfidence === "ready" && result.hintsUsed === 0 && result.scriptReveals === 0 && result.audioPlays <= 2) {
            return "音声中心でそのまま追えており、シャドーイングとしてかなり安定しています。";
        }

        if (analysis.primaryError === "shadowing-again") {
            return result.selfPlaybackCount > 0
                ? "まだ口が追いついていません。聞き返しでズレた箇所を見つけたうえで、音のつながりが強い部分だけを切り出して練習すると改善しやすいです。"
                : "まだ口が追いついていません。音のつながりが強い部分だけを切り出して練習し、自分の音読も一度聞き返すと改善しやすいです。";
        }

        if (analysis.primaryError === "shadowing-script") {
            return "内容理解はできていますが、スクリプトへの依存が残っています。音だけで追う時間をもう少し確保しましょう。";
        }

        if (analysis.primaryError === "shadowing-keyphrase") {
            return "キーフレーズで支えれば追えています。次はヒントを減らし、音の塊でそのまま追う練習が有効です。";
        }

        if (result.chunkPlays >= 3 && result.spokenConfidence === "ready") {
            return "難所を切り出して練習できています。次は反復回数を少し減らしても通せるか試しましょう。";
        }

        if (result.recordingTakes > 0 && result.selfPlaybackCount === 0) {
            return "録音はできています。次は自分の音声を聞き返し、語尾や区切りの甘い部分を1か所だけ直してみましょう。";
        }

        if (analysis.primaryError === "shadowing-repeat") {
            return "再生回数が多めでした。全文を何度も聞くより、難所だけに的を絞る方が効率的です。";
        }

        return "お手本に重ねて音読する流れはできています。次は支えを少し減らしても追えるか試しましょう。";
    }

    if (result.isCorrect && result.mistakes === 0 && result.hintsUsed === 0) {
        return "初回の聞き取りでそのまま正解できました。";
    }

    if (result.isCorrect) {
        if (result.hintsUsed > 0) {
            return `正解には届いていますが、ヒントを ${result.hintsUsed} 回使いました。ヒントなしで再現できるかもう一度試しましょう。`;
        }
        return `正解には届いていますが、途中で ${result.mistakes} 回つまずいています。ずれた箇所の音を確認しておくと安定します。`;
    }

    if (!result.userAnswer) {
        return "未入力のまま答えを確認しました。音声をもう一度聞いて、書き出しから再現してみましょう。";
    }

    if (analysis.primaryError === "incomplete") {
        return "前半は取れています。後半の取り切れなかった語だけを狙って聞き直すと改善しやすいです。";
    }

    if (analysis.primaryError === "word-order") {
        return "語自体は聞けています。今回は語順だけを立て直せば正解に届く状態です。";
    }

    if (analysis.primaryError === "word-form") {
        return "意味の近い語までは取れています。時制・単複・語尾の形に絞って確認しましょう。";
    }

    if (analysis.primaryError === "missing") {
        return "語の抜けが中心です。抜けた語を先に確認してから音声を追うと定着しやすいです。";
    }

    if (analysis.primaryError === "extra") {
        return "聞こえた以上に書いてしまっています。推測した語を削って、聞こえた範囲だけ残す意識が有効です。";
    }

    const comparison = compareAttempt(result.userAnswer, result.targetText);
    const mismatchPoint = comparison.mismatchExpected === " "
        ? "単語の切れ目"
        : comparison.mismatchExpected || "文末";
    return `「${mismatchPoint}」付近でずれています。語順と語形の聞き取りを確認しましょう。`;
}

function getReviewAdvice(result) {
    const categoryTip = result.question.explanation || getCategoryTip(result.question.category);
    const analysis = result.analysis || analyzeResult(result);

    if (isShadowingResult(result)) {
        if (result.recordingTakes > 0 && result.selfPlaybackCount === 0) {
            return `${categoryTip} 録音した自分の音声を1回聞き返すだけでも、語尾や間のズレに気づきやすくなります。`;
        }
        return `${categoryTip} ${getPatternAdvice(analysis.primaryError)}`;
    }

    if (!result.isCorrect) {
        return `${categoryTip} ${getPatternAdvice(analysis.primaryError)}`;
    }

    if (result.hintsUsed > 0) {
        return `${categoryTip} ヒントに頼ったので、次回はヒントなしで同じ長さの文に挑戦すると定着しやすくなります。`;
    }

    return `${categoryTip} 途中でつまずいた箇所を意識して、もう1回だけ音声を聞き直しておきましょう。`;
}

function getHintText(question, hintLevel) {
    if (settings.mode === "shadowing") {
        return getShadowingHintText(question, hintLevel);
    }
    if (settings.type === "blank") {
        return getBlankHintText(question, hintLevel);
    }
    return getSentenceHintText(question, hintLevel);
}

function getShadowingHintText(question, hintLevel) {
    const words = question.en.split(/\s+/);
    const middleIndex = Math.max(0, Math.floor(words.length / 2) - 1);
    if (hintLevel === 0) {
        return `${question.wordCount}語 / ${difficultyLabel(question.difficulty)} レベルです。まずは音声だけで追いましょう。`;
    }
    if (hintLevel === 1) {
        return `文頭キーフレーズ: ${words.slice(0, Math.min(3, words.length)).join(" ")}`;
    }
    if (hintLevel === 2) {
        return `中央キーフレーズ: ${words.slice(middleIndex, Math.min(middleIndex + 3, words.length)).join(" ")}`;
    }
    return `文末キーフレーズ: ${words.slice(Math.max(words.length - 3, 0)).join(" ")}`;
}

function buildShadowingChunks(text) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean);
    if (words.length <= 4) {
        return words.length ? [words.join(" ")] : [];
    }

    const targetChunkCount = words.length <= 7 ? 2 : words.length <= 11 ? 3 : 4;
    const preferredSize = Math.max(3, Math.ceil(words.length / targetChunkCount));
    const minChunkSize = 2;
    const chunks = [];
    let current = [];

    words.forEach((word, index) => {
        current.push(word);

        const remainingWords = words.length - index - 1;
        const remainingChunks = targetChunkCount - chunks.length - 1;
        const minimumWordsNeeded = Math.max(remainingChunks * minChunkSize, 0);
        const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, "");
        const boundaryByPunctuation = /[,:;]$/.test(word);
        const boundaryByCue = SHADOWING_BOUNDARY_WORDS.has(normalizedWord);
        const canSplit = current.length >= minChunkSize && remainingWords >= minimumWordsNeeded;
        const reachedPreferredSize = current.length >= preferredSize;

        if (canSplit && (boundaryByPunctuation || reachedPreferredSize || (boundaryByCue && current.length >= 3))) {
            chunks.push(current.join(" "));
            current = [];
        }
    });

    if (current.length > 0) {
        if (current.length === 1 && chunks.length > 0) {
            chunks[chunks.length - 1] = `${chunks[chunks.length - 1]} ${current[0]}`;
        } else {
            chunks.push(current.join(" "));
        }
    }

    if (chunks.length === 1 && words.length >= 6) {
        const midpoint = Math.ceil(words.length / 2);
        return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
    }

    return chunks;
}

function getBlankHintText(question, hintLevel) {
    const answer = question.blankWord;
    if (hintLevel === 0) {
        return settings.mode === "practice"
            ? `${answer.length} letters の語が入ります。`
            : "必要ならヒントを段階的に表示できます。";
    }
    if (hintLevel === 1) {
        return `1文字目は ${answer.charAt(0)} です。`;
    }
    if (hintLevel === 2) {
        return `前半ヒント: ${answer.slice(0, Math.min(3, answer.length))}${"_".repeat(Math.max(answer.length - Math.min(3, answer.length), 0))}`;
    }
    return `答え: ${answer}`;
}

function getSentenceHintText(question, hintLevel) {
    const words = question.en.split(/\s+/);
    if (hintLevel === 0) {
        return settings.mode === "practice"
            ? `${question.wordCount}語 / ${difficultyLabel(question.difficulty)} レベルです。`
            : "必要ならヒントを段階的に表示できます。";
    }
    if (hintLevel === 1) {
        return `最初の語は ${words[0]} です。`;
    }
    if (hintLevel === 2) {
        return `書き出し: ${words.slice(0, Math.min(3, words.length)).join(" ")} ...`;
    }
    return `答え: ${question.en}`;
}

function maskBlankWord(question) {
    const replacement = `[ ${"_".repeat(question.blankWord.length)} ]`;
    return replaceWholeWordOccurrence(question.en, question.blankWord, question.blankOccurrence, replacement);
}

function replaceWholeWordOccurrence(text, word, occurrence, replacement) {
    let currentMatch = 0;
    return text.replace(createWholeWordRegex(word), (match) => {
        currentMatch += 1;
        return currentMatch === occurrence ? replacement : match;
    });
}

function countWholeWordMatches(text, word) {
    if (!text || !word) {
        return 0;
    }
    const matches = text.match(createWholeWordRegex(word));
    return matches ? matches.length : 0;
}

function createWholeWordRegex(word) {
    return new RegExp(`\\b${escapeRegExp(word)}\\b`, "g");
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeForProgress(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:"']/g, "")
        .replace(/\s+/g, " ")
        .replace(/^\s+/, "");
}

function deriveDifficulty(text) {
    const wordCount = countWords(text);
    if (wordCount <= 7) {
        return "easy";
    }
    if (wordCount <= 10) {
        return "medium";
    }
    return "hard";
}

function countWords(text) {
    return String(text || "").trim().split(/\s+/).filter(Boolean).length;
}

function difficultyLabel(level) {
    const labels = {
        easy: "やさしめ",
        medium: "標準",
        hard: "チャレンジ"
    };
    return labels[level] || "標準";
}

function formatElapsed(milliseconds) {
    return `${Math.max(1, Math.round(milliseconds / 1000))}秒`;
}

function getCategoryTip(category) {
    return CATEGORY_TIPS[category] || `${category}のポイントを意識して、語順と語形がどう決まるかを確認しましょう。`;
}

function showScreen(screenName) {
    Object.values(screens).forEach((screen) => screen.classList.remove("active"));
    screens[screenName].classList.add("active");
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
