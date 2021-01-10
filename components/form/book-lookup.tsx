import React, {useEffect, useState} from 'react'
import AsyncSelect from 'react-select/async'
import {BookResult, search} from '../../api/open-library'

interface Props {
  value: BookResult
  setValue: (data: BookResult) => void
}

async function searchBooks(query) {
  const data = await search(query)
  return data?.docs || []
}

function BookLookup({value, setValue}: Props) {
  const [selectRef, setSelectRef] = useState(null)

  useEffect(() => {
    if (!value) {
      selectRef?.select?.select.clearValue()
    }
  }, [value, selectRef])

  return (
    <AsyncSelect
      ref={setSelectRef}
      isClearable={true}
      loadOptions={searchBooks}
      getOptionLabel={option => (
        <div className="flex items-center space-x-2">
          {option.cover_i && (
            <img
              src={`http://covers.openlibrary.org/b/id/${option.cover_i}-S.jpg`}
              alt={option.title}
            />
          )}
          <div className="flex flex-col">
            <span>{option.title}</span>
            <span className="text-gray-600 text-xs">
              {option.author_name?.[0] || option.author_name}
            </span>
          </div>
        </div>
      )}
      placeholder="Search by title..."
      onChange={setValue}
    />
  )
}

export default BookLookup
