"use client"

import { useState, useRef, useCallback } from "react"
import { MapPin, Clock, ChevronDown } from "lucide-react"
import { GoogleMap, LoadScript, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

const libraries: ("places")[] = ["places"]

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#454545" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { weight: 2 }]
    }
  ]
};

export default function BookingInterface() {
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [isDayOpen, setIsDayOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState("Today")
  const [selectedTime, setSelectedTime] = useState("Now")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [pickupCoordinates, setPickupCoordinates] = useState<google.maps.LatLngLiteral | null>(null)
  const [dropoffCoordinates, setDropoffCoordinates] = useState<google.maps.LatLngLiteral | null>(null)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const [mapCenter, setMapCenter] = useState(center)

  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const dropoffAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  const handlePickupLoad = (autocomplete: google.maps.places.Autocomplete) => {
    pickupAutocompleteRef.current = autocomplete
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        const coordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        setPickupLocation(place.formatted_address || '')
        setPickupCoordinates(coordinates)
        setMapCenter(coordinates)
        
        // If both locations are set, calculate route
        if (dropoffCoordinates) {
          calculateRoute(coordinates, dropoffCoordinates)
        }
      }
    })
  }

  const handleDropoffLoad = (autocomplete: google.maps.places.Autocomplete) => {
    dropoffAutocompleteRef.current = autocomplete
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        const coordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        setDropoffLocation(place.formatted_address || '')
        setDropoffCoordinates(coordinates)
        
        // Immediately calculate route if pickup location exists
        if (pickupCoordinates) {
          calculateRoute(pickupCoordinates, coordinates)
          
          // Adjust map center to show both markers
          const bounds = new google.maps.LatLngBounds()
          bounds.extend(pickupCoordinates)
          bounds.extend(coordinates)
          
          // Access map instance and set bounds
          const map = mapRef.current
          if (map) {
            map.fitBounds(bounds)
          }
        }
      }
    })
  }

  const calculateRoute = useCallback((origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral) => {
    const directionsService = new google.maps.DirectionsService()

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result)
        } else {
          console.error(`error fetching directions ${status}`)
        }
      }
    )
  }, [])

  return (
    <div className="grid lg:grid-cols-2 gap-6 container mx-auto p-6">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Go anywhere with Uber</h1>

        <div className="space-y-4">
          {/* Pickup Input */}
          <div className="relative">
            <LoadScript 
              googleMapsApiKey="AIzaSyDMHXn8jY5A9P217QOM345ta33UW1uQ4fM"
              libraries={libraries}
            >
              <Autocomplete
                onLoad={handlePickupLoad}
                restrictions={{ country: "us" }}
              >
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-10 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </Autocomplete>
            </LoadScript>
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          {/* Dropoff Input */}
          <div className="relative">
            <LoadScript 
              googleMapsApiKey="AIzaSyDMHXn8jY5A9P217QOM345ta33UW1uQ4fM"
              libraries={libraries}
            >
              <Autocomplete
                onLoad={handleDropoffLoad}
                restrictions={{ country: "us" }}
              >
                <input
                  type="text"
                  placeholder="Dropoff location"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full px-10 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </Autocomplete>
            </LoadScript>
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          {/* Time Selectors */}
          <div className="flex gap-4">
            {/* Day Select */}
            <div className="relative">
              <button
                onClick={() => setIsDayOpen(!isDayOpen)}
                className="flex items-center w-[140px] px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <Clock className="mr-2 h-4 w-4" />
                <span>{selectedDay}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>

              {isDayOpen && (
                <div className="absolute top-full left-0 mt-1 w-[140px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {["Today", "Tomorrow", "Schedule"].map((day) => (
                    <button
                      key={day}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedDay(day)
                        setIsDayOpen(false)
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Time Select */}
            <div className="relative">
              <button
                onClick={() => setIsTimeOpen(!isTimeOpen)}
                className="flex items-center w-[140px] px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <span>{selectedTime}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>

              {isTimeOpen && (
                <div className="absolute top-full left-0 mt-1 w-[140px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {["Now", "In 15 minutes", "In 30 minutes"].map((time) => (
                    <button
                      key={time}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedTime(time)
                        setIsTimeOpen(false)
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
              See prices
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              Log in to see your recent activity
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg hidden lg:block">
        <LoadScript 
          googleMapsApiKey="AIzaSyDMHXn8jY5A9P217QOM345ta33UW1uQ4fM"
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={13}
            options={mapOptions}
            onLoad={(map) => {
              mapRef.current = map
            }}
          >
            {pickupCoordinates && (
            <Marker
                position={pickupCoordinates}
                icon={{
                url: '/pickup-marker.svg',
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 37)
                }}
            />
            )}

            {dropoffCoordinates && (
            <Marker
                position={dropoffCoordinates}
                icon={{
                url: '/dropoff-marker.svg',
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 37)
                }}
            />
            )}

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: "#000000",
                    strokeWeight: 4,
                    strokeOpacity: 0.8
                  }
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  )
}

