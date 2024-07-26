import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Asignacion } from "./asignacion";

@Entity("isentive_tmarcaje")
export class Marcaje extends BaseEntity {
  @PrimaryGeneratedColumn()
  marcajeid: number;

  @Column()
  asignacionid: number;

  @Column()
  tipo: string;

  @Column()
  codigo: string;
  
  @Column({ type: "timestamp" })
  hora: Date;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @ManyToOne(() => Asignacion, asignacion => asignacion.marcaje)
  @JoinColumn({ name: "asignacionid" })
  asignacion: Asignacion;
}