import { useEffect, useState } from 'react';

const Notify = ({notify}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notify) setShow(true);

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [notify]);

  if (!show) {
    return null;
  }

  const notifyType = notify?.type || 'success';
  const iconName = (notifyType === 'warning') ? 'exclamation' : ((notifyType === 'error') ? 'x-circle' : 'check');

  return (
    <div className="absolute top-3 md:top-10 right-3 md:right-10 z-50" role="alert">
      <div className="rounded-md border border-gray-100 bg-white p-4 shadow-xl">
        <div className="flex items-start gap-4">
          <span className={`text-${notifyType === 'warning' ? 'yellow' : (notifyType === 'error' ? 'red' : 'green')}-600`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              {notifyType === 'warning' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
              ) : notifyType === 'error' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              )}
            </svg>
          </span>

          <div className="flex-1">
            {notify?.header && (
              <strong className="block font-medium text-gray-900">{notify?.header}</strong>
            )}

            {notify?.body && (
              <p className="mt-1 text-sm text-gray-700 max-w-[65vw] md:max-w-[40vw]">
                {notify?.body}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notify;