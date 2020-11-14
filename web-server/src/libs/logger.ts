import path from 'path'
import { createLogger, format, transports } from 'winston'
import { name } from '../../package.json'
import { config } from '../config'

const dirname = path.join(__dirname, '..', '..', 'logs')

type MaybeData = string | number | boolean | { message?: string; code?: string }

type MaybeConfig = string | number | boolean | { url?: string; method?: string }

type MaybeError = { message?: string; stack?: string; response?: { config?: MaybeConfig; data?: MaybeData } }

function parseErrorData(data?: MaybeData) {
  if (!data) {
    return {}
  }
  if (typeof data !== 'object') {
    return { data }
  }
  return { data: { message: data.message, code: data.code } }
}

function parseErrorConfig(config?: MaybeConfig) {
  if (!config) {
    return {}
  }
  if (typeof config !== 'object') {
    return { config }
  }
  return { config: { url: config.url, method: config.method } }
}

function parseError(error?: MaybeError) {
  if (!error) {
    return {}
  }
  if (error.message && error.stack) {
    const { message, stack } = error
    return {
      error: {
        message,
        stack,
        ...(error.response && {
          ...parseErrorData(error.response.data),
          ...parseErrorConfig(error.response.config),
        }),
      },
    }
  }
  return { error }
}

function errorFormat() {
  return format((info) => ({ ...info, ...parseError(info.error) }))()
}

function fileFormat() {
  return format.combine(errorFormat(), format.timestamp(), format.json())
}

function consoleFormat() {
  return format.combine(errorFormat(), format.timestamp(), format.colorize(), format.simple())
}

function fileTransport() {
  return new transports.File({ format: fileFormat(), dirname, filename: name, maxsize: 5242880, maxFiles: 5 })
}

function consoleTransport() {
  return new transports.Console({ format: consoleFormat() })
}

export const logger = createLogger({
  level: config.logLevel,
  transports: [fileTransport(), consoleTransport()],
  silent: config.environment === 'test',
})
