"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Car, Package, Bike } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/data/translations"

const getFeatures = (t: typeof translations.sl) => [
  {
    icon: Car,
    title: t.features.carpool.title,
    description: t.features.carpool.description,
  },
  {
    icon: Package,
    title: t.features.package.title,
    description: t.features.package.description,
  },
  {
    icon: Bike,
    title: t.features.bike.title,
    description: t.features.bike.description,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Utility function to merge classNames
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

// Card Components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("px-6 pb-6 flex-grow", className)} {...props} />,
)
CardContent.displayName = "CardContent"

export default function FeatureSection() {
  const { currentLanguage } = useLanguage()
  const t = translations[currentLanguage]
  const features = getFeatures(t)

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index}
              className="h-full"
            >
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

