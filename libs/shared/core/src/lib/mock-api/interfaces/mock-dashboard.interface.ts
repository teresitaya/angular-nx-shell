export interface DashboardStats {
  totalAgents: number;
  activeAgents: number;
  totalPolicies: number;
  activePolicies: number;
  recentAlerts: Alert[];
  agentStatus: AgentStatus[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AgentStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  type: string;
}
