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
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: Extensive use of Radix UI primitives through shadcn/ui
- **Styling System**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **3D Graphics**: React Three Fiber for 3D hero animations
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

## Recent Changes: Latest modifications with dates

**January 20, 2025:**
- Completely removed all background animations, gradients, and interactive effects
- Replaced complex gradient backgrounds with clean white/gray backgrounds  
- Simplified all UI components by removing backdrop-blur and transparency effects
- Streamlined navigation to focus on single-page scrolling experience
- Cleaned up CSS animations and removed floating/glow effects
- Organized content flow: Home → About → Experience → Projects → Skills → Contact
- Ensured consistent white background styling across all pages and sections

The architecture now prioritizes clean design, readability, and performance while maintaining type safety and developer experience. The portfolio presents a professional, minimal aesthetic suitable for showcasing technical expertise without distracting visual effects.