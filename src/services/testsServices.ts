import testsRepository from "../repositories/testsRepositories.js";

async function seedMany() {
    await testsRepository.seedMany();
}

async function seedOne() {
    await testsRepository.seedOne();
}

async function resetDB() {
    await testsRepository.clearDB();
}

const testsServices = {
    seedMany,
    seedOne,
    resetDB
};

export default testsServices;