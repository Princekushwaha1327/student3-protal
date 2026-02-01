import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

// Placeholder modules - to be implemented next
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { AcademicModule } from './academic/academic.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        EventEmitterModule.forRoot(),
        // Database connection will be configured here
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'student_portal',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Auto-create tables (dev only)
        }),
        AuthModule,
        StudentModule,
        AcademicModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
