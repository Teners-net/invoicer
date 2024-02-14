import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Form/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout title="Forgot Password" className="flex justify-center items-center p-2 !py-18">

      <Card className='w-full md:max-w-md'>
        <h4>Forgot Password?</h4>

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          No problem. Just let us know your email address and we will email you a password
          reset link that will allow you to choose a new one.
        </div>

        {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

        <form onSubmit={submit}>
          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            inputStyle="block w-full"
            isFocused={true}
            error={errors.email}
            onChange={onHandleChange}
          />

          <div className="flex items-center justify-end mt-4">
            <Button type='submit' className="ml-4" disabled={processing}>
              Email Password Reset Link
            </Button>
          </div>
        </form>
      </Card>

    </GuestLayout>
  );
}
