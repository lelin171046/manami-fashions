
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const certData = [
  {
    name: "GOTS",
    img: "https://cdn.shopify.com/s/files/1/0255/5976/0973/files/gots_logo_copy_240x240.png?v=1569937434",
  },
  {
    name: "Better Work",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789575493/BW-Bangladesh-Stacked-rgb.png",
  },
  {
    name: "BCI",
    img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png",
  },
  {
    name: "OEKO-TEX",
    img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076120/Oeko-tex_standard100_logo_rgb-2022_a8e41h.jpg",
  },
  {
    name: "Higg Index",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789575834/Higg-Index-1024x688.png",
  },
  {
    name: "Fair Trade",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789575397/fairtrade-logo-png_seeklogo-307009.png",
  },
  {
    name: "GRS",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789575910/global-recycled-standard-grs-zertifizierung-sinox-polymers.png",
  },
  {
    name: "Recycled 100",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789575130/Recycled-Claim-Standard-Logo.png",
  },
  {
    name: "ISO 14001",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789576148/Gemini_Generated_Image_3x8m2t3x8m2t3x8m.jpg",
  },
  {
    name: "WRAP",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789575306/global-organic-textile-standard-gots-vector-logo.png",
  },
  {
    name: "Sedex",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789576325/45838853-d8a6-40a0-9020-69f3a4291135.png",
  },
  {
    name: "RSC",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789576645/8c50cb02-929b-4e20-aaa4-d7fdf5c2187c.png",
  },
  {
    name: "Alliance",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789577169/WhatsApp_Image_2026-09-16_at_10.37.02_PM.jpg",
  },
  {
    name: "amfori BSCI",
    img: "https://res.cloudinary.com/dcdmktxtz/image/upload/v1773076121/20170426104313_BCI_Logo_2015_m6vfni.png",
  },
  {
    name: "SCAN",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789578018/Gemini_Generated_Image_cm08kccm08kccm08-removebg-preview.png",
  },
  {
    name: "Her+ Project",
    img: "https://res.cloudinary.com/doyqpt8ep/image/upload/v1789577916/Gemini_Generated_Image_qa9ib3qa9ib3qa9i-removebg-preview.png",
  },
];

const allCerts = [...certData, ...certData];

