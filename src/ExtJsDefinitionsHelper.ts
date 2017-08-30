import * as vscode from 'vscode';

import { IVulcanConfig } from './interfaces/IVulcanConfig'
import { LogHelper } from "./LogHelper";
import { LogLevelEnum } from "./enums/LogLevelEnum";

export class ExtJsDefinitionsHelper {

    convertToPath(selectedString: string, config: IVulcanConfig): string {
        LogHelper.logInfo(`convertToPath - selectedString: ${selectedString}.`, LogLevelEnum.debug);

        let path = selectedString.replace(config.applicationName, config.applicationFolder);
        LogHelper.logInfo(`convertToPath - selectedString with replaced application name: ${path}.`, LogLevelEnum.debug);

        path = path.replace(new RegExp('\\.', 'g'), '\\');
        LogHelper.logInfo(`convertToPath - selectedString with replaced dots: ${path}.`, LogLevelEnum.debug);

        path = vscode.workspace.rootPath + path + '.js';
        LogHelper.logInfo(`convertToPath - path: ${path}.`, LogLevelEnum.debug);

        return path;
    }

    getCorrectSelectedDefinition(document: vscode.TextDocument, position: vscode.Position, config: IVulcanConfig): string {
        const line = document.lineAt(position);
        const lineText = line.text;

        const stringStartMarkCharIndex = this.findStringStartMark(lineText, position);
        const stringEndMarkCharIndex = this.findStringEndMark(lineText, position);

        if (!this.isString(stringStartMarkCharIndex, stringEndMarkCharIndex)) {
            // Miejsce, w które kliknął użytkownik nie jest stringiem
            LogHelper.logInfo('ExtJsDefinitionsHelper - string not found.', LogLevelEnum.debug);

            return null;
        }

        let selectedString = this.getSelectedString(document, line,
            stringStartMarkCharIndex, stringEndMarkCharIndex);

        let pattern = new RegExp('\\w+(\\.+\\w+)+'),
            patternExists = pattern.test(selectedString);

        if (!patternExists) {
            // Kliknięty string nie spełnia wzoru "abc.abc.abc"
            LogHelper.logInfo('ExtJsDefinitionsHelper - regex pattern not found.', LogLevelEnum.debug);

            return null;
        }

        if (!selectedString.startsWith(config.applicationName)) {
            // Kliknięta definicja nie należy do aktualnego projektu
            LogHelper.logInfo('ExtJsDefinitionsHelper - application name at the beginning not found.', LogLevelEnum.debug);

            return null;
        }

        return selectedString;
    }

    findStringStartMark(selectedLineText: string, position: vscode.Position): number {
        let stringStartMarkCharacterIndex = -1;

        for (let index = position.character; index > 0; index--) {
            let element = selectedLineText[index];

            if (element === '"' || element === "'") {
                stringStartMarkCharacterIndex = index + 1;

                break;
            }
        }

        return stringStartMarkCharacterIndex;
    }

    findStringEndMark(selectedLineText: string, position: vscode.Position): number {
        let stringEndMarkCharacterIndex = -1;

        for (let index = position.character; index < selectedLineText.length; index++) {
            let element = selectedLineText[index];

            if (element === '"' || element === "'") {
                stringEndMarkCharacterIndex = index;

                break;
            }
        }

        return stringEndMarkCharacterIndex;
    }

    isIndexCorrect(index: number): boolean {
        return index !== -1;
    }

    isString(stringStartMarkCharIndex: number, stringEndMarkCharIndex: number): boolean {
        return this.isIndexCorrect(stringStartMarkCharIndex) && this.isIndexCorrect(stringEndMarkCharIndex);
    }

    getSelectedString(document: vscode.TextDocument, line: vscode.TextLine, stringStartMarkCharIndex: number, stringEndMarkCharIndex: number): string {
        return document.getText(
            new vscode.Range(
                new vscode.Position(line.lineNumber, stringStartMarkCharIndex),
                new vscode.Position(line.lineNumber, stringEndMarkCharIndex)
            )
        );
    }

}