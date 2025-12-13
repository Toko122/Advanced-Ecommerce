'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'


const authContext = createContext()

const AuthProvider = ({children}) => {

    const [userId, setUserId] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const login = (token, id) => {
        localStorage.setItem('token', token)
        localStorage.setItem('userId', id)
        setIsLoggedIn(true)
        setUserId(id)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setIsLoggedIn(false)
        setUserId(null)
    }

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        try{
           const decode = jwtDecode(token)
           const currentTime = Date.now() / 1000
           if(decode.exp < currentTime){
              logout()
           }else{
            setIsLoggedIn(true)
           }
    }catch(err){
        console.log(err);
        logout()
    }
        
    }, [])
    
  return (
    <authContext.Provider value={{login, logout, isLoggedIn, userId}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(authContext)