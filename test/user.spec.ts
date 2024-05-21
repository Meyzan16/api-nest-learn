import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {Logger} from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationPipe } from 'src/common/validation/validation.pipe';
import { UserValidation } from 'src/user/user.validation';
import { TestModule } from './test.module';
import { TestService } from './test.service';
describe('User Controller', () => {
  let app: INestApplication;
  let logger : Logger;
  let testService : TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);

    await app.init();
  });

  describe('POST /api/users', () => {

    //delete user dulu
    beforeEach(async () => {
        await testService.deleteUser()
    })

    it('should be reject if request is invalid', async () => {
      const validationPipe = new ValidationPipe(UserValidation);
      const validateSpy = jest.spyOn(validationPipe, 'transform');

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password: '',
          name: '',
        });

        expect(validateSpy).toHaveBeenCalled();
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });


  });
});
