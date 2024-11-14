import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div>
      <Link href={'/'} className='hover:text-blue-500 transition-all'>
        Beranda
      </Link>
    </div>
  );
};

export default Navbar;
