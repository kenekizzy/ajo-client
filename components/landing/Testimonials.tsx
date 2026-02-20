'use client';

import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Adunni Okafor",
    role: "Small Business Owner",
    location: "Lagos, Nigeria",
    rating: 5,
    content: "Ajo helped me save ₦500,000 in just 10 months! I used the money to expand my tailoring business and now I employ 3 people. The discipline and community support made all the difference.",
  },
  {
    name: "James Mensah",
    role: "Teacher",
    location: "Accra, Ghana",
    rating: 5,
    content: "I was skeptical at first, but joining an ajo group with my colleagues was the best financial decision I've made. We saved together for a year and I was able to buy my first car!",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Nurse",
    location: "Kano, Nigeria",
    rating: 5,
    content: "The transparency and trust in our ajo group is amazing. Everyone knows exactly where their money is going, and the mobile app makes tracking so easy. I've saved more than I ever thought possible.",
  },
  {
    name: "Kwame Asante",
    role: "Market Trader",
    location: "Kumasi, Ghana",
    rating: 5,
    content: "Ajo brought our community closer together. We don't just save money - we support each other's dreams. I used my payout to send my daughter to university. Thank you, Ajo!",
  },
  {
    name: "Blessing Okoro",
    role: "Hair Stylist",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    content: "I love how flexible the system is. Our group meets every two weeks, and the amount works perfectly for our budgets. In 8 months, I saved enough to open my own salon!",
  },
  {
    name: "Akosua Boateng",
    role: "Accountant",
    location: "Tema, Ghana",
    rating: 5,
    content: "The security features give me complete peace of mind. Every transaction is recorded, and I can see exactly when my turn is coming up. It's like having a personal savings coach!",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Success Stories from Our Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real people, real results. See how ajo savings has transformed lives and helped 
            thousands achieve their financial dreams.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:shadow-ajo-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-ajo-primary rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-ajo-primary-foreground" />
              </div>

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-ajo-primary text-ajo-primary" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-foreground leading-relaxed">
                  "                  &ldquo;{testimonial.content}&rdquo;"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 bg-ajo-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-ajo-primary font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-ajo-primary">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 p-6 bg-ajo-primary/5 rounded-2xl border border-ajo-primary/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-ajo-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-ajo-primary/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-ajo-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Members</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-ajo-primary/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-ajo-primary">₦50M+</div>
              <div className="text-sm text-muted-foreground">Total Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}