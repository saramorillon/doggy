import { config } from './src/config'

export = {
  type: 'sqlite',
  database: config.database,
  entities: ['src/database/entity/*.ts'],
  migrations: ['src/database/migration/*.ts'],
  subscribers: ['src/database/subscriber/*.ts'],
  synchronize: false,
  logging: true,
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
}
