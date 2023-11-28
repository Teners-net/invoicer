const Card = ({
  children,
  className = '',
  flat = false
}) =>
  <div className={`bg-white ${flat ? 'border shadow-none' : 'shadow-lg'} p-3 md:p-6 text-gray-950 ${className}`}>
    {children}
  </div>

export default Card
