let currentRepertoryFilter = 'intro';
let showFavoritesOnly = false;
let currentRepertorySearch = '';

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation & Core Elements ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const appLayouts = document.querySelectorAll('.app-layout');

    // --- Repertory Filter UI ---
    const btnToggleIntro = document.getElementById('btn-toggle-intro');
    const btnToggleDev = document.getElementById('btn-toggle-dev');
    const btnFilterFavs = document.getElementById('btn-filter-favs');
    const inputSearchRep = document.getElementById('repertory-search');
    const filterBar = document.getElementById('repertory-filter-bar');

    if (inputSearchRep) {
        inputSearchRep.addEventListener('input', (e) => {
            currentRepertorySearch = e.target.value.trim().toLowerCase();
            if (currentBanca && currentBanca.eixosTematicos[currentEixoIndex]) {
                mostrarEixo(currentBanca.eixosTematicos[currentEixoIndex]);
            }
        });
    }

    function updateFilterBtns() {
        if (!btnToggleIntro) return;

        // Update Toggle Switch
        if (currentRepertoryFilter === 'intro') {
            btnToggleIntro.classList.add('active');
            btnToggleIntro.style.background = 'var(--primary)';
            btnToggleIntro.style.color = 'white';

            btnToggleDev.classList.remove('active');
            btnToggleDev.style.background = 'transparent';
            btnToggleDev.style.color = 'var(--text-main)';
        } else {
            btnToggleDev.classList.add('active');
            btnToggleDev.style.background = 'var(--primary)';
            btnToggleDev.style.color = 'white';

            btnToggleIntro.classList.remove('active');
            btnToggleIntro.style.background = 'transparent';
            btnToggleIntro.style.color = 'var(--text-main)';
        }

        // Update Favorites Button
        if (showFavoritesOnly) {
            btnFilterFavs.classList.add('active');
            btnFilterFavs.style.background = 'var(--warning)';
            btnFilterFavs.style.color = '#fff';
            btnFilterFavs.style.borderColor = 'var(--warning)';
        } else {
            btnFilterFavs.classList.remove('active');
            btnFilterFavs.style.background = 'transparent';
            btnFilterFavs.style.color = 'var(--text-main)';
            btnFilterFavs.style.borderColor = 'var(--panel-border)';
        }
    }

    if (btnToggleIntro) {
        btnToggleIntro.addEventListener('click', () => { currentRepertoryFilter = 'intro'; updateFilterBtns(); if (currentBanca.eixosTematicos[currentEixoIndex]) mostrarEixo(currentBanca.eixosTematicos[currentEixoIndex]); });
        btnToggleDev.addEventListener('click', () => { currentRepertoryFilter = 'dev'; updateFilterBtns(); if (currentBanca.eixosTematicos[currentEixoIndex]) mostrarEixo(currentBanca.eixosTematicos[currentEixoIndex]); });
        btnFilterFavs.addEventListener('click', () => { showFavoritesOnly = !showFavoritesOnly; updateFilterBtns(); if (currentBanca.eixosTematicos[currentEixoIndex]) mostrarEixo(currentBanca.eixosTematicos[currentEixoIndex]); });
        updateFilterBtns();
    }
    const essayInput = document.getElementById('essay');
    const wordCountVal = document.getElementById('word-count-val');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const backBtn = document.getElementById('back-btn');

    const writeView = document.getElementById('write-view');
    const resultView = document.getElementById('result-view');
    const themeInput = document.getElementById('theme');
    const themeDisplay = document.getElementById('theme-display');
    const correctedText = document.getElementById('corrected-text');

    const tooltip = document.getElementById('error-tooltip');
    const tooltipOriginal = document.getElementById('tooltip-original');
    const tooltipSuggestion = document.getElementById('tooltip-suggestion');
    const tooltipExplanation = document.getElementById('tooltip-explanation');
    const tooltipHeader = document.querySelector('.tooltip-header');

    // Elementos da Banca
    const bancaSelect = document.getElementById('banca-select');
    const titleContainer = document.getElementById('title-container');
    const titleStatus = document.getElementById('title-status');
    const essayTitle = document.getElementById('essay-title');
    const finalScoreValue = document.getElementById('final-score-value');
    const finalScoreMax = document.getElementById('final-score-max');
    const competenciesContainer = document.getElementById('competencies-container');
    const resumoPraticoText = document.getElementById('resumo-pratico-text');
    const axisSelector = document.getElementById('axis-selector');
    const currentAxisTitle = document.getElementById('current-axis-title');
    const repertoryList = document.getElementById('repertory-list');

    // Elementos do Flashcard
    const btnRepPratica = document.getElementById('btn-rep-pratica');
    const btnRepFlashcards = document.getElementById('btn-rep-flashcards');
    const repPracticeContainer = document.getElementById('repertory-practice-container');
    const flashcardsContainer = document.getElementById('flashcards-container');
    const fcElement = document.getElementById('flashcard-element');
    const btnFcPrev = document.getElementById('btn-fc-prev');
    const btnFcNext = document.getElementById('btn-fc-next');

    let currentBanca = BANCAS['ENEM']; // Default

    // Flashcard variables
    let currentFlashcards = [];
    let flashcardIndex = 0;
    let currentEixoIndex = 0; // eixo ativo no painel de repertório

    function updateBancaUI() {
        currentBanca = BANCAS[bancaSelect.value];

        const selectedGenero = currentBanca.generosPermitidos[0] || 'dissertativo';

        // Atualiza Título
        if (selectedGenero === 'carta') {
            titleContainer.style.display = 'none';
        } else {
            titleContainer.style.display = 'block';
            if (currentBanca.exigeTitulo) {
                titleStatus.textContent = "(Obrigatório)";
                titleStatus.style.color = "var(--danger)";
            } else {
                titleStatus.textContent = "(Opcional)";
                titleStatus.style.color = "var(--text-muted)";
            }
        }

        // Atualiza Resumo Prático
        resumoPraticoText.textContent = currentBanca.resumoPratico || "";

        // Atualiza Labels dos botões de navegação
        navButtons.forEach(btn => {
            if (btn.dataset.mode === 'training') btn.textContent = currentBanca.labelTreino || "Treino por Partes";
            if (btn.dataset.mode === 'full') btn.textContent = currentBanca.labelFolha || "Folha de Redação";
        });

        // Atualiza Aba de Treino por Partes
        if (selectedGenero === 'carta') {
            document.getElementById('train-title-1').textContent = "1. Cabeçalho, Vocativo e Introdução";
            document.getElementById('train-hint-1').textContent = "Local, data, vocativo respeitoso e apresentação do tema ao leitor/veículo.";
            document.getElementById('train-title-2').textContent = "2. Argumentação (Diálogo com Veículo)";
            document.getElementById('train-hint-2').textContent = "Apresente o argumento dialogando diretamente com a revista/jornal ou autor da matéria.";
            document.getElementById('train-title-3').textContent = "3. Aprofundamento Crítico";
            document.getElementById('train-hint-3').textContent = "Traga uma consequência ou repertório produtivo e posicione-se criticamente.";
            document.getElementById('train-title-4').textContent = "4. Conclusão, Despedida e Assinatura";
            document.getElementById('train-hint-4').textContent = "Reflexão final, despedida formal e assinatura neutra (Ex: Um(a) leitor(a)). NUNCA assine com nome real!";
        } else {
            document.getElementById('train-title-1').textContent = "1. Introdução";
            document.getElementById('train-hint-1').textContent = "Apresente o tema, contextualização/repertório e sua tese com dois argumentos.";
            document.getElementById('train-title-2').textContent = "2. Desenvolvimento 1";
            document.getElementById('train-hint-2').textContent = "Apresente o primeiro argumento com causa, repertório legitimado e reflexão crítica.";
            document.getElementById('train-title-3').textContent = "3. Desenvolvimento 2";
            document.getElementById('train-hint-3').textContent = "Apresente o segundo argumento aprofundando o debate e a consequência social.";
            document.getElementById('train-title-4').textContent = "4. Conclusão";

            // Diferenciação entre bancas de Intervenção (ENEM / EXATO) e Síntese Reflexiva (UEMA / UFG / UNITINS)
            const isGomifesBanca = currentBanca.id === 'ENEM' || currentBanca.id === 'EXATO_DISSERTATIVO';
            if (isGomifesBanca) {
                document.getElementById('train-hint-4').textContent = "Retome a tese e elabore a proposta de intervenção social com os 5 elementos (GOMIFES: Agente, Ação, Meio/Modo, Efeito e Detalhamento).";
            } else {
                document.getElementById('train-hint-4').textContent = "Retome a tese e construa uma síntese circular reflexiva e crítica profunda. (ATENÇÃO: Proibido modelo de proposta GOMIFES nesta banca!).";
            }
        }

        // Sincroniza as opções do seletor do Modo Tutorial conforme gênero da banca
        const tutorialParagraphSelect = document.getElementById('tutorial-paragraph-select');
        if (tutorialParagraphSelect) {
            const currentVal = tutorialParagraphSelect.value;
            if (selectedGenero === 'carta') {
                tutorialParagraphSelect.innerHTML = `
                    <option value="intro">1. Cabeçalho, Vocativo e Introdução (3 Frases)</option>
                    <option value="d1">2. Argumentação e Diálogo (4 Frases)</option>
                    <option value="d2">3. Aprofundamento Crítico (4 Frases)</option>
                    <option value="conclusao">4. Conclusão, Despedida e Assinatura (3 Frases)</option>
                `;
            } else {
                const isGomifes = currentBanca.id === 'ENEM' || currentBanca.id === 'EXATO_DISSERTATIVO';
                const conclusaoLabel = isGomifes ? "Conclusão com Intervenção GOMIFES (3 Frases)" : "Conclusão com Síntese Circular (3 Frases)";
                tutorialParagraphSelect.innerHTML = `
                    <option value="intro">Introdução (3 Frases)</option>
                    <option value="d1">Desenvolvimento 1 (4 Frases)</option>
                    <option value="d2">Desenvolvimento 2 (4 Frases)</option>
                    <option value="conclusao">${conclusaoLabel}</option>
                `;
            }
            if (['intro', 'd1', 'd2', 'conclusao'].includes(currentVal)) {
                tutorialParagraphSelect.value = currentVal;
            }
        }

        // Renderiza Eixos Temáticos
        renderEixos();

        // Atualiza cabeçalhos das abas para mostrar a banca
        const views = [
            { id: 'write-view', title: 'Folha de Redação' },
            { id: 'training-view', title: 'Treino Guiado por Partes' },
            { id: 'repertory-view', title: 'Treinamento de Repertório Sociocultural' },
            { id: 'grammar-view', title: 'Treinamento Gramatical (Microestruturas)' },
            { id: 'model-view', title: 'Meu Modelo (Esqueleto Estratégico)' }
        ];

        views.forEach(v => {
            const view = document.getElementById(v.id);
            if (view) {
                const h2 = view.querySelector('h2');
                if (h2) {
                    h2.innerHTML = `${v.title} <span style="font-size: 0.6em; background: var(--primary); color: white; padding: 2px 8px; border-radius: 12px; vertical-align: middle; margin-left: 10px;">Banca: ${currentBanca.nome}</span>`;
                }
            }
        });
    }

    // Navigation Logic
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = document.getElementById(`${btn.dataset.mode}-view`);
            switchMode(btn, targetView);
        });
    });

    bancaSelect.addEventListener('change', updateBancaUI);
    updateBancaUI(); // initial call

    // Mode Toggle
    const btnModeFull = document.getElementById('btn-mode-full');
    const btnModeTraining = document.getElementById('btn-mode-training');
    const btnModeRepertory = document.getElementById('btn-mode-repertory');
    const btnModeGrammar = document.getElementById('btn-mode-grammar');
    const btnModeModel = document.getElementById('btn-mode-model');
    const btnModeResult = document.getElementById('btn-mode-result');

    const trainingView = document.getElementById('training-view');
    const repertoryView = document.getElementById('repertory-view');
    const grammarView = document.getElementById('grammar-view');
    const modelView = document.getElementById('model-view');

    const analyzeTrainingBtn = document.getElementById('analyze-training-btn');

    let lastActiveView = writeView; // Track the last view before result

    function switchMode(activeBtn, activeView) {
        if (!activeBtn) return;
        [btnModeFull, btnModeTraining, btnModeRepertory, btnModeGrammar, btnModeModel, btnModeResult].forEach(btn => btn && btn.classList.remove('active'));
        [writeView, trainingView, repertoryView, grammarView, modelView, resultView].forEach(view => view && view.classList.add('hidden'));

        activeBtn.classList.add('active');
        activeView.classList.remove('hidden');
        lastActiveView = activeView;
    }

    btnModeFull.addEventListener('click', () => switchMode(btnModeFull, writeView));
    btnModeTraining.addEventListener('click', () => switchMode(btnModeTraining, trainingView));
    btnModeRepertory.addEventListener('click', () => switchMode(btnModeRepertory, repertoryView));
    btnModeGrammar.addEventListener('click', () => switchMode(btnModeGrammar, grammarView));
    if (btnModeModel) btnModeModel.addEventListener('click', () => switchMode(btnModeModel, modelView));
    if (btnModeResult) btnModeResult.addEventListener('click', () => switchMode(btnModeResult, resultView));

    // Reiniciar Página
    const btnResetPage = document.getElementById('btn-reset-page');
    if (btnResetPage) {
        btnResetPage.addEventListener('click', () => {
            if (confirm("Tem certeza que deseja apagar todo o conteúdo de TODAS as abas e recomeçar?")) {
                // Clear Full
                essayInput.value = '';
                themeInput.value = '';
                essayTitle.value = '';
                wordCountVal.textContent = '0';

                // Clear Training Textareas
                document.querySelectorAll('.training-textarea').forEach(t => t.value = '');

                // Clear Timers (Mock reset, real implementation depends on timer logic)
                document.querySelectorAll('.training-timer-display').forEach(d => d.textContent = '00:00');

                // Switch back to Full Mode
                btnModeFull.click();
            }
        });
    }

    // Removida configuração de API Key e chamadas da antiga callGeminiAPI

    // Renderiza Eixos Temáticos
    function renderEixos() {
        axisSelector.innerHTML = '';
        repertoryList.innerHTML = '';
        currentAxisTitle.textContent = 'Selecione um eixo';

        if (!currentBanca.eixosTematicos) return;

        currentBanca.eixosTematicos.forEach((eixo, index) => {
            const btn = document.createElement('button');
            btn.className = 'axis-btn';
            btn.textContent = eixo.nome;
            if (index === 0) btn.classList.add('active'); // O primeiro fica ativo por padrão

            btn.addEventListener('click', () => {
                document.querySelectorAll('.axis-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                mostrarEixo(eixo);
            });

            axisSelector.appendChild(btn);
        });

        // Mostra o primeiro eixo automaticamente
        if (currentBanca.eixosTematicos.length > 0) {
            mostrarEixo(currentBanca.eixosTematicos[0]);
        }
    }

    function mostrarEixo(eixo) {
        currentAxisTitle.textContent = `Eixo: ${eixo.nome}`;
        repertoryList.innerHTML = '';
        currentEixoIndex = currentBanca.eixosTematicos.indexOf(eixo);

        if (eixo.repertorios) {
            if (filterBar) filterBar.style.display = 'flex';
            let favs = JSON.parse(localStorage.getItem('redacao_favorite_repertories') || '[]');

            let repsToRender = eixo.repertorios.filter(rep => {
                if (showFavoritesOnly && !favs.includes(rep.obra)) return false;
                if (currentRepertoryFilter === 'intro' && rep.tipo !== 'intro') return false;
                if (currentRepertoryFilter === 'dev' && rep.tipo === 'intro') return false;

                if (currentRepertorySearch) {
                    const searchable = `${rep.obra} ${rep.autor} ${rep.resumo} ${rep.uso || ''} ${rep.frase}`.toLowerCase();
                    if (!searchable.includes(currentRepertorySearch)) return false;
                }

                return true;
            });

            if (repsToRender.length === 0) {
                const emptyMsg = document.createElement('div');
                emptyMsg.style.textAlign = 'center';
                emptyMsg.style.color = 'var(--text-muted)';
                emptyMsg.style.padding = '20px';
                emptyMsg.style.fontStyle = 'italic';
                emptyMsg.textContent = 'Nenhum repertório encontrado com o filtro atual.';
                repertoryList.appendChild(emptyMsg);
            }

            // Agrupar os repertórios
            let favReps = [];
            let introReps = [];
            let otherReps = [];

            repsToRender.forEach(rep => {
                if (favs.includes(rep.obra)) {
                    favReps.push(rep);
                } else if (rep.tipo === 'intro') {
                    introReps.push(rep);
                } else if (rep.tipo === 'dev') {
                    otherReps.push(rep);
                } else {
                    otherReps.push(rep);
                }
            });

            const renderGroup = (title, reps, color) => {
                if (reps.length === 0) return;
                const header = document.createElement('h4');
                header.style.color = color;
                header.style.marginTop = '1.5rem';
                header.style.marginBottom = '0.5rem';
                header.style.borderBottom = `1px solid ${color}`;
                header.style.paddingBottom = '0.3rem';
                header.textContent = title;
                repertoryList.appendChild(header);

                reps.forEach(rep => {
                    const item = document.createElement('div');
                    item.className = 'repertory-item';
                    const isFav = favs.includes(rep.obra);
                    const starColor = isFav ? '#fbbf24' : 'rgba(255,255,255,0.2)';
                    item.innerHTML = `
                        <h4 style="display:flex; justify-content:space-between; align-items:center;">
                            <span>${rep.obra} <span style="font-size:0.85em; color:var(--text-muted); font-weight:normal;">- ${rep.autor}</span></span>
                            <svg class="fav-star" data-obra="${rep.obra}" viewBox="0 0 24 24" width="18" height="18" stroke="${starColor}" stroke-width="2" fill="${isFav ? '#fbbf24' : 'none'}" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </h4>
                        <p><strong>Resumo:</strong> ${rep.resumo}</p>
                        ${rep.uso ? `<p style="margin-top:0.5rem; font-size:0.85rem; color:var(--warning);"><strong>Uso:</strong> ${rep.uso}</p>` : ''}
                        
                        ${rep.audio ? `<div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px;"><div style="font-size: 0.8em; margin-bottom: 5px; color: var(--primary); font-weight: bold;">🎧 Resumo em Áudio</div><audio controls style="width: 100%; height: 35px;" src="${rep.audio}"></audio></div>` :
                            (isFav ? `<div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.1); border-radius: 8px; border: 1px dashed var(--panel-border); text-align: center; font-size: 0.8em; color: var(--text-muted);">Você ainda não adicionou o áudio para esta obra favorita.<br>Para adicionar, insira <code>"audio": "caminho_do_audio.mp3"</code> nesta ficha no arquivo <code>repertories.js</code>.</div>` : '')}
                    `;
                    item.querySelector('.fav-star').addEventListener('click', (e) => {
                        let f = JSON.parse(localStorage.getItem('redacao_favorite_repertories') || '[]');
                        const obra = e.currentTarget.dataset.obra;
                        if (f.includes(obra)) {
                            f = f.filter(o => o !== obra);
                            e.currentTarget.setAttribute('fill', 'none');
                            e.currentTarget.setAttribute('stroke', 'rgba(255,255,255,0.2)');
                        } else {
                            f.push(obra);
                            e.currentTarget.setAttribute('fill', '#fbbf24');
                            e.currentTarget.setAttribute('stroke', '#fbbf24');
                        }
                        localStorage.setItem('redacao_favorite_repertories', JSON.stringify(f));
                    });
                    repertoryList.appendChild(item);
                });
            };

            renderGroup('Meus Favoritos', favReps, '#fbbf24');
            renderGroup('Para Introdução', introReps, 'var(--primary)');

            let devTitle = 'Para Desenvolvimento / Coringas';
            if (currentBanca && (currentBanca.nome.includes('UFG') || currentBanca.nome.includes('UEMA'))) {
                devTitle = 'Para Desenvolvimento (Filósofos e Sociólogos - Uso Crítico)';
            }
            renderGroup(devTitle, otherReps, 'var(--text-main)');

            initFlashcards(repsToRender);
        } else if (eixo.topicos) {
            if (filterBar) filterBar.style.display = 'none';
            const avisoItem = document.createElement('div');
            avisoItem.style.marginBottom = '20px';
            avisoItem.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9em; text-align: center;"><em>Esta banca não exige repertórios socioculturais abertos. Abaixo estão os pontos de atenção e apostas focados na obra/edital.</em></p>`;
            repertoryList.appendChild(avisoItem);

            eixo.topicos.forEach(topico => {
                const item = document.createElement('div');
                item.className = 'repertory-item';
                item.innerHTML = `
                    <h4>Ponto de Atenção / Aposta</h4>
                    <p>${topico}</p>
                `;
                repertoryList.appendChild(item);
            });
            initFlashcards([]);
        }
    }

    // === Flashcard & Tabs Logic ===

    if (btnRepPratica && btnRepFlashcards) {
        btnRepPratica.addEventListener('click', () => {
            btnRepPratica.classList.add('active');
            btnRepFlashcards.classList.remove('active');
            btnRepPratica.style.background = 'var(--primary)';
            btnRepPratica.style.color = '#fff';
            btnRepFlashcards.style.background = 'transparent';
            repPracticeContainer.classList.remove('hidden');
            flashcardsContainer.classList.add('hidden');
        });

        btnRepFlashcards.addEventListener('click', () => {
            btnRepFlashcards.classList.add('active');
            btnRepPratica.classList.remove('active');
            btnRepFlashcards.style.background = 'rgba(245, 158, 11, 0.1)';
            btnRepPratica.style.background = 'transparent';
            btnRepPratica.style.color = 'var(--text-main)';
            flashcardsContainer.classList.remove('hidden');
            repPracticeContainer.classList.add('hidden');
            renderCurrentFlashcard();
        });
    }

    if (fcElement) {
        fcElement.addEventListener('click', () => {
            fcElement.classList.toggle('flipped');
        });
    }

    const favBtn = document.getElementById('fc-favorite-btn');
    if (favBtn) {
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent flipping the card
            if (!currentFlashcards.length) return;
            const rep = currentFlashcards[flashcardIndex];
            let favs = JSON.parse(localStorage.getItem('redacao_favorite_repertories') || '[]');

            if (favs.includes(rep.obra)) {
                favs = favs.filter(o => o !== rep.obra);
                favBtn.classList.remove('active');
            } else {
                favs.push(rep.obra);
                favBtn.classList.add('active');
            }
            localStorage.setItem('redacao_favorite_repertories', JSON.stringify(favs));
        });
    }

    if (btnFcPrev && btnFcNext) {
        btnFcPrev.addEventListener('click', () => {
            if (flashcardIndex > 0) {
                flashcardIndex--;
                fcElement.classList.remove('flipped');
                setTimeout(renderCurrentFlashcard, 300); // Wait for unflip animation
            }
        });
        btnFcNext.addEventListener('click', () => {
            if (flashcardIndex < currentFlashcards.length - 1) {
                flashcardIndex++;
                fcElement.classList.remove('flipped');
                setTimeout(renderCurrentFlashcard, 300);
            }
        });

        // Spaced Repetition Logic
        const btnErrei = document.getElementById('btn-fc-errei');
        const btnAcertei = document.getElementById('btn-fc-acertei');

        if (btnErrei && btnAcertei) {
            btnErrei.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita virar a carta
                if (!currentFlashcards[flashcardIndex]) return;

                let wrongFlashcards = JSON.parse(localStorage.getItem('redacao_wrong_flashcards') || '[]');
                const currentObra = currentFlashcards[flashcardIndex].obra;
                if (!wrongFlashcards.includes(currentObra)) {
                    wrongFlashcards.push(currentObra);
                    localStorage.setItem('redacao_wrong_flashcards', JSON.stringify(wrongFlashcards));
                }

                // Vai pra próxima
                if (flashcardIndex < currentFlashcards.length - 1) {
                    flashcardIndex++;
                    fcElement.classList.remove('flipped');
                    setTimeout(renderCurrentFlashcard, 300);
                }
            });

            btnAcertei.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!currentFlashcards[flashcardIndex]) return;

                let wrongFlashcards = JSON.parse(localStorage.getItem('redacao_wrong_flashcards') || '[]');
                const currentObra = currentFlashcards[flashcardIndex].obra;
                wrongFlashcards = wrongFlashcards.filter(o => o !== currentObra);
                localStorage.setItem('redacao_wrong_flashcards', JSON.stringify(wrongFlashcards));

                if (flashcardIndex < currentFlashcards.length - 1) {
                    flashcardIndex++;
                    fcElement.classList.remove('flipped');
                    setTimeout(renderCurrentFlashcard, 300);
                }
            });
        }
    }

    function initFlashcards(repertorios) {
        let wrongFlashcards = JSON.parse(localStorage.getItem('redacao_wrong_flashcards') || '[]');

        let allRep = [...(repertorios || [])];
        allRep.sort((a, b) => {
            const aWrong = wrongFlashcards.includes(a.obra);
            const bWrong = wrongFlashcards.includes(b.obra);
            if (aWrong && !bWrong) return -1;
            if (!aWrong && bWrong) return 1;
            return 0; // maintain original order otherwise
        });

        currentFlashcards = allRep;
        flashcardIndex = 0;
        if (fcElement) fcElement.classList.remove('flipped');
        renderCurrentFlashcard();
    }

    function renderCurrentFlashcard() {
        const fcObra = document.getElementById('fc-obra');
        const fcAutor = document.getElementById('fc-autor');
        const fcResumo = document.getElementById('fc-resumo');
        const fcUso = document.getElementById('fc-uso');
        const fcCounter = document.getElementById('fc-counter');
        const fcFraseBox = document.getElementById('fc-frase-box');
        const fcFrase = document.getElementById('fc-frase');

        if (!currentFlashcards.length) {
            if (fcObra) fcObra.textContent = "Nenhum repertório";
            if (fcAutor) fcAutor.textContent = "-";
            if (fcResumo) fcResumo.textContent = "Este eixo não possui repertórios detalhados.";
            if (fcUso) fcUso.textContent = "";
            if (fcFraseBox) fcFraseBox.classList.add('hidden');
            if (fcCounter) fcCounter.textContent = "0 / 0";
            return;
        }

        const rep = currentFlashcards[flashcardIndex];
        if (fcObra) fcObra.textContent = rep.obra;
        if (fcAutor) fcAutor.textContent = rep.autor;
        if (fcResumo) fcResumo.textContent = rep.resumo;
        if (fcUso) fcUso.textContent = rep.uso ? "Uso Sugerido: " + rep.uso : "";

        if (rep.frase) {
            fcFrase.textContent = rep.frase;
            fcFraseBox.classList.remove('hidden');
        } else {
            fcFraseBox.classList.add('hidden');
        }

        if (fcCounter) fcCounter.textContent = `${flashcardIndex + 1} / ${currentFlashcards.length}`;
    }

    // Generate Line Numbers (up to 30 lines)
    const lineNumbersContainer = document.getElementById('line-numbers');
    const resultLineNumbersContainer = document.getElementById('result-line-numbers');
    let numbersHTML = '';
    for (let i = 1; i <= 30; i++) {
        numbersHTML += `<span class="line-number">${i}</span>`;
    }
    lineNumbersContainer.innerHTML = numbersHTML;
    resultLineNumbersContainer.innerHTML = numbersHTML;

    // Sync line height logic (prevent textarea from breaking lines out of grid if possible)
    // Actually, setting line-height correctly in CSS usually does the trick.

    function countLines() {
        // Estima as linhas baseado no scrollHeight e lineHeight (32px)
        const lineHeight = 32;
        return Math.floor(essayInput.scrollHeight / lineHeight);
    }

    // Update word count and limit lines (sem truncar o texto do aluno)
    essayInput.addEventListener('input', (e) => {
        const text = essayInput.value.trim();
        const words = text === '' ? 0 : text.split(/\s+/).length;
        wordCountVal.textContent = words;
    });

    // Also update word count on paste
    essayInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            essayInput.dispatchEvent(new Event('input'));
        }, 0);
    });

    // Clear input
    clearBtn.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja apagar a redação atual?")) {
            essayInput.value = '';
            themeInput.value = '';
            wordCountVal.textContent = '0';
        }
    });

    // Back to write mode
    backBtn.addEventListener('click', () => {
        resultView.classList.add('hidden');
        if (lastActiveView) {
            lastActiveView.classList.remove('hidden');

            // Re-activate correct button based on last view
            [btnModeFull, btnModeTraining, btnModeRepertory, btnModeGrammar].forEach(btn => btn.classList.remove('active'));
            if (lastActiveView === writeView) btnModeFull.classList.add('active');
            if (lastActiveView === trainingView) btnModeTraining.classList.add('active');
            if (lastActiveView === repertoryView) btnModeRepertory.classList.add('active');
            if (lastActiveView === grammarView) btnModeGrammar.classList.add('active');
        } else {
            writeView.classList.remove('hidden');
            btnModeFull.classList.add('active');
        }
    });

    // Botão de análise original removido (pois agora usamos o Copiador Inteligente).

    // Lógica do Modo Copiador Inteligente
    const copyPromptBtn = document.getElementById('copy-prompt-btn');
    const copiadorModal = document.getElementById('copiador-modal');
    const btnCloseCopiador = document.getElementById('btn-close-copiador');
    const btnRenderCopiador = document.getElementById('btn-render-copiador');
    const jsonPasteArea = document.getElementById('json-paste-area');

    // Variável para armazenar o texto da redação atual para quando for renderizar
    let copiadorRawText = '';

    // Função global que será chamada quando o usuário submeter o conteúdo no copiador
    let onCopiadorSubmit = null;

    if (copyPromptBtn) {
        copyPromptBtn.addEventListener('click', () => {
            const rawText = essayInput.value.trim();

            // Radar de Conformidade Pré-Envio (Validador Modularizado)
            if (window.redacaoApp && typeof window.redacaoApp.validateEssay === 'function') {
                const validationError = window.redacaoApp.validateEssay(rawText, currentBanca, essayTitle.value.trim());
                if (validationError) {
                    alert(validationError);
                    return;
                }
            } else {
                // Fallback caso o módulo falhe ao carregar
                if (currentBanca.exigeTitulo && essayTitle.value.trim() === '') {
                    alert(`A banca ${currentBanca.nome} exige um título. Por favor, preencha o campo de título.`);
                    return;
                }
                if (rawText.length < 50) {
                    alert("Por favor, digite uma redação mais longa para análise.");
                    return;
                }
            }

            // Alerta não impeditivo se ultrapassar o limite de linhas permitido (envia de qualquer jeito)
            let lineWarning = null;
            if (window.redacaoApp && typeof window.redacaoApp.checkLineLimitWarning === 'function') {
                lineWarning = window.redacaoApp.checkLineLimitWarning(rawText, currentBanca);
            } else if (currentBanca && currentBanca.limiteLinhas) {
                const rawParagraphs = rawText.split('\n').map(p => p.trim()).filter(p => p.length > 0);
                const estimatedLines = rawParagraphs.reduce((acc, p) => acc + Math.max(1, Math.ceil(p.length / 94)), 0);
                const maxLines = currentBanca.limiteLinhas.max || 30;
                if (estimatedLines > maxLines) {
                    lineWarning = `⚠️ Radar de Conformidade: Sua redação possui cerca de ${estimatedLines} linhas e ultrapassa o limite permitido de ${maxLines} linhas da banca ${currentBanca.nome}. Provavelmente ela não caberia na folha de redação tradicional, mas o envio continuará de qualquer jeito!`;
                }
            }
            if (lineWarning) {
                alert(lineWarning);
                // NOTA: Não damos return aqui! A redação continua e é enviada de qualquer jeito.
            }

            copiadorRawText = rawText;
            const essayTheme = themeInput.value.trim();
            const essayTitleText = essayTitle.value.trim();
            const banca = currentBanca.nome;
            const genero = currentBanca.generosPermitidos[0] || 'dissertativo';

            let promptUser = `Gênero: ${genero}\nBanca: ${banca}\nTema: ${essayTheme}\n`;
            if (essayTitleText) promptUser += `Título: ${essayTitleText}\n`;

            let bancaInstructions = `\nREGRAS DA BANCA SELECIONADA (${currentBanca.nome}):\n- ${currentBanca.resumoPratico || ''}\n` +
                (currentBanca.orientacoes ? `- Orientações oficiais: ${currentBanca.orientacoes}\n` : '') +
                `DIRETRIZ DE CALIBRAÇÃO (AVALIAÇÃO RAZOÁVEL E JUSTA):\n` +
                `- Seja razoável e equilibrado na pontuação. O aluno NÃO precisa de erudição forçada ou 'palavras incríveis' para tirar uma nota boa/máxima.\n` +
                `- Se o texto cumprir o tema, respeitar a estrutura da banca, tiver argumentos coerentes e correção gramatical padrão, ATRIBUA UMA NOTA ALTA E MERECIDA.\n` +
                `- Não desconte pontos por vocabulário simples e correto. Diferencie erros gramaticais reais de meras sugestões opcionais de estilo.\n` +
                `Critérios a avaliar e pontuar:\n`;
            if (currentBanca.criterios) {
                currentBanca.criterios.forEach(c => {
                    bancaInstructions += `- ${c.nome} (Máx: ${c.pontuacao}): ${c.desc}\n`;
                });
            }
            promptUser += bancaInstructions;

            promptUser += `\nRedação:\n${rawText}`;

            // Monta schema dinâmico de notas para os critérios da banca selecionada
            const schemaNotas = {};
            if (currentBanca.criterios) {
                currentBanca.criterios.forEach(c => {
                    schemaNotas[c.id] = `nota de 0 a ${c.pontuacao}`;
                });
            }
            const jsonSchemaExemplo = JSON.stringify({
                notas: schemaNotas,
                erros: [
                    { trecho_original: "trecho exato com desvio", sugestao: "correção sugerida", explicacao: "explicação pedagógica clara", tipo: "Gramática, Coesão ou Estrutura" }
                ],
                diagnostico: "Diagnóstico aprofundado parágrafo a parágrafo considerando as especificidades da banca...",
                resumoPratico: "Resumo acionável dos pontos mais urgentes para o aluno evoluir...",
                reescrita: "Reescrita lapidada modelo nota máxima, preservando as ideias e a simplicidade clara do aluno..."
            }, null, 2);

            const systemPromptBase = typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : 'Você é um avaliador de redações rigoroso e experiente.';

            // Monta o prompt completo com instrução de saída JSON estrita e chaves da banca
            const fullPrompt = `${systemPromptBase}\n\n` +
                `INSTRUÇÃO CRÍTICA DE FORMATAÇÃO JSON:\n` +
                `Responda APENAS E EXCLUSIVAMENTE com o objeto JSON solicitado, sem blocos markdown externos (sem \`\`\`json) e sem explicações antes ou depois.\n` +
                `O campo "notas" DEVE utilizar OBRIGATORIAMENTE as seguintes chaves de critérios e respeitar o limite máximo de cada um:\n` +
                `${jsonSchemaExemplo}\n\n` +
                `---\n\n${promptUser}`;

            // Copia para a área de transferência
            navigator.clipboard.writeText(fullPrompt).then(() => {
                // Define o comportamento ao receber a resposta
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    themeDisplay.textContent = themeInput.value.trim() || "TEMA NÃO INFORMADO";
                    renderGeminiResults(resultObj, copiadorRawText);

                    // Switch Views
                    if(btnModeResult) {
                        btnModeResult.classList.remove('hidden');
                        btnModeResult.click();
                    }

                    // Reset progress bars for animation
                    const progressBars = document.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => { bar.style.width = width; }, 50);
                    });
                };

                // Abre o modal de instrução
                jsonPasteArea.value = ''; // limpa a caixa
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt. Seu navegador pode estar bloqueando o acesso à área de transferência.');
            });
        });
    }

    if (btnCloseCopiador) {
        btnCloseCopiador.addEventListener('click', () => {
            copiadorModal.classList.add('hidden');
        });
    }

    if (btnRenderCopiador) {
        btnRenderCopiador.addEventListener('click', async () => {
            const pastedText = jsonPasteArea.value.trim();
            if (!pastedText) {
                alert('Por favor, cole o resultado JSON do Gemini.');
                return;
            }

            try {
                // Tenta extrair o JSON e fazer parse seguro
                const m = await import('./js/json-repair.js');
                const resultObj = m.safeParseLLMJson(pastedText);

                // ADR-13 & ADR-14: Persiste o payload da correção enriquecido de forma assíncrona
                import('./js/database.js').then(db => {
                    const temaAtivo = document.getElementById('theme')?.value || document.querySelector('.theme-title')?.textContent || 'Tema Livre';
                    const bancaAtiva = document.getElementById('banca-select')?.value || 'ENEM';
                    const textoEnviado = document.getElementById('essay')?.value || '';
                    
                    db.saveCorrectionPayload({
                        timestamp: new Date().toISOString(),
                        tema: temaAtivo.trim(),
                        banca: bancaAtiva.toUpperCase().trim(),
                        textoOriginal: textoEnviado,
                        dados: resultObj
                    }).catch(err => console.warn('[Storage] Erro ao salvar histórico de correção:', err));
                }).catch(() => {}); // módulo opcional; falha silenciosa se não carregar


                if (onCopiadorSubmit) {
                    onCopiadorSubmit(JSON.stringify(resultObj));
                }

                // Fecha modal
                copiadorModal.classList.add('hidden');
            } catch (err) {
                console.error("Erro ao processar texto colado:", err);
                alert("Ocorreu um erro ao ler o JSON gerado pelo Gemini. Isso acontece se o Gemini escreveu texto fora do formato JSON (hallucination) ou deixou aspas abertas.\n\nPor favor, volte na aba do Gemini e clique em 'Gerar novamente'. Ou edite e cole apenas o JSON bruto.\n\nErro técnico: " + err.message);
            }
        });
    }

    // Função auxiliar para mapear notas com tolerância a variações de chave (c1, C1, criterio1, competencia1)
    function getCriterionScore(notasObj, critId) {
        if (!notasObj || typeof notasObj !== 'object') return 0;
        if (notasObj[critId] !== undefined) return Number(notasObj[critId]) || 0;
        const lowerCritId = critId.toLowerCase();
        for (const [k, v] of Object.entries(notasObj)) {
            const lk = k.toLowerCase().replace(/[\s_-]/g, '');
            if (lk === lowerCritId) return Number(v) || 0;
            const num = critId.replace(/\D/g, '');
            if (num && (lk === `c${num}` || lk === `criterio${num}` || lk === `critério${num}` || lk === `competencia${num}` || lk === `competência${num}`)) {
                return Number(v) || 0;
            }
        }
        return 0;
    }

    // Fachada de Compatibilidade (Strangler Pattern)
    window.__REDACAO_BRIDGE__ = Object.freeze({
        renderResults: (dados, rawText, bancaKey) => {
            if (bancaKey && typeof BANCAS !== 'undefined' && BANCAS[bancaKey]) {
                if (bancaSelect) bancaSelect.value = bancaKey;
                currentBanca = BANCAS[bancaKey];
                updateBancaUI();
            }
            renderGeminiResults(dados, rawText || essayInput.value);
            
            // Switch Views
            if(btnModeResult) {
                btnModeResult.classList.remove('hidden');
                btnModeResult.click();
            }

            // Reset progress bars for animation
            const progressBars = document.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 50);
            });
        },
    });

    // Render Results from Gemini JSON
    function renderGeminiResults(resultObj, rawText) {
        // Atualiza nota final da banca
        finalScoreMax.textContent = `/${currentBanca.notaMaxima}`;

        let scoreObtida = 0;
        if (resultObj.notas && currentBanca.criterios) {
            // Soma estritamente apenas os critérios pertencentes à banca ativa
            currentBanca.criterios.forEach(crit => {
                scoreObtida += getCriterionScore(resultObj.notas, crit.id);
            });
        }

        // Formatação decimal dinâmica: bancas com nota máxima <= 30 (UEMA: 10.0, UNITINS: 20.0, UFG: 24.0)
        const isDecimalBanca = Number(currentBanca.notaMaxima) <= 30;
        if (isDecimalBanca) {
            finalScoreValue.textContent = scoreObtida.toFixed(1);
        } else {
            finalScoreValue.textContent = Math.round(scoreObtida).toString();
        }

        // Critérios/Competências
        competenciesContainer.innerHTML = '';
        if (resultObj.notas && currentBanca.criterios) {
            currentBanca.criterios.forEach((crit) => {
                const max = Number(crit.pontuacao) || 1;
                const obt = getCriterionScore(resultObj.notas, crit.id);
                const perc = max > 0 ? Math.min(Math.max(obt / max, 0), 1) : 0;

                const isCritDecimal = max <= 10;
                let displayObtida = isCritDecimal ? obt.toFixed(1) : Math.round(obt).toString();
                let displayMax = isCritDecimal ? max.toFixed(1) : Math.round(max).toString();

                const html = `
                    <div class="competency-item">
                        <div class="comp-header">
                            <h4>${crit.nome}</h4>
                            <span>${displayObtida}/${displayMax}</span>
                        </div>
                        <div class="progress-bar"><div class="progress" style="width: ${(perc * 100).toFixed(1)}%"></div></div>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${crit.desc}</p>
                    </div>
                `;
                competenciesContainer.innerHTML += html;
            });
        }

        // Adiciona um bloco de orientações da banca
        competenciesContainer.innerHTML += `
            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--primary); border-radius: 4px;">
                <strong>Dica para a banca ${currentBanca.nome}:</strong> ${currentBanca.orientacoes}
            </div>
        `;

        // Diagnóstico e Reescrita
        const diagnosticoDiv = document.getElementById('ai-diagnostico');
        const resumoDiv = document.getElementById('ai-resumo');
        const reescritaDiv = document.getElementById('ai-reescrita');

        if (diagnosticoDiv) diagnosticoDiv.textContent = resultObj.diagnostico || "Diagnóstico não disponível.";
        if (resumoDiv) resumoDiv.textContent = resultObj.resumoPratico || "Resumo Prático não gerado.";
        
        if (reescritaDiv) {
            // @ts-ignore
            if (window.redacaoApp && window.redacaoApp.initDiffViewer) {
                // @ts-ignore
                window.redacaoApp.initDiffViewer(reescritaDiv, rawText, resultObj.reescrita || "Reescrita não disponível.");
            } else {
                reescritaDiv.textContent = resultObj.reescrita || "Reescrita não disponível.";
            }
        }

        // Destaques de Erros (Marcações) no Texto
        if (resultObj.erros && Array.isArray(resultObj.erros) && resultObj.erros.length > 0) {
            let highlightedText = rawText;

            resultObj.erros.forEach(erro => {
                if (erro.trecho_original) {
                    const tipoClasse = erro.tipo ? erro.tipo.toLowerCase().replace(/[^a-z]/g, '') : 'erro';

                    let bg = 'rgba(239, 68, 68, 0.2)';
                    let border = 'red';
                    if (erro.tipo === 'Gramática' || tipoClasse === 'gramatica') { bg = 'rgba(239, 68, 68, 0.2)'; border = 'red'; }
                    else if (erro.tipo === 'Coesão' || tipoClasse === 'coesao') { bg = 'rgba(245, 158, 11, 0.2)'; border = 'orange'; }
                    else if (erro.tipo === 'Estilo' || tipoClasse === 'estilo') { bg = 'rgba(59, 130, 246, 0.2)'; border = '#3b82f6'; }
                    else if (erro.tipo === 'Estrutura' || erro.tipo === 'Repertório' || tipoClasse === 'estrutura' || tipoClasse === 'repertorio') { bg = 'rgba(139, 92, 246, 0.2)'; border = '#8b5cf6'; }

                    const span = `<span class="error-mark error-${tipoClasse}" style="background-color: ${bg}; cursor: pointer; border-bottom: 2px dashed ${border};" data-type="${erro.tipo || 'Erro'}" data-orig="${erro.trecho_original}" data-sugg="${erro.sugestao || ''}" data-exp="${erro.explicacao}"> ${erro.trecho_original} </span>`;
                    highlightedText = highlightedText.replace(erro.trecho_original, span);
                }
            });
            correctedText.innerHTML = highlightedText.replace(/\n/g, '<br>');
        } else {
            correctedText.innerHTML = rawText.replace(/\n/g, '<br>');
        }

        setupTooltips();
    }

    // -----------------------------------------
    // LÓGICA DA ARENA DE MICRO-TREINOS
    // -----------------------------------------
    let currentDrillCategory = 'Crase';
    let currentDrillExercises = [];
    let currentDrillIndex = 0;
    let drillScore = 0;
    let drillErrors = 0;

    // Turbo Mode Variables
    let isTurboMode = false;
    let turboTimerInterval = null;
    let turboTimeLeft = 60;

    const drillCategoryBtns = document.querySelectorAll('.drill-category-btn');
    const drillQuestionDisplay = document.getElementById('drill-question');
    const drillOptionsContainer = document.getElementById('drill-options');
    const drillFeedbackDisplay = document.getElementById('drill-feedback');
    const btnNextDrill = document.getElementById('btn-next-drill');
    const drillCounterDisplay = document.getElementById('drill-counter');
    const drillScoreDisplay = document.getElementById('drill-score');
    const drillErrorsDisplay = document.getElementById('drill-errors');
    
    // UI elements for Turbo Mode
    const btnTurboMode = document.getElementById('btn-turbo-mode');
    const turboTimerContainer = document.getElementById('turbo-timer-container');
    const turboTimerDisplay = document.getElementById('turbo-timer-display');

    function loadDrillsByCategory(category) {
        if (typeof grammarExercises === 'undefined') return;

        // Parar turbo mode se estiver ativo
        stopTurboMode();

        currentDrillCategory = category;

        if (category === 'PontosFracos') {
            const wrongAnswers = JSON.parse(localStorage.getItem('redacao_wrong_drills') || '[]');
            if (wrongAnswers.length === 0) {
                drillQuestionDisplay.innerHTML = `<span style="color:var(--success)">Parabéns! Você não tem pontos fracos registrados.</span>`;
                drillOptionsContainer.innerHTML = '';
                drillFeedbackDisplay.classList.add('hidden');
                btnNextDrill.classList.add('hidden');
                return;
            }
            // Filtra os exercícios que estão no array de pontos fracos
            currentDrillExercises = grammarExercises.filter(ex => wrongAnswers.includes(ex.question));
        } else {
            currentDrillExercises = grammarExercises.filter(ex => ex.category === category);
        }

        // Embaralha as questoes da categoria
        currentDrillExercises.sort(() => Math.random() - 0.5);
        currentDrillIndex = 0;
        drillScore = 0;
        drillErrors = 0;
        drillScoreDisplay.textContent = '0';
        if(drillErrorsDisplay) drillErrorsDisplay.textContent = '0';

        if (currentDrillExercises.length > 0) {
            renderCurrentDrill();
        }
    }

    function renderCurrentDrill() {
        if (currentDrillIndex >= currentDrillExercises.length) {
            drillQuestionDisplay.innerHTML = `<span style="color:var(--success)">Parabéns! Você completou os treinos de ${currentDrillCategory}!</span>`;
            drillOptionsContainer.innerHTML = '';
            drillFeedbackDisplay.classList.add('hidden');
            btnNextDrill.classList.add('hidden');
            return;
        }

        const drill = currentDrillExercises[currentDrillIndex];
        
        const counterUI = document.getElementById('arena-question-counter');
        if (counterUI) {
            counterUI.textContent = `(Questão ${currentDrillIndex + 1} de ${currentDrillExercises.length})`;
        }
        drillCounterDisplay.textContent = currentDrillIndex + 1;
        drillQuestionDisplay.textContent = drill.question;
        drillFeedbackDisplay.classList.add('hidden');
        btnNextDrill.classList.add('hidden');

        drillOptionsContainer.innerHTML = '';
        drill.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary';
            btn.textContent = opt;
            btn.onclick = () => handleDrillAnswer(idx, drill, btn);
            drillOptionsContainer.appendChild(btn);
        });
    }

    function handleDrillAnswer(selectedIndex, drill, clickedBtn) {
        // Desabilita os botoes
        Array.from(drillOptionsContainer.children).forEach(b => b.disabled = true);

        const isCorrect = selectedIndex === drill.correctOptionIndex;
        let wrongAnswers = JSON.parse(localStorage.getItem('redacao_wrong_drills') || '[]');

        // Define a "Lino Tip" padrão baseada na categoria
        let linoTip = "";
        if (drill.category === 'Crase') {
            linoTip = "👨‍🏫 Lino Tip: O Método Cachorrão salva vidas! Troque a palavra feminina por uma masculina (ex: 'o problema'). Se der 'AO', tem crase.";
        } else if (drill.category === 'Vírgula') {
            linoTip = "👨‍🏫 Lino Tip: Cuidado com a Vírgula Suicida! Jamais separe o sujeito do seu verbo, mesmo que o sujeito seja um termo longo.";
        } else {
            linoTip = "👨‍🏫 Lino Tip: A redação nota 1000 exige conectivos lógicos explícitos entre parágrafos. Evite o gerúndio fraco!";
        }

        const finalTip = drill.linoTip || linoTip;

        let extraFeedback = "";
        if (drill.correctSide && drill.wrongSide) {
            extraFeedback = `
                <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                    <div style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 10px; border: 1px solid var(--success);">
                        <strong style="color:var(--success)">✅ Lado Correto:</strong><br>
                        <span style="color:var(--text-main)">${drill.correctSide}</span>
                    </div>
                    <div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 10px; border: 1px solid var(--danger);">
                        <strong style="color:var(--danger)">❌ Lado Errado:</strong><br>
                        <span style="color:var(--text-main)">${drill.wrongSide}</span>
                    </div>
                </div>
            `;
        }

        let conceptBox = "";
        if (drill.concept && drill.conceptExplanation) {
            conceptBox = `
                <div style="margin-top: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 12px; border-left: 4px solid var(--primary);">
                    <strong style="color:var(--primary)">📚 O que é: ${drill.concept}?</strong><br>
                    <span style="color:var(--text-main); font-size: 0.9rem;">${drill.conceptExplanation}</span>
                </div>
            `;
        }

        if (isCorrect) {
            clickedBtn.style.backgroundColor = 'var(--success)';
            clickedBtn.style.color = '#fff';
            clickedBtn.style.borderColor = 'var(--success)';
            drillScore++;
            drillScoreDisplay.textContent = drillScore;

            drillFeedbackDisplay.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            drillFeedbackDisplay.style.borderLeft = '4px solid var(--success)';
            drillFeedbackDisplay.innerHTML = `<strong style="color:var(--success)">✅ Acertou!</strong><br><span style="color:var(--text-main)">${drill.explanation}</span>${extraFeedback}${conceptBox}<br><br><em style="color:var(--primary); font-size:0.9rem;">${finalTip}</em>`;
        } else {
            clickedBtn.style.backgroundColor = 'var(--danger)';
            clickedBtn.style.color = '#fff';
            clickedBtn.style.borderColor = 'var(--danger)';

            // Incrementa erros
            drillErrors++;
            if (drillErrorsDisplay) drillErrorsDisplay.textContent = drillErrors;

            // Destaca a correta
            drillOptionsContainer.children[drill.correctOptionIndex].style.borderColor = 'var(--success)';
            drillOptionsContainer.children[drill.correctOptionIndex].style.borderWidth = '2px';

            drillFeedbackDisplay.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            drillFeedbackDisplay.style.borderLeft = '4px solid var(--danger)';
            drillFeedbackDisplay.innerHTML = `<strong style="color:var(--danger)">❌ Errou!</strong><br><span style="color:var(--text-main)">${drill.explanation}</span>${extraFeedback}${conceptBox}<br><br><em style="color:var(--primary); font-size:0.9rem;">${finalTip}</em>`;
        }

        drillFeedbackDisplay.classList.remove('hidden');

        // ADR-15: Grava no IndexedDB de forma transacional e assíncrona
        import('./js/database.js').then(db => {
            db.updateGrammarMetric(drill.category || 'Geral', isCorrect);
        }).catch(err => console.warn('[Analytics] Erro ao gravar métrica da arena:', err));

        if (!isTurboMode) {
            btnNextDrill.classList.remove('hidden');
        } else {
            // No modo turbo, avança automaticamente após 1.5s
            setTimeout(() => {
                if (isTurboMode) {
                    currentDrillIndex++;
                    renderCurrentDrill();
                }
            }, 2000);
        }
    }

    if (btnNextDrill) {
        btnNextDrill.addEventListener('click', () => {
            currentDrillIndex++;
            renderCurrentDrill();
        });
    }

    // Inicializa contador visual nos botões
    function updateDrillCategoryCounts() {
        if (typeof grammarExercises === 'undefined') return;
        drillCategoryBtns.forEach(btn => {
            const cat = btn.getAttribute('data-category');
            if (cat) {
                let count = 0;
                if (cat === 'PontosFracos') {
                    const wrongAnswers = JSON.parse(localStorage.getItem('redacao_wrong_drills') || '[]');
                    count = wrongAnswers.length;
                } else {
                    count = grammarExercises.filter(ex => ex.category === cat).length;
                }
                // Limpa contagem anterior se houver (para atualizar)
                let baseText = btn.innerHTML.split(' <span')[0];
                btn.innerHTML = `${baseText} <span style="font-size: 0.75em; opacity: 0.8; margin-left: 4px;">(${count})</span>`;
            }
        });
    }

    updateDrillCategoryCounts(); // Chama ao carregar

    drillCategoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetBtn = e.currentTarget; // Usar currentTarget para pegar o botão, não o span interno
            drillCategoryBtns.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            updateDrillCategoryCounts(); // Atualiza pontos fracos
            loadDrillsByCategory(targetBtn.getAttribute('data-category'));
        });
    });

    // Logica do Turbo Mode
    function startTurboMode() {
        if (typeof grammarExercises === 'undefined') return;

        drillCategoryBtns.forEach(b => b.classList.remove('active'));
        btnTurboMode.classList.add('active');

        isTurboMode = true;
        currentDrillCategory = 'Turbo';
        turboTimeLeft = 60;

        // Mistura TODAS as questões
        currentDrillExercises = [...grammarExercises].sort(() => Math.random() - 0.5);
        currentDrillIndex = 0;
        drillScore = 0;
        drillErrors = 0;
        drillScoreDisplay.textContent = '0';
        if(drillErrorsDisplay) drillErrorsDisplay.textContent = '0';

        turboTimerContainer.classList.remove('hidden');
        turboTimerDisplay.textContent = turboTimeLeft;

        renderCurrentDrill();

        turboTimerInterval = setInterval(() => {
            turboTimeLeft--;
            turboTimerDisplay.textContent = turboTimeLeft;

            if (turboTimeLeft <= 0) {
                stopTurboMode(true);
            }
        }, 1000);
    }

    function stopTurboMode(timeOut = false) {
        if (!isTurboMode) return;

        isTurboMode = false;
        clearInterval(turboTimerInterval);
        turboTimerContainer.classList.add('hidden');

        if (timeOut) {
            drillQuestionDisplay.innerHTML = `<span style="color:var(--danger)">Fim do Tempo! ⏰</span><br>Você acertou <strong style="color:var(--success)">${drillScore}</strong> questões em 60 segundos!`;
            drillOptionsContainer.innerHTML = '';
            drillFeedbackDisplay.classList.add('hidden');
            btnNextDrill.classList.add('hidden');
        }
    }

    if (btnTurboMode) {
        btnTurboMode.addEventListener('click', () => {
            startTurboMode();
        });
    }

    // Iniciar com Crase
    if (drillQuestionDisplay) {
        loadDrillsByCategory('Crase');
    }

    // ==========================================
    // DENSIDADE GRAMATICAL & LÓGICA DA LÍNGUA
    // ==========================================
    const grammarLogicData = {
        virgula: {
            titulo: "A Vírgula e o Trem das Palavras",
            subtitulo: "Desmistificando a 'Pausa para Respirar': Por que a vírgula é pura engenharia sintática",
            icone: "🚂",
            tag: "Pontuação & Sintaxe",
            logica: "Em português, a oração padrão é como uma locomotiva puxando seus vagões em linha reta: [Quem faz a ação: Sujeito] + [A ação: Verbo] + [O complemento: Objeto]. Quando você coloca uma vírgula entre o sujeito e o verbo ('A maioria dos jovens, enfrentam...'), você literalmente desconecta a locomotiva dos vagões! O cérebro do corretor espera que o agente e a ação estejam colados. A vírgula só existe para sinalizar quando um bloco estranho (uma explicação ou uma circunstância de tempo/lugar) foi inserido no meio do caminho. Ela funciona como um par de parênteses: você abre uma vírgula e fecha outra.",
            porQueBancasCobram: "Os corretores do ENEM (C1), UEMA, UFG e UNITINS caçam a 'vírgula isolada entre sujeito e predicado' porque ela demonstra desconhecimento da estrutura oracional básica da língua. Já o adjunto adverbial longo deslocado ('No Brasil contemporâneo,') exige vírgula para avisar o leitor que a frase começou invertida.",
            testePratico: "Faça o 'Teste do Trem': Aponte o dedo para quem faz a ação (sujeito) e para o verbo. Se não houver nada intercalado entre eles, JAMAIS coloque vírgula, mesmo que a frase tenha três linhas!",
            exemploCerto: "A ausência de políticas públicas eficazes de saneamento básico compromete a dignidade humana nas periferias brasileiras.",
            exemploErrado: "A ausência de políticas públicas eficazes de saneamento básico, compromete a dignidade humana nas periferias brasileiras."
        },
        crase: {
            titulo: "Crase: A Fusão Matemática (A + A = À)",
            subtitulo: "A crase não é um acento inventado: é a soma física de uma preposição com um artigo",
            icone: "🧮",
            tag: "Regência & Artigo",
            logica: "A crase não é um enfeite ou um acento tônico; é uma crase física (do grego 'fusão'). Para ela existir, você precisa obrigatoriamente de DOIS 'As': o primeiro 'a' é exigido por quem manda antes (o verbo ou substantivo que pede preposição: 'acesso a', 'favorável a', 'ir a'); o segundo 'a' é o artigo feminino que acompanha a palavra seguinte ('a educação', 'a saúde', 'a população'). Se você trocar a palavra feminina por uma masculina da mesma família ('acesso ao ensino', 'favorável ao projeto'), você verá nitidamente o 'a' (preposição) somado ao 'o' (artigo) virando 'ao'. Se virou 'ao' no masculino, tem crase no feminino!",
            porQueBancasCobram: "A crase testa ao mesmo tempo a sua capacidade de reconhecer regência verbal/nominal e morfologia de artigos. Corretores da UEMA e do ENEM penalizam severamente o 'a' sem crase antes de termo feminino regido e a crase indevida antes de verbo ou palavras masculinas.",
            testePratico: "O 'Teste do Masculino': Troque a palavra feminina por uma masculina qualquer. Deu 'AO'? Leva crase obrigatória! Deu apenas 'O' ou 'A'? Sem crase! Exemplo: 'Assistiu à aula' -> 'Assistiu AO jogo' (tem crase!). Antes de verbo? Verbo não aceita artigo (ninguém fala 'o comer é belo'), logo nunca tem crase antes de verbo!",
            exemploCerto: "O projeto de intervenção visa garantir o acesso irrestrito à educação de qualidade e à saúde básica.",
            exemploErrado: "O projeto de intervenção visa garantir o acesso irrestrito a educação de qualidade e à partir de novas leis."
        },
        regencia: {
            titulo: "Regência: O DNA do Significado dos Verbos",
            subtitulo: "Por que mudar a preposição de um verbo muda a sua própria identidade",
            icone: "🧬",
            tag: "Sintaxe de Regência",
            logica: "Na língua portuguesa culta, a preposição não é um adorno; ela altera a semântica do verbo. 'Visar' sem preposição significa apontar uma arma ou carimbar um passaporte; 'visar a' significa almejar ou buscar como objetivo. 'Implicar' significa 'trazer como consequência direta'; por isso ele é transitivo direto e dispensa qualquer preposição (dizer 'implicará em problemas' é um vício coloquial). 'Assistir o' é prestar auxílio médico; 'assistir ao' é presenciar ou contemplar.",
            porQueBancasCobram: "A regência é o maior termômetro da erudição natural de um candidato. Bancas como UFG (Verbena), UEMA e ENEM consideram o uso correto de 'visar ao bem-estar' e 'implicará mudanças' (sem 'em') como marca de maturidade linguística superior.",
            testePratico: "Lembre-se dos 3 Reis da Redação: 1) Implicar NÃO tem 'em' (implica algo). 2) Visar com sentido de meta TEM 'a' (visa ao progresso). 3) Obedecer sempre pede 'a' (obedece às leis).",
            exemploCerto: "A negligência governamental implicará severos prejuízos ambientais e deixará de visar ao desenvolvimento sustentável.",
            exemploErrado: "A negligência governamental implicará em severos prejuízos ambientais e deixará de visar o desenvolvimento sustentável."
        },
        proporcao: {
            titulo: "Proporção vs Causa: As Duas Balanças Lógicas",
            subtitulo: "Por que 'À medida que' e 'Na medida em que' são mundos completamente diferentes",
            icone: "⚖️",
            tag: "Conectivos & Semântica",
            logica: "'À medida que' é uma régua sincronizada: conforme um lado se move gradativamente, o outro se move junto (proporção). 'Na medida em que' é uma balança de causas: equivale estritamente a 'já que', 'uma vez que', 'porque' (causalidade). Misturar as duas expressões criando 'à medida em que' (com crase e 'em') é gerar uma anomalia linguística inexistente na gramática normativa.",
            porQueBancasCobram: "O uso de 'à medida em que' é um dos erros mais frequentes e batidos de vestibulandos. Os corretores detectam na hora e descontam na Competência 1 e Competência 4.",
            testePratico: "Quer falar de tempo correndo junto e aumento gradual? Use 'À medida que'. Quer justificar uma razão ou causa? Use 'Na medida em que' ou simplesmente 'Visto que'. E nunca, em hipótese alguma, misture crase com a preposição 'em'!",
            exemploCerto: "À medida que a urbanização se expande, os desafios sanitários aumentam, na medida em que faltam investimentos estruturais.",
            exemploErrado: "À medida em que a urbanização se expande, os desafios sanitários aumentam decorrente da falta de verbas."
        },
        paralelismo: {
            titulo: "Paralelismo: A Simetria que o Cérebro Exige",
            subtitulo: "Como a coordenação de ideias em espelho garante clareza e ritmo no texto",
            icone: "🪞",
            tag: "Estrutura Sintática",
            logica: "O cérebro humano processa sequências lógicas buscando padrões e simetria. Quando você coordena dois elementos (com 'e', 'ou', 'não só... mas também'), o segundo membro deve ser o espelho gramatical do primeiro. Se você começou com verbo no infinitivo ('combater o crime'), o segundo membro deve ser outro infinitivo ('e proteger o cidadão'). Se começou com substantivo ('a defesa dos direitos'), o segundo deve ser substantivo ('e a garantia da justiça'). Misturar infinitivo com gerúndio ou substantivo quebra a espinha dorsal da frase.",
            porQueBancasCobram: "A falta de paralelismo é penalizada tanto na C1 (falha sintática) quanto na C4 (coesão defeituosa). Bancas exigentes como UEMA, UFG e ENEM consideram o paralelismo impecável como requisito para notas na faixa de excelência.",
            testePratico: "O 'Teste da Gangorra': Se o lado esquerdo do conectivo for 'Verbo + Substantivo', o lado direito DEVE ser 'Verbo + Substantivo'. Se o lado esquerdo for 'de + Substantivo', o lado direito DEVE ser 'de + Substantivo'.",
            exemploCerto: "Cabe ao Estado não só formular políticas públicas de inclusão, mas também fiscalizar sua aplicação nos municípios.",
            exemploErrado: "Cabe ao Estado não só formular políticas públicas de inclusão, mas também a fiscalização de sua aplicação nos municípios."
        },
        onde: {
            titulo: "O Pronome 'Onde' Tem CEP Físico",
            subtitulo: "Por que uma lei, uma sociedade ou um filme nunca podem ser chamados de 'onde'",
            icone: "📍",
            tag: "Coesão Referencial",
            logica: "Na língua portuguesa, 'onde' é um pronome relativo de raiz estritamente espacial e geográfica. Ele só pode substituir lugares físicos palpáveis: uma cidade, um hospital, um país, uma escola, uma rua. Uma sociedade, uma conjuntura, uma obra literária, um período histórico ou uma Constituição NÃO são terrenos com coordenadas de GPS nem paredes! Para ideias conceituais, temporais ou abstratas, utilize 'em que', 'no qual', 'na qual' ou 'durante o qual'.",
            porQueBancasCobram: "O vício de usar 'onde' para tudo é um reflexo direto da oralidade cotidiana. As bancas de redação de Medicina e vestibulares tradicionais (UEMA, UFG, ENEM) aplicam penalidades severas ao primeiro 'onde' abstrato encontrado.",
            testePratico: "Pergunte a si mesmo: 'Dá para andar a pé ou digitar esse lugar no Google Maps?' Se a resposta for NÃO (como em sociedade, debate, lei, século), risque o 'onde' imediatamente e escreva 'em que' ou 'no qual'!",
            exemploCerto: "O documentário 'Ilha das Flores', no qual se retratam as desigualdades brasileiras, reflete a sociedade em que vivemos.",
            exemploErrado: "O documentário 'Ilha das Flores', onde se retratam as desigualdades brasileiras, reflete a sociedade onde vivemos."
        },
        subjuntivo: {
            titulo: "Concessão & O Modo da Dúvida (Subjuntivo)",
            subtitulo: "Por que 'Embora' e 'Conquanto' exigem o modo subjuntivo e nunca o indicativo",
            icone: "🌫️",
            tag: "Modo Verbal & Coesão",
            logica: "O modo Indicativo é o modo da certeza factual ('eu sei', 'eles fazem'). O modo Subjuntivo é o modo da ressalva, da hipótese, da concessão ('embora saibam', 'conquanto façam'). Quando você usa um conectivo concessivo, você está admitindo uma oposição hipotética que não é forte o suficiente para derrubar sua tese. Por isso, a língua portuguesa exige que o verbo venha no Subjuntivo ('embora existam', nunca 'embora existem').",
            porQueBancasCobram: "Erros de correlação verbal com concessivos são classificados como falha grave de modalidade culta. O corretor percebe imediatamente a discordância entre a ressalva e o tempo verbal.",
            testePratico: "Sempre que usar 'Embora', 'Conquanto', 'Ainda que', 'Mesmo que' ou 'Posto que', conjure o verbo no presente do subjuntivo: 'que eles tenham', 'que haja', 'que existam'. Se soar com certeza do indicativo ('embora tem', 'embora há'), corrija na hora!",
            exemploCerto: "Embora a Constituição de 1988 assegure a saúde como direito de todos, conquanto existam verbas, a realidade hospitalar permanece precária.",
            exemploErrado: "Embora a Constituição de 1988 assegura a saúde como direito de todos, conquanto existem verbas, a realidade hospitalar permanece precária."
        },
        partitivo: {
            titulo: "Sujeito Partitivo: A Lógica da Concordância de Grupo",
            subtitulo: "Entenda por que 'A maioria dos jovens participa' e 'participam' são ambas formas cultas",
            icone: "👥",
            tag: "Concordância Verbal",
            logica: "Expressões partitivas ('a maioria de', 'grande parte de', 'uma parcela de', 'metade de') reúnem um núcleo singular ('a maioria') com um especificador plural ('dos estudantes'). A língua portuguesa oferece ao autor uma escolha de foco: você pode concordar gramaticalmente com o núcleo singular ('A maioria participa' - foco no coletivo) ou concordar por atração afetiva com os indivíduos no plural ('A maioria dos jovens participam' - foco nas pessoas).",
            porQueBancasCobram: "Muitos alunos perdem tempo ou têm medo de errar achando que uma das formas é proibida. Ambas são 100% legítimas na norma padrão e aceitas com nota máxima pelas 6 bancas.",
            testePratico: "Escolha uma das duas opções e mantenha a consistência no mesmo parágrafo. Se você usou o singular ('a maioria apoia'), evite mudar no período seguinte para o plural sem motivo argumentativo.",
            exemploCerto: "Grande parte dos cidadãos brasileiros carece de saneamento básico (concordância com 'grande parte') OU carecem (com 'dos cidadãos).",
            exemploErrado: "Misturar tempos desconexos sem manter a coerência interna do raciocínio no mesmo parágrafo."
        },
        pois: {
            titulo: "O 'Pois' Camaleão: Causa vs Conclusão",
            subtitulo: "A posição do 'pois' dentro da oração define se ele explica ou conclui o raciocínio",
            icone: "🦎",
            tag: "Conectivos & Pontuação",
            logica: "O conectivo 'pois' tem dupla personalidade de acordo com a sua posição sintática: 1) ANTES do verbo ('Não saia, pois vai chover'): ele é causal/explicativo, sinônimo de 'porque'. 2) DEPOIS do verbo, prensado entre duas vírgulas ('O problema é grave; cabe, pois, ao Estado intervir'): ele vira um operador CONCLUSIVO sofisticadíssimo, clone exato do 'portanto'.",
            porQueBancasCobram: "Empregar o 'pois' posposto ao verbo com duas vírgulas no parágrafo de Conclusão demonstra domínio avançado de operadores discursivos (Competência 4 no ENEM e Critério de Coesão nas demais bancas).",
            testePratico: "Quer impressionar o corretor na proposta de intervenção ou fechamento de desenvolvimento? Coloque o 'pois' após o verbo auxiliar: 'É mister, pois, que o Ministério...' ou 'Cabe, pois, à sociedade...'.",
            exemploCerto: "A inércia governamental aprofunda a desigualdade; é urgente, pois, reformular a gestão das políticas públicas.",
            exemploErrado: "A inércia governamental aprofunda a desigualdade, pois cabe reformular as políticas públicas (usado com sentido conclusivo antes do verbo sem pontuação)."
        }
    };

    const grammarRulesData = {
        virgula: `<strong>📌 Regra da Vírgula com Conectivos:</strong><br>
1. Conectivo iniciando período ('Além disso,', 'Portanto,', 'Contudo,') pede vírgula OBRIGATÓRIA logo após.<br>
2. Conectivo intercalado no meio da oração ('O Estado deve, ademais, ampliar...') fica OBRIGATORIAMENTE entre duas vírgulas.<br>
3. A conjunção 'mas' leva vírgula ANTES, NUNCA DEPOIS ('..., mas a realidade...').`,
        crase: `<strong>📌 Crase Fatal na Redação:</strong><br>
1. Troque por palavra masculina: se der 'AO', tem crase ('acesso à saúde' = 'acesso ao hospital').<br>
2. NUNCA use crase antes de verbo ('a partir de', 'a combater').<br>
3. Locuções proporcionais femininas têm crase obrigatória: 'À medida que', 'À proporção que'.`,
        proporcao: `<strong>📌 Proporção vs Causa:</strong><br>
1. 'À medida que' = proporção temporal sincronizada ('À medida que os anos passam...').<br>
2. 'Na medida em que' = causa / justificativa ('A medida falhou na medida em que faltou verba...').<br>
3. 'À medida em que' (híbrido) É ERRO GRAVE. Nunca misture crase com 'em'!`,
        regencia: `<strong>📌 Regência dos Verbos Nobres:</strong><br>
1. 'Implicar' = transitivo direto (NÃO tem 'em'): 'implicará mudanças', nunca 'implicará em mudanças'.<br>
2. 'Visar' (almejar) = transitivo indireto: 'visar ao progresso', nunca 'visar o progresso'.<br>
3. 'Obedecer' / 'Desobedecer' = transitivo indireto: 'obedecer às leis', nunca 'obedecer as leis'.`,
        paralelismo: `<strong>📌 Paralelismo Sintático Estrito:</strong><br>
1. Elementos coordenados devem ter a mesma forma gramatical: infinitivo com infinitivo, substantivo com substantivo.<br>
2. Em 'não só... mas também', a estrutura gramatical das duas pontas deve ser idêntica.<br>
3. Se iniciou uma lista com preposição ('de reformas, de investimentos'), mantenha o 'de' em todos os termos.`,
        referencial: `<strong>📌 Coesão Referencial Limpa:</strong><br>
1. Elimine 'o mesmo' para retomar pessoas ou termos anteriores. Troque por 'este', 'ele' ou elipse.<br>
2. 'Este' / 'Esta' = retoma o termo mais próximo ou introduz ideia nova.<br>
3. 'Esse' / 'Essa' = retoma termo já citado no parágrafo.`,
        onde: `<strong>📌 Uso Restrito do Pronome 'Onde':</strong><br>
1. Só use 'onde' para lugares físicos com chão, teto ou CEP: escola, cidade, hospital.<br>
2. Para sociedade, época, filme, debate ou lei, use 'em que', 'no qual' ou 'na qual'.`,
        subjuntivo: `<strong>📌 Concessivos & Modo Subjuntivo:</strong><br>
1. Conectivos concessivos ('Embora', 'Conquanto', 'Ainda que', 'Posto que') exigem verbo no Subjuntivo.<br>
2. Diga 'Embora existam leis', NUNCA 'Embora existem leis'.<br>
3. 'Posto que' é estritamente concessivo (= embora), nunca causal!`,
        pois: `<strong>📌 Posição Estratégica do 'Pois':</strong><br>
1. ANTES do verbo = Causal / Explicativo ('Não pare, pois o tempo urge').<br>
2. DEPOIS do verbo (intercalado entre vírgulas) = Conclusivo ('Cabe, pois, ao Ministério agir').`
    };

    function renderGrammarLogic(topic) {
        const display = document.getElementById('grammar-logic-display');
        if (!display) return;
        const d = grammarLogicData[topic] || grammarLogicData.virgula;
        display.innerHTML = `
            <div class="logic-header">
                <div>
                    <h5 class="logic-title">${d.icone} ${d.titulo}</h5>
                    <span style="font-size: 0.82rem; color: #94a3b8;">${d.subtitulo}</span>
                </div>
                <span class="logic-badge">${d.tag}</span>
            </div>
            <div class="logic-block">
                <span class="logic-block-label" style="color: #38bdf8;">🧠 Como a Língua Realmente Pensa:</span>
                <p class="logic-block-text">${d.logica}</p>
            </div>
            <div class="logic-block">
                <span class="logic-block-label" style="color: #a78bfa;">🔍 Por Que Corretores Cobram Esse Padrão:</span>
                <p class="logic-block-text">${d.porQueBancasCobram}</p>
            </div>
            <div class="logic-block" style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 10px 12px; border-radius: 6px;">
                <span class="logic-block-label" style="color: #fbbf24;">⚡ Teste Prático de 5 Segundos (Sem Decoreba):</span>
                <p class="logic-block-text" style="color: #fef3c7;">${d.testePratico}</p>
            </div>
            <div class="logic-block">
                <span class="logic-block-label" style="color: #cbd5e1;">⚖️ Comparativo na Prática (Certo vs Errado):</span>
                <div class="logic-compare-grid">
                    <div class="logic-compare-card correct">
                        <strong style="color: #34d399;">✅ Aplicação Impecável:</strong><br>
                        <span>${d.exemploCerto}</span>
                    </div>
                    <div class="logic-compare-card wrong">
                        <strong style="color: #f87171;">❌ Desvio Penalizado:</strong><br>
                        <span>${d.exemploErrado}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Inicialização das Abas de Densidade
    const btnTabRadar = document.getElementById('btn-tab-radar');
    const btnTabLogica = document.getElementById('btn-tab-logica');
    const contentRadar = document.getElementById('density-content-radar');
    const contentLogica = document.getElementById('density-content-logica');

    if (btnTabRadar && btnTabLogica && contentRadar && contentLogica) {
        btnTabRadar.addEventListener('click', () => {
            btnTabRadar.classList.add('active');
            btnTabLogica.classList.remove('active');
            contentRadar.classList.remove('hidden');
            contentLogica.classList.add('hidden');
        });

        btnTabLogica.addEventListener('click', () => {
            btnTabLogica.classList.add('active');
            btnTabRadar.classList.remove('active');
            contentLogica.classList.remove('hidden');
            contentRadar.classList.add('hidden');
            // Garante renderização inicial da lógica
            const activePill = document.querySelector('.grammar-logic-pill.active');
            renderGrammarLogic(activePill ? activePill.getAttribute('data-topic') : 'virgula');
        });
    }

    // Eventos das Pílulas de Tópicos da Lógica
    const logicPills = document.querySelectorAll('.grammar-logic-pill');
    logicPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            logicPills.forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            renderGrammarLogic(e.currentTarget.getAttribute('data-topic'));
        });
    });

    // Eventos das Pílulas Rápidas de Fixação (Leis de Ouro)
    const ruleTabs = document.querySelectorAll('.grammar-rule-tab');
    const ruleContent = document.getElementById('grammar-rule-content');
    ruleTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            ruleTabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const rule = e.currentTarget.getAttribute('data-rule');
            if (ruleContent && grammarRulesData[rule]) {
                ruleContent.innerHTML = grammarRulesData[rule];
            }
        });
    });

    // Renderização inicial
    renderGrammarLogic('virgula');

    // -----------------------------------------
    // LÓGICA DO DESAFIO GRAMATICAL DINÂMICO
    // -----------------------------------------
    const btnCopyGrammarChallenge = document.getElementById('btn-copy-grammar-challenge');
    const grammarChallengeInput = document.getElementById('grammar-challenge-input');
    const grammarChallengeDisplay = document.getElementById('grammar-challenge-display');
    const grammarChallengeText = document.getElementById('grammar-challenge-text');
    const grammarChallengeHint = document.getElementById('grammar-challenge-hint');
    const grammarChallengeRewrite = document.getElementById('grammar-challenge-rewrite');
    const btnEvaluateGrammarChallenge = document.getElementById('btn-evaluate-grammar-challenge');
    const grammarChallengeResponse = document.getElementById('grammar-challenge-response');
    let currentGrammarChallenge = "";

    if (btnCopyGrammarChallenge) {
        btnCopyGrammarChallenge.addEventListener('click', () => {
            const fullPromptGen = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\n${PROMPT_GERAR_DESAFIO}`;
            navigator.clipboard.writeText(fullPromptGen).then(() => {
                alert("Prompt copiado! Cole no Gemini e traga o JSON de volta para o passo 2.");
            });
        });
    }

    if (grammarChallengeInput) {
        grammarChallengeInput.addEventListener('input', async () => {
            const val = grammarChallengeInput.value.trim();
            if (!val) {
                grammarChallengeDisplay.classList.add('hidden');
                btnEvaluateGrammarChallenge.style.display = 'none';
                return;
            }
            try {
                const m = await import('./js/json-repair.js');
                const obj = m.safeParseLLMJson(val);

                if (obj.texto_problematico) {
                    currentGrammarChallenge = obj.texto_problematico;
                    grammarChallengeText.textContent = obj.texto_problematico;
                    grammarChallengeHint.textContent = obj.dica || "";
                    grammarChallengeDisplay.classList.remove('hidden');
                    btnEvaluateGrammarChallenge.style.display = 'block';
                }
            } catch (e) {
                // Aguarda o usuario colar um json valido
            }
        });
    }

    if (btnEvaluateGrammarChallenge) {
        btnEvaluateGrammarChallenge.addEventListener('click', () => {
            const studentRewrite = grammarChallengeRewrite.value.trim();
            if (!studentRewrite) {
                alert("Por favor, escreva a sua correção antes de avaliar!");
                return;
            }

            let prompt = PROMPT_CORRIGIR_DESAFIO.replace("{TEXTO_ORIGINAL}", currentGrammarChallenge).replace("{REESCRITA_ALUNO}", studentRewrite);
            const fullPromptEval = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\n${prompt}`;
            navigator.clipboard.writeText(fullPromptEval).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let html = `<div style="padding: 1.5rem; background: rgba(30, 41, 59, 0.8); border: 1px solid var(--panel-border); border-radius: 8px; margin-top: 1.5rem; border-left: 4px solid var(--primary);">`;
                    html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">`;
                    html += `<h3 style="color: var(--primary);">Correção do Prof. Lino</h3>`;

                    const corNota = resultObj.nota === 100 ? 'var(--success)' : (resultObj.nota >= 70 ? 'var(--warning)' : 'var(--danger)');
                    html += `<div style="font-size: 1.5rem; font-weight: bold; color: ${corNota}">${resultObj.nota}/100</div>`;
                    html += `</div>`;

                    html += `<p style="line-height: 1.6; margin-bottom: 1rem; color: var(--text-main);">${resultObj.feedback_geral}</p>`;

                    if (resultObj.erros_encontrados && resultObj.erros_encontrados.length > 0) {
                        html += `<ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">`;
                        resultObj.erros_encontrados.forEach(erro => {
                            const isCorrigido = erro.status.toLowerCase().includes("não") ? false : true;
                            const icone = isCorrigido ? "✅" : "❌";
                            const cor = isCorrigido ? "var(--success)" : "var(--danger)";
                            html += `<li style="margin-bottom: 0.5rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border-left: 3px solid ${cor};">
                                ${icone} <span style="font-weight: 500;">${erro.status}</span>: ${erro.erro}
                            </li>`;
                        });
                        html += `</ul>`;
                    }

                    html += `<div><h4 style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Reescrita Ideal:</h4>`;
                    html += `<p style="font-family: monospace; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 4px;">${resultObj.reescrita_ideal}</p></div>`;

                    html += `</div>`;

                    grammarChallengeResponse.innerHTML = html;
                };

                copiadorModal.classList.remove('hidden');
                jsonPasteArea.value = '';
                jsonPasteArea.focus();
            });
        });
    }

    // Função auxiliar provisória
    function textToLines(text) {
        return text.split('\n').length;
    }

    function setupTooltips() {
        const errorMarks = document.querySelectorAll('.error-mark');

        errorMarks.forEach(mark => {
            if (mark.classList.contains('bound')) return;
            mark.classList.add('bound');

            mark.addEventListener('mouseenter', (e) => {
                const type = mark.getAttribute('data-type');
                const orig = mark.getAttribute('data-orig');
                const sugg = mark.getAttribute('data-sugg');
                const exp = mark.getAttribute('data-exp');

                if (type === 'Conectivo') {
                    tooltipHeader.textContent = `Sugestão de Conectivo/Operador`;
                    tooltipHeader.style.backgroundColor = 'var(--success)';
                } else {
                    tooltipHeader.textContent = `Erro de ${type}`;
                    if (type === 'Gramática') tooltipHeader.style.backgroundColor = 'var(--danger)';
                    else if (type === 'Coesão') tooltipHeader.style.backgroundColor = 'var(--warning)';
                    else tooltipHeader.style.backgroundColor = 'var(--primary)';
                }

                tooltipOriginal.textContent = orig;
                if (sugg) {
                    tooltipSuggestion.textContent = sugg;
                    tooltipSuggestion.parentElement.style.display = 'block';
                } else {
                    tooltipSuggestion.parentElement.style.display = 'none';
                }
                tooltipExplanation.textContent = exp;

                // Position tooltip
                const rect = mark.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX - 150 + (rect.width / 2)}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;

                tooltip.classList.add('visible');
            });

            mark.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });

            mark.addEventListener('click', () => {
                const type = mark.getAttribute('data-type');
                const orig = mark.getAttribute('data-orig');
                const sugg = mark.getAttribute('data-sugg');
                const exp = mark.getAttribute('data-exp');

                // Switch to Grammar tab
                const btnModeGrammar = document.getElementById('btn-mode-grammar');
                if (btnModeGrammar) btnModeGrammar.click();

                // Fill the textarea
                const grammarTextarea = document.getElementById('grammar-tutor-textarea');
                if (grammarTextarea) {
                    grammarTextarea.value = `Prof. Lino, cometi um erro do tipo '${type}' ao escrever "${orig}". A sugestão foi "${sugg}" por conta disso: "${exp}". Pode me explicar a regra gramatical e me dar dicas para não errar mais?`;

                    // Trigger the analyze button if available
                    const tutorSubmitBtn = document.getElementById('grammar-tutor-submit');
                    if (tutorSubmitBtn) {
                        tutorSubmitBtn.click();
                    }
                }
            });
        });
    }

    // Analysis for Training Mode
    const trainingBlockTimers = {}; // Store intervals

    function startTrainingBlockTimer(index, displayEl, durationSecs) {
        if (trainingBlockTimers[index]) return; // Already running

        let timeRemaining = durationSecs;
        displayEl.style.color = 'var(--warning)';

        trainingBlockTimers[index] = setInterval(() => {
            timeRemaining--;
            if (timeRemaining <= 0) {
                clearInterval(trainingBlockTimers[index]);
                displayEl.textContent = '00:00';
                displayEl.style.color = 'var(--danger)';
            } else {
                const m = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
                const s = (timeRemaining % 60).toString().padStart(2, '0');
                displayEl.textContent = `${m}:${s}`;
                if (timeRemaining < 60 * 5) {
                    displayEl.style.color = 'var(--danger)';
                }
            }
        }, 1000);
    }

    [1, 2, 3, 4].forEach(i => {
        const textarea = document.getElementById(`textarea-part-${i}`);
        const displayEl = document.getElementById(`timer-display-${i}`);
        if (textarea && displayEl) {
            const duration = parseInt(displayEl.getAttribute('data-duration'), 10) || 900;
            const startTimer = () => startTrainingBlockTimer(i, displayEl, duration);
            textarea.addEventListener('input', startTimer, { once: true });
            textarea.addEventListener('focus', startTimer, { once: true });
        }
    });

    const tutorialTextarea = document.getElementById('tutorial-textarea');
    const tutorialDisplay = document.getElementById('timer-display-tutorial');
    if (tutorialTextarea && tutorialDisplay) {
        // Set an attribute for default duration if missing (e.g. 20 min)
        const duration = parseInt(tutorialDisplay.getAttribute('data-duration'), 10) || 1200;
        const startTutorialTimer = () => startTrainingBlockTimer('tutorial', tutorialDisplay, duration);
        tutorialTextarea.addEventListener('input', startTutorialTimer, { once: true });
        tutorialTextarea.addEventListener('focus', startTutorialTimer, { once: true });
    }

    const analyzePartBtns = document.querySelectorAll('.btn-analyze-part');
    if (analyzePartBtns.length > 0) {
        analyzePartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Stop timers
                Object.keys(trainingBlockTimers).forEach(key => clearInterval(trainingBlockTimers[key]));
                if (typeof partTimerInterval !== 'undefined') clearInterval(partTimerInterval);

                const part = btn.getAttribute('data-part');
                const textarea = document.getElementById(`textarea-part-${part}`);
                const text = textarea ? textarea.value.trim() : '';
                const themeElement = document.getElementById('theme');
                const theme = themeElement ? themeElement.value.trim() : '';

                if (text.length < 10) {
                    alert("Preencha este bloco com mais detalhes para analisarmos!");
                    return;
                }

                const isCarta = currentBanca.generosPermitidos && currentBanca.generosPermitidos[0] === 'carta';
                const partNamesDissertativo = ["Introdução", "Desenvolvimento 1", "Desenvolvimento 2", "Conclusão"];
                const partNamesCarta = ["Cabeçalho, Vocativo e Introdução", "Argumentação e Diálogo", "Aprofundamento Crítico", "Conclusão, Despedida e Assinatura"];
                const partNames = isCarta ? partNamesCarta : partNamesDissertativo;
                const partName = partNames[part - 1] || "Bloco";

                let instrucaoBancaBloco = `\nBanca Alvo: ${currentBanca.nome}\nGênero: ${isCarta ? 'Carta do Leitor' : 'Dissertativo-Argumentativo'}\nTema: ${theme || 'Não informado'}\nBloco (${partName}):\n${text}\n`;

                if (!isCarta && (currentBanca.id === 'UEMA' || currentBanca.id === 'UFG' || currentBanca.id === 'UNITINS') && String(part) === '4') {
                    instrucaoBancaBloco += `\nATENÇÃO RIGOROSA: Esta banca (${currentBanca.nome}) NÃO utiliza proposta de intervenção social com 5 elementos (GOMIFES). A conclusão DEVE ser uma síntese circular reflexiva e crítica profunda. Não cobre agente, ação, meio ou detalhamento.\n`;
                } else if (!isCarta && (currentBanca.id === 'ENEM' || currentBanca.id === 'EXATO_DISSERTATIVO') && String(part) === '4') {
                    instrucaoBancaBloco += `\nATENÇÃO: A conclusão deve conter proposta de intervenção social completa com os 5 elementos (Agente, Ação, Meio/Modo, Efeito e Detalhamento).\n`;
                } else if (isCarta) {
                    instrucaoBancaBloco += `\nATENÇÃO RIGOROSA: Gênero Carta do Leitor. Linguagem dialógica com o interlocutor/veículo e PROIBIÇÃO ABSOLUTA de identificação com nome real.\n`;
                }

                instrucaoBancaBloco += `\nDIRETRIZ DE AVALIAÇÃO RAZOÁVEL E JUSTA:\n- Seja encorajador e equilibrado. O aluno NÃO precisa de palavras rebuscadas ou erudição forçada.\n- Avalie se o bloco cumpre sua função com clareza, coerência e correção gramatical padrão.\n- Não penalize vocabulário simples e correto. Ofereça uma reescrita lapidada e clara preservando a voz e autenticidade do aluno.\n`;

                const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\nINSTRUÇÃO CRÍTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\nREGRAS DE JSON:\n1. NÃO pule linhas (Enter) dentro das strings. Use \\n.\n2. NÃO use aspas duplas dentro das strings. Use aspas simples (') ou escape (\\").\n\n---\n\nAnalise o seguinte parágrafo isolado (${partName}), diagnosticando a estrutura, conformidade com a banca, desvios gramaticais e oferecendo uma reescrita lapidada e clara preservando a voz do aluno. Retorne no formato JSON com as chaves "diagnostico" e "reescrita".\n${instrucaoBancaBloco}`;

                navigator.clipboard.writeText(fullPrompt).then(() => {
                    onCopiadorSubmit = (jsonStr) => {
                        const resultObj = JSON.parse(jsonStr);

                        let feedbackHtml = `
                            <div style="margin-top: 1rem; background: var(--bg-color); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--panel-border);">
                                <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Feedback do ${partName}</h4>
                                <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.diagnostico || 'Sem diagnóstico.'}</p>
                                
                                <h5 style="color: var(--success); margin-top: 1rem; margin-bottom: 0.5rem;">Reescrita Sugerida</h5>
                                <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.reescrita || 'Sem reescrita.'}</p>
                            </div>
                        `;

                        const feedbackContainer = document.getElementById(`feedback-part-${part}`);
                        feedbackContainer.innerHTML = feedbackHtml;
                    };

                    jsonPasteArea.value = '';
                    copiadorModal.classList.remove('hidden');
                }).catch(err => {
                    console.error('Erro ao copiar', err);
                    alert('Erro ao copiar o prompt.');
                });
            });
        });
    }


    // Toggle Modes - Treino por Partes
    const btnModeAvaliacao = document.getElementById('btn-mode-avaliacao');
    const btnModeTutorial = document.getElementById('btn-mode-tutorial');
    const containerAvaliacao = document.getElementById('training-avaliacao-container');
    const containerTutorial = document.getElementById('training-tutorial-container');

    if (btnModeAvaliacao && btnModeTutorial) {
        btnModeAvaliacao.addEventListener('click', () => {
            btnModeAvaliacao.classList.add('active');
            btnModeAvaliacao.style.background = 'var(--primary)';
            btnModeAvaliacao.style.color = '#fff';

            btnModeTutorial.classList.remove('active');
            btnModeTutorial.style.background = 'transparent';
            btnModeTutorial.style.color = 'var(--text-color)';

            containerAvaliacao.classList.remove('hidden');
            containerTutorial.classList.add('hidden');
        });

        btnModeTutorial.addEventListener('click', () => {
            btnModeTutorial.classList.add('active');
            btnModeTutorial.style.background = 'var(--primary)';
            btnModeTutorial.style.color = '#fff';

            btnModeAvaliacao.classList.remove('active');
            btnModeAvaliacao.style.background = 'transparent';
            btnModeAvaliacao.style.color = 'var(--text-color)';

            containerTutorial.classList.remove('hidden');
            containerAvaliacao.classList.add('hidden');

            initTutorial();
        });
    }

    // Lógica do Modo Tutorial (Treino Guiado Passo a Passo)
    function getTutorialConfig(banca) {
        const genero = banca && banca.generosPermitidos ? banca.generosPermitidos[0] : 'dissertativo';
        const isIntervencao = banca && (banca.id === 'ENEM' || banca.id === 'EXATO_DISSERTATIVO');

        if (genero === 'carta') {
            return {
                intro: {
                    title: "Cabeçalho, Vocativo e Introdução",
                    periods: [
                        { id: 1, name: "Frase 1", hint: "Local, data e vocativo formal adequado ao destinatário/editor." },
                        { id: 2, name: "Frase 2", hint: "Apresentação da matéria/assunto de referência e objetivo da carta." },
                        { id: 3, name: "Frase 3", hint: "Ponto de vista central do leitor sobre o tema abordado." }
                    ]
                },
                d1: {
                    title: "Argumentação (Diálogo com Veículo)",
                    periods: [
                        { id: 1, name: "Frase 1", hint: "Apresentação do primeiro argumento dialogando com o veículo." },
                        { id: 2, name: "Frase 2", hint: "Desenvolvimento crítico com marcas de interlocução (ex: 'como vocês apontaram')." },
                        { id: 3, name: "Frase 3", hint: "Fato ou exemplo concreto que sustenta sua posição." },
                        { id: 4, name: "Frase 4", hint: "Conclusão parcial do ponto com apelo reflexivo ao editor." }
                    ]
                },
                d2: {
                    title: "Aprofundamento Crítico",
                    periods: [
                        { id: 1, name: "Frase 1", hint: "Segundo aspecto crítico ou impacto social da discussão." },
                        { id: 2, name: "Frase 2", hint: "Explicação das causas e consequências para os leitores/cidadãos." },
                        { id: 3, name: "Frase 3", hint: "Repertório ou contraponto à matéria original." },
                        { id: 4, name: "Frase 4", hint: "Fechamento incisivo cobrando reflexão da publicação." }
                    ]
                },
                conclusao: {
                    title: "Conclusão, Despedida e Assinatura",
                    periods: [
                        { id: 1, name: "Frase 1", hint: "Síntese das reivindicações ou posicionamento final do leitor." },
                        { id: 2, name: "Frase 2", hint: "Chamamento final de ação ou reflexão aos editores/leitores." },
                        { id: 3, name: "Frase 3", hint: "Despedida formal respeitosa e assinatura neutra (NUNCA assine com nome real!)." }
                    ]
                }
            };
        }

        // Dissertativo
        return {
            intro: {
                title: "Introdução",
                periods: [
                    { id: 1, name: "Frase 1", hint: "Tópico Frasal c/ Repertório e contextualização temática." },
                    { id: 2, name: "Frase 2", hint: "Ponte Temática conectando o repertório ao tema com clareza." },
                    { id: 3, name: "Frase 3", hint: "Tese Dupla apresentando os dois problemas/argumentos centrais." }
                ]
            },
            d1: {
                title: "Desenvolvimento 1",
                periods: [
                    { id: 1, name: "Frase 1", hint: "Tópico Frasal (retomada direta do primeiro argumento)." },
                    { id: 2, name: "Frase 2", hint: "Progressão Causal explicando a raiz e o impacto do problema." },
                    { id: 3, name: "Frase 3", hint: "Repertório sociocultural legitimado e produtivo." },
                    { id: 4, name: "Frase 4", hint: "Fechamento Crítico com reflexão reflexiva incisiva." }
                ]
            },
            d2: {
                title: "Desenvolvimento 2",
                periods: [
                    { id: 1, name: "Frase 1", hint: "Tópico Frasal (retomada direta do segundo argumento)." },
                    { id: 2, name: "Frase 2", hint: "Progressão Causal explicando a causa e consequência social." },
                    { id: 3, name: "Frase 3", hint: "Repertório sociocultural legitimado e produtivo." },
                    { id: 4, name: "Frase 4", hint: "Fechamento Crítico com reflexão conclusiva do bloco." }
                ]
            },
            conclusao: {
                title: "Conclusão",
                periods: [
                    { id: 1, name: "Frase 1", hint: "Retomada formal da Tese com conectivo conclusivo adequado." },
                    { 
                        id: 2, 
                        name: "Frase 2", 
                        hint: isIntervencao 
                            ? "Proposta de Intervenção completa (Agente, Ação, Meio/Modo, Efeito e Detalhamento)." 
                            : "Síntese Circular reflexiva e aprofundamento crítico (Proibido modelo GOMIFES!)." 
                    },
                    { 
                        id: 3, 
                        name: "Frase 3", 
                        hint: isIntervencao 
                            ? "Fechamento conclusivo conectando ao repertório inicial e detalhando efeito." 
                            : "Fechamento reflexivo circular conectando ao repertório da introdução." 
                    }
                ]
            }
        };
    }

    let currentTutorialPara = 'intro';
    let currentTutorialPeriod = 1;
    let tutorialHistory = [];

    const tutorialSelect = document.getElementById('tutorial-paragraph-select');
    const tutorialChatArea = document.getElementById('tutorial-chat-area');
    // tutorialTextarea já foi declarado acima
    const tutorialStepTitle = document.getElementById('tutorial-step-title');
    const tutorialStepHint = document.getElementById('tutorial-step-hint');
    const tutorialSubmitBtn = document.getElementById('tutorial-submit-btn');
    const tutorialRestartBtn = document.getElementById('tutorial-restart-btn');

    function initTutorial() {
        if (!tutorialSelect) return;
        currentTutorialPara = tutorialSelect.value;
        currentTutorialPeriod = 1;
        tutorialHistory = [];
        tutorialChatArea.innerHTML = '';
        tutorialTextarea.value = '';
        tutorialTextarea.disabled = false;
        tutorialSubmitBtn.classList.remove('hidden');
        tutorialRestartBtn.classList.add('hidden');
        updateTutorialUI();
    }

    if (tutorialSelect) tutorialSelect.addEventListener('change', initTutorial);
    if (tutorialRestartBtn) tutorialRestartBtn.addEventListener('click', initTutorial);

    function updateTutorialUI() {
        const tutorialConfig = getTutorialConfig(currentBanca);
        const config = tutorialConfig[currentTutorialPara] || tutorialConfig['intro'];
        if (currentTutorialPeriod <= config.periods.length) {
            const periodConfig = config.periods[currentTutorialPeriod - 1];
            tutorialStepTitle.textContent = periodConfig.name;
            tutorialStepHint.textContent = "Missão atual: " + periodConfig.hint;
        } else {
            tutorialStepTitle.textContent = "Parágrafo Concluído!";
            tutorialStepHint.textContent = "Você terminou este parágrafo. O texto completo está compilado abaixo.";
            tutorialTextarea.disabled = true;
            tutorialSubmitBtn.classList.add('hidden');
            tutorialRestartBtn.classList.remove('hidden');
            let textoCompleto = tutorialHistory.map(h => h.text.trim()).join(' ');
            tutorialTextarea.value = textoCompleto;
        }
    }

    if (tutorialSubmitBtn) {
        tutorialSubmitBtn.addEventListener('click', () => {
            const text = tutorialTextarea ? tutorialTextarea.value.trim() : '';
            const themeElement = document.getElementById('theme');
            const theme = themeElement ? themeElement.value.trim() : '';
            if (text.length < 5) {
                alert("Escreva o período para que possamos avaliar!");
                return;
            }

            const tutorialConfig = getTutorialConfig(currentBanca);
            const config = tutorialConfig[currentTutorialPara] || tutorialConfig['intro'];
            const periodConfig = config.periods[currentTutorialPeriod - 1];

            let historyText = tutorialHistory.length > 0 ? "O aluno já escreveu os seguintes períodos deste parágrafo:\\n" + tutorialHistory.map(h => `Frase ${h.period}: ${h.text}`).join('\\n') + "\\n\\n" : "";

            const selectedBancaId = document.getElementById('banca-select') ? document.getElementById('banca-select').value : 'ENEM';
            const bancaRules = typeof BANCAS !== 'undefined' ? BANCAS[selectedBancaId] : currentBanca;

            let bancaInstructions = '';
            if (bancaRules) {
                bancaInstructions = `\nREGRAS DA BANCA SELECIONADA (${bancaRules.nome}):\n- ${bancaRules.resumoPratico || ''}\n` +
                    (bancaRules.orientacoes ? `- Orientações: ${bancaRules.orientacoes}\n` : '');
            }

            const systemPromptTutorial = `
Você é o Prof. Daniel Lino AI, atuando no MODO TUTORIAL PASSO A PASSO.
O aluno está construindo um parágrafo da redação (Tema: ${theme || "Não informado"}).
Banca Alvo: ${bancaRules ? bancaRules.nome : 'Banca Oficial'}.
Parágrafo alvo: ${config.title}.
O aluno está na ${periodConfig.name}. A missão desta frase era: "${periodConfig.hint}".
${bancaInstructions}

DIRETRIZ DE AVALIAÇÃO RAZOÁVEL E ENCORAJADORA:
- O aluno NÃO precisa de palavras rebuscadas ou erudição forçada. Se a frase cumprir a missão proposta com clareza e respeito à norma padrão, APROVE A FRASE (aprovado: true).
- Não reprove frases por vocabulário simples. Ofereça sugestões de estilo de forma didática e positiva, mantendo a voz e a autenticidade do aluno.

${historyText}
Texto que o aluno acabou de submeter para a ${periodConfig.name}:
"${text}"

SUA TAREFA:
Retorne EXCLUSIVAMENTE um objeto JSON com as chaves:
{
  "avaliacao": "Um feedback cirúrgico sobre a frase enviada (errou gramática? fugiu da missão?).",
  "texto_corrigido": "A reescrita da frase enviada, melhorando o léxico e corrigindo falhas, mantendo a voz do aluno.",
  "aprovado": true ou false (true se aceitável, false se precisar refazer totalmente),
  "proxima_instrucao": "Instrução técnica e encorajadora para a PRÓXIMA frase do parágrafo, ou parabenize se for a última frase.",
  "erros": [
    { "trecho_original": "palavra errada", "sugestao": "correção", "explicacao": "motivo do erro", "tipo": "Gramática ou Estilo" }
  ],
  "conectivos_melhoria": [
    { "trecho_original": "conectivo usado pelo aluno", "sugestoes": ["opção 1", "opção 2", "opção 3"] }
  ]
}`;

            const fullPrompt = `${systemPromptTutorial}\n\nINSTRUÇÃO CRÍTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nAvalie a frase e me retorne os erros e sugestões.`;

            navigator.clipboard.writeText(fullPrompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let highlightedText = text;
                    if (resultObj.erros && resultObj.erros.length > 0) {
                        resultObj.erros.forEach(erro => {
                            if (highlightedText.includes(erro.trecho_original)) {
                                const tipoClasse = erro.tipo ? erro.tipo.toLowerCase().replace(/[^a-z]/g, '') : 'erro';

                                let bg = 'rgba(239, 68, 68, 0.2)';
                                let border = 'red';
                                if (erro.tipo === 'Gramática' || tipoClasse === 'gramatica') { bg = 'rgba(239, 68, 68, 0.2)'; border = 'red'; }
                                else if (erro.tipo === 'Coesão' || tipoClasse === 'coesao') { bg = 'rgba(245, 158, 11, 0.2)'; border = 'orange'; }
                                else if (erro.tipo === 'Estilo' || tipoClasse === 'estilo') { bg = 'rgba(59, 130, 246, 0.2)'; border = '#3b82f6'; }
                                else if (erro.tipo === 'Estrutura' || erro.tipo === 'Repertório' || tipoClasse === 'estrutura' || tipoClasse === 'repertorio') { bg = 'rgba(139, 92, 246, 0.2)'; border = '#8b5cf6'; }

                                const span = `<span class="error-mark error-${tipoClasse}" style="background-color: ${bg}; cursor: pointer; border-bottom: 2px dashed ${border};" data-type="${erro.tipo || 'Erro'}" data-orig="${erro.trecho_original}" data-sugg="${erro.sugestao || ''}" data-exp="${erro.explicacao}"> ${erro.trecho_original} </span>`;
                                highlightedText = highlightedText.replace(erro.trecho_original, span);
                            }
                        });
                    }

                    if (resultObj.conectivos_melhoria && resultObj.conectivos_melhoria.length > 0) {
                        resultObj.conectivos_melhoria.forEach(conectivo => {
                            if (highlightedText.includes(conectivo.trecho_original)) {
                                const span = `<span class="error-mark error-conectivo" style="background-color: rgba(34, 197, 94, 0.2); cursor: pointer; border-bottom: 2px dashed var(--success);" data-type="Conectivo" data-orig="${conectivo.trecho_original}" data-sugg="${conectivo.sugestoes.join(' | ')}" data-exp="Essas opções refinam o vocabulário e elevam a coesão do texto."> ${conectivo.trecho_original} </span>`;
                                highlightedText = highlightedText.replace(conectivo.trecho_original, span);
                            }
                        });
                    }

                    if (resultObj.aprovado || resultObj.aprovado === undefined) {
                        tutorialHistory.push({
                            period: currentTutorialPeriod,
                            text: resultObj.texto_corrigido || text
                        });

                        const stepCard = document.createElement('div');
                        stepCard.style.padding = '1rem';
                        stepCard.style.background = 'var(--bg-color)';
                        stepCard.style.borderLeft = '4px solid var(--success)';
                        stepCard.style.borderRadius = '4px';
                        stepCard.style.border = '1px solid var(--panel-border)';
                        stepCard.innerHTML = `
                            <h4 style="color: var(--success); margin-bottom: 0.5rem;">${periodConfig.name} - Aprovada</h4>
                            <p style="margin-bottom: 0.5rem; color: var(--text-color);"><strong>Original:</strong> ${highlightedText}</p>
                            <p style="margin-bottom: 0.5rem; color: var(--text-color);"><strong>Correção Lino:</strong> ${resultObj.texto_corrigido}</p>
                            <p style="color: var(--warning); font-size: 0.95rem;"><em>Feedback: ${resultObj.avaliacao}</em></p>
                        `;
                        tutorialChatArea.appendChild(stepCard);
                        setupTooltips();

                        currentTutorialPeriod++;
                        tutorialTextarea.value = '';
                        updateTutorialUI();

                        if (currentTutorialPeriod <= config.periods.length) {
                            tutorialStepHint.textContent = `Missão atual: ${config.periods[currentTutorialPeriod - 1].hint} | Dica Prof. Lino: ${resultObj.proxima_instrucao}`;
                        }
                    } else {
                        const stepCard = document.createElement('div');
                        stepCard.style.padding = '1rem';
                        stepCard.style.background = 'var(--bg-color)';
                        stepCard.style.borderLeft = '4px solid var(--danger)';
                        stepCard.style.borderRadius = '4px';
                        stepCard.style.border = '1px solid var(--panel-border)';
                        stepCard.style.marginBottom = '1rem';
                        stepCard.innerHTML = `
                            <h4 style="color: var(--danger); margin-bottom: 0.5rem;">${periodConfig.name} - Reprovada (Refaça!)</h4>
                            <p style="margin-bottom: 0.5rem; color: var(--text-color);"><strong>Original:</strong> ${highlightedText}</p>
                            <p style="color: var(--warning); font-size: 0.95rem;"><em>Motivo: ${resultObj.avaliacao}</em></p>
                        `;
                        tutorialChatArea.appendChild(stepCard);
                        setupTooltips();
                    }
                };

                jsonPasteArea.value = '';
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }


    const analyzeRepertoryBtn = document.querySelector('#repertory-view .btn-primary');
    if (analyzeRepertoryBtn) {
        analyzeRepertoryBtn.addEventListener('click', () => {
            const textarea = document.querySelector('#repertory-view .training-textarea');
            const text = textarea.value.trim();
            const axisTitle = document.getElementById('current-axis-title').textContent;

            if (text.length < 15) {
                alert("Escreva mais para podermos avaliar a produtividade do repertório.");
                return;
            }

            const orientacaoBanca = currentBanca && currentBanca.orientacoes ? `\nOrientações da Banca: ${currentBanca.orientacoes}` : '';
            const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\nINSTRUÇÃO CRÍTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nBanca Alvo: ${currentBanca.nome}${orientacaoBanca}\nEixo Temático: ${axisTitle}\nTrecho de Repertório a avaliar:\n"${text}"\n\nDIRETRIZ DE AVALIAÇÃO RAZOÁVEL E JUSTA:\nAvalie a PRODUTIVIDADE e PERTINÊNCIA deste repertório de forma equilibrada e encorajadora. O aluno não precisa usar vocabulário rebuscado ou erudição artificial; avalie se o repertório é legítimo, pertinente ao eixo e articulado com clareza ao tema. No campo "diagnostico", aponte os acertos e oportunidades de melhoria com acolhimento. No campo "reescrita", forneça uma versão clara, fluida e produtiva, acessível e natural. Retorne apenas no formato JSON estruturado do sistema: {"diagnostico": "...", "reescrita": "..."}`;

            navigator.clipboard.writeText(fullPrompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let feedbackHtml = `
                        <div style="margin-top: 2rem; background: var(--bg-color); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--panel-border);">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">Feedback de Repertório</h3>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color);">${resultObj.diagnostico || 'Sem diagnóstico.'}</p>
                            
                            <h4 style="color: var(--success); margin-top: 1.5rem; margin-bottom: 0.5rem;">Como usar corretamente:</h4>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color);">${resultObj.reescrita || 'Sem reescrita.'}</p>
                        </div>
                    `;

                    let feedbackContainer = document.getElementById('repertory-feedback');
                    if (!feedbackContainer) {
                        feedbackContainer = document.createElement('div');
                        feedbackContainer.id = 'repertory-feedback';
                        analyzeRepertoryBtn.parentNode.parentNode.appendChild(feedbackContainer);
                    }
                    feedbackContainer.innerHTML = feedbackHtml;
                };

                jsonPasteArea.value = '';
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }

    // Removed old grammar mode analysis logic that was conflicting with the Arena

    // ==========================================
    // LÓGICA DE TEMPORIZADORES E TUTOR
    // ==========================================

    // 1. Simulado Oficial (Modo Valendo)
    let simuladoTimerInterval = null;
    const btnFreeMode = document.getElementById('btn-free-mode');
    const btnTimerMode = document.getElementById('btn-timer-mode');
    const simuladoTimerDisplay = document.getElementById('simulado-timer-display');
    const btnStartSimulado = document.getElementById('btn-start-simulado');
    const modeToggleBar = document.querySelector('.mode-toggle');

    if (btnFreeMode && btnTimerMode) {
        btnFreeMode.addEventListener('click', () => {
            btnFreeMode.classList.add('active');
            btnFreeMode.style.background = 'var(--primary)';
            btnFreeMode.style.color = '#fff';

            btnTimerMode.classList.remove('active');
            btnTimerMode.style.background = 'transparent';
            btnTimerMode.style.color = 'var(--danger)';

            simuladoTimerDisplay.style.display = 'none';
            btnStartSimulado.style.display = 'none';

            clearInterval(simuladoTimerInterval);
            simuladoTimerDisplay.textContent = '01:30:00';
            essayInput.disabled = false;
            if (modeToggleBar) {
                modeToggleBar.style.pointerEvents = 'auto';
                modeToggleBar.style.opacity = '1';
            }
        });

        btnTimerMode.addEventListener('click', () => {
            btnTimerMode.classList.add('active');
            btnTimerMode.style.background = 'var(--danger)';
            btnTimerMode.style.color = '#fff';

            btnFreeMode.classList.remove('active');
            btnFreeMode.style.background = 'transparent';
            btnFreeMode.style.color = 'var(--primary)';

            simuladoTimerDisplay.style.display = 'block';
            btnStartSimulado.style.display = 'block';

            clearInterval(simuladoTimerInterval);
            simuladoTimerDisplay.textContent = '01:30:00';
            essayInput.disabled = true; // wait for start
            btnStartSimulado.textContent = 'Iniciar Simulado';
        });

        btnStartSimulado.addEventListener('click', () => {
            if (btnStartSimulado.textContent === 'Forçar Entrega') {
                clearInterval(simuladoTimerInterval);
                analyzeBtn.click();
                if (modeToggleBar) {
                    modeToggleBar.style.pointerEvents = 'auto';
                    modeToggleBar.style.opacity = '1';
                }
                return;
            }

            essayInput.disabled = false;
            essayInput.focus();
            if (modeToggleBar) {
                modeToggleBar.style.pointerEvents = 'none';
                modeToggleBar.style.opacity = '0.5';
            }
            btnStartSimulado.textContent = 'Forçar Entrega';

            let timeRemaining = 90 * 60; // 90 minutes
            simuladoTimerInterval = setInterval(() => {
                timeRemaining--;
                if (timeRemaining <= 0) {
                    clearInterval(simuladoTimerInterval);
                    simuladoTimerDisplay.textContent = '00:00:00';
                    alert('O tempo acabou! Sua redação será submetida automaticamente.');
                    if (modeToggleBar) {
                        modeToggleBar.style.pointerEvents = 'auto';
                        modeToggleBar.style.opacity = '1';
                    }
                    analyzeBtn.click();
                } else {
                    const h = Math.floor(timeRemaining / 3600).toString().padStart(2, '0');
                    const m = Math.floor((timeRemaining % 3600) / 60).toString().padStart(2, '0');
                    const s = (timeRemaining % 60).toString().padStart(2, '0');
                    simuladoTimerDisplay.textContent = `${h}:${m}:${s}`;
                }
            }, 1000);
        });
    }

    // 2. Cronômetro de Treino por Partes
    const btnStartPartTimer = document.getElementById('btn-start-part-timer');
    const currentPartTimeDisplay = document.getElementById('current-part-time');
    let partTimerInterval = null;

    if (btnStartPartTimer) {
        btnStartPartTimer.addEventListener('click', () => {
            clearInterval(partTimerInterval);
            currentPartTimeDisplay.style.color = 'var(--warning)';

            let duration = 20 * 60; // 20m default

            const pSelect = document.getElementById('tutorial-paragraph-select');
            if (!document.getElementById('training-tutorial-container').classList.contains('hidden') && pSelect) {
                if (pSelect.value === 'intro' || pSelect.value === 'conclusao') duration = 15 * 60;
                else duration = 20 * 60;
            }

            let timeRemaining = duration;
            btnStartPartTimer.textContent = 'Reiniciar Cronômetro';

            partTimerInterval = setInterval(() => {
                timeRemaining--;
                if (timeRemaining <= 0) {
                    clearInterval(partTimerInterval);
                    currentPartTimeDisplay.textContent = '00:00';
                    currentPartTimeDisplay.style.color = 'var(--danger)';
                    alert('Tempo sugerido esgotado. Tente finalizar em breve!');
                } else {
                    const m = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
                    const s = (timeRemaining % 60).toString().padStart(2, '0');
                    currentPartTimeDisplay.textContent = `${m}:${s}`;
                    if (timeRemaining < 60 * 5) { // last 5 minutes
                        currentPartTimeDisplay.style.color = 'var(--danger)';
                    }
                }
            }, 1000);
        });
    }

    // 3. Tutor Gramatical On-Demand
    const grammarTutorSubmit = document.getElementById('grammar-tutor-submit');
    const grammarTutorResponse = document.getElementById('grammar-tutor-response');
    if (grammarTutorSubmit) {
        grammarTutorSubmit.addEventListener('click', () => {
            const textarea = document.getElementById('grammar-tutor-textarea');
            const question = textarea.value.trim();
            if (!question) {
                alert("Digite a sua dúvida para o professor.");
                return;
            }

            const orientacaoBanca = currentBanca && currentBanca.orientacoes ? `\nOrientações da Banca: ${currentBanca.orientacoes}` : '';
            const fullPrompt = `INSTRUÇÃO CRÍTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nAja como o Prof. Daniel Lino. O aluno perguntou: "${question}". \nResponda sendo claro, didático, acolhedor e encorajador. Explique as regras da norma culta com precisão prática e sem pedantismo ou erudição artificial (lembre-se: o aluno precisa de clareza, fluidez e adequação aos critérios da banca, sem afetação vocabular). Leve em consideração que o aluno está treinando para a banca: ${currentBanca.nome}.${orientacaoBanca}\n\nSUA TAREFA:\nRetorne EXCLUSIVAMENTE um JSON neste formato:\n{\n  "resposta_html": "<p>Sua resposta formatada em tags HTML <strong>aqui</strong>.</p>"\n}`;

            const tutorPromptFinal = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\n${fullPrompt}`;
            navigator.clipboard.writeText(tutorPromptFinal).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);
                    const cleanHtml = resultObj.resposta_html || '';

                    grammarTutorResponse.innerHTML = `
                        <div class="training-card" style="border-left: 4px solid var(--primary); padding: 1.5rem; background: rgba(59, 130, 246, 0.05);">
                            <h4 style="color: var(--primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>
                                Resposta do Professor Lino
                            </h4>
                            <div style="color: var(--text-color); line-height: 1.6;">${cleanHtml}</div>
                        </div>
                    `;
                };

                jsonPasteArea.value = '';
                copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }

    // AVALIAÇÃO DE REPERTÓRIO
    const btnEvaluateRepertory = document.getElementById('btn-evaluate-repertory');
    if (btnEvaluateRepertory) {
        btnEvaluateRepertory.addEventListener('click', () => {
            const textarea = document.getElementById('repertory-practice-textarea');
            if (!textarea) return;
            const text = textarea.value.trim();
            const currentAxisTitleEl = document.getElementById('current-axis-title');
            const themeOrAxis = currentAxisTitleEl ? currentAxisTitleEl.textContent : 'Eixo não especificado';

            if (text.length < 10) {
                alert("Preencha o parágrafo de repertório com mais detalhes para analisarmos!");
                return;
            }

            const orientacaoBanca = currentBanca && currentBanca.orientacoes ? `\nOrientações da Banca: ${currentBanca.orientacoes}` : '';
            const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\nINSTRUÇÃO CRÍTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\n\n---\n\nAnalise o seguinte parágrafo de aplicação de repertório sociocultural.\nBanca Alvo: ${currentBanca.nome}${orientacaoBanca}\nEixo Temático: ${themeOrAxis}\nParágrafo de Repertório:\n${text}\n\nDIRETRIZ DE AVALIAÇÃO RAZOÁVEL E JUSTA:\nAvalie a estrutura, legitimidade, pertinência ao tema e produtividade argumentativa de forma justa e sem preciosismo vocabular. O aluno não precisa usar termos arcaicos ou palavras rebuscadas para pontuar bem. No campo "diagnostico", traga uma análise construtiva e acolhedora. No campo "reescrita", apresente uma sugestão clara, fluida e produtiva, acessível e natural para o estudante.\n\nRetorne EXCLUSIVAMENTE um JSON no formato:\n{"diagnostico": "seu texto", "reescrita": "seu texto"}`;

            navigator.clipboard.writeText(fullPrompt).then(() => {
                onCopiadorSubmit = (jsonStr) => {
                    const resultObj = JSON.parse(jsonStr);

                    let feedbackHtml = `
                        <div style="margin-top: 1rem; background: var(--bg-color); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--panel-border);">
                            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Feedback do Repertório</h4>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.diagnostico || 'Sem diagnóstico.'}</p>
                            
                            <h5 style="color: var(--success); margin-top: 1rem; margin-bottom: 0.5rem;">Reescrita Sugerida</h5>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">${resultObj.reescrita || 'Sem reescrita.'}</p>
                        </div>
                    `;

                    // Remove possible existing feedback before appending a new one
                    const existingFb = document.getElementById('repertory-feedback');
                    if (existingFb) existingFb.remove();

                    const feedbackContainer = document.createElement('div');
                    feedbackContainer.id = 'repertory-feedback';
                    feedbackContainer.innerHTML = feedbackHtml;
                    btnEvaluateRepertory.parentElement.appendChild(feedbackContainer);
                };

                const jsonPasteArea = document.getElementById('json-paste-area');
                if (jsonPasteArea) jsonPasteArea.value = '';
                const copiadorModal = document.getElementById('copiador-modal');
                if (copiadorModal) copiadorModal.classList.remove('hidden');
            }).catch(err => {
                console.error('Erro ao copiar', err);
                alert('Erro ao copiar o prompt.');
            });
        });
    }
    // ==========================================
    // LÓGICA DA ABA "MEU MODELO"
    // ==========================================
    const btnCopyModelPrompt = document.getElementById('btn-copy-model-prompt');
    const modelThemeInput = document.getElementById('model-theme-input');
    const modelJsonInput = document.getElementById('model-json-input');
    const btnAnalyzeModel = document.getElementById('btn-analyze-model');
    const modelAnalysisContainer = document.getElementById('model-analysis-container');
    const modelAnalyzedText = document.getElementById('model-analyzed-text');

    const skeletonIntro = document.getElementById('skeleton-intro');
    const skeletonD1 = document.getElementById('skeleton-d1');
    const skeletonD2 = document.getElementById('skeleton-d2');
    const skeletonConclusao = document.getElementById('skeleton-conclusao');

    if (btnCopyModelPrompt) {
        btnCopyModelPrompt.addEventListener('click', () => {
            const tema = modelThemeInput.value.trim();
            if (!tema) {
                alert("Por favor, digite um tema para o modelo.");
                return;
            }

            const regrasBancaTexto = `- Gênero exigido: ${currentBanca.generosPermitidos ? currentBanca.generosPermitidos[0] : 'dissertativo'}\n- Exigência de título: ${currentBanca.exigeTitulo ? 'SIM (Obrigatório)' : 'NÃO (Opcional ou Proibido)'}\n- Extensão: ${currentBanca.limiteLinhas ? currentBanca.limiteLinhas.min + ' a ' + currentBanca.limiteLinhas.max : '8 a 30'} linhas\n- Orientações da banca: ${currentBanca.orientacoes || currentBanca.resumoPratico || ''}`;

            const promptFinal = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\n\n${PROMPT_MEU_MODELO}`
                .replace("{TEMA}", tema)
                .replace("{BANCA}", currentBanca.nome)
                .replace("{REGRAS_BANCA}", regrasBancaTexto);

            navigator.clipboard.writeText(promptFinal).then(() => {
                const originalText = btnCopyModelPrompt.innerHTML;
                btnCopyModelPrompt.innerHTML = "<span>Copiado! Cole no Gemini e traga a resposta</span>";
                btnCopyModelPrompt.style.background = "var(--success)";
                btnCopyModelPrompt.style.borderColor = "var(--success)";
                btnCopyModelPrompt.style.color = "white";

                setTimeout(() => {
                    btnCopyModelPrompt.innerHTML = originalText;
                    btnCopyModelPrompt.style.background = "";
                    btnCopyModelPrompt.style.borderColor = "var(--primary)";
                    btnCopyModelPrompt.style.color = "var(--primary)";
                }, 4000);
            }).catch(err => {
                alert("Falha ao copiar: " + err);
            });
        });
    }

    if (btnAnalyzeModel) {
        btnAnalyzeModel.addEventListener('click', () => {
            const rawJson = modelJsonInput.value.trim();
            if (!rawJson) {
                alert("Cole o JSON retornado pelo Gemini antes de analisar.");
                return;
            }

            try {
                // Tenta extrair json caso venha com markdown ou texto sujo em volta
                let jsonStr = rawJson;
                const match = jsonStr.match(/\{[\s\S]*\}/);
                if (match) {
                    jsonStr = match[0];
                }

                const data = JSON.parse(jsonStr);

                if (!data.redacao || !data.destaques) {
                    throw new Error("O JSON não possui as propriedades 'redacao' ou 'destaques' exigidas.");
                }

                renderModelAnalysis(data.redacao, data.destaques);
                modelAnalysisContainer.classList.remove('hidden');

            } catch (e) {
                alert("Erro ao processar o JSON: " + e.message + "\n\nVerifique se copiou todo o código do Gemini corretamente.");
            }
        });
    }

    function renderModelAnalysis(redacao, destaques) {
        let highlightedText = redacao.replace(/\n/g, '<br><br>');

        // Limpar esqueletos
        skeletonIntro.innerHTML = '';
        skeletonD1.innerHTML = '';
        skeletonD2.innerHTML = '';
        skeletonConclusao.innerHTML = '';

        // Ordernar destaques por tamanho do termo (decrescente) para evitar highlights parciais
        const sortedDestaques = [...destaques].sort((a, b) => b.termo.length - a.termo.length);

        sortedDestaques.forEach((destaque, index) => {
            const className = `highlight-${destaque.tipo}`;
            const id = `model-hl-${index}`;

            // Fazer escape de RegExp
            const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Definir cores por tipo
            let bg = 'rgba(245, 158, 11, 0.2)'; // Laranja default
            let border = 'orange';
            if (destaque.tipo === 'conectivo') { bg = 'rgba(34, 197, 94, 0.2)'; border = 'green'; }
            else if (destaque.tipo === 'operador') { bg = 'rgba(59, 130, 246, 0.2)'; border = '#3b82f6'; }
            else if (destaque.tipo === 'generico') { bg = 'rgba(239, 68, 68, 0.2)'; border = 'red'; }

            // Substituir termo pelo termo com tag span
            const regex = new RegExp(`(${escapeRegExp(destaque.termo)})`, 'g');
            highlightedText = highlightedText.replace(regex, `<span id="${id}" class="${className}" style="background-color: ${bg}; cursor: pointer; border-bottom: 2px dashed ${border};" data-tipo="${destaque.tipo}" data-comp="${destaque.competencia}" data-uso="${destaque.uso}">$1</span>`);

            // Adicionar ao esqueleto correspondente
            const skeletonItem = document.createElement('span');
            skeletonItem.className = `skeleton-item ${destaque.tipo}`;
            skeletonItem.textContent = destaque.termo;
            skeletonItem.title = `${destaque.competencia}: ${destaque.uso}`;

            // Lógica simples de parágrafo
            if (destaque.paragrafo === 1) skeletonIntro.appendChild(skeletonItem);
            else if (destaque.paragrafo === 2) skeletonD1.appendChild(skeletonItem);
            else if (destaque.paragrafo === 3) skeletonD2.appendChild(skeletonItem);
            else if (destaque.paragrafo === 4 || destaque.paragrafo > 4) skeletonConclusao.appendChild(skeletonItem);
            else skeletonIntro.appendChild(skeletonItem); // fallback
        });

        modelAnalyzedText.innerHTML = highlightedText;

        // Adicionar eventos de hover para os tooltips na dissecação
        document.querySelectorAll('#model-analyzed-text span[class^="highlight-"]').forEach(span => {
            span.addEventListener('mouseenter', (e) => {
                const tipo = span.dataset.tipo;
                const comp = span.dataset.comp;
                const uso = span.dataset.uso;

                tooltipHeader.textContent = comp + " (" + tipo.charAt(0).toUpperCase() + tipo.slice(1) + ")";
                tooltipOriginal.textContent = span.textContent;
                tooltipSuggestion.textContent = "";
                tooltipSuggestion.parentElement.style.display = 'none';
                tooltipExplanation.textContent = uso;

                tooltipHeader.style.background = tipo === 'conectivo' ? 'var(--success)' : (tipo === 'generico' ? 'var(--warning)' : 'var(--primary)');
                tooltipHeader.style.color = tipo === 'generico' ? '#000' : '#fff';

                const rect = span.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
                tooltip.classList.add('visible');
            });

            span.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
                // Restaurar cor do header caso seja modificado por outra view
                tooltipHeader.style.background = 'var(--danger)';
                tooltipHeader.style.color = '#fff';
            });
        });

        // Verifica se algum esqueleto ficou vazio e preenche com aviso
        [skeletonIntro, skeletonD1, skeletonD2, skeletonConclusao].forEach(el => {
            if (el.innerHTML.trim() === '') {
                el.innerHTML = '<span style="color: var(--text-muted); font-style: italic;">Nenhum elemento mapeado.</span>';
            }
        });
    }

});








