import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import ProductViewer from "./components/ProductViewer"

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