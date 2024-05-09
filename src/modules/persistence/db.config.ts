import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      connection: process.env.DB_CONNECTION,
      host_local: process.env.DB_HOST,
      host_production: process.env.DB_HOST_PRODUCTION,
      name: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    env: process.env.NODE_ENV || 'local',
  };
  return dbConfig;
});
