import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Role } from "./role";
import { Option } from "./option";

@Entity("role_options")
export class RoleOption extends BaseEntity{
  @PrimaryGeneratedColumn()
  roleOptionId: number;

  @ManyToOne(() => Role, role => role.roleOptions)
  @JoinColumn({ name: "roleId" })
  role: Role;

  @ManyToOne(() => Option, option => option.roleOptions)
  @JoinColumn({ name: "optionId" })
  option: Option;
}