import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { UserRole } from "./userole";
import { Session } from "./sesion";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  state: boolean;

  @Column({ nullable: true })
  registeredByUserId: number;

  @Column({ type: 'bytea', nullable: true })
  foto: Buffer;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => UserRole, userRole => userRole.user)
  roles: UserRole[];

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];
}