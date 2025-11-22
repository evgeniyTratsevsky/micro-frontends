# Module Federation Setup Guide

This guide explains how the Module Federation architecture is configured in this project.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Angular Host (Port 4200)                  │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Home     │  │  Angular   │  │   React    │           │
│  │ Component  │  │  Wrapper   │  │  Wrapper   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                         │              │                     │
│                         │              │                     │
│  ┌────────────┐        │              │        ┌──────────┐│
│  │    Vue     │        │              │        │  Router  ││
│  │  Wrapper   │        │              │        │          ││
│  └────────────┘        │              │        └──────────┘│
│         │              │              │                     │
└─────────┼──────────────┼──────────────┼─────────────────────┘
          │              │              │
          │              │              │
    ┌─────▼─────┐  ┌────▼────┐  ┌──────▼──────┐
    │   Vue     │  │ Angular │  │    React    │
    │   Child   │  │  Child  │  │    Child    │
    │ (4203)    │  │ (4201)  │  │   (4202)    │
    └───────────┘  └─────────┘  └─────────────┘
```

## Module Federation Configuration

### 1. Host Application (Angular)

**File**: `projects/host/webpack.config.js`

```javascript
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    angularChild: "angularChild@http://localhost:4201/remoteEntry.js",
    reactChild: "reactChild@http://localhost:4202/remoteEntry.js",
    vueChild: "vueChild@http://localhost:4203/remoteEntry.js"
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "rxjs": { singleton: true, strictVersion: true },
    "zone.js": { singleton: true, strictVersion: true }
  }
})
```

**Key Points:**
- Defines remote entry points for all child applications
- Shares Angular dependencies as singletons
- Acts as the orchestrator for all micro-frontends

### 2. Angular Child Application

**File**: `projects/angular-child/webpack.config.js`

```javascript
new ModuleFederationPlugin({
  name: "angularChild",
  filename: "remoteEntry.js",
  exposes: {
    './Module': './projects/angular-child/src/app/app.module.ts',
    './Component': './projects/angular-child/src/app/app.component.ts'
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "rxjs": { singleton: true, strictVersion: true },
    "zone.js": { singleton: true, strictVersion: true }
  }
})
```

**Key Points:**
- Exposes Angular module and component
- Shares the same Angular dependencies with host
- Uses `singleton: true` to ensure only one instance of Angular runs

### 3. React Child Application

**File**: `projects/react-child/webpack.config.js`

```javascript
new ModuleFederationPlugin({
  name: 'reactChild',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './projects/react-child/src/App',
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false }
  }
})
```

**Key Points:**
- Exposes React App component with mount function
- Shares React and ReactDOM
- Uses custom mount/unmount functions for integration

**Integration**: The host uses a wrapper component (`ReactWrapperComponent`) that:
1. Loads the remote module
2. Calls the `mount()` function with a DOM element
3. Handles cleanup on component destroy

### 4. Vue Child Application

**File**: `projects/vue-child/webpack.config.js`

```javascript
new ModuleFederationPlugin({
  name: 'vueChild',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './projects/vue-child/src/App',
  },
  shared: {
    vue: { singleton: true, requiredVersion: false }
  }
})
```

**Key Points:**
- Exposes Vue App component with mount function
- Shares Vue as singleton
- Uses Composition API for modern Vue development

**Integration**: Similar to React, uses `VueWrapperComponent` that:
1. Loads the remote module
2. Calls the `mount()` function
3. Handles cleanup on destroy

## Routing Configuration

### Host Routes (`projects/host/src/app/app.routes.ts`)

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component') },
  {
    path: 'angular-child',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Module'
    })
  },
  { path: 'react-child', loadComponent: () => import('./wrappers/react-wrapper.component') },
  { path: 'vue-child', loadComponent: () => import('./wrappers/vue-wrapper.component') }
];
```

### Angular Child Routes

The Angular child has its own routing:
- `/dashboard` - Dashboard with statistics
- `/features` - Features showcase

