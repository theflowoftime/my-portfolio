import { buildFormSchema, contactSchema, meetSchema } from "@/lib/zod-schemas";
import { languages } from "@/stores/language-store";
import { NavLinkProps } from "react-router-dom";
import { z } from "zod";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";
import { themes } from "@/stores/theme-store";

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

export type Navbar = {
  links: Link[];
  button: {
    text: string;
    // the button is visible in this scrollY progress interval (0 to 1)
    visibilityIntervalScrollY: readonly [start: number, end: number];
  };
  languages: string[];
  themes: string[];
};

export type Hero = {
  mainTextLines: {
    line: {
      text: string;
      // highlighted word in the line to be styled differently
      highlight: number[];
      img: {
        position: number;
        images: SanityImageSource[];
        altText: string;
      };
    };
  }[];
  secondaryText: string;
  buttonText: string;
  avatarSize: [number, number];
};

export type AboutMe = {
  introduction: {
    title: string; // brief
    whatIdo: string; // small paragraph
    keywords: string[]; // the length of each keyword shouldn't be too large
  };
  career: {
    title: string;
    experiences: {
      _key: string;
      role: string;
      company: string;
      timeframe: {
        start: Date;
        end: Date;
      };
    }[];
  };
};

export type Orientation = "horizontal" | "vertical";

// export type Project = {
//   _id: string;
//   title: string;
//   description: string;
//   link: string;
//   image: SanityImageSource;
//   started_at: Date;
//   delivered_at: Date;
// };

export type Project = {
  _id: string;
  title: string;
  isPublic: boolean;
  summary: string;
  links: {
    repo: { button: { text: string; url: string } };
    live: { button: { text: string; url: string } };
  };
  images: { thumbnails: SanityImageSource[]; gallery: SanityImageSource[] };
  status: "planned" | "on-going" | "delivered";
  timeframe: {
    started_at: Date;
    delivered_at: Date;
  };
  stack: {
    type: "front" | "back" | "full";
    technologies: string[];
  };
  tags: [];
};

export type Projects = Project[];

export type MeetSchemaType = z.infer<ReturnType<typeof meetSchema>>;

export type FormSchemaType = z.infer<ReturnType<typeof contactSchema>>;
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
  // to be removed
  HeaderWords: {
    word: string;
    isHighlighted: boolean;
  }[];
  fields: Field;
  button: {
    initialText: string;
    submittingText: string;
  };
  errorMessages?: ErrorMessages;
  toast: Toast;
};

export type FormName = "contact" | "meet";

// VisitorInfoStore store
export type InfoVisitor = {
  country: string;
  timezone: string;
  countryCode: string;
  offset: number;
  mobile: boolean;
  proxy: boolean;
};

type State = {
  visitorInfo: InfoVisitor | null;
};

type Actions = {
  setVisitorInfo: (info: InfoVisitor) => void;
};

export type VisitorInfoStore = State & Actions;
