const code = ["nord", "nord", "sud", "sud", "gauche", "droite", "gauche", "droite", "b", "a"];

// String for the Final Transcript
let final_transcript = "";

if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();
  
  
    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'en-EN';
  
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
  
    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
      // Start the Speech Recognition
      speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#stop").onclick = () => {
      // Stop the Speech Recognition
      speechRecognition.stop();
    };

    document.querySelector("#delete").onclick = () => {
      final_transcript = final_transcript.substring(0, final_transcript.lastIndexOf(" "));
      document.querySelector("#final").innerHTML = final_transcript;
    };
    
    document.querySelector("#reset").onclick = () => {
      final_transcript = "";
      document.querySelector("#final").innerHTML = final_transcript;
    };
} else {
  console.log("Speech Recognition Not Available");
}

document.onkeydown = (e) => {
  if (document.querySelector("#konami").style.opacity == "1") {
    if (e.keyCode == '37') {
      final_transcript += " gauche";
    }
  
    if (e.keyCode == '38') {
      final_transcript += " nord";
    }
  
    if (e.keyCode == '39') {
      final_transcript += " droite";    
    }
  
    if (e.keyCode == '40') {
      final_transcript += " sud";    
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