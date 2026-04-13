const signaturePatterns = [
  { check: /OR\s+1=1/i, risk: "HIGH", label: "Or tautology" },
  { check: /UNION\s+SELECT/i, risk: "CRITICAL", label: "Union select" },
  { check: /\bDROP\b/i, risk: "CRITICAL", label: "Drop statement" },
  { check: /--/, risk: "MEDIUM", label: "Inline comment" },
  { check: /;.*\bDELETE\b/i, risk: "HIGH", label: "Semicolon delete" },
]

export function detectSQLInjection(query = "") {
  const normalized = query.toUpperCase()
  const match = signaturePatterns.find((pattern) => pattern.check.test(normalized))
  if (!match) {
    return {
      isMalicious: false,
      risk: "LOW",
      reason: "Pattern not matched",
    }
  }

  return {
    isMalicious: true,
    risk: match.risk,
    reason: match.label,
  }
}
