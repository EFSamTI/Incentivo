import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { OrdenFabricacionRecurso } from "./orden-fabricacion-recurso";


@Entity("orden_fabricacion_consumos")
export class OrdenFabricacionConsumo extends BaseEntity {

    @PrimaryGeneratedColumn()
    orden_fabricacion_consumo_id: number;
    
    @Column({ nullable: false })
    orden_fabricacion_recurso_id: number;


    @Column({ type: "text", nullable: true })
    item_nombre: string;

    @Column({ type: "numeric", nullable: true })
    cantidad_planificada: number;

    @Column({ type: "numeric", nullable: true })
    cantidad_usada: number;

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
  

    @ManyToOne(() => OrdenFabricacionRecurso, ordenFabricacionRecurso => ordenFabricacionRecurso.consumos)
    @JoinColumn({ name: "orden_fabricacion_recurso_id" })
    ordenFabricacionRecurso: OrdenFabricacionRecurso;

}