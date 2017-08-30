import * as vscode from 'vscode';

import { IVulcanConfig } from './interfaces/IVulcanConfig'
import { ExtJsDefinitionsHelper } from './ExtJsDefinitionsHelper'
import { LogHelper } from './LogHelper'
import { LogLevelEnum } from "./enums/LogLevelEnum";

export class VulcanDefinitionProvider implements vscode.DefinitionProvider {

    private _config: IVulcanConfig;
    private _extJsDefinitionsHelper: ExtJsDefinitionsHelper;

    constructor(config: IVulcanConfig) {
        this._config = config;
        this._extJsDefinitionsHelper = new ExtJsDefinitionsHelper();
    }

    async provideDefinition(document: vscode.TextDocument, position: vscode.Position,
        token: vscode.CancellationToken) {
        try {
            const selectedDefinition = this._extJsDefinitionsHelper.getCorrectSelectedDefinition(
                document, position, this._config);

            if (selectedDefinition === null) {
                // Prawidłowa definicja nie została odnaleziona w tekście,
                // w który kliknął użytkownik
                LogHelper.logInfo('VulcanDefinitionProvider - definition not found.', LogLevelEnum.debug);

                return null;
            }

            const path = this._extJsDefinitionsHelper.convertToPath(selectedDefinition, this._config);

            return new vscode.Location(vscode.Uri.file(path), new vscode.Position(0, 0));
        } catch (error) {
            LogHelper.logError(`error while providing definition: ${(<Error>error).message}`);

            return null;
        }
    }

}