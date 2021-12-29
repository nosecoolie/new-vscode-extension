// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "my-new-extension" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "my-new-extension.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      var selection = editor.selection;
      var seletedText = editor.document.getText(selection);

      editor.edit((editBuilder) => {
        // implement cammel case logic here
        const camelText = seletedText
          .split("_")
          .filter((text) => text !== "_")
          .map((text, index) => {
            if (index === 0) return text;
            return text.charAt(0).toUpperCase() + text.slice(1);
          })
          .join("");
        editBuilder.replace(selection, camelText);
      });
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from my-new-extension!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
