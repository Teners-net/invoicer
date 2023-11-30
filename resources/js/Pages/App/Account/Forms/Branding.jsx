import { useForm } from "@inertiajs/inertia-react";
import Button from "../../../../Components/Button";
import TextInput from "../../../../Components/Form/TextInput";

const BrandingDetails = ({ company }) => {

  const { data, setData, patch, processing, errors, reset } = useForm({
    primary_color: (company?.primary_color ?? '').substring(0, 7),
    secondary_color: (company?.secondary_color ?? '').substring(0, 7),
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    patch(route('company.branding', company));
  }

  return (
    <form onSubmit={submit}>
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

      <div className="flex justify-end mt-4">
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
