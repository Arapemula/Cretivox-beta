import { useState } from "react";
import HorizontalScroll from "../assetBits/HorizontalScroll";
import ScrollFloat from "../assetBits/ScrollFloat";
import ScrollVelocity from "../assetBits/ScrollVelocity";
import "../css/containerkeempat.css";

const songCovers = [
  {
    content: <img src="/covers/song1.jpeg" alt="Song 1" />,
    label: "everything u are",
  },
  {
    content: <img src="/covers/song2.jpeg" alt="Song 2" />,
    label: "about you",
  },
  { content: <img src="/covers/song3.jpeg" alt="Song 3" />, label: "evakuasi" },
  {
    content: <img src="/covers/song4.jpeg" alt="Song 4" />,
    label: "last night on earth",
  },
  {
    content: <img src="/covers/song5.jpeg" alt="Song 5" />,
    label: "lagipula hidup akan berakhir",
  },
];

export default function ContainerKeempat() {
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hoverLabel, setHoverLabel] = useState("");
  const velocity = 100;

  const items = songCovers.map((item) => ({
    content: (
      <div
        onMouseEnter={() => {
          setHovered(true);
          setHoverLabel(item.label);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setHoverLabel("");
        }}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="scroll-item"
      >
        {item.content}
      </div>
    ),
  }));

  return (
    <section className="keempat-section" id="containerkeempat">
      <div className="scrollvelocity-top">
        <ScrollVelocity
          texts={[<span style={{ color: "#2e2e2e" }}>FAV SONG •</span>]}
          velocity={velocity}
          className="custom-scroll-text text-light w-100 scroller"
        />
      </div>

      <div className="scrollvelocity-top" style={{ top: "40px" }}>
        <ScrollVelocity
          texts={[<span style={{ color: "#fcee09" }}>FAV SONG •</span>]}
          velocity={-velocity}
          className="custom-scroll-text text-light w-100 scroller"
        />
      </div>

      <div className="keempat-content">
        <div className="scroll-container">
          <div className="gradient-left" />
          <div className="gradient-right" />
          <HorizontalScroll
            items={items}
            autoplay={true}
            autoplaySpeed={0.5}
            autoplayDirection="left"
            pauseOnHover={true}
          />
          {hovered && (
            <div
              className="hover-label"
              style={{
                left: cursor.x + 20,
                top: cursor.y + 10,
              }}
            >
              {hoverLabel}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
