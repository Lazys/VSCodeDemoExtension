import * as vscode from 'vscode';
import * as path from 'path';

import { FileHelper } from './FileHelper'
import { JsonHelper } from './JsonHelper'
import { IVulcanConfig } from './interfaces/IVulcanConfig'
import { VulcanSettings } from './VulcanSettings'
import { LogHelper } from './LogHelper'

export class VulcanExtensionManager {

    private _fileHelper: FileHelper;
    private _jsonHelper: JsonHelper;

    constructor() {
        this._fileHelper = new FileHelper();
        this._jsonHelper = new JsonHelper();
    }

    async loadConfigFile(): Promise<IVulcanConfig> {
        try {
            const json = await this._fileHelper.readFile(vscode.workspace.rootPath + VulcanSettings.vulcanConfigFilePath);

            return this._jsonHelper.parse(json);
        } catch (error) {

            LogHelper.logError(`error while loading vulcan config file: ${(<Error>error).message}`);

            return null;
        }
    }

}