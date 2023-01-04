export type ENV = 'dev' | 'prod'
export type ConfigItem<T> = {
  [key in ENV]: T
}
export type Config = {
  getUrl: ConfigItem<(tid: string, arg: string, mode: 'sid' | 'pid') => string>
}
