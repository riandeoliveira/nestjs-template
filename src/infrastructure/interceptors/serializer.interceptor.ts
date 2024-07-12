import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { isObject, snakeCase, transform } from "lodash";
import { ObjectId } from "mongodb";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertToSnakeCase(data)));
  }

  private convertToSnakeCase(value: any): any {
    if (Array.isArray(value)) return value.map((v) => this.convertToSnakeCase(v));

    if (isObject(value)) {
      if (value instanceof ObjectId) return value.toHexString();

      return transform(value, (result, val, key) => {
        result[snakeCase(key)] = this.convertToSnakeCase(val);
      });
    }

    return value;
  }
}
