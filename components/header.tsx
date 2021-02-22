import React, {useState} from 'react'
import BookLookup from './form/book-lookup'
import useAuth from '../context/auth-context'
import Button from './form/button'
import {useBook} from '../context/book-context'
import Link from 'next/link'

function Header() {
  const {isAuthenticated, isLoading, logout} = useAuth()
  const [selectedBook, setSelectedBook] = useBook()
  const [showSearch, setShowSearch] = useState(false)

  function toggleSearch() {
    setShowSearch(!showSearch)
  }

  return (
    <header className="relative py-6 bg-white border-b border-gray-300">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between space-x-3">
          <Link href="/">
            <a>
              <h1 className="font-serif text-lg font-bold tracking-tight">
                MyBooks
              </h1>
            </a>
          </Link>
          <div className="flex items-center justify-end flex-1 max-w-md">
            {isAuthenticated && (
              <>
                <button
                  className="inline-flex w-6 h-6 mr-2 sm:hidden"
                  type="button"
                  onClick={toggleSearch}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute left-0 right-0 w-full p-4 sm:p-0 bg-white border-t-2 border-gray-100 shadow-md top-full sm:border-none sm:shadow-none sm:static sm:block ${
                    showSearch ? '' : 'hidden'
                  }`}
                >
                  <BookLookup value={selectedBook} setValue={setSelectedBook} />
                </div>
              </>
            )}
          </div>
          <div className="text-right">
            {isAuthenticated && (
              <Button onClick={logout} type="button">
                Logout
              </Button>
            )}
            {!isAuthenticated && !isLoading && (
              <Button isLink href="/login">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
