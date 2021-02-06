import Axios from 'axios'
import {parseCookies} from 'nookies'

function client() {
  const jwt = parseCookies().jwt

  return Axios.create({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    baseURL: `${process.env.NEXT_PUBLIC_STRAPI_API}`,
  })
}

export async function fetchBooks(): Promise<Model.Book[]> {
  const {data} = await client().get('books')

  return data
}

export async function saveBook(book: Model.Book): Promise<Model.Book> {
  const {data} = await client().post('books', book)

  return data
}

export async function updateBookStatus(
  id: number,
  status: Model.Book['status'],
): Promise<Model.Book> {
  const {data} = await client().put(`books/${id}`, {status})

  return data
}

export async function deleteBook(id: number) {
  await client().delete(`books/${id}`)
}
