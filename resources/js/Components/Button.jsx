const Button = ({
  outline,
  link,
  type = 'button',
  isLoading = false,
  className,
  children,
  ...rest
}) => {

  const classes = `
    flex flex-nowrap min-w-fit items-center justify-center px-6 md:px-12 py-4 text-xs md:text-sm tracking-widest
    ${outline ? 'bg-white text-black border border-black' : 'bg-black text-white '}
    ${outline ? 'hover:bg-gray-200 ' : ' '}
    transition ease-in-out duration-150 ${className}`;

  if (link) {
    return (
      <a className={classes} {...rest}>
        {isLoading ? 'loading' : children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest} >
      {isLoading ? 'loading' : children}
    </button>
  )
};

export default Button;
