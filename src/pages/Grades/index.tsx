import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Table, Tooltip } from 'antd'
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { DEFAULT_LIMIT_ITEMS } from '../../common/constants'
import Loading from '../../components/Loading'
import { Grade, useGradesQuery } from '../../graphql/generated/graphql'

interface GradeItemDataType {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

type GradeItemDataIndex = keyof GradeItemDataType

const convertUserItems = (grades: Grade[]) => {
  return grades.map<GradeItemDataType>((item) => ({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))
}

const Grades = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [page, setPage] = useState(1)

  const searchInput = useRef<InputRef>(null)

  const { data, loading, refetch } = useGradesQuery({
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
    dataIndex: GradeItemDataIndex
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

  const getColumnSearchProps = (dataIndex: GradeItemDataIndex): ColumnType<GradeItemDataType> => ({
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

  const columns: ColumnsType<GradeItemDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
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

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="py-5 px-4 flex justify-end">
        <Button
          type="primary"
          icon={<PlusOutlined className="inline-block align-middle" />}
          // onClick={() => {
          //   setOpenCreateModal(true)
          // }}
        >
          <span>
            <p className="font-medium">Create</p>
          </span>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={convertUserItems(data?.grades?.items as Grade[])}
        size="large"
        tableLayout="fixed"
        scroll={{ y: '60vh' }}
        pagination={{
          defaultCurrent: 1,
          current: page,
          total: data?.grades?.meta?.totalItems,
          pageSize: data?.grades?.meta?.itemsPerPage,
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

export default Grades
