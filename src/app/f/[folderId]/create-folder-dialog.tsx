"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createFolder } from "~/server/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { usePostHog } from "posthog-js/react";

export function CreateFolderButton({ folderId }: { folderId: number }) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const posthog = usePostHog();

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;

    setIsCreating(true);

    posthog.capture("folder_created", {
      folderName,
      parentId: folderId,
    });

    await createFolder(folderName.trim(), folderId);

    setIsCreating(false);
    setOpen(false);
    setFolderName("");
    router.refresh();
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex items-center gap-2 border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700"
      >
        <FolderPlus size={18} />
        <span>New Folder</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-gray-700 bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="folderName" className="text-gray-300">
              Folder Name
            </Label>
            <Input
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Untitled Folder"
              className="mt-2 border-gray-600 bg-gray-700 text-gray-100"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateFolder();
              }}
            />
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              disabled={!folderName.trim() || isCreating}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isCreating ? "Creating..." : "Create Folder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
