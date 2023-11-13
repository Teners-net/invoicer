const Card = ({ children, className }) =>
    <div className={`bg-white shadow-lg p-4 md:p-8 text-gray-950 ${className}`}>
        {children}
    </div>

export default Card