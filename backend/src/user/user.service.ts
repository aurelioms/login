// user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findUsername(username: string) {
        return this.prisma.user.findFirst({ where: { username } });
    }

    async validatePassword(inputPassword: string, userPassword: string): Promise<boolean> {
        return inputPassword === userPassword
    }

    async register(nama: string, username: string, password: string) {
        return this.prisma.user.create({
            data: {
                nama,
                username,
                password: password,
            },
        });
    }
}
