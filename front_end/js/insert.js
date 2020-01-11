substitutions = {
    "space": " ",
    "hash": "#",
    "dot": ".",
    "minus": "-",
    "plus": "+",
    "equal": "=",
    "open": "(",
    "close":")",
    "enter":"\n",
    "star":"*",
    "less":"<",
    "great":">",
    "quote":"\"",
    "semicolon": ";",
    "colon": ":",
    "semi": ";",
    "tilde": "~",
    "dash": "-",
    "under": "_",
    "underscore": "_",
    "bang": "!",
    "pound": "#",
    "not": "!",
    "and": "&",
    "ampersand": "&",
    "closed": ")"
};

translate = function (transcript) {
    actual_script = "";
    transcript.split(" ").forEach(function(word, index) {
        word = word.toLowerCase();
        // Handle common substitions
        if (word in substitutions) {
            actual_script += substitutions[word];
        }
        else {
            actual_script += word;
        }
    });

    return actual_script;
};

insertFinal = function(transcript, editor) {
    transcript = translate(transcript);

    console.log("Inserting: "+transcript);
    editor.session.insert(editor.getCursorPosition(), transcript);
};

insertInterim = function(transcript, editor) {
    console.log("interim: " + transcript);
};
