const code = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"];

let final_transcript = "";
let isListening = false;
let isFrench = true;

if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();
  
  
    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'fr-FR';
  
    // Callback Function for the onStart Event
    speechRecognition.onstart = () => {
      // Show the Status Element
      document.querySelector("#status").style.opacity = "1";
    };
    speechRecognition.onerror = () => {
      // Hide the Status Element
      document.querySelector("#status").style.opacity = "0";
    };
    speechRecognition.onend = () => {
      // Hide the Status Element
      document.querySelector("#status").style.opacity = "0";
    };
  
    speechRecognition.onresult = (event) => {
      // Create the interim transcript string locally because we don't want it to persist like final transcript
      let interim_transcript = "";

      console.log(event);
  
      // Loop through the results from the speech recognition object.
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
  
      // Set the Final transcript and Interim transcript.
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;

      checkCode(final_transcript);
    };
  
    document.querySelector("#listen").onclick = (event) => {
      if (isListening) {
        speechRecognition.stop();
        isListening = false;
        event.srcElement.textContent = "mic_off"
      } else {
        speechRecognition.start();
        isListening = true;
        event.srcElement.textContent = "mic"
      }
    };

    document.querySelector("#delete").onclick = () => {
      final_transcript = final_transcript.substring(0, final_transcript.lastIndexOf(" "));
      document.querySelector("#final").innerHTML = final_transcript;
    };
    
    document.querySelector("#reset").onclick = () => {
      final_transcript = "";
      document.querySelector("#final").innerHTML = final_transcript;
    };

    document.querySelector("#translate").onclick = (event) => {
      if (isFrench) {
        speechRecognition.lang = 'en-US';
        isFrench = false;
        event.srcElement.textContent = "language_us"
      } else {
        speechRecognition.lang = 'en-FR';
        isFrench = true;
        event.srcElement.textContent = "language_french"
      }
    };

} else {
  console.log("Speech Recognition Not Available");
}

document.onkeydown = (e) => {
  if (document.querySelector("#konami").style.opacity == "1") {
    if (e.keyCode == '37') {
      final_transcript += " left";
    }
  
    if (e.keyCode == '38') {
      final_transcript += " up";
    }
  
    if (e.keyCode == '39') {
      final_transcript += "  right";    
    }
  
    if (e.keyCode == '40') {
      final_transcript += " down";    
    }
  
    if (e.keyCode == '65') {
      final_transcript += " a";    
    }
  
    if (e.keyCode == '66') {
      final_transcript += " b";    
    }
  
    document.querySelector("#final").innerHTML = final_transcript;
    checkCode(final_transcript);
  }
}

function checkCode(text) {
  text = text.normalize("NFD").replace(/[\u0300-\u036f]|[\.\?\!\)]+$/g, "").trim().toLowerCase();
  let words = text.split(" ");
  
  if (words.length == code.length) {
    let isCodeCorrect = true;

    for (let i = 0; i < words.length; i++) {
      if (words[i].indexOf(code[i]) < 0) {
        isCodeCorrect = false;
      }
    }

    if (isCodeCorrect) {
      console.log("gg");
      document.querySelector("#konami").style.opacity = "0";
      final_transcript = "";
    }
  }
}