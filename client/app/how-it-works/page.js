"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Upload,
  Search,
  ArrowRightLeft,
  Star,
  CheckCircle,
  ArrowRight,
  Camera,
  MessageSquare,
  CreditCard,
  Shield,
  Users,
  Trophy,
  Heart,
  Package,
  Clock,
  RefreshCw,
  Zap,
  Gift,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const mainSteps = [
    {
      step: "1",
      title: "Create Your Account",
      description:
        "Sign up with your email and create your ReWear profile to join our sustainable fashion community.",
      icon: <UserPlus className="h-12 w-12 text-blue-500" />,
      details: [
        "Quick email registration",
        "Set up your style preferences",
        "Add your location and size info",
        "Complete profile verification",
      ],
    },
    {
      step: "2",
      title: "List Your Items",
      description:
        "Upload photos and details of clothing you no longer wear but are still in great condition.",
      icon: <Upload className="h-12 w-12 text-green-500" />,
      details: [
        "Take high-quality photos",
        "Add detailed descriptions",
        "Set category and condition",
        "Earn points for each listing",
      ],
    },
    {
      step: "3",
      title: "Browse & Discover",
      description:
        "Explore thousands of unique pieces from other community members and find your next favorite outfit.",
      icon: <Search className="h-12 w-12 text-purple-500" />,
      details: [
        "Filter by size, style, and condition",
        "Save items to your wishlist",
        "Follow your favorite users",
        "Get notified of new listings",
      ],
    },
    {
      step: "4",
      title: "Swap or Redeem",
      description:
        "Request direct swaps with other users or use your earned points to redeem items you love.",
      icon: <ArrowRightLeft className="h-12 w-12 text-orange-500" />,
      details: [
        "Send swap requests",
        "Negotiate terms with users",
        "Use points for instant redemption",
        "Track your exchange history",
      ],
    },
  ];

  const swapProcess = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      title: "Send Request",
      description: "Message the item owner with your swap proposal",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "Get Approved",
      description: "Wait for the owner to accept your swap request",
    },
    {
      icon: <Package className="h-6 w-6 text-purple-500" />,
      title: "Exchange Details",
      description: "Share shipping information and arrange the swap",
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "Complete & Review",
      description: "Confirm receipt and leave feedback for each other",
    },
  ];

  const pointsSystem = [
    {
      action: "List an item",
      points: "+10 points",
      icon: <Upload className="h-5 w-5 text-green-500" />,
    },
    {
      action: "Complete a swap",
      points: "+5 points",
      icon: <ArrowRightLeft className="h-5 w-5 text-blue-500" />,
    },
    {
      action: "Get a 5-star review",
      points: "+3 points",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    },
    {
      action: "Refer a friend",
      points: "+20 points",
      icon: <Users className="h-5 w-5 text-purple-500" />,
    },
  ];

  const tips = [
    {
      icon: <Camera className="h-8 w-8 text-blue-500" />,
      title: "Take Great Photos",
      description:
        "Use natural lighting and show multiple angles. Clear, high-quality photos get more interest!",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Be Honest About Condition",
      description:
        "Accurately describe any wear, stains, or damage. Honest descriptions build trust and prevent disputes.",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-purple-500" />,
      title: "Stay Active",
      description:
        "Regular activity increases your visibility. List new items and engage with the community frequently.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Build Relationships",
      description:
        "Connect with users who share your style. Building relationships leads to better swap opportunities.",
    },
  ];

  const safetyFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Verified Users",
      description: "All users go through email verification and profile review",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      title: "Moderated Listings",
      description: "Our team reviews all listings before they go live",
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "Review System",
      description: "Rate and review other users to build community trust",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      title: "Secure Messaging",
      description: "All communications happen through our secure platform",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                How ReWear Works
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover how easy it is to join our sustainable fashion
                community, exchange clothes, and earn points while helping the
                environment.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Process Steps */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple 4-Step Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting started with ReWear is straightforward. Follow these
                steps to begin your sustainable fashion journey.
              </p>
            </div>

            <div className="space-y-12">
              {mainSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8`}
                >
                  <div className="flex-1">
                    <Card className="p-8 h-full">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                            {step.step}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-6 text-lg">
                          {step.description}
                        </p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-gradient-to-br from-muted/50 to-muted p-12 rounded-2xl">
                      {step.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Swap Process Detail */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Swap Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here's exactly what happens when you request a swap with another
                user.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {swapProcess.map((step, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="bg-muted p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Points System */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Points System</h2>
                <p className="text-lg text-muted-foreground">
                  Earn points for being an active community member and redeem
                  them for items you love.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {pointsSystem.map((item, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="font-medium">{item.action}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {item.points}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full">
                      <Gift className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Redeem Your Points</h3>
                      <p className="text-sm text-muted-foreground">
                        Use your earned points to get items instantly without
                        waiting for swap approval. Most items cost between
                        50-200 points depending on their value.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Tips for Success</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow these expert tips to maximize your success on ReWear and
                build a great reputation in the community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tips.map((tip, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">{tip.icon}</div>
                      <div>
                        <h3 className="font-semibold mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety & Trust */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Safety & Trust</h2>
                <p className="text-lg text-muted-foreground">
                  We've built multiple layers of protection to ensure every
                  exchange is safe and secure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {safetyFeatures.map((feature, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-2 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-blue-900">
                        Community Guidelines
                      </h3>
                      <p className="text-sm text-blue-700">
                        All users must follow our community guidelines to
                        maintain a positive, respectful environment for
                        everyone. Violations may result in account suspension.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Quick Questions</h2>
                <p className="text-lg text-muted-foreground">
                  Common questions about how ReWear works.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <h3 className="font-semibold mb-2">
                      How long does a swap take?
                    </h3>
                    <p className="text-muted-foreground">
                      Most swaps are completed within 7-14 days, including
                      shipping time. Users typically respond to requests within
                      24-48 hours.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="p-0">
                    <h3 className="font-semibold mb-2">
                      What if I don't like the item I received?
                    </h3>
                    <p className="text-muted-foreground">
                      All items should match their description. If there's a
                      significant discrepancy, contact our support team within
                      48 hours of receiving the item.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="p-0">
                    <h3 className="font-semibold mb-2">
                      How much does shipping cost?
                    </h3>
                    <p className="text-muted-foreground">
                      Shipping costs are typically split between users or
                      determined during the swap negotiation. We recommend using
                      trackable shipping methods.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Swapping?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of users who are already building their sustainable
              wardrobes through ReWear's community exchange platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/browse">Browse Items</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
