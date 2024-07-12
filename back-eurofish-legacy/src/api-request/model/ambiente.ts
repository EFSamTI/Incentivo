import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ConfigRequest } from "./config-request";

@Entity("config_ambiente")
export class ConfigAmbiente extends BaseEntity {
  @PrimaryGeneratedColumn()
  ambienteid: number;

  @Column( { nullable: true })
  nombre_ambiente: string;

  @Column( { nullable: true })
  uri: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updateAt: Date;

  @OneToMany(() => ConfigRequest, configRequest => configRequest.ambiente)
    configRequest: ConfigRequest;
}