import { XIcon } from "lucide-react"
import { getLoginUrl } from "@/data/siteDetails"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/data/translations"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  rideId: number
}

export default function LoginModal({ isOpen, onClose, rideId }: LoginModalProps) {
  const { currentLanguage } = useLanguage()
  const t = translations[currentLanguage]
  const loginUrl = `${getLoginUrl()}/ride/${rideId}`
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 z-50">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">{t.loginModal?.title || "Login Required"}</h2>
          <p className="text-gray-600">
            {t.loginModal?.description || "Please log in to continue."}
          </p>
          <a 
            href={loginUrl} 
            className="block w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-accent transition-colors"
          >
            {t.loginModal?.buttonText || "Log in"}
          </a>
        </div>
      </div>
    </div>
  )
} 