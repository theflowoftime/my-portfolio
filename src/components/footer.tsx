import { Copyright, Mail, Phone } from "lucide-react";
import LogoWithName from "./sub-components/site-logo";
import SocialIcons from "./sub-components/social-icons";
import { Link, LinkProps } from "react-router-dom";

const footerData = {
  email: "flowoftime@gmail.com",
  phone: "+216-56-140-270",
  socialsTitle: "Media",
  creator: "Made by Yacine",
};

const Mailto = ({
  className,
  subject,
  body,
  to: email,
  children,
}: LinkProps & {
  subject?: string;
  body?: string;
}) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return (
    <Link className={className} to={`mailto:${email}${params}`}>
      {children}
    </Link>
  );
};

const Callto = ({ to: phone, className, children }: LinkProps) => {
  return (
    <Link className={className} to={`tel:${phone}`}>
      {children}
    </Link>
  );
};

function Footer() {
  return (
    <div className="opacity-90  h-[13rem] mt-16">
      <div className="container flex flex-col justify-between min-h-full py-4 dark:text-white">
        <div className="flex flex-wrap justify-between">
          <div className="space-y-2">
            <LogoWithName />
            <Mailto
              className="block space-x-2 text-sm font-medium dark:text-white opacity-80 md:text-base hover:underline"
              to={footerData.email}
            >
              <Mail className="inline-block" size="16" />
              <span>{footerData.email}</span>
            </Mailto>
            <Callto
              to={footerData.phone}
              className="block space-x-2 text-sm font-medium dark:text-white opacity-80 md:text-base hover:underline"
            >
              <Phone className="inline-block" size="16" />
              <span>{footerData.phone}</span>
            </Callto>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="hidden text-sm md:text-lg sm:block">
              {footerData.socialsTitle}
            </h3>
            <SocialIcons />
          </div>
        </div>

        <div className="self-center text-xs dark:text-white opacity-80 md:text-sm">
          Copyright <Copyright className="inline-block" size={20} />{" "}
          {new Date().getFullYear()}. {footerData.creator}
        </div>
      </div>
    </div>
  );
}

export default Footer;
