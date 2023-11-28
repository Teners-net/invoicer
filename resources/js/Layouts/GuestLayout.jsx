import { Head } from '@inertiajs/inertia-react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const GuestLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen">
      <Head title={title} />
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default GuestLayout
