import {
  CalendarCheck,
  CarFront,
  HeartHandshake,
  MapPinned,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Search,
    splash: "daycare-classroom.jpg",
    title: "Discover trusted daycare",
    description: "Browse daycare and care providers near you, with service details in one place.",
  },
  {
    icon: CalendarCheck,
    splash: "daycare-care.jpg",
    title: "Manage care bookings",
    description: "Request and manage daycare and care services for your dependents.",
  },
  {
    icon: HeartHandshake,
    splash: "daycare-playground.jpg",
    title: "Keep care organized",
    description: "Coordinate bookings, availability, and important care information.",
  },
  {
    icon: ShieldCheck,
    splash: "daycare-care.jpg",
    title: "Coordinate safe handovers",
    description: "Connect care bookings with authorized pickup and drop-off arrangements.",
  },
  {
    icon: UsersRound,
    splash: "daycare-classroom.jpg",
    title: "Connect guardians and providers",
    description: "Keep the people supporting a dependent informed and working together.",
  },
  {
    icon: CarFront,
    splash: "daycare-playground.jpg",
    title: "Coordinate supporting transport",
    description: "Track trips between home, school, and care when a dependent needs a ride.",
  },
]

const screenshots = [
  {
    image: "daycarebookings.jpeg",
    alt: "Zorora daycare bookings and booking status",
    title: "Daycare bookings",
    detail: "Keep care requests organized.",
  },
  {
    image: "activity.jpeg",
    alt: "Zorora activity feed showing journey requests and map progress",
    title: "Journey activity",
    detail: "Follow requests and journey updates.",
  },
  {
    image: "services.jpeg",
    alt: "Zorora services for daycare, family, schools, and transport",
    title: "Care and support services",
    detail: "Find care alongside related services.",
  },
  {
    image: "login.jpeg",
    alt: "Zorora secure sign-in screen",
    title: "A secure sign-in",
    detail: "Access your Zorora account.",
  },
  {
    image: "otp.jpeg",
    alt: "Zorora identity verification screen with private details removed",
    title: "Account verification",
    detail: "Verify your identity before you continue.",
  },
  {
    image: "wallet.jpeg",
    alt: "Zorora wallet and payment history screen with private balance removed",
    title: "Wallet and history",
    detail: "Review journey payments and activity.",
  },
  {
    image: "payment.jpeg",
    alt: "Zorora payment methods screen",
    title: "Flexible payments",
    detail: "Choose from available payment methods.",
  },
  {
    image: "settings.jpeg",
    alt: "Zorora account and safety settings with personal details removed",
    title: "Your account and safety",
    detail: "Manage the details that keep journeys connected.",
  },
]

export function FeatureOverview() {
  return (
    <section className="feature-section" id="features" aria-labelledby="features-title">
      <div className="feature-section-heading">
        <div>
          <Badge variant="outline" className="eyebrow">
            <ShieldCheck size={13} /> Care through every journey
          </Badge>
          <h2 id="features-title">Daycare and care, with coordination built in.</h2>
          <p>
            Discover providers and manage care bookings. Transport, tracking,
            and handovers support the people caring for your dependents.
          </p>
        </div>
        <div className="feature-heading-mark" aria-hidden="true">
          <span><CarFront /></span><span><ShieldCheck /></span><span><HeartHandshake /></span>
        </div>
      </div>
      <div className="feature-grid">
        {features.map(({ icon: Icon, splash, title, description }, index) => (
          <Card className="feature-card glass-card" key={title} style={{ animationDelay: `${index * 45}ms` }}>
            <img className="feature-card-splash" src={`/images/${splash}`} alt="" aria-hidden="true" loading="lazy" />
            <CardHeader>
              <span className="feature-icon"><Icon /></span>
              <span className="feature-number">{String(index + 1).padStart(2, "0")}</span>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="feature-section-heading screenshot-section-heading">
        <div>
          <Badge variant="outline" className="eyebrow">
            <MapPinned size={13} /> A look inside Zorora
          </Badge>
          <h2>See care come together.</h2>
          <p>Explore daycare bookings, care services, and the tools that keep guardians connected.</p>
        </div>
      </div>
      <div className="feature-visual-grid screenshot-gallery">
        {screenshots.map(({ image, alt, title, detail }) => (
          <figure className="feature-visual-card screenshot-card" key={image}>
            <img src={`/images/${image}`} alt={alt} loading="lazy" />
            <figcaption className="feature-visual-caption">
              <span><strong>{title}</strong><small>{detail}</small></span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="feature-footnote">
        Features and availability may vary by release. Check the release notes
        for the latest information.
      </p>
    </section>
  )
}
