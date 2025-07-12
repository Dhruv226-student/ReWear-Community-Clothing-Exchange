import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Recycle, Leaf } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Members",
    description: "Growing community of sustainable fashion enthusiasts",
  },
  {
    icon: Recycle,
    value: "50,000+",
    label: "Items Exchanged",
    description: "Clothing pieces given new life through swaps",
  },
  {
    icon: Leaf,
    value: "2M+",
    label: "Pounds Diverted",
    description: "Textile waste prevented from landfills",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Satisfaction Rate",
    description: "Users love their ReWear experience",
  },
]

export function Stats() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Making a Real Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Together, we're building a more sustainable future for fashion. See how our community is making a
            difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-1">{stat.value}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
