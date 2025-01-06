import { useResume } from "@/hooks/useResume";
import PageLayout from "@/layouts/page-layout";
import { useLanguageStore } from "@/stores/language-store";
import { Loader2 } from "lucide-react";

export default function ResumeViewer() {
  const language = useLanguageStore((state) => state.language);
  const { data, isLoading, error } = useResume(language);

  if (isLoading)
    return (
      <PageLayout>
        <Loader2 className="animate-spin" />
      </PageLayout>
    );
  if (error)
    return (
      <PageLayout>
        <p>Error loading resume</p>;
      </PageLayout>
    );

  const resumeUrl = data?.cv?.asset?.url;

  return (
    <PageLayout>
      {resumeUrl ? (
        <iframe
          className="min-h-screen bg-black dark:invert"
          src={`${resumeUrl}#view=FitH`}
          width="100%"
          height="100%"
          title="Resume Viewer"
        />
      ) : (
        <p>No resume available</p>
      )}
    </PageLayout>
  );
}
