import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("isentive_tcambios")
export class Cambio extends BaseEntity {
  @PrimaryGeneratedColumn()
  cambioid: number;

  @Column()
  asinacion_original: number;

  @Column()
  asignacion_cambios: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;
}
