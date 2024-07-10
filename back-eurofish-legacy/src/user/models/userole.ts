import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";

import { Role } from "./role";
import { User } from "./user";

@Entity("user_roles")
export class UserRole extends BaseEntity{
  @PrimaryGeneratedColumn()
  userRoleId: number;

  @ManyToOne(() => User, user => user.roles)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn({ name: "roleId" })
  role: Role;
}