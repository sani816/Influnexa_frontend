import { useEffect, useState } from "react";

const categories = [
  { name: "Fashion", img: "/categories/fashion.jpg" },
  { name: "Beauty", img: "/categories/beauty.jpg" },
  { name: "Tech", img: "/categories/tech.jpg" },
  { name: "Travel", img: "/categories/travel.jpg" },
  { name: "Food", img: "/categories/food.jpg" },
  { name: "Lifestyle", img: "/categories/lifestyle.jpg" },
  { name: "Fitness", img: "/categories/fitness.jpg" },
  { name: "Gaming", img: "/categories/gaming.jpg" },
];

function Categories() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % categories.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative z-10">

      <h2 className="text-5xl font-bold text-center mb-16 animated-heading ">
        Influencer Categories
      </h2>

      <div className="focus-wall">

        {categories.map((item, index) => (
          <div
            key={index}
            className={`focus-card ${active === index ? "active" : ""}`}
            onMouseEnter={() => setActive(index)}
          >

            <img src={item.img} alt={item.name} />

            <div className="focus-label">
              {item.name}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;