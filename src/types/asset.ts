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

export interface ApiResponse {
  status: number;
  result: Asset[];
  validationMessages: any[];
}