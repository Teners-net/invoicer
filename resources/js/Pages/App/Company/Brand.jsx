import { useForm } from "@inertiajs/inertia-react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import TextInput from "../../../Components/Form/TextInput";


const Brand = ({ status }) => {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    website: '',
    rc_number: '',
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('company.store'));
  };

  return (
    <AppLayout title='Company Setup'>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-6">

            <div className="grid md:grid-cols-2">
              <div className="py-3 md:pt-12 md:pb-12 md:pr-12 md:border-r space-y-6 ">
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
                  type="color"
                  value={data.website}
                  error={errors.website}
                  onChange={handleChange}
                />

                <TextInput
                  label="RC NUmber"
                  name="rc_number"
                  type="color"
                  value={data.rc_number}
                  error={errors.rc_number}
                  onChange={handleChange}
                />
              </div>

              <div className="py-3 md:pt-12 md:pb-12 md:pl-12 space-y-6 ">
                <h4>Preview</h4>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                isLoading={processing}>
                Brand
              </Button>
            </div>

          </form>
        </Card>
      </Section>

    </AppLayout>
  );
}

export default Brand
