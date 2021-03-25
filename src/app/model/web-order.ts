export interface WebOrder {
    orderId: number;
    webOrderNumber: string;
    accountId: string;
    storeAlias: string;
    country: string;
    parts: string;
    carrier: string;
    inductionStatus: string;
    orderStatus: string;
    orderType: string;
    paymentType: string;
    created: string;
    keywords: string;
}
