import { Card, CardContent } from "@/components/ui/card"
import { Upload, Search, Repeat, Award } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "List Your Items",
    description: "Upload photos and details of clothing you no longer wear. Set your preferred swap terms.",
  },
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore thousands of unique items from our community. Filter by size, style, and condition.",
  },
  {
    icon: Repeat,
    title: "Swap or Redeem",
    description: "Request direct swaps with other users or use points to redeem items you love.",
  },
  {
    icon: Award,
    title: "Earn Points",
    description: "Get points for successful swaps and positive reviews. Use them to unlock premium items.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How ReWear Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of fashion lovers in our sustainable clothing exchange. It's simple, fun, and eco-friendly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
