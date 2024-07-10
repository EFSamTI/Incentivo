import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Asignacion } from "./asignacion";

@Entity("isentive_tlineas")
export class Linea extends BaseEntity {
  @PrimaryGeneratedColumn()
  lineaid: number;

  @Column({ length: 50 })
  nombrelinea: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @OneToMany(() => Asignacion, asignacion => asignacion.linea)
  asignaciones: Asignacion[];
}
