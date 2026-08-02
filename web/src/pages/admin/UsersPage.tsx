import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog/ConfirmDialog';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Pagination } from '../../components/ui/Pagination/Pagination';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { useToast } from '../../hooks/useToast';
import {
  listAdminUsers,
  createAdminUser,
  deleteAdminUser,
  getAdminUser,
  updateAdminUser,
  type AdminUser,
  type AdminUserCreateInput,
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
    displayName?: string;
    phone?: string;
    location?: string;
    bio?: string;
  }) => void;
}

const UserEditor = ({ user, isSaving, onClose, onSave }: UserEditorProps) => {
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);
  const [primaryRole, setPrimaryRole] = useState<UserRole>('CANDIDATE');
  const [isActive, setIsActive] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!user) return;
    setAvailableRoles(user.availableRoles);
    setPrimaryRole(user.primaryRole);
    setIsActive(user.isActive);
    setDisplayName(user.displayName || '');
    setPhone(user.phone || '');
    setLocation(user.location || '');
    setBio(user.bio || '');
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
              displayName: displayName.trim() || undefined,
              phone: phone.trim() || undefined,
              location: location.trim() || undefined,
              bio: bio.trim() || undefined,
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

          <div className={styles.formGrid}>
            <Input
              label="Display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
            <Input label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <Input
              label="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
            <Input label="Bio" value={bio} onChange={(event) => setBio(event.target.value)} />
          </div>

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

const NewUserEditor = ({
  isOpen,
  isSaving,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (input: AdminUserCreateInput) => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [primaryRole, setPrimaryRole] = useState<UserRole>('CANDIDATE');

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setDisplayName('');
      setPrimaryRole('CANDIDATE');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      title="Add user"
      description="Provision a Firebase and Recruitzaa account."
      onClose={onClose}
    >
      <form
        className={styles.editor}
        onSubmit={(event) => {
          event.preventDefault();
          onSave({
            email: email.trim(),
            password,
            displayName: displayName.trim(),
            primaryRole,
            availableRoles: [primaryRole],
            isActive: true,
          });
        }}
      >
        <Input
          label="Display name"
          required
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Temporary password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label className={styles.fieldLabel}>
          Initial role
          <select
            className={styles.select}
            value={primaryRole}
            onChange={(event) => setPrimaryRole(event.target.value as UserRole)}
          >
            {ROLES.map((item) => (
              <option key={item} value={item}>
                {roleLabel(item)}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.modalActions}>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSaving || displayName.trim().length < 2 || password.length < 8}
          >
            {isSaving ? 'Creating…' : 'Create user'}
          </Button>
        </div>
      </form>
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
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

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
      await updateAdminUser(values.userId, values);
    },
    onSuccess: async () => {
      setSelectedUser(null);
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User access updated.');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const createUser = useMutation({
    mutationFn: createAdminUser,
    onSuccess: async () => {
      setCreateOpen(false);
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User created.');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const removeUser = useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: async () => {
      setDeleteTarget(null);
      setSelectedUser(null);
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User deleted.');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const openUser = async (user: AdminUser) => {
    try {
      setSelectedUser(await getAdminUser(user.id));
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

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
          <div className={styles.headerActions}>
            <span className={styles.userCount}>{usersQuery.data.total.toLocaleString()} users</span>
            <Button onClick={() => setCreateOpen(true)}>+ Add user</Button>
          </div>
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
                      <div className={styles.rowActions}>
                        <Button size="sm" variant="outline" onClick={() => openUser(user)}>
                          Manage
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setDeleteTarget(user)}>
                          Delete
                        </Button>
                      </div>
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
      <NewUserEditor
        isOpen={createOpen}
        isSaving={createUser.isPending}
        onClose={() => !createUser.isPending && setCreateOpen(false)}
        onSave={(input) => createUser.mutate(input)}
      />
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete user permanently?"
        message={
          deleteTarget
            ? `${deleteTarget.email} will be removed from Firebase, PostgreSQL, and MongoDB.`
            : ''
        }
        confirmLabel={removeUser.isPending ? 'Deleting…' : 'Delete user'}
        variant="danger"
        onCancel={() => !removeUser.isPending && setDeleteTarget(null)}
        onConfirm={() =>
          deleteTarget && !removeUser.isPending && removeUser.mutate(deleteTarget.id)
        }
      />
    </div>
  );
};
