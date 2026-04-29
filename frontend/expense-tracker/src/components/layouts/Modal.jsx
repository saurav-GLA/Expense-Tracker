import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-lg">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                            {title}
                        </h3>

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg p-2 inline-flex items-center justify-center"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M6 18L18 6M6 6h12v12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-5 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;