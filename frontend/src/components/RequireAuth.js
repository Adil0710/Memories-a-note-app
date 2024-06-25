import React, { useEffect } from 'react'
import authStore from '../stores/authStore'
import { Navigate } from 'react-router-dom'

function RequireAuth(props) {
    const store = authStore()

    useEffect(() => {
        if (store.loggedIn === null){
            store.checkAuth()
        }
    }, [store])

  if (store.loggedIn === null) {
    return <div className=' min-h-screen dark:bg-[#0b0b0b] w-full flex items-center justify-center'><h1 className=' text-xl text-gray-500'>Please Wait...</h1></div>
  }

  if(store.loggedIn === false) {
    return <Navigate to='/login' />
  }

  return (
    <div>{props.children}</div>
  )
}

export default RequireAuth