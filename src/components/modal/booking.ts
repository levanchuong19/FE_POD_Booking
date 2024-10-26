export type BookingService = {
    serviceId: string;
    nameService: string;
    quantity: number;
    totalPrice: number;
    imageUrl: string;
};

export type Booking = {
    id: string;
    code: string;
    podId: string;
    accountId: string;
    startTime: Date;
    endTime: Date;
    pricePerHour:number;
    totalPrice: number;
    paymentStatus: number | string;
    paymentMethod: number | string;
    bookingServices: BookingService[];
    podName:string;
    locationAddress:string;
};