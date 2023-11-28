const Button = ({
  outline = false,
  link,
  type = 'button',
  isLoading = false,
  isComing = false,
  className = '',
  children,
  ...rest
}) => {

  const coming = <div className="absolute bg-gray-800 dark:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2 px-4">Coming Soon</div>

  const classes = `
    inline-flex min-w-fit items-center justify-center px-5 md:px-10 py-3 text-xs md:text-sm tracking-widest
    ${outline ? 'bg-white text-primary border border-primary' : 'bg-primary text-white '}
    ${outline ? 'hover:bg-gray-200 ' : ' '}
    transition ease-in-out duration-150 relative group ${className}`;

  if (link) {
    return (
      <a className={classes} disabled={isLoading} {...rest}>
        {isLoading ? 'loading' : children}
        {isComing && coming}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={isLoading} {...rest} >
      {isLoading ? 'loading' : children}
      {isComing && coming}
    </button>
  )
};

export default Button;
