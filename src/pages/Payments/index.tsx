import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Table, Tooltip } from 'antd'
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { DEFAULT_LIMIT_ITEMS } from '../../common/constants'
import Loading from '../../components/Loading'
import { Subject, useSubjectsQuery } from '../../graphql/generated/graphql'
import { CurrencyFormatter } from '../../utils/format'

interface SubjectItemDataType {
  id: string
  fullName: string
  email: string
  amount: number
  note: string
  status: string
  paidAt: Date
  createdAt: Date
}

type SubjectItemDataIndex = keyof SubjectItemDataType

// const convertUserItems = (subjects: Subject[]) => {
//   return subjects.map<SubjectItemDataType>((item) => ({
//     id: item.id,
//     name: item.name,
//     createdAt: item.createdAt,
//     updatedAt: item.updatedAt,
//   }))
// }

const data: SubjectItemDataType[] = [
  {
    id: '1',
    fullName: 'Hung Nguyen',
    email: 'sine.hungnguyen@gmail.com',
    amount: 100000,
    note: 'Hoc phi thang 5',
    status: 'Paid',
    paidAt: new Date('20/05/2023 20:53:12'),
    createdAt: new Date('20/05/2023 20:53:12'),
  },
  {
    id: '2',
    fullName: 'Hung Nguyen',
    email: 'sine.hungnguyen@gmail.com',
    amount: 20000,
    note: 'Hoc phi thang 6',
    status: 'Paid',
    paidAt: new Date('20/06/2023 20:53:12'),
    createdAt: new Date('20/06/2023 20:53:12'),
  },
]

const Payments = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)

  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: SubjectItemDataIndex
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

  const getColumnSearchProps = (
    dataIndex: SubjectItemDataIndex
  ): ColumnType<SubjectItemDataType> => ({
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

  const columns: ColumnsType<SubjectItemDataType> = [
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
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['descend', 'ascend'],
      render: (value) => CurrencyFormatter.format(value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Paid at',
      dataIndex: 'paidAt',
      sorter: (a, b) => +dayjs(a.paidAt).isBefore(dayjs(b.paidAt)),
      sortDirections: ['descend', 'ascend'],
      render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      sorter: (a, b) => +dayjs(a.createdAt).isBefore(dayjs(b.createdAt)),
      sortDirections: ['descend', 'ascend'],
      render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <>
            <Tooltip title="Edit">
              <EditOutlined
                className="text-lg"
                // onClick={() =>
                //   Modal.confirm({
                //     title: 'Are you sure to reject this request?',
                //     icon: <ExclamationCircleFilled />,
                //     onOk() {
                //       updateStatusTutorRequest({
                //         variables: {
                //           input: {
                //             id: String(record.id),
                //             status: TutorRequestStatus.Accepted,
                //           },
                //         },
                //       }).then(() => {
                //         toastUpdateSuccess()
                //         refetch()
                //       })
                //     },
                //   })
                // }
              />
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined
                className="text-lg"
                // onClick={() =>
                //   Modal.confirm({
                //     title: 'Are you sure to reject this request?',
                //     icon: <ExclamationCircleFilled />,
                //     onOk() {
                //       updateStatusTutorRequest({
                //         variables: {
                //           input: {
                //             id: String(record.id),
                //             status: TutorRequestStatus.Rejected,
                //           },
                //         },
                //       }).then(() => {
                //         toastUpdateSuccess()
                //         refetch()
                //       })
                //     },
                //   })
                // }
              />
            </Tooltip>
          </>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data || []}
        size="large"
        tableLayout="fixed"
        scroll={{ y: '70vh' }}
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: 1,
          pageSize: 20,
          showTotal: (total, range) => `${`${range[0]} - ${range[1]}`}/${total}`,
          onChange: (page) => {
            setPage(page)
          },
        }}
      />
    </div>
  )
}

export default Payments
