import React from 'react';

const Goals = () => {
  return (
    <div className="flex flex-wrap mt-10 text-center mb-4">
      <div className="flex text-center justify-center flex-wrap mx-auto p-4 md:p-2 lg:p-2 xl:p-2 shadow-xl rounded-3xl bg-blue-200 text-gray-700 w-full md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto z-10">
        <h2 className="text-3xl text-blue-800 items-center justify-center text-center font-bold mb-4">Our Goals</h2>
        <ul className="list-none px-10 overflow-y-auto">
          <li className="mb-4 bg-sky-100 p-5 rounded-xl">
            <h3 className="text-xl text-blue-800 font-bold mb-2">Empower Lifelong Learning</h3>
            <p className="text-lg">Our goal is to provide free access to high-quality educational resources, empowering individuals to take control of their learning journey and acquire new skills for a better future.</p>
          </li>
          <li className="mb-4 bg-sky-100 p-5 rounded-xl">
            <h3 className="text-xl text-blue-800 font-bold mb-2">Bridge the Skills Gap</h3>
            <p className="text-lg">We aim to bridge the gap between education and industry by offering in-demand skills training, enabling individuals to stay relevant in a rapidly changing job market and pursue their career aspirations.</p>
          </li>
          <li className="mb-4 bg-sky-100 p-5 rounded-xl">
            <h3 className="text-xl text-blue-800 font-bold mb-2">Democratize Education</h3>
            <p className="text-lg">Our mission is to democratize education by making it accessible, affordable, and inclusive for all, regardless of geographical or socio-economic barriers, and to foster a community of lifelong learners.</p>
          </li>
          <li className="mb-4 bg-sky-100 p-5 rounded-xl">
            <h3 className="text-xl text-blue-800 font-bold mb-2">Unlock Human Potential</h3>
            <p className="text-lg">We strive to unlock human potential by providing a platform for individuals to discover their strengths, develop new skills, and pursue their passions, leading to a more fulfilling and purpose-driven life.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goals;