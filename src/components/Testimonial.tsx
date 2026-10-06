import React from 'react'

export function Testimonial() {
  return (
    <section id="sample" aria-labelledby="sample-heading" className="grid scroll-mt-6 gap-8 px-5 py-20 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:gap-20 lg:px-14 lg:py-28">
      <h2 id="sample-heading" className="m-0 max-w-md text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-ink">Room to explore.<br />A fresh start anytime.</h2>
      <div className="text-base leading-relaxed text-dim">
        <p className="mt-0">Northwind is an interactive CRM sample. The accounts, opportunities, and tasks are fictional, so you can explore the workflow with context already in place.</p>
        <p>Changes are saved in this browser when browser storage is available. Use Reset demo in the workspace to return to the original sample.</p>
        <p className="mb-0 text-sm">This sample has no connected CRM service or shared team account.</p>
      </div>
    </section>
  )
}
