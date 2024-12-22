import React from "react";

const sizeClasses = {
  "m-xs": "max-w-xs", // Kích thước nhỏ nhất
  "m-sm": "max-w-sm",
  "m-md": "max-w-md",
  "m-lg": "max-w-lg",
  "m-xl": "max-w-xl",
  "m-2xl": "max-w-2xl",
  "m-3xl": "max-w-3xl",
  "m-4xl": "max-w-4xl",
  "m-5xl": "max-w-5xl",
  "m-6xl": "max-w-6xl",

};

const Modal = ({ children, open, onClose, size }) => {
  const modalClass = sizeClasses[size] || sizeClasses["m-md"]; // Mặc định là "m-md" nếu không có kích thước

  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex="-1"
          className="cursor-default fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className={`relative p-4 w-full ${modalClass} max-h-full`}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 absolute right-0 top-0 text-red-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-red-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
