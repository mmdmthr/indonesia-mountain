export default function MountainCard({ mountain }) {
  return (
    <div className="bg-zinc-900 rounded-xl px-4 py-3 text-yellow-200 shadow-sm">
      <div className="text-base sm:text-lg font-semibold">{mountain.name}</div>
      <div className="text-sm text-gray-400">
        {Number(mountain.elevation).toLocaleString()} mdpl
      </div>
      <div className="text-sm text-gray-400">
        <a
          href={`https://www.google.com/maps/@${mountain.lat},${mountain.long},15z`}
          target="_blank"
          rel="noopener noreferrer"
        >
        📍 {mountain.province}
        </a>
      </div>
    </div>
  )
}
