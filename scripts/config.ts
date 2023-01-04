import type { Config } from './types'
export const config: Config = {
  getUrl: {
    dev: (tid, val, mode) => `http://localhost:8080/${tid}/${mode}/${val}`,
    prod: (tid, val, mode) => `https://3nmpb89fj2.execute-api.ap-northeast-1.amazonaws.com/default/gen4-id-seed/from-${mode}?tid=${tid}&${mode}=${val}`,
  },
}
