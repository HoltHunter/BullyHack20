substitutions = {
    "space": " ",
    "tab": "    ",
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
    "closed": ")",
    "begin": "{",
    "end": "}",
    "slash": "/",
    "escape": "\\"
};

var insertions = [];

var cut_transcript = 0;

translate = function (transcript) {
    // Special flags
    var caps = false; 
    var shift = false;

    actual_script = "";
    // For each word
    transcript.split(" ").forEach(function(word, index) {
        word = word.toLowerCase();
        // Handle common substitions
        if (word in substitutions) {
            actual_script += substitutions[word];
        }
        else {
            // Handle captalization
            if (caps) {
                // Capitalize first letter
                word = word.charAt(0).toUpperCase() + word.slice(1);
                caps = false;
            }
            if (shift) {
                // Capitalize the whole word
                word = word.toUpperCase();
                shift = false;
            }

            // Handle flags
            if (word == "cap" || word == "capital")
                caps = true;
            else if (word == "caps")
                shift = true;
            else
                actual_script += word;
        }
    });

    return actual_script;
};

back = function(editor) {
    var selectionRange = editor.getSelectionRange();

    if (selectionRange.isEmpty()) {
        // Go back and undo the last insertion
        var last_range = insertions.pop();
        editor.session.replace(last_range, "");
    }
    else {
        // Undo the current insertion
        editor.session.replace(selectionRange, "");

        // Clear selection
        editor.clearSelection();
    }
};

insertFinal = function(transcript, editor) {
    // Cut off reverted results
    transcript = transcript.slice(cut_transcript);
    // Check for back
    if (transcript.endsWith("back")) {
        back(editor);
        cut_transcript = 0;
        return;
    }

    if (cut_transcript < transcript.length) {
        console.log(transcript);
        if (transcript.endsWith("normal mode")) {
            console.log("normalmode");
            $("#mode").children().not("#"+mode).click();
            transcript = transcript.slice(0, transcript.length-11);
        }
        // Get current selection
        var replaceRange = editor.getSelectionRange();

        // Translate selection
        transcript = translate(transcript);

        // Insert text into editor
        editor.session.replace(replaceRange, transcript);

        // Add insertion to list of insertions
        var pos = editor.getCursorPosition();
        replaceRange.setEnd(pos.row, pos.column);
        insertions.push(replaceRange);

        // Deselect text
        editor.session.selection.clearSelection();
    }
    // Reset slice
    cut_transcript = 0;
};

insertInterim = function(transcript, editor) {
    // Cut back reverted results
    transcript = transcript.slice(cut_transcript);
    // Check for back
    if (transcript.endsWith("back")) {
        back(editor);
        cut_transcript += transcript.length;
        return;
    }

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
