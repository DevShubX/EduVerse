import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_components/data-table'
import { Course } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { columns } from './_components/columns'

const CoursesPage = async () => {

  const {userId} = auth();

  if(!userId) return redirect("/");

  const course = await db.course.findMany({
    where:{
      userId : userId,
    },
    orderBy:{
      createdAt:"desc",
    }
  });


  return (
    <div className='p-6'>
      {/* <Link href={"/teacher/create"} >
        <Button>
          New Course
        </Button>
      </Link> */}
      <div>
        <DataTable columns={columns} data={course} />
      </div>
    </div>
  )
}

export default CoursesPage