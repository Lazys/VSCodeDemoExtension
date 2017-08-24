import * as vscode from 'vscode';

export class VulcanDefinitionProvider {

    provideDefinition(document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken): vscode.ProviderResult<null> {

        let a = document.getText();
        let b = document.getWordRangeAtPosition(position);
        let c = document.getText(b);

        return null;

    }

}