import Axios from 'axios'
import {destroyCookie, parseCookies} from 'nookies'
import {HttpException} from '../exceptions/http-exception'

const jwt = parseCookies().jwt

const client = Axios.create({
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
})

export async function login(
  username: string,
  password: string,
): Promise<{
  jwt: string
  user: Auth.User
}> {
  try {
    const {data} = await Axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/auth/local`,
      {
        identifier: username,
        password,
      },
    )

    return data
  } catch ({response = {}}) {
    throw new HttpException(
      response?.data?.data?.[0]?.messages?.[0]?.message || 'Failed to login',
      response?.statusCode || 400,
    )
  }
}

export async function fetchAuthUser(): Promise<Auth.User> {
  const jwt = parseCookies().jwt

  if (!jwt) {
    throw new Error('No JWT')
  }

  try {
    const {data} = await client.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    )

    return data
  } catch (err) {
    destroyCookie(null, 'jwt')
    throw err
  }
}
