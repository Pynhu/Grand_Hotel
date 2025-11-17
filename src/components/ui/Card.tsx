import React from "react";

interface CardProps{
    children: React.ReactNode
    className?:string
    padding?:'none'|'small'|'medium'|'large'
    shadow?:boolean
    hover?:boolean
}

const Card=({
    children,
    className='',
    padding='medium',
    shadow=true,
    hover=false
}:CardProps)=>{
    let paddingClass=''
    if (padding==='none'){
        paddingClass='p-0'
    }
    else if(padding==='small'){
        paddingClass='p-4'
    }
    else if(padding==='medium'){
        paddingClass='p-6'
    }
    else if(padding==='large'){
        paddingClass='p-8'
    }

    const shadowClass=shadow?'shadow-lg':''
    const hoverClass=hover?'hover:shadow-xl transition-shadow':''

    return(
        <div className={`rounded-3xl ${paddingClass} ${shadowClass} ${hoverClass} ${className}`}>
            {children}
        </div>
    )
}
export default Card