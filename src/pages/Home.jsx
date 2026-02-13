import { useState } from "react";
import 'leaflet/dist/leaflet.css';

import StationFilter from "../components/StationFIlter";
import CalgaryMap from "../components/CalgaryMap";

export default function Home() { 
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: '',
    transitLine: 'all'
  })

  const handleFilterChange = (newFilters) => { 
    console.log("Filters applied:", newFilters)
    setFilters(newFilters)

  }

  return ( 
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto h-auto lg:h-[calc(100vh-2.5rem)]">
        {/* Filter Component */}
        <div className="w-full lg:w-[360px] h-auto lg:h-full flex-shrink-0">
          <StationFilter
            onFilterChange={handleFilterChange}
            isAuthenticated={false}
          />
        </div>
      
        {/* Map Panel */}
        <div className="flex-1 h-[500px] lg:h-full bg-white rounded-lg shadow-lg overflow-hidden">
          <CalgaryMap filters={filters} />
        </div>
      </div> 
    </div>    
  )
}
