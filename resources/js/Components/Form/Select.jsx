import React, { forwardRef } from 'react';

const SelectInput = forwardRef(({
  wrapperStyle = '',
  inputStyle = '',
  label,
  id,
  name,
  prepend = <></>,
  postpend = <></>,
  error = '',
  touched = true,
  children,
  ...rest
}, ref) => {
  return (
    <div>
      {label && <label htmlFor={id ?? name} className='p'>{label}</label>}
      <div className={`md:mt-1 flex p-3 bg-gray-50 dark:bg-gray-950 border md:border-2 ${(error && touched) && 'border-red-500'} ${wrapperStyle}`}>
        {prepend}
        <select ref={ref} id={id ?? name} name={name} className={`flex-1 p-0 bg-transparent outline-none w-full placeholder:font-light focus:bg-inherit ${inputStyle}`} {...rest} >
          {children}
        </select>
        {postpend}
      </div>
      {(error && touched) && <small className="text-red-500">{error}</small>}
    </div>
  );
});

export default SelectInput;
