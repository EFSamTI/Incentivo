import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrdenFabricacion } from "./orden-fabricacion";

@Entity("orden_fabricacion_produccion")
export class OrdenFabricacionProduccion extends BaseEntity {
  @PrimaryGeneratedColumn()
  orden_fabricacion_produccion_id: number;

  @Column({ nullable: false })
  orden_fabricacion_id: number;

  @ManyToOne(() => OrdenFabricacion)
  @JoinColumn({ name: "orden_fabricacion_id" })
  ordenFabricacion: OrdenFabricacion;

  @Column({ type: "timestamp", nullable: true })
  fecha_produccion: Date;

  @Column({ nullable: true })
  turno_id: number;

  @Column({ nullable: true })
  registeredByUserId: number;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}