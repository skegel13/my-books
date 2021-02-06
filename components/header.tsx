import React from 'react'
import BookLookup from './form/book-lookup'
import useAuth from '../context/auth-context'
import Button from './form/button'
import {useBook} from '../context/book-context'
import Link from 'next/link'

function Header() {
  const {isAuthenticated, isLoading, logout} = useAuth()
  const [selectedBook, setSelectedBook] = useBook()

  return (
    <header className="py-6 bg-white border-b border-gray-300">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-3 items-center">
          <Link href="/">
            <a>
              <h1 className="font-serif text-lg font-bold tracking-tight">
                MyBooks
              </h1>
            </a>
          </Link>
          <div className="text-center">
            {isAuthenticated && (
              <BookLookup value={selectedBook} setValue={setSelectedBook} />
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