// ==========================================
// ==========================================
// DICIONÁRIO DE CONECTIVOS & GUIA DIDÁTICO 2.0
// ==========================================
const conectivosData = {
    adicao: ["Além disso", "Ademais", "Outrossim", "Por conseguinte", "Bem como", "Somado a isso", "Não só... mas também", "Outro ponto relevante", "Nesse mesmo sentido", "Adicione-se a isso que"],
    oposicao: ["Porém", "Contudo", "Todavia", "Entretanto", "No entanto", "Apesar disso", "Em contrapartida", "Sob outro prisma", "Não obstante", "Em sentido oposto"],
    causa: ["Por causa de", "Visto que", "Já que", "Uma vez que", "Dado que", "Haja vista", "Na medida em que", "Em virtude de", "Porquanto", "Decorrente de"],
    conclusao: ["Portanto", "Logo", "Sendo assim", "Dessa forma", "Nesse sentido", "Em suma", "Diante disso", "Infere-se, portanto,", "Por conseguinte", "Destarte", "Dessarte"],
    tempo: ["Enquanto", "Logo que", "Assim que", "Quando", "Desde que", "À medida que os anos passam", "No decorrer das últimas décadas", "Desde a promulgação da CF/88", "Simultaneamente", "Atualmente"],
    conformidade: ["Conforme", "Segundo", "Consoante", "De acordo com", "Em conformidade com", "Como preconiza", "Sob a ótica de", "Em consonância com"],
    condicao: ["Caso", "Se", "Desde que", "Contanto que", "A não ser que", "A menos que", "Sob a condição de que"],
    proporcao: ["À medida que", "À proporção que", "Ao passo que", "Quanto mais... tanto mais", "Quanto maior... maior"],
    finalidade: ["A fim de que", "A fim de", "Com o fito de", "Com o intuito de", "Para que", "Com o objetivo de", "De modo a garantir"],
    comparacao: ["Assim como", "Da mesma forma que", "Do mesmo modo que", "Tal qual", "Tanto quanto", "À semelhança de", "Analogamente a"],
    concessivos: ["Embora", "Conquanto", "Ainda que", "Mesmo que", "Posto que", "Malgrado", "A despeito de", "Não obstante", "Em que pese a"],
    asseverativos: ["Indubitavelmente", "Certamente", "Inegavelmente", "Decerto", "De fato", "Com efeito", "Sem dúvida", "É mister reconhecer que", "Efetivamente"],
    operadores: ["Nesse viés", "Sob essa ótica", "Nessa perspectiva", "A partir desse contexto", "Sob esse viés", "De maneira análoga", "Nesse cenário", "Nesse ínterim", "Sob esse prisma"],
    referencial: ["Este", "Esse", "Aquele", "O qual", "Cujo", "Onde", "No qual", "A que", "Tal", "Dessa forma", "O mesmo"],
    detalhamento: ["Isso ocorre porque", "Isso é evidenciado por", "Notadamente", "Principalmente", "Em especial", "A exemplo de", "Como é o caso de", "Na medida em que", "A saber"],
    opiniao_carta: ["Considero", "Creio", "Entendo", "Defendo", "Constato", "Observo", "Vejo", "Julgamos imperioso"],
    interlocucao_carta: ["Veja bem", "Note", "Entenda", "O(a) senhor(a) há de concordar", "Pensemos", "Caros editores", "Prezado leitor"],
    meus: []
};

