functions = {
    "go to ending": function() {editor.selection.selectLineEnd()},
    "go to start": function() {editor.selection.moveCursorFileStart()},
    "line ending": function() {editor.navigateLineEnd()},
    "line beginning": function() {editor.navigateLineStart()},
    "right": function() {editor.selection.moveCursorRight()},
    "left" : function() {editor.selection.moveCursorLeft()},
    "select all": function() {editor.selectAll()},
    "undo": function() {editor.undo()},
    "redo": function() {editor.redo()},
    "up": function() {editor.selection.moveCursorUp()},
    "down": function() {editor.selection.moveCursorDown()},
    "select word": function() {editor.selection.selectWord()},
    "delete": function() {editor.remove()},
    "select line": function() {editor.selection.selectLine()},
    "deselect": function() {editor.selection.clearSelection()},
    "jump right": function() {editor.selection.moveCursorLongWordRight()},
    "jump left": function() {editor.selection.moveCursorLongWordLeft()}
};

commands = {

    "GoToLine": function (entities) {
        if (entities.length) {
            var number = parseInt(entities[entities.length-1].entity);

            editor.session.selection.moveCursorTo(number-1, 0, true);
        }
    },

    "GoToLineEnd": function(entities) {
        editor.navigateLineEnd();
    },
    
    "GoToBeginning": function(entities) {
        editor.navigateLineStart();
    },

    "GoToFileBeginning": function(entities) {
        editor.navigateFileStart();
    },

    "GoToFileEnd": function(entities) {
        editor.navigateFileEnd();
    },

};


processLuis = function (response) {
    console.log(response);
    var intent = response.topScoringIntent;
    console.log(intent);

    if (intent.score > 0.7) {
        // Call intent
        if (intent.intent in commands)
            commands[intent.intent](response.entities);
    }
    else {
        // Call function
        if (response.query in functions)
        {
          functions[response.query]();
        }
    }
};

normalFinal = function(command, editor) {
    command = command.toLowerCase();
    console.log(command);

    command = command.trim()

    // Get luis response
    translateCommand(command, processLuis);

    session = editor.getSession();

};

