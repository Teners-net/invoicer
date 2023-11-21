import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { useContext } from "react";
import AppContext from "../../context";
import Button from "../Button";
import SelectInput from "../Form/Select";
import TextInput from "../Form/TextInput";
import Modal from "../Modal";

const PaymentChannel = ({ show, setClose, channel, currencies }) => {

  const { data, setData, post, patch, processing, errors, reset } = useForm({
    bank_name: channel?.bank_name ?? '',
    account_name: channel?.account_name ?? '',
    account_number: channel?.account_number ?? '',
    currency_id: channel?.currency_id ?? '',
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const handleClose = () => {
    reset()
    setClose && setClose()
  }

  const submit = (e) => {
    e.preventDefault();

    channel ?
      patch(route('payment_channels.update', channel), {
        preserveScroll: true,
        onSuccess: () => handleClose(),
      }) :
      post(route('payment_channels.store'), {
        preserveScroll: true,
        onSuccess: () => handleClose(),
      })
  }

  const { setConfirmation } = useContext(AppContext)

  return (
    <Modal open={show ?? errors} onClose={handleClose}>
      <form onSubmit={submit} className="p-3 md:p-6" nonce="payment-channel">
        <h3 className="h4">{channel ? 'Update Channel' : 'Create Channel'}</h3>

        <div className="grid md:grid-cols-2">
          <div className="py-2 md:pt-12 md:pb-12 md:pr-12 md:border-r space-y-4 md:space-y-6">

            <TextInput
              label="Bank Name *"
              name="bank_name"
              value={data.bank_name}
              error={errors.bank_name}
              required
              onChange={handleChange}
            />

            <TextInput
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

            <TextInput
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
