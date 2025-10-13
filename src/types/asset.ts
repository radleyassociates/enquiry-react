export interface Asset {
  obligorId: number;
  enquiryId: number;
  obligorRef: string;
  currentValuation: number;
  sectorId: number;
  sector: string;
  address: string;
  zipcode: string;
  country: string;
  lat?: number;
  lng?: number;
  status?: string;
  fund?: string;
}

export interface ApiResponse<T> {
  message?: string;
  status: number;
  result: T;
  validationMessages: any[];
}

interface Obligor {
  id: number;
  customerName: string;
  ref: string;
  country: string;
}

interface Building {
  id: number;
  buildingRef: string;
  currentValuation: number;
  mostRecentValuationDate: number;
}

interface ApiOutputs {
  dcfmean: number;
  ellifetimeAverage: number;
  expectedLoss: number;
  id: number;
  irrmean: number;
  lossGivenDefault: number;
  pdlifetimeAverage: number;
  probabilityDefault: number;
}

export interface AssetResult {
  apiOutputs: ApiOutputs;
  obligorAPI: Obligor;
  vehicleId: number;
  buildings: Building[];
  id: number;
}
