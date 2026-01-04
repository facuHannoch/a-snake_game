# Snake Game

A classic Snake arcade game built with Next.js. Play online and compete for the highest score!

## 🎮 Play Now

[Play Snake Game](https://snakegame.pages.dev)

## 📋 Features

- Classic 15x15 grid gameplay
- Smooth controls with arrow keys or WASD
- Real-time score tracking
- Game over detection (walls & self-collision)
- Responsive design
- Analytics tracking with Umami

## 🎯 How to Play

1. Press any key or click "Start Game" to begin
2. Use **Arrow Keys** or **WASD** to move the snake
3. Eat the red food to grow and increase your score
4. Don't hit the walls or yourself!
5. Press **Space** to restart when game is over

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest & Playwright
- **Hosting**: Cloudflare Pages
- **Analytics**: Umami

## 📦 Project Structure

```
webapp/
├── app/
│   ├── page.tsx          # Main game component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── __tests__/            # Jest unit tests
├── e2e/                  # Playwright E2E tests
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd webapp
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## ✅ Testing

### Unit Tests (Jest)
```bash
npm test
```

### E2E Tests (Playwright)
```bash
npx playwright test
```

## 📊 Architecture

- **Client-side rendering** with React hooks (useState, useEffect, useCallback)
- **Input handling** with keyboard event listeners
- **Game loop** using setInterval for consistent gameplay
- **Collision detection** for walls and self-collision
- **Analytics** tracking via Umami script

## 📝 License

MIT

## 👤 Author

Your Name

---

Built as a quick-to-practice project.
