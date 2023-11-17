const Section = ({ children, block, fluid, bottom, className }) => {
  return (
    <section className={`mx-auto ${block ? '' : 'pt-8 md:pt-16'} ${bottom ? 'pb-8 md:pb-16' : ''} ${fluid ? '' : 'max-w-[95vw] md:max-w-[80vw]'} ${className} `}>
      {children}
    </section>
  )
}

export default Section
