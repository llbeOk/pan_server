import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件
 */
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '昵称',
    default: '',
  })
  @IsNotEmpty()
  name: string;
  @Column({
    comment: '密码',
    default: '',
  })
  @IsNotEmpty()
  password: string;

  @Column({
    comment: '手机号',
    nullable: true,
  })
  tel: string;
}
