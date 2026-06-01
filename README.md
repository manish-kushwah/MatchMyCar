# MatchMyCar — Production-Ready MVP Architecture

This document outlines the scalable, lightweight MVP architecture for the **MatchMyCar** car research platform. The platform is designed using Next.js (App Router), TypeScript, Tailwind CSS, Ant Design (antd), Redux Toolkit, TanStack Query, Axios, and Supabase.

---

## Project Overview, Reflection & Startup Guide

### 1. What did you build and why? What did you deliberately cut?

- **What was built**: A highly robust, production-ready MVP architecture blueprint for the MatchMyCar car research platform. It organizes the filesystem cleanly, sets up type safety across API boundaries, integrates global UI state (Redux Toolkit) and server cache state (TanStack Query), and isolates database access strictly to backend Next.js API Routes via the Supabase Node.js SDK.
- **Why**: To establish a standardized, maintainable foundation that enables frontend developer speed while preventing security vulnerabilities (e.g. leaking Supabase service role keys to client scripts) and avoiding common code duplication pitfalls.
- **What was deliberately cut**:
  - Authentication, authorization, and role management.
  - Direct client-side queries to Supabase.
  - Event sourcing, CQRS, and complex repository layer patterns.
  - Microservices and monorepo configurations.
  - Visual test environments like Storybook.
  - CI/CD pipelines, Docker/Kubernetes files, and unit/integration testing suites.

### 2. What’s your tech stack and why did you pick it?

- **Next.js (App Router)**: Picked for its unified hybrid rendering (SSR/CSR) system. This ensures car listing/details pages can be rendered on the server for optimal SEO performance and Largest Contentful Paint (LCP) speeds, while API Route Handlers serve as secure backend gateways.
- **TypeScript**: Enforces strong data contracts from the database schema up to the UI templates, preventing runtime null-reference crashes.
- **Tailwind CSS**: Offers utility-first, performant styling with close to zero overhead in compilation bundles.
- **Ant Design (antd)**: Accelerates development by offering a premium, configurable UI component library containing ready-made sliders, layouts, pagination selectors, and grids.
- **Supabase (PostgreSQL)**: Serves as the database. Chosen for its native JSON support, fast query capability, and seamless developer onboarding.
- **TanStack Query**: Manages asynchronous server data. Eliminates boilerplate state-handling (loading, error, refetching) and minimizes backend load through intelligent client-side caching.
- **Redux Toolkit**: Dedicated exclusively to visual/client global state (such as the compare list slots and active filter states), keeping it clearly separated from server cache.
- **Axios**: Standardizes HTTP client interactions with cleaner request interceptors and base configurations compared to native `fetch`.

### 3. What did you delegate to AI tools vs. do manually? Where did the tools help most? Where did they get in the way?

- **Delegated to AI**:
  - Generation of complete directory structure layout.
  - Writing TypeScript data structures representing cars and customer reviews.
  - Creating sample Next.js Route Handlers with filtering, sorting, and pagination logic.
  - Formulating custom hook patterns combining Axios client calls with TanStack Query keys.
- **Done Manually**:
  - Organizing boundaries between Client and Server components.
  - Crafting security policies to ensure `SUPABASE_SERVICE_ROLE_KEY` stays strictly within the server context.
  - Integrating custom state limits (e.g., verifying that the active car comparison slot remains limited to 2 vehicles).
- **Where the tools helped most**: Rapid boilerplate output. Generating TypeScript interfaces and Route Handlers by hand is tedious; AI saved significant time by outputting fully typed, clean templates in seconds.
- **Where the tools got in the way**: Parity issues. AI occasionally mixed older page-routing patterns (`pages/api/...`) with App Router paradigms (`app/api/.../route.ts`), needing manual verification of parameters and NextResponse routing conventions.

### 4. If you had another 4 hours, what would you add?

- **Supabase Migrations & Seeds**: Write SQL migration scripts to set up the `cars` table and seed it with 50+ detailed mock vehicles so developers have a fully working sandbox.
- **Global Ant Design Theme Customization**: Wire a theme configuration provider (`ConfigProvider`) to align Ant Design colors (e.g., primary buttons) directly with Tailwind's brand colors.
- **Optimistic Updates & Skeleton Loaders**: Add layout skeletons (`<Skeleton />` from Antd) for the Results Page and write TanStack Query mutation structures supporting optimistic UI updates during comparison changes.
- **Mock Database Fallback**: Implement local MSW (Mock Service Worker) handlers or file-system-based fallback JSON structures to allow offline UI development without database dependencies.

### 5. How to Start the Project

Follow these commands to configure the workspace and start the local development environment:

```bash
# 1. Install all dependencies
npm install

# 2. Setup the environment variables file
cp .env.example .env.local
# (Make sure to populate NEXT_PUBLIC_API_BASE_URL, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY inside .env.local)

# 3. Spin up the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
