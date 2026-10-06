import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../../../api/axios.js";
import ImageUpload from "../../components/ui/ImageUpload.jsx";
import { ArrowLeft, Loader2, Plus, X, ChevronDown, ChevronRight, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

const AUDIENCE_OPTIONS = [
  { value: "men", label: "Men's Wear" },
  { value: "women", label: "Women's Wear" },
  { value: "kids", label: "Kids' Wear" },
];

const MANUFACTURING_CAPABILITIES = [
  "Cut & Sew",
  "Printing",
  "Embroidery",
  "Garment Dye",
  "Washing",
  "Heat Transfer",
  "Applique",
  "Special Finishing",
  "Quality Inspection",
  "Pattern Making",
  "Grading",
  "Marker Making",
];

const CERTIFICATIONS = [
  "BSCI",
  "OEKO-TEX",
  "SEDEX",
  "ISO 9001",
  "ISO 14001",
  "Fairtrade",
  "Better Work",
  "GOTS",
  "OCS",
  "RCS",
  "Bluesign",
  "WRAP",
];

const FABRIC_TYPES = [
  "Single Jersey",
  "Pique",
  "Fleece",
  "French Terry",
  "Poplin",
  "Twill",
  "Interlock",
  "Rib",
  "Canvas",
  "Denim",
  "Chambray",
  "Voile",
  "Lawn",
  "Muslin",
  "Double Knit",
  "Mesh",
  "Velour",
  "Velvet",
  "Satin",
  "Crepe",
];

const COMPOSITIONS = [
  "100% Cotton",
  "95% Cotton / 5% Elastane",
  "97% Cotton / 3% Elastane",
  "90% Cotton / 10% Polyester",
  "80% Cotton / 20% Polyester",
  "65% Polyester / 35% Cotton",
  "60% Cotton / 40% Polyester",
  "50% Cotton / 50% Polyester",
  "100% Polyester",
  "100% Organic Cotton",
  "100% Linen",
  "55% Linen / 45% Cotton",
  "Tencel / Lyocell",
  "Modal",
  "Bamboo Viscose",
  "Hemp / Cotton Blend",
];

const SIZE_OPTIONS = {
  men: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  women: ["XS", "S", "M", "L", "XL", "2XL"],
  kids: ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y", "9Y", "10Y", "11Y", "12Y", "13Y", "14Y"],
  unisex: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
};

const TagInput = ({ label, watch, setValue, fieldName, placeholder, suggestions = [], disabled }) => {
  const [inputValue, setInputValue] = useState("");
  const tags = watch(fieldName) || [];

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setValue(fieldName, [...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setValue(fieldName, tags.filter((_, idx) => idx !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
          placeholder={placeholder}
          disabled={disabled}
          list={`${fieldName}-suggestions`}
        />
        {suggestions.length > 0 && (
          <datalist id={`${fieldName}-suggestions`}>
            {suggestions.map((s) => <option key={s} value={s} />)}
          </datalist>
        )}
        <button type="button" onClick={addTag} disabled={disabled || !inputValue.trim()} className="px-4 py-2.5 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Add</button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            {tag} <button type="button" onClick={() => removeTag(i)} disabled={disabled} className="hover:text-red-500 disabled:opacity-50"><X size={12} /></button>
          </span>
        ))}
      </div>
    </div>
  );
};

const ImageManager = ({ images, setImages, disabled }) => {
  const [reorderMode, setReorderMode] = useState(false);

  const handleReorder = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setImages(newImages);
  };

  const handleDelete = (index) => {
    const img = images[index];
    if (img.publicId) {
      api.delete("/upload", { data: { publicId: img.publicId, resourceType: "image" } }).catch(() => {});
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAltChange = (index, alt) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], alt };
    setImages(newImages);
  };

  if (!reorderMode) {
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-0">Product Images</label>
          <button
            type="button"
            onClick={() => setReorderMode(true)}
            disabled={disabled || images.length <= 1}
            className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GripVertical size={14} /> Reorder
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-green-500 text-white text-[9px] font-bold uppercase rounded">Primary</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(i)}
                disabled={disabled}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 disabled:pointer-events"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          <ImageUpload
            folder="products"
            onChange={(img) => { if (img) setImages([...images, img]); }}
            className="inline-block"
            disabled={disabled}
          />
        </div>
        {images.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">First image is used as primary. Click "Reorder" to change order.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-0">Reorder Images (Drag to reorder)</label>
        <button
          type="button"
          onClick={() => setReorderMode(false)}
          className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Done
        </button>
      </div>
      <div className="space-y-2">
        {images.map((img, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <GripVertical size={18} className="text-gray-400 cursor-grab active:cursor-grabbing shrink-0" />
            <img src={img.url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={img.alt || ""}
                onChange={(e) => handleAltChange(i, e.target.value)}
                disabled={disabled}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                placeholder="Alt text (optional)"
              />
              <p className="text-xs text-gray-500 mt-1">Alt: {img.alt || "(auto-generated from product name)"}</p>
            </div>
            {i === 0 && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold uppercase rounded">Primary</span>}
            <button
              type="button"
              onClick={() => handleDelete(i)}
              disabled={disabled}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">First image in the list is the primary image. Drag to reorder.</p>
    </div>
  );
};

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      audience: "",
      category: "",
      productType: "",
      shortDescription: "",
      description: "",
      features: [],
      materials: [],
      fabric: "",
      composition: "",
      weight: "",
      availableColors: [],
      availableSizes: [],
      images: [],
      manufacturingCapabilities: [],
      certifications: [],
      minimumOrderQuantity: "",
      productionCapacity: "",
      leadTime: "",
      featured: false,
      status: "active",
      sortOrder: 0,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories-tree"],
    queryFn: async () => {
      const { data } = await api.get("/categories/public");
      return data.data;
    },
  });

  const { data: existing, isLoading: loadingExisting } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      reset({
        name: existing.name || "",
        audience: existing.audience || "",
        category: existing.category?._id || "",
        productType: existing.productType || "",
        shortDescription: existing.shortDescription || "",
        description: existing.description || "",
        features: existing.features || [],
        materials: existing.materials || [],
        fabric: existing.fabric || "",
        composition: existing.composition || "",
        weight: existing.weight || "",
        availableColors: existing.availableColors || [],
        availableSizes: existing.availableSizes || [],
        images: existing.images || [],
        manufacturingCapabilities: existing.manufacturingCapabilities || [],
        certifications: existing.certifications || [],
        minimumOrderQuantity: existing.minimumOrderQuantity || "",
        productionCapacity: existing.productionCapacity || "",
        leadTime: existing.leadTime || "",
        featured: existing.featured || false,
        status: existing.status || "active",
        sortOrder: existing.sortOrder || 0,
      });
    }
  }, [existing, reset]);

  const mutation = useMutation({
    mutationFn: (formData) =>
      isEdit ? api.put(`/products/${id}`, formData) : api.post("/products", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success(isEdit ? "Product updated" : "Product created");
      navigate("/admin/products");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Save failed"),
  });

  const audience = watch("audience");
  const availableSizes = watch("availableSizes") || [];
  const suggestedSizes = audience && SIZE_OPTIONS[audience] ? SIZE_OPTIONS[audience] : SIZE_OPTIONS.unisex;

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (loadingExisting) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const Section = ({ title, description, children }) => (
    <fieldset className="border border-gray-200 rounded-xl p-6 bg-white">
      <legend className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1 px-2">{title}</legend>
      {description && <p className="text-xs text-gray-400 mb-4 px-2">{description}</p>}
      <div className="space-y-6">{children}</div>
    </fieldset>
  );

  const Grid3 = ({ children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
  );

  const Grid2 = ({ children }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );

  return (
    <div className="max-w-5xl">
      <button onClick={() => navigate("/admin/products")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit Product" : "New Product"}</h1>
          <p className="text-sm text-gray-400 mt-1">Manage product details for the buyer-facing catalogue</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Basic Information */}
        <Section
          title="1. Basic Information"
          description="Core product identification and categorization"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Product Name *</label>
            <input
              {...register("name", { required: "Product name is required" })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Audience *</label>
            <select
              {...register("audience", { required: "Audience is required" })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
            >
              <option value="">Select audience</option>
              {AUDIENCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.audience && <p className="text-xs text-red-500 mt-1">{errors.audience.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Category *</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
            >
              <option value="">Select category</option>
              {(categories || []).map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Product Type</label>
            <input
              {...register("productType")}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
              placeholder="e.g. Basic T-Shirt, Oversized Hoodie, Cargo Trousers"
            />
            <p className="text-xs text-gray-500 mt-1">Specific product style (e.g., Basic T-Shirt, Polo Shirt, Hoodie, Cargo Trousers)</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Short Description *</label>
            <textarea
              {...register("shortDescription", { required: "Short description is required" })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black resize-none"
              placeholder="Brief description for product cards (max 500 characters)"
            />
            {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
          </div>

         
        </Section>

        {/* Section 2: Fabric & Construction */}
        <Section
          title="2. Fabric & Construction"
          description="Technical fabric specifications and product features"
        >
          <Grid3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Fabric</label>
              <input
                {...register("fabric")}
                list="fabric-suggestions"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                placeholder="e.g. Single Jersey"
              />
              <datalist id="fabric-suggestions">
                {FABRIC_TYPES.map((f) => <option key={f} value={f} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Composition</label>
              <input
                {...register("composition")}
                list="composition-suggestions"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                placeholder="e.g. 100% Cotton"
              />
              <datalist id="composition-suggestions">
                {COMPOSITIONS.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Weight / GSM</label>
              <input
                {...register("weight")}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                placeholder="e.g. 180 GSM"
              />
            </div>
          </Grid3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Features</label>
            <TagInput
              label=""
              watch={watch}
              setValue={setValue}
              fieldName="features"
              placeholder="e.g. Soft hand feel, Durable construction"
              disabled={false}
            />
            <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add. Key selling points for buyers.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Materials</label>
            <TagInput
              label=""
              watch={watch}
              setValue={setValue}
              fieldName="materials"
              placeholder="e.g. Organic Cotton, Recycled Polyester"
              disabled={false}
            />
            <p className="text-xs text-gray-500 mt-1">Raw materials used in production.</p>
          </div>
        </Section>

        {/* Section 3: Product Images */}
        <Section
          title="3. Product Images"
          description="Upload multiple product images. First image is used as primary thumbnail."
        >
          <ImageManager
            images={watch("images") || []}
            setImages={(imgs) => setValue("images", imgs)}
            disabled={mutation.isPending}
          />
        </Section>

      

        {/* Section 4: Publishing */}
        <Section
          title="4. Publishing & Display"
          description="Control product visibility and ordering"
        >
          <Grid3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Status *</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
              >
                <option value="draft">Draft</option>
                <option value="active">Published (Active)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer w-full">
                <input type="checkbox" {...register("featured")} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/5" />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">Sort Order</label>
              <input
                {...register("sortOrder", { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
            </div>
          </Grid3>
        </Section>

        <div className="flex gap-3 pt-4 border-t border-gray-100 sticky bottom-0 bg-white py-4">
          <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" disabled={mutation.isPending} className="flex-1 px-6 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {mutation.isPending && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;