import NavbarRoutes from '@/components/navbar-routes';
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import CourseMobileSideBar from './course-mobile-sidebar';


interface CourseNavBarProps{
    course:Course & {
        chapters : (Chapter & {
            userProgress : UserProgress[] | null;
        })[],
    },
    progressCount : number
}


const CourseNavBar = ({course,progressCount}:CourseNavBarProps) => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
       <CourseMobileSideBar
        course={course}
        progressCount={progressCount}
       />
       <NavbarRoutes/>
    </div>
  )
}

export default CourseNavBar