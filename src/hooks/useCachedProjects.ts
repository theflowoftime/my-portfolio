import { queryClient } from "@/main";
import { Language, Projects } from "@/types/types";
import { useOutletContext } from "react-router-dom";

export const cachedProjects = (language: Language): Projects =>
    useOutletContext() || queryClient.getQueryData(["projects", language]);