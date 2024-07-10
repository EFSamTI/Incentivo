import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("isentive_tmovimientos")
export class Movimiento extends BaseEntity {
  @PrimaryGeneratedColumn()
  movimientoid: number;

  @Column()
  asignacion_original: number;

  @Column()
  asignacion_cambio: number;

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp", nullable: true  })
  update_at: Date;

}