import React from "react";

function Testimonials() {
  const data = [
    {
      name: "Rahul Verma",
      company: "D2C Fashion Brand",
      text: "InfluNexa helped us reach over one million people within a month.",
    },
    {
      name: "Priya Sharma",
      company: "Beauty Startup",
      text: "Amazing creator network and professional campaign execution.",
    },
    {
      name: "Arjun Singh",
      company: "Tech Company",
      text: "Best influencer marketing agency we've worked with.",
    },
    {
      name: "Neha Kapoor",
      company: "Lifestyle Brand",
      text: "ROI was unbelievable and consistent across campaigns.",
    },
    // {
    //   name: "Sahil Mehta",
    //   company: "Gaming Studio",
    //   text: "Super smooth campaign handling and viral reach results.",
    // },
  ];

  return (
    <section className="relative py-1 overflow-hidden">

      <h2 className="text-5xl font-bold text-center mb-16 animated-heading ">
        Testimonials
      </h2>

      <div className="relative flex flex-col items-center gap-16">

        {data.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              className={`
                relative w-[700px] max-w-[90%]
                flex items-center
                ${isLeft ? "justify-start" : "justify-end"}
              `}
            >

              {/* zigzag connector line (optional, keep subtle) */}
              <div className="absolute top-1/2 left-1/2 w-1 h-[120%] bg-blue-400/30 -translate-x-1/2"></div>

              {/* MOON CARD */}
              <div
                className={`
                  relative flex w-[520px] h-[140px]
                  rounded-full overflow-hidden
                  border border-white/20
                  backdrop-blur-2xl
                  shadow-[0_0_40px_rgba(168,85,247,0.15)]
                  bg-blue-600/30
                  transition-all duration-500
                  hover:scale-105 hover:bg-purple-500/20
                `}
              >

                {/* LEFT SIDE */}
                <div className="
                  w-1/2 flex flex-col justify-center items-center
                  bg-white/5
                  border-r border-white/10
                ">
                  <h3 className="text-lg font-bold text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-purple-300">
                    {item.company}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="
                  w-1/2 flex items-center justify-center px-4
                ">
                  <p className="text-sm text-gray-200 italic text-center">
                    "{item.text}"
                  </p>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}

export default Testimonials;