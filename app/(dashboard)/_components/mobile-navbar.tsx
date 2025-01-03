import { Menu } from 'lucide-react'
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import SideBar from './sidebar';


const MobileNavbar = () => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
            <Menu/>
        </SheetTrigger>
        <SheetContent side={"left"} className='p-0 bg-white'>
            <SideBar/>
        </SheetContent>
    </Sheet>
   
  )
}

export default MobileNavbar