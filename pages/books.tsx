import React from 'react';
import { useQuery } from 'react-query';
import { fetchBooks } from '../api/books';
import Layout from '../components/layout';
import Section from '../components/Section';
import Book from '../components/book';
import Error from 'next/error';
import { AxiosError } from 'axios';

function Books() {
  const { data, isError, isLoading, error } = useQuery('books', fetchBooks);

  if (isError) {
    return (
      <Error
        statusCode={(error as AxiosError).response.data.statusCode}
        title={(error as AxiosError).response.data.error}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="absolute h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Layout title="Books">
      <Section className="py-4">
        <div className="text-right">
          <button type="button">+ Add Book</button>
        </div>
        <ul className="py-4 grid grid-cols-4 gap-4">
          {data.map((book) => (
            <li key={book.id}>
              <Book book={book} />
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  );
}

export default Books;
