import logo from "@/public/img/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image src={logo} alt="YMMO.IO Logo" width={50} height={50} />
      </div>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Header;
