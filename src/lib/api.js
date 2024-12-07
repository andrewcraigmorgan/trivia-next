export const fetchTriviaQuestions = async (amount = 10, category, difficulty) => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
};
