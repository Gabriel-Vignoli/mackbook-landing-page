import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import ProductViewer from "./components/ProductViewer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Showcase from "./components/Showcase"
import Performance from "./components/Performance"
import Features from "./components/Features"

gsap.registerPlugin(ScrollTrigger)

const App = () => {
    return (
        <main>
            <NavBar></NavBar>
            <Hero></Hero>
            <ProductViewer></ProductViewer>
            <Showcase></Showcase>
            <Performance></Performance>
            <Features></Features>
        </main>
    )
}

export default App