import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '@birds-gate/util-interfaces';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    name: 'refresh_token_hash',
    default: null,
    nullable: true,
  })
  refreshTokenHash: string | null;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
