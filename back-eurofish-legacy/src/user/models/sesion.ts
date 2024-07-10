import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";


@Entity("sessions")
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  sessionId: number;

  @Column({ nullable: false })
  loginTime: Date;

  @Column({ nullable: true })
  logoutTime: Date;

  @ManyToOne(() => User, user => user.sessions)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}