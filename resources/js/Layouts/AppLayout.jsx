import { Head, usePage } from '@inertiajs/inertia-react';
import Section from '../Components/Section';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Button from '../Components/Button';

const AppLayout = ({ children, title, onBackPress }) => {

  const {user} = usePage().props

  return (
    <div className="min-h-screen">
      <Head title={title} />

      <Header user={user} />

      <main>
        <div className="bg-black">
          <Section className={'!pb-1 text-gray-50'}>
            {onBackPress &&
              <Button className={'!px-0'} onClick={onBackPress}>
                <img
                  src={'/imgs/icons/back.png'}
                  alt='Back Icon'
                  className="h-4 mr-3"
                />
                Back
              </Button>
            }
            <h1 className='h2'>{title}</h1>
          </Section>
        </div>

        {children}
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout
