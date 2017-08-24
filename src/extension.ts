'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { VulcanDefinitionProvider } from './VulcanDefinitionProvider'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    vscode.window.showInformationMessage('Extension has been activated!');

    const filter = { language: 'javascript', scheme: 'file' };

    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(filter, new VulcanDefinitionProvider())
    );

}

// this method is called when your extension is deactivated
export function deactivate() {
}