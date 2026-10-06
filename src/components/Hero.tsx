import React from 'react'

export function Hero() {
  return (
    <section id="product" aria-labelledby="hero-heading" className="scroll-mt-6 px-5 pb-16 pt-14 sm:px-8 lg:px-14 lg:pt-16">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-dim">Northwind / CRM workspace</p>
      <h1 id="hero-heading" className="m-0 max-w-5xl font-display text-[clamp(2.5rem,5.3vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
        Every account.<br />A clear next step.
      </h1>
      <div className="mb-10 mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="m-0 max-w-[540px] text-base leading-relaxed text-dim sm:text-lg">A focused place for accounts, opportunities, and follow-ups. Explore the sample pipeline, move a deal forward, and plan what comes next.</p>
        <div className="shrink-0">
          <a className="nw-action" href="?view=workspace">Open sample workspace <span aria-hidden="true">↗</span></a>
          <p className="mb-0 mt-3 text-xs text-dim">No sign-up. Changes stay in this browser.</p>
        </div>
      </div>
      <figure className="nw-preview m-0 overflow-hidden rounded-xl border border-[#243952] bg-[#14283e] text-white">
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 px-5 py-4 text-xs sm:px-7">
          <span className="font-semibold tracking-wide">A closer look at the workflow</span>
          <span className="text-[#b9c9d8]">Illustrative preview · sample data</span>
        </figcaption>
        <div className="grid md:grid-cols-[220px_1fr]">
          <div className="border-b border-white/15 p-5 md:border-b-0 md:border-r sm:p-7">
            <p className="mb-5 mt-0 text-[11px] uppercase tracking-[0.14em] text-[#b9c9d8]">Accounts → Opportunity</p>
            <p className="m-0 text-lg font-semibold">Alder & Co.</p>
            <p className="mb-6 mt-1 text-sm text-[#b9c9d8]">Illustrative account</p>
            <span className="inline-flex rounded border border-[#aac8bf]/35 bg-[#aac8bf]/10 px-3 py-1.5 text-xs text-[#d3e8e0]">Proposal</span>
          </div>
          <div className="min-w-0 p-5 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="m-0 text-xl font-medium tracking-tight">Keep the conversation moving.</h2>
              <span className="text-xs text-[#b9c9d8]">Follow-up example</span>
            </div>
            <div className="my-6 grid grid-cols-3 gap-2" aria-label="Example pipeline: discovery, proposal, won">
              {['Discovery', 'Proposal', 'Won'].map((stage, index) => (
                <div key={stage} className={`border-t-2 pt-3 text-xs ${index === 1 ? 'border-[#b8d9cd] text-white' : 'border-[#52677c] text-[#b9c9d8]'}`}>{stage}</div>
              ))}
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/[0.07] px-4 py-4">
              <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded border border-[#b9c9d8]" />
              <div><p className="m-0 text-sm font-medium">Prepare the proposal review</p><p className="mb-0 mt-1 text-xs text-[#b9c9d8]">In the workspace, add and complete your own follow-ups.</p></div>
            </div>
          </div>
        </div>
      </figure>
    </section>
  )
}
