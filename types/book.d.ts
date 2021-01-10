declare namespace Model {
  interface Book {
    id: number
    key: string
    published: number
    title: string
    cover: string
    author: string
    type: 'Digital' | 'Audiobook'
    status: 'want' | 'own' | 'reading' | 'read'
  }
}
