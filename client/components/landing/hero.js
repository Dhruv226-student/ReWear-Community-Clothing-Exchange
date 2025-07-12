import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, Users, Leaf } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Refresh Your Wardrobe <span className="text-green-600">Sustainably</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Join our community clothing exchange. Swap unused items, earn points, and discover unique pieces while
                reducing textile waste.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Swapping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/browse">Browse Items</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Items Swapped</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold">2M+</div>
                <div className="text-sm text-muted-foreground">Pounds Saved</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 p-8">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-full h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded mb-2" />
                    <div className="text-sm font-medium">Vintage Jacket</div>
                    <div className="text-xs text-muted-foreground">25 points</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-full h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded mb-2" />
                    <div className="text-sm font-medium">Designer Jeans</div>
                    <div className="text-xs text-muted-foreground">40 points</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-full h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded mb-2" />
                    <div className="text-sm font-medium">Summer Dress</div>
                    <div className="text-xs text-muted-foreground">30 points</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-full h-24 bg-gradient-to-br from-green-200 to-teal-200 rounded mb-2" />
                    <div className="text-sm font-medium">Cozy Sweater</div>
                    <div className="text-xs text-muted-foreground">35 points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
