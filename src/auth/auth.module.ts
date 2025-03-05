import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
//import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; 
import { UsersModule } from 'src/users/users.module';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports:[UsersModule,AdminsModule,

    //PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
       global:false,
      secret: process.env.JWT_SECRET , 
      signOptions: { expiresIn: '1h' }, 
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
