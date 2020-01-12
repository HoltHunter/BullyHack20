
var editor = ace.edit("editor", {
      theme: "ace/theme/vibrant_ink",
      mode: "ace/mode/python",
      autoScrollEditorIntoView: true,
      maxLines: 30,
      minLines: 30
});

// Edit mode
var mode = "normal";

processStream = function (event) {
    var rec_result = event.results[event.resultIndex];
    var text_out = rec_result[0].transcript;
    var confidence = rec_result[0].confidence;

    if (rec_result.isFinal) {
        console.log("FINAL");

        if (mode == "insert") insertFinal(rec_result[0].transcript, editor);
        if (mode == "normal") normalFinal(rec_result[0].transcript, editor);
    }
    else {
        if (mode == "insert") insertInterim(rec_result[0].transcript, editor);
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

$("#range").click(function(event) {
    console.log(editor.getSelection().getRange());

});
