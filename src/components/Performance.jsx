import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { performanceImages, performanceImgPositions } from "../constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const POSITION_KEYS = ["left", "right", "bottom"];

// Turns { left: 5, bottom: 20, transform: "..." } into { left: "5%", bottom: "20%", transform: "..." }
const buildTargetVars = (item) => {
  const vars = {};

  POSITION_KEYS.forEach((key) => {
    if (typeof item[key] === "number") vars[key] = `${item[key]}%`;
  });

  if (item.transform) vars.transform = item.transform;

  return vars;
};

const Performance = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { motionOk, isDesktop } = context.conditions;

          // Users who prefer reduced motion get the static layout
          if (!motionOk) return;

          // Text fade-in (all screen sizes)
          gsap.fromTo(
            ".content p",
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              ease: "power1.out",
              scrollTrigger: {
                trigger: ".content p",
                start: "top bottom",
                end: "top center",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          // Image movement (desktop only)
          if (!isDesktop) return;

          const timeline = gsap.timeline({
            defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          performanceImgPositions.forEach((item) => {
            // p5 stays centered by CSS
            if (item.id === "p5") return;

            const vars = buildTargetVars(item);
            if (Object.keys(vars).length === 0) return;

            timeline.to(`.${item.id}`, vars, 0);
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Desempenho gráfico de outro nível. Hora de jogar.</h2>

      <div className="wrapper">
        {performanceImages.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            className={image.id}
            alt={image.alt || `Imagem de desempenho ${index + 1}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <div className="content">
        <p>
          Execute fluxos de trabalho com uso intenso de gráficos com uma
          capacidade de resposta que acompanha a sua imaginação. A família de
          chips M4 conta com uma GPU com mecanismo de ray tracing acelerado por
          hardware de segunda geração, que renderiza imagens mais rápido, para
          que{" "}
          <span className="text-white">
            os jogos fiquem mais imersivos e realistas do que nunca.
          </span>{" "}
          E o Dynamic Caching otimiza a memória rápida do chip para aumentar
          drasticamente a utilização média da GPU, trazendo um grande ganho de
          desempenho para os apps profissionais e jogos mais exigentes.
        </p>
      </div>
    </section>
  );
};

export default Performance;