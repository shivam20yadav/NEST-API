import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./strategy";

@Module({
    imports: [JwtModule.register({
        secret: env.JWT_SECRET,
    })],
    controllers: [AuthController],
    providers: [AuthService,JWTStrategy],
})
export class AuthModule {}