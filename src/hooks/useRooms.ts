import {useState,useEffect} from 'react'
import * as roomService from '../services/roomService'

export const useRooms=()=>{
  const [data,setData]=useState(null)
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState(null)

  useEffect(()=>{
    roomService.getRooms().then((rooms:any)=>{
      setData(rooms)
      setIsLoading(false)
    }).catch(eroor=>{
      setError(error)
      setIsLoading(false)
    })
  },[])
  return {data,isLoading,error}
}

export const useRoom=(id:any)=>{
  const [data,setData]=useState(null)
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState(null)

  useEffect(()=>{
    if(!id) return

    roomService.getRoom(id).then((room:any)=>{
      setData(room)
      setIsLoading(false)
    })
    .catch(error=>{
      setError(error)
      setIsLoading(false)
    })
  },[id])
  return {data,isLoading,error}
}

