import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Post('login')
  async login(
    @Body() LoginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userPayload = await this.usersService.login(LoginUserDto);
    const token = this.jwtService.sign(userPayload);
    res.cookie('access_token', token, {
      httpOnly: true, // Evita que JS lea el token
      secure: false, //true en produccion
      sameSite: 'strict', // No se envía en peticiones desde otros sitios
      maxAge: 3600 * 1000,
    });
    return this.usersService.login(LoginUserDto);
  }
}
