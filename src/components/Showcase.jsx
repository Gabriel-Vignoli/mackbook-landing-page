import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Showcase = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Only animate on desktop. matchMedia cleans up the pin when the
  // breakpoint changes, which useMediaQuery + a conditional didn't do.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          })
          .to(".mask img", { scale: 1.1 })
          .fromTo(
            ".content",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "power1.in" },
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Play only while visible. A looping video that keeps decoding offscreen
  // (especially under a pinned ScrollTrigger) is a common cause of stutter and crashes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="showcase" ref={sectionRef}>
      <div className="media">
        <video
          ref={videoRef}
          src="/videos/game-optimized.mp4"
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedMetadata={() => ScrollTrigger.refresh()}
        />
        <div className="mask">
          <img src="/mask-logo.svg" alt="" aria-hidden="true" />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Chip Foguete</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Conheça o{" "}
                <span className="text-white">
                  M4, a nova geração do Apple silicon
                </span>
                . O M4 impulsiona
              </p>
              <p>
                Ele ativa o Apple Intelligence no iPad Pro, para que você possa
                escrever, criar e realizar mais com facilidade. Tudo em um
                design incrivelmente fino, leve e poderoso.
              </p>
              <p>
                Um motor de display totalmente novo entrega precisão, precisão
                de cores e brilho impressionantes. E uma GPU de nova geração com
                ray tracing acelerado por hardware traz gráficos de nível
                console para as suas mãos.
              </p>
              <p className="text-primary">
                Saiba mais sobre o Apple Intelligence
              </p>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Até</p>
              <h3>4x mais rápido</h3>
              <p>desempenho de renderização pro que o M2</p>
            </div>
            <div className="space-y-2">
              <p>Até</p>
              <h3>1,5x mais rápido</h3>
              <p>desempenho de CPU que o M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
