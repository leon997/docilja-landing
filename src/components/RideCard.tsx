import { useState } from "react"
import LoginModal from "./LoginModal"
import { useLanguage } from '@/contexts/LanguageContext'
import { getLoginUrl } from "@/data/siteDetails"


interface RideCardProps {
  id: number
  start_city_name: string
  end_city_name: string
  start_time: string
  free_seats: number
  price: number
}

export default function RideCard({ id, start_city_name, end_city_name, start_time, free_seats, price }: RideCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { currentLanguage } = useLanguage();
  const loginUrl = `${getLoginUrl()}/ride/${id}`


  return (
    <>
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col space-y-4">
          {/* Route and Time Section */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-secondary">{start_city_name} → {end_city_name}</h2>
              <p className="text-lg text-gray-500">
                {new Date(start_time).toLocaleDateString(currentLanguage === "sl" ? "sl-SI" : "en-US")} at {new Date(start_time).toLocaleTimeString(currentLanguage === "sl" ? "sl-SI" : "en-US")}
              </p>
            </div>
          </div>

          {/* Vehicle Info */}
{/*         <div className="flex items-center space-x-2 text-gray-500">
          <CarIcon className="h-4 w-4" />
          <span className="text-sm">Vehicle information not available</span>
        </div> */}

          {/* Driver Info */}
{/*         <div className="flex items-start justify-between pt-2 border-t border-gray-200">
          <div className="space-y-1">
            <h3 className="font-medium">{owner.name} {owner.surname}</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <StarIcon className="h-4 w-4" />
              <span>{owner.rating ? `${owner.rating}/5` : 'User has no ratings!'}</span>
            </div>
          </div>
        </div>
 */}
          {/* Actions and Price */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="space-x-2">
              <p className="text-base text-gray-500">{currentLanguage === "sl" ? "Razpoložljiva mesta" : "Available seats"}: {free_seats}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold">{price} €</p>
                <p className="text-sm text-gray-500">{currentLanguage === "sl" ? "Cena" : "Price"}</p>
              </div>
              <a 
                className="px-4 py-2 bg-primary hover:bg-primary-accent text-white rounded-md transition-colors"
                href={loginUrl}
              >
                {currentLanguage === "sl" ? "Odpri v aplikaciji" : "Open in app"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        rideId={id}
      />
    </>
  )
} 