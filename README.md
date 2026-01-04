Snake game

Simple project to practice and improve idea to deployment processes.


# 


Snake game

## 1) Idea
1. Idea + idea definition

A simple snake game. 15x15 grid.

## ==Research: See domain availability, maybe investigate market, etc== 

## Design

2. User flow:
	1. User enters
	2. Transparent screen showing controls
	3. Click on accept or press any of the keystrokes mentioned and it starts
	4. When it ends, just show the score and a "Play again" button below

3. UI: let model decide

4. Architecture



Architecture -> Stack

- Cloudflare pages
- Nextjs
- Github
- Umami

5. Initial tests



6. Project structure

```
a-snake_game/
	doc.md
	webapp/
		...
```
==I didn't define the project structure further. How will the website be structured? A landing page at /, and the app at /app, or just the game?????==


## Things

- Buy domain



## Set up

- Umami: Add a new website
- GitHub: Create new respository (or do this when building)


## Build

1. Set up project. Create new application
2. Set up testing
	1. Jest
		1. Create simple test
	2. Playwright
		1. Create simple test
3. Create simple test
4. Connect essential libraries
	1. Umami
5. Initializate new git repository, add and commit
6. Push to remote repository (create it if non existing)


### Process (manually done)

```bash
npx create-next-app@latest .

npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

```


#### Jest

1. Install packages
```sh
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

2. Generate basic
```sh
npm init jest@latest
```

3. Update `jest.config.ts`

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
```

4. `jest.setup.ts`

```ts
import '@testing-library/jest-dom'
```

5.  `package.json`

`{`
`"script": {`
```json
"test": "jest",
"test:watch": "jest --watch"
```

6. Create directory at root: `/__tests__`
7. Create a simple test in `page.test.tsx`

```ts
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('Renders page', () => {
  render(<Page />)
  expect(true).toBe(true)
})
```

#### Playwright


```
npm init playwright
```
- directory: `e2e`
- Don't add GA workflow
- Install Playwright browsers? Yes

`{`
`"script": {`
```json
"test:e2e": "npx playwright test",
"test:e2e:ui": "npx playwright test --ui",
"test:e2e:debug": "npx playwright test --debug"
```

- `playwright.config.ts`
```ts
const portRange = { min: 10000, max: 30000 };
const PORT = process.env.CI
  ? Math.floor(Math.random() * (portRange.max - portRange.min) + portRange.min)
  : 8088;

const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  // ... existing configuration
  

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  
  webServer: {
    // command: `PORT=${PORT} npm run dev`,
    command: `set PORT=${PORT} && npm run dev`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})

```

- `e2e/basic.spec.ts`
```ts
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
    await page.goto('/')  // Uses baseURL automatically
    expect(page).toBeDefined()
})
```

==next time try `npx create-next-app@latest with-jest with-playwright`==
	This does not work. Those are example templates, not additive options. You can only use one --example at a time, and they're full project templates.

## Set up Github

1. Create new repository
	1. Allow access to Cloudflare
2. Push changes
	1. 


> For this case, it seems better to have a single repository to where host all website, docs, applications, etc

**!!!**: 


# Redo

- Ensure ❌
	- API_KEY for pipelines
	- 

1. Idea ✅
2. Design ✅
3. Set up
	1. GitHub repository ✅
	2. Umami
4. Build
	1. Set up
		1. Project: `npx create-next-app@latest .`
		2. commit ❌
		3. Jest
			1. Install dependencies
			2. npm init
			3. Update `jest.config.ts`
			4. Create `jest.setup.ts`
			5. Update `package.json`
			6. Add simple test at `__tests__/page.test.tsx`
			7. Run test with `npm run test`
				1. (should pass)
		4. commit
		5. Playwright
			1. npm init
				1. Directory? e2e
				2. Add GA workflow? N
				3. Install Playwright browsers? Y
			2. Update `playwright.config.ts`
			3. Update `package.json`
			4. Add simple test at `basic.spec.ts`
			5. Run test with `npm run test:e2e`
				1. (should pass)
		6. commit
	2. Connect essential libraries
		1. Umami
	3. Coding
		1. Run website on localhost
		2. Give specification to AI. [[#Building with AI]]
		3. ??
5. Polishing
	1. App logo
		1. Create
		2. Resize it
		3. Move to `app/`
		4. (for Cloudflare Pages) 
			1. Move them to `public/`
			2. Add `icons: {icon: "/favicon.ico", apple: "/apple-icon.png"},` to metadata
	2. Export a metadata constant, for each page with different purpose, with:
		1. title, description
		2. openGraph
		3. twitter (cards)
		4. robots
		5. set `url` to website's url, and `images: [{ url: "" }]` for the opengraph image
6. Test and build
	1. (?) Update README.md
	2. Build application: `npm run build`
	3. Test application ❌
	4. Commit and push
7. Deploy to Cloudflare (via console)
	1. Create `wrangler.toml` file, with name, compatibility_flags, compatibility_date, and pages_build_output_dir
	2. Build, `npx @cloudflare/next-on-pages`
	3. Deploy, `npx wrangler pages deploy .vercel/output/static --project-name=asnakegame`



**For next iteration, we will deploy the application after step 4**

4.2.1

To add a script to the head, in Nextjs you use the `Script` component from `next/script`.

5.2.1
#### Metadata

When your page is indexed by search engines (Google, Bing, etc.):

**`title`** → The blue clickable link in search results
```
Snake Game - Classic Arcade Game Online
```

**`description`** → The gray text below the title in search results
```
Play the classic Snake game online for free. Control your snake 
with arrow keys or WASD, eat food to grow, and try to beat your...
```

It's also used for:
- **Browser tabs** (shows title)
- **Bookmarks** (shows title)
- **Social media shares** (but you'll also want OpenGraph metadata for that - we'll do that next)

**Optional/Not needed:**
- `keywords` - Minimal SEO value nowadays (Google ignores it)
- `authors/creator/publisher` - Only useful for blogs/articles/portfolios
- `formatDetection` - Only useful for pages with phone numbers/emails/addresses


**OpenGraph** (for Facebook, Discord, LinkedIn, etc.):
- Title, description, type, locale, siteName
- Note: `url` and `images` will be added once you have a domain

**Twitter Cards**:
- Large image card format
- Title and description

**robots**:
- Tells search engines they can index and follow links

==Once you deploy and have a URL, you can add:==
- `openGraph.url: "https://yourdomain.com"`
- `openGraph.images: [{ url: "/og-image.png" }]`
- `twitter.images: ["/og-image.png"]`


## Building with AI




## Pipelines


### Icon creation

Dependencies:
- AI model
- 

- Python
	- google

1. Obtain API KEY (set up facturation)





## 7. Deployment


### To deploy to Cloudflare Pages (via console)

1. Create a `wrangler.toml` file

```toml
name = "asnakegame"
compatibility_flags = ["nodejs_compat"]
compatibility_date = "2026-01-04"
pages_build_output_dir = ".vercel/output/static"
```

2. (optional) Update `package.json`
```json
    "pages:build": "wsl npx @cloudflare/next-on-pages",
    "pages:deploy": "npm run pages:build && npx wrangler pages deploy .vercel/output/static --project-name=asnakegame",
    "pages:dev": "wsl npx @cloudflare/next-on-pages --watch"
```


> If you don't have a name, and are going to use one of the ones they provide, maybe it's better to use the platform UI

### To deploy a Worker


(To Cloudflare pages)

1. Install Wrangler (Cloudflare's CLI tool) and authenticate

```bash
npm install -g wrangler
wrangler login
```

2. Create `wrangler.toml` in your project root

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
