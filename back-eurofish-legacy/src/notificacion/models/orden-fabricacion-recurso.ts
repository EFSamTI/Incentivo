import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { OrdenFabricacion } from "./orden-fabricacion";
import { OrdenFabricacionConsumo } from "./orden-fabricacion-consumo";

@Entity("orden_fabricacion_recurso")
export class OrdenFabricacionRecurso extends BaseEntity {
  @PrimaryGeneratedColumn()
  orden_fabricacion_recurso_id: number;

  @Column({ nullable: false })
  orden_fabricacion_id: number;

  @ManyToOne(() => OrdenFabricacion, ordenFabricacion => ordenFabricacion.recursos)
  @JoinColumn({ name: "orden_fabricacion_id" })
  ordenFabricacion: OrdenFabricacion;

  @Column({ nullable: true })
  codigo: string;

  @Column({ type: "text", nullable: true })
  descripcion: string;

  @Column({ type: "numeric", nullable: true })
  cantidad_planificada: number;

  @Column({ type: "numeric", nullable: true })
  cantidad_completada: number;

  @Column({ type: "numeric", nullable: true })
  cantidad_rechazada: number;

  @Column({ nullable: true })
  um: string;

  @Column({ nullable: true })
  estado: boolean;

  @Column({ nullable: true })
  registeredByUserId: number;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;


  @OneToMany(() => OrdenFabricacionConsumo, ordenFabricacionConsumos => ordenFabricacionConsumos.ordenFabricacionRecurso)
  consumos: OrdenFabricacionConsumo[];
}