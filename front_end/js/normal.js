// Converting words to digits acquired from
// https://stackoverflow.com/questions/11980087/javascript-words-to-numbers
var numbers = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};

function text2num(s) {
    var out = [];

    var a = s.toString().split(/[\s-]+/);
    a.forEach(function(word) {
        if (word in numbers) {
            out.push(numbers[word]);
        }
        else { out.push(word) }
    });
    return out.join(" ");
}



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
    "up": function() {editor.selection.moveCursorUp();
    editor.centerSelection();},
    "down": function() {editor.selection.moveCursorDown();
    editor.centerSelection();},
    "select word": function() {editor.selection.selectWord()},
    "delete": function() {editor.remove()},
    "select line": function() {editor.selection.selectLine()},
    "deselect": function() {
      console.log("it should deselect");
      editor.selection.clearSelection();},
    "jump right": function() {editor.selection.moveCursorLongWordRight()},
    "jump left": function() {editor.selection.moveCursorLongWordLeft()},
    "insert": function() { $("#mode").children().not("#"+mode).click(); }
};

commands = {

    "GoToLine": function (entities) {
        if (entities.length) {
            var number = parseInt(entities[entities.length-1].entity);

            editor.session.selection.moveCursorTo(number-1, 0, true);
        }
        editor.centerSelection();
    },

    "GoToLineEnd": function(entities) {
        editor.navigateLineEnd();
        editor.centerSelection();
    },

    "GoToBeginning": function(entities) {
        editor.navigateLineStart();
        editor.centerSelection();
    },

    "GoToFileBeginning": function(entities) {
        editor.navigateFileStart();
        editor.centerSelection();
    },

    "GoToFileEnd": function(entities) {
        editor.navigateFileEnd();
        editor.centerSelection();
    },

    "MoveLeftX": function(entities) {
        var number = parseInt(entities[entities.length-1].entity);

        editor.selection.moveCursorBy(0, -1*number);
        editor.centerSelection();
    },
    "MoveRightX": function(entities) {
        var number = parseInt(entities[entities.length - 1].entity);

        editor.selection.moveCursorBy(0, number);
        editor.centerSelection();
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
    console.log(text2num(command));

    command = command.trim()

    // Get luis response
    translateCommand(text2num(command), processLuis);

    // Update visualization
    $("#normal-output").html('<span class="text-success">'+
        command+'</span>');
};

normalInterim = function(command, editor) {
    command = command.toLowerCase().trim();
    $("#normal-output").html(command);
};
