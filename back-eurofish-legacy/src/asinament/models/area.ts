import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Asignacion } from "./asignacion";

@Entity("isentive_tareas")
export class Area extends BaseEntity {
  @PrimaryGeneratedColumn()
  areaid: number;

  @Column({ length: 50 })
  nombre_area: string;

  @Column({ length: 10 })
  cod_area: string;


  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @OneToMany(() => Asignacion, asignacion => asignacion.area)
  asignaciones: Asignacion[];
}
