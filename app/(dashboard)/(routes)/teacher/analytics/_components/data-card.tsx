import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';
import React from 'react'


interface DataCardProps{
    value : number;
    label : string;
    shouldFormat? : boolean;
}


const DataCard = ({value,label,shouldFormat}:DataCardProps) => {
  return (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
                {label}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className='text-2xl font-bold'>
                {shouldFormat ? formatPrice(value,"USD") : value}
            </div>
        </CardContent>
    </Card>
  )
}

export default DataCard