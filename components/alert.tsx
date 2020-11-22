import React from 'react';

interface Props {
  type: 'error' | 'success';
  toggle?: () => void;
  children: any;
}

function Alert({ type, toggle, children }) {
  return (
    <div
      className={`rounded-md p-4 ${type == 'error' ? 'bg-red-50' : ''} ${
        type == 'success' ? 'bg-green-50' : ''
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type == 'error' && (
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {type == 'success' && (
            <svg
              className="h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div
          className={`ml-3 text-sm font-medium ${
            type == 'error' && 'text-red-800'
          } ${type == 'success' && 'text-green-800'} `}
        >
          {children}
        </div>
        {toggle ? (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                className={`
                  inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${
                    type == 'error' &&
                    'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600'
                  }
                  ${
                    type == 'success' &&
                    'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600'
                  }
                `}
                type="button"
                onClick={toggle}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Alert;
