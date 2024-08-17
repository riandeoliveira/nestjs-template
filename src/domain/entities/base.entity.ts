import { randomUUID } from "node:crypto";

export abstract class BaseEntity {
  public id: string = randomUUID();

  public createdAt: Date = new Date();

  public updatedAt: Date | null = null;

  public deletedAt: Date | null = null;
}
