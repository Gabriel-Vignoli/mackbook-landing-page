import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

import MacbookModel from "./models/Macbook.jsx";
import useMacbookStore from "../store";
import { features, featureSequence } from "../constants";
import StudioLights from "./three/StudioLighs.jsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Runs inside <Canvas>: only the 3D side (model + rotation) lives here.
const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html center>
            <p className="text-white text-3xl uppercase">Carregando...</p>
          </Html>
        }
      >
        <MacbookModel
          scale={isMobile ? 0.05 : 0.08}
          position={[0, -1, 0]}
        />
      </Suspense>
    </group>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const setTexture = useMacbookStore((state) => state.setTexture);

  // Warm the browser cache for every feature video, and release them on unmount.
  useEffect(() => {
    const videos = featureSequence.map(({ videoPath }) => {
      const video = document.createElement("video");

      Object.assign(video, {
        src: videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      video.load();
      return video;
    });

    return () => {
      videos.forEach((video) => {
        video.removeAttribute("src");
        video.load();
      });
    };
  }, []);

  // DOM side: swap the screen texture and reveal each text box in sequence.
  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#f-canvas",
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });

      featureSequence.forEach(({ videoPath }, index) => {
        timeline
          .call(() => setTexture(videoPath))
          .fromTo(
            `.box${index + 1}`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, delay: index === 0 ? 1 : 0 },
          );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="features" ref={sectionRef}>
      <h2>Veja tudo sob uma nova luz.</h2>

      <Canvas id="f-canvas" dpr={[1, 2]}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt="" aria-hidden="true" />
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;