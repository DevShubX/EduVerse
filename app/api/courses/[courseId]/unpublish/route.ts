import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{courseId:string}}){
    try{   

        const {userId} = auth();

        if(!userId) return new NextResponse("Unauthorized",{status:401});

        const course = await db.course.findUnique({
            where : {
                id : params.courseId,
            },
        });

        if(!course) return new NextResponse("Unauthorized",{status:401});

        const unpublishedCourse = await db.course.update({
            where:{
                id : params.courseId,
                userId: userId,
            },
            data:{
                isPublished : false,
            }
        });

        return NextResponse.json(unpublishedCourse);

    }catch(error){
        console.log("[UNPUBLISH_COURSE]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }

}