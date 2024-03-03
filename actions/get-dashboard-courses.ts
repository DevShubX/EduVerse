import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgresswithCategory = Course &{
    category : Category;
    chapters : Chapter[];
    progress : number | null;
}

type DashBoardCourses={
    completedCourses:CourseWithProgresswithCategory[];
    courseInProgress:CourseWithProgresswithCategory[];
}




export const getDashBoardCourses = async (userId:string):Promise<DashBoardCourses>=>{

    try{
        const purchaseCourses = await db.purchase.findMany({
            where:{
                userId : userId,
            },
            select:{
                course:{
                    include:{
                        category: true,
                        chapters:{
                            where:{
                                isPublished:true,
                            }
                        }
                    }
                }
            }
        });

        const courses = purchaseCourses.map((purchase)=>purchase.course) as CourseWithProgresswithCategory[];

        for(let course of courses){
            const progress = await getProgress(userId,course.id);
            course['progress'] = progress;
        }

        const completedCourses = courses.filter((course)=>course.progress === 100);
        const courseInProgress = courses.filter((course)=>(course.progress ?? 0) < 100);

        return {
            completedCourses,
            courseInProgress,
        }

    }catch(error){
        console.log("[GET_DASHBOARD_COURSES]",error);
        return {
            completedCourses:[],
            courseInProgress:[],
        }
    }

}