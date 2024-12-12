import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} PitchHub. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link
                href="https://github.com/swapnilpatil-github"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  