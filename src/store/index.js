import { create } from "zustand";

const DEFAULT_STATE = {
  color: "#2e2c2e",
  scale: 0.08,
  texture: "/videos/feature-1.mp4",
};

const useMacbookStore = create((set) => ({
  ...DEFAULT_STATE,

  setColor: (color) => set({ color }),
  setScale: (scale) => set({ scale }),
  setTexture: (texture) => set({ texture }),

  reset: () => set(DEFAULT_STATE),
}));

export default useMacbookStore;
