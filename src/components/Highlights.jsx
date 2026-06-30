import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Highlights = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        gsap.to(['.left-column', '.right-column'], {
            scrollTrigger: {
                trigger: "#highlights",
                start: isMobile ? "bottom bottom" : "top top",
            },
            y: 0,
            opacity: 1,
            stagger: 0.5,
            duration: 1,
            ease: "power1.inOut",
        })
    })

  return (
    <section id="highlights">
      <h2>Nunca houve tempo melhor para um upgrade.</h2>
      <h3>Aqui é o que você encontra no novo MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Laptop" />
            <p>Voe por tarefas exigentes até 9,8x mais rápido.</p>
          </div>
          <div>
            <img src="/sun.png" alt="Sun" />
            <p>
              Uma impressionante <br />
              tela Liquid <br />
              Retina XDR.
            </p>
          </div>
        </div>

        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              Feito para <br />
              <span>Apple Intelligence</span>.
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" />
            <p>
              Até 
              <span className="green-gradient">{" "}14 horas a mais{" "}</span> 
              de bateria. 
              <span className="text-dark-100"> (Até 24 horas no total.) </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
