import { Injectable } from "@nestjs/common";
import { bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { createBookmarkDto, editBookmarkDto } from "./dto";

@Injectable()
export class BookmarkService {
    constructor (private prisma:PrismaService){}
    async getBookmarks(userid:string) {
        try{
            return await this.prisma.bookmark.findMany({
                where:{
                    userId:userid
                }
            })
        }catch(error){
            throw new Error(error)
        }
    }
    async getbookmarksbyId(userid:string, id:string) {
        try{
            return await this.prisma.bookmark.findMany({
                where:{
                    id,
                    userId:userid
                }
            })
        }catch(error){
            throw new Error(error)
        }
    }
    async addBookmark(userid:string, editbook: createBookmarkDto) {
        try{
            return await this.prisma.bookmark.create({
                data:{
                    ...editbook,
                    userId:userid
                }
            })
        }catch(error){
            throw new Error(error)
        }
    }
    async editBookmark(userid:string, id:string ,editbook: editBookmarkDto) {
        try{
            const bookmark = await this.prisma.bookmark.findFirst({
                where:{
                    id,
                }
            })
            if(!bookmark || bookmark.userId !== userid){
                throw new Error('Bookmark not found')
            }
            else{
                const updatebook = await this.prisma.bookmark.update({
                    where:{
                        id
                    },
                    data:{
                        ...editbook
                    }
                })
                return {code:200, message:'Bookmark updated successfully'};
            }
        }catch(error){
            throw new Error(error)
        }
    }
    async deleteBookmark(id:string){
        try{
            const bookmark = await this.prisma.bookmark.findFirst({
                where:{
                    id
                }
            })
            if(!bookmark){
                throw new Error('Bookmark not found')
            }
            else{
                const deletebook = await this.prisma.bookmark.delete({
                    where:{
                        id
                    }
                })
                return {code:200, message:'Bookmark deleted successfully'};
            }
        }catch(error){
            throw new Error(error)
        }
    }
}