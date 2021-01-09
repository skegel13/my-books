import React, {ComponentProps, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import useAuth from '../context/auth-context'

export function AuthRoute(Component) {
  return function Auth(props: ComponentProps<any>) {
    const [ready, setReady] = useState(false)
    const {isAuthenticated, isLoading} = useAuth()
    const router = useRouter()

    useEffect(() => {
      console.log(isLoading, isAuthenticated)
      if (!isLoading) {
        console.log('Not loading...')
        if (!isAuthenticated) {
          console.log('Not authenticated...')
          router.push('/login')
        }

        setReady(true)
      }
    }, [router, isAuthenticated, isLoading])

    if (!ready) {
      return null
    }

    return <Component {...props} />
  }
}
