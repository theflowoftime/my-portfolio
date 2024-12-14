import { FormName } from "@/types/types";

export type _Type = "message" | "meeting";

type ResponseTypes =
  | "unauthorized"
  | "recaptcha"
  | "rateLimit"
  | "success"
  | "error";

type ResponseType = { message: string; status: number };

type TFORM_RESPONSES = {
  [P in FormName]: {
    [R in ResponseTypes]: ResponseType;
  } & { ip_prefix: string; _type: _Type };
};

export type Info = {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
};
