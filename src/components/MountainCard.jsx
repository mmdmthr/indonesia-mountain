export default function MountainCard({ mountain }) {
  return (
    <div className="bg-teal-700 dark:bg-teal-800 rounded-xl px-4 py-3 text-yellow-200 dark:text-yellow-300 shadow-sm border border-teal-700 dark:border-gray-600 transition-colors">
      <div className="text-base sm:text-lg font-semibold">{mountain.name}</div>
      <div className="text-sm text-gray-800 dark:text-gray-300">
        {Number(mountain.elevation).toLocaleString()} mdpl
      </div>
      <div className="text-sm text-gray-800 dark:text-gray-300">
        <a
          href={`https://www.google.com/maps/@${mountain.lat},${mountain.long},15z`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
        >
        📍 {mountain.province}
        </a>
      </div>
    </div>
  )
}
