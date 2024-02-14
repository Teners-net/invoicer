import React, { forwardRef } from 'react';

const Input = forwardRef(({
  wrapperStyle = '',
  groupStyle = '',
  inputStyle = '',
  label,
  id,
  name,
  prepend = <></>,
  postpend = <></>,
  error = '',
  touched = true,
  children,
  textarea,
  ...rest
}, ref) => {
  if (textarea) {
    return (
      <div className={`${groupStyle}`}>
        {label && <label htmlFor={id ?? name} className='p'>{label}</label>}
        <div className={`md:mt-1 flex p-3 bg-gray-50 dark:bg-gray-950 border ${(error && touched) && 'border-red-500'} ${wrapperStyle}`}>
          {prepend}
          <textarea ref={ref} id={id ?? name} name={name} className={`flex-1 p-0 bg-transparent outline-none w-full placeholder:p placeholder:font-light focus:bg-inherit ${inputStyle}`} {...rest} >
            {children}
          </textarea>
          {postpend}
        </div>
        {(error && touched) && <small className="text-red-500">{error}</small>}
      </div>
    )
  }

  return (
    <div className={`${groupStyle}`}>
      <label htmlFor={id ?? name} className='p'>{label}</label>
      <div className={`md:mt-1 flex p-3 bg-gray-50 dark:bg-gray-950 border ${(error && touched) && 'border-red-500'} ${wrapperStyle}`}>
        {prepend}
        <input ref={ref} id={id ?? name} name={name} className={`flex-1 p-0 bg-transparent outline-none w-full placeholder:p placeholder:font-light focus:bg-inherit ${inputStyle}`} {...rest} />
        {postpend}
      </div>
      {(error && touched) && <small className="text-red-500">{error}</small>}
    </div>
  );
});

export default Input;
