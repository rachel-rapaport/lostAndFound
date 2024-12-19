import { FoundItem } from '../types/props/foundItem';

export const checkAnswers = (currentFoundItem: FoundItem | null, answers: string[]) => {
    // The answer at position 0 in the answer array for each question in the database is the correct answer
    const correctAnswers = currentFoundItem && currentFoundItem.questions
        ? currentFoundItem.questions.map(q => q.answers[0])
        : [];

    if (answers.length !== correctAnswers.length) {
        return false;
    }

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] != correctAnswers[i]) {
            return false;
        }
    }
    return true;
}