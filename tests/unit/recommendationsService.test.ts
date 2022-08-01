import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe('testing the insert service', () => {
    it('insert new recommendation', async () => {
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {
            return null;
        });
        jest.spyOn(recommendationRepository, 'create').mockImplementationOnce((): any => {
            return null;
        });

        await recommendationService.insert({ name: 'aaaa', youtubeLink: 'link' });

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();

    });


    it('throw error if recommendation already exists', async () => {
        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {
            return true;
        });

        const promise = await recommendationService.insert({ name: 'aaaa', youtubeLink: 'link' });
        
        expect(promise).rejects.toEqual({type: "conflict", message: "Recommendations names must be unique"});
    });
})


describe('testing the upvote service', () => {
    it('upvote the recommendation', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return { id: 1, name: 'aaaa', youtubeLink: 'link', score: 2 };
        });
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => {});

        recommendationService.upvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();

    });


    it('throw error if recommendation does not exist', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return false;
        });

        const promise = await recommendationService.upvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(promise).rejects.toEqual({type: "not_found", message: ""});
    });
})


describe('testing the downvote service', () => {
    it('downvote the recommendation', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return { id: 1, name: 'aaaa', youtubeLink: 'link', score: 2 };
        });
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => {
            return { id: 1, name: 'aaaa', youtubeLink: 'link', score: 1 };
        });

        await recommendationService.upvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();

    });


    it('downvote should delete the recommendation if score < -5', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return { id: 1, name: 'aaaa', youtubeLink: 'link', score: -5 };
        });
        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => {
            return { id: 1, name: 'aaaa', youtubeLink: 'link', score: -6 };
        });
        jest.spyOn(recommendationRepository, 'remove').mockImplementationOnce((): any => {});

        await recommendationService.downvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });


    it('throw error if recommendation does not exist', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return false;
        });

        const promise = recommendationService.downvote(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(promise).rejects.toEqual({type: "not_found", message: ""});
    });
})


describe('testing getting the last 10 recommendations', () => {
    it('get the last 10 recommendations', async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return true;
        });

        await recommendationService.get();

        expect(recommendationRepository.findAll).toBeCalled();
    });
})


describe('testing getting a recommendation by id', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
        jest.resetAllMocks();
    });


    it('get recommendation by id', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return { id: 1, name: 'aaaa', youtubeLink: 'link', score: 5 };
        });

        await recommendationService.get();

        expect(recommendationRepository.find).toBeCalled();
    });


    it('throw error when id does not exist', async () => {
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
            return null;
        });

        const promise = await recommendationService.getById(200);
        console.log(promise);
        

        expect(promise).rejects.toContainEqual({type: "not_found", message: ""});
    });
})


describe('testing getting a random recommendation', () => {
    it('testing the flow and return', async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });

        const result: any = await recommendationService.getRandom();

        expect(recommendationRepository.findAll).toBeCalled();
        expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(result));
    });


    it('throw error when there are no recommendations', async () => {
        jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
            return [];
        });

        const promise = recommendationService.getRandom();

        expect(promise).rejects.toEqual({type: "not_found", message: ""});
    });
})


describe('testing getting the top x amount', () => {
    it('testing the flow', async () => {
        jest.spyOn(recommendationRepository, 'getAmountByScore').mockImplementationOnce((): any => {
            return null;
        });

        await recommendationService.getTop(4);

        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });
})