import * as vscode from 'vscode';

import * as fs from "fs";

import { jsmin } from "jsmin";

export interface VulcanConfig {
    applicationName: string,
    applicationFolder: string
}

export class VulcanDefinitionProvider implements vscode.DefinitionProvider {

    async provideDefinition(document: vscode.TextDocument, position: vscode.Position,
        token: vscode.CancellationToken) { //: vscode.ProviderResult<vscode.Definition>

        // let documentText = document.getText();
        // let wordRange = document.getWordRangeAtPosition(position);
        // let word = document.getText(wordRange);

        let readFilePro = async (path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, 'utf8', function (err, data) {
                    if (err) {
                        reject(err);
                    }

                    resolve(data);
                });
            }).then((data: string) => { return data; });
        }

        let json = '';

        try {
            json = await readFilePro(vscode.workspace.rootPath + '/.vscode/vulcan.json');
        } catch (error) {
            return;
        }
    
        // Używamy jsmin, aby pozbyć się z JSON'a komentarzy itd.
        var jsonMinimalized = jsmin(json);
        let jsonObj = JSON.parse(jsonMinimalized);
        let vulcanConfig = <VulcanConfig>jsonObj;

        let line = document.lineAt(position),
            lineText = line.text;

        // Find string start mark

        let stringStartMarkExists = false,
            stringStartMarkCharacterIndex = 0;

        for (let index = position.character; index > 0; index--) {
            let element = lineText[index];

            if (element === '"' || element === "'") {
                stringStartMarkExists = true;
                stringStartMarkCharacterIndex = index + 1;

                break;
            }

        }

        // Find string end mark

        let stringEndMarkExists = false,
            stringEndMarkCharacterIndex = 0;

        for (let index = position.character; index < lineText.length; index++) {
            let element = lineText[index];

            if (element === '"' || element === "'") {
                stringEndMarkExists = true;
                stringEndMarkCharacterIndex = index;

                break;
            }

        }

        // Validate regex 

        if (stringStartMarkExists && stringEndMarkExists) {
            let selectedText = document.getText(
                new vscode.Range(
                    new vscode.Position(line.lineNumber, stringStartMarkCharacterIndex),
                    new vscode.Position(line.lineNumber, stringEndMarkCharacterIndex)
                )
            );

            let applicationName = vulcanConfig.applicationName;
            let applicationFolder = vulcanConfig.applicationFolder;

            // C:\Users\abystrek\Desktop\newApp\MyApp\app\view\main\MainController.js
            // 'MyApp.view.main.MainController'

            let pattern = new RegExp('\\w+(\\.+\\w+)+'),
                patternExists = pattern.test(selectedText);

            if (patternExists) {

                // Nawigujemy jedynie do plików z aktualnego projektu
                if (!selectedText.startsWith(applicationName)) {
                    return null;
                }

                let rootPath = vscode.workspace.rootPath;

                selectedText = selectedText.replace(applicationName, applicationFolder);
                selectedText = selectedText.replace(new RegExp('\\.', 'g'), '\\');

                let url = rootPath + selectedText;

                // Zmieniamy app name, który jest na początku każdej definicji na pełną ścieżkę
                // let url = selectedText.replace(applicationFolder, rootPath);

                // zamieniamy resztę kropek na \, aby uzyskać prawidłową ścieżkę
                // url = url.replace(new RegExp('\\.', 'g'), '\\');

                // dodajemy rozszerzenie pliku
                url = url + '.js';

                const uri = vscode.Uri.file(url);
                const position = new vscode.Position(0, 0);

                return new vscode.Location(uri, position);
            }

        }

        return null;

    }

}