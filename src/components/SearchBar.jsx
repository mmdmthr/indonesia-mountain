import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import MountainCard from "./MountainCard"

export default function SearchBar() {
  const [mountains, setMountains] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const limit = 9

  useEffect(() => {
    fetch("/mountains.json")
      .then((res) => res.json())
      .then((data) => {
        setMountains(data)
      })
      .catch((err) => console.error("Failed to fetch:", err))
  }, [])

  const filtered = mountains.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.province.toLowerCase().includes(search.toLowerCase())
  )
  const displayed = filtered.slice(0, page * limit)

  return (
    <>
      {/* Search Input */}
      <div className="relative mb-6 sm:mb-6">
        <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
        <input
          type="search"
          placeholder="Search name or province..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-900 text-gray-200 placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        {displayed.map((m) => (
          <MountainCard key={m.id} mountain={m} />
        ))}
      </div>

      {/* Show More */}
      {displayed.length < filtered.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-full sm:w-autopx-5 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-full text-sm sm:text-base"
          >
            Show more
          </button>
        </div>
      )}
    </>
  )
}
