import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user.value);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
