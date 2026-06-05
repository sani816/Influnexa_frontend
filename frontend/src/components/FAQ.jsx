import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "How do you select influencers?",
      answer:
        "We match creators based on audience, niche, engagement and campaign goals.",
    },
    {
      question: "Do you work with startups?",
      answer:
        "Yes, we work with startups, D2C brands and established businesses.",
    },
    {
      question: "Can I track campaign performance?",
      answer:
        "Yes, detailed reports are shared throughout the campaign.",
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* 💬 FLOATING BUTTON (ALWAYS VISIBLE) */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6
          w-14 h-14
          rounded-full
          bg-purple-600
          text-white
          shadow-lg
          flex items-center justify-center
          hover:scale-110 transition
          z-50
        "
      >
        💬
      </button>

      {/* 📦 CHAT PANEL */}
      {open && (
        <div
          className="
            fixed bottom-24 right-6
            w-80 h-[420px]
            bg-black/80 backdrop-blur-xl
            border border-white/20
            rounded-2xl
            shadow-2xl
            flex flex-col
            overflow-hidden
            z-50
          "
        >

          {/* HEADER */}
          <div className="p-4 border-b border-white/10 text-white font-bold">
            FAQ Support
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">

            {faqs.map((faq, i) => (
              <div key={i} className="space-y-2">

                {/* QUESTION */}
                <div className="flex justify-end">
                  <div className="bg-purple-600 text-white text-sm px-3 py-2 rounded-2xl max-w-[80%]">
                    {faq.question}
                  </div>
                </div>

                {/* ANSWER */}
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 text-sm px-3 py-2 rounded-2xl max-w-[80%]">
                    {faq.answer}
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>
      )}
    </div>
  );
}

export default FAQ;