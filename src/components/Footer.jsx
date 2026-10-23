export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-xl font-bold">
              বাজার দর
            </h2>

            <p className="text-gray-500 mt-1">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <p className="text-sm text-gray-500 max-w-xl md:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>

        </div>
      </div>
    </footer>
  );
}