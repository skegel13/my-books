import Axios from 'axios'

export interface BookResult {
  cover_i: number
  title: string
  key: string
  first_publish_year: number
  author_name: string[]
}

export interface SearchResults {
  numFound: number
  docs: BookResult[]
}

const client = Axios.create({
  baseURL: 'https://openlibrary.org',
})

export async function search(query: string): Promise<SearchResults> {
  const {data} = await client.get('search.json', {
    params: {
      q: query,
      facet: false,
      _spellcheck_count: 0,
      limit: 20,
      fields: 'key,cover_i,title,author_name,name,first_publish_year',
      mode: 'everything',
    },
  })

  return data
}
