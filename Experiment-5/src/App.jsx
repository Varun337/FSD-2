import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navigation from "./components/Navigation"
import "./App.css"

const Home = lazy(() => import("./components/Home"))
const About = lazy(() => import("./components/About"))
const Contact = lazy(() => import("./components/Contact"))

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <div className="app-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>

    </BrowserRouter>
  )
}

export default App