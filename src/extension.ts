'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { VulcanDefinitionProvider } from './VulcanDefinitionProvider'
import { VulcanExtensionManager } from './VulcanExtensionManager'
import { LogHelper } from './LogHelper'

import { VulcanExtensionLog } from './commands/VulcanExtensionLog'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    // Rejestrujemy komendę do odczytywania logów
    vscode.commands.registerCommand('extension.vscode-vulcanextjs.showLogs', new VulcanExtensionLog().showLog);

    // Ładujemy plik konfiguracyjny z otworzonego przez użytkownika folderu
    const vulcanExtensionManager = new VulcanExtensionManager();
    const vulcanConfig = await vulcanExtensionManager.loadConfigFile();

    // Jeżeli plik został znaleziony to rejestrujemy dalsze funkcjonalności
    if (vulcanConfig !== null) {
        LogHelper.logInfo('VULCAN ExtJS extension has been activated.');

        const filter = { language: 'javascript', scheme: 'file' };

        context.subscriptions.push(
            vscode.languages.registerDefinitionProvider(filter, new VulcanDefinitionProvider(vulcanConfig))
        );
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}