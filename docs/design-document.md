# MyCoinCalculator: Dollar-Cost Averaging Calculator

## Design Document

## Overview

MyCoinCalculator is a focused web application designed to help cryptocurrency investors and beginners visualize their dollar-cost averaging (DCA) strategies. With a clean and intuitive user interface, MyCoinCalculator makes it easy to see the potential outcomes of a DCA investment approach while educating users on the benefits of consistent investing in volatile markets.

## Core Value Proposition

MyCoinCalculator provides an accessible, visually engaging tool that:

- Allows users to visualize potential crypto market scenarios
- Calculates the outcome of various DCA strategies
- Demonstrates the impact of market volatility on investment timing
- Educates users about dollar-cost averaging through interactive elements

## User Flow

1. **Initial Interaction** - User arrives and immediately sees the DCA calculator
2. **Strategy Creation** - User inputs investment parameters
3. **Visualization** - Real-time chart updates show potential outcomes
4. **Scenario Exploration** - User adjusts parameters to see different outcomes
5. **Education** - User learns about DCA through interactive elements

## Core UI Components

### 1. Input Controls

- **Initial Investment** - One-time starting investment amount
- **Regular Investment** - Recurring investment amount with frequency selection (daily/weekly/monthly)
- **Price Target** - Expected future price of Bitcoin or selected cryptocurrency
- **Duration** - Investment timeframe in months (slider)
- **Volatility Control** - Adjusts the level of price fluctuation in the visualization
- **What-If Scenarios** - Preset market conditions (bear/crab/bull/moon) that modify the price trajectory

### 2. Visualization Chart

- **Bitcoin Price Line** - Shows projected price movement with configurable volatility
- **Investment Line** - Displays total invested capital over time (stair-step pattern)
- **Portfolio Value Line** - Shows estimated value of holdings over time
- **Purchase Points** - Marks on the price line indicating when DCA purchases occur
- **Halving Events** - Vertical reference lines marking Bitcoin halving cycles (when applicable)
- **Interactive Elements** - Draggable points to adjust final price targets

### 3. Results Section

- **Key Metrics** - Total invested, estimated value, and profit/loss
- **Plain Language Summary** - Conversational explanation of results
- **Visual Indicators** - Color-coding for positive/negative outcomes

## UI Layouts

### Mobile Layout

The mobile view presents a vertically stacked experience:

1. Input controls at the top (collapsible sections)
2. Chart visualization in the middle
3. Results at the bottom
4. Ability to scroll between sections

### Desktop Layout

The desktop view utilizes a two-column layout:

1. Input controls on the left (~30% width)
2. Chart visualization and results on the right (~70% width)
3. All core functions visible without scrolling

## Key Interactions

1. **Real-time Visualization** - Chart updates immediately as users adjust parameters
2. **Scenario Toggling** - What-if slider changes multiple variables at once to show preset scenarios
3. **Volatility Adjustment** - Controls the "noise" in the price projection to show how market fluctuations affect DCA
4. **Interactive Price Setting** - Users can drag price points to see how different targets affect outcomes

## Technical Implementation Plan

### Phase 1: Layout & Component Structure

- Create responsive layout skeletons for both mobile and desktop
- Build static component hierarchy
- Define component props and state interfaces
- Implement basic styling and component shells

### Phase 2: Form & State Management

- Build input form components with validations
- Implement state management for user inputs
- Create connections between form controls and chart placeholders
- Build What-If scenario presets and their parameter mappings

### Phase 3: Chart Implementation - Basic

- Implement base charting using a library like Recharts
- Create investment and value calculation logic
- Build initial line chart with basic price projections
- Implement static views of investment stages

### Phase 4: Chart Implementation - Advanced

- Add volatility generation logic to price projections
- Implement DCA purchase points visualization
- Create halving events reference lines
- Build interactive price adjustment capabilities

### Phase 5: Logic Refinement

- Implement realistic price projection models
- Refine volatility algorithms to create realistic market noise
- Optimize calculations for performance
- Implement chart animations and transitions

### Phase 6: Polish & Optimization

- Refine UI with consistent styling
- Add tooltips and educational elements
- Implement responsive optimizations
- Performance testing and optimization
- Add subtle animations and micro-interactions
- Realtime price updates for current price

## Technical Considerations

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Custom breakpoints for optimal experience on all devices
- Special consideration for chart rendering on small screens

### State Management

- React hooks for local state
- Context API for shared state if needed
- Minimal external dependencies

### Performance

- Implement memoization for complex calculations
- Use virtualization for rendering large datasets
- Optimize chart re-renders with useMemo

### Accessibility

- Ensure all interactions are keyboard accessible
- Provide alternative text descriptions for visual data
- Follow WCAG 2.1 guidelines for color contrast

## Future Enhancements (Post-Launch)

The following features are intentionally planned for later development phases:

### User Accounts & Data Persistence

- Save strategies for future reference
- Track strategy performance over time
- User preferences and settings

### Social Features

- Share strategies via link or social media
- Community strategy templates
- View popular strategies

### Advanced Customization

- Multiple cryptocurrency support
- Custom price projection models
- CSV/data export options

## Conclusion

MyCoinCalculator will provide a focused, intuitive tool for users to understand and plan dollar-cost averaging strategies for cryptocurrency investment. By prioritizing the core calculator functionality first and adding advanced features later, we can quickly deliver a valuable tool to users while establishing a foundation for future enhancements.
