# Micro-Frontends Architecture with Module Federation

A comprehensive demonstration of micro-frontends architecture using Webpack Module Federation, featuring an Angular host application with Angular, React, and Vue child applications.

## 🏗️ Architecture Overview

This project demonstrates a **Module Federation** architecture where:

- **Host Application (Angular)**: Main container application that orchestrates all micro-frontends
- **Angular Child**: Angular micro-frontend with shared dependencies
- **React Child**: React micro-frontend integrated via Module Federation
- **Vue Child**: Vue micro-frontend integrated via Module Federation

All child applications are **nested applications** running within the main Angular host, sharing common dependencies where possible.

## 📁 Project Structure

```
micro-frontends/
├── projects/
│   ├── host/                    # Angular Host Application (Port 4200)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── home/       # Home component
│   │   │   │   ├── wrappers/   # React & Vue wrapper components
│   │   │   │   ├── app.component.*
│   │   │   │   ├── app.config.ts
│   │   │   │   └── app.routes.ts
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.less
│   │   ├── webpack.config.js
│   │   └── tsconfig.app.json
│   │
│   ├── angular-child/           # Angular Child Application (Port 4201)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── features/
│   │   │   │   ├── app.component.*
│   │   │   │   ├── app.module.ts
│   │   │   │   └── app.routes.ts
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.less
│   │   ├── webpack.config.js
│   │   └── tsconfig.app.json
│   │
│   ├── react-child/             # React Child Application (Port 4202)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── App.css
│   │   │   ├── index.tsx
│   │   │   └── index.css
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── webpack.config.js
│   │   └── tsconfig.json
│   │
│   └── vue-child/               # Vue Child Application (Port 4203)
│       ├── src/
│       │   ├── App.vue
│       │   ├── main.js
│       │   └── index.css
│       ├── public/
│       │   └── index.html
│       └── webpack.config.js
│
├── angular.json                 # Angular workspace configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.10.0 or compatible)
- npm (v10.9.0 or compatible)

### Installation

```bash
npm install
```

### Running the Applications

#### Option 1: Run All Applications Simultaneously (Recommended)

```bash
npm run start:all
```

This will start all four applications:
- Host (Angular): http://localhost:4200
- Angular Child: http://localhost:4201
- React Child: http://localhost:4202
- Vue Child: http://localhost:4203

#### Option 2: Run Applications Individually

```bash
# Start Host Application
npm run start:host

# Start Angular Child (in a new terminal)
npm run start:angular-child

# Start React Child (in a new terminal)
npm run start:react-child

# Start Vue Child (in a new terminal)
npm run start:vue-child
```

### Building for Production

```bash
# Build all applications
npm run build

# Or build individually
npm run build:host
npm run build:angular-child
npm run build:react
npm run build:vue
```

## 🔧 Module Federation Configuration

### Shared Dependencies

The following dependencies are shared across applications:

**Angular Applications (Host & Angular Child):**
- `@angular/core`
- `@angular/common`
- `@angular/router`
- `rxjs`
- `zone.js`

**React Application:**
- `react`
- `react-dom`

**Vue Application:**
- `vue`

### Remote Entry Points

- **Angular Child**: `http://localhost:4201/remoteEntry.js`
  - Exposes: `./Module`, `./Component`
- **React Child**: `http://localhost:4202/remoteEntry.js`
  - Exposes: `./App`
- **Vue Child**: `http://localhost:4203/remoteEntry.js`
  - Exposes: `./App`

## 🎯 Features

### Host Application (Angular)
- Modern Angular 19 with standalone components
- Routing configuration for all micro-frontends
- Wrapper components for React and Vue integration
- Beautiful gradient UI with responsive design

### Angular Child Application
- Module-based Angular application
- Dashboard with statistics
- Features showcase
- Shared Angular dependencies with host

### React Child Application
- React 18 with hooks
- Tabbed interface (Overview, Features, Statistics)
- Performance metrics display
- Modern CSS styling

### Vue Child Application
- Vue 3 with Composition API
- Interactive demos (Counter, Live Input, Dynamic List)
- Reactive data binding examples
- Single File Components (SFC)

## 🛠️ Technology Stack

- **Angular**: 19.2.0
- **React**: 18.x
- **Vue**: 3.x
- **TypeScript**: 5.7.2
- **Webpack**: 5.x
- **Module Federation**: Webpack 5 native
- **@angular-architects/module-federation**: For Angular integration
- **LESS**: For Angular styling
- **CSS3**: For React and Vue styling

## 📝 Key Concepts

### Module Federation
Module Federation allows multiple separate builds to form a single application. These separate builds act like containers and can expose and consume code between builds, creating a unified application.

### Shared Dependencies
Dependencies marked as `shared` in the Module Federation configuration are loaded only once and shared across all micro-frontends, reducing bundle size and improving performance.

### Nested Applications
All child applications run as nested applications within the Angular host, allowing for:
- Independent development and deployment
- Technology diversity (Angular, React, Vue)
- Shared runtime and dependencies
- Unified user experience

## 🔍 Development Notes

### Port Configuration
- Host: 4200
- Angular Child: 4201
- React Child: 4202
- Vue Child: 4203

### CORS Configuration
All webpack dev servers are configured with CORS headers to allow cross-origin requests between micro-frontends.

### Hot Module Replacement (HMR)
All applications support HMR for fast development experience.

## 📚 Documentation

This project includes comprehensive documentation:

- **[INDEX.md](./INDEX.md)** - Documentation index and navigation guide
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute quick start guide ⭐
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture documentation
- **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - Visual diagrams and representations
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Configuration and setup guide
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Verification checklist

**New to this project?** Start with [QUICK_START.md](./QUICK_START.md)!

## 📚 Additional Resources

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Angular Module Federation](https://www.angulararchitects.io/en/aktuelles/the-microfrontend-revolution-module-federation-in-webpack-5/)
- [Micro-Frontends](https://micro-frontends.org/)

## 🤝 Contributing

This is a demonstration project. Feel free to fork and experiment with different configurations and features.

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

---

**Built with ❤️ using Module Federation**

**Documentation:** 9 comprehensive guides | **Lines of Code:** 3000+ | **Applications:** 4 | **Frameworks:** 3
