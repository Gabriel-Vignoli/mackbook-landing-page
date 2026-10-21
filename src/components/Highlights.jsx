import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Highlights = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          isDesktop: "(min-width: 1025px)",
        },
        (context) => {
          const { motionOk, isDesktop } = context.conditions;

          // Reduced motion: leave both columns in their final, visible state
          if (!motionOk) return;

          gsap.fromTo(
            [".left-column", ".right-column"],
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.5,
              duration: 1,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: isDesktop ? "top center" : "bottom bottom",
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="highlights" ref={sectionRef}>
      <h2>Nunca houve um momento melhor para fazer o upgrade.</h2>
      <h3>Veja o que você ganha com o novo MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="" aria-hidden="true" />
            <p>Execute tarefas exigentes até 9,8x mais rápido.</p>
          </div>
          <div>
            <img src="/sun.png" alt="" aria-hidden="true" />
            <p>
              Uma deslumbrante <br />
              tela Liquid Retina XDR.
            </p>
          </div>
        </div>

        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="" aria-hidden="true" />
            <p>
              Feito para o <br />
              <span>Apple Intelligence.</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="" aria-hidden="true" />
            <p>
              Até <span className="green-gradient">14 horas a mais</span> de
              bateria.{" "}
              <span className="text-dark-100">(Até 24 horas no total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;