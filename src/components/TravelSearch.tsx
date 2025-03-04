"use client"

import { useState, useRef, useEffect } from "react"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react"
import { LoadScript, Autocomplete } from '@react-google-maps/api'
import RidesList, { Ride } from './RidesList' 
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { translations } from "../data/translations"
import { useLanguage } from "@/contexts/LanguageContext"

const libraries: ("places")[] = ["places"]

// Function to save search query to localStorage
const saveSearchQuery = (departure: string, arrival: string, date: dayjs.Dayjs, passengers: number) => {
  try {
    // Get existing searches or initialize empty array
    const existingSearches = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    // Add new search to the beginning of the array
    existingSearches.unshift({
      departure,
      arrival,
      date: date.format('YYYY-MM-DD'),
      passengers,
      timestamp: new Date().toISOString()
    });
    
    // Keep only the last 10 searches
    const limitedSearches = existingSearches.slice(0, 10);
    
    // Save back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(limitedSearches));
  } catch (error) {
    console.error('Error saving search query:', error);
  }
};

export default function TravelSearch() {
    const { currentLanguage } = useLanguage();
    const t = translations[currentLanguage].travelSearch;
    const [departure, setDeparture] = useState("")
    const [arrival, setArrival] = useState("")
    const [passengers, setPassengers] = useState(1)
    const [date, setDate] = useState(dayjs())
    const [rides, setRides] = useState<Ride[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [showResults, setShowResults] = useState(false)

  const departureAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const arrivalAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const handleDepartureLoad = (autocomplete: google.maps.places.Autocomplete) => {
    departureAutocompleteRef.current = autocomplete
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.name) {
        setDeparture(place.name)
      }
    })
  }

  const handleArrivalLoad = (autocomplete: google.maps.places.Autocomplete) => {
    arrivalAutocompleteRef.current = autocomplete
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.name) {
        setArrival(place.name)
      }
    })
  }

  // Update autocompleteOptions to include address_components
  const autocompleteOptions = {
    componentRestrictions: { country: "si" }, // Set Slovenia as default
    fields: ["formatted_address", "geometry", "name", "address_components"],
    strictBounds: false,
    types: ["locality"] // This will only return cities
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6 items-center bg-white rounded-xl shadow-sm border p-2">
        {/* Departure Location */}
        <div className="relative w-full border-r md:w-1/4">
          <LoadScript 
            googleMapsApiKey="AIzaSyDMHXn8jY5A9P217QOM345ta33UW1uQ4fM"
            libraries={libraries}
          >
            <Autocomplete
              onLoad={handleDepartureLoad}
              options={autocompleteOptions}
            >
              <div className="flex items-center rounded-lg p-2">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder={t.leavingFrom}
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full border-none focus:ring-0 focus:outline-none text-base font-normal"
                />
              </div>
            </Autocomplete>
          </LoadScript>
        </div>

        {/* Arrival Location */}
        <div className="relative w-full border-r md:w-1/4">
          <LoadScript 
            googleMapsApiKey="AIzaSyDMHXn8jY5A9P217QOM345ta33UW1uQ4fM"
            libraries={libraries}
          >
            <Autocomplete
              onLoad={handleArrivalLoad}
              options={autocompleteOptions}
            >
              <div className="flex items-center rounded-lg p-2">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder={t.goingTo}
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  className="w-full border-none focus:ring-0 focus:outline-none text-base font-normal"
                />
              </div>
            </Autocomplete>
          </LoadScript>
        </div>

        {/* Date Selector */}
        <Popover className="relative w-full border-r md:w-1/6">
          <PopoverButton className="w-full flex items-center rounded-lg p-2">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-base font-normal">
              {date.format('MMM D, YYYY')}
            </span>
          </PopoverButton>
          <PopoverPanel className="absolute z-10 mt-1 w-fit bg-white rounded-md shadow-lg">
            <DateCalendar
              value={date}
              onChange={(newDate) => setDate(newDate)}
              disablePast
              sx={{
                '& .MuiPickersDay-root': {
                  '&.Mui-selected': {
                    backgroundColor: 'var(--primary)',
                    '&:hover': {
                      backgroundColor: 'var(--primary-accent)',
                    },
                  },
                },
              }}
            />
          </PopoverPanel>
        </Popover>

        {/* Passenger Selector */}
        <Popover className="relative w-full md:w-1/6">
          <Popover.Button className="w-full flex items-center rounded-lg px-2">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-base font-normal">
              {passengers} {passengers === 1 ? t.passenger : passengers === 2 && currentLanguage === "sl" ? "Potnika" : t.passengers}
            </span>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg p-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-normal">
                {currentLanguage === "sl" ? (passengers === 2 ? "Potnika" : "Potniki") : "Passengers"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="p-1 text-lg rounded-full hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-base font-normal">{passengers}</span>
                <button 
                  onClick={() => setPassengers(passengers + 1)} 
                  className="p-1 text-lg rounded-full hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Popover>

        {/* Search Button */}
        <button
          className="w-full md:w-auto px-8 py-2 bg-primary text-white rounded-lg hover:bg-primary-accent transition-colors"
          onClick={async () => {
            try {
              setIsSearching(true)
              const formattedDate = date.format('YYYY-MM-DD') + ' 09:00:00';
              
              // Save search query to localStorage regardless of results
              saveSearchQuery(departure, arrival, date, passengers);
              
              const apiUrl = new URL('https://api.docilja.si/api/v1/web/rides');
              
              // Only append parameters if they have values, using the correct array index format
              if (departure.trim()) {
                // Don't encode the parameter name but encode the value
                apiUrl.searchParams.set('start_city_name[0]', departure);
              }
              if (arrival.trim()) {
                apiUrl.searchParams.set('end_city_name[0]', arrival);
              }
              if (date) {
                apiUrl.searchParams.set('start_time', formattedDate);
              }
              
              const response = await fetch(apiUrl.toString());
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              
              const data = await response.json();
              setRides(data);
              setShowResults(true);
              
            } catch (error) {
              console.error('Error fetching rides:', error);
              setRides([]);
              setShowResults(true);
            } finally {
              setIsSearching(false);
            }
          }}
          disabled={isSearching}
        >
          {isSearching ? t.searching : t.search}
        </button>
      </div>

      {showResults && (
        <div className="mt-8">
          <RidesList rides={rides} />
        </div>
      )}
    </div>
  )
}

