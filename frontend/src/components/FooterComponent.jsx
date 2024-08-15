import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div className="bg-footer_black h-[50vh] pt-16 pb-16 flex flex-col items-center">
      <div className="flex justify-between w-[85%]">
        <div className="flex flex-col flex-1 items-center">
          <h3 className="text-white text-h3 font-bold uppercase">About</h3>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Contact us
            </p>
          </Link>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              About us
            </p>
          </Link>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Careers
            </p>
          </Link>
        </div>
        <div className="flex flex-col flex-1 items-center">
          <h3 className="text-white text-h3 font-bold uppercase">Help</h3>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Payment
            </p>
          </Link>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Shipping
            </p>
          </Link>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Cancellation & Returns
            </p>
          </Link>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">FAQs</p>
          </Link>
        </div>
        <div className="flex flex-col flex-1 items-center">
          <h3 className="text-white text-h3 font-bold uppercase hover:text-white">
            Social
          </h3>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Facebook
            </p>
          </Link>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Instagram
            </p>
          </Link>
          <Link>
            <p className="text-dull_grey text-lg mt-3 hover:text-white">
              Twitter
            </p>
          </Link>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default FooterComponent;
