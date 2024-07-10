import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Asignacion } from "./asignacion";

@Entity("isentive_tasistencia")
export class Asistencia extends BaseEntity {
  @PrimaryGeneratedColumn()
  movimientoid: number;

  @Column()
  asignacionid: number;

@Column({ type: "time" })
hora_entrada: string;

@Column({ type: "time", nullable: true })
hora_salida: string;

  @Column({ type: "interval", nullable: true })
  tiempo_trabajo: any;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @ManyToOne(() => Asignacion, asignacion => asignacion.asistencia)
  @JoinColumn({ name: "asignacionid" })
  asignacion: Asignacion;
}