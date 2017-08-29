import * as os from 'os';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

export class VulcanSettings {

    private static _settingsDir: string;

    static get settingsDir() {
        if (this._settingsDir) {
            return this._settingsDir;
        }

        switch (os.platform()) {
            case 'win32':
                this._settingsDir = path.join(process.env.USERPROFILE, '.vulcan', 'VSCode');
                break;
            case 'darwin':
                this._settingsDir = path.join(process.env.HOME, 'Library', 'Application Support', 'Vulcan', 'VSCode');
                break;
            case 'linux':
                this._settingsDir = path.join(process.env.HOME, '.local', 'share', 'data', 'Vulcan', 'VSCode');
                break;
            default:
                throw 'Platform is not supported!';
        }

        mkdirp.sync(this._settingsDir);

        return this._settingsDir;
    }

    static get logsFilePath() {
        return path.join(this.settingsDir, 'vulcanextjs.log');
    }

    static get vulcanConfigFilePath() { return '/.vscode/vulcan.json'; }

    static get vulcanConfigurationSection() { return 'vulcanextjs'; }

    static get vulcanConfigurationLogsSetting() { return 'loglevel'; }

}