# Crypto Market Dashboard

## Overview

This project is a **real-time Crypto Market Dashboard** built as part of a Frontend Technical Assessment.

It displays live cryptocurrency data using the Binance API, including:

- Real-time price updates
- Market overview
- Token detail view with candlestick chart
- User personalization (theme, favorites, localization)

The application focuses on **clean architecture, strict typing, and efficient real-time data handling**.

---

## Tech Stack

- **Language:** TypeScript
- **Framework:** React (Hooks, Functional Components)
- **State Management:** MobX + SatchelJS (Flux pattern)
- **Real-time Data:** WebSocket (Binance Streams)
- **Styling:** TailwindCSS
- **Charting:** Lightweight Charts

---

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/kien1529164/crypto-dashboard.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Open: http://localhost:3000

---

## Features

### Core Features

- Real-time market dashboard (BTC, ETH, BNB, etc.)
- Live price updates via WebSocket
- 24h price change indicators
- Search with auto-suggest
- Token detail view with candlestick chart
- Localization (multi-language support)

---

### Bonus Features

- Favorites / Watchlist (persisted)
- Real-time Order Book (Depth)
- Light / Dark theme toggle
- State persistence using localStorage
- Responsive design
- Error handling & loading states

---

## Architecture

This project follows the **SatchelJS (Flux) architecture**:

### Store

Defines application state (market data, UI state, user settings)

### Actions

Describe events:

```ts
updatePrice(symbol, price);
setTheme(theme);
toggleFavorite(symbol);
```

### Mutators

Pure functions that update the store

### Orchestrators

Handle side effects:

- Fetching REST API data
- Managing WebSocket connections
- Dispatching actions

---

## Data Sources

### REST API

- `/exchangeInfo` → Trading pairs
- `/klines` → Historical candle data

### WebSocket Streams

- `!miniTicker@arr` → Market updates
- `<symbol>@kline_<interval>` → Chart updates
- `<symbol>@depth20@100ms` → Order book (bonus)

---

## Performance Considerations

- Batched / throttled WebSocket updates
- Minimized re-renders using:
  - `observer` (MobX)

- Efficient state updates (no unnecessary global updates)
- Selective subscriptions per component

---

## UI/UX Decisions

- Color-coded price changes (green ↑ / red ↓)
- Smooth real-time updates without flickering
- Clean and minimal trading dashboard layout
- Responsive design for mobile & desktop
- Instant search feedback

---

## Key Design Decisions

- **MobX + SatchelJS** for predictable and scalable state management
- **WebSocket over polling** for real-time accuracy and efficiency
- **Separation of concerns** (Store / Action / Mutator / Orchestrator)
- **TypeScript strict typing** for safety and maintainability
- **Component modularization** for reusability and clarity

---

## State Persistence

User settings are persisted via `localStorage`:

- Theme (light/dark)
- Favorites (watchlist)
- Language preference

---

## Commit Convention

This project follows **Conventional Commits**:

- `feat:` new feature
- `fix:` bug fix
- `chore:` maintenance
- `refactor:` code improvement

---

## Acknowledgements

- Binance API for real-time crypto data
- Open-source charting libraries

---

## Author

**Kien Nguyen**
