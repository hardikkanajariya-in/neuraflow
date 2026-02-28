'use client';

import { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { InviteTeamModal } from '@/components/features/InviteTeamModal';
import appData from '@/data/app.json';
import { formatDate } from '@/lib/formatters';

const roleVariant: Record<string, 'brand' | 'info' | 'default' | 'warning'> = {
  owner: 'brand',
  admin: 'info',
  member: 'default',
  viewer: 'warning',
};

const statusVariant: Record<string, 'success' | 'warning' | 'default'> = {
  active: 'success',
  invited: 'warning',
  inactive: 'default',
};

export default function TeamPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
            Team
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your team members and their roles.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Team Members Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Member
                </th>
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Email
                </th>
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Role
                </th>
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="pb-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {appData.teamMembers.map((member) => (
                <tr key={member.id} className="group">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        photoId={member.avatarId}
                        name={member.name}
                        size="sm"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">
                    {member.email}
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={roleVariant[member.role] ?? 'default'}>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={statusVariant[member.status] ?? 'default'}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4 text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDate(member.joinedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invite Modal */}
      <InviteTeamModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
