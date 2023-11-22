import { useForm, usePage } from "@inertiajs/inertia-react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import TextInput from "../../../Components/Form/TextInput";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";

const Create = () => {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    website: '',
    rc_number: '',
    contact_number: '',
    contact_email: '',
    address: '',
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('company.store'));
  }

  return (
    <AppLayout title='Company Setup'>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-3 md:p-6">

            <div className="grid md:grid-cols-2">
              <div className="py-2 md:pt-12 md:pb-12 md:pr-12 md:border-r space-y-4 md:space-y-6">
                <TextInput
                  label="Company Name *"
                  name="name"
                  value={data.name}
                  error={errors.name}
                  required
                  onChange={handleChange}
                />

                <TextInput
                  label="Website"
                  name="website"
                  value={data.website}
                  error={errors.website}
                  onChange={handleChange}
                />

                <TextInput
                  label="RC Number"
                  name="rc_number"
                  value={data.rc_number}
                  error={errors.rc_number}
                  onChange={handleChange}
                />
              </div>

              <div className="py-2 md:pt-12 md:pb-12 md:pl-12 space-y-4 md:space-y-6">
                <TextInput
                  label="Contact Email"
                  name="contact_email"
                  value={data.contact_email}
                  error={errors.contact_email}
                  onChange={handleChange}
                />

                <TextInput
                  label="Contact Tel. Number"
                  name="contact_number"
                  value={data.contact_number}
                  error={errors.contact_number}
                  onChange={handleChange}
                />

                <TextInput
                  label="Address"
                  name="address"
                  value={data.address}
                  error={errors.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                isLoading={processing}>
                Create
              </Button>
            </div>

          </form>
        </Card>
      </Section>

    </AppLayout>
  );
}

export default Create
