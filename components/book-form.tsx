import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import Button from './form/button'
import {saveBook} from '../api/books'
import {useMutation, useQueryClient} from 'react-query'
import {BookResult} from '../api/open-library'

interface Props {
  book: BookResult
  onSave: () => void
}

function BookForm({book, onSave}: Props) {
  const queryClient = useQueryClient()
  const {register, handleSubmit, reset} = useForm({
    defaultValues: {
      key: book.key,
      title: book.title,
      author: book.author_name?.[0] || book.author_name,
      cover: book.cover_i,
      published: book.first_publish_year,
      type: 'Digital',
      status: 'want',
    },
  })

  useEffect(() => {
    reset()
  }, [])

  const mutation = useMutation((newBook: Model.Book) => saveBook(newBook), {
    onSuccess() {
      queryClient.invalidateQueries('books')
    },
  })

  async function onSubmit(data) {
    console.log(data)
    try {
      mutation.mutate(data as Model.Book)
      reset()
      onSave()
    } catch (err) {}
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="title"
          name="title"
          type="hidden"
          ref={register({required: 'Title is required'})}
        />

        <input id="key" name="key" ref={register} type="hidden" />

        <input
          id="author"
          name="author"
          ref={register({required: 'Author is required'})}
          type="hidden"
        />

        <input id="published" name="published" ref={register} type="hidden" />
        <input id="cover" name="cover" ref={register} type="hidden" />

        <div className="flex items-center space-x-8">
          <div className="h-72 overflow-hidden rounded-xl shadow-lg">
            <img
              className="object-contain w-full h-full"
              src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
          </div>

          <div>
            <h3 className="mt-2 text-gray-700 text-lg leading-snug font-semibold">
              {book.title}
            </h3>
            <h4 className="text-gray-500 leading-tight">
              {book.author_name[0]}
            </h4>
            <p className="text-sm text-gray-500 leading-tight">
              {book.first_publish_year}
            </p>
            <div className="py-3">
              <p className="text-sm font-medium uppercase">Type</p>
              <label className="flex items-center space-x-2">
                <input
                  name="type"
                  type="radio"
                  value="Digital"
                  ref={register({required: true})}
                />
                <span>Digital</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  name="type"
                  type="radio"
                  value="Audiobook"
                  ref={register({required: true})}
                />
                <span>Audiobook</span>
              </label>
            </div>
            <div className="py-3">
              <p className="text-sm font-medium uppercase">Status</p>
              <label className="flex items-center space-x-2">
                <input
                  name="status"
                  type="radio"
                  value="want"
                  ref={register({required: true})}
                />
                <span>Want</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  name="status"
                  type="radio"
                  value="own"
                  ref={register({required: true})}
                />
                <span>Own</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  name="status"
                  type="radio"
                  value="reading"
                  ref={register({required: true})}
                />
                <span>Reading</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  name="status"
                  type="radio"
                  value="read"
                  ref={register({required: true})}
                />
                <span>Read</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <Button>Add Book</Button>
        </div>
      </form>
    </>
  )
}

export default BookForm
