import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const en_data_utf = this.convertToUTC(end_date);
        const start_date_utf = this.convertToUTC(start_date);

        return dayjs(en_data_utf).diff(start_date_utf, "hours");
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const en_data_utf = this.convertToUTC(end_date);
        const start_date_utf = this.convertToUTC(start_date);

        return dayjs(en_data_utf).diff(start_date_utf, "days");
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }
}

export { DayjsDateProvider };
