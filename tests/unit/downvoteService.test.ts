import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

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

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationService.downvote(1)).rejects.toEqual({type: "not_found", message: ""});
    });
})