These routes are nested under `/angular-child` in the host.

## Shared Dependencies Strategy

### Angular Dependencies
- **Singleton**: Ensures only one instance across all Angular apps
- **Strict Version**: Enforces version compatibility
- **Eager Loading**: Loaded immediately with the host

### React/Vue Dependencies
- **Singleton**: Prevents multiple framework instances
- **Required Version: false**: More flexible version matching
- **Lazy Loading**: Loaded when the component is accessed

## Development Workflow

### 1. Starting Development

```bash
# Terminal 1: Start all applications
npm run start:all

# Or individually:
# Terminal 1: Host
npm run start:host

# Terminal 2: Angular Child
npm run start:angular-child

# Terminal 3: React Child
npm run start:react-child

# Terminal 4: Vue Child
npm run start:vue-child
```

### 2. Making Changes

- **Host Changes**: Automatically reloads, affects navigation and layout
- **Angular Child**: Hot reloads, changes visible when navigating to `/angular-child`
- **React Child**: Hot reloads, changes visible at `/react-child`
- **Vue Child**: Hot reloads, changes visible at `/vue-child`

### 3. Adding New Remote

To add a new micro-frontend:

1. **Create the application** in `projects/` directory
2. **Configure webpack** with Module Federation plugin
3. **Add remote** to host's webpack config:
   ```javascript
   remotes: {
     newApp: "newApp@http://localhost:PORT/remoteEntry.js"
   }
   ```
4. **Add route** in host's routing configuration
5. **Add script** to package.json for starting the new app

## Build Process

### Development Build
```bash
npm run start:all
```
- Webpack dev server for each application
- Hot Module Replacement enabled
- Source maps for debugging

### Production Build
```bash
npm run build
```
- Optimized bundles
- Tree shaking
- Code splitting
- Minification

## Troubleshooting

### Common Issues

#### 1. "Cannot find remote module"
**Solution**: Ensure the child application is running on the correct port.

#### 2. "Shared module version mismatch"
**Solution**: Check that shared dependencies have compatible versions across all apps.

#### 3. "Zone.js already loaded"
**Solution**: Ensure `zone.js` is marked as singleton in shared configuration.

#### 4. "CORS errors"
**Solution**: Verify webpack dev server CORS headers are configured correctly.

### Debug Mode

Enable verbose logging in Module Federation:
```javascript
// In webpack config
optimization: {
  runtimeChunk: false,
  moduleIds: 'named'
}
```

## Performance Optimization

### 1. Shared Dependencies
- Only load common libraries once
- Reduces initial bundle size
- Improves cache efficiency

### 2. Lazy Loading
- Child applications loaded on demand
- Reduces initial page load time
- Better resource utilization

### 3. Code Splitting
- Each micro-frontend is a separate chunk
- Parallel loading of resources
- Improved perceived performance

## Security Considerations

### 1. Remote Entry Points
- Use HTTPS in production
- Implement authentication for remote modules
- Validate remote module integrity

### 2. Shared State
- Avoid sharing mutable state between micro-frontends
- Use events or message passing for communication
- Implement proper isolation

### 3. Dependencies
- Keep dependencies up to date
- Audit for vulnerabilities regularly
- Use lock files for consistent builds

## Best Practices

1. **Version Alignment**: Keep shared dependencies aligned across all apps
2. **Independent Deployment**: Each micro-frontend should be deployable independently
3. **Clear Boundaries**: Define clear interfaces between micro-frontends
4. **Error Handling**: Implement proper error boundaries
5. **Testing**: Test each micro-frontend independently and together
6. **Documentation**: Keep architecture documentation up to date
7. **Monitoring**: Implement logging and monitoring for each micro-frontend

## Next Steps

- Implement shared state management (e.g., Redux, NgRx)
- Add authentication and authorization
- Implement error boundaries
- Add end-to-end testing
- Set up CI/CD pipelines
- Configure production deployment
- Implement monitoring and analytics

---

For more information, refer to the main [README.md](./README.md)

