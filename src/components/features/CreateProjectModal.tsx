'use client';

import { useState } from 'react';
import { FileText, Database, Brain, Globe, Bell, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { PROJECT_TEMPLATES } from '@/lib/constants';
import { useToast } from '@/providers/ToastProvider';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Database, Brain, Globe, Bell, Activity,
};

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    showToast(`Project "${name}" created successfully!`, 'success');
    setName('');
    setDescription('');
    setSelectedTemplate('blank');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Customer Onboarding Pipeline"
          required
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of your project..."
        />

        <div>
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Choose Template</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PROJECT_TEMPLATES.map((template) => {
              const Icon = iconMap[template.icon] || FileText;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all min-h-[44px]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                    selectedTemplate === template.id
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-900/30 dark:text-brand-400'
                      : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{template.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
