import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhotographersModule } from './photographers/photographers.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [AuthModule, UsersModule, PhotographersModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
