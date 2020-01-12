
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

$("#start").click(function(event) {
    voiceRecognition.start();
});

$("#stop").click(function(event) {
    voiceRecognition.stop();
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

//$("#insert-check").onchange(function(event) {
 //mode = "insert";
 //console.log("insert");
//});

//$("#normal-check").onchange(function(event) {
//  mode = "normal";
//  console.log("normal");
//})
