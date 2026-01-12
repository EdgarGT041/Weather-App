import { cn } from '@/utils/cn'
import React from 'react'

export default function 
Container(Props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...Props} className={cn('w-full bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl flex py-4 shadow-lg hover:shadow-xl transition-all duration-300', Props.className   )}>
    </div>
  )
}