import { FormNames } from "@/types/types";

type ResponseTypes =
  | "unauthorized"
  | "recaptcha"
  | "rateLimit"
  | "success"
  | "error";

type ResponseType = { message: string; status: number };

type TFORM_RESPONSES = {
  [P in FormNames]: {
    [R in ResponseTypes]: ResponseType;
  } & { ip_prefix: string };
};
