import {findUserByEmail,generateMockJWT,addMockUser, type AuthResponse} from '../data/mockUsers'


export const login=async(credentials:any):Promise<any>=>{
    await new Promise(r=>setTimeout(r,1000))

    const user=findUserByEmail(credentials.email)
    if(!user||user.password!==credentials.password){
        throw new Error('Nieprawidłowy email lub hasło')
    }
    const jwt=generateMockJWT(user.id)
    const data={
        jwt,
        user:{
            id:user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
        }
    }
    localStorage.setItem('jwt',data.jwt)
    localStorage.setItem('user', JSON.stringify(data.user)) 
    localStorage.setItem('isLoggedIn','true')
    return data
}

export const register=async(userData:any):Promise<any>=>{
    await new Promise(r=>setTimeout(r,500))

    if(findUserByEmail(userData.email)){
        throw new Error('Użytkownik z tym email już istnieje')
    }

    const newUser=addMockUser(userData)
    const jwt=generateMockJWT(newUser.id)
    const data={
        jwt,
        user:{
            id:newUser.id,
            email:newUser.email,
            firstName:newUser.firstName,
            lastName:newUser.lastName,
        }
    }
    localStorage.setItem('jwt',data.jwt)
    localStorage.setItem('user', JSON.stringify(data.user)) 
    localStorage.setItem('isLoggedIn','true')
    return data
}

export const refreshToken=async():Promise<any>=>{
    await new Promise(r=>setTimeout(r,500))
    const jwt=localStorage.getItem('jwt')
    if(!jwt){
        throw new Error('Nieprawidłowy token')
    }
    localStorage.setItem('jwt',jwt)
    return {jwt}
}

export const logout=()=>{
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    window.location.href='/login'
}

export const isAuthenticated=():boolean=>{
    return !!localStorage.getItem('jwt')
}

export const getToken=():string|null=>{
    return localStorage.getItem('jwt')
}
export const getUser=()=>{
    const userStr=localStorage.getItem('user')
    return userStr?JSON.parse(userStr):null
}