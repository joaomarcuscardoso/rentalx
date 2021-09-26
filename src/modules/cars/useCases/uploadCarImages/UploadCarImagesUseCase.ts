import { inject, injectable } from "tsyringe";

import { CarsRepository } from "@modules/cars/infra/repositories/CarsRepository";
import { CarsImagesRepository } from "@modules/cars/repositories/CarsImagesRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImageRepository: CarsImagesRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImageRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
