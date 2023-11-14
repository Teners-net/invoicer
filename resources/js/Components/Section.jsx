const Section = ({ children, block, fluid, className }) => {
  return (
    <section className={`mx-auto ${block ? '' : 'pt-10 md:pt-20'} ${fluid ? '' : 'max-w-[92vw] md:max-w-[80vw]'} ${className} `}>
      {children}
    </section>
  )
}

export default Section