const conectivosGuia = {
    adicao: {
        titulo: "Conectivos de Adição",
        tipo: "Conjunções Coordenativas Aditivas & Locuções",
        oQueE: "Unem orações, períodos ou parágrafos estabelecendo uma relação lógica de soma cumulativa de argumentos ou evidências que convergem para a mesma tese.",
        servePara: "Agregar um segundo argumento forte no Desenvolvimento 2 (somando ao D1) ou acrescentar um dado/desdobramento dentro do mesmo parágrafo sem quebrar a coerência.",
        comoUsar: "• Início de período: Ao iniciar com 'Além disso,', 'Ademais,', 'Outrossim,', a VÍRGULA É OBRIGATÓRIA logo após.\n• Intercalado no meio da oração: Deve ficar entre duas vírgulas (ex.: 'O poder público deve, ademais, ampliar a fiscalização.').\n• Correlação 'Não só... mas também': Exige paralelismo sintático estrito nas duas orações.",
        dicaBanca: "ENEM (C4): Exige conectivos interparágrafos expressos e diversificados. Não repita 'Além disso' no D2 e na Conclusão. UEMA e UFG: Valorizam termos como 'Outrossim' e 'Ademais' sem afetação artificial."
    },
    oposicao: {
        titulo: "Conectivos de Oposição (Adversidade)",
        tipo: "Conjunções Coordenativas Adversativas",
        oQueE: "Introduzem uma quebra de expectativa ou contraste entre duas ideias, atribuindo maior relevância argumentativa à oração que vem logo após o conector.",
        servePara: "Confrontar a teoria legal versus a realidade prática, desconstruir um contra-argumento ou demonstrar antíteses sociais e entraves históricos.",
        comoUsar: "• 'Mas': Exige vírgula ANTES, NUNCA DEPOIS (ex.: 'A lei existe, mas falta fiscalização.'). Não use 'Mas' para iniciar parágrafos.\n• 'Contudo', 'No entanto', 'Todavia', 'Entretanto': Podem iniciar período com vírgula após, ou vir deslocados após o verbo, entre vírgulas (ex.: 'A medida é boa; esbarra, contudo, na burocracia.').",
        dicaBanca: "UEMA, UFG e UNITINS adoram o confronto dialético teórico x prático bem articulado com conectores adversativos."
    },
    causa: {
        titulo: "Conectivos de Causa & Motivo",
        tipo: "Conjunções Subordinativas Causais",
        oQueE: "Introduzem a razão geradora, o motivo ou a raiz causadora de um determinado fato ou mazela social.",
        servePara: "Responder ao 'Por que esse problema acontece?' na argumentação, conectando os sintomas do tema às suas raízes históricas ou políticas.",
        comoUsar: "• 'Na medida em que': Expressa CAUSA (sinônimo de 'já que', 'porque'). Não confunda com 'À medida que' (proporção).\n• Oração causal anteposta: Pede vírgula obrigatória antes da principal (ex.: 'Visto que faltam verbas, os hospitais colapsam.').\n• 'Haja vista': É invariável (não flexione para 'hajam vistas').",
        dicaBanca: "Crucial para a Competência 3 do ENEM e Critério 3 da UEMA/UFG, pois a banca penaliza argumentações que só descrevem o problema sem apontar as causas."
    },
    conclusao: {
        titulo: "Conectivos de Conclusão & Fechamento",
        tipo: "Conjunções Coordenativas Conclusivas",
        oQueE: "Encerram uma cadeia dedutiva de raciocínio, amarrando a tese ou deduzindo a consequência final dos argumentos debatidos.",
        servePara: "Abrir o parágrafo de Conclusão ou arrematar criticamente o fechamento de cada parágrafo de desenvolvimento.",
        comoUsar: "• 'Portanto' inicial: Sempre acompanhado de vírgula imediata ('Portanto, cabe ao Estado agir.').\n• 'Pois' conclusivo: Só é conclusivo quando vem DESLOCADO após o verbo, entre vírgulas ('Cabe, pois, ao Ministério agir.'). Se vier antes do verbo, é causal!\n• 'Por conseguinte' e 'Dessa forma': Excelentes alternativas para evitar repetição.",
        dicaBanca: "No ENEM, marca a abertura da Proposta de Intervenção. Na UEMA e UFG, conduz a síntese reflexiva ou provocação crítica final."
    },
    tempo: {
        titulo: "Conectivos de Tempo (Temporais)",
        tipo: "Conjunções Subordinativas Temporais & Adjuntos",
        oQueE: "Localizam as orações e argumentos no tempo, expressando simultaneidade, anterioridade, posterioridade ou duração contínua dos fatos.",
        servePara: "Articular alusões históricas com a contemporaneidade (ex: 'Desde a colonização...', 'No século XXI...') ou demonstrar a dinâmica cronológica de um problema.",
        comoUsar: "• Adjunto adverbial de tempo deslocado (3 ou mais palavras): Vírgula OBRIGATÓRIA logo após (ex.: 'Desde a promulgação da Constituição de 1988, a igualdade...').\n• Oração temporal anteposta: Pede vírgula obrigatória (ex.: 'Enquanto o debate for silenciado, a violência persistirá.').",
        dicaBanca: "Indispensável na Introdução para fazer a transição da contextualização histórica para o problema do Brasil hodierno."
    },
    conformidade: {
        titulo: "Conectivos de Conformidade",
        tipo: "Conjunções Subordinativas Conformativas",
        oQueE: "Estabelecem correspondência e harmonia entre a reflexão do aluno e a autoridade de um filósofo, sociólogo, legislação ou instituição.",
        servePara: "Dar legitimidade e respaldo teórico ao repertório sociocultural (Citar CF/88, Bauman, Freire, Djamila Ribeiro, OMS, etc.).",
        comoUsar: "• NÃO use preposição 'a' com 'Segundo' e 'Conforme': Diga 'Segundo o sociólogo,' e NUNCA 'Segundo ao sociólogo'.\n• Oração conformativa intercalada ou anteposta: Pede vírgula obrigatória (ex.: 'Consoante preconiza a Constituição Cidadã, a saúde...').",
        dicaBanca: "Item essencial para obter nota 200 na C2 do ENEM e nota máxima em repertório na UEMA e UFG (produtividade legitimada)."
    },
    condicao: {
        titulo: "Conectivos de Condição (Condicionais)",
        tipo: "Conjunções Subordinativas Condicionais",
        oQueE: "Subordinam a realização da ideia principal à ocorrência ou cumprimento de uma hipótese ou pré-requisito.",
        servePara: "Construir advertências lógicas ('Se nada for feito...') ou condicionar a eficácia de uma política pública à adesão da comunidade.",
        comoUsar: "• Modo verbal: 'Caso' exige PRESENTE DO SUBJUNTIVO ('Caso o Estado intervenha...'). 'Se' pede FUTURO DO SUBJUNTIVO ('Se o Estado intervier...'). Nunca use infinitivo ('Caso intervir' é erro grave).\n• Oração condicional anteposta: Pede vírgula obrigatória antes da oração principal.",
        dicaBanca: "Confere altíssima maturidade argumentativa no fechamento de desenvolvimentos e no detalhamento de propostas."
    },
    proporcao: {
        titulo: "Conectivos de Proporção (Proporcionais)",
        tipo: "Conjunções Subordinativas Proporcionais",
        oQueE: "Expressam variação simultânea e gradual entre dois fenômenos que aumentam ou diminuem em paralelo.",
        servePara: "Demonstrar a gravidade progressiva de uma mazela social em consonância com a inércia do poder público ou avanço da tecnologia.",
        comoUsar: "• REGRA DE OURO: Use 'À MEDIDA QUE' (com crase, sem 'em'). JAMAIS use 'À medida em que' (essa forma não existe na norma culta!).\n• 'Na medida em que' é causal (= porque) e NÃO proporcional.\n• Outras opções corretas: 'Ao passo que', 'À proporção que', 'Quanto mais... tanto mais'.",
        dicaBanca: "O desvio 'à medida em que' é penalizado com rigor em C1 (ENEM), C5 (UEMA) e C1 (EXATO). Domine esta regra!"
    },
    finalidade: {
        titulo: "Conectivos de Finalidade",
        tipo: "Conjunções Subordinativas Finais & Locuções",
        oQueE: "Indicam o propósito, objetivo, intenção ou meta a ser alcançada por determinada medida ou posicionamento.",
        servePara: "Introduzir o Efeito/Finalidade na Proposta de Intervenção (ENEM e EXATO) ou dar propósito à tese na conclusão crítica (UEMA, UFG, UNITINS).",
        comoUsar: "• SEMPRE SEPARADO: Escreva 'A fim de' (com o objetivo de). 'Afim' junto é adjetivo para afinidade (ideias afins).\n• 'A fim de' + verbo no infinitivo (ex: 'a fim de combater o preconceito').\n• 'A fim de que' + verbo no subjuntivo (ex: 'a fim de que todos usufruam da cidadania').",
        dicaBanca: "No ENEM, garante o elemento 'Efeito/Finalidade' da C5. O erro gráfico 'afim de' desconta pontos na C1."
    },
    comparacao: {
        titulo: "Conectivos de Comparação (Comparativos)",
        tipo: "Conjunções Subordinativas Comparativas",
        oQueE: "Estabelecem um paralelo analógico ou contraste entre duas realidades, épocas históricas, obras literárias ou contextos sociais.",
        servePara: "Trazer analogias de livros, filmes ou distopias (ex: '1984', 'Vidas Secas', 'Admirável Mundo Novo') para confrontar com a realidade brasileira.",
        comoUsar: "• Oração comparativa anteposta: Sempre separada por vírgula da oração principal (ex.: 'Assim como em 1984, a vigilância algorítmica...').\n• Conectores recomendados: 'Assim como', 'À semelhança de', 'Do mesmo modo que', 'Da mesma forma que'.",
        dicaBanca: "Demonstra alto domínio de projeto de texto e autoria crítica (Competência 2 do ENEM e Critério 2 da UEMA/UFG)."
    },
    concessivos: {
        titulo: "Conectivos Concessivos (Concessão)",
        tipo: "Conjunções Subordinativas Concessivas",
        oQueE: "Introduzem uma objeção ou fato contrário que, apesar de verídico, NÃO possui força suficiente para anular a conclusão da oração principal.",
        servePara: "Admitir um aspecto da realidade para, em seguida, contra-argumentar com firmeza e elegância (recurso nobre de persuasão).",
        comoUsar: "• SUBJUNTIVO OBRIGATÓRIO: 'Conquanto', 'Embora', 'Ainda que' exigem subjuntivo (ex.: 'Conquanto existam leis, a prática...', e nunca 'existem').\n• Vírgula obrigatória separando a oração concessiva da principal.\n• 'Malgrado' e 'A despeito de' são locuções nobres muito valorizadas por bancas exigentes.",
        dicaBanca: "UEMA, UFG e UNITINS valorizam imensamente o uso de 'conquanto' e 'malgrado' por evidenciarem domínio sintático avançado."
    },
    asseverativos: {
        titulo: "Conectivos Asseverativos (Certeza & Ênfase)",
        tipo: "Modalizadores Argumentativos de Certeza",
        oQueE: "Operadores discursivos que expressam convicção categórica, certeza incontestável e autoria vigorosa em relação à tese defendida.",
        servePara: "Eliminar a hesitação ('talvez', 'pode ser que') e conferir firmeza e contundência crítica à argumentação.",
        comoUsar: "• Em início de período: Exigem vírgula obrigatória logo após ('Indubitavelmente, a omissão estatal...', 'Com efeito, a educação...').\n• Intercalados: Entre duas vírgulas ('Esse quadro resulta, inegavelmente, da inércia governamental.').",
        dicaBanca: "Elemento de ouro para demonstrar a 'marca de autoria' exigida na C3 do ENEM e nos critérios de consistência da UEMA e UFG."
    },
    operadores: {
        titulo: "Operadores Argumentativos de Perspectiva",
        tipo: "Articuladores Textuais Interparágrafos",
        oQueE: "Expressões que sinalizam a perspectiva, o ângulo ou o viés sociológico e reflexivo sob o qual o tema será desdobrado.",
        servePara: "Abrir o primeiro período dos parágrafos de Desenvolvimento (D1 e D2), conectando a Tese da introdução com o argumento.",
        comoUsar: "• Sempre seguidos de vírgula ao abrirem período ('Nesse viés,', 'Sob essa ótica,', 'Nessa perspectiva,', 'Sob esse prisma,').",
        dicaBanca: "Garante fluidez e progressão temática pontuadas na Competência 4 do ENEM e no Critério 4 da UEMA e UFG."
    },
    referencial: {
        titulo: "Coesão Referencial & Anafórica",
        tipo: "Pronomes Demonstrativos e Relativos",
        oQueE: "Mecanismos gramaticais que retomam ou antecipam elementos no texto, evitando repetições cansativas de substantivos.",
        servePara: "Garantir a progressão contínua das frases sem redundância de palavras-chave do tema.",
        comoUsar: "• 'Este/Esta': Retoma o termo mais próximo ou introduz o que ainda vai ser dito.\n• 'Esse/Essa': Retoma o termo anterior genérico.\n• ATENÇÃO: NÃO use 'o mesmo' para substituir pessoas (ex.: 'o aluno faltou e o mesmo reprovou' é ERRO grave!). Use 'este', 'ele' ou elipse.\n• 'Onde': Restrito a LUGAR FÍSICO. Para situações, use 'em que' ou 'no qual'.",
        dicaBanca: "O corretor busca ativamente erros com 'o mesmo' e 'onde'. Evitá-los garante os 200 pontos de C1/C4."
    },
    detalhamento: {
        titulo: "Conectivos de Detalhamento & Exemplificação",
        tipo: "Operadores Explicativos e Ilustrativos",
        oQueE: "Expressões que introduzem dados empíricos, casos da realidade, causas aprofundadas ou esclarecimentos pontuais.",
        servePara: "Materializar a argumentação com exemplos práticos após a formulação da tese abstrata.",
        comoUsar: "• Seguidos de vírgula ou isolados ('Notadamente,', 'A exemplo de,', 'Como é o caso de,', 'A saber,').",
        dicaBanca: "Aumenta a densidade argumentativa e evita textos puramente vagos ou abstratos."
    },
    opiniao_carta: {
        titulo: "Carta do Leitor: Verbos de Opinião",
        tipo: "Marcadores Discursivos de 1ª Pessoa",
        oQueE: "Verbos e locuções modais em primeira pessoa (singular ou plural) adequados para manifestar juízo de valor em Carta do Leitor.",
        servePara: "No gênero epistolar (EXATO Carta do Leitor), o autor manifesta seu posicionamento de forma direta, clara e fundamentada perante a sociedade.",
        comoUsar: "• Uso em 1ª pessoa: 'Considero', 'Entendo', 'Defendo', 'Constatamos'. Na dissertação tradicional, prefira a impessoalidade.",
        dicaBanca: "Específico para a prova de Carta do Leitor da EXATO (UFT/UFNT). Não utilize na dissertação do ENEM/UEMA!"
    },
    interlocucao_carta: {
        titulo: "Carta do Leitor: Interlocução com o Destinatário",
        tipo: "Marcadores de Diálogo e Apelo",
        oQueE: "Fórmulas dialógicas que convocam o destinatário (editores de revista, leitores, autoridades) a refletir ou agir em conjunto com o autor.",
        servePara: "Sustentar a situação comunicativa pública da Carta do Leitor (EXATO), garantindo diálogo respeitoso e persuasivo.",
        comoUsar: "• Vocativos com vírgula ('Prezados editores,', 'Senhor redator,'). Chamadas moderadas: 'Veja bem,', 'Note,', 'Pensemos conjuntamente,'.",
        dicaBanca: "Exigência indispensável no Critério 2 e 3 da Carta da EXATO (UFT/UFNT)."
    },
    meus: {
        titulo: "Meus Conectivos Personalizados",
        tipo: "Banco Pessoal do Estudante",
        oQueE: "Seu repertório coesivo pessoal gravado localmente no dispositivo para consulta e cópia rápida.",
        servePara: "Armazenar os conectivos coringas que você mais gosta de utilizar em seus treinos de redação.",
        comoUsar: "• Digite o novo conectivo no campo abaixo e clique em '+ Adicionar'.\n• Clique no conectivo para copiá-lo ou no '×' para excluí-lo.",
        dicaBanca: "Tenha de 4 a 6 conectivos de domínio absoluto para cada função antes do dia da sua prova."
    }
};

