import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    name: "created_at",
    type: "date",
  })
  public createdAt: Date = new Date();

  @Column({
    name: "updated_at",
    nullable: true,
    type: "date",
  })
  public updatedAt: Date | null = null;

  @Column({
    name: "deleted_at",
    nullable: true,
    type: "date",
  })
  public deletedAt: Date | null = null;
}
