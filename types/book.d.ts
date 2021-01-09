declare namespace Model {
  interface Book {
    id: number;
    title: string;
    cover_image: string;
    type: 'Digital' | 'Audiobook';
    status: 'want' | 'own' | 'reading' | 'read';
  }
}
