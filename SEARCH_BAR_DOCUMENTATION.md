# Search Bar Design & Style Documentation

## Overview
The search bar component uses a modern glassmorphism design with intelligent suggestion chips, smooth animations, and AI-like typing effects. Built with React, TypeScript, Framer Motion, and Tailwind CSS.

## Visual Design System

### Container Styling
```css
/* Main container with backdrop blur and glassmorphism */
bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-2xl

/* Dynamic glow effect when typing */
boxShadow: "0 0 20px rgba(59,130,246,0.3)"
borderColor: "rgba(59,130,246,0.5)"
```

### Input Field Styling
```css
/* Transparent input with custom focus states */
bg-transparent border-none text-white placeholder-gray-400 text-lg focus:ring-0 focus:outline-none
```

### Button Styling
```css
/* Gradient submit button */
bg-gradient-to-r from-blue-500 to-purple-600 
hover:from-blue-600 hover:to-purple-700 
text-white px-6 py-2 rounded-xl 
transition-all duration-300 disabled:opacity-50
```

## Suggestion Chips Design

### Container Layout
```css
/* Chip container with responsive flexbox */
mb-4 flex flex-wrap justify-center gap-2
```

### Individual Chip Styling
```css
/* Glassmorphism chips with gradient backgrounds */
px-4 py-2 
bg-gradient-to-r from-blue-500/20 to-purple-500/20 
border border-blue-400/30 
rounded-full text-sm text-gray-300 
hover:text-white transition-all duration-300 
backdrop-blur-md

/* Hover effects */
hover:scale-105 hover:-translate-y-1 
hover:bg-gradient-to-r hover:from-blue-500/40 hover:to-purple-500/40 
hover:border-blue-400/60 
hover:shadow-lg hover:shadow-blue-400/25
```

### Try Asking Label
```css
/* Icon and text styling */
flex items-center gap-2 text-blue-400 mb-2
text-sm font-medium
```

## Animation System

### Rotation Animation (8-second cycle)
```typescript
useEffect(() => {
  if (!isTyping && searchQuery.length === 0) {
    const interval = setInterval(() => {
      setCurrentSuggestionSet(prev => (prev + 1) % suggestionSets.length);
    }, 8000); // 8-second rotation
    
    return () => clearInterval(interval);
  }
}, [isTyping, searchQuery, suggestionSets.length]);
```

### Container Transitions
```typescript
// Suggestion container fade animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
```

### Chip Animations
```typescript
// Individual chip entrance animation
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: index * 0.1 }}  // Staggered by 100ms

// Hover interactions
whileHover={{ scale: 1.05, y: -2 }}  // Lift on hover
whileTap={{ scale: 0.95 }}           // Press feedback
```

### Auto-Typing Animation
```typescript
// Human-like typing simulation
const baseDelay = 80;                    // Base typing speed
const variation = Math.random() * 40 - 20; // Random variance

// Character-specific delays
if (char && /[A-Z]/.test(char)) delay += 20;      // Capitals slower
if (char && /[0-9]/.test(char)) delay += 15;      // Numbers slower  
if (char && /[!@#$%^&*()_+{}|:"<>?]/.test(char)) delay += 30; // Symbols slowest
```

### Typing Indicator
```typescript
// Blinking cursor animation
<motion.span
  animate={{ opacity: [1, 0, 1] }}
  transition={{ duration: 0.5, repeat: Infinity }}
>
  |
</motion.span>
```

## Color Palette

### Primary Colors
- **Blue Primary**: `rgb(59, 130, 246)` - Main accent color
- **Purple Secondary**: `rgb(147, 51, 234)` - Gradient complement
- **White Overlay**: `rgba(255, 255, 255, 0.1)` - Glassmorphism base

### Opacity Levels
- **Container Background**: `white/10` (10% opacity)
- **Chip Background**: `blue-500/20` to `purple-500/20` (20% opacity)
- **Hover States**: `blue-500/40` to `purple-500/40` (40% opacity)
- **Border**: `white/20` and `blue-400/30` (20-30% opacity)

