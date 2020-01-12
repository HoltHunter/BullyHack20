normalFinal = function(command, editor) {
    command = command.toLowerCase();
    console.log(command);

    command = command.trim()

    session = editor.getSession();

    substitutions = {
        "go to ending": function() {editor.navigateFileEnd()},
        "go to start": function() {editor.navigateFileStart()},
        "line ending": function() {editor.navigateLineEnd()},
        "line beginning": function() {editor.navigateLineStart()},
        "right": function() {editor.navigateRight(new Number(1))},
        "left" : function() {editor.navigateLeft(new Number(1))},
        "select all": function() {editor.selectAll()},
        "undo": function() {editor.undo()}
    };

    if (command in substitutions)
    {
      substitutions[command]();
    }
};
