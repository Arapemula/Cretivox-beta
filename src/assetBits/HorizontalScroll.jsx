import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import './HorizontalScroll.css';

gsap.registerPlugin(Observer);

export default function HorizontalScroll({
  height = "200px",
  width = "100%",
  itemMinWidth = 160,
  negativeMargin = "-0.5em",
  items = [],
  autoplay = true,
  autoplaySpeed = 0.5,
  autoplayDirection = "left",
  pauseOnHover = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    // ✅ Clone items secara manual untuk efek loop
    if (container.children.length === items.length) {
      items.forEach((_, i) => {
        const clone = container.children[i].cloneNode(true);
        container.appendChild(clone);
      });
    }

    const children = gsap.utils.toArray(container.children);
    const firstItem = children[0];
    const itemWidth = firstItem.offsetWidth;
    const itemStyle = getComputedStyle(firstItem);
    const marginLeft = parseFloat(itemStyle.marginLeft) || 0;
    const totalWidth = (itemWidth + marginLeft) * children.length;

    const wrapX = gsap.utils.wrap(-totalWidth, totalWidth);

    children.forEach((child, i) => {
      const x = i * (itemWidth + marginLeft);
      gsap.set(child, { x });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onChange: ({ deltaX, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaX : deltaX;
        const distance = isDragging ? d * 5 : d * 10;
        children.forEach(child => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            x: `+=${distance}`,
            modifiers: {
              x: gsap.utils.unitize(wrapX)
            }
          });
        });
      }
    });

    let rafId;
    if (autoplay) {
      const directionFactor = autoplayDirection === "left" ? -1 : 1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        children.forEach((child) => {
          gsap.set(child, {
            x: `+=${speedPerFrame}`,
            modifiers: {
              x: gsap.utils.unitize(wrapX)
            }
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => (rafId = requestAnimationFrame(tick));

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      cancelAnimationFrame(rafId);
    };
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover]);

  return (
    <div className="horizontal-scroll-wrapper" style={{ height, width }}>
      <div className="horizontal-scroll-container" ref={containerRef}>
        {items.map((item, i) => (
          <div className="horizontal-scroll-item" key={i}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
