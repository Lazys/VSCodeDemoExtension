import * as vscode from 'vscode';

export class DefinitionProvider {

    provideDefinition(document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken): vscode.ProviderResult<null> {

        let a = document.getText();
        let b = document.getWordRangeAtPosition(position);

        return null;

    }

}