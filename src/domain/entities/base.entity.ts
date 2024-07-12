import {
  CreateDateColumn,
  DeleteDateColumn,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @ObjectIdColumn({ name: "id" })
  public id: ObjectId;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp without time zone",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    nullable: true,
    type: "timestamp without time zone",
  })
  public updatedAt?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    nullable: true,
    type: "timestamp without time zone",
  })
  public deletedAt?: Date;
}
