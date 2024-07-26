import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Empleado } from "./empleado";
import { Asignacion } from "./asignacion";

@Entity("isentive_tactividades")
export class Actividad extends BaseEntity {
  @PrimaryGeneratedColumn()
   actividadid: number;

  @Column({ length: 50 })
  actividadname: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  update_at: Date;

  @OneToMany(() => Asignacion, asignacion => asignacion.actividad)
  asignaciones: Asignacion[];
}