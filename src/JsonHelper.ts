import { jsmin } from 'jsmin';

import { IVulcanConfig } from './interfaces/IVulcanConfig'

export class JsonHelper {

    /*
     * Metoda czyści JSON'a z komentarzy
     * które uniemożliwiają parsowanie
     */
    parse(json: string): IVulcanConfig {
        const jsonMinimalized = jsmin(json);

        return <IVulcanConfig>JSON.parse(jsonMinimalized);
    }

}