const ProductTypeTabs = ({
  types = [],
  activeType = "",
  onTypeChange,
  label = "Shop by Item",
}) => {
  if (types.length === 0) return null;

  const pill = (active) =>
    `px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
      active ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
    }`;

  return (
    <section aria-label={label} className="mb-10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mr-2">
          {label}
        </span>
        <button
          type="button"
          aria-pressed={!activeType}
          onClick={() => onTypeChange("")}
          className={pill(!activeType)}
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type.key}
            type="button"
            aria-pressed={activeType === type.key}
            onClick={() => onTypeChange(type.key)}
            className={pill(activeType === type.key)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductTypeTabs;