import Axios from 'axios'
import {parseCookies} from 'nookies'

function client() {
  const jwt = parseCookies().jwt

  return Axios.create({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export async function fetchBooks(): Promise<Model.Book[]> {
  const {data} = await client().get(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/books`,
  )

  return data
}

export async function saveBook(book: Model.Book): Promise<Model.Book> {
  const {data} = await client().post(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/books`,
    book,
  )

  return data
}
