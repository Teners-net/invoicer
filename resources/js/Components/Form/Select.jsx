import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Select(
  { name, id, className, required, isFocused, handleChange, options = [], children, value, valueKey='id', labelKey='title' },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) input.current.focus();
  }, []);

  return (
    <select
      name={name}
      id={id}
      className={
        `rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm ` +
        className
      }
      ref={input}
      required={required}
      onChange={(e) => handleChange(e)}
      defaultValue={value}
    >
      {children}
      {options.map((option, i) => {
        return (<option key={i} value={option[valueKey]} className='text-sm'> {option[labelKey]} </option>)
      })}
    </select>
  );
});