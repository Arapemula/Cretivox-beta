import { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/containerkedua.css";
import GlitchText from "../assetBits/GlitchText";
import ScrollVelocity from "../assetBits/ScrollVelocity";

function Lakban() {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);

  const velocity = 100;

  useEffect(() => {
    const animateText = (element) => {
      gsap.to(element, {
        xPercent: -50,
        repeat: -1,
        ease: "linear",
        duration: 30,
      });
    };

    animateText(text1Ref.current);
    animateText(text2Ref.current);
    animateText(text3Ref.current);
    animateText(text4Ref.current);
  }, []);

  const marqueeText = "TERLALU GANTENG UNTUK DITAMPILKAN SEMUA • ".repeat(10);

  return (
    <>
      <div className="lakban-container position-relative">
        <div className="lakban1">
          <div className="text-scroll" ref={text1Ref}>
            {marqueeText}
          </div>
        </div>
        <div className="lakban2">
          <div className="text-scroll" ref={text2Ref}>
            {marqueeText}
          </div>
        </div>
        <div className="lakban3">
          <div className="text-scroll" ref={text3Ref}>
            {marqueeText}
          </div>
        </div>
        <div className="lakban4">
          <div className="text-scroll" ref={text4Ref}>
            {marqueeText}
          </div>
        </div>
        <ScrollVelocity
          texts={[<span style={{ color: "#fcee09" }}>Aboutme •</span>]}
          velocity={velocity}
          className="custom-scroll-text text-light w-100"
        />
      </div>
    </>
  );
}

export default Lakban;
