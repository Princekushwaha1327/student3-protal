import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { StudentService } from './student.service';
// import { AuthGuard } from '@nestjs/passport'; // Uncomment when Auth is fully integrated

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    // @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        // Mocking user id 1 for now if no auth
        const userId = req.user ? req.user.userId : 1;
        return this.studentService.getProfile(userId);
    }

    @Get('attendance')
    getAttendance() {
        return this.studentService.getAttendance(1);
    }
}
