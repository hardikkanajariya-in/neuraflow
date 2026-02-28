export const BRAND_NAME = 'NeuraFlow';
export const BRAND_TAGLINE = 'AI Workflow Automation';
export const CREDIT_NAME = 'Hardik Kanajariya';
export const CREDIT_URL = 'https://hardikkanajariya.in';
export const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50] as const;
export const DEFAULT_ITEMS_PER_PAGE = 10;
export const MAX_TOASTS = 3;
export const TOAST_DURATION = 4000;
export const SKELETON_MIN_MS = 400;
export const SKELETON_MAX_MS = 900;
export const SCROLL_THRESHOLD = 400;

export const PROJECT_TEMPLATES = [
  { id: 'blank', name: 'Blank Project', description: 'Start from scratch with an empty project', icon: 'FileText' },
  { id: 'data-pipeline', name: 'Data Pipeline', description: 'ETL pipeline with data validation and transformation', icon: 'Database' },
  { id: 'ml-workflow', name: 'ML Workflow', description: 'End-to-end machine learning pipeline with model training', icon: 'Brain' },
  { id: 'api-integration', name: 'API Integration', description: 'Connect and synchronize multiple API endpoints', icon: 'Globe' },
  { id: 'notification', name: 'Notification System', description: 'Multi-channel notification workflow with routing', icon: 'Bell' },
  { id: 'monitoring', name: 'Monitoring Suite', description: 'System health checks with alerting and reporting', icon: 'Activity' },
] as const;

export const UNSPLASH_BASE = 'https://images.unsplash.com';

export const PHOTO_IDS = {
  hero: 'photo-1677442136019-21780ecad995',
  featureAI: 'photo-1620712943543-bcc4688e7485',
  featureData: 'photo-1451187580459-43490279c0fa',
  featureAutomation: 'photo-1518770660439-4636190af475',
  dashboard: 'photo-1551288049-bebda4e38f71',
  team1: 'photo-1507003211169-0a1dd7228f2d',
  team2: 'photo-1573496359142-b8d87734a5a2',
  team3: 'photo-1472099645785-5658abf4ff4e',
  team4: 'photo-1580489944761-15a19d654956',
  office: 'photo-1497366216548-37526070297c',
  workspace: 'photo-1555949963-aa79dcee981c',
  blogDocs: 'photo-1504868584819-f8e8b4b6d7e3',
  security: 'photo-1563986768609-322da13575f2',
  collaboration: 'photo-1497366811353-6870744d04b2',
} as const;

export function unsplashUrl(photoId: string, width: number, height: number): string {
  return `${UNSPLASH_BASE}/${photoId}?w=${width}&h=${height}&fit=crop&q=80`;
}
