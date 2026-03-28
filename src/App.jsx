import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Utility functions
const toIndianComma = (n) => {
  if (isNaN(n) || n === '') return ''
  const s = Math.round(n).toString()
  if (s.length <= 3) return s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

const parseIndian = (str) => {
  return parseFloat(str.replace(/,/g, '')) || 0
}

const fmt = (n) => {
  const sign = n < 0 ? '-' : ''
  return sign + '₹' + Math.abs(Math.round(n)).toLocaleString('en-IN')
}

const fmtSqft = (n) => {
  return Math.round(n).toLocaleString('en-IN') + ' sq ft'
}

const fmtPct = (n) => {
  return n.toFixed(2) + '%'
}

const fmtRaw = (n) => {
  return Math.abs(Math.round(n)).toLocaleString('en-IN')
}

function App() {
  // Input states
  const [totalArea, setTotalArea] = useState('8,00,000')
  const [sellableRatio, setSellableRatio] = useState(50)
  const [constCostPerSqft, setConstCostPerSqft] = useState('2,500')
  const [landCost, setLandCost] = useState('50,00,00,000')
  const [sellPrice, setSellPrice] = useState('8,500')
  const [period, setPeriod] = useState(5)

  // Calculated values
  const [results, setResults] = useState({})

  // Calculate on mount and when inputs change
  useEffect(() => {
    calculate()
  }, [totalArea, sellableRatio, constCostPerSqft, landCost, sellPrice, period])

  const calculate = () => {
    const totalAreaNum = parseIndian(totalArea)
    const sellableRatioNum = parseFloat(sellableRatio) / 100 || 0
    const constCostPerSqftNum = parseIndian(constCostPerSqft)
    const landCostNum = parseIndian(landCost)
    const sellPriceNum = parseIndian(sellPrice)
    const periodNum = parseFloat(period) || 1

    const sellableArea = totalAreaNum * sellableRatioNum
    const constCost = totalAreaNum * constCostPerSqftNum
    const totalCost = constCost + landCostNum
    const breakeven = sellableArea > 0 ? totalCost / sellableArea : 0
    const revenue = sellableArea * sellPriceNum
    const profit = revenue - totalCost
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0
    const cagr = totalCost > 0 && periodNum > 0 ? (Math.pow(revenue / totalCost, 1 / periodNum) - 1) * 100 : 0
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0
    const profitShare = revenue > 0 ? Math.max(0, Math.min(100, (profit / revenue) * 100)) : 0
    const diff = sellPriceNum - breakeven
    const diffPct = breakeven > 0 ? ((diff / breakeven) * 100).toFixed(1) : 0

    setResults({
      sellableArea,
      constCost,
      totalCost,
      breakeven,
      revenue,
      profit,
      margin,
      cagr,
      roi,
      profitShare,
      diff,
      diffPct,
      periodNum
    })
  }

  const handleIndianInput = (value, setter) => {
    const raw = value.replace(/[^0-9]/g, '')
    const num = parseInt(raw, 10)
    setter(raw ? toIndianComma(num) : '')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.2,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }

  return (
    <div className="app">
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="header">
          <motion.div
            className="brand-mark"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span>Investment Analysis</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Real Estate<br />
            <span className="accent">Return Calculator</span>
          </motion.h1>
          
          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Sophisticated analysis for discerning investors. Evaluate project viability with precision.
          </motion.p>
          
          <motion.div
            className="header-ornament"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="diamond" />
          </motion.div>
        </motion.header>

        {/* Main Grid */}
        <div className="main-grid">
          {/* Construction Parameters */}
          <motion.div variants={cardVariants} whileHover="hover" className="card">
            <div className="section-label">
              <div className="icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h2>Construction</h2>
            </div>

            <div className="field">
              <div className="field-header">
                <span className="field-label">Total Construction Area</span>
                <span className="field-unit">Square Feet</span>
              </div>
              <div className="input-container">
                <span className="input-symbol">#</span>
                <input
                  type="text"
                  className="value-input"
                  value={totalArea}
                  onChange={(e) => handleIndianInput(e.target.value, setTotalArea)}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="field">
              <div className="field-header">
                <span className="field-label">Sellable Ratio</span>
                <span className="field-unit">Percentage</span>
              </div>
              <div className="input-container">
                <span className="input-symbol">%</span>
                <input
                  type="number"
                  className="value-input"
                  value={sellableRatio}
                  onChange={(e) => setSellableRatio(e.target.value)}
                  min="1"
                  max="100"
                  step="0.5"
                />
              </div>
              <input
                type="range"
                className="slider"
                value={sellableRatio}
                onChange={(e) => setSellableRatio(e.target.value)}
                min="1"
                max="100"
                step="0.5"
              />
            </div>

            <div className="field">
              <div className="field-header">
                <span className="field-label">Construction Cost</span>
                <span className="field-unit">Per Sq Ft</span>
              </div>
              <div className="input-container">
                <span className="input-symbol">₹</span>
                <input
                  type="text"
                  className="value-input"
                  value={constCostPerSqft}
                  onChange={(e) => handleIndianInput(e.target.value, setConstCostPerSqft)}
                  inputMode="numeric"
                />
              </div>
            </div>
          </motion.div>

          {/* Financial Parameters */}
          <motion.div variants={cardVariants} whileHover="hover" className="card">
            <div className="section-label">
              <div className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h2>Financials</h2>
            </div>

            <div className="field">
              <div className="field-header">
                <span className="field-label">Land Acquisition Cost</span>
                <span className="field-unit">Total Value</span>
              </div>
              <div className="input-container">
                <span className="input-symbol">₹</span>
                <input
                  type="text"
                  className="value-input"
                  value={landCost}
                  onChange={(e) => handleIndianInput(e.target.value, setLandCost)}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="field">
              <div className="field-header">
                <span className="field-label">Target Selling Price</span>
                <span className="field-unit">Per Sq Ft</span>
              </div>
              <div className="input-container">
                <span className="input-symbol">₹</span>
                <input
                  type="text"
                  className="value-input"
                  value={sellPrice}
                  onChange={(e) => handleIndianInput(e.target.value, setSellPrice)}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="field">
              <div className="field-header">
                <span className="field-label">Project Duration</span>
                <span className="field-unit">Years</span>
              </div>
              <div className="input-container">
                <span className="input-symbol">#</span>
                <input
                  type="number"
                  className="value-input"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  min="1"
                  max="50"
                  step="1"
                />
              </div>
              <input
                type="range"
                className="slider"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                min="1"
                max="30"
                step="1"
              />
            </div>
          </motion.div>

          {/* Cost Analysis */}
          <motion.div variants={cardVariants} whileHover="hover" className="card">
            <div className="section-label">
              <div className="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <h2>Cost Analysis</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={results.sellableArea}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="output-row">
                  <span className="output-label">Sellable Area</span>
                  <span className="output-value">{fmtSqft(results.sellableArea || 0)}</span>
                </div>
                <div className="output-row">
                  <span className="output-label">Construction Cost</span>
                  <span className="output-value">{fmt(results.constCost || 0)}</span>
                </div>
                <div className="output-row">
                  <span className="output-label">Total Investment</span>
                  <span className="output-value highlight">{fmt(results.totalCost || 0)}</span>
                </div>
                <div className="output-row">
                  <span className="output-label">Breakeven Price</span>
                  <span className="output-value highlight">₹{fmtRaw(results.breakeven || 0)} / sq ft</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Revenue Analysis */}
          <motion.div variants={cardVariants} whileHover="hover" className="card">
            <div className="section-label">
              <div className="icon">
                <svg viewBox="0 0 24 24">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <h2>Revenue & Profit</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={results.revenue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="output-row">
                  <span className="output-label">Projected Revenue</span>
                  <span className="output-value">{fmt(results.revenue || 0)}</span>
                </div>
                <div className="output-row">
                  <span className="output-label">Total Expenses</span>
                  <span className="output-value">{fmt(results.constCost || 0)}</span>
                </div>
                <div className="output-row">
                  <span className="output-label">Net Profit</span>
                  <span className="output-value highlight">{fmt(results.profit || 0)}</span>
                </div>
                <div className="output-row">
                  <span className="output-label">Profit Margin</span>
                  <span className="output-value">{fmtPct(results.margin || 0)}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Results Summary */}
          <motion.div variants={cardVariants} className="card span-full results-section">
            <div className="results-header">
              <h3>
                Investment <span>Summary</span>
              </h3>
              <div className="results-badge">
                <motion.div
                  className="dot"
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                Live Calculation
              </div>
            </div>

            <div className="metrics-showcase">
              <motion.div
                custom={0}
                variants={metricVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="metric-card featured"
              >
                <div className="metric-title">CAGR</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={results.cagr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="metric-value"
                  >
                    {fmtPct(results.cagr || 0)}
                  </motion.div>
                </AnimatePresence>
                <div className="metric-subtitle">Annualised Return</div>
              </motion.div>

              <motion.div
                custom={1}
                variants={metricVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="metric-card"
              >
                <div className="metric-title">Net Profit</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={results.profit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`metric-value ${(results.profit || 0) >= 0 ? 'positive' : 'negative'}`}
                  >
                    {fmt(results.profit || 0)}
                  </motion.div>
                </AnimatePresence>
                <div className="metric-subtitle">Total Earnings</div>
              </motion.div>

              <motion.div
                custom={2}
                variants={metricVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="metric-card"
              >
                <div className="metric-title">ROI</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={results.roi}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="metric-value"
                  >
                    {fmtPct(results.roi || 0)}
                  </motion.div>
                </AnimatePresence>
                <div className="metric-subtitle">Return on Investment</div>
              </motion.div>

              <motion.div
                custom={3}
                variants={metricVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="metric-card"
              >
                <div className="metric-title">Margin</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={results.margin}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="metric-value"
                  >
                    {fmtPct(results.margin || 0)}
                  </motion.div>
                </AnimatePresence>
                <div className="metric-subtitle">On Revenue</div>
              </motion.div>

              <motion.div
                custom={4}
                variants={metricVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="metric-card"
              >
                <div className="metric-title">Breakeven</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={results.breakeven}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="metric-value"
                  >
                    ₹{fmtRaw(results.breakeven || 0)}
                  </motion.div>
                </AnimatePresence>
                <div className="metric-subtitle">Per Sq Ft</div>
              </motion.div>

              <motion.div
                custom={5}
                variants={metricVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="metric-card"
              >
                <div className="metric-title">Duration</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={results.periodNum}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="metric-value"
                  >
                    {results.periodNum || 0} {(results.periodNum || 0) === 1 ? 'yr' : 'yrs'}
                  </motion.div>
                </AnimatePresence>
                <div className="metric-subtitle">Project Timeline</div>
              </motion.div>
            </div>

            {/* Profit Visual */}
            <motion.div
              className="profit-visual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="profit-visual-header">
                <span className="profit-visual-title">Profit Contribution to Revenue</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={results.profitShare}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="profit-visual-value"
                  >
                    {(results.profitShare || 0).toFixed(1)}%
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="profit-bar-container">
                <motion.div
                  className="profit-bar"
                  initial={{ width: '0%' }}
                  animate={{ width: `${results.profitShare || 0}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <motion.div
                className={`breakeven-indicator ${(results.diff || 0) < 0 ? 'negative' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <svg viewBox="0 0 24 24">
                  {(results.diff || 0) >= 0 ? (
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  ) : (
                    <>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </>
                  )}
                </svg>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${results.diff}-${results.diffPct}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(results.diff || 0) >= 0
                      ? `₹${fmtRaw(results.diff || 0)} (${results.diffPct}%) above breakeven`
                      : `₹${fmtRaw(Math.abs(results.diff || 0))} (${Math.abs(results.diffPct)}%) below breakeven`}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            <motion.button
              className="btn-calculate"
              onClick={calculate}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg viewBox="0 0 24 24">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              Recalculate Analysis
            </motion.button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="footer-text">For illustrative purposes only. Consult financial advisors for investment decisions.</p>
          <p className="footer-brand">Real Estate Return Calculator</p>
        </motion.footer>
      </motion.div>
    </div>
  )
}

export default App
