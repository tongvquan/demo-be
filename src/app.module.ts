import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CategoryModule } from './categories/category.module.js';
import { ProductModule } from './products/product.module.js';
import { ChatGateway } from './chat/chat.gateway.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    CategoryModule,
    ProductModule,
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'demo-be',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
