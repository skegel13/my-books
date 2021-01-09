import React from 'react'

interface Props {
  htmlFor?: string
  children: React.ReactNode
}

function Label({children, ...rest}: Props) {
  return (
    <label {...rest} className="text-sm font-medium uppercase">
      {children}
    </label>
  )
}

export default Label
