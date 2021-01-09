import React, {ComponentProps, forwardRef} from 'react'
import Label from './label'

interface Props extends ComponentProps<any> {
  error?: {message?: string}
  id: string
  label: string
  name: string
  placeholder?: string
  register: any
  type: string
  defaultValue?: string
}

function TextInput(
  {id, error, label, defaultValue, type = 'text', ...rest}: Props,
  ref,
) {
  return (
    <div className={error && 'has-error'}>
      <div className="relative py-3 font-medium">
        <Label htmlFor={id}>{label}</Label>
        <input
          id={id}
          className={`mt-1 block w-full`}
          ref={ref}
          defaultValue={defaultValue}
          type={type}
          {...rest}
        />
      </div>
      {error && (
        <p className="mb-2 ml-2 -mt-2 text-xs font-medium text-red-500">
          {error?.message}
        </p>
      )}
    </div>
  )
}

export default forwardRef(TextInput)
