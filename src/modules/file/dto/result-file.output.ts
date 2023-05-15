import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { FileType } from './file.type';

@ObjectType()
export class FileResult extends createResult(FileType) {}
@ObjectType()
export class FileResults extends createResults(FileType) {}
