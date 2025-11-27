import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <main className="w-full bg-[#0a0a0a] min-h-screen">
      {/* Navbar Hero'nun içinde gibi görünür çünkü absolute pozisyonda */}
      <Navbar />
      <Hero />

      {/* Diğer sectionlar buraya gelecek... */}
      {/* <About /> */}
      {/* <Gallery /> */}
    </main>
  );
}

export default App;
