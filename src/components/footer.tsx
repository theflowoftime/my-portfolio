import { Copyright, Mail, Phone } from "lucide-react";
import SocialIcons from "./sub-components/icons/social-icons";
import LogoWithName from "./sub-components/site-logo";

function Footer() {
  return (
    <div className="bg-gradient bg-[length:400%_400%] opacity-90 animate-gradient h-[13rem] mt-16 bg-neutral-900 bg-clip-padding backdrop-filter bg-opacity-20">
      <div className="container flex flex-col justify-between min-h-full py-4 text-white">
        <div className="flex flex-wrap justify-between">
          <div className="space-y-2">
            <LogoWithName />
            <div className="space-x-2">
              <Mail className="inline-block" size="16" />
              <span className="text-sm font-medium text-white/80 md:text-base">
                flowoftime@gmail.com
              </span>
            </div>
            <div className="space-x-2 ">
              <Phone className="inline-block" size="16" />
              <span className="text-sm font-medium text-white/80 md:text-base">
                +216-56-140-270
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm md:text-lg">Media</h3>
            <SocialIcons className="flex gap-x-2" size="lg" />
          </div>
        </div>

        <div className="self-center text-xs text-white/80 md:text-sm">
          Copyright <Copyright className="inline-block" size={20} />{" "}
          {new Date().getFullYear()}. Made by Yacine
        </div>
      </div>
    </div>
  );
}

export default Footer;
