import clsx from "clsx";
import useMacbookStore from "..";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLighs";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMacbookStore();

  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <section id="product-viewer">
      <h2>Veja mais de perto</h2>
      <div className="controls">
        <p className="info">
          MacBook Pro {scale} em {color}
        </p>

        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              className={clsx(
                "bg-neutral-300",
                color === "#abd5bd" && "active",
              )}
              onClick={() => setColor("#abd5bd")}
            ></div>
            <div
              className={clsx(
                "bg-neutral-900",
                color === "#2e2c2e" && "active",
              )}
              onClick={() => setColor("#2e2c2e")}
            ></div>
          </div>

          <div className="size-control">
            <div
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
              onClick={() => setScale(0.06)}
            >
              <p>14</p>
            </div>
            <div
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
              onClick={() => setScale(0.08)}
            >
              <p>16</p>
            </div>
          </div>
        </div>
      </div>

      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
      >
        <StudioLights></StudioLights>

              <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile}></ModelSwitcher>
      </Canvas>
    </section>
  );
};

export default ProductViewer;
