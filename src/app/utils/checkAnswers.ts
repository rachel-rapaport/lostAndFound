import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FoundItem } from '../types/props/foundItem';
import { User } from '../types/props/user';
import { blockItemForUser } from './blockItemForUser';

export const checkAnswers = (currentUser: User | null, currentFoundItem: FoundItem | null, answers: string[], router: AppRouterInstance) => {
    // The answer at position 0 in the answer array for each question in the database is the correct answer
    const correctAnswers = currentFoundItem && currentFoundItem.questions
        ? currentFoundItem.questions.map(q => q.answers[0])
        : [];

    if (answers.length !== correctAnswers.length) {
        throw new Error('The number of provided answers does not match the number of correct answers');
    }

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] != correctAnswers[i] && currentUser && currentFoundItem) {
            blockItemForUser(currentUser, currentFoundItem);
            router.push('/wrong-answers');
            return;
        }
    }
    router.push('/found-item-details');
}