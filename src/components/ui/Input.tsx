import React from "react";

interface InputProps{
    label?:string
    type?:string
    placeholder?:string
    error?:string
    value?:string
    onChange?:(e: React.ChangeEvent<HTMLInputElement>)=>void
    disabled?:boolean
    required?:boolean
    onKeyPress?:(e: React.KeyboardEvent<HTMLInputElement>)=>void
    className?:string
}

const Input=({
    label,
    type='text',
    placeholder,
    error,
    value,
    onChange,
    onKeyPress,
    disabled=false,
    required=false,
    className=''
}:InputProps)=>{
    let labelClass='block text-sm font-medium mb-1'
    if(error){
        labelClass=labelClass+' text-red-600'
    }else{
        labelClass=labelClass+' text-grand-slate'
    }
    let inputClass='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-grand-slate'
    if(error){
        inputClass=inputClass+' border-red-500 focus:ring-red-500'
    }else{
        inputClass=inputClass+' border-gray-300 focus:border-grand-gold focus:ring-grand-gold'
    }

    if(disabled){
        inputClass=inputClass+' bg-gray-100 cursor-not-allowed opacity-60'
    }
    if(className){
        inputClass=inputClass+''+className
    }

    return(
        <div className="w-full">
            {
                label?(
                    <label className={labelClass}>
                        {label}
                        {required?<span className="text-red-500 ml-1">*</span>:null}
                    </label>
                    
                ):null
            }
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                onKeyPress={onKeyPress}
                className={inputClass}
            />
            {
                error?(
                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                ):null
            }

        </div>
    )
}

export default Input