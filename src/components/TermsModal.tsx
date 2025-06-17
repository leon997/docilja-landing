import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
    const [terms, setTerms] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Determine language based on domain
            const isSlovenian = window.location.hostname === 'docilja.si';
            const fileName = isSlovenian ? '/tos.md' : '/tos_en.md';
            
            fetch(fileName)
                .then(res => res.text())
                .then(text => setTerms(text))
                .catch(error => {
                    console.error('Error loading terms:', error);
                    setTerms('Error loading terms of service.');
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] flex flex-col">
                {/* Fixed header */}
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white rounded-t-lg">
                    <h2 className="text-2xl font-bold">
                        {window.location.hostname === 'docilja.si' ? 'Pogoji uporabe' : 'Terms of Use'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                {/* Scrollable content */}
                <div className="p-6 overflow-y-auto">
                    <div className="prose">
                        <ReactMarkdown>{terms}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}; 