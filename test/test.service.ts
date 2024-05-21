import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";

@Injectable()
export class TestService {
    constructor(
        private prismaService:PrismaService
    ){}

    async deleteUser() {
        await this.prismaService.tbl_user.deleteMany({
            where: {
                OR: [
                    { username: 1112 },
                    { username: 1114 }
                ]
            }
        })
    }

}