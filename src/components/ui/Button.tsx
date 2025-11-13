import React from "react";

interface ButtonProp {
    children: React.ReactNode
    variant?:'pierwszy'|'drugi'|'linie'
    size?:'male'|'srednie'|'duze'
    onClick?:()=>void
    disabled?:boolean
    fullWidth?:boolean
    className?:string
}

const Button =({
    children,
    variant='pierwszy',
    size='male',
    onClick,
    disabled=false,
    fullWidth=false,
    className=''
}:ButtonProp)=>{
    let colorClass=''
    if(variant==='pierwszy'){
        colorClass = 'bg-grand-gold text-grand-navy hover:bg-grand-gold/90'
    }else if (variant==='drugi'){
        colorClass = 'bg-grand-navy text-white hover:bg-grand-navy/90'
    }else if (variant==='linie'){
        colorClass='border-2 border-grand-gold text-grand-gold hover:bg-grand-gold hover:text-grand-navy'
    }

    let sizeClass=''
    if (size==='male') {
        sizeClass='px-3 py-1.5 text-sm'
    } else if (size==='srednie') {
        sizeClass='px-4 py-2 text-base'
    } else if (size==='duze') {
        sizeClass='px-6 py-3 text-lg'
    }

    const widthClass=fullWidth?'w-full':''
    const disabledClass=disabled?'opacity-50 cursor-not-allowed':''

    return (
        <button
            className={`rounded-lg font-medium transition-colors ${colorClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button