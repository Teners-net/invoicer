import { useForm, usePage } from "@inertiajs/inertia-react";
import Button from "../../../../Components/Button";
import TextInput from "../../../../Components/Form/TextInput";
import SelectInput from "../../../../Components/Form/Select";

const BrandingDetails = ({ company }) => {

  const { data, setData, patch, processing, errors, reset } = useForm({
    primary_color: (company?.primary_color ?? '').substring(0, 7),
    secondary_color: (company?.secondary_color ?? '').substring(0, 7),
    currency_id: company?.currency_id
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const { currencies } = usePage().props

  const submit = (e) => {
    e.preventDefault();

    patch(route('company.branding', company));
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Primary"
          name="primary_color"
          type="color"
          wrapperStyle={'!p-0'}
          value={data.primary_color}
          error={errors.primary_color}
          onChange={handleChange}
        />

        <TextInput
          label="Secondary"
          name="secondary_color"
          type="color"
          wrapperStyle={'!p-0'}
          value={data.secondary_color}
          error={errors.secondary_color}
          onChange={handleChange}
        />
      </div>

      <SelectInput
        label="Base Currency"
        name="currency_id"
        value={data.currency_id}
        error={errors.currency_id}
        onChange={handleChange}
      >
        <option value="">Select</option>
        {currencies?.map(_ => <option value={_.id} key={_.id}>{_.name} ({_.symbol})</option>)}
      </SelectInput>

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={processing}>
          Update
        </Button>
      </div>
    </form>
  );
}

export default BrandingDetails
