import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { UserRole } from "./userole";
import { RoleOption } from "./roleoption";

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ nullable: false })
  roleName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  registeredByUserId: number;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RoleOption, roleOption => roleOption.role)
  roleOptions: RoleOption[];
}