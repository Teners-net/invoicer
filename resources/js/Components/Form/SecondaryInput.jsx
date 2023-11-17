import React, { forwardRef } from 'react';

const SecondaryInput = forwardRef(({
  wrapperStyle = '',
  inputStyle = '',
  label,
  id,
  name,
  error = '',
  touched = true,
  children,
  ...rest
}, ref) => {
  return (
    <div>
      <label htmlFor={id ?? name} className={`md:mt-1 p flex justify-start items-center gap-4 p-3 bg-gray-50 dark:bg-gray-950 border ${(error && touched) && 'border-red-500'} ${wrapperStyle}`}>
        <input ref={ref} id={id ?? name} name={name} className={`p-0 bg-transparent outline-none focus:bg-inherit ${inputStyle}`} {...rest} />
        <p className='flex-1'>{label}</p>
      </label>
      {(error && touched) && <small className="text-red-500">{error}</small>}
    </div>
  );
});

export default SecondaryInput;
