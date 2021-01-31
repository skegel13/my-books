import React, {ComponentProps} from 'react'
import Link from 'next/link'

interface Props extends ComponentProps<any> {
  isLink?: boolean
}

const className = `inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`

function Button({isLink, href, ...rest}: Props) {
  return isLink ? (
    <Link href={href}>
      <a className={`${className}`} {...rest} />
    </Link>
  ) : (
    <button className={`${className}`} {...rest} />
  )
}

export default Button
