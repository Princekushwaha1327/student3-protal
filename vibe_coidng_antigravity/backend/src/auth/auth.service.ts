import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        // Hardcoded logic for demo since DB isn't running
        if (username === 'student' && pass === 'password') {
            return { userId: 1, username: 'student', role: 'student' };
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: any) {
        return { message: 'User registered successfully', user: registerDto };
    }
}
