const Section = ({ children, block, fluid, className }) => {
  return (
    <section className={`mx-auto ${block ? '' : 'pt-8 md:pt-16'} ${fluid ? '' : 'max-w-[92vw] md:max-w-[78vw]'} ${className} `}>
      {children}
    </section>
  )
}

export default Section
