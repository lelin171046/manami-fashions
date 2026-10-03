import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./InfiniteSpiral.css";

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

const InfiniteSpiral = ({
  items = [],

  speed = 0.35,
  direction = "up",

  radius = 240,
  cardWidth = 190,
  cardHeight = 120,

  verticalSpacing = 95,
  perspective = 1000,

  cardsPerTurn = 8,
  cardTilt = 0,

  cardRadius = 12,

  centerScale = 1.15,

  edgeFade = 0.35,
  edgeBlur = 3,

  pauseOnHover = true,

  imageFit = "contain",
  grayscale = 0,

  className = "",
}) => {
  const animationRef = useRef(null);

const [offset, setOffset] = useState(0);
const [isHovered, setIsHovered] = useState(false);
const [isDragging, setIsDragging] = useState(false);

const dragStartY = useRef(0);
const dragStartOffset = useRef(0);

  const normalizedItems = useMemo(() => {
    return items.map((item, index) => ({
      ...item,
      id: item.id ?? index,
    }));
  }, [items]);

  const totalItems = normalizedItems.length;

  useEffect(() => {
    if (!totalItems) return;

    let previousTime = performance.now();

    const animate = (time) => {
      const delta = time - previousTime;
      previousTime = time;

      if (!(pauseOnHover && isHovered)) {
       const directionValue =
  direction === "down" ? -1 : 1;

setOffset((previous) => {
  return (
    previous +
    delta *
      speed *
      0.18 *
      directionValue
  );
});
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    speed,
    direction,
    pauseOnHover,
    isHovered,
    totalItems,
  ]);

  if (!totalItems) {
    return null;
  }

  /*
   * Total distance required before
   * the cards loop around.
   */
  const totalHeight =
    totalItems * verticalSpacing;

  return (
    <div
      className={`infinite-spiral ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        "--spiral-perspective":
          `${perspective}px`,

        "--card-width":
          `${cardWidth}px`,

        "--card-height":
          `${cardHeight}px`,

        "--card-radius":
          `${cardRadius}px`,
      }}
    >
      <div className="infinite-spiral__stage">

        {normalizedItems.map(
          (item, index) => {

            /*
             * Base vertical position.
             */
            const baseY =
              index * verticalSpacing;

            /*
             * Infinite vertical movement.
             */
            let rawY =
              baseY + offset;

            rawY =
              ((rawY % totalHeight) +
                totalHeight) %
                totalHeight;

            /*
             * Move the spiral around
             * the center of the screen.
             */
            const y =
              rawY -
              totalHeight / 2;

            /*
             * Normalized distance from center.
             *
             * 0 = center
             * 1 = edge
             */
            const distance =
              Math.abs(y) /
              (totalHeight / 2);

            /*
             * Spiral rotation.
             */
            const angle =
              (index / cardsPerTurn) *
                Math.PI *
                2 +
              offset * 0.002;

            /*
             * X movement.
             *
             * This creates the large
             * S-shaped movement.
             */
            const x =
              Math.sin(angle) *
              radius;

            /*
             * Z depth.
             *
             * Cards closer to viewer become
             * larger and sharper.
             */
            const z =
              Math.cos(angle) *
              radius;

            /*
             * Center cards become larger.
             */
            const centerAmount =
              clamp(
                1 - distance,
                0,
                1
              );

            const scale =
              0.65 +
              centerAmount *
                (centerScale - 0.65);

            /*
             * Fade cards near edges.
             */
            const fadeStart =
              1 - edgeFade;

            const opacity =
              distance <= fadeStart
                ? 1
                : clamp(
                    1 -
                      (distance -
                        fadeStart) /
                        edgeFade,
                    0,
                    1
                  );

            /*
             * Blur cards that are far away.
             */
            const blur =
              edgeBlur *
              Math.pow(distance, 2);

            /*
             * Slight rotation follows
             * the spiral.
             */
            const rotate =
              Math.sin(angle) * 8;

            /*
             * Front/back depth affects
             * visual layering.
             */
            const zIndex =
              Math.round(
                1000 + z
              );

            const transform = `
              translate3d(
                calc(-50% + ${x}px),
                calc(-50% + ${y}px),
                ${z}px
              )
              rotateZ(${rotate}deg)
              rotateX(${cardTilt}deg)
              scale(${scale})
            `;

            const cardStyle = {
              transform,
              opacity,
              zIndex,

              filter:
                blur > 0
                  ? `blur(${blur}px)`
                  : "none",
            };

            const imageStyle = {
              objectFit: imageFit,

              filter: `
                grayscale(${grayscale})
              `,
            };

            const image = (
              <img
                src={item.src}
                alt={
                  item.alt ||
                  item.label ||
                  ""
                }
                className="infinite-spiral__image"
                style={imageStyle}
                draggable={false}
              />
            );

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={
                    item.target || "_blank"
                  }
                  rel="noopener noreferrer"
                  className="infinite-spiral__item"
                  style={cardStyle}
                >
                  {image}
                </a>
              );
            }

            return (
              <div
                key={item.id}
                className="infinite-spiral__item"
                style={cardStyle}
              >
                {image}
              </div>
            );
          }
        )}

      </div>
    </div>
  );
};

export default InfiniteSpiral;