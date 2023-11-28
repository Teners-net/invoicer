const Section = ({
  block = false,
  fluid = false,
  bottom = false,
  className = '',
  children,
}) => {
  return (
    <section className={`mx-auto ${block ? '' : 'pt-7 md:pt-14'} ${bottom ? 'pb-7 md:pb-14' : ''} ${fluid ? '' : 'max-w-[95vw] md:max-w-[86vw]'} ${className} `}>
      {children}
    </section>
  )
}

export default Section
