import AppLayout from "./layouts/AppLayout";
import Hero from "./sections/Hero";
import About from "./sections/About";
import FeaturedWork from "./sections/FeaturedWork";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <AppLayout>
      <Hero />
      <About />
      <Skills />
      <FeaturedWork />
      <Contact />
    </AppLayout>
  );
}
