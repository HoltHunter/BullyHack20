// Ask for permission to use audio
navigator.getUserMedia({audio: true, video: false},
    function(stream) {console.log("Got permission");},
        function(error) {alert("Error!");}
    );

var editor = ace.edit("editor", {
      theme: "ace/theme/vibrant_ink",
      mode: "ace/mode/python",
      autoScrollEditorIntoView: true,
      maxLines: 30,
      minLines: 30
});

// Edit mode
var mode = "insert";

processStream = function (event) {
    var rec_result = event.results[event.resultIndex];
    var text_out = rec_result[0].transcript;
    var confidence = rec_result[0].confidence;

    if (confidence > 0.5) {
        if (rec_result.isFinal) {
            console.log("FINAL");

            if (mode == "insert") insertFinal(rec_result[0].transcript, editor);
            if (mode == "normal") normalFinal(rec_result[0].transcript, editor);
        }
        else {
            if (mode == "insert") insertInterim(rec_result[0].transcript, editor);
            if (mode == "normal") normalInterim(rec_result[0].transcript, editor);
        }
    }
}

// Find and initialize speech recognition service
//var recognitionService = SpeechRecognition || webkitSpeechRecognition;
var recognitionService = webkitSpeechRecognition;
voiceRecognition = new recognitionService();

// Get results continuously instead of every sentence
voiceRecognition.continuous = true;
voiceRecognition.interimResults = true;

// Callback to process results with
voiceRecognition.onresult = processStream;

// Copy all of the program's code
copyCode = function() {
    var current_selection = editor.getSelection();
    // Select all
    editor.selectAll();

    // Get text
    document.execCommand("copy");

    // Return selection
    editor.clearSelection();
}


$(document).ready(function() {
    const start =  document.querySelector('#start')
    const stop =  document.querySelector('#stop')
    const wave = document.querySelector('#wave-wrapper')
    const message = document.querySelector('#normal-output')


    $("#start").click(function(event) {
        voiceRecognition.start();
        start.classList.add('animated', 'pulse', 'infinite');
        stop.classList.remove('invisible', 'zoomOut');
        stop.classList.add('animated', 'zoomIn');
        wave.classList.remove('invisible', 'zoomOut');
        wave.classList.add('animated', 'zoomIn')
        message.classList.remove('invisible', 'zoomOut');
    });



    $("#stop").click(function(event) {
        voiceRecognition.stop();
        start.classList.remove('animated', 'pulse', 'infinite');
        stop.classList.remove('zoomIn');
        stop.classList.add('zoomOut');
        wave.classList.remove('zoomIn')
        wave.classList.add('zoomOut');
        message.classList.add('animated', 'zoomOut');
        //wave.classList.add('invisible');
    });

    $("#copy").click(function(event) {
        copyCode();
    });

    $("#normal").change(function(event) {
        modeToggle();
    });
    $("#insert").change(function(event) {
        modeToggle();
    });

});

modeToggle = function() {
  if (mode == "insert"){
    mode = "normal";
    console.log("normal");
  } else {
    mode = "insert";
    console.log("insert");
  }
}
