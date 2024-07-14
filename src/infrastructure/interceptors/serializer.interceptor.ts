import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import _ from "lodash";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertToSnakeCase(data)));
  }

  private convertToSnakeCase(value: any): any {
    if (Array.isArray(value)) return value.map((v) => this.convertToSnakeCase(v));

    if (_.isObject(value)) {
      return _.transform(value, (result, val, key) => {
        result[_.snakeCase(key)] = this.convertToSnakeCase(val);
      });
    }

    return value;
  }
}
