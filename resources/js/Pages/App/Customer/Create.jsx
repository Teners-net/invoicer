import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import TextInput from "../../../Components/Form/TextInput";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";

const CreateCustomer = ({ customer }) => {

  const { data, setData, post, patch, processing, errors, reset } = useForm({
    first_name: customer?.first_name,
    last_name: customer?.last_name,
    email: customer?.email,
    phone: customer?.phone,
    address: customer?.address,
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    customer ? patch(route('customers.update', customer)) : post(route('customers.store'));
  };

  return (
    <AppLayout title={customer ? 'Edit Customer' : 'New Customer'} onBackPress={() => Inertia.visit(route('customers.index'))}>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-3 md:p-6">

            <div className="grid md:grid-cols-2">
              <div className="py-2 md:pt-12 md:pb-12 md:pr-12 md:border-r space-y-4 md:space-y-6">
                <TextInput
                  label="Customer's Firstname *"
                  name="first_name"
                  value={data.first_name}
                  error={errors.first_name}
                  required
                  onChange={handleChange}
                />

                <TextInput
                  label="Customer's Lastname"
                  name="last_name"
                  value={data.last_name}
                  error={errors.last_name}
                  onChange={handleChange}
                />

                <TextInput
                  label="Customer's Email *"
                  name="email"
                  value={data.email}
                  error={errors.email}
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="py-2 md:pt-12 md:pb-12 md:pl-12 space-y-4 md:space-y-6">

                <TextInput
                  label="Customer's Phone"
                  name="phone"
                  value={data.phone}
                  error={errors.phone}
                  onChange={handleChange}
                />

                <TextInput
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
        </Card>
      </Section>

    </AppLayout>
  );
}

export default CreateCustomer
