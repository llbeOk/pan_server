import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import {FileModule} from './modules/file/file.module'
import { ShareModule } from './modules/share/share.module';
import { FollowModule } from './modules/follow/follow.module';
// import {AuthModule} from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type:'mysql',
        host:'localhost',
        port:3306,
        username:'root',
        password:'123456',
        database:'pan',
        entities:[`${__dirname}/../modules/**/*.entity{.ts,.js}`],
        logging:true,
        synchronize:true,
        autoLoadEntities:true
      }
    ),
    GraphQLModule.forRoot(
      {
        driver:ApolloDriver,
        autoSchemaFile:true,
      }
    ),
    UserModule,
    FileModule,
    ShareModule,
    FollowModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
