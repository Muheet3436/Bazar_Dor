export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f4f8f4] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 animate-pulse">

        <section className="mb-8">
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-gray-200" />

            <div className="space-y-3">
              <div className="h-8 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-64 bg-gray-200 rounded" />
            </div>

          </div>
        </section>


        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div className="space-y-2">
            <div className="h-7 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          <div className="h-11 w-56 bg-gray-200 rounded-lg" />

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-5"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-5" />

              <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />

              <div className="h-4 w-1/3 bg-gray-200 rounded mb-6" />

              <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />

              <div className="flex justify-between items-center">

                <div className="h-7 w-24 bg-gray-200 rounded" />

                <div className="h-7 w-16 bg-gray-200 rounded" />

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}