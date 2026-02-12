import StationFilter from "../components/StationFIlter";

export default function Home() { 
  const handleFilterChange = (filter) => { 
    console.log("Filters:", filter)
    // filters will be used to update station data

  }

  return ( 
    <StationFilter
      onFilterChange={handleFilterChange}
      isAuthenticated={false} // set to true to hide the auth alert if user is authenticated
    />
  )
}
