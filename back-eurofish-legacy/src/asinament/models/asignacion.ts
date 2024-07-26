import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Empleado } from "./empleado";
import { Linea } from "./linea";
import { AsignacionTipoAsignacion } from "./asignacionTipoAsginacion";

import { Area } from "./area";
import { Turno } from "./turno";
import { Actividad } from "./actividad";
import { Marcaje } from "./marcaje";

@Entity("isentive_tasignaciones")
export class Asignacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  asignacionid: number;

  @Column()
  lineaid: number;

  @Column()
  empleadoid: number;

  @Column()
  actividadid: number;

  @Column()
  areaid: number;

  @Column()
  turnoid: number;


  @Column()
  registeredByUserId: number;

  @Column()
  estado: boolean;

  @Column()
  fecha_ariel: Date;

  @Column({ type: 'time' })
  hora_asignacion: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" , nullable: true })
  update_at: Date;

  @OneToMany(() => AsignacionTipoAsignacion, asignacionTipoAsignacion => asignacionTipoAsignacion.asignacion)
  asignacionTipoAsignaciones: AsignacionTipoAsignacion[];

  @ManyToOne(() => Linea, linea => linea.asignaciones)
  @JoinColumn({ name: "lineaid" })
  linea: Linea;

  @ManyToOne(() => Area, area => area.asignaciones)
  @JoinColumn({ name: "areaid" })
  area: Area;
  
  @ManyToOne(() => Actividad, actividad => actividad.asignaciones)
  @JoinColumn({ name: "actividadid" })
  actividad: Actividad;


  @ManyToOne(() => Turno, turno => turno.asignaciones)
  @JoinColumn({ name: "turnoid" })
  turno: Turno;

  @ManyToOne(() => Empleado, empleado => empleado.asignaciones)
  @JoinColumn({ name: "empleadoid" })
  empleado: Empleado;

  @OneToMany(() => Marcaje, marcaje => marcaje.asignacion)
  marcaje: Marcaje[];
}
