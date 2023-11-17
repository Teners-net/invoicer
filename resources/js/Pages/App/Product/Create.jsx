import { useForm } from "@inertiajs/inertia-react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import TextInput from "../../../Components/Form/TextInput";
import SelectInput from "../../../Components/Form/Select";
import { Inertia } from "@inertiajs/inertia";

const CreateProduct = ({ product, currencies }) => {

  const { data, setData, post, patch, processing, errors, reset } = useForm({
    name: product?.name,
    price: product?.price,
    stock: product?.stock,
    description: product?.description,
    type: product?.type,
    currency_id: product?.currency_id
  });

  const onHandleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    product ? patch(route('products.update', product)) : post(route('products.store'));
  };

  return (
    <AppLayout title={product ? 'Edit Product' : 'Create New Product'} onBackPress={() => Inertia.visit(route('products.index'))}>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-3 md:p-6">

            <div className="grid md:grid-cols-2">
              <div className="py-2 md:pt-12 md:pb-12 md:pr-12 md:border-r space-y-4 md:space-y-6">
                <TextInput
                  label="Product Name *"
                  name="name"
                  value={data.name}
                  error={errors.name}
                  required
                  onChange={onHandleChange}
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
                  onChange={onHandleChange}
                />

                <SelectInput
                  label="Product Type *"
                  name="type"
                  required
                  value={data.type}
                  error={errors.type}
                  onChange={onHandleChange}
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
                  onChange={onHandleChange}
                />}
              </div>

              <div className="py-2 md:pt-12 md:pb-12 md:pl-12 space-y-4 md:space-y-6">

                <SelectInput
                  label="Currency"
                  name="currency_id"
                  value={data.currency_id}
                  error={errors.currency_id}
                  onChange={onHandleChange}
                >
                  <option value="">Select</option>
                  {currencies?.map(_ => <option value={_.id}>{_.name} ({_.symbol})</option>)}
                </SelectInput>

                <TextInput
                  label="Product Description"
                  name="description"
                  value={data.description}
                  error={errors.description}
                  onChange={onHandleChange}
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
                {product ? 'Update' : 'Create'}
              </Button>
            </div>

          </form>
        </Card>
      </Section>

    </AppLayout>
  );
}

export default CreateProduct
