'use client';

import { useState, useMemo } from 'react';
import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Select,
  SelectItem,
  Card,
  CardBody,
  Spinner,
} from '@nextui-org/react';
import {
  Search,
  ChevronDown,
  Edit,
  Trash2,
  Calendar,
  Building,
  Filter,
  ChevronUp,
} from 'lucide-react';
import { format } from 'date-fns';

const statusColorMap = {
  applied: 'default',
  interview: 'warning',
  offered: 'success',
  rejected: 'danger',
};

const statusOptions = [
  { name: 'All Statuses', uid: '' },
  { name: 'Applied', uid: 'applied' },
  { name: 'Interview', uid: 'interview' },
  { name: 'Offered', uid: 'offered' },
  { name: 'Rejected', uid: 'rejected' },
];

const sortOptions = [
  { name: 'Most Recent', uid: 'created_at' },
  { name: 'Company A-Z', uid: 'company' },
  { name: 'Job Title A-Z', uid: 'job_title' },
  { name: 'Application Date', uid: 'application_date' },
];

export default function ApplicationsTable({ 
  applications,
  loading,
  filters,
  updateFilters,
  deleteApplication,
  onEdit 
}) {
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'created_at',
    direction: 'descending'
  });

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredApps = [...applications];

    if (hasSearchFilter) {
      filteredApps = filteredApps.filter((app) =>
        app.company.toLowerCase().includes(filterValue.toLowerCase()) ||
        app.job_title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredApps;
  }, [applications, filterValue, hasSearchFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const pages = Math.ceil(sortedItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      await deleteApplication(id);
    }
  };

  const onSearchChange = (value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  };

  const handleSort = (column) => {
    setSortDescriptor(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  const getSortIcon = (column) => {
    if (sortDescriptor.column !== column) {
      return <ChevronUp className="w-4 h-4 opacity-50" />;
    }
    return sortDescriptor.direction === 'ascending' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by company or job title..."
            startContent={<Search className="w-4 h-4" />}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="flat"
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status Filter"
                closeOnSelect={false}
                selectedKeys={filters.status ? [filters.status] : ['']}
                selectionMode="single"
                onSelectionChange={(keys) => {
                  const selectedStatus = Array.from(keys)[0];
                  updateFilters({ status: selectedStatus === '' ? '' : selectedStatus });
                }}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
            <Select
              className="max-w-xs"
              placeholder="Sort by"
              selectedKeys={[filters.sortBy]}
              onSelectionChange={(keys) => {
                const sortBy = Array.from(keys)[0];
                updateFilters({ sortBy });
              }}
            >
              {sortOptions.map((option) => (
                <SelectItem key={option.uid} value={option.uid}>
                  {option.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} applications
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, filters, filteredItems.length, rowsPerPage, updateFilters]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => setPage(1)}>
            First
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => setPage(pages)}>
            Last
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  if (loading && applications.length === 0) {
    return (
      <Card>
        <CardBody className="flex items-center justify-center py-10">
          <Spinner size="lg" />
          <p className="text-default-500 mt-4">Loading applications...</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="border-none bg-background/60 dark:bg-default-100/50">
      <CardBody className="overflow-hidden p-0">
        {/* Top content */}
        <div className="p-4">
          {topContent}
        </div>

        {/* Custom Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-default-100 dark:bg-default-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Button
                    variant="light"
                    className="text-tiny font-semibold uppercase"
                    endContent={getSortIcon('company')}
                    onPress={() => handleSort('company')}
                  >
                    Company
                  </Button>
                </th>
                <th className="px-4 py-3 text-left">
                  <Button
                    variant="light"
                    className="text-tiny font-semibold uppercase"
                    endContent={getSortIcon('job_title')}
                    onPress={() => handleSort('job_title')}
                  >
                    Job Title
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-tiny font-semibold uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left">
                  <Button
                    variant="light"
                    className="text-tiny font-semibold uppercase"
                    endContent={getSortIcon('application_date')}
                    onPress={() => handleSort('application_date')}
                  >
                    Date Applied
                  </Button>
                </th>
                <th className="px-4 py-3 text-left text-tiny font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-default-500">
                    {loading ? 'Loading...' : 'No applications found'}
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-divider hover:bg-default-50 dark:hover:bg-default-100/50">
                    <td className="px-4 py-3">
                      <User
                        avatarProps={{ 
                          radius: "lg", 
                          src: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.company)}&background=random`,
                          size: "sm"
                        }}
                        description={
                          <div className="flex items-center gap-1 text-tiny">
                            <Building className="w-3 h-3" />
                            Company
                          </div>
                        }
                        name={item.company}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{item.job_title}</p>
                        {item.notes && (
                          <p className="text-bold text-tiny capitalize text-default-400 truncate max-w-xs">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Chip className="capitalize" color={statusColorMap[item.status]} size="sm" variant="flat">
                        {item.status}
                      </Chip>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-default-400" />
                        <span className="text-small">
                          {format(new Date(item.application_date), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative flex items-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => onEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom content */}
        <div className="p-4">
          {bottomContent}
        </div>
      </CardBody>
    </Card>
  );
} 