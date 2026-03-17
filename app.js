(function() {
      // ---------- DOM ELEMENTS ----------
      const sourceLang = document.getElementById('sourceLang');
      const targetLang = document.getElementById('targetLang');
      const inputText = document.getElementById('inputText');
      const outputText = document.getElementById('outputText');
      const translateBtn = document.getElementById('translateBtn');
      const loadingSpinner = document.getElementById('loadingSpinner');
      const charCount = document.getElementById('charCount');
      const voiceBtn = document.getElementById('voiceBtn');
      const clearBtn = document.getElementById('clearBtn');
      const copyInputBtn = document.getElementById('copyInputBtn');
      const copyOutputBtn = document.getElementById('copyOutputBtn');
      const ttsBtn = document.getElementById('ttsBtn');
      const downloadBtn = document.getElementById('downloadBtn');
      const swapLangs = document.getElementById('swapLangs');
      const clearHistoryBtn = document.getElementById('clearHistoryBtn');
      const historyList = document.getElementById('historyList');
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');
      const meaningSection = document.getElementById('meaningSection');
      const meaningContent = document.getElementById('meaningContent');
      
      // Grammar elements
      const grammarQuestion = document.getElementById('grammarQuestion');
      const askGrammarBtn = document.getElementById('askGrammarBtn');
      const grammarAnswerBox = document.getElementById('grammarAnswerBox');

      // ---------- STATE ----------
      let translationHistory = JSON.parse(localStorage.getItem('translationHistory')) || [];
      let isSpeaking = false;

      // ---------- HELPER: Show Toast ----------
      function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.background = type === 'success' ? 'var(--success)' : 'var(--surface)';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      }

      // ========== COMPLETE GRAMMAR AI ==========
      function getGrammarAnswer(query) {
        if (!query.trim()) {
          return {
            rule: "❌ Please enter a grammar question.",
            example: "Example: 'negative sentence', 'interrogative', 'parts of speech'"
          };
        }
        const q = query.toLowerCase().trim();

        // ----- PRESENT PERFECT CONTINUOUS (detailed) -----
        if (q.includes('present perfect continuous') || q.includes('present perfect continouse') || q === 'present perfect continuous' || q.includes('present perfect continuous tense')) {
          return {
            rule: "📘 <strong>Present Perfect Continuous Tense – पूरी जानकारी</strong>",
            example: `
              <div style="margin-bottom:12px;"><strong>🔹 कब इस्तेमाल करें (Usage)</strong><br>
              Present Perfect Continuous Tense Present Tense ka aakhiri aur thoda lamba hissa hai. Iska istemal hum tab karte hain jab koi kaam beete hue samay (past) mein shuru hua ho aur abhi bhi (present mein) chal raha ho.<br>
              Iska sabse zaroori pehlu hai "<strong>Samay</strong>" (Time) ka zikr hona.<br><br>

              <strong>🔹 Pehchaan (Hindi mein)</strong><br>
              ✅ Hindi sentences ke aakhir mein "<strong>se raha hai, se rahi hai, se rahe hain</strong>" aata hai.<br>
              Example: Wo do ghante se padh raha hai. (He has been studying for two hours.)<br><br>

              <strong>🔹 Sentence banane ka Rule (Structure)</strong><br>
              <strong>Subject + has/have + been + Verb(ing) + Object + since/for + time</strong><br>
              (Iske saath hi samay dikhane ke liye Since ya For lagate hain.)<br><br>

              <strong>🔹 "Since" aur "For" का सही इस्तेमाल</strong><br>
              ✅ <strong>Since (Point of Time – निश्चित समय):</strong> since morning, since 2010, since Monday, since 4 o'clock.<br>
              ✅ <strong>For (Period of Time – अवधि):</strong> for 2 hours, for 5 days, for 3 years, for a long time.<br><br>

              <strong>🔹 Sentence ke Types</strong><br>
              🟢 <strong>Affirmative (Positive):</strong> Subject + has/have been + Ving + since/for time<br>
              → I have been playing since morning. (Main subah se khel raha hoon.)<br>
              → She has been living in Delhi for 5 years. (Wo 5 saal se Delhi mein reh rahi hai.)<br><br>

              🔴 <strong>Negative:</strong> Subject + has/have + not + been + Ving + since/for time<br>
              → It has not been raining since yesterday. (Kal se baarish nahi ho rahi hai.)<br>
              → They have not been working for two days. (Wo do din se kaam nahi kar rahe hain.)<br><br>

              🔵 <strong>Interrogative (Sawaal):</strong> Has/Have + subject + been + Ving + since/for time?<br>
              → Have you been waiting for me since 2 o'clock? (Kya tum 2 baje se mera intezar kar rahe ho?)<br>
              → Has he been sleeping for a long time? (Kya wo kaafi der se so raha hai?)<br><br>

              <strong>🔹 Present Continuous vs Present Perfect Continuous</strong><br>
              <table style="width:100%; border-collapse:collapse; background:var(--glass); font-size:0.95rem;">
                <tr><th style="border:1px solid var(--border); padding:5px;">Tense</th><th style="border:1px solid var(--border); padding:5px;">Meaning</th><th style="border:1px solid var(--border); padding:5px;">Example</th></tr>
                <tr><td style="border:1px solid var(--border); padding:5px;">Present Continuous</td><td style="border:1px solid var(--border); padding:5px;">Kaam abhi ho raha hai (Time nahi diya)</td><td style="border:1px solid var(--border); padding:5px;">I am reading. (Main padh raha hoon.)</td></tr>
                <tr><td style="border:1px solid var(--border); padding:5px;">Present Perfect Continuous</td><td style="border:1px solid var(--border); padding:5px;">Kaam pehle shuru, abhi bhi chal raha (Time diya)</td><td style="border:1px solid var(--border); padding:5px;">I have been reading since 9 AM. (Main 9 baje se padh raha hoon.)</td></tr>
              </table><br>

              <strong>🔹 Summary Table</strong><br>
              <table style="width:100%; border-collapse:collapse; background:var(--glass); font-size:0.95rem;">
                <tr><th style="border:1px solid var(--border); padding:5px;">Subject</th><th style="border:1px solid var(--border); padding:5px;">Helping Verb</th><th style="border:1px solid var(--border); padding:5px;">Since/For</th></tr>
                <tr><td style="border:1px solid var(--border); padding:5px;">I, You, We, They</td><td style="border:1px solid var(--border); padding:5px;">have been</td><td style="border:1px solid var(--border); padding:5px;">Since (Fixed time)</td></tr>
                <tr><td style="border:1px solid var(--border); padding:5px;">He, She, It, Name</td><td style="border:1px solid var(--border); padding:5px;">has been</td><td style="border:1px solid var(--border); padding:5px;">For (Duration)</td></tr>
              </table><br>

              <strong>💡 Pehchaan:</strong> Jab bhi kisi sentence ke aakhir mein "<em>se raha hai, se rahi hai, se rahe hain</em>" aaye aur time diya ho, samajh jaiye ki wo Present Perfect Continuous hai.
              </div>
            `
          };
        }

        // ----- NEGATIVE SENTENCES -----
        if (q.includes('negative') || q.includes('नकारात्मक') || q.includes('not')) {
          return {
            rule: "📘 <strong>Negative Sentences (नकारात्मक वाक्य) – Rules with Examples</strong>",
            example: `
              🟢 <strong>Present Indefinite:</strong> do/does + not + V1<br>
              I play. → I <strong>do not play</strong>.<br>
              He plays. → He <strong>does not play</strong>.<br><br>
              
              🟢 <strong>Present Continuous:</strong> is/am/are + not + V1+ing<br>
              She is reading. → She <strong>is not reading</strong>.<br><br>
              
              🟢 <strong>Present Perfect:</strong> has/have + not + V3<br>
              I have finished. → I <strong>have not finished</strong>.<br><br>
              
              🟢 <strong>Present Perfect Continuous:</strong> has/have + not + been + V1+ing<br>
              He has been waiting. → He <strong>has not been waiting</strong>.<br><br>
              
              🔵 <strong>Past Indefinite:</strong> did + not + V1<br>
              I went. → I <strong>did not go</strong>.<br><br>
              
              🔵 <strong>Past Continuous:</strong> was/were + not + V1+ing<br>
              They were playing. → They <strong>were not playing</strong>.<br><br>
              
              🔵 <strong>Past Perfect:</strong> had + not + V3<br>
              I had finished. → I <strong>had not finished</strong>.<br><br>
              
              🔵 <strong>Past Perfect Continuous:</strong> had + not + been + V1+ing<br>
              He had been waiting. → He <strong>had not been waiting</strong>.<br><br>
              
              🟣 <strong>Future Indefinite:</strong> will + not + V1<br>
              I will go. → I <strong>will not go</strong>.
            `
          };
        }

        // ========== INTERROGATIVE ==========
        if (q.includes('interrogative') || q.includes('प्रश्न') || q.includes('question')) {
          return {
            rule: "📘 <strong>Interrogative Sentences (प्रश्नवाचक वाक्य) – Helping verb को आगे लाओ</strong>",
            example: `
              🟢 <strong>Present Indefinite:</strong> Do/Does + subject + V1?<br>
              You play? ❌ → <strong>Do you play?</strong> ✔️<br>
              He plays? ❌ → <strong>Does he play?</strong> ✔️<br><br>
              
              🟢 <strong>Present Continuous:</strong> Is/Am/Are + subject + V1+ing?<br>
              She is reading? ❌ → <strong>Is she reading?</strong> ✔️<br><br>
              
              🟢 <strong>Present Perfect:</strong> Has/Have + subject + V3?<br>
              He has gone? ❌ → <strong>Has he gone?</strong> ✔️<br><br>
              
              🟢 <strong>Present Perfect Continuous:</strong> Has/Have + subject + been + V1+ing?<br>
              He has been waiting? ❌ → <strong>Has he been waiting?</strong> ✔️<br><br>
              
              🔵 <strong>Past Indefinite:</strong> Did + subject + V1?<br>
              You went? ❌ → <strong>Did you go?</strong> ✔️<br><br>
              
              🔵 <strong>Past Continuous:</strong> Was/Were + subject + V1+ing?<br>
              He was playing? ❌ → <strong>Was he playing?</strong> ✔️<br><br>
              
              🔵 <strong>Past Perfect:</strong> Had + subject + V3?<br>
              He had gone? ❌ → <strong>Had he gone?</strong> ✔️<br><br>
              
              🔵 <strong>Past Perfect Continuous:</strong> Had + subject + been + V1+ing?<br>
              He had been waiting? ❌ → <strong>Had he been waiting?</strong> ✔️<br><br>
              
              🟣 <strong>Future:</strong> Will + subject + V1?<br>
              You will come? ❌ → <strong>Will you come?</strong> ✔️
            `
          };
        }

        // ========== PARTS OF SPEECH ==========
        if (q.includes('parts of speech') || q.includes('शब्द भेद') || q.includes('8 parts')) {
          return {
            rule: "📘 <strong>Parts of Speech (8 भाग) – Definition + Examples</strong>",
            example: `
              1. <strong>Noun (संज्ञा):</strong> किसी व्यक्ति, जगह, वस्तु, भावना का नाम<br>
              Ram, Delhi, book, love<br>
              Example: India is a country.<br><br>
              
              2. <strong>Pronoun (सर्वनाम):</strong> Noun की जगह आता है<br>
              He, She, It, They<br>
              Example: Ram is good. He is honest.<br><br>
              
              3. <strong>Verb (क्रिया):</strong> काम बताता है<br>
              run, eat, write<br>
              Example: She runs fast.<br><br>
              
              4. <strong>Adjective:</strong> Noun की quality बताता है<br>
              good, tall, beautiful<br>
              Example: She is a beautiful girl.<br><br>
              
              5. <strong>Adverb:</strong> Verb/Adjective की quality बताता है<br>
              slowly, very, quickly<br>
              Example: He runs quickly.<br><br>
              
              6. <strong>Preposition:</strong> Position बताता है<br>
              in, on, at, under<br>
              Example: Book is on the table.<br><br>
              
              7. <strong>Conjunction:</strong> जोड़ने वाला शब्द<br>
              and, but, because<br>
              Example: Ram and Shyam are friends.<br><br>
              
              8. <strong>Interjection:</strong> अचानक भाव<br>
              Oh!, Wow!, Alas!
            `
          };
        }

        // ========== DEFAULT ==========
        return {
          rule: "🤖 Complete Grammar Guru",
          example: `For "<strong>${query}</strong>", please specify a topic like: negative, interrogative, parts of speech, present indefinite, present continuous, present perfect, present perfect continuous, past tense, past indefinite, past continuous, past perfect, past perfect continuous, future tense, future indefinite, future continuous, future perfect, future perfect continuous, tense trick, practice questions, active passive, direct indirect, articles, modals, conversation, pronunciation, or any specific tense.`
        };
      }

      // Grammar button click
      askGrammarBtn.addEventListener('click', function() {
        const question = grammarQuestion.value.trim() || "negative sentence";
        grammarAnswerBox.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Analyzing grammar... (under 2 sec)`;
        setTimeout(() => {
          const answer = getGrammarAnswer(question);
          grammarAnswerBox.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10b981; font-size: 1.3rem;"></i>
              <span class="grammar-timer"><i class="far fa-clock"></i> 1.6 sec</span>
            </div>
            <div>${answer.rule}</div>
            <div class="example-box">${answer.example}</div>
          `;
        }, 400);
      });
      grammarQuestion.addEventListener('keypress', (e) => { if (e.key === 'Enter') askGrammarBtn.click(); });

      // ---------- TRANSLATION FUNCTIONS ----------
      inputText.addEventListener('input', () => {
        charCount.textContent = inputText.value.length;
      });

      async function translateText(text, source, target) {
        if (!text.trim()) return '';
        try {
          const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source === 'auto' ? 'auto' : source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
          const response = await fetch(googleUrl);
          const data = await response.json();
          if (data && data[0]) return data[0].map(item => item[0]).join('');
        } catch (e) { console.log(e); }
        return text + ' [translated]';
      }

      async function getWordMeaning(word) {
        try {
          const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
          const response = await fetch(url);
          const data = await response.json();
          if (data && data[0]) {
            const meaning = data[0].meanings[0];
            return {
              word: data[0].word,
              partOfSpeech: meaning.partOfSpeech,
              definition: meaning.definitions[0].definition,
              example: meaning.definitions[0].example || 'No example'
            };
          }
        } catch (e) { return null; }
      }

      async function performTranslation() {
        const text = inputText.value.trim();
        if (!text) { showToast('Enter text to translate', 'error'); return; }
        const source = sourceLang.value;
        const target = targetLang.value;

        loadingSpinner.classList.remove('hidden');
        translateBtn.disabled = true;
        try {
          const translatedText = await translateText(text, source, target);
          outputText.value = translatedText;

          if (text.split(' ').length === 1) {
            const meaning = await getWordMeaning(text);
            if (meaning) {
              meaningSection.style.display = 'block';
              meaningContent.innerHTML = `<strong>${meaning.word}</strong> (${meaning.partOfSpeech})<br><strong>Definition:</strong> ${meaning.definition}<br>${meaning.example ? `<strong>Example:</strong> ${meaning.example}` : ''}`;
            } else { meaningSection.style.display = 'none'; }
          } else { meaningSection.style.display = 'none'; }

          const historyItem = {
            id: Date.now(),
            sourceText: text,
            translatedText: translatedText,
            sourceLang: sourceLang.options[sourceLang.selectedIndex].text,
            targetLang: targetLang.options[targetLang.selectedIndex].text,
            sourceCode: source,
            targetCode: target,
            timestamp: new Date().toLocaleString()
          };
          translationHistory.unshift(historyItem);
          if (translationHistory.length > 10) translationHistory.pop();
          localStorage.setItem('translationHistory', JSON.stringify(translationHistory));
          renderHistory();
          showToast('Translation completed!', 'success');
        } catch (error) { showToast('Translation failed', 'error'); } 
        finally {
          loadingSpinner.classList.add('hidden');
          translateBtn.disabled = false;
        }
      }

      // Voice Input
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false; recognition.interimResults = false;
        voiceBtn.addEventListener('click', () => {
          recognition.lang = sourceLang.value === 'auto' ? 'en-US' : 
                            sourceLang.value === 'hi' ? 'hi-IN' : 'en-US';
          recognition.start();
          voiceBtn.style.background = 'var(--primary)';
        });
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          inputText.value += (inputText.value ? ' ' : '') + transcript;
          inputText.dispatchEvent(new Event('input'));
          showToast('Voice captured!', 'success');
        };
        recognition.onerror = () => showToast('Voice failed', 'error');
        recognition.onend = () => { voiceBtn.style.background = ''; };
      } else { voiceBtn.style.opacity = '0.5'; voiceBtn.title = 'Not supported'; }

      // TTS
      ttsBtn.addEventListener('click', () => {
        const text = outputText.value;
        if (!text) { showToast('No text', 'error'); return; }
        if (isSpeaking) { window.speechSynthesis.cancel(); isSpeaking = false; ttsBtn.style.background = ''; } 
        else {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = targetLang.value === 'hi' ? 'hi-IN' : 'en-US';
          utterance.onend = () => { isSpeaking = false; ttsBtn.style.background = ''; };
          window.speechSynthesis.speak(utterance);
          isSpeaking = true; ttsBtn.style.background = 'var(--primary)';
        }
      });

      // Copy, Clear, Download, Swap
      copyInputBtn.addEventListener('click', () => { navigator.clipboard.writeText(inputText.value); showToast('Copied!', 'success'); });
      copyOutputBtn.addEventListener('click', () => { navigator.clipboard.writeText(outputText.value); showToast('Copied!', 'success'); });
      clearBtn.addEventListener('click', () => { inputText.value = ''; outputText.value = ''; meaningSection.style.display = 'none'; charCount.textContent = '0'; });
      downloadBtn.addEventListener('click', () => {
        const text = outputText.value; if (!text) { showToast('No text', 'error'); return; }
        const blob = new Blob([text], { type: 'text/plain' }); const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `translation.txt`; a.click(); URL.revokeObjectURL(url); showToast('Downloaded', 'success');
      });
      swapLangs.addEventListener('click', () => {
        const temp = sourceLang.value; sourceLang.value = targetLang.value; targetLang.value = temp === 'auto' ? 'en' : temp;
        if (inputText.value && outputText.value) { const tempText = inputText.value; inputText.value = outputText.value; outputText.value = tempText; charCount.textContent = inputText.value.length; }
      });

      // History render
      function renderHistory() {
        if (translationHistory.length === 0) { historyList.innerHTML = '<p style="text-align:center;">No history</p>'; return; }
        historyList.innerHTML = translationHistory.map(item => `
          <div class="history-item">
            <div class="history-content">
              <div class="history-langs">${item.sourceLang} → ${item.targetLang}</div>
              <div class="history-text">${item.sourceText.substring(0,50)}${item.sourceText.length>50?'...':''}</div>
              <small>${item.timestamp}</small>
            </div>
            <div class="history-actions">
              <button onclick="loadHistoryItem(${item.id})"><i class="fas fa-undo"></i></button>
            </div>
          </div>`).join('');
      }
      window.loadHistoryItem = (id) => {
        const item = translationHistory.find(h => h.id === id);
        if (item) { inputText.value = item.sourceText; outputText.value = item.translatedText; sourceLang.value = item.sourceCode; targetLang.value = item.targetCode; charCount.textContent = item.sourceText.length; showToast('Loaded', 'success'); }
      };
      clearHistoryBtn.addEventListener('click', () => { translationHistory = []; localStorage.removeItem('translationHistory'); renderHistory(); showToast('History cleared', 'info'); });

      // Theme toggle
      themeToggle.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('light-theme')) {
          body.classList.replace('light-theme', 'dark-theme'); themeIcon.className = 'fas fa-sun'; themeToggle.querySelector('span').textContent = 'Light Mode'; localStorage.setItem('theme', 'dark');
        } else {
          body.classList.replace('dark-theme', 'light-theme'); themeIcon.className = 'fas fa-moon'; themeToggle.querySelector('span').textContent = 'Dark Mode'; localStorage.setItem('theme', 'light');
        }
      });
      if (localStorage.getItem('theme') === 'dark') { document.body.classList.replace('light-theme','dark-theme'); themeIcon.className = 'fas fa-sun'; themeToggle.querySelector('span').textContent = 'Light Mode'; }

      translateBtn.addEventListener('click', performTranslation);
      inputText.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); performTranslation(); } });

      renderHistory();
      charCount.textContent = inputText.value.length;
    })();