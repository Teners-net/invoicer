import React, { forwardRef } from 'react';

const PrimaryInput = forwardRef(({
  wrapperStyle = '',
  inputStyle = '',
  label,
  id,
  name,
  prepend = <></>,
  postpend = <></>,
  error = '',
  touched = true,
  ...rest
}, ref) => {
  return (
    <div>
      <label htmlFor={id ?? name} className='p'>{label}</label>
      <div className={`mt-1 flex p-3 bg-gray-50 dark:bg-gray-950 border-2 ${(error && touched) && 'border-red-500'} ${wrapperStyle}`}>
        {prepend}
        <input ref={ref} id={id ?? name} name={name} className={`flex-1 p-0 bg-transparent text-xl outline-none w-full placeholder:text-xl placeholder:font-light focus:bg-inherit ${inputStyle}`} {...rest} />
        {postpend}
      </div>
      {(error && touched) && <small className="text-red-500">{error}</small>}
    </div>
  );
});

export default PrimaryInput;
