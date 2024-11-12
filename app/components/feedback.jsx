'use state'
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

function FeedbackForm({ courseId, userId, onClose }) {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback || !rating) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            await axios.put('/api/feedback', { courseId, userId, feedback, rating });
            
            onClose(); // Close the form after successful submission
            toast.success('Feedback submitted successfully.');
        } catch (err) {
            console.error(err);
            setError('An error occurred while submitting your feedback.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Give Your Feedback</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="rating">
                            Rating
                        </label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select a rating</option>
                            <option value="1">1 - Very Poor</option>
                            <option value="2">2 - Poor</option>
                            <option value="3">3 - Average</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="feedback">
                            Feedback
                        </label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows="4"
                            className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;
