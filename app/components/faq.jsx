import React from 'react';
import styled from 'styled-components';

const FaqContainer = styled.div`
    margin: 20px;
    justify: left;
`;

const FaqQuestion = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const FaqAnswer = styled.p`
    font-size: 14px;
    margin-bottom: 20px;
`;

const Faq = () => {
    const faqs = [
        {
        id: 1,
        question: 'What is this platform?',
        answer: 'This is a learning platform where you can find various courses and tutorials to learn new skills.',
        },
        {
        id: 2,
        question: 'How do I enroll in a course?',
        answer: 'To enroll in a course, simply click on the course title and follow the instructions to complete the enrollment process.',
        },
        {
        id: 3,
        question: 'Are these courses paid?',
        answer: 'We offer free education and skill development for underprivilaged students and individuals.',
        },
        {
        id: 4,
        question: 'How do I access my courses?',
        answer: 'Once you have enrolled in a course, you can access it by logging into your account and clicking on the course title.',
        }
    ];

    return (
        <FaqContainer>
                <h1 className=' mt-2 font-bold text-slate-600 text-left text-2xl m-5'>Q&A</h1>

        {faqs.map(faq => (
            <div key={faq.id} className='p-2 m-1 md:m-3 mb-5'>
            <FaqQuestion>{faq.question}</FaqQuestion>
            <FaqAnswer>{faq.answer}</FaqAnswer>
            <hr />
            </div>
        ))}
        </FaqContainer>
    );
};

export default Faq;