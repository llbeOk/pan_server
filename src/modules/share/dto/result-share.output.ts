import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { ShareType } from './share.type';

@ObjectType()
export class ShareResult extends createResult(ShareType) {}
@ObjectType()
export class ShareResults extends createResults(ShareType) {}
