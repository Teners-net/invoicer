import Button from '@/Components/Button';
import Input from '@/Components/Form/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.store'));
  };

  return (
    <GuestLayout title="Reset Password" className="flex justify-center items-center p-2 !py-18">

      <form onSubmit={submit}>
        <Input
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          autoComplete="username"
          onChange={onHandleChange}
        />

        <Input
          type="password"
          name="password"
          value={data.password}
          className="mt-1 block w-full"
          autoComplete="new-password"
          isFocused={true}
          onChange={onHandleChange}
        />

        <Input
          type="password"
          name="password_confirmation"
          label="Password confirmation"
          value={data.password_confirmation}
          className="mt-1 block w-full"
          autoComplete="new-password"
          onChange={onHandleChange}
        />

        <div className="flex items-center justify-end mt-4">
          <Button type='submit' className="ml-4" disabled={processing}>
            Reset Password
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
