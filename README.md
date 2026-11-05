# HTS — HowTo.Software

> Status: Unreleased documentation, website-request wizard and motion refinement; pending HTS review. Owner: HTS team. Historical baseline: 2026-09-22; frontend baseline: 2026-10-02.

HTS is a commercial website for custom website development and digital services, built with **Blazor Web App, ASP.NET Core and .NET 8**. Visitors explore live projects running on HTS servers, choose services and prepare a guided project brief in Portuguese, English or Spanish. The wizard uses the current editorial layout, orange accents and light/black themes.

[Português brasileiro](README.pt-BR.md) · [Documentation index](docs/README.md) · [Changelog](CHANGELOG.md)

![HTS desktop preview](docs/preview-desktop.png)

[Mobile preview](docs/preview-mobile.png) · [Full-page preview](docs/preview-desktop-full.png) · [Black theme](docs/preview-black.png) · [Black mobile](docs/preview-black-mobile.png) · [Spanish preview](docs/preview-es.png) · [Frontend sources and attribution](docs/frontend-sources.md)

These images document the frontend baseline. They do not establish release approval or certify the current wizard.

## Quick start

Install the .NET 8 SDK, then run from this directory:

```powershell
dotnet restore
dotnet build -c Release
dotnet run --no-launch-profile --urls http://localhost:5093
```

Open <http://localhost:5093>. Node, React and npm are not required. Localization resources and images are included in the repository; the Manrope font is served locally.

## Website-request wizard

The request follows five steps:

1. **Contact and project:** contact details, business, service, website type, new or existing project and optional existing website address.
2. **Goals and scope:** desired outcome, target audience, pages and features.
3. **Visual direction:** style, colors, reference websites, available brand/content assets and site languages.
4. **Technical needs and planning:** integrations, domain/hosting, estimated budget and desired timing.
5. **Review:** check the answers, return to edit a step and download the brief as UTF-8 text.

Choosing a service or a project's "I want a site like this" action prefills the shared brief. Maintenance retains the existing-project mode. A provided existing-site address must use HTTP or HTTPS. A successful download means the brief was prepared; it does **not** mean HTS received the request.

The application currently has **no request-delivery API, database, email delivery, authentication or payment workflow**. Answers live in a scoped Blazor circuit and can be lost after a reload, restart or expired session. Downloading creates a file on the visitor's device. Integration planning is documented separately from implemented behavior.

## Other features

- Interactive desktop/mobile hero, project filters and keyboard-accessible preview dialogs.
- Expandable services covering websites, business sites, landing pages, custom systems, maintenance, backend, hosting and consultancy.
- PT-BR, EN and ES interface and validation resources. Culture preference uses a cookie; theme preference uses browser storage.
- Responsive navigation, active-section indicator, scroll progress and reduced-motion support.
- "Ideas in action" showcases four sites: howtoosoftware.com, host.howto.software, marks-baseballcards.com and linktura.org. The original two-column miniature-browser cards link to each site and use local homepage screenshots, or a branded preview for Linktura's sign-in page. Filters only appear for categories containing projects. Screenshots are refreshed manually.

## Motion refinement — Unreleased

The motion direction extends the existing frontend with a gently floating hero preview, restrained decorative highlights, a moving capabilities band, slow service-art orbits, staged section/card entrances and short wizard-step feedback. Text, inputs and actions must remain stable and usable; no animation library, remote asset or additional frontend runtime is required.

The header's Appearance menu groups theme selection and the global animation control. Pause/resume retains its persistent preference (`hts-motion`), with the operating system's reduced-motion preference taking priority. Continuous scenes pause outside the viewport and while the tab is hidden. The capabilities band also pauses for hover/focus; its repeated visual copy is hidden from assistive technology, and the paused/reduced-motion view exposes the complete original content in a static wrapping layout.

Without JavaScript, the fallback keeps page content and capability labels visible; it does not replace the interactive Blazor runtime. Wizard navigation, validation feedback and download still require JavaScript and a live server connection.

Motion QA passed a fresh Release build, 37 isolated controller checks, 19 browser behavior assertions and 48 combinations with 192 section-layout checks. Pause, reduced motion, hidden-tab/offscreen behavior, static fallback and relevant interactions are detailed in [the local verification record](docs/phase-4-testing/verification.md); native zoom, memory profiling and production capacity are not certified. Read the [technical motion contract](docs/phase-2-design/technical-design.md#motion-refinement--unreleased) for interaction, accessibility and performance boundaries.

## Project map

| Path | Responsibility |
| --- | --- |
| `Program.cs` | Server setup, localization, antiforgery and culture selection |
| `Components/Pages/Home.razor` | One-page composition |
| `Components/Shared/QuoteForm.razor` | Guided request flow, validation, review and export |
| `Components/Shared/MotionToggle.razor` | Reusable localized global animation control |
| `Components/Shared/AppearanceMenu.razor` | Header disclosure containing theme and animation preferences |
| `Models/QuoteRequest.cs` | Request fields and validation |
| `Models/ProjectBrief.cs` | Draft scoped to the current Blazor circuit |
| `Models/BriefOptions.cs` | Allowed wizard choice values and localization keys |
| `Models/BriefValidation.cs` | Per-step and complete-request validation |
| `Models/BriefFormatter.cs` | Localized, complete text export |
| `Resources` | PT-BR, EN and ES copy |
| `wwwroot/css/app.css` | Visual system, themes and responsive layout |
| `wwwroot/js` | Theme preference, dialogs, navigation and text-file download |
| `docs` | Requirements, architecture, development, testing, deployment and operations |

## Verification and release

Run `dotnet build -c Release` and follow the [test cases](docs/phase-4-testing/test-cases.md). There is no automated test project yet. GitHub Actions [CI/CD](docs/phase-5-deployment/ci-cd.md) builds every pull request with warnings treated as errors, checks localization keys and smoke-tests the Docker image. Pushes to `main` are deployed through the self-hosted runner `192.168.1.210` to the Docker host `192.168.1.206` (`/opt/hts-commercial-website`). Browser checks remain manual procedures, and the site has not been load-tested.

The wizard iteration before the motion refinement passed a Release build, 629 model assertions and 150 browser layout combinations. The motion revision has separate fresh checks; see [local verification and its limits](docs/phase-4-testing/verification.md). Neither run certifies a production deployment.

The history dates come from Git: initial site `7b3f5ec` on **2026-09-22** and frontend reformulation `319f047` on **2026-10-02**. This documentation adaptation and wizard belong to **Unreleased**; no historical release or reviewer approval has been invented.

## Attribution, contribution and security

Free Skiper UI components were adapted to Razor/CSS with footer attribution. OriginKit supplied a public behavior reference for an independent implementation. See [frontend-sources.md](docs/frontend-sources.md) and [licensing guidance](docs/security/compliance.md). Manrope's SIL Open Font License is included in `wwwroot/fonts/OFL.txt`.

The documentation structure adapts the local `best-document` lifecycle template. Its `LICENSE` file is an unfilled choice-of-license prompt, not a license grant for this project. No project-wide open-source license is declared here; HTS must decide the distribution terms before reuse or publication under a license.

Read [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [SECURITY.md](SECURITY.md). The HTS team owns review, hosting decisions and the future request-delivery channel.
