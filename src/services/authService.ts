import {httpClient} from '../utils/api'


export const login=async(credentials:any):Promise<any>=>{
    const {data}=await httpClient.post('/auth/login',credentials)
    localStorage.setItem('jwt',data.jwt)
    localStorage.setItem('isLoggedIn','true')
    return data
}

export const register =async(userData:any):Promise<any>=>{
    const {data}=await httpClient.post('/auth/register',userData)
    localStorage.setItem('jwt',data.jwt)
    localStorage.setItem('isLoggedIn','true')
    return data
}

export const refreshToken=async():Promise<any>=>{
    const {data}=await httpClient.post('/auth/refresh')
    localStorage.setItem('jwt',data.jwt)
    return data.jwt
}
export const logout=()=>{
    localStorage.removeItem('jwt')
    localStorage.removeItem('isLoggedIn')
    window.location.href = '/login'
}
export const isAuthenticated=():boolean=>{
    return !!localStorage.getItem('jwt')
}
export const getToken=():string|null=>{
    return localStorage.getItem('jwt')
}