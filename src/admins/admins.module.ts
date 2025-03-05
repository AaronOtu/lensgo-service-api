import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schemas';


@Module({
  imports:[
    MongooseModule.forFeature([{name:Admin.name, schema:AdminSchema}])
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports:[MongooseModule]
})
export class AdminsModule {}
