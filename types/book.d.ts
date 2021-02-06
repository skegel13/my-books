declare namespace Model {
  type BookStatus = 'want' | 'own' | 'reading' | 'read'

  interface Book {
    id: number
    key: string
    published: number
    title: string
    cover: string
    author: string
    type: 'Digital' | 'Audiobook'
    status: BookStatus
  }
}
