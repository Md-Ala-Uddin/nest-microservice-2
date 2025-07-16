import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap()
  .then(() => console.log('API Gateway is running on port 3000'))
  .catch((err) => console.error('Error starting API Gateway:', err));
