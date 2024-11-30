import { UserDto, UserParamDto } from './interface/dto/user.dto';
import { User } from './interface/user';
import { UserService } from './user-service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {Request} from "express"

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
    
  @Get(':email')
  @UsePipes(new ValidationPipe())
  getUser(@Param() param: UserParamDto, @Req() req:Request): User {
    return this.userService.getUser(param.email);
  }

  @Post('/addUser')
  @UsePipes(new ValidationPipe())
  postUser(@Body() user: UserDto): User {
    return this.userService.addUser(user);
  }
    
  @Delete(':email')
  @UsePipes(new ValidationPipe())
  deleteUser(@Param('email') param: UserParamDto): User[] {
    return this.userService.deleteUser(param.email);
  }
}
