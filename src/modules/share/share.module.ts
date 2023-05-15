import { Module, ConsoleLogger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareService } from './share.service';
import { Share } from './models/share.entity';
import { ShareResolver } from './share.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Share])],
  providers: [ConsoleLogger, ShareService, ShareResolver],
  exports: [ShareService],
})
export class ShareModule {}
