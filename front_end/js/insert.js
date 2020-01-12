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
    // Get current selection
    var replaceRange = editor.getSelectionRange();

    // Translate selection
    transcript = translate(transcript);

    // Insert text into editor
    editor.session.replace(replaceRange, transcript);

    // Deselect text
    editor.session.selection.clearSelection();
};

insertInterim = function(transcript, editor) {
    // Get current selection
    var initRange = editor.getSelectionRange();
    
    // Insert interim
    editor.session.replace(initRange, translate(transcript));

    // Get cursor position
    var endPosition = editor.getCursorPosition();
    
    // Create range
    var selectRange = initRange.clone()
    selectRange.setEnd(endPosition.row, endPosition.column);
    
    // Select range
    editor.session.selection.addRange(selectRange);

};
