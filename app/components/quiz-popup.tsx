import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface QuizPopupProps {
    quiz: { question: string; options: { option: string }[]; answer: string }[];
    onClose: () => void;
    courseId: string;
    courseTitle: string;
    sectionName: string;
    userId: string;
    sectionId: string;
}

const QuizPopup: React.FC<QuizPopupProps> = ({ quiz, onClose, courseId, courseTitle, sectionName, userId, sectionId }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(quiz.length).fill(''));
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[index] = event.target.value;
        setSelectedAnswers(newAnswers);
    };

    const saveScoreToDatabase = async (userId: string, courseId: string, sectionName: string, quizScore: number, sectionId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/student/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    courseId, 
                    quizId: sectionId, // Use sectionId as the quiz identifier
                    sectionName, 
                    quizScore 
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save score');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        if (currentQuestionIndex < quiz.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const calculatedScore = selectedAnswers.reduce((total, answer, index) => {
                return answer === quiz[index].answer ? total + 1 : total;
            }, 0);
            setScore(calculatedScore);
            await saveScoreToDatabase(userId, courseId, sectionName, calculatedScore, sectionId);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg md:w-1/2 w-auto mx-6">
                <h2 className="text-xl text-indigo-600 font-bold mb-4">Quiz</h2>
                {score !== null ? (
                    <div className="text-center bg-indigo-200 p-4 rounded-xl">
                        {score / quiz.length >= 0.6 ? (
                            <>
                                <h3 className="text-lg text-green-500 animate-bounce">
                                    Your Score: {score} out of {quiz.length}
                                </h3>
                                <h4 className="text-lg text-indigo-500 animate-bounce">
                                    Congratulations! You passed!
                                </h4>
                                <img src='/celebrating.png' alt="Congratulations!" className="md:w-52 md:h-52 mx-auto mt-4" />
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg text-indigo-500 animate-shake">
                                    Your Score: {score} out of {quiz.length}
                                </h3>
                                <h4 className="text-lg text-indigo-500">
                                    Don't give up! Try again
                                </h4>
                                <img src='/tryagain.png' alt="try again" className="md:w-52 md:h-52 mx-auto mt-4" />
                            </>
                        )}
                        <button onClick={onClose} className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded">
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <p className="font-semibold">{quiz[currentQuestionIndex].question}</p>
                            <ul>
                                {quiz[currentQuestionIndex].options.map((option, optIndex) => (
                                    <li key={optIndex} className="mt-2">
                                        <label>
                                            <input 
                                                type="radio" 
                                                name={`question-${currentQuestionIndex}`} 
                                                value={option.option} 
                                                checked={selectedAnswers[currentQuestionIndex] === option.option}
                                                onChange={(e) => handleAnswerChange(e, currentQuestionIndex)} 
                                                className="mr-3"
                                            />
                                            {option.option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between">
                            <Button 
                                onClick={handlePrevious} 
                                className={`mt-4 bg-indigo-600 text-white p-2 rounded ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </Button>
                            <Button 
                                onClick={handleNext} 
                                className={`mt-4 bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                disabled={currentQuestionIndex === quiz.length - 1 && selectedAnswers[currentQuestionIndex] === '' && score === null}
                            >
                                {currentQuestionIndex === quiz.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizPopup;
