export enum LogLevelEnum {
    none = 0,
    default = 1 << 0,
    debug = LogLevelEnum.default | 1 << 1
}