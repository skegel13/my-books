import Axios from 'axios'
import Cookies from 'js-cookie'

const client = Axios.create({
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
})

export async function fetchBooks(): Promise<Model.Book[]> {
  const {data} = await client.get(`${process.env.NEXT_PUBLIC_STRAPI_API}/books`)

  return data
}

export async function saveBook(book: Model.Book): Promise<Model.Book> {
  const {data} = await client.post(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/books`,
    book,
  )

  return data
}
