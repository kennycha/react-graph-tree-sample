# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a sample React application demonstrating the `@kennycha/react-graph-tree` library - an interactive graph editor component for building node-based workflows.

## Development Commands

**Development server:**
```bash
pnpm dev
# or npm run dev
```
Opens development server at http://localhost:5173

**Build:**
```bash
pnpm run build
# Runs TypeScript compilation (tsc -b) then Vite build
```

**Linting:**
```bash
pnpm run lint
# Uses ESLint with TypeScript, React Hooks, and React Refresh plugins
```

**Preview production build:**
```bash
pnpm run preview
```

## Package Manager

This project uses **pnpm** as the preferred package manager (indicated by pnpm-lock.yaml).

## Architecture

### Core Structure
- **Vite + React 19 + TypeScript** - Modern React development setup
- **Single-page application** with main entry at `src/main.tsx`
- **Main component** (`src/App.tsx`) configures and renders the GraphEditor

### Graph Editor Configuration
The application demonstrates a processing pipeline with node types:
- **Detector** nodes (red) - Input sources
- **Tracker** nodes (blue) - Processing stages  
- **Feature** nodes (green) - Feature extraction
- **Filter** nodes (purple) - Data filtering
- **Output** nodes (orange) - Final outputs (supports multiple inputs)

### Key Configuration Pattern
GraphEditor requires a `GraphEditorConfig` object with:
- `initialGraph` - Defines nodes, edges, and view state
- `nodeTypes` - Available node types with colors and connection rules
- Event handlers: `onGraphChange`, `onNodeChange`

## Deployment

Configured for GitHub Pages deployment with base path `/react-graph-tree-sample/` (see vite.config.ts). CI/CD pipeline builds and deploys on push to main branch.

## Interactive Controls

- Right-click canvas/nodes for context menus
- Drag nodes to move, drag canvas to pan
- Connect nodes via right-to-left circles
- Double-click edges to delete connections
- Mouse wheel for zoom