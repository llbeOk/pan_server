import { Module, ConsoleLogger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { File } from './models/file.entity';
import { FileResolver } from './file.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [ConsoleLogger, FileService, FileResolver],
  exports: [FileService],
})
export class FileModule {}
