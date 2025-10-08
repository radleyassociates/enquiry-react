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

export interface AssetResult {
  obligorAPI: Obligor;
  vehicleId: number;
  buildingsAPI: Building[];
  id: number;
}
