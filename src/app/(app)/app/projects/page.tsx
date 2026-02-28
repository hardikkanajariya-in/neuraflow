'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProjectsTable } from '@/components/features/ProjectsTable';
import { CreateProjectModal } from '@/components/features/CreateProjectModal';
import { Button } from '@/components/ui/Button';

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
            Projects
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your automation projects and workflows.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>

      {/* Projects Table */}
      <ProjectsTable />

      {/* Create Project Modal */}
      <CreateProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
