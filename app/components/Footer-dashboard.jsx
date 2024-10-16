import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    
  <footer
    class="bg-white text-indigo-500 text-center text-surface/75 dark:bg-neutral-700 dark:text-white/75 lg:text-left border-t-2 mt-10">
    
      

    <div class="mx-6 py-10 text-center md:text-left">
      <div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div class="">
          <h6
            class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
            <span class="me-3 [&>svg]:h-4 [&>svg]:w-4">
              
              
            </span>
            
          </h6>
          
        </div>
        <div>
          
            
        </div>
        <div>
          
        </div>
        <div>
          <h6
            class="mb-2 flex justify-center font-semibold uppercase md:justify-start">
            Contact
          </h6>
          <p class="mb-2 flex items-center justify-center md:justify-start">
            <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
              
            </span>
            
          </p>
          <p class="mb-2 flex items-center justify-center md:justify-start">
            <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </span>
            support@futureselflearning.com
          </p>
          <p class="mb-2 flex items-center justify-center md:justify-start">
            <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            + 01 234 567 88
          </p>
        </div>
      </div>
    </div>

    <div class="bg-black/5 p-4 text-center">
      <span>© 2024 Copyright </span>
      <a class="font-semibold" href="/"
        >FutureSelf Learning</a>
    </div>
  </footer>
  );
};

export default Footer;