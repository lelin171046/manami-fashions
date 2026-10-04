const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const generateUniqueSlug = async (Model, text, excludeId = null) => {
  const baseSlug = generateSlug(text);
  let slug = `${baseSlug}-${Date.now()}`;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Model.findOne(query);
    if (!existing) break;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
};

export { generateSlug, generateUniqueSlug };