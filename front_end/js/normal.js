normalFinal = function(command, editor) {
    command = command.toLowerCase();
    console.log(command);

    command = command.trim()

    session = editor.getSession();

    //delete = function() {
      //if ()
    //}

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

    if (command in functions)
    {
      functions[command]();
    }
};
