import { faker } from "@faker-js/faker";
import { prisma } from "../database.js";

async function seedMany() {
    await prisma.recommendation.createMany({
        data: [
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 248
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 123
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 25
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 67
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 98
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 37
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 27
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 48
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 96
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 39
            },
            {
                name: faker.music.songName(),
                youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`,
                score: 168
            }
        ]
    });
}

async function seedOne() {
    await prisma.recommendation.create({
        data: {
            name: 'song one',
            youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`
        }
    });
}

async function clearDB() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
}

const testsRepository = {
    seedMany,
    seedOne,
    clearDB
};

export default testsRepository;