import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import ProductViewer from "./components/ProductViewer"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

const App = () => {
    return (
        <main>
            <NavBar></NavBar>
            <Hero></Hero>
            <ProductViewer></ProductViewer>
        </main>
    )
}

export default App