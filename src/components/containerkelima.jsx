import { useEffect, useRef } from "react";
import gsap from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/containerkelima.css";

function Lakbanbawah() {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);

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

  const marqueeText = "BERBAHAYA ANDA SUDAH TERLALU BAWAH • ".repeat(10);

  return (
    <div className="lakban-container position-relative">
      <div className="lakban5">
        <div className="text-scroll" ref={text1Ref}>
          {marqueeText}
        </div>
      </div>
      <div className="lakban6">
        <div className="text-scroll" ref={text2Ref}>
          {marqueeText}
        </div>
      </div>
      <div className="lakban7">
        <div className="text-scroll" ref={text3Ref}>
          {marqueeText}
        </div>
      </div>
      <div className="lakban8">
        <div className="text-scroll" ref={text4Ref}>
          {marqueeText}
        </div>
      </div>
    </div>
  );
}

export default Lakbanbawah;
