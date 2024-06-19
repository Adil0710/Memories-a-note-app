import React, { useEffect } from 'react'
import authStore from '../stores/authStore'
import { Navigate } from 'react-router-dom'

function LogoutPage() {
    const store = authStore()

    useEffect(() => {
        store.logout()
    }, [store])
  // Redirect to /login after logout
  return <Navigate to="/login" />;
}

export default LogoutPage