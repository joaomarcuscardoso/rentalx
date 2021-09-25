import { getRepository, Repository } from "typeorm";

import { Category } from "@modules/cars/infra/entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = getRepository(Category);
    }
    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }

    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        // Add into database
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const category = await this.repository.find();
        return category;
    }

    async findByName(name: string): Promise<Category> {
        // Select * from categories where name = "name"
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export { CategoriesRepository };
