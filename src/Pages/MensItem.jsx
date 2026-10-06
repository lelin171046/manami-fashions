
import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Filter,
  Grid2X2,
  List,
  Loader2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Expected external components
|--------------------------------------------------------------------------
|
| ProductFilterBar
| ProductCard
| ProductListItem
|
| Make sure these components are available in your project.
|--------------------------------------------------------------------------
*/

const MensItem = ({
  products = [],
  categories = [],
  allFabrics = [],

  search,
  setSearch,

  category,
  setCategory,

  fabric,
  setFabric,

  sort,
  setSort,

  viewMode = "grid",
  setViewMode,

  handleReset,

  totalResults,

  hasActiveFilters,

  isLoading = false,

  setSelectedProduct,

  categoryIdMap = {},

  /*
   * Optional:
   * If your parent already provides pagination,
   * connect these props.
   */
  currentPage = 1,
  totalPages = 1,
  onPageChange,

  ProductFilterBar,
  ProductCard,
  ProductListItem,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [showSearch, setShowSearch] =
    useState(false);
    
  const navigate = useNavigate();
  
  const handleProductClick = (product) => {
    if (product?.slug) {
      navigate(`/products/${product.slug}`);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Derived values
  |--------------------------------------------------------------------------
  */

  const visibleResultCount = useMemo(() => {
    if (
      typeof totalResults === "number"
    ) {
      return totalResults;
    }

    return products.length;
  }, [totalResults, products.length]);

  /*
  |--------------------------------------------------------------------------
  | Category title
  |--------------------------------------------------------------------------
  */

  const categoryTitle = useMemo(() => {
    if (!category) {
      return "Men's Collection";
    }

    const mappedCategory =
      categoryIdMap?.[category];

    if (
      typeof mappedCategory === "string" &&
      mappedCategory.trim()
    ) {
      return mappedCategory;
    }

    const foundCategory =
      categories.find(
        (item) =>
          item?._id === category ||
          item?.id === category ||
          item?.slug === category
      );

    return (
      foundCategory?.name ||
      "Men's Collection"
    );
  }, [
    category,
    categories,
    categoryIdMap,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Loading skeleton
  |--------------------------------------------------------------------------
  */

  const LoadingSkeleton = () => (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-x-6
        xl:gap-x-8
        gap-y-12
      "
    >
      {Array.from({ length: 6 }).map(
        (_, index) => (
          <div
            key={index}
            className="animate-pulse"
          >
            <div
              className="
                aspect-[3/4]
                bg-gray-100
                rounded-sm
              "
            />

            <div className="pt-5 space-y-3">
              <div className="h-2.5 bg-gray-100 rounded w-1/3" />

              <div className="h-4 bg-gray-100 rounded w-3/4" />

              <div className="h-3 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
        )
      )}
    </div>
  );

  /*
  |--------------------------------------------------------------------------
  | Empty state
  |--------------------------------------------------------------------------
  */

  const EmptyState = () => (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        min-h-[420px]
        flex
        items-center
        justify-center
        text-center
        border-y
        border-gray-100
      "
    >
      <div className="max-w-md px-6">
        <div
          className="
            mx-auto
            w-14
            h-14
            rounded-full
            bg-gray-50
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <Search
            size={20}
            strokeWidth={1.5}
            className="text-gray-400"
          />
        </div>

        <h3
          className="
            text-sm
            font-medium
            uppercase
            tracking-[0.18em]
            text-gray-900
          "
        >
          No products found
        </h3>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-gray-400
          "
        >
          We couldn't find products matching
          your current selection.
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="
              mt-7
              inline-flex
              items-center
              gap-2

              text-[11px]
              uppercase
              tracking-[0.16em]
              font-medium

              text-gray-900

              border-b
              border-gray-900

              pb-1

              hover:text-gray-500
              hover:border-gray-400

              transition-colors
            "
          >
            <X size={13} />
            Clear all filters
          </button>
        )}
      </div>
    </motion.div>
  );

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const Pagination = () => {
    if (
      !onPageChange ||
      totalPages <= 1
    ) {
      return null;
    }

    return (
      <div
        className="
          mt-20
          pt-8
          border-t
          border-gray-100
          flex
          items-center
          justify-between
        "
      >
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          className="
            text-[10px]
            uppercase
            tracking-[0.16em]
            disabled:text-gray-200
            text-gray-500
            hover:text-black
            transition-colors
          "
        >
          Previous
        </button>

        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-gray-400
          "
        >
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={
            currentPage >= totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
          className="
            text-[10px]
            uppercase
            tracking-[0.16em]
            disabled:text-gray-200
            text-gray-500
            hover:text-black
            transition-colors
          "
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <section
      className="
        w-full
        bg-white
        text-gray-900
      "
    >
      {/* =========================================================
          HEADER
      ========================================================== */}

      <div
        className="
          max-w-[1600px]
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
          pt-12
          lg:pt-20
        "
      >
        {/* Breadcrumb */}
        <div
          className="
            flex
            items-center
            gap-2
            mb-8
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-gray-400
            "
          >
            Collection
          </span>

          <span className="text-gray-200">
            /
          </span>

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-gray-700
            "
          >
            Men
          </span>
        </div>

        {/* Main heading */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-8
          "
        >
          <div>
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl

                font-light

                tracking-[-0.045em]

                leading-[0.95]
              "
            >
              {categoryTitle}
            </motion.h1>

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-gray-400
              "
            >
              Explore our men's collection,
              developed with carefully selected
              fabrics, contemporary silhouettes
              and refined manufacturing standards.
            </p>
          </div>

          {/* Result information */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-gray-400
              "
            >
              {visibleResultCount} Products
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE TOOLBAR
      ========================================================== */}

      <div
        className="
          lg:hidden
          max-w-[1600px]
          mx-auto
          px-5
          sm:px-8
          mt-10
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-y
            border-gray-100
            py-4
          "
        >
          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(
                true
              )
            }
            className="
              inline-flex
              items-center
              gap-2

              text-[10px]
              uppercase
              tracking-[0.16em]
              font-medium
            "
          >
            <SlidersHorizontal
              size={15}
              strokeWidth={1.5}
            />

            Filters

            {hasActiveFilters && (
              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-black
                "
              />
            )}
          </button>

          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <button
              type="button"
              onClick={() =>
                setViewMode("grid")
              }
              aria-label="Grid view"
              className={`
                w-9
                h-9
                flex
                items-center
                justify-center
                ${
                  viewMode === "grid"
                    ? "text-black"
                    : "text-gray-300"
                }
              `}
            >
              <Grid2X2
                size={16}
              />
            </button>

            <button
              type="button"
              onClick={() =>
                setViewMode("list")
              }
              aria-label="List view"
              className={`
                w-9
                h-9
                flex
                items-center
                justify-center
                ${
                  viewMode === "list"
                    ? "text-black"
                    : "text-gray-300"
                }
              `}
            >
              <List
                size={18}
              />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          PRODUCTS AREA
      ========================================================== */}

      <div
        className="
          max-w-[1600px]
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
          mt-8
          lg:mt-12
        "
      >
        {/* =======================================================
            DESKTOP FILTER BAR
        ======================================================== */}

        <div
          className="
            hidden
            lg:block

            sticky
            top-0
            z-30

            bg-white/95
            backdrop-blur-md

            -mx-4
            px-4

            py-4

            border-y
            border-gray-100

            mb-12
          "
        >
          {ProductFilterBar && (
            <ProductFilterBar
              categories={categories}
              fabrics={allFabrics}
              search={search}
              onSearchChange={setSearch}
              category={
                category &&
                categoryIdMap[category]
                  ? category
                  : ""
              }
              onCategoryChange={
                setCategory
              }
              fabric={fabric}
              onFabricChange={
                setFabric
              }
              sort={sort}
              onSortChange={setSort}
              viewMode={viewMode}
              onViewModeChange={
                setViewMode
              }
              onReset={handleReset}
              totalResults={
                visibleResultCount
              }
              hasActiveFilters={
                hasActiveFilters
              }
            />
          )}
        </div>

        {/* =======================================================
            ACTIVE FILTER SUMMARY
        ======================================================== */}

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="
                flex
                items-center
                justify-between
                gap-4
                mb-8
                overflow-hidden
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Filter
                  size={13}
                  className="text-gray-400"
                />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-gray-400
                  "
                >
                  Filters applied
                </span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-gray-400
                  hover:text-black
                  transition-colors
                "
              >
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =======================================================
            PRODUCTS
        ======================================================== */}

        {isLoading ? (
          <LoadingSkeleton />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : viewMode === "grid" ? (
          <motion.div
            layout
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3

              gap-x-6
              xl:gap-x-10

              gap-y-14
              lg:gap-y-20
            "
          >
            <AnimatePresence
              mode="popLayout"
            >
              {products.map(
                (product, index) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        Math.min(
                          index * 0.035,
                          0.25
                        ),
                    }}
                  >
                    {ProductCard && (
                      <ProductCard
                        product={product}
                        onQuickView={
                          handleProductClick
                        }
                        index={index}
                      />
                    )}
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div>
            <AnimatePresence
              mode="popLayout"
            >
              {products.map(
                (product, index) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        Math.min(
                          index * 0.035,
                          0.2
                        ),
                    }}
                  >
                    {ProductListItem && (
                      <ProductListItem
                        product={product}
                        onQuickView={
                          handleProductClick
                        }
                        index={index}
                      />
                    )}
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        )}

        {/* =======================================================
            PAGINATION
        ======================================================== */}

        <Pagination />

        {/* =======================================================
            BOTTOM INFORMATION
        ======================================================== */}

        {!isLoading &&
          products.length > 0 && (
            <div
              className="
                mt-20
                pt-8
                border-t
                border-gray-100

                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between

                gap-4
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-gray-400
                "
              >
                Showing{" "}
                {products.length}{" "}
                of{" "}
                {visibleResultCount}{" "}
                products
              </p>

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-gray-300
                "
              >
                Manami Fashions Ltd.
              </span>
            </div>
          )}
      </div>

      {/* =========================================================
          MOBILE FILTER DRAWER
      ========================================================== */}

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileFiltersOpen(
                  false
                )
              }
              className="
                fixed
                inset-0
                z-[80]
                bg-black/30
                backdrop-blur-sm
                lg:hidden
              "
            />

            {/* Drawer */}
            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="
                fixed
                right-0
                top-0
                bottom-0

                w-[88%]
                max-w-[420px]

                z-[90]

                bg-white

                lg:hidden

                overflow-y-auto
              "
            >
              {/* Drawer header */}
              <div
                className="
                  sticky
                  top-0
                  z-10

                  bg-white

                  border-b
                  border-gray-100

                  px-6
                  py-5

                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.18em]
                    "
                  >
                    Filters
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-gray-400
                    "
                  >
                    Refine your selection
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(
                      false
                    )
                  }
                  aria-label="Close filters"
                  className="
                    w-9
                    h-9
                    rounded-full
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                  "
                >
                  <X size={16} />
                </button>
              </div>

              {/* Filter content */}
              <div className="p-6">
                {ProductFilterBar && (
                  <ProductFilterBar
                    categories={categories}
                    fabrics={allFabrics}
                    search={search}
                    onSearchChange={
                      setSearch
                    }
                    category={
                      category &&
                      categoryIdMap[
                        category
                      ]
                        ? category
                        : ""
                    }
                    onCategoryChange={
                      setCategory
                    }
                    fabric={fabric}
                    onFabricChange={
                      setFabric
                    }
                    sort={sort}
                    onSortChange={
                      setSort
                    }
                    viewMode={viewMode}
                    onViewModeChange={
                      setViewMode
                    }
                    onReset={handleReset}
                    totalResults={
                      visibleResultCount
                    }
                    hasActiveFilters={
                      hasActiveFilters
                    }
                  />
                )}
              </div>

              {/* Bottom actions */}
              <div
                className="
                  sticky
                  bottom-0
                  bg-white
                  border-t
                  border-gray-100
                  p-5
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(
                      false
                    )
                  }
                  className="
                    w-full
                    h-12

                    bg-black
                    text-white

                    text-[10px]
                    uppercase
                    tracking-[0.18em]

                    hover:bg-gray-800

                    transition-colors
                  "
                >
                  View{" "}
                  {visibleResultCount}{" "}
                  Products
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MensItem;

