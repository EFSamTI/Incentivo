import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Empleado } from "./empleado";
import { Asignacion } from "./asignacion";

@Entity("isentive_tcargos")
export class Cargo extends BaseEntity {
  @PrimaryGeneratedColumn()
  cargoid: number;

  @Column({ length: 50 })
  cargoname: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  update_at: Date;

  @OneToMany(() => Asignacion, asignacion => asignacion.cargo)
  asignaciones: Asignacion[];
}