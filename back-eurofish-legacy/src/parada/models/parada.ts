import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TipoParada } from "./tipoparada";



@Entity("isentive_tparada")
export class Parada extends BaseEntity {
  @PrimaryGeneratedColumn()
  paradaid: number;

  @Column()
  asignacionid: number;

  @Column()
  tipo_paradaid: number;

  @Column({ type: "timestamp" })
  hora_inicio: Date;
  
  @Column({ type: "timestamp" })
  hora_fin: Date;

  @Column()
  registeredByUserId: number;

  @ManyToOne(() => TipoParada, tipo => tipo.tipoParada)
  @JoinColumn({ name: "tipo_paradaid" })
  tipoParada: TipoParada;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true })
  update_at: Date;
}
