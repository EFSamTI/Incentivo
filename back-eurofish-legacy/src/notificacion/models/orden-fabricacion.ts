import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { OrdenFabricacionRecurso } from "./orden-fabricacion-recurso";
import { OrdenFabricacionTipoIngreso } from "./orden-fabricacion-tipo-ingreso";

@Entity("orden_fabricacion")
export class OrdenFabricacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  orden_fabricacion_id: number;

  @Column({ nullable: false })
  numero_orden: string;

  @Column({ nullable: true })
  nivel_orden: string;

  @Column({ nullable: true })
  estado: boolean;

  @Column()
  tipo_ingreso_id: number;

  @Column({ nullable: true })
  id_ordenpadre: number;

  @Column({ nullable: true })
  registeredByUserId: number;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => OrdenFabricacionRecurso, ordenFabricacionRecurso => ordenFabricacionRecurso.ordenFabricacion)
  recursos: OrdenFabricacionRecurso[];

  @ManyToOne(() => OrdenFabricacionTipoIngreso, tipo_ingreso => tipo_ingreso.tipo_ingreso)
  @JoinColumn({ name: "tipo_ingreso_id" })
  tipo_ingreso: OrdenFabricacionTipoIngreso;

}
