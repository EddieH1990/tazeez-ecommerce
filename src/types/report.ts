export type ReportType = 
  | 'sales'
  | 'inventory'
  | 'customers'
  | 'groups'
  | 'financial';

export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface ReportFilter {
  startDate: string;
  endDate: string;
  type: ReportType;
  period: ReportPeriod;
  categories?: string[];
  status?: string[];
}

export interface ReportData {
  id: string;
  type: ReportType;
  period: ReportPeriod;
  generatedAt: string;
  data: any;
  filters: ReportFilter;
}