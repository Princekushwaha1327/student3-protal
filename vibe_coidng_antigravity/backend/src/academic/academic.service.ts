import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AcademicService {
    constructor(private eventEmitter: EventEmitter2) { }

    private exams = [
        { id: 1, subject: 'Advanced Algorithms', date: '2026-03-10', type: 'Midterm', priority: 'High' },
        { id: 2, subject: 'System Design', date: '2026-03-15', type: 'Final', priority: 'High' },
    ];

    private assignments = [
        { id: 1, title: 'Distributed Systems Project', deadline: '2026-02-28', status: 'Pending' }
    ];

    getExams() {
        return this.exams;
    }

    getAssignments() {
        return this.assignments;
    }

    createAssignment(data: any) {
        const newAssignment = { id: this.assignments.length + 1, ...data, status: 'Pending' };
        this.assignments.push(newAssignment);

        // Emit event for real-time updates / notification system
        this.eventEmitter.emit('academic.assignment_created', newAssignment);

        return newAssignment;
    }
}
