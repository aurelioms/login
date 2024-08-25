// user.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('register')
    async register(@Body() body: { nama: string, username: string; password: string }) {
        const user = await this.userService.findUsername(body.username);
        if (user) {
            throw new BadRequestException('Username sudah terpakai');
        }

        const newUser = await this.userService.register(body.nama, body.username, body.password);
        return { message: 'Berhasil registrasi', user: newUser };
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.userService.findUsername(body.username);
        if (!user) {
            throw new BadRequestException('Username tidak valid');
        }

        const isPasswordValid = await this.userService.validatePassword(body.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Password tidak valid');
        }

        return { user: user.nama };
    }
}
