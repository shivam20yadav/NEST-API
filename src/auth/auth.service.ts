import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
@Injectable({})
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwt : JwtService
    ){}
    async signup(authdto:AuthDto){
        try{
        authdto.password = await argon.hash(authdto.password);
        const user = await this.prisma.user.create({
            data: authdto
        })
        return user
    }
    catch(error){
        if(error.code === "P2002"){
            throw new ForbiddenException("User already exists")
        }
        throw error
    }
    }
    async signin(authdto:AuthDto){
        const user = await this.prisma.user.findMany({
            where:{
                email: authdto.email
            }
        })
        if(!user[0]){
            throw new ForbiddenException("Email is not registered")
        }
        const password_match = await argon.verify(user[0].password, authdto.password)
        if(!password_match){
            throw new ForbiddenException("Wrong password")
        }
        return this.signtoken(user[0].id,user[0].email)
    }
    async signtoken(userid:string,email:string): Promise<{access_token:string}>{
        const payload = {
            sub: userid,
            email: email
        }
        const token = await this.jwt.sign(payload, {expiresIn: '1h'})
        return {
            access_token: token
        }
    }
}