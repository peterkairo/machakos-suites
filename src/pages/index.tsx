import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import FeaturedRooms from '@/components/FeaturedRooms'
import AmenitiesSection from '@/components/AmenitiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import LocationSection from '@/components/LocationSection'
import CTASection from '@/components/CTASection'
import { hotelInfo } from '@/data/hotelData'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedRooms />
        <AmenitiesSection />
        <LocationSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
