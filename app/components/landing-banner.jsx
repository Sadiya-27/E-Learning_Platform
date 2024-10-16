// components/Banner.js


import { Button } from '@/components/ui/button';
// import { Button } from '@/components/ui/button';
// import { SignIn } from '@clerk/nextjs';
// import Image from 'next/image'

// const Banner = () => {
//   return (
//     <div className="relative h-screen border rounded-lg mt-10 ">
//         <div className=" w-90 h-90 mt-10 border rounded-md">
//             <Image 
//                 src="/Banner.jpeg"
//                 layout="fill"
//                 objectFit="cover"
//                 alt="Banner Image"
//                 className="opacity-1"
//             />
//             <div>

//                 <div className="absolute inset-0 flex items-center justify-end mr-20">
//                     <div className='flex-block'>
//                         <h1 className="text-white text-4xl font-bold ">Welcome to FutureSelf Learning</h1> 
//                     </div>
                    
//                 </div>
//                 <div className="absolute inset-0 flex items-center justify-end mt-20 mr-20">
//                     <div className='flex-block'>
//                         <h2 className='text-white text-xl font-bold '>Educate and Gain Indemand skills for Free !</h2>
//                     </div>
//                 <Button className='bg-indigo-700 mt-40 justify-center items-start mr-50'>Get Started</Button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Banner;

import Image from 'next/image';

const Banner = () => {
  return (
    <div className="flex flex-wrap relative h-screen w-full bg-cover bg-center rounded-2xl shadow-2xl mt-10" style={{ backgroundImage: `url('/Banner.jpeg')` }}>
      <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 text-left text-white md:text-center lg:text-left xl:text-left">
        <h1 className="flex flex-wrap text-white text-5xl font-bold mb-4 animate-fade-in text-left md:text-4xl lg:text-5xl xl:text-5xl">Welcome to FutureSelf Learning</h1>
        <p className="flex flex-wrap text-xl mb-6 animate-fade-in text-left md:text-lg lg:text-xl xl:text-xl">Educate and Gain Indemand Skills for Free!</p>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-medium py-2 px-6 transition duration-300 md:w-full lg:w-auto xl:w-auto">
          <a href="/sign-up">Start your Journey</a>
        </Button>
      </div>
    </div>
  );
};

export default Banner;