import { useState } from 'react';
import type { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Edit, User as UserIcon, Settings } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  loading?: boolean;
}

const DEFAULT_COLUMN_VISIBILITY = {
  uuid: true,
  name: true,
  surname: true,
  email: true,
  company: false,
  jobTitle: false,
};

type ColumnVisibility = typeof DEFAULT_COLUMN_VISIBILITY;

const UserTable = ({ users, onEditUser, loading }: UserTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(
    DEFAULT_COLUMN_VISIBILITY,
  );

  const toggleColumn = (column: keyof ColumnVisibility) => {
    setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleKeyDown = (event: React.KeyboardEvent, user: User) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onEditUser(user);
    }
  };

  if (loading) {
    return (
      <Card className="h-full" role="region" aria-label="Users table loading">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" aria-hidden="true" />
            Users Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex items-center justify-center py-16"
            role="status"
            aria-live="polite"
          >
            <div className="relative animate-spin">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
            <span className="sr-only">Loading users data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderCell = (
    value: string,
    label: string,
    tooltip?: string | null,
  ) => (
    <Tooltip>
      <TooltipTrigger
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
        tabIndex={0}
        aria-label={`${label}: ${value}`}
      >
        {value}
      </TooltipTrigger>
      <TooltipContent role="tooltip">
        <p>
          {label}: {tooltip ?? value}
        </p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <Card className="h-full" role="region" aria-label="Users data table">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className="flex items-center gap-2"
              id="users-table-title"
            >
              <UserIcon className="h-5 w-5" aria-hidden="true" />
              Users Table ({users.length} users)
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  aria-label="Column visibility settings"
                >
                  <Settings className="h-3 w-3" aria-hidden="true" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                role="menu"
                aria-label="Column visibility options"
              >
                {Object.entries(columnVisibility).map(([key, value]) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={value}
                    onCheckedChange={() =>
                      toggleColumn(key as keyof ColumnVisibility)
                    }
                    role="menuitemcheckbox"
                    aria-checked={value}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div
              className="text-center py-8 text-gray-500"
              role="status"
              aria-live="polite"
            >
              <p>No users found. Add your first user using the form.</p>
            </div>
          ) : (
            <div
              className="overflow-x-auto"
              role="region"
              aria-label="Users data"
              tabIndex={0}
            >
              <Table role="table" aria-labelledby="users-table-title">
                <TableHeader>
                  <TableRow>
                    {columnVisibility.uuid && (
                      <TableHead scope="col">UUID</TableHead>
                    )}
                    {columnVisibility.name && (
                      <TableHead scope="col">Name</TableHead>
                    )}
                    {columnVisibility.surname && (
                      <TableHead scope="col">Surname</TableHead>
                    )}
                    {columnVisibility.email && (
                      <TableHead scope="col">Email</TableHead>
                    )}
                    {columnVisibility.company && (
                      <TableHead scope="col">Company</TableHead>
                    )}
                    {columnVisibility.jobTitle && (
                      <TableHead scope="col">Job Title</TableHead>
                    )}
                    <TableHead scope="col">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className="transition-colors hover:bg-gray-50 focus-within:bg-gray-50"
                      tabIndex={0}
                      role="row"
                      aria-rowindex={index + 2}
                      onKeyDown={(e) => handleKeyDown(e, user)}
                      aria-label={`User ${user.name} ${user.surname}`}
                    >
                      {columnVisibility.uuid && (
                        <TableCell>
                          {renderCell(
                            user.id.substring(0, 6) + '...',
                            'UUID',
                            user.id,
                          )}
                        </TableCell>
                      )}
                      {columnVisibility.name && (
                        <TableCell>{renderCell(user.name, 'Name')}</TableCell>
                      )}
                      {columnVisibility.surname && (
                        <TableCell>
                          {renderCell(user.surname, 'Surname')}
                        </TableCell>
                      )}
                      {columnVisibility.email && (
                        <TableCell>{renderCell(user.email, 'Email')}</TableCell>
                      )}
                      {columnVisibility.company && (
                        <TableCell>
                          {renderCell(user?.company ?? '', 'Company')}
                        </TableCell>
                      )}
                      {columnVisibility.jobTitle && (
                        <TableCell>
                          {renderCell(user?.jobTitle ?? '', 'Job Title')}
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditUser(user)}
                          className="flex items-center gap-1"
                          aria-label={`Edit user ${user.name} ${user.surname}`}
                        >
                          <Edit className="h-3 w-3" aria-hidden="true" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default UserTable;
