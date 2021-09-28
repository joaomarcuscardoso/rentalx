interface IDateProvider {
    compareInHours(start_date: Date, end_data: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_data: Date): number;
}

export { IDateProvider };