### Text Colors
- **Primary Text**: `text-white`
- **Placeholder**: `text-gray-400` 
- **Suggestions**: `text-gray-300` hover `text-white`
- **Accent**: `text-blue-400`

## Layout & Spacing

### Container Spacing
```css
/* Main container padding */
p-4 md:p-6

/* Input internal spacing */
px-4 py-3

/* Chip spacing */
px-4 py-2
gap-2 (8px between elements)
mb-4 (16px bottom margin)
```

### Responsive Breakpoints
- **Mobile**: Base styling, single column chips
- **MD+**: Increased padding (`md:p-6`), better chip layout

## Interactive States

### Input Focus
- Blue glow shadow: `0 0 20px rgba(59,130,246,0.3)`
- Enhanced border: `rgba(59,130,246,0.5)`
- Smooth transition: `transition-all duration-300`

### Button States
- **Default**: Blue-purple gradient
- **Hover**: Darker gradient variants
- **Disabled**: 50% opacity
- **Loading**: Maintains disabled state

### Chip Interactions
- **Hover**: Scale up 105%, translate up 2px, enhanced glow
- **Click**: Scale down 95%, triggers typing animation
- **Focus**: Same as hover state

## Timing Configuration

### Animation Durations
- **Suggestion rotation**: 8000ms (8 seconds)
- **Fade transitions**: 300ms
- **Hover animations**: 300ms
- **Stagger delay**: 100ms per chip
- **Typing base speed**: 80ms per character

### Typing Delays
- **Base delay**: 80ms
- **Random variation**: ±20ms
- **Uppercase bonus**: +20ms
- **Number bonus**: +15ms
- **Symbol bonus**: +30ms
- **Minimum delay**: 40ms
- **Auto-submit delay**: 500ms after completion

## Accessibility Features

### Keyboard Navigation
- Enter key submits search
- Tab navigation through interactive elements
- Focus indicators on all interactive elements

### Screen Reader Support
- Semantic HTML structure
- ARIA labels on icon buttons
- Descriptive placeholder text
- Live region updates for dynamic content

### Motion Preferences
- Respects `prefers-reduced-motion`
- Fallback states for animation-sensitive users
- Essential animations only for core functionality

## Component Props Interface

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;    // Required search callback
  placeholder?: string;                 // Custom placeholder text
  suggestions?: string[][];             // Custom suggestion sets
  className?: string;                   // Additional CSS classes
}
```

## Usage Examples

### Basic Usage
```tsx
<SearchBar 
  onSearch={(query) => handleSearch(query)}
/>
```

### Custom Placeholder
```tsx
<SearchBar 
  onSearch={(query) => handleSearch(query)}
  placeholder="Search projects, skills, or experience..."
/>
```

### Custom Suggestions
```tsx
const customSuggestions = [
  ["Custom suggestion 1", "Custom suggestion 2"],
  ["Another set", "More suggestions"]
];

<SearchBar 
  onSearch={(query) => handleSearch(query)}
  suggestions={customSuggestions}
/>
```

### With Additional Styling
```tsx
<SearchBar 
  onSearch={(query) => handleSearch(query)}
  className="max-w-4xl mx-auto my-8"
/>
```

## Technical Dependencies

### Required Packages
- `react` - Core React functionality
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `@/components/ui/button` - Button component
- `@/components/ui/input` - Input component

### CSS Framework
- `tailwindcss` - Utility-first CSS framework
- Custom backdrop-blur utilities
- Gradient and shadow utilities

## Performance Considerations

### Optimization Techniques
- `useCallback` for event handlers
- `useMemo` for suggestion sets
- Cleanup of intervals in `useEffect`
- Minimal re-renders with proper dependencies

### Animation Performance
- GPU-accelerated transforms (`scale`, `translate`)
- Opacity animations over color changes
- `will-change` hints for smooth animations
- Debounced typing simulation

This documentation provides complete details for implementing and customizing the search bar component with consistent design and animations.