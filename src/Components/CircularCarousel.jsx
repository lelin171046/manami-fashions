import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./CircularCarousel.css";

const DEFAULT_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80&auto=format&fit=crop",
    alt: "Mist drifting through a mountain valley",
    title: "Valley",
    subtitle: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80&auto=format&fit=crop",
    alt: "A studio portrait",
    title: "Portrait",
    subtitle: "Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop",
    alt: "Glass towers from street level",
    title: "Towers",
    subtitle: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80&auto=format&fit=crop",
    alt: "A surfer carving inside a breaking wave",
    title: "Swell",
    subtitle: "Ocean",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80&auto=format&fit=crop",
    alt: "An angular white building against the sky",
    title: "Facade",
    subtitle: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80&auto=format&fit=crop",
    alt: "A model in striped trousers leaning on a wall",
    title: "Pose",
    subtitle: "Editorial",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80&auto=format&fit=crop",
    alt: "The Milky Way above snowy peaks",
    title: "Night",
    subtitle: "Sky",
  },
  {
    src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&q=80&auto=format&fit=crop",
    alt: "A woman in a long coat on a city street",
    title: "Street",
    subtitle: "Editorial",
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=80&auto=format&fit=crop",
    alt: "Mountains mirrored in a still lake",
    title: "Mirror",
    subtitle: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&q=80&auto=format&fit=crop",
    alt: "A glass skyscraper under a cloudy sky",
    title: "Glass",
    subtitle: "Architecture",
  },
];

const PRESETS = {
  cylinder: {
    axis: "y",
    tilt: -5,
    perspective: 2500,
    curve: 1,
    spread: 1,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 0,
  },

  orbit: {
    axis: "y",
    tilt: -16,
    perspective: 1500,
    curve: 0,
    spread: 1.45,
    inward: false,
    billboard: true,
    backfaces: false,
    window: 0,
  },

  wheel: {
    axis: "x",
    tilt: 0,
    perspective: 1800,
    curve: 0,
    spread: 1,
    inward: false,
    billboard: false,
    backfaces: true,
    window: 1.7,
  },

  panorama: {
    axis: "y",
    tilt: 0,
    perspective: 0,
    curve: 1,
    spread: 1,
    inward: true,
    billboard: false,
    backfaces: false,
    window: 0,
  },
};

const INTRO_LENGTH = {
  assemble: 1500,
  rise: 1400,
  spin: 1800,
  none: 0,
};

const TILES = 8;
const OVERLAP = 2.5;
const DRAG_THRESHOLD = 5;
const SPRING = 118;
const SETTLE_SPEED = 9;
const CAPTION_SPACE = 76;
const TO_RAD = Math.PI / 180;

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, value));

const wrap = (degrees) =>
  ((((degrees + 180) % 360) + 360) % 360) - 180;

const easeOut = (value) =>
  1 - Math.pow(1 - value, 4);

const easeOutQuint = (value) =>
  1 - Math.pow(1 - value, 5);

const rotateX = (point, degrees) => {
  const radians = degrees * TO_RAD;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);

  return [
    point[0],
    point[1] * cosine - point[2] * sine,
    point[1] * sine + point[2] * cosine,
  ];
};

const rotateY = (point, degrees) => {
  const radians = degrees * TO_RAD;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);

  return [
    point[0] * cosine + point[2] * sine,
    point[1],
    -point[0] * sine + point[2] * cosine,
  ];
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    );

    if (!mediaQuery) return undefined;

    const update = () => {
      setReduced(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener?.("change", update);

    return () => {
      mediaQuery.removeEventListener?.("change", update);
    };
  }, []);

  return reduced;
};

