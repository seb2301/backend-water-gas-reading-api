import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import Measure from "../../app/entities/Measure";
import { measureDataList } from "../../utils/seedData";

export class MeasureSeeder implements Seeder {
    track?: boolean | undefined;
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const measureRepository = dataSource.getRepository(Measure)

        const newMeasure = measureRepository.create(measureDataList)
        await measureRepository.save(newMeasure)
    }

}