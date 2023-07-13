import { DeleteOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Modal, Space, Table, Tooltip } from 'antd'
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { DEFAULT_AVATAR, DEFAULT_IMG, DEFAULT_LIMIT_ITEMS } from '../../common/constants'
import Loading from '../../components/Loading'
import {
  Course,
  useCoursesQuery,
  useRemoveCourseByAdminMutation,
} from '../../graphql/generated/graphql'
import { toastRemoveSuccess } from '../../utils/toast'
import { minBy } from 'lodash'

interface CourseItemDataType {
  id: string
  name: string
  thumbnail: string
  status: string
  tutorAvatar: string
  tutorName: string
  tutorEmail: string
  grade: string
  subject: string
  createdAt: Date
  updatedAt: Date
}

type CouresItemDataIndex = keyof CourseItemDataType

const convertUserItems = (courses: Course[]) => {
  return courses.map<CourseItemDataType>((item) => ({
    id: item.id,
    thumbnail: item.thumbnail || DEFAULT_IMG,
    name: item.name,
    status: item.status,
    tutorAvatar: item.user?.avatar || DEFAULT_AVATAR,
    tutorName: item.user?.fullName,
    tutorEmail: item.user?.email,
    grade: item.grade.name,
    subject: item.subject.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))
}

const Courses = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)

  const searchInput = useRef<InputRef>(null)

  const { data, loading, refetch } = useCoursesQuery({
    variables: {
      queryParams: {
        pagination: {
          page,
          limit: DEFAULT_LIMIT_ITEMS,
        },
        filters: {
          isPublished: true,
        },
      },
    },
  })

  const [removeCourse] = useRemoveCourseByAdminMutation()

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: CouresItemDataIndex
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
    dataIndex: CouresItemDataIndex
  ): ColumnType<CourseItemDataType> => ({
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

  const columns: ColumnsType<CourseItemDataType> = [
    {
      dataIndex: 'thumbnail',
      width: '7%',
      render: (value: string) => (
        <img src={value} alt="avatar" className="w-14 h-14 rounded-full object-scale-down" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('status'),
    },
    // {
    //   title: 'Start date',
    //   width: '10%',
    //   dataIndex: 'startDate',
    //   sortDirections: ['descend', 'ascend'],
    //   render: (_, record) =>
    //     dayjs(minBy(record?.classes, 'startDate')?.startDate).format('DD/MM/YYYY'),
    // },
    // {
    //   title: 'End date',
    //   width: '10%',
    //   dataIndex: 'endDate',
    //   sorter: (a, b) => +dayjs(a.endDate).isBefore(dayjs(b.endDate)),
    //   sortDirections: ['descend', 'ascend'],
    //   render: (value) => dayjs(value).format('DD/MM/YYYY'),
    // },
    {
      title: 'Grade',
      dataIndex: 'grade',
      sorter: (a, b) => a.grade.length - b.grade.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      sorter: (a, b) => a.subject.length - b.subject.length,
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
      title: 'Updated at',
      dataIndex: 'updatedAt',
      sorter: (a, b) => +dayjs(a.updatedAt).isBefore(dayjs(b.updatedAt)),
      sortDirections: ['descend', 'ascend'],
      render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: '',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <>
            <Tooltip title="Delete">
              <DeleteOutlined
                className="text-red-600 text-lg"
                onClick={() =>
                  Modal.confirm({
                    title: 'Are you sure to delete this course?',
                    icon: <ExclamationCircleFilled className="text-red-600" />,
                    onOk() {
                      removeCourse({
                        variables: {
                          id: String(record.id),
                        },
                      }).then(() => {
                        toastRemoveSuccess()
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
        dataSource={convertUserItems(data?.courses?.items as Course[])}
        size="large"
        tableLayout="fixed"
        scroll={{ y: '70vh' }}
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: data?.courses?.meta?.totalItems,
          pageSize: data?.courses?.meta?.itemsPerPage,
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

export default Courses
