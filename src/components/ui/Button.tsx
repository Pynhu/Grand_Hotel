import React from "react";

interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: 'pierwszy' | 'drugi' | 'linie'
    size?: 'male' | 'srednie' | 'duze'
    fullWidth?: boolean
}

const Button = ({
    children,
    variant = 'pierwszy',
    size = 'male',
    fullWidth = false,
    className = '',
    type = 'button',
    ...props
}: ButtonProp) => {
    let colorClass = ''
    if (variant === 'pierwszy') {
        colorClass = 'bg-grand-gold text-grand-navy hover:bg-grand-gold/90'
    } else if (variant === 'drugi') {
        colorClass = 'bg-grand-navy text-white hover:bg-grand-navy/90'
    } else if (variant === 'linie') {
        colorClass = 'border-2 border-grand-gold text-grand-gold hover:bg-grand-gold hover:text-grand-navy'
    }

    let sizeClass = ''
    if (size === 'male') {
        sizeClass = 'px-3 py-1.5 text-sm'
    } else if (size === 'srednie') {
        sizeClass = 'px-4 py-2 text-base'
    } else if (size === 'duze') {
        sizeClass = 'px-6 py-3 text-lg'
    }

    const widthClass = fullWidth ? 'w-full' : ''
    const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
        <button
            type={type}
            className={`rounded-lg font-medium transition-colors ${colorClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button