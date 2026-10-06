import React from 'react'

const features = [
  { title: 'Find the account', description: 'Search the sample accounts and open a record to see its details and opportunities.' },
  { title: 'Move the opportunity', description: 'Select an opportunity and change its stage as the conversation progresses.' },
  { title: 'Make the follow-up', description: 'Add a task to the account, then mark it complete when the work is done.' },
]

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="grid scroll-mt-6 gap-10 border-y border-line bg-soft px-5 py-20 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:gap-20 lg:px-14 lg:py-28">
      <div>
        <p className="mb-4 mt-0 text-xs font-semibold uppercase tracking-[0.14em] text-dim">The daily rhythm</p>
        <h2 id="features-heading" className="m-0 max-w-md text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-ink">From an open deal<br />to a next action.</h2>
        <a href="?view=workspace" className="nw-link mt-7 inline-flex text-sm font-semibold text-ink">Try the workflow <span aria-hidden="true" className="ml-2">↗</span></a>
      </div>
      <div>
        {features.map((feature) => (
          <article key={feature.title} className="border-t border-line py-6 first:pt-5">
            <h3 className="m-0 text-xl font-semibold tracking-tight text-ink">{feature.title}</h3>
            <p className="mb-0 mt-3 max-w-lg text-base leading-relaxed text-dim">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
