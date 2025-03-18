"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface SubmitArtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitArtModal({ isOpen, onClose }: SubmitArtModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [artName, setArtName] = useState("");
  const [description, setDescription] = useState("");
  const [discordHandle, setDiscordHandle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setArtName("");
      setDescription("");
      setDiscordHandle("");
      setIsSubmitting(false);
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !artName || !description || !discordHandle) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", artName);
      formData.append("description", description);
      formData.append("username", discordHandle);

      const response = await fetch("/api/upload-art", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to upload artwork");
      }

      console.log("Artwork submitted successfully:", result);
      setIsSubmitted(true); // Переключаем состояние на "успешно отправлено"
      setFile(null);
      setArtName("");
      setDescription("");
      setDiscordHandle("");
      setTimeout(() => onClose(), 5000); // Закрываем через 4 секунды
    } catch (error) {
      console.error("Error submitting artwork:", error);
      alert("Failed to submit artwork. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div
        className={`bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
        style={{ transform: isOpen ? "translateY(0)" : "translateY(-2.5rem)", opacity: isOpen ? 1 : 0 }}
      >
        {isSubmitted ? (
            <div className="text-center p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                <h2 className="text-xl font-semibold mb-2">Success!</h2>
                <p className="text-sm">Artwork submitted successfully! It will appear after review.</p>
            </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Submit Your Art</h2>
              <Button variant="ghost" size="icon" onClick={onClose} disabled={isSubmitting}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Please note: All submitted artwork will be reviewed by our team before being added to the gallery.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Upload your art
                </label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full border border-zinc-300 dark:border-zinc-600"
                  disabled={isSubmitting}
                  value={file ? undefined : ""}
                />
              </div>
              <div>
                <label htmlFor="artName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Art name
                </label>
                <Input
                  id="artName"
                  type="text"
                  value={artName}
                  onChange={(e) => setArtName(e.target.value)}
                  placeholder="Enter art name"
                  className="w-full border border-zinc-300 dark:border-zinc-600"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Short Art Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your art briefly"
                  className="w-full border border-zinc-300 dark:border-zinc-600"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="discordHandle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Discord Handle
                </label>
                <Input
                  id="discordHandle"
                  type="text"
                  value={discordHandle}
                  onChange={(e) => setDiscordHandle(e.target.value)}
                  placeholder="Your Discord username"
                  className="w-full border border-zinc-300 dark:border-zinc-600"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}