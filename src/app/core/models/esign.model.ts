export enum SignatoryStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REFUSED = 'REFUSED',
  EXPIRED = 'EXPIRED'
}

export enum ProcessStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REFUSED = 'REFUSED',
  EXPIRED = 'EXPIRED'
}

export enum SignatureMode {
  SEQUENTIAL = 'SEQUENTIAL',
  PARALLEL = 'PARALLEL'
}

export enum ZoneType {
  SIGNATURE = 'SIGNATURE',
  INITIALS = 'PARAPHE',
  RADIO = 'RADIO',
  DATE = 'DATE',
  STAMP = 'STAMP'
}

export interface Signatory {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: SignatoryStatus;
  order: number;
  lastAction?: string;
  ipAddress?: string;
  otpVerified: boolean;
}

export interface SignatureZone {
  id: string;
  type: ZoneType;
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  signatoryId: string;
  isRequired: boolean;
  value?: string;
}

export interface esignProcess {
  id: string;
  reference: string;
  title: string;
  clientName: string;
  status: ProcessStatus;
  mode: SignatureMode;
  createdAt: Date;
  expiresAt: Date;
  documentUrl: string;
  signatories: Signatory[];
  zones: SignatureZone[];
}

export interface KPI {
  total: number;
  inProgress: number;
  completed: number;
  refused: number;
  growth: string;
}
