import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Asignacion } from "./asignacion";

@Entity("isentive_tturnos")
export class Turno extends BaseEntity {
  @PrimaryGeneratedColumn()
  turnoid: number;

  @Column({ length: 50 })
  nombre_turno: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @OneToMany(() => Asignacion, asignacion => asignacion.turno)
  asignaciones: Asignacion[];
}