const conectivosExemplos = {
    "Além disso": "Além disso, a omissão estatal perpetua a marginalização das populações vulneráveis.",
    "Ademais": "Ademais, constata-se a ineficiência crônica dos órgãos fiscalizadores.",
    "Outrossim": "Outrossim, a ausência do debate pedagógico cristaliza preconceitos históricos.",
    "Porém": "A legislação assegura o direito, porém a prática cotidiana desmente a norma.",
    "Contudo": "Contudo, tal prerrogativa cidadã esbarra no descaso institucional.",
    "Todavia": "Todavia, o estigma social impede que os indivíduos busquem auxílio especializado.",
    "Entretanto": "Entretanto, a inércia legislativa aprofunda o abismo entre as classes.",
    "No entanto": "No entanto, as verbas públicas destinadas ao setor revelam-se escassas.",
    "Em contrapartida": "Em contrapartida, os projetos voluntários tentam suprir a carência de assistência básica.",
    "Visto que": "Visto que faltam investimentos primários, os serviços básicos colapsam.",
    "Já que": "Já que o preconceito é enraizado, faz-se imperiosa uma reeducação coletiva.",
    "Uma vez que": "Uma vez que a escola não debate o tema, a desinformação se dissemina com facilidade.",
    "Na medida em que": "Na medida em que a discriminação é tolerada, rompem-se os laços de coesão social.",
    "Haja vista": "Haja vista a carência de profissionais capacitados, as filas de espera aumentam.",
    "Em virtude de": "Em virtude da desigualdade regional, certas comarcas permanecem desassistidas.",
    "Porquanto": "O plano falhou, porquanto a execução foi desprovida de rigor técnico.",
    "Portanto": "Portanto, cabe ao Ministério da Educação formular diretrizes inclusivas com urgência.",
    "Logo": "Logo, a passividade cidadã não pode ser aceita como normalidade social.",
    "Dessa forma": "Dessa forma, consolida-se um ambiente favorável ao desenvolvimento humano sustentável.",
    "Nesse sentido": "Nesse sentido, a mobilização popular configura elemento chave para a transformação.",
    "Infere-se, portanto,": "Infere-se, portanto, que a apatia coletiva legitima a violência urbana.",
    "Por conseguinte": "Por conseguinte, milhares de famílias permanecem à margem da cidadania plena.",
    "Destarte": "Destarte, a superação desse impasse exige articulação entre os Três Poderes.",
    "Dessarte": "Dessarte, a saúde preventiva deve assumir papel central nas políticas públicas.",
    "Desde a promulgação da CF/88": "Desde a promulgação da Constituição de 1988, a igualdade é direito inalienável de todos.",
    "Enquanto": "Enquanto persistir o silenciamento das vítimas, a impunidade reinará no tecido social.",
    "Logo que": "Logo que as denúncias ganham notoriedade, o debate público avança.",
    "Assim que": "Assim que os recursos forem repassados, as reformas estruturais deverão ter início.",
    "No decorrer das últimas décadas": "No decorrer das últimas décadas, os avanços democráticos foram constantemente desafiados.",
    "Conforme": "Conforme preconiza a Carta Magna, a dignidade da pessoa humana é princípio basilar.",
    "Consoante": "Consoante adverte Zygmunt Bauman, a modernidade líquida corrói os laços de solidariedade comunitária.",
    "Segundo": "Segundo o pensamento freireano, a educação constitui ferramenta essencial de emancipação cidadã.",
    "De acordo com": "De acordo com dados oficiais do Ipea, a renda média dos grupos minoritários recuou.",
    "Em conformidade com": "Em conformidade com o Estatuto da Criança e do Adolescente, a proteção integral é prioridade absoluta.",
    "Caso": "Caso o poder público não intervenha com urgência, o abismo social continuará a se expandir.",
    "Se": "Se a sociedade civil não se mobilizar ativamente, os direitos duramente conquistados retrocederão.",
    "Contanto que": "Contanto que haja fiscalização austera, os índices de degradação ambiental recuarão.",
    "Desde que": "Desde que haja sinergia interinstitucional, a erradicação da fome torna-se viável.",
    "À medida que": "À medida que a tecnologia avança sem regulação ética, novos perigos existenciais emergem.",
    "Ao passo que": "Ao passo que o consumo desenfreado cresce, os recursos naturais tornam-se escassos.",
    "À proporção que": "À proporção que a escolaridade sobe, reduzem-se os índices de criminalidade violenta.",
    "A fim de": "A fim de mitigar tais disparidades, cabe ao poder público instituir incentivos fiscais.",
    "A fim de que": "A fim de que as futuras gerações desfrutem de dignidade, intervenções urgentes devem ser coordenadas.",
    "Com o fito de": "Com o fito de garantir o pleno acesso à justiça, defensorias devem ser ampliadas no interior.",
    "Com o intuito de": "Com o intuito de democratizar a leitura, bibliotecas itinerantes foram criadas.",
    "Assim como": "Assim como na obra 'Vidas Secas', a privação da voz condena o cidadão à invisibilidade.",
    "À semelhança de": "À semelhança da distopia de George Orwell, a privacidade dos indivíduos é constantemente violada.",
    "Do mesmo modo que": "Do mesmo modo que nos países desenvolvidos, o Brasil necessita valorizar a pesquisa de ponta.",
    "Conquanto": "Conquanto a legislação seja moderna, sua efetivação prática esbarra em barreiras culturais arcaicas.",
    "Malgrado": "Malgrado os esforços do terceiro setor, a erradicação do problema exige uma firme política de Estado.",
    "A despeito de": "A despeito das garantias legais existentes, a intolerância velada segue fazendo vítimas diárias.",
    "Não obstante": "Não obstante as promessas de campanha, a infraestrutura dos bairros periféricos permanece precária.",
    "Indubitavelmente": "Indubitavelmente, a omissão governamental é o principal vetor gerador dessa crise social.",
    "Com efeito": "Com efeito, o investimento maciço em ciência básica é a única via para a soberania nacional.",
    "De fato": "De fato, a negligência estrutural aprofunda a desigualdade de oportunidades entre os jovens.",
    "Certamente": "Certamente, a indiferença coletiva funciona como combustível para a continuidade do preconceito.",
    "Nesse viés": "Nesse viés, cabe analisar como a herança colonial moldou as disparidades contemporâneas.",
    "Sob essa ótica": "Sob essa ótica, a falta de saneamento básico não é mero descuido, mas violação de direitos humanos.",
    "Nessa perspectiva": "Nessa perspectiva, a literatura engajada atua como denúncia das mazelas silenciosas.",
    "Este": "Aprovou-se o projeto de lei, e este estabelece penalidades mais severas aos infratores.",
    "Notadamente": "Diversas regiões sofrem com o abandono, notadamente as periferias dos grandes centros urbanos.",
    "Principalmente": "A evasão atinge os mais vulneráveis, principalmente jovens do ensino médio noturno.",
    "Considero": "Considero inadmissível a passividade das autoridades diante de denúncias tão contundentes.",
    "Defendo": "Defendo que a revisão tributária deve priorizar a desoneração dos itens da cesta básica.",
    "Veja bem": "Veja bem, caro editor: não se trata de privilégio corporativo, mas do cumprimento estrito da lei.",
    "Note": "Note que a matéria veiculada desconsiderou a realidade geográfica dos moradores ribeirinhos."
};

