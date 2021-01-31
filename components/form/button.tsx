import React, {ComponentProps} from 'react'
import Link from 'next/link'

interface Props extends ComponentProps<any> {
  className: string
  isLink?: boolean
}

const defaultClasses = `inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`

function Button({isLink, href, className = '', ...rest}: Props) {
  return isLink ? (
    <Link href={href}>
      <a className={`${defaultClasses} ${className}`} {...rest} />
    </Link>
  ) : (
    <button className={`${defaultClasses} ${className}`} {...rest} />
  )
}

export default Button
