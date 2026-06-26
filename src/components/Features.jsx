import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLighs";
import { features, featureSequence } from "../constants";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();

  useEffect(() => {
    featureSequence.forEach((feature) => {
        const v = document.createElement("video");

        Object.assign(v, {
            src: feature.videoPath,
            muted: true,
            playsInline: true,
            preload: "auto",
            crossOrigin: "anonymous",
        })

        v.load()
    })
  }, [])

  useGSAP(() => {
    const modelTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#f-canvas",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
        }
    })

    const timeLine = gsap.timeline({
         scrollTrigger: {
            trigger: "#f-canvas",
            start: "top center",
            end: "bottom top",
            scrub: 1,
    }})

    if(groupRef.current) {
        modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: "power1.inOut" })
    }
  }, []) 

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }>
            <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]}></MacbookModel>
        </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>Veja tudo de uma maneira diferente</h2>

      <Canvas id="f-canvas">
        <StudioLights></StudioLights>
        <ambientLight intensity={0.5} />
        <ModelScroll></ModelScroll>
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div className={clsx("box", `box${index + 1}`, feature.styles)}>
            {feature.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
