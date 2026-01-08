import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001, () => {
    console.log(`server ${process.env.PORT || 3001} portda ishaladi`);
  });
}
bootstrap().catch((err) => {
  console.error('Xatolik yuz berdi:', err);
  process.exit(1);
});
