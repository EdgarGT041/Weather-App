import { cn } from '@/utils/cn';
import React from 'react'

type Props = {
  className?: string;
  value: string;
  onChange:React.ChangeEventHandler<HTMLInputElement> | 
  undefined;
  onSubmit:React.FormEventHandler<HTMLFormElement> | 
  undefined;

};

import { IoSearch } from "react-icons/io5";
export default function SearchBox(props: Props) {
  return (
    <form onSubmit={props.onSubmit} className={cn("flex relative items-center justify-center h-11 group", props.className)}>
    <input 
    type="text" 
    value={props.value}
    onChange={props.onChange}
    placeholder='Search location...'
    className='px-4 py-2.5 w-[230px] 
    bg-white/90 backdrop-blur-sm
    border border-blue-200/50 rounded-l-xl 
    focus:outline-none focus:ring-2 focus:ring-blue-400/50 
    focus:border-blue-400 h-full
    text-gray-700 placeholder:text-gray-400
    shadow-sm hover:shadow-md
    transition-all duration-300'
    />
    <button className='px-4 py-2.5 
    bg-gradient-to-r from-blue-500 to-indigo-600 
    text-white rounded-r-xl 
    focus:outline-none focus:ring-2 focus:ring-blue-400/50
    hover:from-blue-600 hover:to-indigo-700 
    hover:shadow-lg hover:scale-[1.02]
    active:scale-95
    h-full
    transition-all duration-300
    flex items-center justify-center'>
    <IoSearch className="text-lg" />
    </button>
    </form>
  )
}