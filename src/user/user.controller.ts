import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { getUser } from "src/auth/decorator";
import { EditUserDto } from "./dto";
import { UserService } from "./user.service";

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userservice:UserService ) {}
    @Get('me')
    getUser(@getUser() user:User) {
        return user;
    }
    @Put('edit')
    editUser(
        @getUser('id') userId:string,
        @Body() editUser:EditUserDto
    ){
        return this.userservice.edituser(userId,editUser)
    }
}