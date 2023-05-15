import { ACCOUNT_EXIST, ACCOUNT_NOT_EXIST, LOGIN_ERROR, REGISTER_ERROR, SUCCESS, UPDATE_ERROR } from './../../common/constants/code';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user.type';
import { UserService } from './user.service';
import { Result } from '@/common/dto/result.type';
import * as md5 from 'md5';
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => Boolean, { description: '新增用户' })
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Query(() => UserType, { description: '使用 ID 查询用户' })
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.find(id);
  }


  @Query(() => UserType, { description: '使用 Name 查询用户' })
  async findByName(@Args('name') name: string): Promise<UserType> {
    return await this.userService.findByName(name);
  }

  @Query(() => UserType, { description: '使用 ID 查询用户' })
  async getUserInfoByname(@Context() cxt: any): Promise<UserType> {
    const name = cxt.req.user.name;
    return await this.userService.find(name);
  }

  @Mutation(() => Result, { description: '更新用户' })
  async updateUserInfo(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<Result> {
    const res = await this.userService.update(id, params);
    if (res) {
      return {
        code: SUCCESS,
        message: '更新成功',
      };
    }
    return {
      code: UPDATE_ERROR,
      message: '更新失败',
    };
  }

  @Mutation(() => Boolean, { description: '删除一个用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }
  @Mutation(() => Result, { description: '登录' })
  async login(
    @Args('name') name: string,
    @Args('password') password: string,
  ): Promise<Result> {

    const user = await this.userService.findByName(name);
    if (!user) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '用户不存在',
      };
    }
    // 需要对密码进行 md5 加密
    if (user.password === md5(password)) {
      return {
        code: SUCCESS,
        message: '登录成功',
        data:user.name
      };
    }
    return {
      code: LOGIN_ERROR,
      message: '登录失败，账号或者密码不对',
    };
  }
  @Mutation(() => Result, { description: '用户注册' })
  async register(
    @Args('name') name: string,
    @Args('password') password: string,
  ): Promise<Result> {
    const user = await this.userService.findByName(name);
    if (user) {
      return {
        code: ACCOUNT_EXIST,
        message: '账号已经存在，请使用其他账号',
      };
    }
    const res = await this.userService.create({
      name,
      password: md5(password),
    });
    if (res) {
      return {
        code: SUCCESS,
        message: '注册成功',
      };
    }
    return {
      code: REGISTER_ERROR,
      message: '注册失败',
    };
  }
}
