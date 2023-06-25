import {
  AppstoreAddOutlined,
  AuditOutlined,
  CalendarOutlined,
  FileExclamationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const selectedKey = location.pathname.split('/').at(-1)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="h-screen">
        <Layout className="h-full bg-sider">
          <Content>
            <div className="my-7">
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
                  label: 'Tutor requests',
                  onClick: () => {
                    navigate('/tutor-requests')
                  },
                },
                {
                  key: 'tutor-reports',
                  icon: <FileExclamationOutlined />,
                  label: 'Tutor reports',
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
                  key: 'settings',
                  icon: <SettingOutlined />,
                  label: 'Settings',
                  onClick: () => {
                    navigate('/settings')
                  },
                },
              ]}
            />
          </Content>
          <Footer className="bg-sider"></Footer>
        </Layout>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
