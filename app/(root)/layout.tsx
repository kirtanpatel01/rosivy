import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="pt-[55px] lg:pt-[63px] w-full min-h-screen flex justify-center">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout