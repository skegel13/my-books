import {useRouter} from 'next/router'
import React, {FormEvent, useState} from 'react'
import Alert from '../components/alert'
import Layout from '../components/layout'
import useAuth from '../context/auth-context'
import {login as apiLogin} from '../api/auth'
import Button from '../components/form/button'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {login} = useAuth()
  const router = useRouter()

  const loginUser = async (event: FormEvent) => {
    setError('')
    event.preventDefault()

    try {
      const data = await apiLogin(username, password)
      login(data.jwt, data.user)
      await router.push('/books')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Layout title="Login">
      <div className="flex flex-col justify-center px-4 h-full sm:px-6 lg:px-8">
        <div className="-mt-32 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-medium tracking-tight text-center text-gray-900">
            Sign in to MyBooks
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-col gap-y-4 py-8 px-4 bg-white rounded-md shadow sm:rounded-lg sm:px-10">
            {error ? (
              <Alert type="error" toggle={() => setError('')}>
                {error}
              </Alert>
            ) : (
              ''
            )}
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={loginUser}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    required
                    className="block py-2 px-3 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    required
                    className="block py-2 px-3 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
