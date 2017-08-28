import * as fs from 'fs';

export class FileHelper {

    async readFile(path): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        }).then((data: string) => { return data; });
    }

}