document.addEventListener('DOMContentLoaded', () => {
    // Carregar Meus Conectivos
    const savedMeus = JSON.parse(localStorage.getItem('redacao_meus_conectivos') || '[]');
    conectivosData.meus = savedMeus;

    const btnOpenConn = document.getElementById('btn-open-connectives');
    const btnCloseConn = document.getElementById('btn-close-connectives');
    const widgetConn = document.getElementById('connectives-widget');
    const listConn = document.getElementById('connectives-list');
    const guidePanel = document.getElementById('connectives-guide-panel');
    const searchInput = document.getElementById('conn-search-input');
    const catBtns = document.querySelectorAll('.conn-cat-btn');
    
    const addCustomArea = document.getElementById('add-custom-conn-area');
    const customConnInput = document.getElementById('custom-conn-input');
    const btnAddCustomConn = document.getElementById('btn-add-custom-conn');

    let currentActiveCategory = 'adicao';

    function renderConnectivesGuide(cat) {
        if (!guidePanel) return;
        const g = conectivosGuia[cat];
        if (!g) {
            guidePanel.style.display = 'none';
            return;
        }

        guidePanel.style.display = 'flex';
        guidePanel.innerHTML = `
            <div class="conn-guide-header">
                <h5 class="conn-guide-title">📘 ${g.titulo}</h5>
                <span class="conn-guide-badge">${g.tipo || 'Operador Coesivo'}</span>
            </div>
            <div class="conn-guide-block">
                <span class="conn-guide-label">🔍 O que é:</span>
                <p class="conn-guide-text">${g.oQueE}</p>
            </div>
            <div class="conn-guide-block">
                <span class="conn-guide-label">🎯 Para que serve na redação:</span>
                <p class="conn-guide-text">${g.servePara}</p>
            </div>
            <div class="conn-guide-block">
                <span class="conn-guide-label">✍️ Como usar de maneira gramaticalmente certa (Regras & Pontuação):</span>
                <p class="conn-guide-text">${g.comoUsar}</p>
            </div>
            <div class="conn-guide-bancas">
                <span class="conn-guide-label">🏛️ Aplicação nas Bancas (ENEM, UEMA, UFG, UNITINS, EXATO):</span>
                <p class="conn-guide-text">${g.dicaBanca}</p>
            </div>
        `;
    }

    function renderConnectives(cat, filterQuery = '') {
        if (!listConn) return;
        listConn.innerHTML = '';
        currentActiveCategory = cat;

        // Renderiza o Guia Didático da categoria ativa
        if (!filterQuery) {
            renderConnectivesGuide(cat);
        } else if (guidePanel) {
            guidePanel.style.display = 'none';
        }
        
        if (cat === 'meus' && !filterQuery) {
            if (addCustomArea) addCustomArea.classList.remove('hidden');
        } else {
            if (addCustomArea) addCustomArea.classList.add('hidden');
        }

        let wordsToRender = [];
        const query = (filterQuery || '').trim().toLowerCase();

        if (query) {
            // Busca global em todas as categorias
            Object.keys(conectivosData).forEach(c => {
                (conectivosData[c] || []).forEach(w => {
                    const ex = (conectivosExemplos[w] || '').toLowerCase();
                    if (w.toLowerCase().includes(query) || ex.includes(query) || c.includes(query)) {
                        if (!wordsToRender.some(item => item.word === w)) {
                            wordsToRender.push({ word: w, cat: c });
                        }
                    }
                });
            });
        } else {
            const data = conectivosData[cat] || [];
            wordsToRender = data.map(w => ({ word: w, cat }));
        }

        if (wordsToRender.length === 0) {
            listConn.innerHTML = `<p style="color: #94a3b8; font-size: 0.88rem; padding: 18px; text-align: center; background: #141e30; border-radius: 8px; border: 1px dashed #334155;">${
                query ? `Nenhum conectivo encontrado para "${filterQuery}". Tente outro termo ou categoria.` : 'Nenhum conectivo cadastrado nesta categoria ainda.'
            }</p>`;
            return;
        }

        wordsToRender.forEach(({ word, cat: wordCat }) => {
            const card = document.createElement('div');
            card.className = 'conn-item-card';
            card.title = 'Clique para copiar ou adicionar ao Construtor Livre';

            const top = document.createElement('div');
            top.className = 'conn-item-top';

            const term = document.createElement('span');
            term.className = 'conn-item-term';
            term.textContent = word;

            const actions = document.createElement('div');
            actions.className = 'conn-item-actions';

            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'conn-action-btn';
            copyBtn.textContent = 'Copiar 📋';

            actions.appendChild(copyBtn);

            // Botão de deletar para customizados
            if (wordCat === 'meus') {
                const delBtn = document.createElement('button');
                delBtn.type = 'button';
                delBtn.className = 'conn-action-btn';
                delBtn.textContent = 'Excluir ×';
                delBtn.style.color = 'var(--danger)';
                delBtn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                delBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm(`Remover o conectivo "${word}" dos seus favoritos?`)) {
                        conectivosData.meus = conectivosData.meus.filter(w => w !== word);
                        localStorage.setItem('redacao_meus_conectivos', JSON.stringify(conectivosData.meus));
                        renderConnectives('meus');
                    }
                };
                actions.appendChild(delBtn);
            }

            top.appendChild(term);
            top.appendChild(actions);
            card.appendChild(top);

            // Adiciona exemplo se disponível
            const exampleText = conectivosExemplos[word];
            if (exampleText) {
                const exDiv = document.createElement('div');
                exDiv.className = 'conn-item-example';
                // Destaca o conectivo em negrito no exemplo
                const highlighted = exampleText.replace(new RegExp(`(${word})`, 'i'), '<strong>$1</strong>');
                exDiv.innerHTML = `"${highlighted}"`;
                card.appendChild(exDiv);
            }

            const triggerAction = () => {
                const modelView = document.getElementById('model-view');
                if (modelView && !modelView.classList.contains('hidden')) {
                    // ADICIONAR AO CONSTRUTOR LIVRE usando a factory function
                    const ba = document.getElementById('free-builder-area');
                    if (ba && typeof createConnPiece === 'function') {
                        ba.appendChild(createConnPiece(word));
                        saveBuilderState();
                        copyBtn.textContent = '✓ Adicionado!';
                        copyBtn.style.background = 'var(--success)';
                        copyBtn.style.color = '#fff';
                        setTimeout(() => {
                            copyBtn.textContent = 'Copiar 📋';
                            copyBtn.style.background = '';
                            copyBtn.style.color = '';
                        }, 1200);
                        return;
                    }
                }

                // COPIAR (default)
                navigator.clipboard.writeText(word);
                copyBtn.textContent = 'Copiado! ✓';
                copyBtn.style.background = 'var(--success)';
                copyBtn.style.color = '#fff';
                setTimeout(() => {
                    copyBtn.textContent = 'Copiar 📋';
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 1400);
            };

            card.onclick = triggerAction;
            listConn.appendChild(card);
        });
    }

    if (btnAddCustomConn && customConnInput) {
        btnAddCustomConn.addEventListener('click', () => {
            const val = customConnInput.value.trim();
            if (val) {
                if (!conectivosData.meus.includes(val)) {
                    conectivosData.meus.push(val);
                    localStorage.setItem('redacao_meus_conectivos', JSON.stringify(conectivosData.meus));
                }
                customConnInput.value = '';
                renderConnectives('meus');
            }
        });
        customConnInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                btnAddCustomConn.click();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = /** @type {HTMLInputElement} */ (e.target).value;
            renderConnectives(currentActiveCategory, val);
        });
    }

    if (btnOpenConn && widgetConn) {
        btnOpenConn.addEventListener('click', () => {
            widgetConn.classList.toggle('hidden');
            if (!widgetConn.classList.contains('hidden')) {
                const active = document.querySelector('.conn-cat-btn.active');
                const cat = active ? active.getAttribute('data-cat') || 'adicao' : 'adicao';
                renderConnectives(cat);
            }
        });
        if (btnCloseConn) {
            btnCloseConn.addEventListener('click', () => {
                widgetConn.classList.add('hidden');
            });
        }

        catBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                catBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (searchInput) searchInput.value = '';
                const cat = btn.getAttribute('data-cat') || 'adicao';
                renderConnectives(cat);
            });
        });
    }

    // Inicialização das Pílulas de Densidade Gramatical (View de Treino)
    const ruleTabs = document.querySelectorAll('.grammar-rule-tab');
    const ruleContent = document.getElementById('grammar-rule-content');
    const grammarRulesData = {
        virgula: `<strong>📌 Regra da Vírgula com Conectivos:</strong><br>
1. Conectivo iniciando período ('Além disso,', 'Portanto,', 'Contudo,') pede vírgula OBRIGATÓRIA logo após.<br>
2. Conectivo intercalado no meio da oração ('O Estado deve, ademais, ampliar...') fica OBRIGATORIAMENTE entre duas vírgulas.<br>
3. A conjunção 'mas' leva vírgula ANTES, NUNCA DEPOIS ('..., mas a realidade...').<br>
4. 'Pois' conclusivo deve vir deslocado após o verbo entre duas vírgulas ('Cabe, pois, ao Ministério agir.').`,
        crase: `<strong>📌 A Regra de Ouro da Crase:</strong><br>
1. Método do 'AO': Troque a palavra feminina seguinte por uma masculina equivalente. Se der 'AO', a crase é OBRIGATÓRIA (ex.: 'Favorável à lei' → 'Favorável ao projeto').<br>
2. Método 'Volto da / Volto de': Vou a, volto da = crase há! Vou a, volto de = crase pra quê? (ex.: 'Vou à Bahia / Volto da Bahia'; 'Vou a Roma / Volto de Roma').<br>
3. Crase PROIBIDA: antes de verbos ('a partir de', 'a combater'), antes de palavras masculinas ('a prazo', 'a pé') e antes de pronomes de tratamento e indefinidos.`,
        proporcao: `<strong>📌 Proporção vs Causa (O Maior Erro da Redação):</strong><br>
1. 'À MEDIDA QUE': Proporção gradual e simultânea (com crase e sem 'em'). Ex.: 'À medida que a tecnologia avança, novos dilemas surgem.'<br>
2. 'NA MEDIDA EM QUE': Causa e motivo (= já que, porque). Ex.: 'A medida fracassou, na medida em que faltaram recursos.'<br>
3. PROIBIDO: 'À medida em que' é erro gramatical grave que resulta em desconto severo nas bancas!`,
        regencia: `<strong>📌 Regência dos Verbos Nobres da Redação:</strong><br>
1. IMPLICAR: É Transitivo Direto (sem 'em'). O correto é 'A crise implica graves consequências' (e nunca 'implica em').<br>
2. VISAR (almejar): É Transitivo Indireto com 'a'. O correto é 'visar ao bem-estar coletivo' (visa + a).<br>
3. PREFERIR: Rege preposição 'a'. O correto é 'preferem as redes sociais a ler livros' (e nunca 'do que ler').<br>
4. OBEDECER: Exige preposição 'a' ('obedecer às leis', 'obedecer aos princípios').`,
        paralelismo: `<strong>📌 Paralelismo Sintático Obrigatório:</strong><br>
1. Conectivos duplos correlativos ('não só... mas também', 'tanto... quanto') exigem a mesma classe morfológica dos dois lados.<br>
• Certo: 'A escola deve não só acolher os jovens, mas também estimular a cidadania.' (verbo + verbo).<br>
• Errado: 'A escola deve não só o acolhimento, mas também estimular a cidadania.' (substantivo + verbo quebra o paralelismo).<br>
2. Artigos em enumerações: Se colocar artigo no primeiro termo, coloque em todos ('o respeito, a empatia e a solidariedade').`,
        referencial: `<strong>📌 Coesão Referencial Limpa (Sem 'O Mesmo'):</strong><br>
1. Banimento do 'o mesmo': Nunca use 'o mesmo' para substituir pessoas. 'O réu foi preso e o mesmo confessou' é erro gramatical condenado pelo ENEM e UEMA. Troque por 'e este confessou' ou 'o qual confessou'.<br>
2. 'Onde': Só pode ser usado para LUGAR FÍSICO real ('a cidade onde resido'). Para conceitos abstratos ou leis, use 'em que', 'no qual' ou 'contexto no qual'.<br>
3. 'Este' vs 'Esse': 'Este' refere-se ao termo imediatamente anterior ou ao tempo presente; 'Esse' retoma termo já citado no período anterior.`
    };

    if (ruleTabs && ruleContent) {
        ruleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                ruleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const key = tab.getAttribute('data-rule');
                if (key && grammarRulesData[key]) {
                    ruleContent.innerHTML = grammarRulesData[key];
                }
            });
        });
    }

    // ==========================================
    // CONSTRUTOR LIVRE (MEU MODELO) - DRAG & DROP
    // ==========================================
    const builderArea = document.getElementById('free-builder-area');
    const btnClearBuilder = document.getElementById('btn-clear-builder');
    const btnExportBuilder = document.getElementById('btn-export-builder');
    const btnAddTextPiece = document.getElementById('btn-add-text-piece');
    const STORAGE_KEY = 'redacao_free_builder_content_v2';

    function saveBuilderState() {
        if (!builderArea) return;
        // Serialize textarea values into data attributes before saving
        builderArea.querySelectorAll('textarea').forEach(ta => {
            ta.setAttribute('data-value', ta.value);
        });
        localStorage.setItem(STORAGE_KEY, builderArea.innerHTML);
    }

    function restoreTextareas() {
        if (!builderArea) return;
        builderArea.querySelectorAll('textarea[data-value]').forEach(ta => {
            ta.value = ta.getAttribute('data-value') || '';
            ta.addEventListener('input', saveBuilderState);
            // Auto-resize on restore
            setTimeout(() => {
                ta.style.height = 'auto';
                ta.style.height = ta.scrollHeight + 'px';
            }, 0);
        });
    }

    function createDeleteBtn(pieceEl) {
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.title = 'Remover bloco';
        closeBtn.style.cssText = 'background:none; border:none; cursor:pointer; color:#e53e3e; font-size:1rem; padding:0 4px; line-height:1; flex-shrink:0; font-weight:bold;';
        closeBtn.onclick = () => { pieceEl.remove(); saveBuilderState(); };
        return closeBtn;
    }

    // Conectivo: chip colorido ocupando a largura total
    function createConnPiece(word) {
        const piece = document.createElement('div');
        piece.className = 'builder-piece conn-piece';
        piece.style.cssText = 'display:flex; align-items:center; width:auto; flex-shrink:0; background:rgba(79,70,229,0.08); border-left:4px solid #4f46e5; border-radius:4px; padding:6px 12px; color:#3b3b9a; font-weight:600; font-size:0.95rem; box-sizing:border-box; cursor:grab; gap:8px;';
        const grip = document.createElement('span');
        grip.innerHTML = '&#8942;&#8942;';
        grip.style.cssText = 'color:#a5b4fc; font-size:0.75rem; letter-spacing:-4px; flex-shrink:0;';
        const label = document.createElement('span');
        label.style.flex = '1';
        label.innerText = word;
        piece.appendChild(grip);
        piece.appendChild(label);
        piece.appendChild(createDeleteBtn(piece));
        return piece;
    }

    // Texto livre: textarea completo, estilo folha de redacao
    function createTextPiece(initialText) {
        const piece = document.createElement('div');
        piece.className = 'builder-piece text-piece';
        piece.style.cssText = 'display:flex; align-items:flex-start; flex: 0 0 auto; max-width: 100%; gap:8px; padding:4px 0; box-sizing:border-box; cursor:grab;';

        const grip = document.createElement('span');
        grip.innerHTML = '&#8942;&#8942;';
        grip.title = 'Arrastar para reordenar';
        grip.style.cssText = 'color:#aaa; font-size:0.75rem; letter-spacing:-4px; cursor:grab; flex-shrink:0; padding-top:8px; user-select:none;';

        const ta = document.createElement('textarea');
        ta.placeholder = 'Escreva aqui seu trecho, argumento ou parágrafo...';
        ta.value = initialText || '';
        ta.style.cssText = 'resize:both; width: 300px; max-width: 100%; min-width: 100px; min-height:2rem; background:transparent; border:none; border-bottom:1px solid #e2e8f0; outline:none; font-family:Georgia,serif; font-size:1rem; color:#111; line-height:2rem; padding:0; overflow:hidden;';
        // Auto-expand
        const autoResize = () => {
            ta.style.height = 'auto';
            ta.style.height = (ta.scrollHeight) + 'px';
        };
        ta.addEventListener('input', () => { autoResize(); saveBuilderState(); });
        ta.addEventListener('focus', autoResize);
        setTimeout(autoResize, 0);

        piece.appendChild(grip);
        piece.appendChild(ta);
        piece.appendChild(createDeleteBtn(piece));
        return piece;
    }

    function initSortable() {
        if (builderArea && window.Sortable) {
            new Sortable(builderArea, {
                animation: 150,
                handle: '.builder-piece',
                filter: 'textarea, button',
                preventOnFilter: false,
                ghostClass: 'sortable-ghost',
                onEnd: () => saveBuilderState()
            });
        }
    }

    if (builderArea) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            builderArea.innerHTML = saved;
            restoreTextareas();
        }

        // EVENT DELEGATION: captura qualquer clique de delete — span ou button, formato antigo ou novo
        builderArea.addEventListener('click', (e) => {
            const el = e.target;
            const text = (el.innerText || el.textContent || '').trim();
            const isDeleteTrigger =
                (el.tagName === 'BUTTON' && (text === '×' || el.innerHTML.includes('&times;'))) ||
                (el.tagName === 'SPAN' && (text === '×' || text === ' ×' || text === '×'));
            if (isDeleteTrigger) {
                const piece = el.closest('.builder-piece');
                if (piece) { piece.remove(); saveBuilderState(); }
            }
        });
        
        initSortable();

        if (btnAddTextPiece) {
            btnAddTextPiece.addEventListener('click', () => {
                const piece = createTextPiece('');
                builderArea.appendChild(piece);
                piece.querySelector('textarea')?.focus();
                saveBuilderState();
            });
        }

        if (btnClearBuilder) {
            btnClearBuilder.addEventListener('click', () => {
                if (confirm('Limpar toda a folha do construtor?')) {
                    builderArea.innerHTML = '';
                    saveBuilderState();
                }
            });
        }

        if (btnExportBuilder) {
            btnExportBuilder.addEventListener('click', () => {
                let paragraphs = [];
                Array.from(builderArea.children).forEach(child => {
                    if (child.classList.contains('conn-piece')) {
                        // Chip de conectivo: pega o texto do label
                        const label = child.querySelector('span:not([style*="letter-spacing"])');
                        const text = label ? label.innerText.trim() : '';
                        if (text) paragraphs.push(text);
                    } else if (child.classList.contains('text-piece')) {
                        // Bloco de texto livre: pega o textarea
                        const ta = child.querySelector('textarea');
                        const text = ta ? ta.value.trim() : '';
                        if (text) paragraphs.push(text);
                    }
                });

                const finalStr = paragraphs.join(' ');
                if (!finalStr) { alert('Adicione alguns blocos antes de exportar!'); return; }

                const essay = document.getElementById('essay');
                if (essay) {
                    essay.value = (essay.value ? essay.value + '\n\n' : '') + finalStr;
                    essay.dispatchEvent(new Event('input'));
                    alert('Estrutura exportada para a Folha de Redação! ✅');
                    document.getElementById('btn-mode-full')?.click();
                }
            });
        }
    }
});




