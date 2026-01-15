
export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  VIEWER = 'VIEWER'
}

export enum StrategyType {
  BEST_POSITION = 'BEST_POSITION',
  TOP_3 = 'TOP_3',
  PROTECT_POSITION = 'PROTECT_POSITION',
  EXCLUDE_COMPETITOR = 'EXCLUDE_COMPETITOR',
  LIMIT_VALUE = 'LIMIT_VALUE'
}

export enum ReductionType {
  VALUE = 'VALUE',
  PERCENTAGE = 'PERCENTAGE'
}

export type PortalStatusType = 'OPERANTE' | 'INSTAVEL' | 'PARADO';

export interface PortalModuleStatus {
  encontrar: PortalStatusType;
  cadastrar: PortalStatusType;
  disputar: PortalStatusType;
  monitorar: PortalStatusType;
}

export interface Portal {
  id: string;
  name: string;
  status: PortalStatusType;
  modules: PortalModuleStatus;
}

export interface RobotConfig {
  id: string;
  strategy: StrategyType;
  reduction_type: ReductionType;
  min_reduction: number;
  max_reduction: number;
  min_value: number;
  auto_extension_min: number;
  auto_extension_sec: number;
  is_active: boolean;
}

export interface Keyword {
  id: string;
  text: string;
  priority_color: 'yellow' | 'orange' | 'light_blue' | 'dark_blue' | 'gray';
}
