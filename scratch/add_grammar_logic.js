const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const grammarLogic = `
// ==========================================
// GRAMMAR DRILLS LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Verificamos se o script de exercicios foi carregado (grammarExercises)
    if (typeof grammarExercises === 'undefined') return;

    let currentCategory = "Crase";
    let filteredExercises = [];
    let currentDrillIndex = 0;
    let score = 0;
    let isTurboMode = false;
    let turboTimer = null;
    let timeLeft = 60;

    const categoryBtns = document.querySelectorAll('.drill-category-btn');
    const turboBtn = document.getElementById('btn-turbo-mode');
    const timerContainer = document.getElementById('turbo-timer-container');
    const timerDisplay = document.getElementById('turbo-timer-display');
    const drillQuestion = document.getElementById('drill-question');
    const drillOptions = document.getElementById('drill-options');
    const drillFeedback = document.getElementById('drill-feedback');
    const btnNextDrill = document.getElementById('btn-next-drill');
    const drillCounter = document.getElementById('drill-counter');
    const drillScore = document.getElementById('drill-score');

    if (!drillQuestion) return; // fail-safe if DOM elements not found

    function loadDrills() {
        if (currentCategory === "PontosFracos") {
            // Em uma implementação real, buscaria do localStorage
            filteredExercises = [...grammarExercises].sort(() => 0.5 - Math.random()).slice(0, 5);
        } else {
            filteredExercises = grammarExercises.filter(ex => ex.category === currentCategory);
            // Embaralhar as questões da categoria
            filteredExercises.sort(() => 0.5 - Math.random());
        }
        
        currentDrillIndex = 0;
        score = 0;
        updateScoreboard();
        showCurrentDrill();
    }

    function updateScoreboard() {
        drillCounter.innerText = (currentDrillIndex + 1);
        drillScore.innerText = score;
    }

    function showCurrentDrill() {
        if (currentDrillIndex >= filteredExercises.length) {
            drillQuestion.innerHTML = \`<span style="color:var(--success)">Fim do treino! Você acertou \${score} questões.</span>\`;
            drillOptions.innerHTML = '';
            drillFeedback.classList.add('hidden');
            btnNextDrill.classList.add('hidden');
            if (isTurboMode) stopTurboMode();
            return;
        }

        const ex = filteredExercises[currentDrillIndex];
        drillQuestion.innerText = ex.question;
        drillOptions.innerHTML = '';
        drillFeedback.classList.add('hidden');
        btnNextDrill.classList.add('hidden');

        ex.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary';
            btn.innerText = opt;
            btn.onclick = () => handleAnswer(idx, ex, btn);
            drillOptions.appendChild(btn);
        });
        updateScoreboard();
    }

    function handleAnswer(selectedIndex, ex, btnElement) {
        // Disable all buttons
        Array.from(drillOptions.children).forEach(b => b.disabled = true);
        
        const isCorrect = (selectedIndex === ex.correctOptionIndex);
        
        if (isCorrect) {
            btnElement.style.backgroundColor = 'var(--success)';
            btnElement.style.color = 'white';
            score++;
            drillFeedback.innerHTML = \`<strong>Correto! 🎉</strong><br>\${ex.explanation}\`;
            drillFeedback.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            drillFeedback.style.borderLeft = '4px solid var(--success)';
        } else {
            btnElement.style.backgroundColor = 'var(--danger)';
            btnElement.style.color = 'white';
            
            // highlight correct one
            drillOptions.children[ex.correctOptionIndex].style.backgroundColor = 'var(--success)';
            drillOptions.children[ex.correctOptionIndex].style.color = 'white';
            
            drillFeedback.innerHTML = \`<strong>Incorreto! ❌</strong><br>\${ex.explanation}\`;
            drillFeedback.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
            drillFeedback.style.borderLeft = '4px solid var(--danger)';
        }
        
        drillFeedback.classList.remove('hidden');
        btnNextDrill.classList.remove('hidden');
        updateScoreboard();
    }

    btnNextDrill.addEventListener('click', () => {
        currentDrillIndex++;
        showCurrentDrill();
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            if (isTurboMode) stopTurboMode();
            loadDrills();
        });
    });

    // Turbo Mode Logic
    function startTurboMode() {
        isTurboMode = true;
        timeLeft = 60;
        currentCategory = "PontosFracos"; // Turbo mode embaralha tudo
        
        // Ativar modo visual Turbo
        categoryBtns.forEach(b => b.classList.remove('active'));
        turboBtn.classList.add('active');
        turboBtn.innerText = "Parar Turbo ⏹️";
        
        timerContainer.classList.remove('hidden');
        timerDisplay.innerText = timeLeft;
        
        // Puxa 20 questoes aleatorias do db
        filteredExercises = [...grammarExercises].sort(() => 0.5 - Math.random()).slice(0, 20);
        currentDrillIndex = 0;
        score = 0;
        updateScoreboard();
        showCurrentDrill();

        turboTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.innerText = timeLeft;
            if (timeLeft <= 0) {
                stopTurboMode(true);
            }
        }, 1000);
    }

    function stopTurboMode(timeUp = false) {
        clearInterval(turboTimer);
        isTurboMode = false;
        timerContainer.classList.add('hidden');
        turboBtn.innerText = "Modo Turbo (60s) 🚀";
        turboBtn.classList.remove('active');
        
        if (timeUp) {
            drillQuestion.innerHTML = \`<span style="color:var(--danger)">Tempo Esgotado! ⏱️</span><br>Você acertou \${score} questões no Modo Turbo.\`;
            drillOptions.innerHTML = '';
            drillFeedback.classList.add('hidden');
            btnNextDrill.classList.add('hidden');
        } else {
            // Se apenas parou o turbo, volta pra crase
            currentCategory = "Crase";
            document.querySelector('[data-category="Crase"]').classList.add('active');
            loadDrills();
        }
    }

    turboBtn.addEventListener('click', () => {
        if (isTurboMode) {
            stopTurboMode();
        } else {
            startTurboMode();
        }
    });

    // Iniciar a primeira vez
    loadDrills();
});
`;

code = code + '\n' + grammarLogic;
fs.writeFileSync('script.js', code, 'utf8');
console.log('Added grammar logic to script.js');
