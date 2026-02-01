import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = []; // In-memory mock

    findAll() {
        return this.students;
    }

    findOne(id: number) {
        return this.students.find(s => s.id === id);
    }

    getProfile(userId: number) {
        // Mock profile
        return {
            id: userId,
            name: 'John Doe',
            course: 'Computer Science',
            semester: 6,
            attendance: 87,
            cgpa: 9.2
        };
    }

    getAttendance(userId: number) {
        // Mock attendance heatmap data
        return [
            { date: '2023-10-01', status: 'present' },
            { date: '2023-10-02', status: 'present' },
            { date: '2023-10-03', status: 'absent' },
            { date: '2023-10-04', status: 'present' },
        ];
    }
}
