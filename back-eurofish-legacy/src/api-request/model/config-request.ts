import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ConfigAmbiente } from "./ambiente";
import { ConfigTipo } from "./tipo";

@Entity("config_request")
export class ConfigRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  source: string;

  @Column({ nullable: true })
  ambienteid: string;

  
  @Column({ nullable: true })
  tipoid: string;

  @Column({ nullable: true })
  destination: string;

  @Column({ nullable: true })
  operation: string;

  @Column({ nullable: true })
  verb: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  state: boolean;


  
  @Column({ nullable: true })
  registeredByUserId: number;


  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updateAt: Date;

  @ManyToOne(() => ConfigAmbiente, configAmbiente => configAmbiente.configRequest)  
  @JoinColumn({ name: "ambienteid" })
  ambiente: ConfigAmbiente;

  @ManyToOne(() => ConfigTipo, configTipo => configTipo.configRequest)
  @JoinColumn({ name: "tipoid" })
  tipoRequest: ConfigTipo;



}
