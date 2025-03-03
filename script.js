document.addEventListener("DOMContentLoaded", () => {
    if (!('speechSynthesis' in window)) {
        alert("Your browser does not support speech synthesis.");
        return;
    }

    let speech = new SpeechSynthesisUtterance();
    let voiceSelect = document.getElementById("voiceSelect");
    let speakBtn = document.getElementById("speakBtn");
    let textInput = document.getElementById("textInput");

    function loadVoices() {
        let voices = window.speechSynthesis.getVoices();

        if (voices.length === 0) {
            console.warn("No voices available! Reload the page or check browser settings.");
            return;
        }

        voiceSelect.innerHTML = ""; 

        voices.forEach((voice, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });

      
        speech.voice = voices[0];
    }

    
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

   
    voiceSelect.addEventListener("change", () => {
        let voices = window.speechSynthesis.getVoices();
        speech.voice = voices[voiceSelect.value];
    });

   
    speakBtn.addEventListener("click", () => {
        let text = textInput.value.trim();

        if (text.length === 0) {
            alert("Please enter some text!");
            return;
        }

        speech.text = text;
        window.speechSynthesis.cancel(); 
        window.speechSynthesis.speak(speech);
    });
});
