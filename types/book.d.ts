declare namespace Model {
  interface Book {
    id: number;
    title: string;
    cover_image: string;
    type: 'Digital' | 'Audiobook';
    read: boolean;
    own: boolean;
  }
}
