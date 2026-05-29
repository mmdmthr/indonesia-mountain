export default function MountainCard({ mountain }) {
  const provinceName = mountain.provinces?.name ?? "Tidak diketahui";

  return (
    // Link to the SEO-friendly mountain detail page
    <a
      href={`/mountains/${mountain.slug}`}
      className="block bg-teal-700 dark:bg-teal-800 rounded-xl px-4 py-3 text-yellow-200 dark:text-yellow-300 shadow-sm border border-teal-700 dark:border-gray-600 hover:brightness-110 transition-all"
    >
      <div className="text-base sm:text-lg text-amber-400 dark:text-amber-300 font-semibold">{mountain.name}</div>
      <div className="text-sm text-gray-300 dark:text-gray-300">
        {Number(mountain.elevation).toLocaleString("id-ID")} mdpl
      </div>
      <div className="text-sm text-gray-300 dark:text-gray-300">
        📍 {provinceName}
      </div>
    </a>
  )
}
