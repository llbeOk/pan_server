import { ObjectType } from '@nestjs/graphql';
import { createResult, createResults } from '@/common/dto/result.type';
import { FollowType } from './follow.type';
@ObjectType()
export class FollowResult extends createResult(FollowType) {}
@ObjectType()
export class FollowResults extends createResults(FollowType) {}