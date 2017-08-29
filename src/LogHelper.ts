import * as vscode from 'vscode';
import { Winston, transports, Logger, LoggerInstance } from 'winston'

import { VulcanSettings } from './VulcanSettings'
import { LogLevelEnum } from './enums/LogLevelEnum'

export class LogHelper {

    private static _logger: LoggerInstance;

    static initialize() {
        this._logger = new Logger();
        this._logger.configure({
            transports: [
                new transports.Console({
                    colorize: true
                }),
                new transports.File({
                    filename: VulcanSettings.logsFilePath,
                    json: false,
                    handleExceptions: true
                })
            ]
        });
    }

    static logInfo(message: string, logLevel: LogLevelEnum = LogLevelEnum.default): void {
        if (this.isSettingsLogLevelAppropriate(logLevel)) {
            this._logger.info(message);
        }
    }

    static logError(message: string, logLevel: LogLevelEnum = LogLevelEnum.default): void {
        if (this.isSettingsLogLevelAppropriate(logLevel)) {
            this._logger.error(message);
        }
    }

    private static isSettingsLogLevelAppropriate(logLevel: LogLevelEnum) {
        let settingsLogLevel = <string>vscode.workspace
            .getConfiguration(VulcanSettings.vulcanConfigurationSection)
            .get(VulcanSettings.vulcanConfigurationLogsSetting);

        let settingsLogLevelEnumValue = LogLevelEnum[settingsLogLevel];

        return (settingsLogLevelEnumValue & logLevel) === logLevel;
    }

}

LogHelper.initialize();    