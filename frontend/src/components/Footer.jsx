import { useState } from "react";

export default function Footer() {
  const [rating, setRating] = useState(0);

  return (
    <footer className="bg-gray-900 backdrop-blur-xl border-t border-white/10 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 text-center">

        <h3 className="text-sm font-medium mb-2  text-white">
          Rate Our Website
        </h3>

        <div className="flex justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-lg transition ${
                rating >= star ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <p className="text-[11px] text-gray-400">
          © 2026 InfluNexa
        </p>

      </div>
    </footer>
  );
}