import { Head } from '@inertiajs/inertia-react';

const AppLayout = ({ children, title }) => {

  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-900">
      <Head title={title} />
 
      {children}
    </div>
  );
}

export default AppLayout
