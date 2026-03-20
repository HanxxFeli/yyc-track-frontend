import { Link } from "react-router-dom";
import {
  FiBarChart2,
  FiUsers,
  FiTrendingUp,
  FiEdit3,
  FiBell,
} from "react-icons/fi";
import CalgaryMap from "../components/map/CalgaryMap";
import "leaflet/dist/leaflet.css";

const LandingPage = () => {
  // Mock news/updates data - colored dots indicate severity/type
  const updates = [
    {
      id: 1,
      title: "CEI drops at City Hall",
      description: "Crowding increased during peak hours.",
      time: "2 hours ago",
      dotColor: "bg-red-500",
    },
    {
      id: 2,
      title: "Blue Line Mechanical Delay",
      description: "Minor service disruption earlier today.",
      time: "4 hours ago",
      dotColor: "bg-orange-500",
    },
    {
      id: 3,
      title: "Dalhousie Accessibility Upgrade",
      description: "New elevators now available to public.",
      time: "1 day ago",
      dotColor: "bg-blue-500",
    },
    {
      id: 4,
      title: "CTrain Weekend Maintenance",
      description: "Lebron is my GOAT.",
      time: "2 days ago",
      dotColor: "bg-orange-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO SECTION */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <p className="text-xl text-[#BC0B2A] font-semibold mb-4 tracking-wide">
                For Calgary Commuters
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Track real-time station experiences.
              </h1>
              <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                Discover how Calgary commuters rate transit stations for safety,
                cleanliness, accessibility, and crowding.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/map"
                  className="inline-block px-8 py-3 bg-[#BC0B2A] text-white rounded-md font-bold hover:bg-[#A30A26] transition text-center"
                >
                  Explore Map
                </Link>
                <Link
                  to="/stations"
                  className="inline-block px-8 py-3 border-2 border-[#BC0B2A] text-[#BC0B2A] rounded-md font-bold hover:bg-gray-50 transition text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden z-20">
              <div className="h-[300px] sm:h-[400px] lg:h-[450px]">
                <CalgaryMap
                  filters={{
                    searchQuery: "",
                    category: "",
                    transitLine: "all",
                  }}
                />
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  Live data from the Calgary Transit Feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 sm:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FiBarChart2
                className="w-14 h-14 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Station-Insights
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Compare safety, cleanliness, and accessibility ratings across
                all stations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FiUsers
                className="w-14 h-14 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Feedback
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Contribute to a data-driven picture of Calgary's transit
                experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FiTrendingUp
                className="w-14 h-14 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Real-time Trends
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stay updated as CEI scores change throughout the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 sm:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FiEdit3
                className="w-14 h-14 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Submit Feedback
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Share your station experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FiTrendingUp
                className="w-14 h-14 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                CEI Updates
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our system recalculates commuter scores instantly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FiBell
                className="w-14 h-14 text-gray-900 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stay Notified
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Receive alerts when a stations CEI drops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      {/* <section className="py-16 sm:py-20 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find your station now
          </h2>
          <p className="text-base text-gray-600 mb-8">
            Search, filter, and explore real-time ratings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-[#BC0B2A] text-white rounded-md font-bold hover:bg-[#A30A26] transition"
            >
              Login
            </Link>
            <Link
              to="/map"
              className="inline-block px-8 py-3 border-2 border-[#BC0B2A] text-[#BC0B2A] bg-white rounded-md font-bold hover:bg-gray-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section> */}

      {/* TRANSIT UPDATES & NEWS SECTION */}
      <section className="py-16 sm:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Transit Updates & News
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {updates.map((update) => (
              <div
                key={update.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-3 h-3 rounded-full ${update.dotColor} flex-shrink-0 mt-1`}
                  ></div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">
                    {update.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {update.description}
                </p>
                <p className="text-xs text-gray-400">
                  {update.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;