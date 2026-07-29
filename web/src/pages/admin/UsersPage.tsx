import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Pagination } from '../../components/ui/Pagination/Pagination';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { useToast } from '../../hooks/useToast';
import {
  listAdminUsers,
  updateAdminUserRoles,
  updateAdminUserStatus,
  type AdminUser,
} from '../../services/admin-users.service';
import type { UserRole } from '../../types/auth.types';
import styles from './UsersPage.module.css';

const ROLES: UserRole[] = ['CANDIDATE', 'EMPLOYER', 'EXPERT', 'EMPLOYEE', 'SUPER_ADMIN'];
const PAGE_SIZE = 20;

const roleLabel = (role: UserRole) =>
  role
    .toLowerCase()
    .split('_')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');

const initials = (user: AdminUser) => {
  const source = user.displayName?.trim() || user.email;
  return source
    .split(/[\s@._-]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
};

const errorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail || error.message;
  }
  return 'Something went wrong. Please try again.';
};

interface UserEditorProps {
  user: AdminUser | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: (values: {
    userId: string;
    primaryRole: UserRole;
    availableRoles: UserRole[];
    isActive: boolean;
  }) => void;
}

const UserEditor = ({ user, isSaving, onClose, onSave }: UserEditorProps) => {
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
  const [primaryRole, setPrimaryRole] = useState<UserRole>('CANDIDATE');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!user) return;
    setAvailableRoles(user.availableRoles);
    setPrimaryRole(user.primaryRole);
    setIsActive(user.isActive);
  }, [user]);

  const toggleRole = (role: UserRole) => {
    setAvailableRoles((current) => {
      if (current.includes(role)) {
        if (current.length === 1) return current;
        const next = current.filter((item) => item !== role);
        if (primaryRole === role) setPrimaryRole(next[0]);
        return next;
      }
      return [...current, role];
    });
  };

  return (
    <Modal
      isOpen={Boolean(user)}
      title="Manage user"
      description={user ? `${user.displayName || 'Unnamed user'} · ${user.email}` : undefined}
      onClose={onClose}
    >
      {user && (
        <form
          className={styles.editor}
          onSubmit={(event) => {
            event.preventDefault();
            onSave({
              userId: user.id,
              primaryRole,
              availableRoles,
              isActive,
            });
          }}
        >
          <fieldset className={styles.fieldset}>
            <legend>Available roles</legend>
            <div className={styles.roleGrid}>
              {ROLES.map((role) => (
                <label key={role} className={styles.checkOption}>
                  <input
                    type="checkbox"
                    checked={availableRoles.includes(role)}
                    onChange={() => toggleRole(role)}
                  />
                  <span>{roleLabel(role)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className={styles.fieldLabel}>
            Primary role
            <select
              className={styles.select}
              value={primaryRole}
              onChange={(event) => setPrimaryRole(event.target.value as UserRole)}
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {roleLabel(role)}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.statusToggle}>
            <span>
              <strong>Account enabled</strong>
              <small>Disabled users cannot access protected features.</small>
            </span>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
            />
          </label>

          <div className={styles.modalActions}>
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export const UsersPage = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [status, setStatus] = useState<'active' | 'inactive' | ''>('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPage(1);
      setSearch(searchInput.trim());
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const usersQuery = useQuery({
    queryKey: ['admin-users', page, search, role, status],
    queryFn: () =>
      listAdminUsers({
        page,
        pageSize: PAGE_SIZE,
        search: search || undefined,
        role: role || undefined,
        isActive: status ? status === 'active' : undefined,
      }),
  });

  const updateUser = useMutation({
    mutationFn: async (values: {
      userId: string;
      primaryRole: UserRole;
      availableRoles: UserRole[];
      isActive: boolean;
    }) => {
      await Promise.all([
        updateAdminUserRoles(values.userId, values.primaryRole, values.availableRoles),
        updateAdminUserStatus(values.userId, values.isActive),
      ]);
    },
    onSuccess: async () => {
      setSelectedUser(null);
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User access updated.');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const users = usersQuery.data?.items ?? [];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>User management</h1>
          <p className={styles.subtitle}>
            Search accounts, assign roles, and control platform access.
          </p>
        </div>
        {usersQuery.data && (
          <span className={styles.userCount}>{usersQuery.data.total.toLocaleString()} users</span>
        )}
      </div>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by name or email..."
              aria-label="Search users"
            />
          </div>
          <div className={styles.filters}>
            <select
              className={styles.select}
              value={role}
              aria-label="Filter by role"
              onChange={(event) => {
                setRole(event.target.value as UserRole | '');
                setPage(1);
              }}
            >
              <option value="">All roles</option>
              {ROLES.map((item) => (
                <option key={item} value={item}>
                  {roleLabel(item)}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={status}
              aria-label="Filter by status"
              onChange={(event) => {
                setStatus(event.target.value as 'active' | 'inactive' | '');
                setPage(1);
              }}
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Primary role</th>
                <th>Available roles</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersQuery.isLoading ? (
                <tr>
                  <td colSpan={6} className={styles.stateCell}>
                    <Spinner size="md" />
                    <span>Loading users…</span>
                  </td>
                </tr>
              ) : usersQuery.isError ? (
                <tr>
                  <td colSpan={6} className={styles.errorCell}>
                    <span>{errorMessage(usersQuery.error)}</span>
                    <Button size="sm" variant="outline" onClick={() => usersQuery.refetch()}>
                      Try again
                    </Button>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.stateCell}>
                    No users match these filters.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userInfo}>
                        <div className={styles.avatar}>{initials(user)}</div>
                        <div>
                          <div className={styles.roleText}>
                            {user.displayName || 'Unnamed user'}
                          </div>
                          <div className={styles.subText}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="primary">{roleLabel(user.primaryRole)}</Badge>
                    </td>
                    <td>
                      <div className={styles.roleList}>
                        {user.availableRoles.map((item) => (
                          <span key={item}>{roleLabel(item)}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={styles.subText}>
                        {new Intl.DateTimeFormat(undefined, {
                          dateStyle: 'medium',
                        }).format(new Date(user.createdAt))}
                      </span>
                    </td>
                    <td>
                      <Badge variant={user.isActive ? 'success' : 'error'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {usersQuery.data && (
          <div className={styles.paginationRow}>
            <span>
              Page {usersQuery.data.page}
              {usersQuery.data.totalPages > 0 ? ` of ${usersQuery.data.totalPages}` : ''}
            </span>
            <Pagination
              page={usersQuery.data.page}
              totalPages={usersQuery.data.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>

      <UserEditor
        user={selectedUser}
        isSaving={updateUser.isPending}
        onClose={() => !updateUser.isPending && setSelectedUser(null)}
        onSave={(values) => updateUser.mutate(values)}
      />
    </div>
  );
};
