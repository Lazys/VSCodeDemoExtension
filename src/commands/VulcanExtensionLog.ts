import * as vscode from 'vscode';

import { VulcanExtensionManager } from '../VulcanExtensionManager'
import { VulcanSettings } from '../VulcanSettings'

export class VulcanExtensionLog {

    async showLog(context: vscode.ExtensionContext) {
        return new Promise((resolve, reject) => {
            let logFile = VulcanSettings.logsFilePath;

            vscode.workspace
                .openTextDocument(vscode.Uri.file(logFile))
                .then(doc => vscode.window.showTextDocument(doc).then(editor => {
                    if (editor) {
                        resolve(editor);
                    }
                    else {
                        resolve(null);
                    }
                }));
        });
    }

}