'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/providers/ToastProvider';

interface AlertRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const conditions = [
  { value: 'failure_rate_above', label: 'Failure rate above' },
  { value: 'run_duration_above', label: 'Run duration above' },
  { value: 'queue_length_above', label: 'Queue length above' },
  { value: 'consecutive_failures', label: 'Consecutive failures' },
];

const channels = [
  { value: 'email', label: 'Email' },
  { value: 'slack', label: 'Slack' },
  { value: 'webhook', label: 'Webhook' },
  { value: 'pagerduty', label: 'PagerDuty' },
];

export function AlertRuleModal({ isOpen, onClose }: AlertRuleModalProps) {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('failure_rate_above');
  const [threshold, setThreshold] = useState('');
  const [channel, setChannel] = useState('email');
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    showToast(`Alert rule "${name}" created successfully!`, 'success');
    setName('');
    setThreshold('');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Alert Rule">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Rule Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., High Failure Rate Alert"
          required
        />
        <Select
          label="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          options={conditions}
        />
        <Input
          label="Threshold"
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          placeholder="e.g., 10"
          required
        />
        <Select
          label="Notification Channel"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          options={channels}
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim() || !threshold.trim()}>
            Create Rule
          </Button>
        </div>
      </form>
    </Modal>
  );
}
