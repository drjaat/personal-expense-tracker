export const stages = ['Discovery', 'Proposal', 'Negotiation', 'Won'] as const
export type Stage = typeof stages[number]
export interface Account { id: string; name: string; sector: string; contact: string; role: string; note: string }
export interface Opportunity { id: string; accountId: string; name: string; value: number; stage: Stage }
export interface Task { id: string; accountId: string; title: string; completed: boolean }
export interface WorkspaceData { accounts: Account[]; opportunities: Opportunity[]; tasks: Task[] }

// All organizations, people, opportunities and values below are illustrative.
export const sampleAccounts: Account[] = [
  { id: 'alder', name: 'Alder Studio', sector: 'Design services', contact: 'Mira Solberg', role: 'Studio director', note: 'Exploring a shared workspace for client handoffs across two teams.' },
  { id: 'fieldwork', name: 'Fieldwork Supply', sector: 'Wholesale', contact: 'Ellis Navarro', role: 'Operations lead', note: 'Needs a clearer view of distributor conversations and next steps.' },
  { id: 'harbor', name: 'Harbor Editions', sector: 'Publishing', contact: 'Imani Hartwell', role: 'Commercial director', note: 'Reviewing the proposal with the editorial operations team.' },
  { id: 'juniper', name: 'Juniper Works', sector: 'Manufacturing', contact: 'Theo Okafor', role: 'Sales lead', note: 'Pilot scope agreed. Prepare a handoff for the implementation team.' },
]
export const sampleOpportunities: Opportunity[] = [
  { id: 'opp-alder', accountId: 'alder', name: 'Team workspace', value: 18400, stage: 'Discovery' },
  { id: 'opp-fieldwork', accountId: 'fieldwork', name: 'Distributor rollout', value: 32600, stage: 'Proposal' },
  { id: 'opp-harbor', accountId: 'harbor', name: 'Editorial operations', value: 24750, stage: 'Negotiation' },
  { id: 'opp-juniper', accountId: 'juniper', name: 'Regional pilot', value: 12800, stage: 'Won' },
]
export const sampleTasks: Task[] = [
  { id: 'task-alder', accountId: 'alder', title: 'Confirm the two team leads for discovery', completed: false },
  { id: 'task-fieldwork', accountId: 'fieldwork', title: 'Send the distributor workflow outline', completed: false },
  { id: 'task-harbor', accountId: 'harbor', title: 'Share the revised proposal', completed: true },
]
export function createSampleWorkspace(): WorkspaceData {
  return { accounts: sampleAccounts.map(a => ({ ...a })), opportunities: sampleOpportunities.map(o => ({ ...o })), tasks: sampleTasks.map(t => ({ ...t })) }
}
