import React from 'react'

export function Navbar() {
  return (
    <header className="border-b border-line px-5 py-5 sm:px-8 lg:px-14">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
        <a href="?" aria-label="Northwind home" className="nw-link flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 20V4l16 16V4M4 12h16" stroke="currentColor" strokeWidth="2" /></svg>
          Northwind
        </a>
        <nav aria-label="Primary" className="order-3 flex w-full gap-6 text-sm text-dim sm:order-none sm:w-auto">
          <a className="nw-link" href="#features">The workflow</a>
          <a className="nw-link" href="#sample">About the sample</a>
        </nav>
        <a className="nw-link text-sm font-semibold" href="?view=workspace">Open workspace <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  )
}
