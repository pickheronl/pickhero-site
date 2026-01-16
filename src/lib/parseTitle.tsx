import React from 'react'

/**
 * Parses a title string and converts *text* patterns to highlighted spans.
 * Example: "Slimmer picken met *PickHero*" becomes "Slimmer picken met <span class="text-gradient">PickHero</span>"
 */
export function parseTitle(title: string | null | undefined): React.ReactNode {
  if (!title) return null

  // Split by *text* pattern, keeping the delimiters
  const parts = title.split(/(\*[^*]+\*)/g)

  return parts.map((part, index) => {
    // Check if this part is wrapped in asterisks
    if (part.startsWith('*') && part.endsWith('*')) {
      // Remove asterisks and wrap in highlight span
      const text = part.slice(1, -1)
      return (
        <span key={index} className="text-gradient">
          {text}
        </span>
      )
    }
    // Return plain text
    return part
  })
}

/**
 * Same as parseTitle but returns a string for use in places where JSX is not supported
 * (strips the asterisks but doesn't add highlighting)
 */
export function parseTitlePlain(title: string | null | undefined): string {
  if (!title) return ''
  return title.replace(/\*([^*]+)\*/g, '$1')
}
