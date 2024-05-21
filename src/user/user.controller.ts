import { Body, Controller, Header, HttpCode, Post, UseFilters, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../model/web.model';
import { RegisterUserRequest, UserResponse } from '../model/user.model';
import { UserValidation } from './user.validation';
import { ValidationPipe } from 'src/common/validation/validation.pipe';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe(UserValidation)) 
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async register(
    @Body() request: RegisterUserRequest,
    ): Promise<WebResponse<UserResponse>> {
      const result = await this.userService.register(request);
      return result
  }
}
