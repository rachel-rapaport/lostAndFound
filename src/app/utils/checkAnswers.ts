import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FoundItem } from '../types/props/foundItem';
import { User } from '../types/props/user';
import { blockItemForUser } from './blockItemForUser';

export const checkAnswers = (currentUser: User | null, currentFoundItem: FoundItem | null, answers: string[], setCurrentFoundItem: (foundItem: FoundItem | null) => void, router: AppRouterInstance) => {
    // The answer at position 0 in the answer array for each question in the database is the correct answer
    const correctAnswers = currentFoundItem && currentFoundItem.questions
        ? currentFoundItem.questions.map(q => q.answers[0])
        : [];

    if (answers.length !== correctAnswers.length) {
        console.log("answers", answers);
        console.log("correctAnswers", correctAnswers);

        throw new Error('The number of provided answers does not match the number of correct answers');
    }

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] != correctAnswers[i] && currentUser && currentFoundItem) {
            blockItemForUser(currentUser, currentFoundItem, setCurrentFoundItem);
            router.replace('/wrong-answers');
            return;
        }
    }
    router.replace('/found-item-details');
}