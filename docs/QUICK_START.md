# Quick Start Guide

Get up and running with the Micro-Frontends architecture in 5 minutes!

## Prerequisites

Make sure you have Node.js and npm installed:
```bash
node --version  # Should be v22.x or compatible
npm --version   # Should be v10.x or compatible
```

## Installation

1. **Clone the repository** (if not already done)
2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### Option 1: Run Everything at Once (Recommended for Demo)

```bash
npm run start:all
```

This single command will start all four applications simultaneously:
- 🏠 **Host Application**: http://localhost:4200
- 🅰️ **Angular Child**: http://localhost:4201
- ⚛️ **React Child**: http://localhost:4202
- 💚 **Vue Child**: http://localhost:4203

**Wait for all applications to compile** (usually takes 30-60 seconds on first run).

### Option 2: Run Applications Individually

If you prefer to see each application's output separately:

```bash
# Terminal 1 - Host
npm run start:host

# Terminal 2 - Angular Child
npm run start:angular-child

# Terminal 3 - React Child
npm run start:react-child

# Terminal 4 - Vue Child
npm run start:vue-child
```

## Accessing the Application

1. **Open your browser** and navigate to: http://localhost:4200
2. **You should see** the Host Application home page
3. **Navigate using the menu**:
   - **Home**: Overview of the architecture
   - **Angular Child**: Angular micro-frontend with dashboard and features
   - **React Child**: React micro-frontend with tabbed interface
   - **Vue Child**: Vue micro-frontend with interactive demos

## What to Explore

### Home Page
- Overview of the micro-frontends architecture
- Cards for each child application
- Architecture information

### Angular Child (`/angular-child`)
- **Dashboard**: Statistics and metrics
- **Features**: Capabilities showcase
- Notice the Angular-specific styling and routing

### React Child (`/react-child`)
- **Overview Tab**: Introduction and key highlights
- **Features Tab**: React-specific features
- **Statistics Tab**: Performance metrics and tech stack
- Interactive tabbed interface

### Vue Child (`/vue-child`)
- **Overview Tab**: Vue introduction
- **Features Tab**: Vue capabilities
- **Interactive Demo Tab**: 
  - Counter with increment/decrement
  - Live input with reactive binding
  - Dynamic list with add/remove items

## Verifying It Works

✅ **All applications are working correctly if:**
1. The host application loads at http://localhost:4200
2. Navigation between pages works smoothly
3. Each child application displays its content
4. No console errors in browser developer tools

## Common Issues

### Issue: "Cannot GET /remoteEntry.js"
**Solution**: One or more child applications are not running. Make sure all four applications are started.

### Issue: Port already in use
**Solution**: 
```bash
# Find and kill the process using the port (Windows)
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Or change the port in package.json and webpack configs
```

### Issue: Compilation errors
**Solution**: 
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Explore the code**:
   - `projects/host/` - Host application
   - `projects/angular-child/` - Angular micro-frontend
   - `projects/react-child/` - React micro-frontend
   - `projects/vue-child/` - Vue micro-frontend

2. **Make changes**:
   - Edit any component
   - Save the file
   - See hot reload in action

3. **Read the documentation**:
   - [README.md](./README.md) - Full documentation
   - [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup guide

## Building for Production

```bash
npm run build
```

This will create optimized production builds in the `dist/` directory.

## Need Help?

- Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed configuration
- Review the [README.md](./README.md) for architecture overview
- Check browser console for error messages
- Ensure all dependencies are installed correctly

---

**Happy coding! 🚀**

