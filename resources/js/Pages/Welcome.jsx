import AppLayout from "../Layouts/AppLayout";

const WelcomePage = ({ user }) => {
  return (
    <AppLayout title='Home'>
      <div className="text-red-500 ">Here is {user.email}</div>
    </AppLayout>
  );
}

export default WelcomePage