// ==========================================
// MONTAR REDAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnMontar = document.getElementById('btn-montar-redacao');
    if (btnMontar) {
        btnMontar.addEventListener('click', () => {
            const t1 = document.getElementById('textarea-part-1')?.value.trim() || '';
            const t2 = document.getElementById('textarea-part-2')?.value.trim() || '';
            const t3 = document.getElementById('textarea-part-3')?.value.trim() || '';
            const t4 = document.getElementById('textarea-part-4')?.value.trim() || '';

            const redacao = [t1, t2, t3, t4].filter(t => t.length > 0).join('\n\n');
            if (!redacao) {
                alert("Você precisa escrever as partes primeiro!");
                return;
            }

            const mainTextarea = document.getElementById('essay');
            if (mainTextarea) {
                mainTextarea.value = redacao;
                // Dispara o evento de input para atualizar contadores
                mainTextarea.dispatchEvent(new Event('input'));

                // Muda pra aba 1
                document.getElementById('btn-mode-full')?.click();
            }
        });
    }
});


// ==========================================
// MEU REPERTÓRIO CUSTOMIZADO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnAddRep = document.getElementById('btn-add-custom-rep');
    if (btnAddRep) {
        btnAddRep.addEventListener('click', () => {
            const titulo = prompt("Título/Obra do Repertório:");
            if (!titulo) return;
            const autor = prompt("Autor/Diretor/Pensador:");
            const resumo = prompt("Resumo breve:");

            const novoRep = {
                id: "custom_" + Date.now(),
                obra: titulo,
                autor: autor || "Desconhecido",
                descricao: resumo || "",
                tags: ["Meu Repertório"]
            };

            let customReps = JSON.parse(localStorage.getItem('redacao_custom_reps') || '[]');
            customReps.push(novoRep);
            localStorage.setItem('redacao_custom_reps', JSON.stringify(customReps));

            // Adiciona aos favoritos automaticamente
            let favs = JSON.parse(localStorage.getItem('redacao_favorites') || '[]');
            if (!favs.includes(novoRep.id)) {
                favs.push(novoRep.id);
                localStorage.setItem('redacao_favorites', JSON.stringify(favs));
            }

            alert("Repertório salvo com sucesso e adicionado aos favoritos! Atualize a página para ver.");
        });
    }
});


