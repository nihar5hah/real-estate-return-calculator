# Real Estate Return Calculator

A professional web-based investment analysis tool designed for real estate builders and developers to evaluate project profitability and returns.

![Real Estate Calculator](https://img.shields.io/badge/Real%20Estate-Calculator-gold)
![License](https://img.shields.io/badge/license-MIT-blue)

## Overview

This calculator helps real estate developers make data-driven investment decisions by instantly computing key financial metrics for construction projects. Enter your project parameters and get immediate insights into profitability, ROI, CAGR, and breakeven analysis.

## Features

### Input Parameters
- **Total Construction Area** (sq ft)
- **Sellable Ratio** (%) - Percentage of total area available for sale
- **Construction Cost** per sq ft (₹)
- **Land Cost** (₹)
- **Target Selling Price** per sq ft (₹)
- **Project Period** (years)

### Calculated Metrics

**Cost Breakdown:**
- Sellable Area
- Total Construction Cost
- Total Project Cost (Land + Construction)
- Breakeven Price per sq ft

**Revenue & Profit Analysis:**
- Total Revenue
- Total Expenses
- Net Profit
- Profit Margin %

**Investment Summary:**
- **CAGR** - Compound Annual Growth Rate
- **ROI** - Return on Investment
- **Profit Margin** - As percentage of revenue
- **Breakeven Analysis** - Visual comparison with target price

## Live Calculations

The calculator updates in real-time as you adjust inputs, providing:
- Instant financial projections
- Visual profit bar showing profit share of revenue
- Color-coded breakeven indicator (green = profitable, red = below breakeven)
- Interactive sliders for quick scenario testing

## Technical Details

### Built With
- **React 18** - Modern UI framework
- **Framer Motion** - Fluid animations and micro-interactions
- **Vite** - Next-generation build tool
- **Google Fonts** - Noto Serif & Manrope
- **Indian number formatting** (lakhs/crores)

### Key Features
- 🎨 Aurelian design aesthetic (inspired by high-end wealth management platforms)
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive (desktop, tablet, mobile)
- 🌙 Dark theme with gold accents
- ⚡ Real-time calculations
- 🎯 Bento-grid metrics layout

### Key Formulas

```
Sellable Area = Total Area × Sellable Ratio
Total Cost = Land Cost + (Total Area × Construction Cost per sq ft)
Breakeven Price = Total Cost ÷ Sellable Area
Revenue = Sellable Area × Selling Price
Profit = Revenue - Total Cost
Margin = (Profit ÷ Revenue) × 100
ROI = (Profit ÷ Total Cost) × 100
CAGR = ((Revenue ÷ Total Cost)^(1÷Period) - 1) × 100
```

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

The app is deployed on Vercel. Any push to the `main` branch will trigger an automatic deployment.

## Design Philosophy

The calculator features the **Aurelian aesthetic** - inspired by luxury wealth management platforms:
- **Typography**: Noto Serif (display) + Manrope (body) for readability and elegance
- **Colors**: Deep obsidian backgrounds with burnished gold accents
- **Inputs**: Minimal bottom-border-only style (no filled backgrounds)
- **Cards**: Sharp corners (4px), subtle borders, generous padding
- **Metrics**: Square bento-grid layout with clear hierarchy
- **Animations**: Orchestrated reveals with staggered timing using Framer Motion
- **Responsive**: Adapts seamlessly from desktop to mobile

## Use Cases

- **Project Feasibility Analysis** - Evaluate if a project meets profitability targets
- **Pricing Strategy** - Determine optimal selling prices
- **Scenario Planning** - Test different cost and price combinations
- **Investment Decisions** - Compare returns across different projects
- **Stakeholder Presentations** - Professional interface for client meetings

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Free to use for personal and commercial projects

## Author

Built for real estate professionals and developers

---

**Note:** This calculator is for illustrative purposes only. Actual project returns may vary based on market conditions, construction delays, regulatory changes, and other factors. Always consult with financial advisors for investment decisions.
