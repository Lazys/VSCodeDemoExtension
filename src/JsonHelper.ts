import { jsmin } from 'jsmin';

import { VulcanConfig } from './VulcanConfig'

export class JsonHelper {

    /*
     * Metoda czyści JSON'a z komentarzy
     * które uniemożliwiają parsowanie
     */
    parse(json: string): VulcanConfig {
        const jsonMinimalized = jsmin(json);

        return <VulcanConfig>JSON.parse(jsonMinimalized);
    }

}