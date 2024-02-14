import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Form/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <GuestLayout title="Register" className="flex justify-center items-center p-2 !py-18">

      <Card className='w-full md:max-w-md'>
        <h4>Register</h4>
        <form onSubmit={submit}>

          <Input
            name="name"
            groupStyle="mt-4"
            inputStyle="block w-full"
            autoComplete="name"
            value={data.name}
            error={errors.name}
            onChange={handleOnChange}
            required
          />

          <Input
            type="email"
            name="email"
            value={data.email}
            error={errors.email}
            groupStyle="mt-4"
            inputStyle="block w-full"
            autoComplete="email"
            onChange={handleOnChange}
            required
          />

          <Input
            type="password"
            name="password"
            value={data.password}
            error={errors.password}
            groupStyle="mt-4"
            inputStyle="block w-full"
            autoComplete="new-password"
            onChange={handleOnChange}
            required
          />

          <Input
            type="password"
            name="password_confirmation"
            label="Password confirmation"
            value={data.password_confirmation}
            error={errors.password_confirmation}
            groupStyle="mt-4"
            inputStyle="block w-full"
            autoComplete="new-password"
            onChange={handleOnChange}
            required
          />

          <div className="flex items-center justify-between mt-8">
            <Link
              href={route('login')}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Already registered?
            </Link>

            <Button type='submit' disabled={processing}>
              Register
            </Button>
          </div>
        </form>
      </Card>
    </GuestLayout>
  );
}
