import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";


const {video} = new Mux({
    tokenId : process.env.MUX_TOKEN_ID!,
    tokenSecret : process.env.MUX_TOKEN_SECRET!,
});



export async function PATCH(req:Request,{params}:{params:{courseId:string}}){
    try{    

        const {userId} = auth();
        const {courseId} = params;
        const values = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized",{status : 401});
        }

        const course = await db.course.update({
            where : {
                id : courseId,
                userId : userId
            },
            data : {
                ...values,
            }
        })

        return NextResponse.json(course);

    }catch(err){
        console.log("[COURSE_ID]",err);
        return new NextResponse("Internal Server Error",{status : 500});
    }
}




export async function DELETE(req:Request,{params}:{params:{courseId:string}}){
    try{

        const {userId} = auth();

        if(!userId) return new NextResponse("Unauthorized",{status:401});

        const course = await db.course.findUnique({
            where : {
                id : params.courseId,
                userId : userId,
            },
            include : {
                chapters : {
                    include :{
                        muxData : true,
                    }
                }
            }
        });

        if(!course) return new NextResponse("Unauthorized",{status:401});


        for (const chapter of course.chapters){
            if(!chapter.muxData?.assetId){
                await video.assets.delete(chapter.muxData!.assetId);
            }
        }


        const deletedCourse = await db.course.delete({
            where:{
                id : params.courseId,
            }
        });

        return NextResponse.json(deletedCourse);

    }catch(error){
        console.log('[DELETE_COURSE]',error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}