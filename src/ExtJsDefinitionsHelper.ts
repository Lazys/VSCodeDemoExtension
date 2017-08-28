import * as vscode from 'vscode';

export class ExtJsDefinitionsHelper {

    convertToPath(selectedString, config): string {
        let path = selectedString.replace(config.applicationName, config.applicationFolder);
        path = path.replace(new RegExp('\\.', 'g'), '\\');
        path = vscode.workspace.rootPath + path + '.js';

        return path;
    }

    getCorrectSelectedDefinition(document, position, config): string {
        const line = document.lineAt(position);
        const lineText = line.text;

        const stringStartMarkCharIndex = this.findStringStartMark(lineText, position);
        const stringEndMarkCharIndex = this.findStringEndMark(lineText, position);

        if (!this.isString(stringStartMarkCharIndex, stringEndMarkCharIndex)) {
            // Miejsce, w które kliknął użytkownik nie jest stringiem

            return null;
        }

        let selectedString = this.getSelectedString(document, line,
            stringStartMarkCharIndex, stringEndMarkCharIndex);

        let pattern = new RegExp('\\w+(\\.+\\w+)+'),
            patternExists = pattern.test(selectedString);

        if (!patternExists) {
            // Kliknięty string nie spełnia wzoru "abc.abc.abc"

            return null;
        }

        if (!selectedString.startsWith(config.applicationName)) {
            // Kliknięta definicja nie należy do aktualnego projektu

            return null;
        }

        return selectedString;
    }

    findStringStartMark(selectedLineText, position): number {
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

    findStringEndMark(selectedLineText, position): number {
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

    isIndexCorrect(index): boolean {
        return index !== -1;
    }

    isString(stringStartMarkCharIndex, stringEndMarkCharIndex): boolean {
        return this.isIndexCorrect(stringStartMarkCharIndex) && this.isIndexCorrect(stringEndMarkCharIndex);
    }

    getSelectedString(document, line, stringStartMarkCharIndex, stringEndMarkCharIndex): string {
        return document.getText(
            new vscode.Range(
                new vscode.Position(line.lineNumber, stringStartMarkCharIndex),
                new vscode.Position(line.lineNumber, stringEndMarkCharIndex)
            )
        );
    }

}