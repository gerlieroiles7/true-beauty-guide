'use client';
import Image from "next/image"
import { Shield, Download, Clock, Star, Award, Users, Heart, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect } from 'react';

export default function LandingPage() {
  
 useEffect(() => {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  if (!pixelId) {
    console.warn('[Meta Pixel] - FB Pixel ID is missing');
    return;
  }

  const script = document.createElement('script');
  script.innerHTML =
    "!function(f,b,e,v,n,t,s)" +
    "{if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
    "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
    "n.queue=[];t=b.createElement(e);t.async=!0;" +
    "t.src=v;s=b.getElementsByTagName(e)[0];" +
    "s.parentNode.insertBefore(t,s)}(window, document,'script'," +
    "'https://connect.facebook.net/en_US/fbevents.js');" +
    `fbq('init', '${pixelId}');` +
    "fbq('track', 'PageView');";

  document.head.appendChild(script);
}, []);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    const browserId = crypto.randomUUID();

    if (fbclid) {
      localStorage.setItem('fbclid', fbclid);
    }
    localStorage.setItem('_p', browserId);
  }, []);


 const handleBuyNowClick = async () => {
  const fbclid = localStorage.getItem('fbclid');
  const browserId = localStorage.getItem('_p');

  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fbclid,
        _p: browserId,
        email: "test@example.com", // optional: pre-fill email in Lemon Squeezy
      }),
    });

    const data = await response.json();

    if (data?.checkoutUrl) {
      alert("Redirecting to checkout...");
      window.location.href = data.checkoutUrl; // 🔁 match backend key
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Checkout failed.");
  }
};




  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gold-200 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-3xl font-serif text-charcoal-800 tracking-wide header-3d">The True Beauty Guide</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-rose-100 text-rose-800 border-rose-300 px-4 py-2 shadow-sm">
                <Users className="w-4 h-4 mr-2" />
                2,847+ Happy Customers
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50/30 to-rose-50/30"></div>
        <div className="container mx-auto max-w-7xl relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal-800 leading-tight tracking-tight hero-3d">
                  The Secret to <span className="text-gold-600 italic">Top Shelf</span> Skincare...
                  <br />
                  <span className="text-rose-600">Without the Thousands Wasted on Fancy Packaging & Marketing</span>
                </h1>
                <p className="text-sm md:text-xl text-charcoal-600 leading-relaxed font-light">
                  What if I told you that the $300 luxury moisturizer sitting on department store shelves contains the
                  same active ingredients you can find in your kitchen for under $5?
                </p>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  <strong className="text-charcoal-800">Here's the truth luxury brands don't want you to know:</strong>{" "}
                  The most effective skincare ingredients aren't exotic or expensive. They're sitting in your pantry
                  right now, waiting to transform your skin for pennies on the dollar.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gold-200 shadow-xl tech-card">
                <div className="flex flex-wrap gap-6 text-xs text-charcoal-600">
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-gold-600" />
                    <span className="font-medium">Instant Digital Download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gold-600" />
                    <span className="font-medium">80-Page Comprehensive Guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-gold-600" />
                    <span className="font-medium">Bonus Recipe Cards Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold-600" />
                    <span className="font-medium">30-Day Money-Back Promise</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-rose-400 tech-button"
                  id="buy-now-btn"
                  onClick={handleBuyNowClick}
                >
                  Get Your Beauty Secrets Now - Only $88
                </Button>
                <div className="text-center md:text-left">
                  <p className="text-xs text-charcoal-500 mb-2">
                    ✨ Instant access • No subscriptions • One-time investment • 30-day guarantee
                  </p>
                  <p className="text-xs text-charcoal-400 italic">
                    Join 2,847+ women who've discovered luxury skincare secrets for less than the cost of a single
                    department store serum
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-200/50 to-rose-200/50 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-white via-cream-50 to-gold-50 rounded-3xl p-8 shadow-2xl border border-gold-200 tech-card-3d">
                <Image
                  src="/placeholder.svg?height=700&width=600"
                  alt="The True Beauty Guide - Luxury DIY Skincare Secrets"
                  width={600}
                  height={700}
                  className="w-full h-auto rounded-2xl shadow-xl border border-gold-100"
                />
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl border-2 border-gold-400 tech-badge">
                  <span className="text-lg">Only $88</span>
                  <div className="text-xs opacity-90">Worth $2,500+</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-lg tech-badge">
                  <Heart className="w-4 h-4 inline mr-1" />
                  2,847+ Love This
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-20 bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-gold-300 section-header-3d">
              The $2.7 Billion Beauty Industry Secret They Don't Want You to Know
            </h2>
            <p className="text-sm text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every month, you walk into Sephora, Ulta, or browse online, hoping this time will be different. This time,
              you'll find that miracle product that finally gives you the glowing, youthful skin you deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white tech-card-dark">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-rose-400 mb-4 stat-3d">$127</div>
                <p className="text-lg font-semibold mb-3">Average Monthly Skincare Spending</p>
                <p className="text-gray-300 text-xs">That's $1,524 per year on products that often disappoint</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white tech-card-dark">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-gold-400 mb-4 stat-3d">73%</div>
                <p className="text-lg font-semibold mb-3">Of Women Are Unsatisfied</p>
                <p className="text-gray-300 text-xs">With their current skincare routine's results</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white tech-card-dark">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-rose-400 mb-4 stat-3d">89%</div>
                <p className="text-lg font-semibold mb-3">Markup on Luxury Skincare</p>
                <p className="text-gray-300 text-xs">You're paying for packaging and marketing, not ingredients</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-rose-900/50 to-gold-900/50 rounded-3xl p-12 border border-gold-500/30 tech-card-3d">
            <h3 className="text-3xl font-serif text-gold-300 mb-6 text-center subsection-header-3d">Sound Familiar?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-200 text-xs">
                    You've spent hundreds (maybe thousands) on skincare products that promised the world but delivered
                    disappointment
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-200 text-xs">
                    Your bathroom cabinet is a graveyard of half-used serums, creams, and treatments that didn't work
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-rose-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-200 text-xs">
                    You feel guilty every time you buy another expensive product, knowing you're probably wasting money
                    again
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-200 text-xs">
                    You're tired of reading ingredient lists that look like chemistry experiments
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-200 text-xs">
                    You want beautiful skin but refuse to go into debt for your skincare routine
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-200 text-xs">
                    Deep down, you suspect there has to be a better, more affordable way
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-cream-50 to-rose-50 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] opacity-5"></div>
        <div className="container mx-auto max-w-4xl relative">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-gold-200 relative tech-card-3d">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-500 to-gold-500 text-white px-8 py-3 rounded-2xl font-serif text-lg shadow-lg tech-badge">
              <Heart className="w-5 h-5 inline mr-2" />A Personal Letter to You
            </div>

            <div className="mt-8 space-y-6 text-charcoal-700 leading-relaxed">
              <p className="text-xl font-serif text-charcoal-800 italic text-center letter-header-3d">
                "Dear Beautiful Soul,"
              </p>

              <p className="text-sm">
                I see you. I see you standing in the skincare aisle, overwhelmed by choices, reading labels, calculating
                costs in your head. I see the hope in your eyes when you pick up that new serum, and I see the
                disappointment when it doesn't deliver the transformation you were promised.
              </p>

              <p className="text-sm">
                <strong>You deserve better.</strong> You deserve to feel confident in your own skin without having to
                choose between beautiful skin and financial security. You deserve to know the secrets that luxury brands
                have been keeping from you for decades.
              </p>

              <div className="bg-gradient-to-r from-gold-50 to-rose-50 rounded-2xl p-8 border-l-4 border-gold-400 my-8 tech-card">
                <p className="text-sm italic text-charcoal-800">
                  "What if I told you that the most expensive face cream at Nordstrom contains the same active
                  ingredients as a recipe you can make in your kitchen for under $3? What if the secret to radiant skin
                  isn't locked away in some Swiss laboratory, but sitting in your pantry right now?"
                </p>
              </div>

              <p className="text-sm">
                For 15 years, I've worked behind the scenes in the beauty industry. I've seen the markup sheets. I've
                watched companies take 50-cent ingredients and sell them to you for $150. I've seen the marketing
                meetings where they decide how to make you feel inadequate so you'll buy more.
              </p>

              <p className="text-sm">
                <strong>Enough is enough.</strong>
              </p>

              <p className="text-sm">
                You are not a walking credit card. You are a beautiful, intelligent woman who deserves to know the
                truth. You deserve to have glowing, healthy skin without sacrificing your financial peace of mind. You
                deserve to feel empowered, not exploited.
              </p>

              <p className="text-sm">
                This guide isn't just about skincare recipes. It's about reclaiming your power. It's about saying "no"
                to an industry that profits from your insecurities and "yes" to a more authentic, affordable way to care
                for yourself.
              </p>

              <p className="text-sm">
                <strong>You are worth it. Your skin is worth it. Your financial freedom is worth it.</strong>
              </p>

              <p className="text-sm">
                And today, for less than the cost of a single department store moisturizer, you can have it all.
              </p>

              <div className="text-center mt-8">
                <p className="text-lg font-serif text-charcoal-800 italic">With love and light,</p>
                <div className="mt-4">
                  <Image
                    src="/placeholder.svg?height=80&width=200"
                    alt="Jessica Lee Signature"
                    width={200}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm font-semibold text-charcoal-800 mt-2">Jessica Lee</p>
                <p className="text-xs text-charcoal-600">Certified Holistic Aesthetician & Your Beauty Advocate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-6 py-3 rounded-2xl text-xs font-medium border border-gold-200 mb-6 tech-badge">
              <Award className="w-5 h-5" />
              Trusted by 2,847+ Women Worldwide
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal-800 mb-6 section-header-3d">
              Real Women, Real Results, Real Savings
            </h2>
            <div className="flex justify-center items-center gap-3 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-lg text-charcoal-600 font-semibold">4.9/5 from 2,847 customers</span>
            </div>
            <p className="text-sm text-charcoal-600 max-w-3xl mx-auto">
              These women were just like you - tired of overspending on skincare that under-delivered. Now they're
              saving hundreds while achieving the best skin of their lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-charcoal-700 mb-6 italic text-sm leading-relaxed">
                  "I was spending $300+ monthly at Sephora. Now I make better products at home for under $20/month. My
                  skin has never looked better, and I've saved over $2,000 this year alone!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full flex items-center justify-center">
                    <span className="text-rose-800 font-bold text-lg">M</span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal-800 text-sm">Maria Rodriguez, 34</p>
                    <p className="text-xs text-charcoal-500">Marketing Manager & Mom of 2</p>
                    <p className="text-xs text-gold-600 font-semibold">SAVED: $2,000+ THIS YEAR</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-charcoal-700 mb-6 italic text-sm leading-relaxed">
                  "At 28, I was already spending like I had a trust fund on skincare. These DIY recipes work better than
                  my $150 La Mer cream. My friends keep asking what I'm using!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-200 to-gold-300 rounded-full flex items-center justify-center">
                    <span className="text-gold-800 font-bold text-lg">S</span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal-800 text-sm">Sarah Chen, 28</p>
                    <p className="text-xs text-charcoal-500">Software Engineer</p>
                    <p className="text-xs text-gold-600 font-semibold">SAVED: $1,800+ THIS YEAR</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-charcoal-700 mb-6 italic text-sm leading-relaxed">
                  "At 58, I thought great skin was only for the wealthy. These natural recipes proved me wrong! I look
                  10 years younger and my retirement fund is intact."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center">
                    <span className="text-purple-800 font-bold text-lg">L</span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal-800 text-sm">Linda Thompson, 58</p>
                    <p className="text-xs text-charcoal-500">Retired Teacher</p>
                    <p className="text-xs text-gold-600 font-semibold">SAVED: $1,200+ THIS YEAR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Before/After Style Results */}
          <div className="bg-gradient-to-r from-gold-50 to-rose-50 rounded-3xl p-12 border border-gold-200 tech-card-3d">
            <h3 className="text-3xl font-serif text-charcoal-800 text-center mb-12 subsection-header-3d">
              The Transformation Speaks for Itself
            </h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200 tech-card">
                  <h4 className="text-lg font-bold text-red-700 mb-4">BEFORE: The Expensive Skincare Trap</h4>
                  <ul className="space-y-3 text-charcoal-700">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="text-xs">Spending $200-400+ monthly on skincare</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="text-xs">Bathroom full of half-used products</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="text-xs">Skin still not where you want it</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="text-xs">Feeling guilty about skincare spending</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200 tech-card">
                  <h4 className="text-lg font-bold text-green-700 mb-4">AFTER: The True Beauty Guide Way</h4>
                  <ul className="space-y-3 text-charcoal-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-xs">Spending under $30/month on ingredients</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-xs">Simple, effective routine that works</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-xs">Best skin of your life</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-xs">Saving $2,000+ per year</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside - Enhanced */}
      <section className="py-24 px-4 bg-gradient-to-br from-charcoal-50 to-gold-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal-800 mb-6 section-header-3d">
              Inside Your True Beauty Guide: $2,500+ Worth of Beauty Secrets
            </h2>
            <p className="text-sm text-charcoal-600 max-w-4xl mx-auto leading-relaxed">
              This isn't just another skincare guide. It's your complete transformation system - everything you need to
              create luxury-quality skincare at home for a fraction of the cost.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center flex-shrink-0 tech-icon">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-800 mb-3">
                        The "La Mer Dupe" Collection: 15 High-End Brand Recreations
                      </h3>
                      <p className="text-charcoal-600 leading-relaxed text-xs">
                        Step-by-step recipes to recreate $150+ Estée Lauder serums, $200+ SK-II treatments, and $300+
                        Drunk Elephant products using ingredients that cost under $5 each. Including my famous luxury
                        cream dupe that customers say works better than the original.
                      </p>
                      <div className="mt-4 text-xs text-gold-600 font-semibold">Value: $800+ (Yours for $88)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0 tech-icon">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-800 mb-3">
                        The "Kitchen Pharmacy": 50+ Ingredient Deep-Dive
                      </h3>
                      <p className="text-charcoal-600 leading-relaxed text-xs">
                        Discover the science behind everyday ingredients. Why honey works better than hyaluronic acid,
                        how oats outperform expensive exfoliants, and which kitchen staples rival the most expensive
                        anti-aging compounds.
                      </p>
                      <div className="mt-4 text-xs text-gold-600 font-semibold">Value: $500+ (Yours for $88)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 tech-icon">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-800 mb-3">
                        Age-Specific Protocols: From 20s to 60s+
                      </h3>
                      <p className="text-charcoal-600 leading-relaxed text-xs">
                        Customized routines for every decade of life. What your skin needs in your 20s vs. 50s, how to
                        prevent aging before it starts, and how to reverse damage that's already done - all naturally
                        and affordably.
                      </p>
                      <div className="mt-4 text-xs text-gold-600 font-semibold">Value: $600+ (Yours for $88)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 tech-icon">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-800 mb-3">
                        The "Sensitive Skin Safe" Modifications
                      </h3>
                      <p className="text-charcoal-600 leading-relaxed text-xs">
                        Every recipe includes gentle alternatives for sensitive, reactive, or problematic skin. Plus
                        patch testing protocols and ingredient substitution charts so everyone can participate safely.
                      </p>
                      <div className="mt-4 text-xs text-gold-600 font-semibold">Value: $300+ (Yours for $88)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 tech-icon">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-800 mb-3">Quick-Fix Emergency Treatments</h3>
                      <p className="text-charcoal-600 leading-relaxed text-xs">
                        Last-minute date? Important meeting? Unexpected breakout? 15-minute miracle treatments using
                        ingredients you already have that deliver instant results when you need them most.
                      </p>
                      <div className="mt-4 text-xs text-gold-600 font-semibold">Value: $200+ (Yours for $88)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gold-200 shadow-xl bg-gradient-to-br from-white to-cream-50 tech-card-3d">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 tech-icon">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-800 mb-3">
                        BONUS: Printable Recipe Cards + Shopping Lists
                      </h3>
                      <p className="text-charcoal-600 leading-relaxed text-xs">
                        Beautiful, waterproof recipe cards for your bathroom, organized shopping lists by skin concern,
                        and a yearly ingredient calendar so you always know what to buy when.
                      </p>
                      <div className="mt-4 text-xs text-gold-600 font-semibold">Value: $150+ (Yours FREE)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gold-100 to-rose-100 rounded-3xl p-12 border-2 border-gold-300 text-center tech-card-3d">
            <h3 className="text-3xl font-serif text-charcoal-800 mb-4 subsection-header-3d">Total Value: $2,550+</h3>
            <p className="text-xl text-charcoal-700 mb-6">
              Your Investment Today: <span className="text-4xl font-bold text-rose-600 price-3d">Only $88</span>
            </p>
            <p className="text-sm text-charcoal-600">
              That's less than the cost of a single department store serum - but you're getting the secrets to recreate
              dozens of luxury products for life.
            </p>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-200/50 to-rose-200/50 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-cream-50 to-white rounded-3xl p-8 shadow-2xl border border-gold-200 tech-card-3d">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Jessica Lee - Certified Holistic Aesthetician"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-lg tech-badge">
                  <Award className="w-4 h-4 inline mr-1" />
                  15+ Years Experience
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif text-charcoal-800 mb-6 section-header-3d">
                  Meet Jessica Lee: The Beauty Industry Insider Who's Exposing the Truth
                </h2>
                <p className="text-sm text-charcoal-600 leading-relaxed mb-6">
                  For over 15 years, I've worked behind the scenes in the beauty industry - from luxury spas to product
                  development labs. I've seen the markup sheets, attended the strategy meetings, and watched companies
                  profit from women's insecurities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-gold-200 bg-gradient-to-br from-gold-50 to-cream-50 tech-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-6 h-6 text-gold-600" />
                      <h3 className="font-bold text-charcoal-800 text-sm">Certified Holistic Aesthetician</h3>
                    </div>
                    <p className="text-xs text-charcoal-600">
                      Licensed in natural skincare and holistic beauty treatments
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gold-200 bg-gradient-to-br from-rose-50 to-cream-50 tech-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-rose-600" />
                      <h3 className="font-bold text-charcoal-800 text-sm">2,847+ Students</h3>
                    </div>
                    <p className="text-xs text-charcoal-600">Women worldwide who've transformed their skin naturally</p>
                  </CardContent>
                </Card>

                <Card className="border-gold-200 bg-gradient-to-br from-purple-50 to-cream-50 tech-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      <h3 className="font-bold text-charcoal-800 text-sm">Industry Expert</h3>
                    </div>
                    <p className="text-xs text-charcoal-600">15+ years in luxury spa and product development</p>
                  </CardContent>
                </Card>

                <Card className="border-gold-200 bg-gradient-to-br from-green-50 to-cream-50 tech-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="w-6 h-6 text-green-600" />
                      <h3 className="font-bold text-charcoal-800 text-sm">$2M+ Saved</h3>
                    </div>
                    <p className="text-xs text-charcoal-600">Total savings by students using these methods</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-charcoal-800 to-charcoal-700 rounded-2xl p-8 text-white tech-card-3d">
                <h3 className="text-lg font-serif text-gold-300 mb-4">"My Mission"</h3>
                <p className="text-sm leading-relaxed">
                  "I refuse to watch another woman choose between beautiful skin and financial security. Every woman
                  deserves to feel confident and radiant without going into debt for her skincare routine. This guide is
                  my rebellion against an industry that has exploited women for far too long."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency/Scarcity Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-50 to-rose-50 border-t-4 border-rose-400">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-rose-200 tech-card-3d">
            <h2 className="text-4xl font-serif text-charcoal-800 mb-6 section-header-3d">
              Why I'm Practically Giving This Away (And Why It Won't Last)
            </h2>

            <div className="space-y-6 text-sm text-charcoal-700 leading-relaxed mb-8">
              <p>
                <strong>Here's the truth:</strong> I could easily charge $297 for this guide. Beauty consultants charge
                $200+ per hour for this kind of insider knowledge. Luxury spas charge $500+ for treatments you can now
                make at home for under $5.
              </p>

              <p>
                But I'm not interested in becoming another person who profits from your skincare struggles. I'm
                interested in changing the game entirely.
              </p>

              <div className="bg-gradient-to-r from-rose-100 to-gold-100 rounded-2xl p-8 border border-rose-300 tech-card">
                <h3 className="text-xl font-serif text-charcoal-800 mb-4">The $88 Introductory Price Won't Last</h3>
                <p className="text-charcoal-700 text-xs">
                  I'm keeping this price low to get these secrets into as many hands as possible, as quickly as
                  possible. But as word spreads and demand increases, I'll need to raise the price to its true value of
                  $297.
                </p>
              </div>

              <p>
                <strong>Don't wait.</strong> Every day you delay is another day of overspending on skincare that doesn't
                work. Another day of feeling frustrated with your routine. Another day of choosing between beautiful
                skin and financial peace.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-rose-400 tech-button mb-4"
            >
              Get Your Beauty Guide Now - Still Only $88
            </Button>

            <p className="text-xs text-charcoal-500">
              ⚡ Price increases to $297 soon • Limited time offer • Instant access
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ */}
      <section className="py-24 px-4 bg-gradient-to-br from-charcoal-50 to-cream-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-charcoal-800 mb-6 section-header-3d">Your Questions, Answered</h2>
            <p className="text-sm text-charcoal-600">
              Everything you need to know before transforming your skincare routine
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-gold-200 shadow-lg tech-card-3d">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-charcoal-800 mb-4">
                  "Do I really need special ingredients or expensive tools?"
                </h3>
                <p className="text-charcoal-600 leading-relaxed text-xs">
                  Absolutely not! That's the beauty of this system. Every recipe uses ingredients you can find at your
                  local grocery store - things like honey, oats, coconut oil, and avocado. You'll use basic kitchen
                  tools you already own: mixing bowls, measuring spoons, and a whisk. No expensive equipment, no
                  hard-to-find ingredients, no specialty stores required.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-200 shadow-lg tech-card-3d">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-charcoal-800 mb-4">
                  "Will these DIY products really work as well as my $200 serum?"
                </h3>
                <p className="text-charcoal-600 leading-relaxed text-xs">
                  Here's what the beauty industry doesn't want you to know: that $200 serum contains about $3 worth of
                  active ingredients. The rest is markup for packaging, marketing, and profit. My La Mer cream dupe
                  recipe contains the same active compounds as the $300 original, but costs under $5 to make. Many
                  customers report better results because you're getting fresh, potent ingredients without preservatives
                  and fillers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-200 shadow-lg tech-card-3d">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-charcoal-800 mb-4">
                  "I have sensitive skin - are these recipes safe for me?"
                </h3>
                <p className="text-charcoal-600 leading-relaxed text-xs">
                  Yes! In fact, natural ingredients are often gentler than synthetic ones. The guide includes specific
                  modifications for sensitive skin, patch testing instructions, and alternative ingredients for every
                  recipe. I also provide a complete "Sensitive Skin Safe" section with the gentlest formulations. Plus,
                  when you make your own products, you control exactly what goes on your skin - no mystery chemicals or
                  harsh preservatives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-200 shadow-lg tech-card-3d">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-charcoal-800 mb-4">"How much money will I actually save?"</h3>
                <p className="text-charcoal-600 leading-relaxed text-xs">
                  The average woman spends $127 per month on skincare ($1,524 per year). With these recipes, you'll
                  spend about $20-30 per month on ingredients. That's a savings of $1,200-1,500 per year! The guide pays
                  for itself with your first recipe. One customer saved over $2,000 in her first year alone. Even if you
                  only make a few recipes, you'll save hundreds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-200 shadow-lg tech-card-3d">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-charcoal-800 mb-4">
                  "What if I'm not satisfied with the results?"
                </h3>
                <p className="text-charcoal-600 leading-relaxed text-xs">
                  I'm so confident you'll love these recipes that I offer a 30-day, no-questions-asked money-back
                  guarantee. Try the recipes, see the results, calculate your savings. If you're not completely
                  thrilled, just email me within 30 days for a full refund. You keep the guide and recipe cards - my
                  gift to you for giving it a try.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gold-600 via-rose-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10"></div>
        <div className="container mx-auto max-w-5xl text-center relative">
          <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight final-header-3d">
            Your Skin Transformation Starts Right Now
          </h2>

          <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Stop letting the beauty industry profit from your insecurities. Take back control of your skincare routine
            and your budget.
          </p>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto mb-12 text-charcoal-800 tech-card-3d">
            <h3 className="text-3xl font-serif mb-6 subsection-header-3d">Complete Transformation Package</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm">80-Page True Beauty Guide</span>
                <span className="font-bold text-lg">$297</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm">Printable Recipe Cards</span>
                <span className="font-bold text-lg">$97</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm">Bonus Shopping Lists & Calendar</span>
                <span className="font-bold text-lg">$47</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-sm">Sensitive Skin Modifications</span>
                <span className="font-bold text-lg">$97</span>
              </div>
              <div className="flex items-center justify-between py-3 text-lg font-bold">
                <span>Total Value:</span>
                <span className="line-through text-gray-500">$538</span>
              </div>
              <div className="text-center py-4 bg-gradient-to-r from-rose-100 to-gold-100 rounded-2xl">
                <div className="text-3xl font-bold text-rose-600 mb-2 price-3d">Your Investment Today: Only $88</div>
                <div className="text-xs text-charcoal-600">That's 91% OFF the regular price!</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button
              size="lg"
              className="bg-white text-charcoal-800 hover:bg-cream-50 px-16 py-8 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-gold-300 tech-button"
            >
              Download Your Beauty Guide Now - Just $88
            </Button>

            <div className="flex justify-center items-center gap-8 text-sm opacity-95 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-6 h-6" />
                <span>Instant Digital Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6" />
                <span>Join 2,847+ Happy Customers</span>
              </div>
            </div>

            <p className="text-sm opacity-90 max-w-2xl mx-auto">
              <strong>Remember:</strong> Every day you wait is another day of overspending on skincare that doesn't
              deliver. Your future self will thank you for making this decision today.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-charcoal-900 text-charcoal-300">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h3 className="text-2xl font-serif text-white">The True Beauty Guide</h3>
            </div>

            <Separator className="bg-charcoal-700" />

            <div className="grid md:grid-cols-3 gap-8 text-xs">
              <div>
                <h4 className="font-semibold text-white mb-3">Contact</h4>
                <p>support@truebeautyguide.com</p>
                <p>Customer Service Available 24/7</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Guarantee</h4>
                <p>30-Day Money-Back Promise</p>
                <p>No Questions Asked</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Secure</h4>
                <p>256-Bit SSL Encryption</p>
                <p>Your Information is Protected</p>
              </div>
            </div>

            <Separator className="bg-charcoal-700" />

            <div className="space-y-4">
              <p className="text-center">© 2025 The True Beauty Guide. All rights reserved.</p>
              <p className="text-xs opacity-75 max-w-2xl mx-auto">
                This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may
                vary. The testimonials presented are individual experiences and are not intended to represent or
                guarantee that anyone will achieve the same or similar results. Always consult with a healthcare
                professional before starting any new skincare routine.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
