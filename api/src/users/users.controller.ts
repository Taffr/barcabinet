import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '@prisma/client';

@Controller()
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: User }) {
    return req.user;
  }
}
