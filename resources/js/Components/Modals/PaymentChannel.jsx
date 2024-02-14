import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context";
import Button from "../Button";
import SelectInput from "../Form/Select";
import Input from "../Form/Input";
import Modal from "../Modal";

const PaymentChannel = ({ show, setClose, channel, currencies }) => {

  const empty = {
    bank_name: '',
    account_name: '',
    account_number: '',
    currency_id: '',
  }

  const [data, setData] = useState(empty)
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    (channel) ? setData(channel) : setData(empty)
  }, [channel])

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setData(values => ({
      ...values,
      [key]: value,
    }))
  }

  const submit = (e) => {
    e.preventDefault();

    channel ?
      Inertia.patch(
        route('payment_channels.update', channel),
        data,
        {
          onError: e => {
            setErrors(e)
            setProcessing(false)
          },
          onSuccess: handleClose(),
        }
      ) :
      Inertia.post(
        route('payment_channels.store'),
        data,
        {
          onError: e => {
            setErrors(e)
            setProcessing(false)
          },
          onSuccess: handleClose(),
        }
      )
  }

  const handleClose = () => {
    setProcessing(false)
    setClose && setClose()
  }

  const { setConfirmation } = useContext(AppContext)

  return (
    <Modal open={show ?? errors} onClose={handleClose}>
      <form onSubmit={submit} className="p-3 md:p-6" nonce="payment-channel">
        <h3 className="h4">{channel ? 'Update Channel' : 'Create Channel'}</h3>

        <div className="grid md:grid-cols-2">
          <div className="py-2 md:pt-12 md:pb-12 md:pr-12 md:border-r space-y-4 md:space-y-6">

            <Input
              label="Bank Name *"
              name="bank_name"
              value={data.bank_name}
              error={errors.bank_name}
              required
              onChange={handleChange}
            />

            <Input
              label="Account Name *"
              name="account_name"
              value={data.account_name}
              error={errors.account_name}
              required
              onChange={handleChange}
            />
          </div>

          <div className="py-2 md:pt-12 md:pb-12 md:pl-12 space-y-4 md:space-y-6">
            <SelectInput
              label="Currency *"
              name="currency_id"
              value={data.currency_id}
              error={errors.currency_id}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {currencies?.map(_ => <option key={_.id} value={_.id}>{_.name} ({_.symbol})</option>)}
            </SelectInput>

            <Input
              label="Account Number *"
              name="account_number"
              value={data.account_number}
              error={errors.account_number}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {
            channel &&
            <Button outline onClick={() => setConfirmation({
              title: "Delete Channel?",
              message: "Are you sure you want to delete this Payment Channel",
              onConfirm: () => {
                Inertia.delete(route('payment_channels.destroy', channel))
                handleClose()
              }
            })}>Delete</Button>
          }

          <div></div>

          <Button
            type="submit"
            isLoading={processing}>
            {channel ? 'Update' : 'Create'}
          </Button>
        </div>

      </form>
    </Modal>
  );
}

export default PaymentChannel
