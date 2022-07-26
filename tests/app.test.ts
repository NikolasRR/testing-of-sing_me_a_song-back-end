import supertest from "supertest";
import "dotenv/config";
import { faker } from "@faker-js/faker";

import app from "../src/app.js";
import { prisma } from "../src/database.js";

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
})

describe('post /recommendations', () => {
    it('given name and youtube link it should succeed and persist recommendation', async () => {
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: `https://www.youtube.com/watch?v=${faker.internet.password()}`
        };
        console.log(recommendation);


        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).not.toBeNull();
    });

    it('given no name and youtube link it should not succeed and persist recommendation', async () => {
        const recommendation = {
            name: '',
            youtubeLink: `https://www.youtube/watch?v=${faker.internet.password()}`
        }

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).not.toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).toBeNull();
    });

    it('given name and no link it should not succeed and persist recommendation', async () => {
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: ``
        }

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).not.toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).toBeNull();
    });

    it('given name and a link that`s not from youtube it should not succeed and persist recommendation', async () => {
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: faker.internet.url()
        }

        const response = await supertest(app)
            .post('/recommendations')
            .send(recommendation);
        expect(response.statusCode).not.toBe(201);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { name: recommendation.name } });
        expect(persisted).toBeNull();
    });
})

describe('post /recommendations/:id/upvote', () => {
    it('posted upvote w/ correct ID, without body, should succeed and persist', async () => {
        const response = await supertest(app)
            .post('/recommendations/1/upvote');
        expect(response.statusCode).toBe(200);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { id: 1 } });
        expect(persisted.score).toBe(1);
    });

    it('posted upvote w/ non existent ID, without body, should not succeed and persist', async () => {
        const response = await supertest(app)
            .post('/recommendations/9/upvote');
        expect(response.statusCode).toBe(404);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { id: 9 } });
        expect(persisted).toBeNull();
    });

    it('posted upvote w/ incorrect ID, without body, should not succeed', async () => {
        const response = await supertest(app)
            .post('/recommendations/ar2/upvote');
        expect(response.statusCode).not.toBe(200);
    });
})

describe('post /recommendations/:id/downvote', () => {
    it('posted upvote w/ correct ID, without body, should succeed and persist', async () => {
        const response = await supertest(app)
            .post('/recommendations/1/downvote');
        expect(response.statusCode).toBe(200);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { id: 1 } });
        expect(persisted.score).toBe(0);
    });

    it('posted upvote w/ non existent ID, without body, should not succeed and persist', async () => {
        const response = await supertest(app)
            .post('/recommendations/9/downvote');
        expect(response.statusCode).toBe(404);

        const persisted = await prisma
            .recommendation
            .findFirst({ where: { id: 9 } });
        expect(persisted).toBeNull();
    });

    it('posted upvote w/ incorrect ID, without body, should not succeed', async () => {
        const response = await supertest(app)
            .post('/recommendations/ar2/downvote');
        expect(response.statusCode).not.toBe(200);
    });
})