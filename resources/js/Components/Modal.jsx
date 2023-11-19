import React, { useEffect, useState } from 'react';

const Modal = ({
  open,
  onClose,
  canClose = true,
  overlayStyle,
  bodyStyle,
  children
}) => {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    if (!canClose) return;

    setIsOpen(false)
    onClose && onClose()
  }

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-30 p-4 transition-all h-screen overflow-y-auto ${overlayStyle}`}>
      <div className="fixed inset-0 bg-black opacity-40 z-40" onClick={handleClose}></div>
      <div className={`bg-white p-3 md:p-8 shadow-lg z-50 w-full md:w-3/4 lg:w-1/2 ${bodyStyle}`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
