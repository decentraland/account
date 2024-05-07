import { Env, createConfig } from '@dcl/ui-env'
import dev from './env/dev.json'
import prod from './env/prod.json'
import stg from './env/stg.json'

export const config = createConfig(
  {
    [Env.DEVELOPMENT]: dev,
    [Env.STAGING]: stg,
    [Env.PRODUCTION]: prod
  },
  {
    systemEnvVariables: {
      REACT_APP_DCL_DEFAULT_ENV: process.env.VITE_REACT_APP_DCL_DEFAULT_ENV
    }
  }
)
