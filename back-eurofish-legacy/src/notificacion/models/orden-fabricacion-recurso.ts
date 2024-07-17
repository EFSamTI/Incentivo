import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrdenFabricacion } from "./orden-fabricacion";

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
  codigo_posicion: string;

  @Column({ type: "text", nullable: true })
  descripcion: string;

  @Column({ type: "numeric", nullable: true })
  cantidad: number;

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
}