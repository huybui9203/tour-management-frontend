import React, { useState, useRef, useEffect } from "react";

const Modal = ({children, open, onClose}) => {

  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex="-1"
          // aria-hidden="true"
          className="cursor-default fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div
            className="relative p-4 w-full max-w-xl max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-0 top-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
