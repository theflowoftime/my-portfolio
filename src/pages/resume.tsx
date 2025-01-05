import { useResume } from "@/hooks/useResume";
import { useLanguageStore } from "@/stores/language-store";

export default function ResumeViewer() {
  const language = useLanguageStore((state) => state.language);
  const { data, isLoading, error } = useResume(language);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading resume</p>;

  const resumeUrl = data?.cv?.asset?.url;

  return resumeUrl ? (
    <iframe
      className="min-h-screen bg-black dark:invert"
      src={resumeUrl}
      width="100%"
      height="100%"
      title="Resume Viewer"
    />
  ) : (
    <p>No resume available</p>
  );
}
