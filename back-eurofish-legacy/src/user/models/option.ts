import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { RoleOption } from "./roleoption";

@Entity("options")
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  optionId: number;

  @Column({ nullable: false })
  optionName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  createdByUserId: number;


  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => RoleOption, roleOption => roleOption.option)
  roleOptions: RoleOption[];

  
}