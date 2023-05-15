import { Follow } from './models/follow.entity';
import { Module, ConsoleLogger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [ConsoleLogger, FollowService, FollowResolver],
  exports: [FollowService],
})
export class FollowModule {}