import { prisma } from "../src/database.js";

import { faker } from "@faker-js/faker";

async function populateDB() {
    await prisma.recommendation.createMany({
        data: [
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}` 
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}` 
            },
            { 
                name: faker.music.songName(), 
                youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}` 
            }
        ]
    });
}

populateDB().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});