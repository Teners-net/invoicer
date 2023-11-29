import Button from "./Button";

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

export const GetStarted = ({ ...rest }) => <Button {...rest} link href={route('dashboard')}>Create a Free Invoice Now</Button>