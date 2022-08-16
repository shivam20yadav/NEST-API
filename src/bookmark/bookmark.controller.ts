import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "src/auth/decorator";
import { BookmarkService } from "./bookmark.service";
import { createBookmarkDto, editBookmarkDto } from "./dto";

@UseGuards(AuthGuard('jwt'))
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkservice:BookmarkService) {}
    @Get('')
    getBookmarks(@getUser('id') userId:string) {
        return userId;
    }
    @Get(':id')
    getbookmarksbyId(@getUser('id') userId:string,@Param('id') id:string) {
        return this.bookmarkservice.getbookmarksbyId(userId,id);
    }
    @Post('')
    AddBookmark( @getUser('id') userId:string, @Body() addBookmark: createBookmarkDto ) {
        return this.bookmarkservice.addBookmark(userId, addBookmark);
    }
    @Put(':id')
    editBookmark(@getUser('id') userId:string, @Param('id') id:string, @Body() editBookmark: editBookmarkDto) {
        return this.bookmarkservice.editBookmark(userId, id, editBookmark);
    }
    @Delete(':id')
    deleteBookmark(@getUser('id') userId:string, @Param('id') id:string) {
        return this.bookmarkservice.deleteBookmark(id);
    }
}