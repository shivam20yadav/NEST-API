import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(private prisma:PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async validate(payload) {
        const user  = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        delete user.password;
        return user;
    }
}
