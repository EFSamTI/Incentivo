import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Asignacion } from "./asignacion";
import { TipoAsignacion } from "./tipoAsignacion";

@Entity("isentive_tasignacion_tipo_asignacion")
export class AsignacionTipoAsignacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  asignacion_tipo_asignacion_id: number;

  @Column()
  tipoid: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @ManyToOne(() => Asignacion, asignacion => asignacion.asignacionTipoAsignaciones)
  @JoinColumn({ name: "asignacionid" })
  asignacion: Asignacion;

  @ManyToOne(() => TipoAsignacion, tipoAsignacion => tipoAsignacion.asignacionTipoAsignaciones)
  @JoinColumn({ name: "tipoid" })
  tipoAsignacion: TipoAsignacion;
}