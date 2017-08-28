import * as vscode from 'vscode';

import { FileHelper } from './FileHelper'
import { JsonHelper } from './JsonHelper'
import { VulcanConfig } from './VulcanConfig'

export class VulcanExtensionManager {

    private _fileHelper: FileHelper;
    private _jsonHelper: JsonHelper;

    private _vulcanConfigFileLocation: string;

    constructor() {
        this._fileHelper = new FileHelper();
        this._jsonHelper = new JsonHelper();

        this._vulcanConfigFileLocation = '/.vscode/vulcan.json';
    }

    async loadConfigFile(): Promise<VulcanConfig> {
        try {
            const json = await this._fileHelper.readFile(vscode.workspace.rootPath + this._vulcanConfigFileLocation);

            return this._jsonHelper.parse(json);
        } catch (error) {
            return null;
        }
    }

}