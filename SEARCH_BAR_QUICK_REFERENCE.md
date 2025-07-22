# Search Bar - Quick Reference

## Core Styles
```css
/* Container */
bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-2xl

/* Input */
bg-transparent border-none text-white placeholder-gray-400 text-lg

/* Button */
bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700

/* Suggestion Chips */
px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
border border-blue-400/30 rounded-full backdrop-blur-md
hover:scale-105 hover:-translate-y-1
```

## Animations
```typescript
// Rotation: 8 seconds
setInterval(() => setCurrentSuggestionSet(prev => (prev + 1) % sets.length), 8000)

// Entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}

// Hover
whileHover={{ scale: 1.05, y: -2 }}
whileTap={{ scale: 0.95 }}

// Typing Speed
baseDelay: 80ms + random(40ms) + character bonuses
```

## Colors
- **Primary**: `blue-500` (rgb(59,130,246))
- **Secondary**: `purple-500` (rgb(147,51,234))
- **Background**: `white/10` (10% opacity)
- **Text**: `white`, `gray-400`, `gray-300`

## Component Props
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[][];
  className?: string;
}
```

## Usage
```tsx
<SearchBar 
  onSearch={(query) => handleSearch(query)}
  placeholder="Custom placeholder..."
/>
```