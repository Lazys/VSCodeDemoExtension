## Funkcjonalności

1. Nawigacja między plikami ExtJS przy pomocy opcji "Go to definition" (również przy pomocy skrótu `F12`, bądź kombinacji `Ctrl+LPM`).
2. Wyświetlenie logów przy pomocy komendy __Show Vulcan Ext JS Plugin Log File__ (komendę wpisujemy w oknie poleceń `Ctrl+Shift+P`).

## Wymagania

1. Visual studio code od wersji 1.15.0.
2. Podfolder __.vscode__ wraz z plikiem __vulcan.json__ w folderze, który otwieramy w VS Code. Struktura pliku __vulcan.json__: 
    `{
        "applicationName": "Vulcan.Delfy",
	    "applicationFolder": "./"
    }`. 
    * applicationName - nazwa aplikacji ExtJS zgodna z wartością z app.js,
    * applicationFolder - relatywna ścieżka do folderu zawierającego aplikację ExtJS (foldery controller, store, model, view itd.) względem lokalizacji otwartej w VS Code.

## Ustawienia rozszerzenia

Dostępne ustawienia do nadpisania w File -> Preferences -> Settings:

* `vulcanextjs.loglevel` - dotyczy poziomu szczegółowości logowania informacji. Przyjmuje wartości:
    * `none` - żadne informacje nie będą logowane,
    * `default` - podstawowe informacje wraz z ewentualnymi błędami,
    * `debug` - wszystkie podstawowe oraz dodatkowe informacje o przebiegu programu (używać w przypadku nieprawidłowego działania rozszerzenia).
    
    Domyślnie ustawiona jest wartośc `default`.


## Informacje o wersji

### 1.0.0

Wydanie rozszerzenia.

## Informacje dotyczące developmentu

* Wszelkie informacje związane z developmentem znaleźć można na [stronie poświęconej budowaniu rozszerzeń do VS Code](https://code.visualstudio.com/docs/extensions/overview).

Informacje dodatkowe:

* Rozszerzenie po zainstalowaniu w VS Code w systemie operacyjnym Windows znajduje się w lokalizacji `%USERPROFILE%\.vscode\extensions`.
* Logi w systemie operacyjnym Windows znajdują się w lokalizacji `%USERPROFILE%\.vulcan\VSCode` (są to te same, które można wyświetlić w VS Code korzystając z komendy `Show Vulcan Ext JS Plugin Log File`).
* Rozszerzenie można debugować przy pomocy klawisza `F5`. Należy pamiętać, aby w VS Code otworzyć główny folder zawierający rozszerzenie tak, aby jednym z bezpośrednich podfolderów był folder `.vscode`. 
* W celu realizacji bardziej zaawansowanych funkcjonalności w przyszłości można zastanowić się nad wykorzystaniem [TernJS](http://ternjs.net/), bądź rozszerzeniem wykorzystywanego natywnie przez VS Code [tsservice](https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview).
* Istnieje również gotowy plugin od Sencha, który dostarcza podstawowe funkcjonalności związane z ExtJS do VS Code. Plugin ten jednak wymaga licencji dla każdego dewelopera. Można jednak zainstalować rozszerzenie w wersji trial i podejrzeć wszystkie jego pliki w lokalizacji `%USERPROFILE%\.vscode\extensions`.