// ==========================================
// RECORDES MODO TURBO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const turboTimerDisplay = document.getElementById('turbo-timer-display');
    if (turboTimerDisplay) {
        // Encontrar o botão turbo e colocar um span de recorde nele
        const btnTurbo = document.getElementById('btn-turbo-mode');
        if (btnTurbo) {
            const recorde = localStorage.getItem('redacao_turbo_record') || 0;
            const recSpan = document.createElement('div');
            recSpan.id = 'turbo-record-display';
            recSpan.style.fontSize = '0.75rem';
            recSpan.style.marginTop = '2px';
            recSpan.innerText = `Recorde: ${recorde} acertos`;
            btnTurbo.parentNode.insertBefore(recSpan, btnTurbo.nextSibling);
        }
    }
});

// A lógica de salvar hackeando via observe
setInterval(() => {
    const recSpan = document.getElementById('turbo-record-display');
    const scoreEl = document.getElementById('drill-score');
    const timerCont = document.getElementById('turbo-timer-container');
    if (recSpan && scoreEl && timerCont && !timerCont.classList.contains('hidden')) {
        let currentScore = parseInt(scoreEl.innerText || '0');
        let recorde = parseInt(localStorage.getItem('redacao_turbo_record') || '0');
        if (currentScore > recorde) {
            localStorage.setItem('redacao_turbo_record', currentScore);
            recSpan.innerText = `Recorde: ${currentScore} acertos`;
            recSpan.style.color = 'var(--success)';
        }
    }
}, 1000);


