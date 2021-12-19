import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/roles/role.decotator';
import { Role } from 'src/roles/role.enum';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserByToken(@Request() req) {
    const user = req.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }
}
