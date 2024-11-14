import Link from 'next/link';
import React from 'react';

const LinkinPark = () => {
  return (
    <div className='flex space-x-5'>
      <Link href={'/drag'} className='hover:text-blue-500 transition-all'>
        DragnDrop
      </Link>
      <Link href={'/moving'} className='hover:text-blue-500 transition-all'>
        D3.js (Moving Box)
      </Link>
      <Link href={'/tariksis'} className='hover:text-blue-500 transition-all'>
        Manual Picking
      </Link>
    </div>
  );
};

const page = () => {
  return (
    <div className='flex justify-center items-center h-screen flex-col space-y-5'>
      <h1 className='text-4xl font-semibold'>Playgorund dekOchaa</h1>
      <LinkinPark />
    </div>
  );
};

export default page;
