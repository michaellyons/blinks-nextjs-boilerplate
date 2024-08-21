import Image from 'next/image';
import { FC } from 'react';
import './page.css';

const BlinkPage: FC = () => {
  return (
    <div className="container">
      <Image 
        src="/tipjar.png" 
        alt="Blink Image" 
        width={300} 
        height={300} 
        className="image"
      />
      <h1 className="text">Welcome to my blink page!</h1>
    </div>
  );
};

export default BlinkPage;
