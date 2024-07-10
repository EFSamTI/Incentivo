import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Parada } from "./parada";

@Entity("isentive_ttipo_parada")
export class TipoParada extends BaseEntity {
  @PrimaryGeneratedColumn()
  tipo_paradaid: number;

  @Column({ length: 50 })
  descripcion: string;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

  @OneToMany(() => Parada, Parada => Parada.tipoParada)
  tipoParada: Parada[];
}

