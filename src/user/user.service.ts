import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { RegisterUserRequest, UserResponse } from '../model/user.model';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { WebResponse } from '../model/web.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}
  async register(request: RegisterUserRequest): Promise<WebResponse<UserResponse>> {
      this.logger.info(`Register new info ${JSON.stringify(request)}`);

      const totalUserWithSameUsername = await this.prismaService.tbl_user.count(
        {
          where: {
            username: request.username,
          },
        },
      );

      if (totalUserWithSameUsername != 0) {
        throw new HttpException(
          {
            code: 400,
            errors: 'Username already exist',
          },
          400,
        );
      }

      request.password = await bcrypt.hash(
        request.password,
        10,
      );

      const result = await this.prismaService.tbl_user.create({
        data: {
          username: request.username,
          password: request.password,
          name: request.name,
          created_at: new Date(),
          updated_at: new Date(),
          uuid: uuidv4(),
          is_deleted: false,
        },
      });

      const user: UserResponse = {
        username: result.username,
        name: result.name,
        created_at: result.created_at,
        updated_at: result.updated_at,
        is_deleted: result.is_deleted,
      };

      const response: WebResponse<UserResponse> = {
        success: true,
        data: user,
      };

      return response;
  }
}
