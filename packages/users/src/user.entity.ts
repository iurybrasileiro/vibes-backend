import { Exclude } from 'class-transformer'
import { addDays } from 'date-fns'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { VISIBILITY } from './enums'
import { hashPassword } from './utils'
import { generateCode } from './utils/common'

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @Column({ type: 'date' })
  birthdate: Date

  @Column({ nullable: true })
  bio: string

  @Column({ nullable: true })
  profile_picture: string

  @Column({ nullable: true })
  cover_picture: string

  @Column({ nullable: true })
  phone: string

  @Column({ type: 'enum', enum: VISIBILITY, enumName: 'visibility' })
  visibility: VISIBILITY

  @Column({ default: false })
  verificated: boolean

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  verification_code: string

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  verification_code_expires_in: Date

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  reset_password_code: string

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  reset_password_code_expires_in: Date

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  refresh_token: string

  @Column({ default: false })
  disabled: boolean

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hashPassword(this.password)
    this.verification_code = generateCode()
    this.verification_code_expires_in = addDays(new Date(), 1)
    this.visibility = VISIBILITY.PUBLIC
  }
}
