import { useEffect } from "react"

type LegalPolicy = "terms" | "privacy"
type LegalSection = {
  id: string
  heading: string
  content: string
}
type LegalDocument = {
  title: string
  sections: LegalSection[]
}

const effectiveDate = "1 October 2026"
const companyNotice =
  'Zorora Limited ("Zorora", "we", "us", or "our") is a mobility and custody management company incorporated in Kenya. This document governs your use of the Zorora platform.'

const policies: Record<LegalPolicy, LegalDocument> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        id: "information-we-collect",
        heading: "1. Information We Collect",
        content:
          "We collect the following categories of personal data when you register and use Zorora:\n\n" +
          "• Identity Data: full name, date of birth, government-issued ID number.\n" +
          "• Contact Data: email address, phone number (including country code).\n" +
          "• Account Credentials: hashed passwords and OTP tokens — never stored in plaintext.\n" +
          "• Dependent Data: names, photos, school/care-centre names, and custody schedules of minors in your care.\n" +
          "• Location Data: real-time GPS coordinates of vehicles and drivers during active journeys.\n" +
          "• Device Data: device type, OS version, push notification tokens, and IP address.\n" +
          "• Financial Data: masked payment card details processed via PCI-DSS-compliant gateways (Stripe / M-Pesa). We do not store raw card numbers.",
      },
      {
        id: "how-we-use-your-data",
        heading: "2. How We Use Your Data",
        content:
          "We process your personal data for the following purposes:\n\n" +
          "• Service delivery: matching guardians, caregivers, drivers, and dependents for safe journey coordination.\n" +
          "• Real-time tracking: enabling live GPS custody handover verification and ETA updates.\n" +
          "• Safety & verification: biometric PIN handover, two-factor authentication, and custody chain audit logs.\n" +
          "• Communication: sending journey alerts, OTP codes, receipts, and safety notifications.\n" +
          "• Fraud prevention: detecting anomalous login attempts and unauthorised custody transfers.\n" +
          "• Legal compliance: retaining transaction and custody records as required by Kenyan law.",
      },
      {
        id: "child-safety",
        heading: "3. Child Safety & Minor Data",
        content:
          "Zorora takes child safety extremely seriously. Dependent (minor) data is handled under heightened protections:\n\n" +
          "• Only verified guardians may create or modify dependent profiles.\n" +
          "• Dependent photos and location data are never shared with third-party advertisers.\n" +
          "• Real-time location data is deleted from our live-tracking servers within 24 hours of journey completion. Anonymised metadata may be retained for safety audits.\n" +
          "• Zorora complies with the Kenya Data Protection Act 2019 and international COPPA/GDPR-K frameworks where applicable.\n" +
          "• Custody handover events are immutably logged and accessible to law enforcement upon a valid court order.",
      },
      {
        id: "data-sharing",
        heading: "4. Data Sharing & Third Parties",
        content:
          "We do not sell your personal data. We share data only in these circumstances:\n\n" +
          "• Service providers: cloud hosting (AWS/GCP), payment processors (Stripe, M-Pesa/Safaricom), SMS gateways, and map services — each bound by data processing agreements.\n" +
          "• Legal obligations: disclosure to regulatory authorities, courts, or law enforcement when legally required.\n" +
          "• Safety emergencies: if we believe disclosure is necessary to prevent physical harm to a child or any person.\n" +
          "• Business transfers: in the event of a merger or acquisition, your data will remain subject to this policy.",
      },
      {
        id: "data-retention",
        heading: "5. Data Retention",
        content:
          "We retain personal data as follows:\n\n" +
          "• Account and custody records: 7 years after account closure (Kenya Companies Act requirement).\n" +
          "• Real-time GPS track logs: 24 hours post-journey, then deleted from live systems.\n" +
          "• Anonymised journey statistics: indefinitely for safety analytics.\n" +
          "• OTP codes and authentication tokens: deleted immediately upon use or expiry.\n\n" +
          "You may request deletion of your account and associated personal data at any time, subject to legal retention obligations.",
      },
      {
        id: "your-rights",
        heading: "6. Your Rights (Data Subject Rights)",
        content:
          "Under the Kenya Data Protection Act 2019, you have the right to:\n\n" +
          "• Access: request a copy of personal data we hold about you.\n" +
          "• Correction: request correction of inaccurate or incomplete data.\n" +
          "• Erasure: request deletion of your data where no legal basis for retention exists.\n" +
          "• Portability: receive your data in a structured, machine-readable format.\n" +
          "• Objection: object to processing based on legitimate interests or for direct marketing.\n" +
          "• Withdraw Consent: withdraw consent at any time without affecting prior lawful processing.\n\n" +
          "Submit requests to: legal@zorora.co.ke. We will respond within 30 days.",
      },
      {
        id: "security-measures",
        heading: "7. Security Measures",
        content:
          "Zorora employs industry-standard security measures:\n\n" +
          "• End-to-end encryption (TLS 1.3) for all data in transit.\n" +
          "• AES-256 encryption for data at rest in our databases.\n" +
          "• Bcrypt password hashing — passwords are never stored or accessible in plaintext.\n" +
          "• Hardware Security Modules (HSM) for cryptographic key management.\n" +
          "• Regular third-party penetration testing and security audits.\n" +
          "• Multi-factor authentication on all administrative systems.\n\n" +
          "While we take all reasonable precautions, no digital system is 100% secure. Please report security vulnerabilities to security@zorora.co.ke.",
      },
      {
        id: "policy-changes",
        heading: "8. Changes to This Policy",
        content:
          "We may update this Privacy Policy periodically. Material changes will be notified to you via in-app notification and/or email at least 14 days before taking effect. Continued use of Zorora after notification constitutes acceptance of the updated policy.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        id: "acceptance-of-terms",
        heading: "1. Acceptance of Terms",
        content:
          "By creating a Zorora account, you confirm that:\n\n" +
          "• You are at least 18 years of age.\n" +
          "• You have the legal authority to enter into this agreement on behalf of yourself or any organisation you represent.\n" +
          "• You have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.\n\n" +
          "If you do not agree to these terms, you must not use the Zorora platform.",
      },
      {
        id: "the-zorora-platform",
        heading: "2. The Zorora Platform",
        content:
          "Zorora provides a technology platform that enables:\n\n" +
          "• Guardians to schedule, monitor, and verify transportation and care journeys for their dependents.\n" +
          "• Caregivers to accept custody assignments and provide real-time journey updates.\n" +
          "• Drivers/Providers to execute transportation legs with GPS-verified pickup and drop-off.\n" +
          "• Institutions (schools, hospitals, care centres) to coordinate dependent intake and release.\n\n" +
          "Zorora is a technology intermediary. We do not directly provide transportation or childcare services. All such services are provided by independent third parties who use the platform.",
      },
      {
        id: "user-responsibilities",
        heading: "3. User Responsibilities",
        content:
          "All users must:\n\n" +
          "• Provide accurate, complete, and truthful registration information.\n" +
          "• Maintain the security of their account credentials and immediately notify us of any unauthorised access.\n" +
          "• Use the platform only for lawful purposes related to dependent care and mobility.\n" +
          "• Not impersonate any person or entity, falsify custody relationships, or provide fraudulent dependent information.\n" +
          "• Complete all required background verification checks before accepting custody assignments (applies to caregivers and drivers).\n" +
          "• Comply with all applicable Kenyan laws, regulations, and local by-laws.",
      },
      {
        id: "guardian-responsibilities",
        heading: "4. Guardian Responsibilities & Custody Chain",
        content:
          "As a guardian, you acknowledge that:\n\n" +
          "• You bear primary legal responsibility for the well-being of all dependents registered under your account.\n" +
          "• You must only assign custody to verified caregivers and drivers through the platform — not verbally or informally.\n" +
          "• The handover PIN is a custody security mechanism. Never share your PIN externally.\n" +
          "• Zorora custody records may be used as evidence in legal disputes regarding child welfare or access.\n" +
          "• False or misleading custody information may be reported to the relevant child protection authorities.",
      },
      {
        id: "verification",
        heading: "5. Background Checks & Verification",
        content:
          "Zorora requires the following verifications before account activation:\n\n" +
          "• Identity verification via government-issued ID (National ID, Passport).\n" +
          "• Phone number and email verification via OTP.\n" +
          "• Criminal background checks for caregivers and drivers, conducted via our approved third-party partner.\n" +
          "• Driving licence validation for driver accounts.\n\n" +
          "Zorora does not guarantee the accuracy of third-party background check results but takes commercially reasonable steps to verify user suitability.",
      },
      {
        id: "payments-and-fees",
        heading: "6. Payments & Fees",
        content:
          "Payment terms:\n\n" +
          "• Fees for journey services are displayed before booking confirmation. By confirming, you agree to pay the stated amount.\n" +
          "• Payments are processed via secure third-party gateways (Stripe, M-Pesa). Zorora does not store raw card or M-Pesa transaction details.\n" +
          "• Refunds are subject to the cancellation policy applicable to the journey type. Emergency cancellations due to safety concerns will be reviewed case by case.\n" +
          "• Zorora reserves the right to modify pricing with 14 days prior notice.\n" +
          "• All amounts are in Kenyan Shillings (KES) unless expressly stated otherwise.",
      },
      {
        id: "limitation-of-liability",
        heading: "7. Limitation of Liability",
        content:
          "To the maximum extent permitted by applicable law:\n\n" +
          "• Zorora is not liable for indirect, incidental, special, or consequential damages arising from use of the platform.\n" +
          "• Zorora's total liability for any claim shall not exceed the fees paid by you to Zorora in the preceding 3 months.\n" +
          "• Zorora is not responsible for the acts or omissions of independent caregivers, drivers, or institutions using the platform.\n" +
          "• Nothing in these Terms limits liability for death or personal injury caused by Zorora's gross negligence, fraud, or fraudulent misrepresentation.",
      },
      {
        id: "termination",
        heading: "8. Termination",
        content:
          "Zorora may suspend or terminate your account immediately if:\n\n" +
          "• You breach any provision of these Terms.\n" +
          "• We suspect fraudulent, abusive, or illegal activity.\n" +
          "• A child protection authority requests suspension pending investigation.\n\n" +
          "You may close your account at any time via app settings. Upon closure, your data will be handled in accordance with our Privacy Policy retention schedules.",
      },
      {
        id: "governing-law",
        heading: "9. Governing Law & Dispute Resolution",
        content:
          "These Terms are governed by the laws of Kenya. Any disputes shall first be submitted to mediation under the Nairobi Centre for International Arbitration rules. If mediation fails within 60 days, disputes shall be resolved by binding arbitration seated in Nairobi, Kenya.",
      },
    ],
  },
}

export function LegalPage({ policy }: { policy: LegalPolicy }) {
  const content = policies[policy]

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${content.title} · Zorora`
    return () => {
      document.title = previousTitle
    }
  }, [content.title])

  return (
    <article className="content-page legal-page">
      <header className="legal-header">
        <p className="legal-kicker">Zorora · Legal</p>
        <h1>{content.title}</h1>
        <p className="legal-updated">Effective date: {effectiveDate}</p>
        <p className="legal-introduction">{companyNotice}</p>
      </header>

      <nav className="legal-contents" aria-label={`${content.title} contents`}>
        <h2>On this page</h2>
        <ol>
          {content.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.heading.replace(/^\d+\.\s*/, "")}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="legal-document">
        {content.sections.map((section) => (
          <section className="legal-section" id={section.id} key={section.id}>
            <h2>{section.heading}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{section.content}</p>
          </section>
        ))}
      </div>
      <p className="legal-footer-note">
        For questions regarding this policy, contact:
        <br />
        legal@zorora.co.ke · +254 700 000 000
        <br />
        Zorora Limited, Nairobi, Kenya
      </p>
    </article>
  )
}