const Cer = () => {
  /*
   * Bigger radius = bigger spherical layout
   * with more breathing room between logos.
   */
  const [radius, setRadius] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768
      ? 175
      : 285
  );

  const [hovered, setHovered] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  const rotationX = useRef(-0.12);
  const rotationY = useRef(0);

  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const autoRotate = useRef(true);

  /*
   * Responsive sphere size
   */
  useEffect(() => {
    const onResize = () => {
      setRadius(window.innerWidth < 768 ? 175 : 285);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /*
   * Generate evenly distributed points
   * around the spherical surface.
   */
  const positions = useMemo(() => {
    return allCerts.map((_, i) => {
      const phi = Math.acos(
        -1 + (2 * i) / allCerts.length
      );

      const theta =
        Math.sqrt(allCerts.length * Math.PI) * phi;

      return {
        x:
          radius *
          Math.cos(theta) *
          Math.sin(phi),

        y:
          radius *
          Math.sin(theta) *
          Math.sin(phi),

        z:
          radius *
          Math.cos(phi),
      };
    });
  }, [radius]);

  /*
   * ---------------------------------------
   * Mouse / Touch Start
   * ---------------------------------------
   */
  const handlePointerDown = (e) => {
    dragging.current = true;
    autoRotate.current = false;

    setIsDragging(true);

    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
    };

    e.currentTarget.setPointerCapture?.(
      e.pointerId
    );
  };

  /*
   * ---------------------------------------
   * Mouse / Touch Move
   * ---------------------------------------
   */
  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    const deltaX =
      e.clientX - lastPointer.current.x;

    const deltaY =
      e.clientY - lastPointer.current.y;

    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
    };

    /*
     * Horizontal drag
     */
    rotationY.current += deltaX * 0.007;

    /*
     * Vertical drag
     */
    rotationX.current += deltaY * 0.004;

    /*
     * Keep sphere controllable
     */
    rotationX.current = Math.max(
      -Math.PI / 2,
      Math.min(
        Math.PI / 2,
        rotationX.current
      )
    );
  };

  /*
   * ---------------------------------------
   * Mouse / Touch End
   * ---------------------------------------
   */
  const handlePointerUp = (e) => {
    dragging.current = false;

    setIsDragging(false);

    e.currentTarget.releasePointerCapture?.(
      e.pointerId
    );

    /*
     * Resume automatic rotation
     * after a short pause.
     */
    setTimeout(() => {
      if (!dragging.current) {
        autoRotate.current = true;
      }
    }, 1500);
  };

  /*
   * ---------------------------------------
   * 3D Animation
   * ---------------------------------------
   */
  useAnimationFrame((time, delta) => {
    const container = containerRef.current;

    if (!container) return;

    /*
     * Slow automatic rotation.
     */
    if (
      autoRotate.current &&
      !dragging.current
    ) {
      rotationY.current +=
        delta * 0.00016;
    }

    const cosY = Math.cos(
      rotationY.current
    );

    const sinY = Math.sin(
      rotationY.current
    );

    const cosX = Math.cos(
      rotationX.current
    );

    const sinX = Math.sin(
      rotationX.current
    );

    positions.forEach((pos, i) => {
      /*
       * Rotate Y
       */
      let x =
        pos.x * cosY -
        pos.z * sinY;

      let z =
        pos.x * sinY +
        pos.z * cosY;

      /*
       * Rotate X
       */
      let y =
        pos.y * cosX -
        z * sinX;

      z =
        pos.y * sinX +
        z * cosX;

      /*
       * -----------------------------------
       * DEPTH
       * -----------------------------------
       *
       * 0 = very back
       * 1 = very front
       */
      const depth =
        (z + radius) /
        (radius * 2);

      /*
       * -----------------------------------
       * SCALE
       * -----------------------------------
       *
       * Back:
       * ~0.72
       *
       * Middle:
       * ~0.95
       *
       * Front:
       * ~1.30
       */
      const depthScale =
        0.72 +
        depth * 0.58;

      /*
       * -----------------------------------
       * OPACITY
       * -----------------------------------
       *
       * Keep back logos visible.
       */
      const opacity =
        0.62 +
        depth * 0.38;

      /*
       * -----------------------------------
       * VERY LIGHT BLUR
       * -----------------------------------
       *
       * Only extreme back gets tiny blur.
       */
      const blur =
        depth < 0.18
          ? (0.18 - depth) * 1.5
          : 0;

      const el =
        container.children[i];

      if (!el) return;

      /*
       * Hover scale is handled by
       * the inner logo card.
       */
      el.style.transform = `
        translate3d(
          ${x}px,
          ${y}px,
          0
        )
        scale(${depthScale})
      `;

      el.style.opacity =
        String(opacity);

      el.style.filter =
        `blur(${blur}px)`;

      /*
       * Front objects get higher z-index.
       *
       * This allows the logos to move
       * in front of the count badge.
       */
      el.style.zIndex =
        String(
          Math.floor(depth * 1000)
        );
    });
  });

  return (
    <section
      className="
        relative
        w-full
        h-[600px]
        lg:h-[760px]
        flex
        items-center
        justify-center
        overflow-hidden
        select-none
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          margin: "-80px",
        }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="
          relative

          w-[440px]
          h-[440px]

          lg:w-[680px]
          lg:h-[680px]
        "
      >
        {/* =================================
            SPHERE AMBIENT GLOW
        ================================= */}
        <div
          className="
            absolute
            inset-[8%]
            rounded-full

            bg-[radial-gradient(
              circle,
              rgba(0,0,0,0.07)_0%,
              rgba(0,0,0,0.025)_40%,
              transparent_72%
            )]

            pointer-events-none
          "
        />

        {/* =================================
            LARGE ORBIT RING
        ================================= */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute

            inset-[4%]

            rounded-full

            border
            border-dashed
            border-gray-200/80

            pointer-events-none
          "
        />

        {/* =================================
            SECOND SUBTLE ORBIT
        ================================= */}
        <div
          className="
            absolute
            inset-[13%]

            rounded-full

            border
            border-gray-100

            pointer-events-none
          "
        />

        {/* =================================
            CERTIFICATION SPHERE
        ================================= */}
        <div
          ref={containerRef}
          onPointerDown={
            handlePointerDown
          }
          onPointerMove={
            handlePointerMove
          }
          onPointerUp={
            handlePointerUp
          }
          onPointerCancel={
            handlePointerUp
          }
          className={`
            absolute
            inset-0

            flex
            items-center
            justify-center

            ${
              isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
            }
          `}
          style={{
            touchAction: "none",
          }}
        >
          {allCerts.map(
            (cert, i) => (
              <div
                key={`${cert.name}-${i}`}
                className="
                  absolute

                  will-change-transform

                  pointer-events-auto
                "
                onMouseEnter={() => {
                  if (
                    !dragging.current
                  ) {
                    autoRotate.current =
                      false;

                    setHovered(i);
                  }
                }}
                onMouseLeave={() => {
                  if (
                    !dragging.current
                  ) {
                    autoRotate.current =
                      true;

                    setHovered(null);
                  }
                }}
              >
                {/* =============================
                    LOGO CARD
                ============================= */}
                <div
                  className={`
                    relative

                    w-[68px]
                    h-[68px]

                    lg:w-[82px]
                    lg:h-[82px]

                    flex
                    items-center
                    justify-center

                    rounded-2xl

                    bg-white

                    border
                    border-gray-200

                    shadow-lg

                    transition-transform
                    duration-300
                    ease-out

                    ${
                      hovered === i
                        ? "scale-[1.18] shadow-2xl border-gray-300"
                        : ""
                    }
                  `}
                >
                  <img
                    src={cert.img}
                    alt={`${cert.name} certification`}
                    className="
                      w-[82%]
                      h-[82%]

                      object-contain

                      pointer-events-none
                    "
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* =============================
                    NAME ON HOVER
                ============================= */}
                <div
                  className={`
                    absolute

                    left-1/2
                    -translate-x-1/2

                    -top-11

                    whitespace-nowrap

                    px-3
                    py-1.5

                    rounded-lg

                    bg-black
                    text-white

                    text-[10px]

                    font-semibold

                    uppercase

                    tracking-[0.14em]

                    shadow-xl

                    transition-all
                    duration-200

                    ${
                      hovered === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }
                  `}
                >
                  {cert.name}
                </div>
              </div>
            )
          )}
        </div>

        {/* =================================
            CENTER COUNT
            LOW Z-INDEX = BEHIND LOGOS
        ================================= */}
        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            pointer-events-none

            z-0
          "
        >
          <motion.div
            animate={{
              scale: [
                1,
                1.035,
                1,
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative

              w-[145px]
              h-[145px]

              lg:w-[180px]
              lg:h-[180px]

              rounded-full

              bg-black
              text-white

              flex
              items-center
              justify-center

              text-center

              shadow-2xl
            "
          >
            <div
              className="
                absolute
                inset-2

                rounded-full

                border
                border-white/10
              "
            />

            <div>
              <span
                className="
                  block

                  text-4xl
                  lg:text-5xl

                  font-bold

                  tracking-tight
                "
              >
                {certData.length}+
              </span>

              <span
                className="
                  block

                  text-[8px]
                  lg:text-[9px]

                  uppercase

                  tracking-[0.22em]

                  text-white/60

                  mt-2

                  px-5
                "
              >
                Global
                <br />
                Certifications
              </span>
            </div>
          </motion.div>
        </div>

        {/* =================================
            DRAG HINT
        ================================= */}
        <div
          className="
            absolute

            bottom-1
            left-1/2
            -translate-x-1/2

            whitespace-nowrap

            text-[9px]

            uppercase

            tracking-[0.2em]

            text-gray-400

            pointer-events-none
          "
        >
          Drag to explore
        </div>
      </motion.div>
    </section>
  );
};

export default Cer;

