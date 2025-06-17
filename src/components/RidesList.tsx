// src/components/RidesList.tsx
"use client"

import RideCard from './RideCard'
import { useLanguage } from '@/contexts/LanguageContext'

export interface Ride {
  id: number
  start_city_name: string
  end_city_name: string
  start_time: string
  free_seats: number
  price: number
  rideId: number
}

interface RidesListProps {
  rides: Ride[]
}

export default function RidesList({ rides }: RidesListProps ){
  const { currentLanguage } = useLanguage();

  if (!rides.length) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">{currentLanguage === "sl" ? "Ni najdenih prevozov" : "No rides found"}</h2>
        <p className="text-gray-600">{currentLanguage === "sl" ? "Poskusite prilagoditi iskalne kriterije ali preverite kasneje." : "Try adjusting your search criteria or check back later."}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">{currentLanguage === "sl" ? "Razpoložljivi prevozi" : "Available Rides"}</h2>
      <div className="space-y-4 flex flex-col items-center">
        {rides.map((ride) => (
          <RideCard key={ride.id} {...ride} />
        ))}
      </div>
    </div>
  )
}