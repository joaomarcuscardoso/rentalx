import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_data: Date): number {
        const en_data_utf = this.convertToUTC(end_data);
        const start_date_utf = this.convertToUTC(start_date);

        return dayjs(en_data_utf).diff(start_date_utf, "hours");
    }
    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }
}

export { DayjsDateProvider };
