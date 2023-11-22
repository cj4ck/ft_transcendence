import { Body, Controller, Post, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user-service/user.service';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UserI } from '../model/user.interface';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from '../model/dto/login-user.dto';
import { LoginResponseI } from '../model/login-response.interface';

@Controller('users')
export class UserController {

	constructor(
		private userService: UserService,
		private userHelperService: UserHelperService
	) { }

	@Post()
	async create(@Body() createUserDto: CreateUserDto ): Promise<UserI> {
		const userEntity: UserI = this.userHelperService.createUserDtoToEntity(createUserDto)
		return this.userService.create(userEntity)
	}

	@Get()
	async findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 10
	): Promise<Pagination<UserI>> {
		limit = limit > 100 ? 100: limit;
		return this.userService.findAll({page, limit, route: 'http://localhost:3000/api/users'})
	}

	@Get('/find-by-username')
	async findAllByUsername(@Query('username') username: string) {
		console.log('FIND BY USERNAME - backend api call')
		return this.userService.findAllByUsername(username)
	}
	@Get('/find-by-id')
	async findById(@Query('id') id: number) {
		console.log('FIND BY Id - backend api call')
		return this.userService.findById(id)
	}

	@Post('login')
	async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
		const userEntity: UserI = this.userHelperService.loginUserDtoToEntity(loginUserDto)
		const jwt: string = await this.userService.login(userEntity)
		return {
			access_token: jwt,
			token_type: 'JWT',
			expires_in: 10000
		};
	}

}
