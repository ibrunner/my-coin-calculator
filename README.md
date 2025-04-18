<div align="center">
  <img src="src/assets/logo-small.png" alt="Calculator Coin" width="128" />
  <h1>My Coin Calculator</h1>
</div>

A modern cryptocurrency calculator built with React, TypeScript, and Vite.

A simple dollar-cost averaging (DCA) calculator for cryptocurrency investors and novices. This is the code behind [mycoincalculator.com](https://mycoincalculator.com).

## Overview

MyCoinCalculator is a web application designed to help cryptocurrency investors and novices visualize and plan their dollar-cost averaging strategies. With an intuitive interface and real-time visualizations, it helps users understand how consistent investing in volatile markets can impact their portfolio.

### Key Features

- Visualize potential crypto market scenarios
- Calculate outcomes of various DCA strategies
- Adjust investment parameters in real-time
- Explore different market conditions (bear/crab/bull/moon)
- Interactive price projections with configurable volatility
- Responsive design for both desktop and mobile

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Zustand (State Management)
- React Hook Form
- Zod (Validation)

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-coin-calculator.git
cd my-coin-calculator
```

2. Install dependencies:

```bash
yarn install
```

### Development

To start the development server:

```bash
yarn dev
```

This will start the development server at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Testing

Run the test suite:

```bash
yarn test
```

Run type checking:

```bash
yarn typecheck
```

### Linting and Formatting

Run ESLint:

```bash
yarn lint
```

Format code with Prettier:

```bash
yarn format
```

## Project Structure

```
my-coin-calculator/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and helpers
│   ├── store/         # Zustand store
│   ├── types/         # TypeScript type definitions
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── docs/              # Documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by the need for educational cryptocurrency investment planning tools
- Built with modern web technologies for optimal performance and user experience
