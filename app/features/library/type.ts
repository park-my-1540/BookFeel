export type Library = {
  libCode: string;
  libName: string;
  address?: string;
  tel?: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
};

export type LoanStatus = {
  libCode: string;
  loanAvailable: boolean; // true=대출 가능
  returnDate?: string; // 대출 중이면 반납 예정일 존재 가능
};
