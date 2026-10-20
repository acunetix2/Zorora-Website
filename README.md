<div align="center">
  <img src="public/zorora-logo.svg" alt="Zorora" width="76">

  # Zorora Downloads

  **Official Android releases. Care, connected.**

  The responsive release portal for the Zorora mobile app.

  [![Portal version](https://img.shields.io/badge/portal-v0.1.0-00CBB2?style=for-the-badge)](package.json)
  ![React](https://img.shields.io/badge/React-19-00CBB2?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-6-00CBB2?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-8-00CBB2?style=for-the-badge&logo=vite&logoColor=white)
</div>

## Overview

Zorora Downloads helps people find official Zorora Android releases and
download installable APK files. The Zorora app connects guardians with daycare
and care providers, supports care bookings, and coordinates dependent transport
and tracking when needed. Release information and files are retrieved
server-side from the private `acunetix2/Zorora` repository; the GitHub token is
never sent to the browser.

The portal is built with React, TypeScript, Vite, Tailwind CSS, and the
shadcn-style UI components in `src/components/ui`. Its dark charcoal and teal
palette follows the Zorora mobile app.

## Features

- Browse stable and pre-release Android releases and their release notes.
- Search by release name, tag, notes, or Android package filename.
- Look up releases by their six-digit release code.
- Open dedicated release-detail pages and navigate without full-page reloads.
- Refresh releases on page load, every five minutes, and when returning to an
  inactive tab; refresh manually at any time.
- Download APKs through the portal with transfer progress and visible errors.
- Browse daycare-focused product features and real care photography alongside
  Zorora app screenshots and download help.
- Use the portal on desktop, tablet, and mobile.

## Configure private GitHub access

The Vercel serverless functions need a GitHub token to read private releases.
Create a fine-grained personal access token restricted to the `acunetix2/Zorora`
repository with **Contents: read-only** permission. Add it to the Vercel project
as the `GITHUB_TOKEN` environment variable for the environments where the
portal is deployed, then redeploy. Do not add the token to frontend code,
`VITE_*` variables, or committed files.

For local development, provide `GITHUB_TOKEN` in the server process
environment before running the Vercel functions. Without it, `/api/releases`
and `/api/download` return a configuration error instead of making anonymous
requests.

## Releases and downloads

The portal retrieves release metadata through `/api/releases`. Only published
releases are shown, and the download proxy verifies that a requested asset is
an APK before streaming it from GitHub. Only installable APKs are exposed by
the public portal; source archives and other release assets are not made
downloadable.

Files are streamed through the portal, then buffered by the browser for
transfer progress and saved locally when complete. Large downloads need enough
browser memory to buffer the file.

## Photo credits

The daycare splash photographs are real images sourced from Wikimedia Commons:

- [Preschool classroom](https://commons.wikimedia.org/wiki/File:ASYMCA_to_launch_new_preschool_classes_in_2014_131106-D-RT812-014.jpg) — Christine Cabalo, public domain.
- [Daycare attendee](https://commons.wikimedia.org/wiki/File:Daycare_Attendee.jpg) — Shadowguy97, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Daycare playground](https://commons.wikimedia.org/wiki/File:Daycare_center_playground,_Hakodate,_Japan.jpg) — OKJaguar, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Report an issue

Use the **Found a problem?** section in the portal to contact the developer.
Do not include passwords, authentication codes, private notes, or other
sensitive information in a support request.

## Maintainer

[![Developed by Aventorgo LLC](https://img.shields.io/badge/Developed%20by-Aventorgo%20LLC-00CBB2?style=for-the-badge)](https://www.aventorgo.xyz)

## License

This repository does not currently include a `LICENSE` file. No license to
reuse, modify, or redistribute the portal source is granted by this README.
