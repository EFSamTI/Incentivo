import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("apis_tally")
export class ApisTally extends BaseEntity {
    @PrimaryGeneratedColumn()
    api_tally_id: number;
  
    @Column({ type: "uuid" })
    uuid: string;
  
    @Column()
    nombre: string;
  
    @Column()
    url_base: string;
  
    @Column("text", { array: true, nullable: true })
    parametros: string[];
}