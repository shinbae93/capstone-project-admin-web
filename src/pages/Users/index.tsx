import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Switch, Table, Tooltip } from 'antd'
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { DEFAULT_AVATAR, DEFAULT_LIMIT_ITEMS } from '../../common/constants'
import Loading from '../../components/Loading'
import {
  User,
  useGetUsersQuery,
  useUpdateBlockStatusUserMutation,
} from '../../graphql/generated/graphql'
import { toastUpdateSuccess } from '../../utils/toast'
import { formatPhoneNumber } from '../../utils/format'

interface UserItemDataType {
  id: string
  avatar: string
  fullName: string
  email: string
  phoneNumber: string
  gender: string
  role: string
  isBlocked: boolean
  birthday: Date
  createdAt: Date
}

type UserItemDataIndex = keyof UserItemDataType

const convertUserItems = (courses: User[]) => {
  return courses.map<UserItemDataType>((item) => ({
    id: item.id,
    avatar: item.avatar || DEFAULT_AVATAR,
    fullName: item.fullName,
    email: item.email,
    phoneNumber: item.phoneNumber,
    gender: item.gender,
    role: item.role.name,
    isBlocked: item.isBlocked,
    birthday: item.birthday,
    createdAt: item.createdAt,
  }))
}

const Users = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)

  const searchInput = useRef<InputRef>(null)

  const { data, loading, refetch } = useGetUsersQuery({
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
      },
    },
  })

  const [updateBlockStatusUser] = useUpdateBlockStatusUserMutation()

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: UserItemDataIndex
  ) => {
    confirm({ closeDropdown: true })
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => {
    clearFilters()
    setSearchText('')
    setSearchedColumn('')
    confirm({ closeDropdown: true })
  }

  const getColumnSearchProps = (dataIndex: UserItemDataIndex): ColumnType<UserItemDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
          autoFocus={true}
          onBlurCapture={() => confirm({ closeDropdown: false })}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined className="inline-block" />}
            size="small"
            className="bg-primary"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
            className="hover:border-primary hover:text-primary"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#FFB606' : undefined }} />
    ),
    onFilter: (value, record) =>
      record?.[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string)?.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns: ColumnsType<UserItemDataType> = [
    {
      dataIndex: 'avatar',
      width: '7%',
      render: (value: string) => (
        <img src={value} alt="avatar" className="w-14 h-14 rounded-full" />
      ),
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',

      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Gender',
      width: '8%',
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('gender'),
    },
    {
      title: 'Birthday',
      width: '10%',
      dataIndex: 'birthday',
      sorter: (a, b) => +dayjs(a.birthday).isBefore(dayjs(b.birthday)),
      sortDirections: ['descend', 'ascend'],
      render: (value) => dayjs(value).format('DD/MM/YYYY'),
    },
    {
      title: 'Phone',
      width: '10%',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
      sortDirections: ['descend', 'ascend'],
      render: (value) => formatPhoneNumber(value),
    },
    {
      title: 'Role',
      width: '7%',
      dataIndex: 'role',
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      sorter: (a, b) => +dayjs(a.createdAt).isBefore(dayjs(b.createdAt)),
      sortDirections: ['descend', 'ascend'],
      render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Blocked',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <>
            <Tooltip title="Block">
              <Switch
                checked={record.isBlocked}
                className="bg-[rgba(0,0,0,0.45)]"
                onClick={(checked) => {
                  updateBlockStatusUser({
                    variables: {
                      input: {
                        id: String(record.id),
                        isBlocked: checked,
                      },
                    },
                  }).then(() => {
                    toastUpdateSuccess()
                    refetch()
                  })
                }}
              />
            </Tooltip>
          </>
        </Space>
      ),
    },
  ]

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Table
        columns={columns}
        dataSource={convertUserItems(data?.getUsers?.items as User[])}
        size="large"
        tableLayout="fixed"
        scroll={{ y: '70vh' }}
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: data?.getUsers?.meta?.totalItems,
          pageSize: data?.getUsers?.meta?.itemsPerPage,
          showTotal: (total, range) => `${`${range[0]} - ${range[1]}`}/${total}`,
          onChange: (page) => {
            setPage(page)
            refetch({
              queryParams: {
                pagination: {
                  page,
                  limit: DEFAULT_LIMIT_ITEMS,
                },
              },
            })
          },
        }}
      />
    </div>
  )
}

export default Users
