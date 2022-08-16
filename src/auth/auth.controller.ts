import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller({})
export class AuthController{
    constructor( private authservice:AuthService){  }
    @Post('signup')
    signup(@Body() authdto:AuthDto){
        return this.authservice.signup(authdto)
    }   
    @Post('signin')
    signin(@Body() authdto:AuthDto){
        return this.authservice.signin(authdto) 
    }
} 