import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React doesn't always render the `muted` attribute in the DOM,
    // and browsers block autoplay on unmuted videos.
    video.muted = true;
  }, []);

  return (
    <section id="hero" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">
          <span className="sr-only">MacBook Pro</span>
          <img
            src="/title.png"
            alt=""
            aria-hidden="true"
            width="600"
            height="120"
          />
        </h1>
      </div>

      <video
        ref={videoRef}
        src="/videos/hero-fast.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <a href="#buy" className="hero-cta">
        Comprar
      </a>

      <p>A partir de R$8.999 ou R$749/mês por 12 meses</p>
    </section>
  );
};

export default Hero;