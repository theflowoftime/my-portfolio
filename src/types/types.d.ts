import { buildFormSchema } from "@/lib/zod-schemas";
import { languages } from "@/stores/language-store";
import { NavLinkProps } from "react-router-dom";
import { z } from "zod";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Language = (typeof languages)[number];
export interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export type Theme = (typeof themes)[number];
export type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type ScrollStore = {
  hash: string;
  setHash: (hash: string) => void;
  scrollToHash: () => void;
};

export type ActiveNavLinkProps = {
  to: NavLinkProps["to"];
  children: React.ReactNode;
};

export type Link = { slug: string; title: string; path: string };

export type AboutMe = {
  homeIntro: string[];
  image: SanityImageSource;
  button: Record<"value", string>;
};

export type Orientation = "horizontal" | "vertical";

export type Project = {
  _id: string;
  title: string;
  description: string;
  link: string;
  image: SanityImageSource;
  started_at: Date;
  delivered_at: Date;
};

export type Projects = Project[];

type Hero =
  | {
      intro: string;
      separator: string;
      jobs: string[];
      bio: string;
      currentProject?: string;
      quotes: Quote[];
      profileImage?: SanityImageSource;
      imageSubtitle?: string;
      buttonContent: string;
    }
  | undefined;

export type FormSchemaType = z.infer<ReturnType<typeof buildFormSchema>>;

type NameField = "name" | "email" | "reason" | "phoneNumber";

type Input = {
  label: string;
  placeholder: string;
  name: NameField;
};

type Select = Input & {
  options: string[];
};

type Field = {
  inputs: Input[];
  selects: Select[];
};

export type ErrorMessages = {
  name: { min: string; max: string };
  email: { invalid: string };
  phoneNumber: { invalid: string };
  reason: { min: string };
} | null;

export type Field = "recaptcha" | "rateLimit" | "message";
// Utility type to enforce exactly one key from Field
export type ExactlyOneField<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

// Toast type mapping Status to the appropriate structure
export type Toast = {
  error: ExactlyOneField<Record<Field, string>>;
  success: { message: string };
};

type Contact = {
  _id: string;
  description: { title: string; subtitle: string };
  fields: Field;
  button: {
    initialText: string;
    submittingText: string;
  };
  errorMessages?: ErrorMessages;
  toast: Toast;
  contactImage: SanityImageSource;
};

// to do types (updated)

export type Navbar = {
  Links: Link[];
  button: {
    text: string;
    // the button is visible in this scrollY progress interval (0 to 1)
    visibilityIntervalScrollY: readonly [start: number, end: number];
  };
};

export type Hero = {
  MainTexLines: (
    | {
        line: {
          text: string;
          // highlighted word in the line to be styled differently
          highlight: number[];
        };
        img: {
          position: number;
          image: string;
          altText: string;
        };
      }
    | {
        line: {
          text: string;
          highlight: null;
        };
        img: {
          // begin at 0: where to insert the image in the related line
          position: number;
          image: string;
          altText: string;
        };
      }
  )[];
  secondaryText: string;
  buttonText: string;
};

// export type About = {
//   introduction: {
//       title: string;
//       whatIdo: string;
//       keywords: string[];
//   };
//   career: {
//       title: string;
//       experiences: {
//           _id: number;
//           role: string;
//           company: string;
//           timeframe: {
//               start: string;
//               end: string;
//           };
//       }[];
//   };
// }

// export type Project = {
//   _id: string;
//   title: string;
//   isPublic: boolean;
//   summary: string;
//   links: { repo: string; live: string };
//   images: SanityImageSource[];
//   status: "planned" | "on-going"|"delivered"
//   timeframe: {
//   started_at: Date;
//   delivered_at: Date;}
// };