const Digits = ({ value }) => {
  return (
    <span className="cc-digits">
      {String(value)
        .padStart(2, "0")
        .split("")
        .map((digit, index) => (
          <span className="cc-digit" key={index}>
            <span
              className="cc-digit-strip"
              style={{
                transform: `translateY(${-Number(digit) * 10}%)`,
              }}
            >
              {"0123456789".split("").map((number) => (
                <span className="cc-digit-number" key={number}>
                  {number}
                </span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
};

const CircularCarousel = ({
  items = DEFAULT_ITEMS,
  preset = "cylinder",
  intro = "rise",
  cardWidth = 260,
  aspectRatio = 1,
  gap = 25,
  curve,
  tilt,
  perspective,
  autoplay = "drift",
  speed = 14,
  interval = 3,
  direction = "left",
  draggable = true,
  momentum = 0.6,
  snap = true,
  pauseOnHover = true,
  focusOnClick = true,
  parallax = 0.3,
  stretch = 0.5,
  depthFade = 0.55,
  fadeColor = "#000000",
  innerShade = 0.6,
  cornerRadius = 12,
  captions = false,
  onChange,
  onItemClick,
  className = "",
  style,
}) => {
  const list = items?.length ? items : DEFAULT_ITEMS;
  const count = list.length;

  const shape = PRESETS[preset] ? preset : "cylinder";
  const layout = PRESETS[shape];

  const axis = layout.axis;
  const tiltValue = tilt ?? layout.tilt;

  const reduced = usePrefersReducedMotion();

  const cardW = Math.max(80, cardWidth);
  const cardH =
    cardW / clamp(aspectRatio, 0.2, 5);

  const along = axis === "x" ? cardH : cardW;
  const step = 360 / count;

  const curveValue = layout.billboard
    ? 0
    : clamp(curve ?? layout.curve, 0, 1);

  const radius = useMemo(() => {
    const numberOfItems = Math.max(count, 3);
    const pitch =
      (along + gap) * layout.spread;

    const chord =
      pitch /
      (2 * Math.sin(Math.PI / numberOfItems));

    const arc =
      (numberOfItems * pitch) / (2 * Math.PI);

    return Math.max(
      chord + (arc - chord) * curveValue,
      along * 0.6
    );
  }, [
    count,
    along,
    gap,
    curveValue,
    layout.spread,
  ]);

  const tiles = useMemo(() => {
    const total = curveValue > 0.001 ? TILES : 1;
    const length = along / total;
    const bend = curveValue > 0.001
      ? radius / curveValue
      : 0;

    return Array.from({ length: total }, (_, index) => {
      const start =
        index * length -
        (index > 0 ? OVERLAP / 2 : 0);

      const end =
        (index + 1) * length +
        (index < total - 1 ? OVERLAP / 2 : 0);

      const center =
        (start + end) / 2 - along / 2;

      const alpha = bend
        ? center / bend
        : 0;

      const shift = bend
        ? bend * Math.sin(alpha)
        : center;

      const sink = bend
        ? bend * (1 - Math.cos(alpha))
        : 0;

      const depth = layout.inward
        ? sink
        : -sink;

      const turn =
        ((layout.inward ? -alpha : alpha) * 180) /
        Math.PI;

      const move =
        axis === "x"
          ? `translate3d(0px, ${shift}px, ${depth}px) rotateX(${-turn}deg)`
          : `translate3d(${shift}px, 0px, ${depth}px) rotateY(${turn}deg)`;

      return {
        index,
        total,
        start,
        end,
        size: end - start,
        move,
      };
    });
  }, [
    along,
    axis,
    curveValue,
    layout.inward,
    radius,
  ]);

  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const cameraRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);

  const wakeRef = useRef(() => {});
  const measureRef = useRef(() => {});

  const activeRef = useRef(0);

  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);

  const readyRef = useRef(false);
  readyRef.current = ready;

  const stateRef = useRef({
    angle: 0,
    velocity: 0,
    target: null,
    dir: 0,
    press: null,
    drag: false,
    hover: false,
    pointer: {
      inside: false,
      x: 0,
      y: 0,
    },
    yaw: 0,
    pitch: 0,
    intro: null,
    introDone: false,
    holdUntil: 0,
    stepAt: 0,
    suppressClick: false,
    wheelTimer: 0,
    fit: 1,
    shift: 0,
    drop: 0,
    last: 0,
  });

  const settings = {
    count,
    step,
    radius,
    layout,
    axis,
    tilt: tiltValue,
    perspective: layout.inward
      ? radius
      : perspective ?? layout.perspective,
    cardW,
    cardH,
    intro: reduced
      ? "none"
      : intro in INTRO_LENGTH
        ? intro
        : "rise",
    autoplay: reduced ? "off" : autoplay,
    speed,
    interval: Math.max(0.5, interval),
    draggable,
    momentum: clamp(momentum, 0, 1),
    snap,
    pauseOnHover,
    parallax: reduced
      ? 0
      : clamp(parallax, 0, 1),
    stretch: reduced
      ? 0
      : clamp(stretch, 0, 1),
    depthFade: clamp(depthFade, 0, 1),
    captions,
    reduced,
  };

  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const dragSign = layout.inward ? -1 : 1;

  const directionSign =
    (direction === "right" ? 1 : -1) *
    dragSign;

  useEffect(() => {
    stateRef.current.dir = directionSign;
    wakeRef.current();
  }, [directionSign]);

  const sourcesKey = list
    .map((item) => item.src)
    .join("|");

  useEffect(() => {
    let cancelled = false;

    setReady(false);

    const sources = sourcesKey
      .split("|")
      .slice(0, 12);

    const loadImage = (src) =>
      new Promise((resolve) => {
        const image = new Image();

        image.decoding = "async";

        image.onload = () => {
          if (image.decode) {
            image.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
        };

        image.onerror = resolve;
        image.src = src;
      });

    const timeout = new Promise((resolve) => {
      setTimeout(resolve, 2400);
    });

    Promise.race([
      Promise.all(sources.map(loadImage)),
      timeout,
    ]).then(() => {
      if (cancelled) return;

      const state = stateRef.current;

      state.introDone = false;
      state.intro = null;

      setReady(true);
      wakeRef.current();
    });

    return () => {
      cancelled = true;
    };
  }, [sourcesKey]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const camera = cameraRef.current;
    const ring = ringRef.current;

    if (!root || !stage || !camera || !ring) {
      return undefined;
    }

    const state = stateRef.current;

    let raf = 0;
    let visible = true;

    const nearest = (angle) => {
      return (
        Math.round(
          angle / settingsRef.current.step
        ) * settingsRef.current.step
      );
    };

    const measure = () => {
      const currentSettings = settingsRef.current;
      const rect = root.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const captionRoom = currentSettings.captions
        ? CAPTION_SPACE
        : 0;

      const width = rect.width * 0.94;
      const height =
        (rect.height - captionRoom) * 0.92;

      const P = currentSettings.perspective;

      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;

      if (currentSettings.layout.inward) {
        minX = -width / 2;
        maxX = width / 2;
        minY = -currentSettings.cardH / 2;
        maxY = currentSettings.cardH / 2;
      } else {
        const corners = [
          [
            -currentSettings.cardW / 2,
            -currentSettings.cardH / 2,
          ],
          [
            currentSettings.cardW / 2,
            -currentSettings.cardH / 2,
          ],
          [
            -currentSettings.cardW / 2,
            currentSettings.cardH / 2,
          ],
          [
            currentSettings.cardW / 2,
            currentSettings.cardH / 2,
          ],
        ];

        const limit = currentSettings.layout.window
          ? currentSettings.layout.window *
            currentSettings.step
          : 180;

        for (
          let angle = -limit;
          angle <= limit;
          angle += limit / 24
        ) {
          for (const [cx, cy] of corners) {
            let point;

            if (currentSettings.axis === "x") {
              point = rotateX(
                [cx, cy, currentSettings.radius],
                -angle
              );

              point = [
                point[0],
                point[1],
                point[2] - currentSettings.radius,
              ];

              point = rotateY(
                point,
                currentSettings.tilt
              );
            } else if (
              currentSettings.layout.billboard
            ) {
              const center = rotateY(
                [0, 0, currentSettings.radius],
                angle
              );

              point = [
                center[0] + cx,
                cy,
                center[2] - currentSettings.radius,
              ];

              point = rotateX(
                point,
                currentSettings.tilt
              );
            } else {
              point = rotateY(
                [cx, cy, currentSettings.radius],
                angle
              );

              point = [
                point[0],
                point[1],
                point[2] - currentSettings.radius,
              ];

              point = rotateX(
                point,
                currentSettings.tilt
              );
            }

            if (point[2] >= P * 0.95) {
              continue;
            }

            const scale =
              P / (P - point[2]);

            minX = Math.min(
              minX,
              point[0] * scale
            );

            maxX = Math.max(
              maxX,
              point[0] * scale
            );

            minY = Math.min(
              minY,
              point[1] * scale
            );

            maxY = Math.max(
              maxY,
              point[1] * scale
            );
          }
        }
      }

      const spanX = Math.max(maxX - minX, 1);
      const spanY = Math.max(maxY - minY, 1);

      const fit = Math.min(
        1,
        width / spanX,
        height / spanY
      );

      state.fit = fit;

      state.shift =
        -((minY + maxY) / 2) * fit -
        captionRoom / 2;

      state.drop =
        currentSettings.axis === "x"
          ? (rect.width / fit) * 0.55 +
            currentSettings.cardW
          : (rect.height / fit) * 0.55 +
            currentSettings.cardH;

      stage.style.perspective = `${P}px`;

      stage.style.transform = `
        translate3d(0, ${state.shift}px, 0)
        scale(${fit})
      `;
    };

    measureRef.current = measure;

    const introCard = (elapsed, landing) => {
      if (!state.intro) {
        return {
          radius: 1,
          lift: 0,
        };
      }

      const type = state.intro.type;

      const reach = Math.abs(
        wrap(landing + state.angle)
      );

      if (type === "assemble") {
        const delay = (reach / 180) * 420;

        const progress = easeOut(
          clamp(
            (elapsed - delay) / 1080,
            0,
            1
          )
        );

        return {
          radius: 1 + 0.6 * (1 - progress),
          lift: 0,
        };
      }

      if (type === "rise") {
        const delay = (reach / 180) * 480;

        const progress = easeOutQuint(
          clamp(
            (elapsed - delay) / 900,
            0,
            1
          )
        );

        return {
          radius: 1,
          lift: (1 - progress) * state.drop,
        };
      }

      if (type === "spin") {
        const progress = easeOut(
          clamp(
            elapsed / INTRO_LENGTH.spin,
            0,
            1
          )
        );

        return {
          radius: 1 + 0.28 * (1 - progress),
          lift: 0,
        };
      }

      return {
        radius: 1,
        lift: 0,
      };
    };

    const advance = (
      currentSettings,
      dt,
      now
    ) => {
      if (
        !state.introDone &&
        readyRef.current
      ) {
        if (!state.intro) {
          if (
            currentSettings.intro === "none"
          ) {
            state.introDone = true;
          } else {
            state.intro = {
              type: currentSettings.intro,
              start: now,
            };
          }
        }

        if (
          state.intro &&
          now - state.intro.start >=
            INTRO_LENGTH[state.intro.type]
        ) {
          state.intro = null;
          state.introDone = true;
        }
      }

      const paused =
        (currentSettings.pauseOnHover &&
          state.hover) ||
        state.drag ||
        now < state.holdUntil;

      const cruise =
        currentSettings.autoplay === "drift" &&
        !paused &&
        !state.intro
          ? currentSettings.speed * state.dir
          : 0;

      let busy =
        Boolean(state.intro) || state.drag;

      if (state.drag || state.intro) {
        state.velocity = state.drag
          ? state.velocity
          : 0;
      } else if (state.target !== null) {
        let remaining = dt;

        const damping = 2 * Math.sqrt(SPRING);

        while (remaining > 0) {
          const delta = Math.min(
            remaining,
            1 / 240
          );

          const acceleration =
            SPRING *
              (state.target - state.angle) -
            damping * state.velocity;

          state.velocity +=
            acceleration * delta;

          state.angle +=
            state.velocity * delta;

          remaining -= delta;
        }

        if (
          Math.abs(
            state.target - state.angle
          ) < 0.004 &&
          Math.abs(state.velocity) < 0.03
        ) {
          state.angle = state.target;
          state.velocity = 0;
          state.target = null;
        }

        busy = true;
      } else {
        const tau =
          0.18 +
          currentSettings.momentum * 1.5;

        state.velocity +=
          (cruise - state.velocity) *
          (1 - Math.exp(-dt / tau));

        state.angle +=
          state.velocity * dt;

        if (
          cruise === 0 &&
          currentSettings.snap &&
          Math.abs(state.velocity) <
            SETTLE_SPEED
        ) {
          state.target = nearest(state.angle);
        }

        busy =
          busy ||
          cruise !== 0 ||
          Math.abs(state.velocity) > 0.01 ||
          state.target !== null;
      }

      if (
        currentSettings.autoplay === "step" &&
        !paused &&
        !state.intro &&
        state.introDone
      ) {
        if (!state.stepAt) {
          state.stepAt =
            now +
            currentSettings.interval * 1000;
        }

        if (now >= state.stepAt) {
          state.target =
            (state.target ??
              nearest(state.angle)) +
            currentSettings.step * state.dir;

          state.stepAt =
            now +
            currentSettings.interval * 1000;
        }

        busy = true;
      } else {
        state.stepAt = 0;
      }

      if (now < state.holdUntil) {
        busy = true;
      }

      const ease =
        1 - Math.exp(-dt / 0.35);

      const aimYaw = state.pointer.inside
        ? state.pointer.x *
          currentSettings.parallax *
          9
        : 0;

      const aimPitch = state.pointer.inside
        ? -state.pointer.y *
          currentSettings.parallax *
          6
        : 0;

      state.yaw +=
        (aimYaw - state.yaw) * ease;

      state.pitch +=
        (aimPitch - state.pitch) * ease;

      if (
        Math.abs(aimYaw - state.yaw) >
          0.01 ||
        Math.abs(aimPitch - state.pitch) >
          0.01
      ) {
        busy = true;
      }

      return busy;
    };

    const render = (
      currentSettings,
      now
    ) => {
      const elapsed = state.intro
        ? now - state.intro.start
        : 0;

      const swell =
        1 +
        currentSettings.stretch *
          0.12 *
          Math.min(
            1,
            Math.abs(state.velocity) / 420
          );

      let spinOffset = 0;

      if (state.intro?.type === "spin") {
        const progress = easeOut(
          clamp(
            elapsed / INTRO_LENGTH.spin,
            0,
            1
          )
        );

        spinOffset =
          -300 *
          state.dir *
          (1 - progress);
      } else if (
        state.intro?.type === "assemble"
      ) {
        const progress = easeOut(
          clamp(
            elapsed / INTRO_LENGTH.assemble,
            0,
            1
          )
        );

        spinOffset =
          -32 *
          state.dir *
          (1 - progress);
      }

      const angle =
        state.angle + spinOffset;

      const R =
        currentSettings.radius * swell;

      if (currentSettings.axis === "x") {
        camera.style.transform = `
          translate3d(0, 0, ${-R}px)
          rotateY(${currentSettings.tilt + state.yaw}deg)
          rotateX(${state.pitch}deg)
        `;

        ring.style.transform = `
          rotateX(${-angle}deg)
        `;
      } else if (
        currentSettings.layout.inward
      ) {
        camera.style.transform = `
          translate3d(
            0,
            0,
            ${currentSettings.perspective - 1}px
          )
          rotateX(${currentSettings.tilt + state.pitch}deg)
          rotateY(${state.yaw}deg)
        `;

        ring.style.transform = `
          rotateY(${angle}deg)
        `;
      } else {
        camera.style.transform = `
          translate3d(0, 0, ${-R}px)
          rotateX(${currentSettings.tilt + state.pitch}deg)
          rotateY(${state.yaw}deg)
        `;

        ring.style.transform = `
          rotateY(${angle}deg)
        `;
      }

      for (
        let index = 0;
        index < currentSettings.count;
        index += 1
      ) {
        const card =
          cardRefs.current[index];

        if (!card) continue;

        const base =
          index * currentSettings.step;

        const introState = introCard(
          elapsed,
          base
        );

        const currentRadius =
          R * introState.radius;

        let transform;

        if (currentSettings.axis === "x") {
          transform = `
            rotateX(${-base}deg)
            translateZ(${currentRadius}px)
          `;
        } else if (
          currentSettings.layout.inward
        ) {
          transform = `
            rotateY(${base}deg)
            translateZ(${-currentRadius}px)
          `;
        } else {
          transform = `
            rotateY(${base}deg)
            translateZ(${currentRadius}px)
          `;

          if (
            currentSettings.layout.billboard
          ) {
            transform += `
              rotateY(${-(base + angle)}deg)
            `;
          }
        }

        if (introState.lift) {
          transform +=
            currentSettings.axis === "x"
              ? ` translateX(${introState.lift}px)`
              : ` translateY(${introState.lift}px)`;
        }

        card.style.transform = transform;

        const world = wrap(base + angle);
        const facing = Math.cos(world * TO_RAD);

        if (
          currentSettings.layout.inward
        ) {
          card.style.visibility =
            Math.abs(world) > 86
              ? "hidden"
              : "";
        }

        const fade =
          currentSettings.depthFade *
          Math.pow((1 - facing) / 2, 1.25);

        card.style.setProperty(
          "--cc-depth",
          fade.toFixed(3)
        );
      }

      const currentIndex =
        ((Math.round(
          -state.angle / currentSettings.step
        ) %
          currentSettings.count) +
          currentSettings.count) %
          currentSettings.count ||
        0;

      if (
        currentIndex !== activeRef.current
      ) {
        activeRef.current = currentIndex;
        setActive(currentIndex);
        onChangeRef.current?.(currentIndex);
      }
    };

    const frame = (now) => {
      raf = 0;

      const currentSettings =
        settingsRef.current;

      const dt = state.last
        ? Math.min(
            (now - state.last) / 1000,
            0.05
          )
        : 1 / 60;

      state.last = now;

      const busy = advance(
        currentSettings,
        dt,
        now
      );

      render(currentSettings, now);

      if (
        busy &&
        visible &&
        !document.hidden
      ) {
        raf = requestAnimationFrame(frame);
      } else {
        state.last = 0;
      }
    };

    const wake = () => {
      if (
        !raf &&
        visible &&
        !document.hidden
      ) {
        raf = requestAnimationFrame(frame);
      }
    };

    wakeRef.current = wake;

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        state.last = 0;
      } else {
        wake();
      }
    };

    const resizeObserver =
      new ResizeObserver(() => {
        measure();
        wake();
      });

    resizeObserver.observe(root);

    const intersectionObserver =
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;

        if (visible) {
          wake();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
          state.last = 0;
        }
      });

    intersectionObserver.observe(root);

    const handleWheel = (event) => {
      const currentSettings =
        settingsRef.current;

      if (!currentSettings.draggable) {
        return;
      }

      const delta =
        Math.abs(event.deltaX) >
        Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (!delta) return;

      event.preventDefault();

      const perPixel =
        180 /
        (Math.PI *
          currentSettings.radius *
          state.fit);

      state.target = null;

      state.angle -=
        delta *
        perPixel *
        (currentSettings.layout.inward
          ? -1
          : 1);

      state.velocity =
        -delta *
        perPixel *
        (currentSettings.layout.inward
          ? -1
          : 1) *
        30;

      state.holdUntil =
        performance.now() + 1600;

      clearTimeout(state.wheelTimer);

      state.wheelTimer = setTimeout(() => {
        if (settingsRef.current.snap) {
          state.target = nearest(
            state.angle +
              state.velocity * 0.12
          );
        }

        wake();
      }, 140);

      wake();
    };

    root.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    measure();
    render(settingsRef.current, performance.now());
    wake();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      clearTimeout(state.wheelTimer);

      root.removeEventListener(
        "wheel",
        handleWheel
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  useLayoutEffect(() => {
    measureRef.current();
    wakeRef.current();
  }, [
    radius,
    cardW,
    cardH,
    tiltValue,
    perspective,
    preset,
    captions,
    count,
  ]);

  useEffect(() => {
    wakeRef.current();
  });

  const focusIndex = useCallback((index) => {
    const state = stateRef.current;
    const currentSettings = settingsRef.current;

    let target =
      -index * currentSettings.step;

    target +=
      360 *
      Math.round(
        (state.angle - target) / 360
      );

    state.target = target;
    state.holdUntil =
      performance.now() + 2800;

    wakeRef.current();
  }, []);

  const stepBy = useCallback((delta) => {
    const state = stateRef.current;
    const currentSettings = settingsRef.current;

    const base =
      state.target ??
      Math.round(
        state.angle / currentSettings.step
      ) * currentSettings.step;

    state.target =
      base -
      delta *
        currentSettings.step *
        (currentSettings.layout.inward
          ? -1
          : 1);

    state.holdUntil =
      performance.now() + 2800;

    wakeRef.current();
  }, []);

  const updatePointer = (event) => {
    const root = rootRef.current;

    if (!root) return;

    const rect =
      root.getBoundingClientRect();

    const pointer =
      stateRef.current.pointer;

    pointer.x = clamp(
      ((event.clientX - rect.left) /
        rect.width) *
        2 -
        1,
      -1,
      1
    );

    pointer.y = clamp(
      ((event.clientY - rect.top) /
        rect.height) *
        2 -
        1,
      -1,
      1
    );
  };

  const handlePointerDown = (event) => {
    const state = stateRef.current;

    state.suppressClick = false;

    if (!draggable || event.button !== 0) {
      return;
    }

    state.press = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: state.angle,
      moved: false,
      origin: 0,
      samples: [
        {
          time: performance.now(),
          angle: state.angle,
        },
      ],
    };
  };

  const handlePointerMove = (event) => {
    const state = stateRef.current;

    if (event.pointerType === "mouse") {
      state.pointer.inside = true;
      updatePointer(event);
    }

    const press = state.press;

    if (
      !press ||
      press.id !== event.pointerId
    ) {
      wakeRef.current();
      return;
    }

    const currentSettings =
      settingsRef.current;

    const delta =
      currentSettings.axis === "x"
        ? event.clientY - press.y
        : event.clientX - press.x;

    const cross =
      currentSettings.axis === "x"
        ? event.clientX - press.x
        : event.clientY - press.y;

    if (!press.moved) {
      if (Math.abs(delta) < DRAG_THRESHOLD) {
        return;
      }

      if (
        Math.abs(cross) >
          Math.abs(delta) * 1.2 &&
        event.pointerType !== "mouse"
      ) {
        state.press = null;
        return;
      }

      press.moved = true;
      press.origin = delta;

      state.drag = true;
      state.target = null;
      state.velocity = 0;

      setDragging(true);

      try {
        rootRef.current?.setPointerCapture(
          event.pointerId
        );
      } catch {
        // Pointer capture is not available in every browser.
      }
    }

    const perPixel =
      180 /
      (Math.PI *
        currentSettings.radius *
        state.fit);

    state.angle =
      press.angle +
      (delta - press.origin) *
        perPixel *
        (currentSettings.layout.inward
          ? -1
          : 1);

    const now = performance.now();

    press.samples.push({
      time: now,
      angle: state.angle,
    });

    while (
      press.samples.length > 2 &&
      now - press.samples[0].time > 110
    ) {
      press.samples.shift();
    }

    wakeRef.current();
  };

  const releasePointer = (event) => {
    const state = stateRef.current;
    const press = state.press;

    if (
      !press ||
      press.id !== event.pointerId
    ) {
      return;
    }

    state.press = null;

    if (!press.moved) {
      return;
    }

    state.drag = false;
    setDragging(false);
    state.suppressClick = true;

    const currentSettings =
      settingsRef.current;

    const first = press.samples[0];
    const last =
      press.samples[press.samples.length - 1];

    const span =
      (last.time - first.time) / 1000;

    const velocity =
      span > 0.008
        ? clamp(
            (last.angle - first.angle) /
              span,
            -1400,
            1400
          )
        : 0;

    state.velocity = velocity;

    if (Math.abs(velocity) > 60) {
      state.dir = Math.sign(velocity);
    }

    const coasting =
      currentSettings.autoplay === "drift" &&
      !(
        currentSettings.pauseOnHover &&
        state.hover &&
        event.pointerType === "mouse"
      );

    if (currentSettings.snap && !coasting) {
      const tau =
        0.18 +
        currentSettings.momentum * 1.5;

      state.target =
        Math.round(
          (state.angle +
            velocity * tau * 0.55) /
            currentSettings.step
        ) * currentSettings.step;
    }

    wakeRef.current();
  };

  const handlePointerEnter = (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    stateRef.current.hover = true;
    wakeRef.current();
  };

  const handlePointerLeave = (event) => {
    const state = stateRef.current;

    if (event.pointerType === "mouse") {
      state.hover = false;
      state.pointer.inside = false;
    }

    wakeRef.current();
  };

  const handleClick = (event) => {
    const state = stateRef.current;

    if (state.suppressClick) {
      state.suppressClick = false;
      return;
    }

    const card =
      event.target.closest?.(
        "[data-circular-index]"
      );

    if (!card) return;

    const index = Number(
      card.getAttribute("data-circular-index")
    );

    if (focusOnClick) {
      focusIndex(index);
    }

    onItemClick?.(list[index], index);
  };

  const handleKeyDown = (event) => {
    const forward =
      axis === "x"
        ? "ArrowDown"
        : "ArrowRight";

    const backward =
      axis === "x"
        ? "ArrowUp"
        : "ArrowLeft";

    if (event.key === forward) {
      stepBy(1);
    } else if (event.key === backward) {
      stepBy(-1);
    } else if (event.key === "Home") {
      focusIndex(0);
    } else if (event.key === "End") {
      focusIndex(count - 1);
    } else if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      onItemClick?.(
        list[activeRef.current],
        activeRef.current
      );
    } else {
      return;
    }

    event.preventDefault();
  };

  const current = list[active] || list[0];

  const label = current
    ? current.title ||
      current.alt ||
      `Image ${active + 1}`
    : "";

  const renderTile = (
    item,
    tile,
    back
  ) => {
    const strip = back
      ? tile.total - 1 - tile.index
      : tile.index;

    const first = strip === 0;
    const last =
      strip === tile.total - 1;

    const radiusValue =
      "var(--cc-radius)";

    const frameRadius =
      axis === "x"
        ? `${first ? radiusValue : 0} ${
            first ? radiusValue : 0
          } ${last ? radiusValue : 0} ${
            last ? radiusValue : 0
          }`
        : `${first ? radiusValue : 0} ${
            last ? radiusValue : 0
          } ${last ? radiusValue : 0} ${
            first ? radiusValue : 0
          }`;

    const offset = back
      ? along - tile.end
      : tile.start;

    const size = tile.size;

    const box =
      axis === "x"
        ? {
            left: -cardW / 2,
            top: -size / 2,
            width: cardW,
            height: size,
          }
        : {
            left: -size / 2,
            top: -cardH / 2,
            width: size,
            height: cardH,
          };

    const photoStyle =
      axis === "x"
        ? {
            left: 0,
            top: -offset,
            width: cardW,
            height: cardH,
          }
        : {
            left: -offset,
            top: 0,
            width: cardW,
            height: cardH,
          };

    const flip =
      axis === "x"
        ? " rotateX(180deg)"
        : " rotateY(180deg)";

    return (
      <div
        key={`${back ? "back" : "front"}-${tile.index}`}
        className="cc-tile"
        style={{
          ...box,
          transform:
            tile.move + (back ? flip : ""),
        }}
        aria-hidden="true"
      >
        <div
          className="cc-tile-window"
          style={{
            height:
              axis === "x" ? size : cardH,
            borderRadius: frameRadius,
          }}
        >
          <img
            className="cc-tile-image"
            src={item.src}
            alt=""
            draggable={false}
            decoding="async"
            style={photoStyle}
          />

          {back && (
            <div className="cc-inner-shade" />
          )}

          <div className="cc-depth-fade" />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={rootRef}
      className={`circular-carousel ${
        dragging
          ? "circular-carousel--dragging"
          : ""
      } ${className}`.trim()}
      style={{
        ...style,
        "--cc-fade": fadeColor,
        "--cc-radius": `${Math.max(
          0,
          cornerRadius
        )}px`,
        "--cc-inner": (
          1 - clamp(innerShade, 0, 1)
        ).toFixed(3),
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
      data-axis={axis}
      data-shape={shape}
      data-ready={ready ? "true" : "false"}
      data-draggable={draggable ? "true" : "false"}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`circular-carousel__mask circular-carousel__mask--${shape}`}
      >
        <div
          ref={stageRef}
          className="circular-carousel__stage"
        >
          <div
            ref={cameraRef}
            className="circular-carousel__camera"
          >
            <div
              ref={ringRef}
              className="circular-carousel__ring"
            >
              {list.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  ref={(element) => {
                    cardRefs.current[index] =
                      element;
                  }}
                  className="circular-carousel__card"
                  data-circular-index={index}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${item.title || item.alt || `Image ${index + 1}`}, ${index + 1} of ${count}`}
                >
                  {tiles.map((tile) =>
                    renderTile(item, tile, false)
                  )}

                  {layout.backfaces &&
                    tiles.map((tile) =>
                      renderTile(item, tile, true)
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {captions && current && (
        <div className="circular-carousel__caption">
          <span className="circular-carousel__caption-title">
            {current.title || current.alt}

            {current.subtitle && (
              <span className="circular-carousel__caption-subtitle">
                {current.subtitle}
              </span>
            )}
          </span>

          <span className="circular-carousel__counter">
            <Digits value={active + 1} />
            <span className="circular-carousel__counter-separator">
              /
            </span>
            <span>
              {String(count).padStart(2, "0")}
            </span>
          </span>
        </div>
      )}

      <div
        className="circular-carousel__screen-reader"
        aria-live="polite"
        aria-atomic="true"
      >
        {`${label}, ${active + 1} of ${count}`}
      </div>
    </div>
  );
};

export default CircularCarousel;