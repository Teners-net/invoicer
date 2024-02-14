import { Head } from '@inertiajs/inertia-react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const GuestLayout = ({ children, title, className }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Head title={title} />
      <Header />

      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default GuestLayout
