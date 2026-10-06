import { useEffect, useState, type FormEvent } from 'react'
import { stages, type Stage, type WorkspaceData } from './model'
import { loadWorkspace, MAX_TASKS, resetWorkspace, saveWorkspace } from './storage'
import './workspace.css'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function Workspace() {
  const [data, setData] = useState(loadWorkspace)
  const [selectedId, setSelectedId] = useState(data.accounts[0].id)
  const [view, setView] = useState<'Pipeline' | 'Accounts'>('Pipeline')
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState<Stage | 'All'>('All')
  const [draft, setDraft] = useState<{ accountId: string; title: string } | null>(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState<boolean | null>(null)
  const [notice, setNotice] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => { setSaved(saveWorkspace(data)) }, [data])
  const visibleAccounts = data.accounts.filter(account => {
    const matches = `${account.name} ${account.contact} ${account.sector}`.toLowerCase().includes(query.trim().toLowerCase())
    return matches && (view === 'Accounts' || stageFilter === 'All' || data.opportunities.some(o => o.accountId === account.id && o.stage === stageFilter))
  })
  const account = visibleAccounts.find(a => a.id === selectedId) ?? visibleAccounts[0]
  const activeAccountId = account?.id
  useEffect(() => { setDraft(null); setError('') }, [activeAccountId])
  const draftTitle = draft && draft.accountId === activeAccountId ? draft.title : ''
  const opportunity = data.opportunities.find(o => o.accountId === account?.id)
  const tasks = data.tasks.filter(t => t.accountId === account?.id)
  const openValue = data.opportunities.filter(o => o.stage !== 'Won').reduce((sum, o) => sum + o.value, 0)

  function update(next: WorkspaceData, message: string) { setData(next); setNotice(message) }
  function addTask(event: FormEvent) {
    event.preventDefault()
    if (!account) return
    // Check ownership at submission too, before the account-change effect runs.
    const title = draft?.accountId === account.id ? draft.title.trim() : ''
    if (!title) { setError('Enter a follow-up before adding it.'); return }
    if (data.tasks.length >= MAX_TASKS) { setError('This sample supports up to 500 tasks. Reset the demo to start again.'); return }
    update({ ...data, tasks: [...data.tasks, { id: `task-${crypto.randomUUID()}`, accountId: account.id, title, completed: false }] }, `Follow-up added to ${account.name}.`)
    setDraft(null); setError('')
  }
  function clearFilters() { setQuery(''); setStageFilter('All'); setDraft(null); setError('') }
  function reset() {
    const next = resetWorkspace()
    setData(next); setSelectedId(next.accounts[0].id); clearFilters(); setConfirmReset(false)
    setNotice('Sample workspace reset. All local edits have been replaced.')
  }

  return <div className="nw-workspace">
    <a className="nw-skip" href="#workspace-main">Skip to workspace</a>
    <aside className="nw-rail">
      <a href="?" className="nw-brand">northwind<span>CRM / SAMPLE</span></a>
      <nav aria-label="Workspace views">{(['Pipeline', 'Accounts'] as const).map(item => <button key={item} aria-pressed={view === item} onClick={() => { setView(item); clearFilters() }}>{item}<span>{item === 'Pipeline' ? '↗' : data.accounts.length}</span></button>)}</nav>
      <div className="nw-rail-note"><strong>A place for the next step.</strong><p>Explore fictional accounts and make this workspace your own.</p><a href="?">Back to overview</a></div>
    </aside>
    <main id="workspace-main" className="nw-main">
      <header className="nw-topline"><span>{saved === false ? 'Sample workspace · changes are not saved' : saved === null ? 'Sample workspace · checking browser storage' : 'Sample workspace · saved in this browser'}</span><button className="nw-quiet" onClick={() => setConfirmReset(true)}>Reset demo</button></header>
      {saved === false && <div role="alert" className="nw-warning">Browser storage is unavailable or full. Changes only last while this page is open; old saved records may return on reload. <button onClick={() => setSaved(saveWorkspace(data))}>Retry saving</button></div>}
      {confirmReset && <section className="nw-reset" aria-label="Confirm reset"><p>Replace all your local edits with the original sample accounts and tasks?</p><button className="nw-primary" onClick={reset}>Reset sample data</button><button onClick={() => setConfirmReset(false)}>Keep my edits</button></section>}
      <div className="nw-heading"><div><p className="nw-eyebrow">YOUR RELATIONSHIPS, IN VIEW</p><h1>{view}</h1><p>Keep the conversation moving. Start with a next step.</p></div><div className="nw-total"><span>Open pipeline · sample USD</span><strong>{money.format(openValue)}</strong></div></div>
      {view === 'Pipeline' && <div className="nw-stages" aria-label="Filter by opportunity stage">{(['All', ...stages] as const).map(stage => <button aria-pressed={stageFilter === stage} key={stage} onClick={() => { setStageFilter(stage); setDraft(null); setError('') }}><span>{stage === 'All' ? 'All opportunities' : stage}</span><strong>{data.opportunities.filter(o => stage === 'All' || o.stage === stage).length}</strong></button>)}</div>}
      <div className="nw-workbench">
        <section className="nw-accounts" aria-label="Account list"><div className="nw-search"><label htmlFor="account-search">Search accounts</label><input id="account-search" type="search" value={query} placeholder="Name, contact or industry" maxLength={200} onChange={e => { setQuery(e.target.value); setDraft(null); setError('') }} /><p>{visibleAccounts.length} of {data.accounts.length} sample accounts</p></div>
          {visibleAccounts.map(a => { const deal = data.opportunities.find(o => o.accountId === a.id)!; return <button className="nw-account" aria-pressed={account?.id === a.id} key={a.id} onClick={() => { setSelectedId(a.id); setDraft(null); setError(''); setNotice('') }}><span className="nw-account-title">{a.name}<span aria-hidden="true">↗</span></span><span>{a.sector}</span><span className="nw-account-bottom"><span>{deal.stage}</span><strong>{money.format(deal.value)}</strong></span></button> })}
          {!visibleAccounts.length && <div className="nw-empty"><h2>No accounts match your search.</h2><p>Try another name or clear the filters.</p><button onClick={clearFilters}>Clear filters</button></div>}
        </section>
        {account && opportunity ? <section className="nw-detail" aria-labelledby="account-heading"><div className="nw-detail-heading"><span className="nw-monogram" aria-hidden="true">{account.name.slice(0, 1)}</span><div><p className="nw-eyebrow">ACCOUNT DETAILS</p><h2 id="account-heading">{account.name}</h2><p>{account.sector} · Sample account</p></div></div>
          <div className="nw-contact"><div><span>Primary contact</span><strong>{account.contact}</strong><p>{account.role}</p></div><p>{account.note}</p></div>
          <section className="nw-opportunity" aria-label="Opportunity"><div><span>Opportunity · illustrative USD</span><h3>{opportunity.name}</h3><strong>{money.format(opportunity.value)}</strong></div><div><label htmlFor="deal-stage">Opportunity stage</label><select id="deal-stage" value={opportunity.stage} onChange={e => update({ ...data, opportunities: data.opportunities.map(o => o.id === opportunity.id ? { ...o, stage: e.target.value as Stage } : o) }, `${account.name} moved to ${e.target.value}.`)}>{stages.map(stage => <option key={stage}>{stage}</option>)}</select></div></section>
          <section className="nw-followups" aria-labelledby="followups-heading"><div className="nw-section-heading"><h3 id="followups-heading">Next steps</h3><span>{tasks.filter(t => !t.completed).length} open</span></div>
            {tasks.length ? <ul>{tasks.map(task => <li key={task.id}><label><input type="checkbox" checked={task.completed} onChange={() => update({ ...data, tasks: data.tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t) }, task.completed ? 'Follow-up reopened.' : 'Follow-up completed.')} /><span className={task.completed ? 'nw-completed' : ''}>{task.title}</span></label></li>)}</ul> : <p className="nw-task-empty">No follow-ups yet. Add the next step for this account.</p>}
            <form onSubmit={addTask}><label htmlFor="followup">Add a follow-up</label><div className="nw-task-form"><input id="followup" value={draftTitle} onChange={e => { setDraft({ accountId: account.id, title: e.target.value }); setError('') }} maxLength={200} placeholder="What needs to happen next?" aria-invalid={!!error} aria-describedby={error ? 'task-error' : undefined} /><button className="nw-primary" type="submit">Add task</button></div>{error && <p id="task-error" role="alert" className="nw-error">{error}</p>}</form>
          </section>
        </section> : <section className="nw-detail nw-empty"><h2>A clear view starts here.</h2><p>Clear your filters to choose an account and plan its next step.</p></section>}
      </div>
      <p className="nw-feedback" role="status">{notice}</p><footer className="nw-disclaimer">All names, contacts and amounts are illustrative. Edits stay in this browser. No external services are connected.</footer>
    </main>
  </div>
}
