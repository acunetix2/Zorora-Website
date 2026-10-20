import { ArrowUp, ExternalLink } from "lucide-react"
import type { MouseEvent } from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
export function SiteFooter({
  onNavigate,
}: {
  onNavigate: (path: string) => void
}) {
  function navigateLink(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <a className="footer-brand" href="/" onClick={(event) => navigateLink(event, "/")}>
            <img src="/zorora-logo.svg" alt="" />
            <span>Zorora</span>
          </a>
          <p>Daycare and dependent care, connected.</p>
          <a className="footer-company-link" href="https://www.aventorgo.xyz" target="_blank" rel="noreferrer">
            Developed by Aventorgo LLC <ExternalLink size={12} />
          </a>
          <span className="footer-ceo">Led by CEO Iddy K. Chesire</span>
          <span className="footer-version">Download portal v{__APP_VERSION__}</span>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <NavigationMenu className="footer-navigation">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" onClick={(event) => navigateLink(event, "/")}>Downloads</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" onClick={(event) => navigateLink(event, "/about")}>About Zorora</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/help" onClick={(event) => navigateLink(event, "/help")}>Help center</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="footer-column footer-legal">
          <h2>Legal</h2>
          <a href="/terms" onClick={(event) => navigateLink(event, "/terms")}>Terms of Service</a>
          <a href="/privacy" onClick={(event) => navigateLink(event, "/privacy")}>Privacy Policy</a>
        </div>

        <div className="footer-column footer-support">
          <h2>Support</h2>
          <a href="#report-issue" onClick={(event) => {
            event.preventDefault()
            onNavigate("/")
            window.setTimeout(() => document.getElementById("report-issue")?.scrollIntoView({ behavior: "smooth" }), 0)
          }}>Report an issue</a>
          <a href="https://www.aventorgo.xyz" target="_blank" rel="noreferrer">Contact the developer</a>
        </div>

      </div>
      <div className="footer-bottom">
        <span className="footer-disclaimer">
          Android is a trademark of Google LLC. Zorora and Aventorgo LLC are not
          affiliated with or endorsed by Google LLC.
        </span>
        <a href="#top" onClick={(event) => {
          event.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}>Back to top <ArrowUp size={13} /></a>
      </div>
    </footer>
  )
}
