import CategoryCard from "./CategoryCard.jsx";

// Reusable category showcase. `categories` items share the CategoryCard shape:
// { key, title, subtitle, href, mediaType, src, fallbackSrc }
const CategoryShowcase = ({ categories = [], title = "Browse by Category" }) => {
  if (categories.length === 0) return null;

  return (
    <section aria-label={title} className="mb-20 md:mb-24">
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <span className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold block mb-3">
            Category Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase">
            {title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.key || category.id || category.href}
            category={category}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;