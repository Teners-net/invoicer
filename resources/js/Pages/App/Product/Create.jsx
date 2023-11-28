import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import SelectInput from "../../../Components/Form/Select";
import TextInput from "../../../Components/Form/TextInput";
import Modal from "../../../Components/Modal";

const CreateProduct = ({ product, setProduct, show, setShow }) => {

  const { config, currencies, company } = usePage().props

  const empty = {
    name: '',
    price: '',
    stock: '',
    description: '',
    type: '',
    currency_id: company?.currency_id
  }

  const [data, setData] = useState(empty)
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    (product) ? setData(product) : setData(empty)
  }, [product])

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setData(values => ({
      ...values,
      [key]: value,
    }))
  }

  const handleClose = () => {
    setProduct && setProduct(null)
    setShow(false)
    setProcessing(false)
  }

  const submit = async (e) => {
    e.preventDefault();

    setProcessing(true)

    const options = {
      onError: e => {
        setErrors(e)
        setProcessing(false)
      },
      onSuccess: handleClose()
    }

    if (product) Inertia.patch(route('products.update', product), data, options)
    else Inertia.post(route('products.store'), data, options);
  }

  return (
    <Modal open={show} onClose={handleClose}>
      <h4>{product ? 'Edit Product' : 'Create New Product'}</h4>

      <form onSubmit={submit} >

        <div className="grid md:grid-cols-2">
          <div className="py-4 md:pr-6 md:border-r space-y-4 md:space-y-6">
            <TextInput
              label="Product Name *"
              name="name"
              value={data.name}
              error={errors.name}
              required
              onChange={handleChange}
            />

            <TextInput
              label="Unit Price *"
              name="price"
              type='number'
              min={0.01}
              step={0.01}
              required
              value={data.price}
              error={errors.price}
              onChange={handleChange}
            />

            <SelectInput
              label="Product Type *"
              name="type"
              required
              value={data.type}
              error={errors.type}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="GOODS">Goods (Physical Items)</option>
              <option value="SERVICE">Services</option>
            </SelectInput>

            {data.type != 'SERVICE' && <TextInput
              label="Number in Stock"
              name="stock"
              value={data.stock}
              error={errors.stock}
              onChange={handleChange}
            />}
          </div>

          <div className="md:py-4 md:pl-6 space-y-4 md:space-y-6">
            <SelectInput
              label="Currency"
              name="currency_id"
              value={data.currency_id}
              error={errors.currency_id}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {currencies?.map(_ => <option value={_.id} key={_.id}>{_.name} ({_.symbol})</option>)}
            </SelectInput>

            <div>
              <label htmlFor="note" className='p'>{"Product Description"}</label>
              <Editor
                value={data.description}
                apiKey={config.tiny_mce}
                textareaName='description'
                init={{ height: 250 }}
                onEditorChange={(newValue, editor) =>
                  setData(values => ({
                    ...values,
                    description: newValue
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            isLoading={processing}>
            {product ? 'Update' : 'Create'}
          </Button>
        </div>

      </form>
    </Modal>
  );
}

export default CreateProduct
