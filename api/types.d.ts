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

export type MessageError = "private range" | "reserved range" | "invalid query";
export type Status = "success" | "fail";

export type Info = {
  status: Status;
  message?: MessageError;
  continent: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  district: string;
  lat: number;
  lon: number;
  timezone: string;
  offset: number;
  currency: string;
  isp: string;
  org: string;
  as: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean;
  query: string;
};

type Data = Partial<MeetSchemaType>;
