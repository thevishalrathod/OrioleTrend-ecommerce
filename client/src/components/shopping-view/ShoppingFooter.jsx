import { Facebook, InstagramIcon, Twitter, Youtube } from "lucide-react";
import React from "react";

const aboutSection = [
  "Contact Us",
  "About Us",
  "Oriole Stories",
  "Corporate Information",
];

const ShoppingFooter = () => {
  return (
    <div className="w-full bg-[#212121] text-white text-sm">
      <div
        //  className="p-3 flex justify-around w-full bg-[#212121] h-[200px] text-white text-sm"
        className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 lg:grid-cols-4 lg:flex lg:justify-around"
      >
        <div className="">
          <h4 className="text-muted-foreground">ABOUT</h4>
          <ul className="mt-4">
            {aboutSection.map((item) => (
              <li className="cursor-pointer hover:underline">{item}</li>
            ))}
          </ul>
        </div>
        <div className="text-wrap max-w-[200px]">
          <h4 className="text-muted-foreground">Mail Us</h4>
          <div className="mt-4">
            <p>
              Oriole Internet Private Limited, Building No. 1, Opposite Fuel
              Station, Banglore, KA
            </p>
            <p>Email: orioletrends@support.com</p>
          </div>
        </div>
        <div className="text-wrap max-w-[200px]">
          <h4 className="text-muted-foreground">Registered Office Address:</h4>
          <div className="mt-4">
            <p>
              Oriole Internet Private Limited, Building No. 1, Opposite Fuel
              Station, Banglore, KA
            </p>
          </div>
        </div>
        <div className="">
          <h4 className="text-muted-foreground">Social:</h4>
          <div className="mt-4 flex flex-col justify-between gap-2 cursor-pointer">
            <InstagramIcon />
            <Facebook />
            <Youtube />
            <Twitter />
          </div>
        </div>
      </div>

      <div className="w-full text-center p-2">
        Made with love ❤️, by Vishal in Indore{" "}
      </div>
    </div>
  );
};

export default ShoppingFooter;
