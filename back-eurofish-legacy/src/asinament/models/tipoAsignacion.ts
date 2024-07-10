import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AsignacionTipoAsignacion } from "./asignacionTipoAsginacion";

@Entity("isentive_ttipo_asignacion")
export class TipoAsignacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  tipoid: number;

  @Column({ length: 50 })
  descripcion: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @OneToMany(() => AsignacionTipoAsignacion, asignacionTipoAsignacion => asignacionTipoAsignacion.tipoAsignacion)
  asignacionTipoAsignaciones: AsignacionTipoAsignacion[];
}

