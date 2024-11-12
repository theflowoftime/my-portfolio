import { SocialIcons } from "./hero";
import { LogoWithName } from "./ui/navbar";

function Footer() {
  return (
    <div className="bg-gradient bg-[length:400%_400%] opacity-90 animate-gradient h-[13rem] mt-16 bg-neutral-900 bg-clip-padding backdrop-filter bg-opacity-20">
      <div className="container flex justify-between h-full pt-8 pb-4 text-white">
        <div className="space-y-2">
          <LogoWithName />
          <span className="text-white/80">flowoftime@gmail.com</span>
        </div>
        <div className="place-self-end">
          Copyright {new Date().getFullYear()}. Made by Yacine
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg">Media</h3>
          <SocialIcons className="flex gap-x-2" size="lg" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
