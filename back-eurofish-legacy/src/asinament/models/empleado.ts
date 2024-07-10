import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Cargo } from "./cargo";
import { Asignacion } from "./asignacion";

@Entity("isentive_templeados")
export class Empleado extends BaseEntity {
  @PrimaryGeneratedColumn()
  empleadoid: number;



  @Column({ length: 100 })
  nombre: string;

  
  @Column()
  cod_persona: string;

  @Column({ length: 100 })
  ci: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" , nullable: true })
  update_at: Date;

  @OneToMany(() => Asignacion, asignacion => asignacion.empleado)
  asignaciones: Asignacion[];

  
}