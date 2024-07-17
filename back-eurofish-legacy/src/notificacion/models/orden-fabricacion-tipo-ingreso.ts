
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { OrdenFabricacion } from "./orden-fabricacion";

@Entity("orden_fabricacion_tipo_ingreso")
export class OrdenFabricacionTipoIngreso extends BaseEntity {
  @PrimaryGeneratedColumn()
  orden_fabricacion_tipo_ingresoid: number;

  @Column({ length: 50 })
  descripcion: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => OrdenFabricacion, OrdenFabricacion => OrdenFabricacion.tipo_ingreso)
 tipo_ingreso: OrdenFabricacion[];

}