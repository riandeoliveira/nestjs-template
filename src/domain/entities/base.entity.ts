import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    name: "created_at",
    type: "datetime",
  })
  public createdAt: Date = new Date();

  @Column({
    name: "updated_at",
    nullable: true,
    type: "datetime",
  })
  public updatedAt: Date | null = null;

  @Column({
    name: "deleted_at",
    nullable: true,
    type: "datetime",
  })
  public deletedAt: Date | null = null;
}
