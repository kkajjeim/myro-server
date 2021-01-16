import * as statisticService from '../service/statistic';
import {createConnection} from "typeorm";


describe('Test Generate Random Statstic', () => {

    beforeAll(async () => await createConnection());

    let service = statisticService;
    let userid = 1;

    it('should be defined', () => {
        expect(service.generateRandomStatistic).toBeDefined();
    });

    it('should return array', async () => {
        const result = await service.generateRandomStatistic(userid);
        expect(Array.isArray(result)).toBeTruthy();
    });

    it('each element should contains title', async () => {
        const result = await service.generateRandomStatistic(userid);
        expect(result[0]).toHaveProperty('title');
    });

    it('each element should contains routines', async () => {
        const result = await service.generateRandomStatistic(userid);
        expect(result[0]).toHaveProperty('contents');
    });

    it('each element should contains routines as array', async () => {
        const result = await service.generateRandomStatistic(userid);
        expect(Array.isArray(result[0]['contents'])).toBeTruthy();
    });
});

