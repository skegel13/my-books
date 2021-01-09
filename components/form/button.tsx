import React, {ComponentProps} from 'react'

interface Props extends ComponentProps<any> {
  isLink?: boolean
}

const className = `inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`

function Button({isLink, ...rest}: Props) {
  return isLink ? (
    <a className={`${className}`} {...rest} />
  ) : (
    <button className={`${className}`} {...rest} />
  )
}

export default Button
