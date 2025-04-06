import { User, DashboardStats } from '../interfaces';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  }
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalAgents: 156,
  activeAgents: 143,
  totalPolicies: 45,
  activePolicies: 38,
  recentAlerts: [
    {
      id: '1',
      type: 'warning',
      message: 'Agent XYZ is experiencing high CPU usage',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      read: false
    },
    {
      id: '2',
      type: 'error',
      message: 'Policy violation detected in Production environment',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      read: false
    },
    {
      id: '3',
      type: 'success',
      message: 'New agent successfully registered',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: true
    }
  ],
  agentStatus: [
    {
      id: '1',
      name: 'Production Server',
      status: 'online',
      lastSeen: new Date().toISOString(),
      type: 'Linux Server'
    },
    {
      id: '2',
      name: 'Development Server',
      status: 'warning',
      lastSeen: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      type: 'Windows Server'
    },
    {
      id: '3',
      name: 'Staging Server',
      status: 'offline',
      lastSeen: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      type: 'Linux Server'
    }
  ]
};
