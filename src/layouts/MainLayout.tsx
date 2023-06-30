import {
  AppstoreAddOutlined,
  AuditOutlined,
  BookOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileExclamationOutlined,
  IdcardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import useAuthenication from '../hooks/useAuthentication'
import { DEFAULT_AVATAR } from '../common/constants'

const MainLayout = () => {
  const { currentUser } = useContext(AuthContext)
  const { handleLogout } = useAuthenication()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const selectedKey = location.pathname.split('/').at(-1)

  return (
    <Layout hasSider>
      <Sider trigger={null} collapsible collapsed={collapsed} className="bg-sider h-screen">
        <div className="my-8">
          <img src="../../logo-white-text.svg" alt="logo" className="w-40 m-auto px-2" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          className="bg-sider"
          selectedKeys={[selectedKey === '' ? 'dashboard' : selectedKey || '']}
          items={[
            {
              key: 'dashboard',
              icon: <AppstoreAddOutlined />,
              label: 'Dashboard',
              onClick: () => {
                navigate('/')
              },
            },
            {
              key: 'users',
              icon: <UserOutlined />,
              label: 'Users',
              onClick: () => {
                navigate('/users')
              },
            },
            {
              key: 'tutor-requests',
              icon: <AuditOutlined />,
              label: 'Tutor Requests',
              onClick: () => {
                navigate('/tutor-requests')
              },
            },
            {
              key: 'tutor-reports',
              icon: <FileExclamationOutlined />,
              label: 'Tutor Reports',
              onClick: () => {
                navigate('/tutor-reports')
              },
            },
            {
              key: 'courses',
              icon: <CalendarOutlined />,
              label: 'Courses',
              onClick: () => {
                navigate('/courses')
              },
            },
            {
              key: 'payments',
              icon: <DollarOutlined />,
              label: 'Payments',
              onClick: () => {
                navigate('/payments')
              },
            },
            {
              key: 'grades',
              icon: <IdcardOutlined />,
              label: 'Grades',
              onClick: () => {
                navigate('/grades')
              },
            },
            {
              key: 'subjects',
              icon: <BookOutlined />,
              label: 'Subjects',
              onClick: () => {
                navigate('/subjects')
              },
            },
          ]}
        />
      </Sider>
      <Content>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: 'sticky',
              zIndex: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              placement="bottom"
              menu={{
                items: [
                  {
                    key: '0',
                    label: (
                      <Link to="/profile/general">
                        <p className="px-1 font-light text-sm my-1">Edit profile</p>
                      </Link>
                    ),
                  },
                  {
                    key: '1',
                    label: (
                      <Link to="/profile/change-password">
                        <p className="px-1 font-light text-sm my-1">Change password</p>
                      </Link>
                    ),
                  },
                  {
                    key: '2',
                    danger: true,
                    label: <p className="px-1 font-light text-sm my-1">Log out</p>,
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              <div className="inline-flex flex-row items-center gap-3 mr-5">
                <p className="font-semibold">{currentUser?.fullName}</p>
                <img
                  src={currentUser?.avatar || DEFAULT_AVATAR}
                  className="rounded-full h-[40px] w-[40px]"
                />
              </div>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: '12px 12px',
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default MainLayout
