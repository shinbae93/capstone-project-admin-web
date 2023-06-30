import {
  CheckOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Button, Input, InputRef, Modal, Space, Table, Tooltip } from 'antd'
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { DEFAULT_LIMIT_ITEMS } from '../../common/constants'
import Loading from '../../components/Loading'
import {
  TutorRequest,
  TutorRequestStatus,
  useTutorRequestsQuery,
  useUpdateTutorRequestStatusMutation,
} from '../../graphql/generated/graphql'
import { formatPhoneNumber } from '../../utils/format'
import { toastUpdateSuccess } from '../../utils/toast'
import { getFileNameFromUrl } from '../../utils/form'

interface TutorRequestItemDataType {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  cv: string
  status: string
  createdAt: Date
  updatedAt: Date
}

type TutorRequestItemDataIndex = keyof TutorRequestItemDataType

const convertTutorRequestItems = (request: TutorRequest[]) => {
  return request.map<TutorRequestItemDataType>((item) => ({
    id: item.id,
    fullName: item.user.fullName,
    email: item.user.email,
    phoneNumber: item.user.phoneNumber,
    cv: item.cv,
    status: item.status,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))
}

const TutorRequests = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)

  const searchInput = useRef<InputRef>(null)

  const { data, loading, refetch } = useTutorRequestsQuery({
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
      },
    },
  })

  const [updateStatusTutorRequest] = useUpdateTutorRequestStatusMutation()

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: TutorRequestItemDataIndex
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
    dataIndex: TutorRequestItemDataIndex
  ): ColumnType<TutorRequestItemDataType> => ({
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

  const columns: ColumnsType<TutorRequestItemDataType> = [
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
      title: 'Phone',
      width: '10%',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
      sortDirections: ['descend', 'ascend'],
      render: (value) => formatPhoneNumber(value),
    },
    {
      title: 'Status',
      width: '10%',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'CV',
      dataIndex: 'cv',
      render: (value) => (
        <a href={value} target="_blank" className="italic">
          {getFileNameFromUrl(value)}
        </a>
      ),
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      sorter: (a, b) => +dayjs(a.createdAt).isBefore(dayjs(b.createdAt)),
      sortDirections: ['descend', 'ascend'],
      render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      sorter: (a, b) => +dayjs(a.updatedAt).isBefore(dayjs(b.updatedAt)),
      sortDirections: ['descend', 'ascend'],
      render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <>
            <Tooltip title="Accept">
              <CheckOutlined
                className="text-success text-lg"
                onClick={() =>
                  Modal.confirm({
                    title: 'Are you sure to reject this request?',
                    icon: <ExclamationCircleFilled />,
                    onOk() {
                      updateStatusTutorRequest({
                        variables: {
                          input: {
                            id: String(record.id),
                            status: TutorRequestStatus.Accepted,
                          },
                        },
                      }).then(() => {
                        toastUpdateSuccess()
                        refetch()
                      })
                    },
                  })
                }
              />
            </Tooltip>
            <Tooltip title="Reject">
              <StopOutlined
                className="text-[#f5222d] text-lg"
                onClick={() =>
                  Modal.confirm({
                    title: 'Are you sure to reject this request?',
                    icon: <ExclamationCircleFilled />,
                    onOk() {
                      updateStatusTutorRequest({
                        variables: {
                          input: {
                            id: String(record.id),
                            status: TutorRequestStatus.Rejected,
                          },
                        },
                      }).then(() => {
                        toastUpdateSuccess()
                        refetch()
                      })
                    },
                  })
                }
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
        dataSource={convertTutorRequestItems(data?.tutorRequests?.items as TutorRequest[])}
        size="large"
        tableLayout="fixed"
        scroll={{ y: '70vh' }}
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: data?.tutorRequests?.meta?.totalItems,
          pageSize: data?.tutorRequests?.meta?.itemsPerPage,
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

export default TutorRequests
