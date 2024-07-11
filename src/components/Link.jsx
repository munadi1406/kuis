import React from 'react'
import { buttonVariants } from "@/components/ui/button"


const Link = ({text,to,variants}) => {
  return (
    <a className={buttonVariants({variant:variants})} href={to}>{text}</a>
  )
}
 
export default Link