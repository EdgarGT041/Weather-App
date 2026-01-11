import { cn } from '@/utils/cn'
import React from 'react'

export default function 
Container(Props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...Props} className={cn('w-full bg-white border rounded-xl flex py-4 shadow-sm', Props.className   )}>
    </div>
  )
}