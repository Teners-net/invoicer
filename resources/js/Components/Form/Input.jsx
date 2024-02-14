import { forwardRef, useEffect, useRef } from 'react';

const Input = forwardRef(({
  wrapperStyle,
  groupStyle,
  inputStyle,
  useLabel = true,
  label,
  id,
  name,
  prepend = <></>,
  postpend = <></>,
  error,
  touched = true,
  children,
  textarea,
  select,
  isFocused = false,
  ...extras
}, ref) => {
  const input = ref ? ref : useRef();

  useEffect(() => {
    isFocused && input.current.focus()
  }, [])

  const props = {
    className: `p-0 bg-transparent flex-1 outline-none w-full placeholder:p placeholder:font-light focus:bg-inherit ${inputStyle}`,
    id: id ?? name,
    name: name ?? id,
    ref: input,
    ...extras,
  }

  return (
    <div className={`${groupStyle}`}>
      {useLabel && <label htmlFor={id ?? name} className='p capitalize'>{label ?? props.name}</label>}
      <div className={`md:mt-1 flex p-3 bg-gray-50 dark:bg-gray-950 border ${(error && touched) && 'border-red-500'} ${wrapperStyle}`}>
        {prepend}
        {
          textarea ?
            <textarea {...props}>{children}</textarea> :
            (select ? <select {...props}>{children}</select> : <input {...props} />)
        }
        {postpend}
      </div>
      {(error && touched) && <small className="text-red-500">{error}</small>}
    </div>
  )
});

export default Input;
