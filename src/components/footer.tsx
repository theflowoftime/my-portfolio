import { Copyright, Mail, Phone } from "lucide-react";
import LogoWithName from "./sub-components/site-logo";
import SocialIcons from "./sub-components/social-icons";

function Footer() {
  return (
    <div className="opacity-90  h-[13rem] mt-16">
      <div className="container flex flex-col justify-between min-h-full py-4 dark:text-white">
        <div className="flex flex-wrap justify-between">
          <div className="space-y-2">
            <LogoWithName />
            <div className="space-x-2">
              <Mail className="inline-block" size="16" />
              <span className="text-sm font-medium dark:text-white opacity-80 md:text-base">
                flowoftime@gmail.com
              </span>
            </div>
            <div className="space-x-2 ">
              <Phone className="inline-block" size="16" />
              <span className="text-sm font-medium dark:text-white opacity-80 md:text-base">
                +216-56-140-270
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="hidden text-sm md:text-lg sm:block">Media</h3>
            <SocialIcons />
          </div>
        </div>

        <div className="self-center text-xs dark:text-white opacity-80 md:text-sm">
          Copyright <Copyright className="inline-block" size={20} />{" "}
          {new Date().getFullYear()}. Made by Yacine
        </div>
      </div>
    </div>
  );
}

export default Footer;
