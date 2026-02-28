'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/providers/ToastProvider';

interface InviteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  { value: 'member', label: 'Member' },
  { value: 'admin', label: 'Admin' },
  { value: 'viewer', label: 'Viewer' },
];

export function InviteTeamModal({ isOpen, onClose }: InviteTeamModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    showToast(`Invitation sent to ${email}`, 'success');
    setEmail('');
    setRole('member');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Team Member">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="colleague@company.com"
          required
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={roles}
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!email.trim()}>
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
}
