import React from 'react'
import SideBar from './_components/sidebar';
import NavBar from './_components/navbar';

const DashBoardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full'>
        <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
          <NavBar/>
        </div>
        <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
            <SideBar/>
        </div>
        {/* md:pl-56 give the main left padding of 14rem or 224px.*/}
        <main className='md:pl-56 h-full pt-[80px]'>
            {children} 
        </main>
    </div>
  )
}

export default DashBoardLayout