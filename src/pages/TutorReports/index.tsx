import { ExclamationCircleFilled, SearchOutlined, StopOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, InputRef, Modal, Space, Table, Tooltip } from 'antd'
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { DEFAULT_AVATAR, DEFAULT_LIMIT_ITEMS } from '../../common/constants'
import Loading from '../../components/Loading'
import {
  TutorReport,
  useTutorReportsQuery,
  useUpdateBlockStatusUserMutation,
} from '../../graphql/generated/graphql'
import { getFileNameFromUrl } from '../../utils/form'
import { toastUpdateSuccess } from '../../utils/toast'

interface TutorReportItemDataType {
  id: string
  tutor: string
  author: string
  avatarTutor: string
  avatarAuthor: string
  reason: string
  files: string[]
  status: string
  createdAt: Date
  tutorId: string
}

type TutorReportItemDataIndex = keyof TutorReportItemDataType

const convertTutorRequestItems = (reports: TutorReport[]) => {
  return reports.map<TutorReportItemDataType>((item) => ({
    id: item.id,
    tutor: item.tutor.fullName,
    author: item.author.fullName,
    avatarTutor: item.tutor.avatar || DEFAULT_AVATAR,
    avatarAuthor: item.author.avatar || DEFAULT_AVATAR,
    reason: item.reason,
    files: item.files || [],
    status: item.status,
    createdAt: item.createdAt,
    tutorId: item.tutorId,
  }))
}

const TutorReports = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)

  const searchInput = useRef<InputRef>(null)

  const [updateBlockStatusUser] = useUpdateBlockStatusUserMutation()

  const { data, loading, refetch } = useTutorReportsQuery({
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
      },
    },
  })

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: TutorReportItemDataIndex
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
    dataIndex: TutorReportItemDataIndex
  ): ColumnType<TutorReportItemDataType> => ({
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

  const columns: ColumnsType<TutorReportItemDataType> = [
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
      sortDirections: ['descend', 'ascend'],
      render: (value, record) => (
        <div>
          <Avatar src={record.avatarAuthor} alt="Avatar" className="w-14 h-14 rounded-full" />
          <p>{value}</p>
        </div>
      ),
      ...getColumnSearchProps('author'),
    },
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      sorter: (a, b) => a.tutor.length - b.tutor.length,
      sortDirections: ['descend', 'ascend'],
      render: (value, record) => (
        <div>
          <Avatar src={record.avatarTutor} alt="Avatar" className="w-14 h-14 rounded-full" />
          <p>{value}</p>
        </div>
      ),
      ...getColumnSearchProps('tutor'),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      width: '20%',
    },
    {
      title: 'Status',
      width: '10%',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Files',
      dataIndex: 'files',
      render: (value: string[]) => (
        <>
          {value.map((item) => (
            <a href={item} target="_blank" className="italic">
              {getFileNameFromUrl(item)}
            </a>
          ))}
        </>
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
      title: 'Action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <>
            <Tooltip title="Reject">
              <StopOutlined
                className="text-[#f5222d] text-lg"
                onClick={() =>
                  Modal.confirm({
                    title: 'Are you sure to reject this request?',
                    icon: <ExclamationCircleFilled />,
                    onOk() {
                      updateBlockStatusUser({
                        variables: {
                          input: {
                            id: String(record.tutorId),
                            isBlocked: true,
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
        dataSource={convertTutorRequestItems(data?.tutorReports?.items as TutorReport[])}
        size="large"
        tableLayout="fixed"
        scroll={{ y: '70vh' }}
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: data?.tutorReports?.meta?.totalItems,
          pageSize: data?.tutorReports?.meta?.itemsPerPage,
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

export default TutorReports
