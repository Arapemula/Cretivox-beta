import { useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../css/containerketiga.css";
import ScrollVelocity from "../assetBits/ScrollVelocity";

gsap.registerPlugin(ScrollTrigger);

function Aboutme() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const floatRefs = useRef([]);
  const velocity = -100;

  const floatText = [
    "Gue bukan cuma ngoding. Gue berevolusi bareng AI.",
    "Kami kerja bareng, satu irama, satu tujuan.",
    "Hasilnya? Progres gue 2x lebih cepat.",
    "Sementara yang lain masih debat soal AI = skill issue...",
    "Gue udah ada jauh di depan, bareng masa depan itu sendiri.",
  ];

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    let textTriggersSet = false;

    const setupTextScroll = () => {
      if (textTriggersSet) return; // hanya sekali
      textTriggersSet = true;

      floatRefs.current.forEach((el, index) => {
        gsap.set(el, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: el.parentNode,
          start: "top center",
          end: "bottom center",
          scrub: false,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            gsap.to(el, {
              opacity: 0,
              y: -40,
              duration: 1,
              ease: "power2.in",
            });
          },
          onEnterBack: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(el, {
              opacity: 0,
              y: 40,
              duration: 1,
              ease: "power2.in",
            });
          },
        });
      });
    };

    const onLoadedMetadata = () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2000",
        scrub: true,
        pin: true,
        markers: false,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          video.currentTime = video.duration * scrollProgress;
        },
        onEnter: () => {
          setupTextScroll(); // baru aktifkan teks saat video masuk
        },
        onEnterBack: () => {
          setupTextScroll(); // kalau scroll balik ke atas
        },
      });
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div id="containerketiga">
        <section ref={sectionRef} className="gif-container">
          <ScrollVelocity
            texts={[<span style={{ color: "#2e2e2e " }}>Aboutme •</span>]}
            velocity={velocity}
            className="custom-scroll-text scrollvelocity-top text-light w-100"
          />

          <video
            ref={videoRef}
            src="robot.mp4"
            muted
            playsInline
            className="video-element"
          ></video>

          <div className="float-text-container">
            {floatText.map((text, i) => {
              const isLeft = i % 2 !== 0;
              return (
                <div key={i} className="float-text-section">
                  <div
                    ref={(el) => (floatRefs.current[i] = el)}
                    className={`float-text source-code-green ${
                      isLeft ? "float-text-left" : "float-text-right"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default Aboutme;
