import { useContext } from "react";
import Button from "../Button";
import Modal from "../Modal";
import AppContext from "../../context";

const Confirmation = () => {

  const {
    showConfirmation,
    confirmation,
    setConfirmation
  } = useContext(AppContext)

  const handleClose = () => {
    setConfirmation && setConfirmation(null)
  }

  const handleConfirm = () => {
    confirmation?.onConfirm && confirmation?.onConfirm()
    handleClose()
  }

  return (
    <Modal
      open={showConfirmation}
      onClose={handleClose}
      overlayStyle={'!z-[1000]'}
      bodyStyle={'max-w-xl space-y-4'}>
      <div>
        <h4>{confirmation?.title}</h4>
        <p>{confirmation?.message}</p>
      </div>

      <div className="flex gap-4 justify-end">
        <Button onClick={handleClose} outline>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
    </Modal>
  )
}

export default Confirmation
