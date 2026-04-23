/**
 * Currency utilities for handling Nigerian Naira (NGN)
 * 
 * Convention: Backend sends all money values as integers in kobo (smallest unit)
 * 1 Naira = 100 kobo
 * Example: ₦1,980,000 = 198,000,000 kobo
 */

/**
 * Convert kobo to Naira and format with symbol and thousand separators
 * @param kobo - Amount in kobo (integer)
 * @returns Formatted string like "₦1,980,000"
 */
export function formatNaira(kobo: number): string {
  const naira = kobo / 100
  return `₦${naira.toLocaleString('en-NG')}`
}

/**
 * Convert kobo to Naira and format with decimal places
 * @param kobo - Amount in kobo (integer)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string like "₦1,980,000.00"
 */
export function formatNairaWithDecimals(kobo: number, decimals: number = 2): string {
  const naira = kobo / 100
  return `₦${naira.toLocaleString('en-NG', { 
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals 
  })}`
}

/**
 * Convert kobo to Naira (number only, no formatting)
 * @param kobo - Amount in kobo (integer)
 * @returns Naira as number
 */
export function koboToNaira(kobo: number): number {
  return kobo / 100
}

/**
 * Convert Naira to kobo for API calls
 * @param naira - Amount in Naira
 * @returns Amount in kobo (integer)
 */
export function toKobo(naira: number): number {
  return Math.round(naira * 100)
}

/**
 * Parse user input and convert to kobo
 * Handles various formats: "1,980,000", "₦1,980,000", "1980000"
 * @param input - User input string
 * @returns Amount in kobo (integer)
 */
export function parseNairaInput(input: string): number {
  const cleaned = input.replace(/[₦,\s]/g, '')
  const naira = parseFloat(cleaned)
  
  if (isNaN(naira)) {
    return 0
  }
  
  return toKobo(naira)
}

/**
 * Format kobo as compact notation (e.g., "₦1.98M", "₦720K")
 * @param kobo - Amount in kobo (integer)
 * @returns Compact formatted string
 */
export function formatNairaCompact(kobo: number): string {
  const naira = kobo / 100
  
  if (naira >= 1_000_000) {
    return `₦${(naira / 1_000_000).toFixed(2)}M`
  }
  
  if (naira >= 1_000) {
    return `₦${(naira / 1_000).toFixed(0)}K`
  }
  
  return `₦${naira.toLocaleString('en-NG')}`
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use formatNaira instead
 */
export function formatCurrency(amount: number): string {
  // Check if amount is already in kobo (large number) or Naira (smaller number)
  // This is a temporary bridge during migration
  if (amount > 1_000_000) {
    // Likely kobo
    return formatNaira(amount)
  } else {
    // Likely Naira, convert to kobo first
    return formatNaira(toKobo(amount))
  }
}
