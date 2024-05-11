import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './modules/persistence/db.config';
import { MongodbModule } from './modules/persistence';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    MongodbModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
