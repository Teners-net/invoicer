const Card = ({ children, className }) =>
    <div className={`bg-white shadow-lg p-3 md:p-8 text-gray-950 ${className}`}>
        {children}
    </div>

export default Card
