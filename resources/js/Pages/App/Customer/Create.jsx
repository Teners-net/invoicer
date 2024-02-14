import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import Input from "../../../Components/Form/Input";
import Modal from "../../../Components/Modal";

const CreateCustomer = ({ customer, setCustomer, show, setShow }) => {

  const empty = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
  }

  const [data, setData] = useState(empty)
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    (customer) ? setData(customer) : setData(empty)
  }, [customer])

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

    setProcessing(true)

    if (customer) {
      Inertia.patch(
        route('customers.update', customer),
        data,
        {
          onError: e => {
            setErrors(e)
            setProcessing(false)
          },
          onSuccess: handleClose(),
        }
      )
      return;
    }
    else Inertia.post(
      route('customers.store'),
      data,
      {
        onError: e => {
          setErrors(e)
          setProcessing(false)
        },
        onSuccess: handleClose()
      }
    );
  }

  const handleClose = () => {
    setCustomer && setCustomer(null)
    setShow(false)
    setProcessing(false)
  }

  return (
    <Modal open={show} onClose={handleClose}>
      <h4>{customer ? 'Edit Customer' : 'Create New Customer'}</h4>

      <form onSubmit={submit} className="p-3 md:p-6">

        <div className="grid md:grid-cols-2">
          <div className="py-2 md:pt-12 md:pb-12 md:pr-12 md:border-r space-y-4 md:space-y-6">
            <Input
              label="Customer's Firstname *"
              name="first_name"
              value={data.first_name}
              error={errors.first_name}
              required
              onChange={handleChange}
            />

            <Input
              label="Customer's Lastname"
              name="last_name"
              value={data.last_name}
              error={errors.last_name}
              onChange={handleChange}
            />

            <Input
              label="Customer's Email *"
              name="email"
              value={data.email}
              error={errors.email}
              required
              onChange={handleChange}
            />
          </div>

          <div className="py-2 md:pt-12 md:pb-12 md:pl-12 space-y-4 md:space-y-6">

            <Input
              label="Customer's Phone"
              name="phone"
              value={data.phone}
              error={errors.phone}
              onChange={handleChange}
            />

            <Input
              label="Customer Address"
              name="address"
              value={data.address}
              error={errors.address}
              onChange={handleChange}
              textarea
              rows={5}
              wrapperStyle={'!p-2'}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            isLoading={processing}>
            {customer ? 'Update' : 'Create'}
          </Button>
        </div>

      </form>
    </Modal>
  );
}

export default CreateCustomer
