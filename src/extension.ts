'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { VulcanDefinitionProvider } from './VulcanDefinitionProvider'
import { VulcanExtensionManager } from './VulcanExtensionManager'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    const vulcanExtensionManager = new VulcanExtensionManager();
    const vulcanConfig = await vulcanExtensionManager.loadConfigFile();

    if (vulcanConfig !== null) {

        console.log('VULCAN ExtJS extension has been activated.');

        const filter = { language: 'javascript', scheme: 'file' };

        context.subscriptions.push(
            vscode.languages.registerDefinitionProvider(filter, new VulcanDefinitionProvider(vulcanConfig))
        );

    } else {
        console.log('VULCAN ExtJS extension has not been activated.');
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}