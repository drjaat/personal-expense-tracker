import React from 'react'

export function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-5 border-t border-line px-5 py-8 text-sm text-dim sm:flex-row sm:px-8 lg:px-14">
      <span><strong className="font-semibold text-ink">Northwind</strong> · An interactive CRM sample</span>
      <nav aria-label="Footer" className="flex flex-wrap gap-6"><a className="nw-link" href="#sample">About this sample</a><a className="nw-link" href="?view=workspace">Open workspace</a></nav>
    </footer>
  )
}
