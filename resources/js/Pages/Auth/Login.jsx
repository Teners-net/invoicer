import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Form/Checkbox';
import Input from '@/Components/Form/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout title="Log in" className="flex justify-center items-center p-2 !py-18">
      <Card className='w-full md:max-w-md'>
        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        <h4>Login</h4>

        <form onSubmit={submit}>
          <Input
            type="email"
            name="email"
            label="Email"
            groupStyle="mt-4"
            inputStyle="block w-full"
            autoComplete="email"
            error={errors.email}
            value={data.email}
            onChange={handleOnChange}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            groupStyle="mt-4"
            inputStyle="block w-full"
            autoComplete="current-password"
            error={errors.password}
            value={data.password}
            onChange={handleOnChange}
          />

          <div className="block mt-4">
            <label className="flex items-center">
              <Checkbox name="remember" value={data.remember} onChange={handleOnChange} />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-between mt-4">
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none"
              >
                Forgot your password?
              </Link>
            )}

            <Button type='submit' disabled={processing}>
              Log in
            </Button>
          </div>

          <Link
            href={route('register')}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none"
          >
            New? <span className='underline'>Register</span>
          </Link>
        </form>
      </Card>
    </GuestLayout>
  );
}
