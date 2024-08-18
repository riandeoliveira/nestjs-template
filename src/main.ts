import { SerializerInterceptor } from "./infrastructure/interceptors/serializer.interceptor";
import { WebApplicationBuilder } from "./web-api/builders/web-application.builder";

(async (): Promise<void> => {
  const builder = new WebApplicationBuilder();

  await builder.create();

  builder.application.setGlobalPrefix("api");

  // builder.application.use(cookieParser());

  builder.application.enableCors({
    origin: "https://reactjs-template-dtqx8uosg-rian-oliveiras-projects.vercel.app/",
  });

  builder.configureDocumentation();
  builder.configureProblemDetails();
  builder.configureValidation();

  builder.application.useGlobalInterceptors(new SerializerInterceptor());

  await builder.run();
})();
