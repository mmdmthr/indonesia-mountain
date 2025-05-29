export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-teal-950 text-white px-4 py-6 font-sans">
      <main className="max-w-2xl w-full mx-auto px-4 sm:px-6">{children}</main>
    </div>
  )
}
