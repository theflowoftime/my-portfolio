import { FormSchemaType } from "@/types/types";
import { Hand, LucideProps, Mail, Phone, UserSearch } from "lucide-react";
import { cloneElement, ReactElement } from "react";

const LabelIcon = ({
  name,
  className,
  ...props
}: LucideProps & { name: keyof FormSchemaType }) => {
  const labelIcons: Record<string, ReactElement> = {
    name: <Hand className={className} size="20" />,
    phoneNumber: <Phone className={className} size="20" />,
    email: <Mail className={className} size="20" />,
    reason: <UserSearch className={className} size="20" />,
  };

  if (!name || !labelIcons[name]) return null;

  return cloneElement(labelIcons[name], props);
};

export default LabelIcon;
