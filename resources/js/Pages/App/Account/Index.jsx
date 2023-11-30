import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';
import Card from "../../../Components/Card";
import BasicDetails from "./Forms/Basics";
import BrandingDetails from "./Forms/Branding";
import AccountLayout from "./Layout";

const Company = ({ company }) => {

  const [data, setData] = useState(null)

  useEffect(() => {
    if (data) Inertia.post(route('company.logo', company), {
      _method: 'put',
      logo: data.logo
    })
  }, [data])

  return (
    <AccountLayout>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <Card className={'col-span-1 flex flex-col items-center'}>
            <div className="relative">
              <img src={company.logo_url} alt={company.name} className="object-contain border mb-4 p-2 max-h-32" />

              <label htmlFor="image-upload-input" id="image-upload-button" className="absolute right-0 bottom-4 bg-gray-200 p-1 text-secondary cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6" fill="currentColor">
                  <title>image-edit</title>
                  <path d="M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M21 5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H11V19.1L12.1 18H5L8.5 13.5L11 16.5L14.5 12L16.1 14.1L21 9.1V5Z" />
                </svg>
              </label>

              <input
                type="file"
                id="image-upload-input"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg"
                onChange={e => setData({ 'logo': e.target.files[0] })}
              />
            </div>

            <h4>{company.name}</h4>
            {company.rc_number && <p>RC {company.rc_number}</p>}
            <p>{company.address}</p>

            <div className='mt-4 w-full'>
              <small>Brand Colors</small>
              <BrandingDetails company={company} />
            </div>
          </Card>
        </div>

        <div className={'md:col-span-2'}>
          <Card>
            <BasicDetails company={company} />
          </Card>
        </div>
      </div>
    </AccountLayout>
  );
}

export default Company;
