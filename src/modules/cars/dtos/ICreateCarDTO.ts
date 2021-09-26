import { Specification } from "../infra/entities/Specification";

interface ICreateCarDTO {
    name: string;
    description: string;
    license_plate: string;
    brand: string;
    category_id: string;
    daily_rate: number;
    fine_amount: number;
    specifications?: Specification[];
    id?: string;
}

export { ICreateCarDTO };
