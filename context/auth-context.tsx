import React, {
  ComponentProps,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {destroyCookie, setCookie} from 'nookies'
import {useRouter} from 'next/router'
import {fetchAuthUser} from '../api/auth'

interface IAuthContext {
  user?: any
  isAuthenticated: boolean
  isLoading: boolean
  login?: (jwt: string, user: Auth.User) => void
  logout?: () => void
  [name: string]: any
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isLoading: false,
})

export const AuthProvider = ({children}: ComponentProps<any>) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchAuthUser()
      .then(data => {
        setUser(data)
        setIsLoading(false)
      })
      .catch(() => {
        setUser(null)
        setIsLoading(false)
      })
  }, [])

  const login = (jwt: string, userData: Auth.User) => {
    setCookie(null, 'jwt', jwt, {
      maxAge: 30 * 60,
      path: '/',
    })
    setUser(userData)
  }

  const logout = async () => {
    destroyCookie(null, 'jwt')

    await router.push('/login')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user: user || {},
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
