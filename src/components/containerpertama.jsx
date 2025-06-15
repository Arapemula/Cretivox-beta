import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/containerpertama.css";
import VariableProximity from "../assetBits/VariableProximity";
import { TypeAnimation } from "react-type-animation";

function Main() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  return (
    <div id="containerpertama" className="main row mx-3">
      <div className="col-6">
        <div ref={containerRef} className="proximity-wrapper">
          <div>
            <VariableProximity
              label="Naufal"
              className="variable-proximity-demo"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={200}
              falloff="linear"
            />
          </div>
          <div>
            <VariableProximity
              label="Arhab"
              className="variable-proximity-demo"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={200}
              falloff="linear"
            />
          </div>
        </div>

        <div className="hero-subtitle mt-4">
          &nbsp;
          <TypeAnimation
            sequence={[
              "Prompt Engineer",
              1500,
              "Graphic Designer",
              1500,
              "UI/UX Designer",
              1500,
              "Web Dev",
              1500,
              "Student",
              1500,
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
            className="front-yellow"
          />
        </div>
      </div>

      <div className="col-6 position-relative">
        <div className="kompas-wrapper">
          <img className="kompas" src="backgroundpoto.png" alt="kompas" />
        </div>
        <img
          className={isHovered ? "cartun" : "arhab"}
          src={isHovered ? "cartun.png" : "arhab.png"}
          alt="arhab"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </div>
  );
}

export default Main;
