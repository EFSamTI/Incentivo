import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ConfigRequest } from "./config-request";

@Entity("config_Tipo")
export class ConfigTipo extends BaseEntity {
  @PrimaryGeneratedColumn()
  tipoid: number;

  @Column( { nullable: true })
  nombre_tipo: string;

  @Column( { nullable: true })
  url: string;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updateAt: Date;

  @OneToMany(() => ConfigRequest, configRequest => configRequest.tipoRequest)
    configRequest: ConfigRequest;
}