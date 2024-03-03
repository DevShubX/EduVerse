import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params:{courseId:string}}){
    try{

        const {userId} = auth();
        const {url} = await req.json();
        console.log(url);
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }

        const courseOwner = await db.course.findUnique({
            where:{
                id : params.courseId,
                userId : userId,
            }
        });

        console.log("[COURSE_OWNER]",courseOwner);

        if(!courseOwner){
            return new NextResponse("Unauthorized",{status:401});
        }

        const attachment  = await db.attachment.create({
            data:{
                url : url,
                name: url.split("/").pop(),
                courseId : params.courseId,
            }
        });

        console.log("[ATTACHMENT]",attachment);

        return NextResponse.json(attachment);

    }catch(err){
        return new NextResponse("Internal Error",{status:500});
    }
}