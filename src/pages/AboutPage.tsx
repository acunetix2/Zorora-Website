import { ArrowRight, Heart, MapPinned, ShieldCheck, UsersRound } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

export function AboutPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <section className="content-page">
      <Badge variant="outline" className="eyebrow"><Heart size={13} /> About Zorora</Badge>
      <h1>Care that travels<br /><span>with your family.</span></h1>
      <p className="page-lede">
        Zorora brings guardians, transport providers, and care services together
        to help make dependent journeys safer and easier to coordinate.
      </p>
      <div className="about-grid">
        <Card className="glass-card about-story">
          <CardHeader>
            <div className="page-icon"><MapPinned /></div>
            <CardTitle>Confidence from pickup to arrival.</CardTitle>
            <CardDescription>Journeys with care built in.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Arrange transport, keep up with journey progress, and coordinate
              trusted handovers in one place. Zorora is designed to help the
              people caring for a dependent stay informed and connected.
            </p>
            <p>
              This portal is the official place to find Zorora mobile releases,
              review release notes, and download available Android builds.
            </p>
            <Button onClick={() => onNavigate("/")} className="page-primary">
              Get the Android app <ArrowRight />
            </Button>
          </CardContent>
        </Card>

        <div className="about-values">
          <Card className="glass-card value-card">
            <CardHeader>
              <div className="page-icon"><ShieldCheck /></div>
              <CardTitle>Safety at every handover</CardTitle>
              <CardDescription>Keep authorized receivers and journey details close.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass-card value-card">
            <CardHeader>
              <div className="page-icon"><UsersRound /></div>
              <CardTitle>People working together</CardTitle>
              <CardDescription>Connect families, providers, and drivers around care.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass-card community-card">
            <MessageGroup>
              <Message>
                <MessageAvatar><img src="/zorora-logo.svg" alt="Zorora" /></MessageAvatar>
                <MessageContent>
                  <MessageHeader>Zorora</MessageHeader>
                  <div className="message-bubble">Every journey deserves care, clarity, and a trusted handover.</div>
                  <MessageFooter>From pickup to arrival</MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </Card>
        </div>
      </div>
    </section>
  )
}
