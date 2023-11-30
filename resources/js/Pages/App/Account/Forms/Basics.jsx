import { useForm } from "@inertiajs/inertia-react";
import Button from "../../../../Components/Button";
import TextInput from "../../../../Components/Form/TextInput";

const BasicDetails = ({ company }) => {

  const { data, setData, post, processing, errors, patch } = useForm({
    name: company?.name ?? '',
    website: company?.website ?? '',
    rc_number: company?.rc_number ?? '',
    contact_number: company?.contact_number ?? '',
    contact_email: company?.contact_email ?? '',
    address: company?.address ?? '',
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    {company ? patch(route('company.update', company)) : post(route('company.store'))};
  }

  return (
    <form onSubmit={submit} className={`p-3 ${company ? 'md:p-4' : 'md:p-6'}`}>
      <div className="grid md:grid-cols-2">
        <div className={`py-2 ${company ? 'md:pr-4' : 'md:pt-12 md:pb-12 md:pr-12'} md:border-r space-y-4 md:space-y-6`}>
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

        <div className={`py-2 ${company ? 'md:pl-4' : 'md:pt-12 md:pb-12 md:pl-12'} space-y-4 md:space-y-6`}>
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
            autoComplete="tel"
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
          {company ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}

export default BasicDetails
