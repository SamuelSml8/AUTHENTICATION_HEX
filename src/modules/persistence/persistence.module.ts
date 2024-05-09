import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import dbConfig from './db.config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const uriDb =
          env === process.env.ENVIRONMENT
            ? `${db.connection}${db.host_local}${db.name}`
            : `mongodb+srv://${db.user}:${db.password}${db.host_production}/${db.name}?retryWrites=true&w=majority`;
        return { uri: uriDb };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class MongodbModule {}
