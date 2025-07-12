"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Recycle,
  Users,
  Heart,
  ShoppingBag,
  Star,
  CheckCircle,
  ArrowRight,
  Leaf,
  Globe,
  Shield,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: <Recycle className="h-8 w-8 text-green-500" />,
      title: "Sustainable Fashion",
      description:
        "Reduce textile waste by giving your unused clothing a second life through our community exchange.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Community Driven",
      description:
        "Connect with like-minded fashion enthusiasts who share your passion for sustainable style.",
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-purple-500" />,
      title: "Point-Based System",
      description:
        "Earn points by listing items and redeem them for pieces you love. Fair and transparent.",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Safe & Secure",
      description:
        "All listings are moderated and users are verified to ensure a safe trading environment.",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up & Create Profile",
      description:
        "Join our community with a simple email registration and set up your fashion profile.",
    },
    {
      step: "2",
      title: "List Your Items",
      description:
        "Upload photos and details of clothing you no longer wear but are still in good condition.",
    },
    {
      step: "3",
      title: "Browse & Discover",
      description:
        "Explore thousands of unique pieces from other community members.",
    },
    {
      step: "4",
      title: "Swap or Redeem",
      description:
        "Request direct swaps with other users or use earned points to redeem items you love.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Items Exchanged" },
    { number: "5,000+", label: "Active Users" },
    { number: "50,000+", label: "Points Earned" },
    { number: "95%", label: "User Satisfaction" },
  ];

  const benefits = [
    "Save money on new clothes",
    "Discover unique vintage pieces",
    "Reduce your environmental impact",
    "Connect with fashion-forward community",
    "Declutter your wardrobe responsibly",
    "Access designer pieces at fraction of cost",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              About ReWear
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              ReWear is a community-driven platform that transforms the way we
              think about fashion. We believe that every piece of clothing
              deserves a second chance, and every person deserves access to
              sustainable, affordable fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/browse">
                  Start Browsing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/list">List Your Items</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're on a mission to create a more sustainable fashion
                ecosystem where clothing is shared, reused, and loved by
                multiple owners throughout its lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Environmental Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Reducing textile waste and promoting circular fashion to
                    protect our planet.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Global Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Building a worldwide network of conscious consumers and
                    fashion lovers.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality & Trust</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensuring every exchange is safe, fair, and beneficial for
                    all parties involved.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ReWear?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique features designed to make clothing
              exchange simple, safe, and rewarding for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with ReWear is simple. Follow these four easy
              steps to begin your sustainable fashion journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ReWear by the Numbers</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our growing community continues to make a positive impact on both
              fashion and the environment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Benefits of Using ReWear
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of users who are already experiencing the
                advantages of community-based clothing exchange.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your ReWear Journey?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join our community today and discover a new way to love fashion
              while caring for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/browse">Browse Items</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're here to help you make the most of your ReWear experience.
              Reach out to our friendly support team anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
