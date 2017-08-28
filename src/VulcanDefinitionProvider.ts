import * as vscode from 'vscode';

import { VulcanConfig } from './VulcanConfig'
import { ExtJsDefinitionsHelper } from './ExtJsDefinitionsHelper'

export class VulcanDefinitionProvider implements vscode.DefinitionProvider {

    private _config: VulcanConfig;
    private _extJsDefinitionsHelper: ExtJsDefinitionsHelper;

    constructor(config: VulcanConfig) {
        this._config = config;
        this._extJsDefinitionsHelper = new ExtJsDefinitionsHelper();
    }

    async provideDefinition(document: vscode.TextDocument, position: vscode.Position,
        token: vscode.CancellationToken) {

        const selectedDefinition = this._extJsDefinitionsHelper.getCorrectSelectedDefinition(
            document, position, this._config);

        if (selectedDefinition === null) {
            // Prawidłowa definicja nie została odnaleziona w tekście,
            // w który kliknął użytkownik

            return null;
        }

        const path = this._extJsDefinitionsHelper.convertToPath(selectedDefinition, this._config);

        return new vscode.Location(vscode.Uri.file(path), new vscode.Position(0, 0));
    }

}