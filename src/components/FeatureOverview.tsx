import {
  CarFront,
  CreditCard,
  HeartHandshake,
  MapPinned,
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
    icon: CarFront,
    title: "Book trusted journeys",
    description: "Arrange transport for the people who depend on you, with clear journey details.",
  },
  {
    icon: MapPinned,
    title: "Follow journeys live",
    description: "Stay up to date with location and journey progress from pickup to arrival.",
  },
  {
    icon: ShieldCheck,
    title: "Coordinate safe handovers",
    description: "Manage authorized receivers and make each custody transfer easier to verify.",
  },
  {
    icon: HeartHandshake,
    title: "Find care near you",
    description: "Explore transport, daycare, school, and other trusted care services.",
  },
  {
    icon: UsersRound,
    title: "Keep everyone connected",
    description: "Bring guardians, providers, and drivers together around the same journey.",
  },
  {
    icon: CreditCard,
    title: "Manage journey payments",
    description: "Review payment options and keep journey-related transactions in one place.",
  },
]

const screenshots = [
  {
    image: "services.jpeg",
    alt: "Zorora services for rides, daycare, family, schools, and care",
    title: "Services for every journey",
    detail: "Find rides and care in one place.",
  },
  {
    image: "activity.jpeg",
    alt: "Zorora activity feed showing journey requests and map progress",
    title: "Journey activity",
    detail: "Follow requests and journey updates.",
  },
  {
    image: "daycarebookings.jpeg",
    alt: "Zorora daycare bookings and booking status",
    title: "Care bookings",
    detail: "Keep daycare requests organized.",
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
          <h2 id="features-title">More confidence, from pickup to arrival.</h2>
          <p>
            Zorora connects families with trusted transport and care, while
            keeping the people involved informed along the way.
          </p>
        </div>
        <div className="feature-heading-mark" aria-hidden="true">
          <span><CarFront /></span><span><ShieldCheck /></span><span><HeartHandshake /></span>
        </div>
      </div>
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, description }, index) => (
          <Card className="feature-card glass-card" key={title} style={{ animationDelay: `${index * 45}ms` }}>
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
          <p>Explore the app screens for bookings, journey activity, and account tools.</p>
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
