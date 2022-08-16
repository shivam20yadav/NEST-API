import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EditUserDto } from "./dto";

@Injectable({})
export class UserService {
    constructor( private prisma : PrismaService){}
    async edituser(userid:string,edituser:EditUserDto){       
        const user =  await this.prisma.user.update({
            where:{id:userid},
            data:{
                ...edituser
            }
        })
        delete user.password;
        return user;
   }
}