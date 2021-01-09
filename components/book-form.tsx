import React from 'react'
import TextInput from './form/text-input'
import {useForm} from 'react-hook-form'
import Button from './form/button'
import {saveBook} from '../api/books'
import {useMutation, useQueryClient} from 'react-query'

interface Props {
  onSave: () => void
}

function BookForm({onSave}: Props) {
  const queryClient = useQueryClient()
  const {register, handleSubmit, errors, reset} = useForm({
    defaultValues: {
      title: '',
      type: 'Digital',
      status: 'want',
    },
  })
  const mutation = useMutation((book: Model.Book) => saveBook(book), {
    onSuccess() {
      queryClient.invalidateQueries('books')
    },
  })

  async function onSubmit(data) {
    try {
      mutation.mutate(data as Model.Book)
      reset()
      onSave()
    } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        ref={register({required: 'Title is required'})}
        error={errors.title}
      />

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

      <div className="py-3 text-right">
        <Button>Add Book</Button>
      </div>
    </form>
  )
}

export default BookForm
