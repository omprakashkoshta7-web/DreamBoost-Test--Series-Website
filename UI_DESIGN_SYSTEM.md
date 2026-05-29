# Tailwind CSS UI Design System

## 🎨 Overview

This project uses **Tailwind CSS** for styling with a professional, modern design system. All components are **fully mobile responsive** and follow best practices for accessibility and user experience.

## 📦 Components

### Button Component
**File:** `src/shared/components/Button.tsx`

```tsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button isLoading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

### Card Component
**File:** `src/shared/components/Card.tsx`

```tsx
<Card title="Card Title" subtitle="Optional subtitle">
  <p>Card content goes here</p>
</Card>

<Card header={<h3>Custom Header</h3>} footer={<Button>Action</Button>}>
  Content
</Card>
```

### Input Component
**File:** `src/shared/components/Input.tsx`

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  icon="✉️"
  error="Invalid email"
  helperText="Enter a valid email address"
  required
/>
```

### Badge Component
**File:** `src/shared/components/Badge.tsx`

```tsx
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
```

### Alert Component
**File:** `src/shared/components/Alert.tsx`

```tsx
<Alert variant="info" title="Info">Message</Alert>
<Alert variant="success" title="Success">Message</Alert>
<Alert variant="warning" title="Warning">Message</Alert>
<Alert variant="danger" title="Error">Message</Alert>
```

### Modal Component
**File:** `src/shared/components/Modal.tsx`

```tsx
<Modal
  isOpen={isOpen}
  title="Modal Title"
  onClose={() => setIsOpen(false)}
  size="md"
  footer={<Button onClick={handleSubmit}>Save</Button>}
>
  Content goes here
</Modal>
```

### Loader Component
**File:** `src/shared/components/Loader.tsx`

```tsx
<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />
<Loader fullScreen label="Loading..." />
```

## 🎯 Color System

### Primary Colors
- `primary-50` to `primary-900` - Main brand colors
- Used for primary actions, links, and focus states

### Secondary Colors
- `secondary-50` to `secondary-900` - Neutral colors
- Used for backgrounds, text, and UI structure

### Status Colors
- `green` - Success/positive actions
- `yellow` - Warning states
- `red` - Danger/error states
- `blue` - Info/informational

## 📏 Spacing Scale

Tailwind's standard spacing scale (4px base):
```
p-1 = 4px
p-2 = 8px
p-3 = 12px
p-4 = 16px
p-6 = 24px
p-8 = 32px
p-12 = 48px
p-16 = 64px
```

## 🎭 Responsive Breakpoints

```
sm: 640px
md: 768px (default mobile breakpoint)
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Usage
```tsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg">
  Content
</div>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</div>
```

## 🎬 Animations

### Built-in Animations
- `animate-fade-in` - Fade in effect (300ms)
- `animate-slide-up` - Slide up from bottom (400ms)
- `animate-bounce-soft` - Gentle bounce (2s infinite)
- `animate-spin` - Rotation animation (used in loaders)

### Transition Classes
```tsx
<div className="transition-fast">Quick transition (150ms)</div>
<div className="transition-base">Base transition (300ms)</div>
<div className="transition-slow">Slow transition (500ms)</div>
```

## 🌍 Mobile Responsiveness

### Layout Pattern
```tsx
// Sidebar + Main Content Layout
<div className="flex h-screen bg-secondary-50">
  {/* Sidebar: hidden on mobile, shown on desktop */}
  <aside className="-translate-x-full md:translate-x-0 md:static">
    Navigation
  </aside>

  {/* Main Content */}
  <div className="flex-1 flex flex-col overflow-hidden">
    <header>Header</header>
    <main className="flex-1 overflow-y-auto">Content</main>
  </div>

  {/* Mobile Overlay */}
  {sidebarOpen && (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50" />
  )}
</div>
```

### Safe Area Support
```tsx
// For notch/safe area on mobile
<div className="pt-safe pb-safe">Content</div>
```

## 🎨 Tailwind Configuration

**File:** `tailwind.config.ts`

Key customizations:
- Custom color palette with primary/secondary
- Extended shadows (soft, medium, lg)
- Custom animations (fade-in, slide-up, bounce-soft)
- Safe area spacing for mobile

## 📝 Best Practices

### 1. Use Component Classes
```tsx
// ✅ Good - Use semantic class names
<div className="card">
  <div className="card-header">Title</div>
  <div className="card-body">Content</div>
</div>

// ❌ Avoid - Too many inline classes
<div className="bg-white rounded-lg shadow-soft">
  <div className="px-6 py-4 border-b">Title</div>
</div>
```

### 2. Responsive Design
```tsx
// ✅ Good - Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// ❌ Avoid - Desktop first
<div className="grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
```

### 3. Consistent Spacing
```tsx
// ✅ Good - Use spacing scale
<div className="p-4 md:p-6">

// ❌ Avoid - Arbitrary spacing
<div style={{padding: '18px'}}>
```

### 4. Color Consistency
```tsx
// ✅ Good - Use predefined colors
<Button variant="primary" />

// ❌ Avoid - Arbitrary colors
<Button style={{backgroundColor: '#0ea5e9'}} />
```

## 🚀 Performance Tips

1. **Tree-shaking**: Tailwind automatically purges unused styles
2. **Lazy Loading**: Components load only when used
3. **CSS Size**: ~100KB (minified + gzipped)
4. **No Runtime**: Tailwind is compiled, not evaluated at runtime

## 📚 Additional Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)
- [Design System](./StyleGuide.tsx)

## 🔧 Development

To view the style guide and all component examples:

```tsx
import StyleGuide from '@shared/components/StyleGuide';

// In your routes or page
<StyleGuide />
```

## 🎓 Learning Path

1. Start with basic components (Button, Card)
2. Learn responsive patterns (grid, flex)
3. Implement full pages (Dashboard, Profile)
4. Build custom components using the system

---

**Note**: All components are fully typed with TypeScript for excellent IDE support and type safety.
