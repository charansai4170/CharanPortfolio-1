# Portfolio Website - Architecture Overview

## Overview

This is a professional portfolio website for Charan Thota, a Software and Machine Learning Engineer. The application is built as a full-stack TypeScript project with a React frontend and Express backend, featuring a modern tech stack with shadcn/ui components, Tailwind CSS for styling, and Drizzle ORM for database management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React 18 with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: React Router DOM for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: Extensive use of Radix UI primitives through shadcn/ui
- **Styling System**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Background System**: Dynamic gradient background with mouse interaction effects
- **State Management**: TanStack Query for API state, React hooks for local state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with React plugin and custom alias configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with tsx, production builds with esbuild
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Database Schema
- **Users Table**: Basic user structure with id, username, and password fields
- **Migrations**: Managed through Drizzle Kit with schema-first approach
- **Type Safety**: Full TypeScript integration with Drizzle Zod for validation

### UI/UX Components
- **Portfolio Sections**: Hero with 3D animations, experience cards, skill bars, project showcases
- **Interactive Elements**: Animated skill progress bars, hover effects, smooth scrolling navigation
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Proper semantic HTML, ARIA labels, keyboard navigation support

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests through the storage interface
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Type-safe data flows back through the query client
5. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **@three/fiber**: React renderer for Three.js 3D graphics
- **drizzle-orm**: Type-safe ORM with excellent TypeScript support

### Development Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Full type safety across frontend, backend, and shared code
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **ESBuild**: Fast bundler for production server builds

### UI/Styling
- **shadcn/ui**: Modern component library built on Radix UI and Tailwind
- **class-variance-authority**: Type-safe component variant management
- **tailwind-merge**: Intelligent Tailwind class merging utility

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with instant updates
- **Type Checking**: Continuous TypeScript compilation
- **Database**: Uses DATABASE_URL environment variable for connection
- **Session Storage**: PostgreSQL-backed session management

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command
- **Static Assets**: Served through Express static middleware in production

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Build Process**: Separate build commands for client and server
- **Node.js**: ESM modules throughout the application
- **Deployment**: Single artifact deployment with both frontend and backend

## Recent Changes (July 20, 2025)

### Major Architectural Updates
- **Replaced Wouter with React Router DOM**: Complete migration to React Router with proper Link components for navigation
- **New Background System**: Stripped all previous background animations and replaced with SimpleGradientBackground component featuring:
  - Plain white base background
  - Dynamic color-shifting gradient overlay that responds to mouse movement
  - Smooth color transitions between blue, purple, and pink hues
  - Interactive effects that change gradient direction and colors based on user interaction
- **Navigation System Overhaul**: Updated Navigation component to use React Router's Link components with proper route highlighting
- **Complete Page Structure**: Added Experience, Skills, and Contact pages with consistent design patterns
- **Route Structure**: Implemented exact route structure requested (Home "/", About "/about", Experience "/experience", Projects "/projects", Skills "/skills", Contact "/contact")

### Component Updates
- All pages now use consistent white background with subtle gradient overlays
- Removed InteractiveGradientBackground from individual pages in favor of global SimpleGradientBackground
- Updated color classes from `text-text` to `text-gray-900` for consistency
- Navigation now properly highlights active routes using React Router's useLocation hook

The architecture prioritizes type safety, developer experience, and maintainability while providing a modern, interactive portfolio website with dynamic visual effects that respond to user interaction.