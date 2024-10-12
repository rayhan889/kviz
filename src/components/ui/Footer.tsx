import React from "react";

const Footer = () => {
  return (
    <div
      className="fixed bottom-0 h-16 w-full border-t border-slate-300 px-[6.25rem] z-50
    bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg flex items-center justify-center"
    >
      Made with ❤️ by{" "}
      <a
        href="https://www.instagram.com/rynrama_/"
        className="hover:underline ml-1"
      >
        {" "}
        Rayhan Atmadja
      </a>
    </div>
  );
};

export default Footer;
