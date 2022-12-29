import React from 'react';
import bg from '../../assets/images/background2.jpg'
const WriteDiary = () => {
    return (
      <div>
        <div className="relative">
          <div>
            <img className="h-screen w-full" src={bg} alt="" />
          </div>
          <div className="centered">
            <h3 className="lg:block hidden text-5xl font-bold text-center text-primary fontPoppins">
              WELCOME TO{" "}
            </h3>
            <h3 className="text-red-400 text-7xl font-bold font-Passions text-center">
              Day Diary
            </h3>
            <p className="text-white">ds</p>
           
          </div>
        </div>
      </div>
    );
};

export default WriteDiary;