// ==========================================
// SALVAR MOLDES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnSaveModel = document.getElementById('btn-save-model');
    if (btnSaveModel) {
        btnSaveModel.addEventListener('click', () => {
            const textEl = document.getElementById('model-analyzed-text');
            const blankEl = document.getElementById('model-blank-text');
            if (!textEl || !textEl.innerHTML.trim() || !blankEl || !blankEl.innerHTML.trim()) {
                alert("Analise um texto primeiro para gerar o molde.");
                return;
            }

            const tema = document.getElementById('model-theme-input')?.value || 'Tema Desconhecido';
            const nome = prompt("Dê um nome para este molde:", tema);
            if (!nome) return;

            let moldes = JSON.parse(localStorage.getItem('redacao_moldes') || '[]');
            moldes.push({
                id: Date.now(),
                nome: nome,
                esqueleto: blankEl.innerHTML,
                data: new Date().toLocaleDateString()
            });
            localStorage.setItem('redacao_moldes', JSON.stringify(moldes));
            alert("Molde salvo com sucesso na biblioteca!");
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const builder = document.getElementById('builder-textarea');
    if (builder) {
        const saved = localStorage.getItem('redacao_builder_modelo');
        if (saved) builder.value = saved;

        builder.addEventListener('input', () => {
            localStorage.setItem('redacao_builder_modelo', builder.value);
        });
    }
});


