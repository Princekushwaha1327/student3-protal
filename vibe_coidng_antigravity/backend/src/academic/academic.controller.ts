import { Controller, Get, Post, Body } from '@nestjs/common';
import { AcademicService } from './academic.service';

@Controller('academic')
export class AcademicController {
    constructor(private readonly academicService: AcademicService) { }

    @Get('exams')
    getExams() {
        return this.academicService.getExams();
    }

    @Get('assignments')
    getAssignments() {
        return this.academicService.getAssignments();
    }

    @Post('assignments')
    createAssignment(@Body() body) {
        return this.academicService.createAssignment(body);
    }
}
