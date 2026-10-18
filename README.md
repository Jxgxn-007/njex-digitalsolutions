# NJEX — Software & Digital Solutions

Company portfolio website for NJEX.

## Project Structure

```
njex-portfolio/
├── frontend/                     # Frontend web application
│   ├── public/                   # Static assets
│   ├── src/                      # React source code
│   │   ├── main.tsx              # Main application entry & components
│   │   ├── styles.css            # Stylesheet & design tokens
│   │   └── teamData.ts           # Centralized team data configuration
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend package configuration
│   └── tsconfig.json             # TypeScript configuration
├── package.json                  # Root orchestration scripts
└── README.md                     # Documentation
```

## Quick Start

### Running from the Root Directory
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Running from the `frontend/` Directory
```bash
cd frontend
npm run dev
npm run build
```
