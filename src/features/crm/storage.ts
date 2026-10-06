import { createSampleWorkspace, stages, type WorkspaceData } from './model'

export const STORAGE_KEY = 'northwind.workspace.v1'
const MAX_BYTES = 250_000
export const MAX_TASKS = 500
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
const text = (value: unknown, max = 200): value is string => typeof value === 'string' && value.trim().length > 0 && value.length <= max
const id = (value: unknown): value is string => text(value, 100) && /^[a-zA-Z0-9_-]+$/.test(value)

function valid(data: unknown): data is WorkspaceData {
  if (!record(data) || !Array.isArray(data.accounts) || !Array.isArray(data.opportunities) || !Array.isArray(data.tasks)) return false
  if (!data.accounts.length || data.accounts.length > 100 || data.opportunities.length > 100 || data.tasks.length > MAX_TASKS) return false
  const accountIds = new Set<string>()
  for (const a of data.accounts) {
    if (!record(a) || !id(a.id) || accountIds.has(a.id) || !text(a.name) || !text(a.sector) || !text(a.contact) || !text(a.role) || !text(a.note, 1000)) return false
    accountIds.add(a.id)
  }
  const opportunityIds = new Set<string>()
  const opportunityAccounts = new Set<string>()
  for (const o of data.opportunities) {
    if (!record(o) || !id(o.id) || opportunityIds.has(o.id) || !id(o.accountId) || !accountIds.has(o.accountId) || opportunityAccounts.has(o.accountId) || !text(o.name) || typeof o.value !== 'number' || !Number.isFinite(o.value) || o.value < 0 || o.value > 1_000_000_000 || !stages.some(stage => stage === o.stage)) return false
    opportunityIds.add(o.id)
    opportunityAccounts.add(o.accountId)
  }
  if (opportunityAccounts.size !== accountIds.size) return false
  const taskIds = new Set<string>()
  for (const t of data.tasks) {
    if (!record(t) || !id(t.id) || taskIds.has(t.id) || !id(t.accountId) || !accountIds.has(t.accountId) || !text(t.title) || typeof t.completed !== 'boolean') return false
    taskIds.add(t.id)
  }
  return true
}

export function loadWorkspace(): WorkspaceData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw || raw.length > MAX_BYTES) return createSampleWorkspace()
    const parsed: unknown = JSON.parse(raw)
    return valid(parsed) ? parsed : createSampleWorkspace()
  } catch { return createSampleWorkspace() }
}
export function saveWorkspace(data: WorkspaceData): boolean {
  try {
    if (!valid(data)) return false
    const raw = JSON.stringify(data)
    if (raw.length > MAX_BYTES) return false
    localStorage.setItem(STORAGE_KEY, raw)
    return true
  } catch { return false }
}
export function resetWorkspace(): WorkspaceData {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* UI reports a failed replacement save. */ }
  return createSampleWorkspace()
}
