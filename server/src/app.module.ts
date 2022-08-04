import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MenuModule } from './menu/menu.module';
@Module({
  imports: [MenuModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
