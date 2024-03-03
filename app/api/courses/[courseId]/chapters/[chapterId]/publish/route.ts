import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{courseId:string,chapterId:string}}){
    try{
        const {userId} = auth();

        if(!userId) return new NextResponse("Unauthorized",{status:401});

        const courseOwnner = await db.course.findUnique({
            where:{
                userId : userId,
                id : params.courseId,
            }
        });

        if(!courseOwnner) return new NextResponse("Unauthorized",{status:401});
        
        const chapter = await db.chapter.findUnique({
            where:{
                id : params.chapterId,
                courseId : params.courseId,
            }
        });

        if(!chapter) return new NextResponse("Unauthorized",{status:401});


        const muxData = await db.muxData.findUnique({
            where:{
                chapterId : params.chapterId,
            }
        });

        if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl){
            return new NextResponse("Missing required fields",{status:400});
        }

        const publishedChapter = await db.chapter.update({
            where:{
                id : params.chapterId,
                courseId : params.courseId,
            },
            data:{
                isPublished : true,
            }
        });

        return NextResponse.json(publishedChapter);

    }catch(error){
        console.log("[PUBLISH_CHAPTER]",error);
        return new NextResponse("Internal server error",{status:500});
    }
}