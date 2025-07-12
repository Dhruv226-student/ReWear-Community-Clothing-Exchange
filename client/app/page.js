import { Hero } from "@/components/landing/hero"
import { FeaturedItems } from "@/components/landing/featured-items"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Stats } from "@/components/landing/stats"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedItems />
        <HowItWorks />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}
