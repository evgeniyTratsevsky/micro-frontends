# Troubleshooting Guide

Common issues and their solutions when working with this Module Federation architecture.

## Table of Contents
1. [Installation Issues](#installation-issues)
2. [Runtime Errors](#runtime-errors)
3. [Build Issues](#build-issues)
4. [Development Server Issues](#development-server-issues)
5. [Module Federation Specific](#module-federation-specific)
6. [Performance Issues](#performance-issues)

---

## Installation Issues

### Issue: npm install fails
```
Error: ENOENT: no such file or directory
```

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Peer dependency warnings
```
npm WARN peer dependency warnings
```

**Solution:**
These are usually safe to ignore in development. If issues persist:
```bash
npm install --legacy-peer-deps
```

---

## Runtime Errors

### Issue: "Cannot find remote module"
```
Error: Cannot find module 'angularChild/Module'
```

**Cause:** The child application is not running or not accessible.

**Solution:**
1. Ensure all applications are running:
   ```bash
   npm run start:all
   ```
2. Check that each application is accessible:
   - http://localhost:4200 (Host)
   - http://localhost:4201 (Angular Child)
   - http://localhost:4202 (React Child)
   - http://localhost:4203 (Vue Child)

3. Check browser console for specific errors
4. Verify webpack dev server is running without errors

### Issue: "Zone.js has detected that ZoneAwarePromise has been overwritten"
```
Zone.js has detected that ZoneAwarePromise has been overwritten
```

**Cause:** Multiple instances of Zone.js are loaded.

**Solution:**
Ensure `zone.js` is marked as singleton in webpack config:
```javascript
shared: {
  'zone.js': { 
    singleton: true, 
    strictVersion: true,
    eager: true 
  }
}
```

### Issue: "Shared module is not available for eager consumption"
```
Shared module is not available for eager consumption
```

**Cause:** Shared modules are not loaded before they're needed.

**Solution:**
Add `eager: true` to shared dependencies in host webpack config:
```javascript
shared: {
  "@angular/core": { 
    singleton: true, 
    eager: true  // Add this
  }
}
```

### Issue: React/Vue app not rendering
```
Container element exists but app doesn't render
```

**Solution:**
1. Check browser console for errors
2. Verify the mount function is exported:
   ```typescript
   // React/Vue App
   export const mount = (el: HTMLElement) => {
     // mounting logic
   };
   ```
3. Check wrapper component is calling mount correctly
4. Verify the remote entry is accessible

---

## Build Issues

### Issue: TypeScript compilation errors
```
Error: TS2307: Cannot find module
```

**Solution:**
1. Check `tsconfig.json` paths are correct
2. Ensure declaration files exist:
   ```bash
   # Create if missing
   touch projects/host/src/decl.d.ts
   ```
3. Add module declarations:
   ```typescript
   declare module 'remoteName/Module' {
     // type definitions
   }
   ```

### Issue: LESS compilation errors
```
Error: Cannot find module 'less'
```

**Solution:**
```bash
npm install --save-dev less
```

### Issue: Webpack build fails
```
Error: Module not found
```

**Solution:**
1. Check webpack config paths are correct
2. Verify entry points exist
3. Check resolve.extensions includes all file types:
   ```javascript
   resolve: {
     extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue']
   }
   ```

---

## Development Server Issues

### Issue: Port already in use
```
Error: Port 4200 is already in use
```

**Solution (Windows):**
```powershell
# Find process using port
netstat -ano | findstr :4200

# Kill process
taskkill /PID <PID> /F
```

**Solution (macOS/Linux):**
```bash
# Find and kill process
lsof -ti:4200 | xargs kill -9
```

**Alternative:** Change port in `angular.json` or `webpack.config.js`

### Issue: Hot reload not working
```
Changes don't reflect in browser
```

**Solution:**
1. Check webpack dev server is running in watch mode
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart dev server
4. Check file is actually being saved
5. Try hard refresh (Ctrl+Shift+R)

### Issue: CORS errors
```
Access to fetch at 'http://localhost:4201/remoteEntry.js' blocked by CORS
```

**Solution:**
Ensure webpack dev server has CORS headers:
```javascript
devServer: {
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}
```

---

## Module Federation Specific

### Issue: Version mismatch errors
```
Shared module version mismatch
```

**Solution:**
1. Check package.json versions match across apps
2. Use `requiredVersion: false` for more flexibility:
   ```javascript
   shared: {
     'react': { 
       singleton: true, 
       requiredVersion: false 
     }
   }
   ```
3. Or align versions:
   ```bash
   npm install react@18.2.0 --save-exact
   ```

### Issue: Remote entry not loading
```
Failed to fetch http://localhost:4201/remoteEntry.js
```

**Solution:**
1. Verify child application is running
2. Check URL is correct in webpack config
3. Test URL directly in browser
4. Check for network errors in DevTools
5. Verify webpack output includes remoteEntry.js:
   ```javascript
   plugins: [
     new ModuleFederationPlugin({
       filename: 'remoteEntry.js', // Check this
       // ...
     })
   ]
   ```

### Issue: Shared dependencies not working
```
Multiple instances of shared library loaded
```

**Solution:**
1. Ensure `singleton: true` in all configs
2. Check versions are compatible
3. Verify both host and remote have the dependency in shared config
4. Use `strictVersion: false` if needed:
   ```javascript
   shared: {
     'rxjs': { 
       singleton: true, 
       strictVersion: false 
     }
   }
   ```

---

## Performance Issues

### Issue: Slow initial load
```
Application takes too long to load
```

**Solution:**
1. Enable production mode for builds:
   ```bash
   npm run build
   ```
2. Check bundle sizes:
   ```bash
   npm run build -- --stats-json
   npx webpack-bundle-analyzer dist/host/stats.json
   ```
3. Implement lazy loading for routes
4. Optimize shared dependencies
5. Use CDN for common libraries

### Issue: Memory leaks
```
Application becomes slow over time
```

**Solution:**
1. Ensure proper cleanup in wrapper components:
   ```typescript
   ngOnDestroy() {
     if (this.unmountFn) {
       this.unmountFn(); // Clean up React/Vue
     }
   }
   ```
2. Check for event listener leaks
3. Use Chrome DevTools Memory profiler
4. Implement proper unsubscribe for observables

### Issue: Large bundle sizes
```
Bundle size too large
```

**Solution:**
1. Analyze bundle:
   ```bash
   npx webpack-bundle-analyzer dist/host/stats.json
   ```
2. Increase shared dependencies
3. Implement code splitting
4. Remove unused dependencies
5. Use tree shaking:
   ```javascript
   optimization: {
     usedExports: true,
     sideEffects: false
   }
   ```

---

## Debugging Tips

### Enable Verbose Logging

**Webpack:**
```javascript
// webpack.config.js
module.exports = {
  stats: 'verbose'
};
```

**Angular:**
```bash
ng serve --verbose
```

### Browser DevTools

1. **Network Tab**: Check remote entry loading
2. **Console**: Look for error messages
3. **Sources**: Debug with breakpoints
4. **Application**: Check local/session storage

### Source Maps

Ensure source maps are enabled:
```javascript
// webpack.config.js
devtool: 'source-map'
```

### Module Federation Debug

Add logging to webpack config:
```javascript
plugins: [
  new ModuleFederationPlugin({
    // ... config
  }),
  new webpack.DefinePlugin({
    'process.env.DEBUG_MF': JSON.stringify(true)
  })
]
```

---

## Common Patterns & Solutions

### Pattern: Testing Remote Modules Locally

**Problem:** Need to test without running all servers

**Solution:**
```javascript
// Use environment variables
const remotes = process.env.NODE_ENV === 'production' 
  ? {
      angularChild: "angularChild@https://prod.example.com/remoteEntry.js"
    }
  : {
      angularChild: "angularChild@http://localhost:4201/remoteEntry.js"
    };
```

### Pattern: Fallback for Failed Remote Load

**Problem:** Remote module fails to load

**Solution:**
```typescript
async ngOnInit() {
  try {
    const module = await loadRemoteModule({...});
    // Use module
  } catch (error) {
    console.error('Failed to load remote:', error);
    // Show fallback UI
    this.showFallback = true;
  }
}
```

### Pattern: Dynamic Remote URLs

**Problem:** Need different URLs per environment

**Solution:**
```typescript
// config.service.ts
export class ConfigService {
  getRemoteUrl(appName: string): string {
    return environment.remoteUrls[appName];
  }
}

// environment.ts
export const environment = {
  remoteUrls: {
    angularChild: 'http://localhost:4201/remoteEntry.js'
  }
};
```

---

## Getting Help

If you're still experiencing issues:

1. **Check the documentation:**
   - [README.md](./README.md)
   - [SETUP_GUIDE.md](./SETUP_GUIDE.md)
   - [ARCHITECTURE.md](./ARCHITECTURE.md)

2. **Check browser console** for detailed error messages

3. **Verify all dependencies** are installed correctly:
   ```bash
   npm list
   ```

4. **Try a clean install:**
   ```bash
   rm -rf node_modules package-lock.json dist
   npm install
   npm run start:all
   ```

5. **Check Node/npm versions:**
   ```bash
   node --version  # Should be v22.x
   npm --version   # Should be v10.x
   ```

---

## Useful Commands

```bash
# Clean everything
npm run clean  # If script exists
rm -rf node_modules dist .angular

# Reinstall
npm install

# Check for updates
npm outdated

# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# View dependency tree
npm list --depth=0

# Check bundle size
npm run build
ls -lh dist/*/
```

---

**Still stuck?** Check the browser console, webpack output, and ensure all applications are running on their correct ports.

