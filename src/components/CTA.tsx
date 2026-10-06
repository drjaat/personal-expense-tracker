import React from 'react'

export function CTA() {
  return (
    <section id="start" aria-labelledby="start-heading" className="mx-5 mb-16 flex scroll-mt-6 flex-col justify-between gap-8 rounded-xl bg-[#14283e] px-6 py-12 text-white sm:mx-8 sm:px-10 md:flex-row md:items-center lg:mx-14 lg:py-16">
      <div><h2 id="start-heading" className="m-0 text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.035em]">Take the next step.</h2><p className="mb-0 mt-3 text-[#b9c9d8]">Open an account. Move a deal. Add a follow-up.</p></div>
      <a href="?view=workspace" className="nw-action nw-action-light shrink-0">Explore the sample <span aria-hidden="true">↗</span></a>
    </section>
  )
}
