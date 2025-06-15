import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { gsap } from "gsap";
import "../css/containerkeenam.css";

const glowStyles = {
  button: {
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "8px 20px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
    animation: "glow 1.5s ease-in-out infinite alternate",
    background: "transparent",
    color: "#fff",
    textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073",
    boxShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073",
  },
};

const Photobooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [showPhotobooth, setShowPhotobooth] = useState(false);

  useEffect(() => {
    if (showPhotobooth) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
    } else if (videoRef.current?.srcObject) {
      // Stop camera when hiding photobooth
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  }, [showPhotobooth]);

  const takePhoto = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 400, 300);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setPhotos([dataUrl, ...photos]);

    // Animasi lemparan
    gsap.fromTo(
      ".photo-stack .polaroid:first-child",
      { y: -100, opacity: 0, rotate: gsap.utils.random(-20, 20) },
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  };

  return (
    <div className="container py-5" style={{ color: "#fff" }}>
      <div className="text-center mb-4">
        <button
          className="btn glow-button"
          onClick={() => setShowPhotobooth(!showPhotobooth)}
        >
          {showPhotobooth ? "Close" : "Make me happy!"}
        </button>
      </div>

      {showPhotobooth && (
        <>
          <div className="d-flex justify-content-center mb-5">
            <div className="text-center">
              <div className="p-4 rounded d-flex align-items-center gap-4">
                <div className="video-frame">
                  <video
                    ref={videoRef}
                    autoPlay
                    width="400"
                    height="300"
                    className="rounded shadow"
                  />
                  <img src="/frame.png" alt="frame" className="frame-overlay" />
                  <canvas
                    ref={canvasRef}
                    width="400"
                    height="300"
                    style={{ display: "none" }}
                  />
                </div>
                <button
                  onClick={takePhoto}
                  className="btn btn-light tekst-dark"
                >
                  Ambil Foto
                </button>
              </div>
            </div>
          </div>

          <div className="photo-stack d-flex flex-wrap justify-content-center gap-4">
            {photos.map((src, idx) => (
              <div
                key={idx}
                className="polaroid shadow"
                style={{
                  transform: `rotate(${gsap.utils.random(-8, 8)}deg)`,
                }}
              >
                <img
                  src={src}
                  alt={`photo-${idx}`}
                  className="polaroid-image"
                />
                <div className="polaroid-label">📸 Japrut Photobooth</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Photobooth;
