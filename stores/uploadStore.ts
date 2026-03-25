import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UploadFile } from "@/types";

type UploadStatus = "idle" | "uploading" | "paused" | "complete" | "error";

interface UploadState {
  files: UploadFile[];
  status: UploadStatus;
  progress: number;
  
  addFiles: (files: File[]) => void;
  removeFile: (fileId: string) => void;
  startUpload: () => Promise<void>;
  pauseUpload: () => void;
  resumeUpload: () => Promise<void>;
  cancelUpload: () => void;
  retryFailed: (fileId: string) => Promise<void>;
  updateFileMetadata: (fileId: string, metadata: UploadFile["metadata"]) => void;
}

export const useUploadStore = create<UploadState>()(
  persist(
    (set, get) => ({
      files: [],
      status: "idle",
      progress: 0,
      
      addFiles: (newFiles) => {
        const uploadFiles: UploadFile[] = newFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
          status: "queued",
          progress: 0,
        }));
        
        set((state) => ({
          files: [...state.files, ...uploadFiles],
        }));
        
        // Auto-start upload if online
        if (navigator.onLine) {
          get().startUpload();
        }
      },
      
      removeFile: (fileId) => {
        set((state) => ({
          files: state.files.filter((f) => f.id !== fileId),
        }));
      },
      
      startUpload: async () => {
        set({ status: "uploading" });
        
        const { files } = get();
        for (const file of files) {
          if (file.status === "queued") {
            try {
              // TODO: Implement actual upload with tus.io
              console.log("Uploading file:", file.file.name);
              
              set((state) => ({
                files: state.files.map((f) =>
                  f.id === file.id ? { ...f, status: "complete", progress: 100 } : f
                ),
              }));
            } catch (error) {
              set((state) => ({
                files: state.files.map((f) =>
                  f.id === file.id
                    ? { ...f, status: "failed", error: String(error) }
                    : f
                ),
              }));
            }
          }
        }
        
        set({ status: "complete" });
      },
      
      pauseUpload: () => {
        set({ status: "paused" });
        // TODO: Implement pause logic
      },
      
      resumeUpload: async () => {
        set({ status: "uploading" });
        // TODO: Implement resume logic
        await get().startUpload();
      },
      
      cancelUpload: () => {
        set({ status: "idle", files: [] });
      },
      
      retryFailed: async (fileId) => {
        set((state) => ({
          files: state.files.map((f) =>
            f.id === fileId ? { ...f, status: "queued", error: undefined } : f
          ),
        }));
        
        await get().startUpload();
      },
      
      updateFileMetadata: (fileId, metadata) => {
        set((state) => ({
          files: state.files.map((f) =>
            f.id === fileId ? { ...f, metadata: { ...f.metadata, ...metadata } } : f
          ),
        }));
      },
    }),
    {
      name: "upload-queue",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        files: state.files.filter((f) => f.status !== "complete"),
      }),
    }
  )
);

// Listen for online events to resume uploads
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    const store = useUploadStore.getState();
    if (store.files.some((f) => f.status === "queued" || f.status === "failed")) {
      store.startUpload();
    }
  });
}
