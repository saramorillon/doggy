import { cleanEnv, num, str, url } from 'envalid'
import path from 'path'

const env = cleanEnv(process.env, {
  APP_KEY: str(),
  LOG_LEVEL: str({ choices: ['debug', 'info', 'warn', 'error'], default: 'info' }),
  DB_DIR: str({ default: path.join(__dirname, '..', 'db', 'database.sqlite') }),
  APP_PORT: num({ default: 80 }),
  AGENT_URL: url(),
})

interface IConfig {
  environment?: string
  port: number
  keys: string[]
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  database: string
  agentUrl: string
}

export const config: IConfig = {
  environment: env.NODE_ENV,
  port: env.APP_PORT,
  keys: [env.APP_KEY],
  logLevel: env.LOG_LEVEL,
  database: env.DB_DIR,
  agentUrl: env.AGENT_URL,
}
