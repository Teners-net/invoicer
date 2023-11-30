import Button from "./Button";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

export const statusColor = (invoice) => {
  const define = {
    'Draft': {
      body: 'bg-gray-300',
      border: 'border-gray-600',
      text: 'text-gray-900'
    },
    'Sent': {
      body: 'bg-blue-300',
      border: 'border-blue-600',
      text: 'text-blue-900'
    },
    'Pending': {
      body: 'bg-yellow-300',
      border: 'border-yellow-600',
      text: 'text-yellow-900'
    },
    'Paid': {
      body: 'bg-green-300',
      border: 'border-green-600',
      text: 'text-green-900'
    },
  };

  return define[invoice.status];
};

const handleCopyClick = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) { }
};

export const GetStarted = ({ ...rest }) => <Button {...rest} link href={route('dashboard')}>Create a Free Invoice Now</Button>

export const Share = ({ shareLinkInBio }) => {
  return (
    <div className='inline-flex gap-4 divide-x border mt-2 p-3'>
      <button className="" onClick={() => handleCopyClick(shareLinkInBio?.url)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 24 24" fill="currentColor">
          <title>copy-link</title>
          <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
        </svg>
      </button>

      <EmailShareButton {...shareLinkInBio} >
        <EmailIcon size={24} />
      </EmailShareButton>

      <WhatsappShareButton {...shareLinkInBio} >
        <WhatsappIcon size={24} />
      </WhatsappShareButton>

      <FacebookShareButton {...shareLinkInBio} >
        <FacebookIcon size={24} />
      </FacebookShareButton>
    </div>
  )
}