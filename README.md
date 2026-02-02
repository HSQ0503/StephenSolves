# StephenSolves

Math tutoring website for Stephen Schools, offering personalized tutoring from high school through graduate-level mathematics.

![StephenSolves](public/images/og-image.png)

## About

StephenSolves is the professional website for Stephen Schools, a math tutor with an M.S. in Mathematics from The Citadel and a B.A. in Mathematics from UNC Chapel Hill. The site showcases tutoring services, pricing, student reviews, and provides a contact form for booking consultations.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Email**: [Resend](https://resend.com/)
- **Content**: Markdown with [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Animations**: [AOS (Animate on Scroll)](https://michalsnik.github.io/aos/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Features

- Responsive design with dark mode support
- Contact form with email notifications via Resend
- Student reviews section
- Pricing tiers display
- SEO optimized with meta tags and sitemap
- Animated UI elements

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stephensolves.git
   cd stephensolves
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables:
   ```env
   RESEND_API_KEY=your_resend_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/contact/        # Contact form API route
│   ├── contact/            # Contact page + success page
│   ├── features/           # Services page
│   ├── pricing/            # Pricing page
│   └── reviews/            # Reviews page
├── config/                 # Site configuration (JSON)
│   ├── config.json         # Site settings
│   ├── menu.json           # Navigation
│   ├── social.json         # Social links
│   └── theme.json          # Colors & fonts
├── content/                # Markdown content
│   ├── pages/              # Static pages
│   └── sections/           # Homepage sections
├── layouts/
│   ├── components/         # Reusable UI components
│   ├── partials/           # Page sections
│   ├── shortcodes/         # MDX components
│   └── helpers/            # Utility components
├── lib/                    # Utility functions
├── styles/                 # CSS files
└── types/                  # TypeScript definitions
```

## Configuration

### Site Settings

Edit `src/config/config.json` to update:
- Site title and URL
- Logo and favicon
- Pagination settings
- Contact form settings

### Navigation

Edit `src/config/menu.json` to update navigation links.

### Theme

Edit `src/config/theme.json` to customize colors and fonts.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com) for email functionality |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the project and deploy the output:

```bash
npm run build
npm run start
```

## Pricing Structure

| Level | Per Hour | 5-Session Package |
|-------|----------|-------------------|
| High School | $45 | $200 |
| Undergraduate | $60 | $275 |
| Graduate | $80 | $375 |

## License

All rights reserved. This project is proprietary software for StephenSolves.

## Contact

- **Website**: [stephensolves.com](https://stephensolves.com)
- **Email**: stephen@stephensolves.com
