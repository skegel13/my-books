import React from 'react'
import Badge from './badge'
import {capitalize} from '../helpers/helpers'
import {Menu, MenuList, MenuButton, MenuItem} from '@reach/menu-button'
import {deleteBook, updateBookStatus} from '../api/books'
import {useMutation, useQueryClient} from 'react-query'

interface Props {
  book: Model.Book
}

interface BookAction {
  status: Model.Book['status']
  text: string
}

const bookActions: BookAction[] = [
  {
    status: 'want',
    text: 'Want',
  },
  {
    status: 'own',
    text: 'Own',
  },
  {
    status: 'reading',
    text: 'Reading',
  },
  {
    status: 'read',
    text: 'Read',
  },
]

function fetchAvailableActions(status: Model.Book['status']) {
  const actions = bookActions.filter(item => item.status !== status)
  return actions
}

function Book({book}: Props) {
  const queryClient = useQueryClient()
  const actions = fetchAvailableActions(book.status)

  const statusMutation = useMutation(
    (data: {id: number; status: Model.Book['status']}) =>
      updateBookStatus(data.id, data.status),
    {
      onSuccess() {
        queryClient.invalidateQueries('books')
      },
    },
  )

  const deleteMutation = useMutation((id: number) => deleteBook(id), {
    onSuccess() {
      queryClient.invalidateQueries('books')
    },
  })

  function handleAction(action: BookAction) {
    statusMutation.mutate({id: book.id, status: action.status})
  }

  function onDeleteBook() {
    deleteMutation.mutate(book.id)
  }

  return (
    <div className="relative overflow-hidden font-medium tracking-tight bg-white rounded-md shadow-lg">
      <div className="absolute top-2 right-2">
        <Menu>
          {({isExpanded}) => (
            <>
              <MenuButton
                className={`flex items-center p-2 text-gray-800 bg-gray-100 rounded-full hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500
                ${isExpanded ? `opacity-100` : `opacity-70`}
              `}
              >
                <>
                  <span className="sr-only">Open options</span>
                  {/*// <!-- Heroicon name: solid/dots-vertical -->*/}
                  <svg
                    className={`w-5 h-5 transform transition ${
                      isExpanded ? `rotate-90 opacity-100` : ``
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </>
              </MenuButton>
              <MenuList className="right-0 w-40 max-w-3xl py-2 mt-2 overflow-hidden text-sm bg-gray-800 border border-gray-200 rounded shadow-2xl text-gray-50 border-opacity-30">
                <MenuItem
                  className="px-6 py-2 pb-0 mb-1 text-xs font-medium tracking-tighter text-gray-100 uppercase opacity-70"
                  onSelect={() => null}
                >
                  Status
                </MenuItem>
                {actions.map(action => (
                  <MenuItem
                    key={action.status}
                    className="px-6 py-1 cursor-pointer hover:bg-blue-800"
                    onSelect={() => handleAction(action)}
                  >
                    {action.text}
                  </MenuItem>
                ))}
                <MenuItem
                  className="px-6 py-2 pb-0 mb-1 text-xs font-medium tracking-tighter text-gray-100 uppercase border-t border-gray-600 opacity-70"
                  onSelect={() => null}
                >
                  Actions
                </MenuItem>
                <MenuItem
                  className="px-6 py-1 cursor-pointer hover:bg-blue-800"
                  onSelect={() => onDeleteBook()}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>
      <div className="w-full bg-center bg-cover">
        <img
          className="w-full h-auto"
          alt={book.title}
          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
        />
      </div>
      <div className="p-4">
        <h2 className="text-sm leading-tight truncate">{book.title}</h2>
        <div className="py-2 space-x-4">
          <span className="text-blue-500" title={book.type}>
            {book.type === 'Digital' ? (
              <svg
                className="inline-block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            ) : (
              <svg
                className="inline-block w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          {book.status && <Badge>{capitalize(book.status)}</Badge>}
        </div>
      </div>
    </div>
  )
}

export default Book
