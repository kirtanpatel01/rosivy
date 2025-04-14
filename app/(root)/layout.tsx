'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import { toast, Toaster } from 'sonner';

useEffect(() => {
    toast.custom((t) => (
        <div className="bg-white rounded-md shadow-md p-4 flex items-center justify-between">
            <span>Custom toast</span>
            <button
                onClick={() => toast.dismiss(t)}
                className="ml-4 px-2 py-1 text-sm bg-red-500 text-white rounded"
            >
                Dismiss
            </button>
        </div>
    ));
}, []);

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="pt-[55px] lg:pt-[63px] w-full min-h-screen flex justify-center">
                <Toaster richColors position="bottom-right" />

                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout