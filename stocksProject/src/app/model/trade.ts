export class Trade {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    action: string;
    
    stockId: string;
    stockName: string;
    stockPrice: number;
    amount: number;
  }