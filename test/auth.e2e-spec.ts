import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';


const loginDto: AuthDto = {
	login: 'jopaa',
	password: 'sosi'
};


describe('AuthController (e2e)', () => {
	let app: INestApplication;
	//let createdId: string;


	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});


	it('/auth/login (POST) - success',  async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail login',   () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, login: '12212'})
			.expect(401,{
				'statusCode': 401,
				'message': 'User with this email have not found',
				'error': 'Unauthorized'
			});
	});

	it('/auth/login (POST) - fail password',   () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, password: 'jfjjjjijps'})
			.expect(401,{
				statusCode: 401,
				message: 'Wrong password please try again',
				error: 'Unauthorized'
			});
	});


	afterAll(()=>{
		disconnect();
	});
});


