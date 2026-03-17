import { esignProcess, ProcessStatus, SignatureMode, SignatoryStatus, KPI, ZoneType } from '../models/esign.model';

export const MOCK_KPIS: KPI = {
  total: 147,
  inProgress: 23,
  completed: 118,
  refused: 6,
  growth: '+12'
};

export const MOCK_PROCESSES: esignProcess[] = [
  {
    id: '1',
    reference: 'SIG-2026-0182',
    title: 'Contrat Leasing VL',
    clientName: 'Auto Finances SA',
    status: ProcessStatus.IN_PROGRESS,
    mode: SignatureMode.SEQUENTIAL,
    createdAt: new Date('2026-03-17T12:04:00'),
    expiresAt: new Date('2026-03-18T12:04:00'),
    documentUrl: 'assets/pdf/contract.pdf',
    signatories: [
      {
        id: 's1',
        name: 'Jamel Ben Ali',
        email: 'j.benali@autofinances.tn',
        phone: '+216 22 123 456',
        status: SignatoryStatus.IN_PROGRESS,
        order: 1,
        lastAction: 'Lien ouvert : il y a 5 min',
        otpVerified: false
      },
      {
        id: 's2',
        name: 'Fatima Zahra',
        email: 'f.zahra@autofinances.tn',
        status: SignatoryStatus.PENDING,
        order: 2,
        otpVerified: false
      }
    ],
    zones: [
      {
        id: 'z1',
        type: ZoneType.SIGNATURE,
        pageNumber: 3,
        x: 10,
        y: 68,
        width: 82,
        height: 26,
        signatoryId: 's1',
        isRequired: true
      },
      {
        id: 'z2',
        type: ZoneType.INITIALS,
        pageNumber: 3,
        x: 10,
        y: 55,
        width: 72,
        height: 22,
        signatoryId: 's1',
        isRequired: true
      }
    ]
  },
  {
    id: '2',
    reference: 'SIG-2026-0181',
    title: 'Avenant financement bateau',
    clientName: 'Marine Credit SAS',
    status: ProcessStatus.COMPLETED,
    mode: SignatureMode.PARALLEL,
    createdAt: new Date('2026-03-16T16:42:00'),
    expiresAt: new Date('2026-03-23T16:42:00'),
    documentUrl: 'assets/pdf/contract2.pdf',
    signatories: [],
    zones: []
  },
  {
    id: '3',
    reference: 'SIG-2026-0180',
    title: 'Contrat LLD',
    clientName: 'LLD Partners',
    status: ProcessStatus.COMPLETED,
    mode: SignatureMode.SEQUENTIAL,
    createdAt: new Date('2026-03-16T11:18:00'),
    expiresAt: new Date('2026-03-23T11:18:00'),
    documentUrl: 'assets/pdf/contract3.pdf',
    signatories: [],
    zones: []
  },
  {
    id: '4',
    reference: 'SIG-2026-0179',
    title: 'PV livraison équipement',
    clientName: 'Industriel Maghreb',
    status: ProcessStatus.REFUSED,
    mode: SignatureMode.PARALLEL,
    createdAt: new Date('2026-03-15T09:00:00'),
    expiresAt: new Date('2026-03-22T09:00:00'),
    documentUrl: 'assets/pdf/contract4.pdf',
    signatories: [],
    zones: []
  },
  {
    id: '5',
    reference: 'SIG-2026-0178',
    title: 'Contrat crédit automobile',
    clientName: 'Auto Finances SA',
    status: ProcessStatus.EXPIRED,
    mode: SignatureMode.SEQUENTIAL,
    createdAt: new Date('2026-03-10T10:00:00'),
    expiresAt: new Date('2026-03-17T10:00:00'),
    documentUrl: 'assets/pdf/contract5.pdf',
    signatories: [],
    zones: []
  }
];
