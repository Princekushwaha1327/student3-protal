import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [], // Add TypeOrmModule.forFeature([Student]) when Entity is ready
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule { }
