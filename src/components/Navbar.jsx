import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuFoldOutlined, FileOutlined, MenuOutlined } from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = React.useState(true)
    const [screenSize, setScreenSize] = React.useState(null)

    React.useEffect(() => {
        setScreenSize(window.innerWidth)
        const handleResize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    React.useEffect(() => {
        if(screenSize < 760){
            setActiveMenu(false)
        }else{
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                <Button onClick={()=>setActiveMenu(!activeMenu)} className='menu-control-container'>
                    <MenuOutlined/>
                </Button>
            </div>
            {activeMenu && (
                <Menu theme='dark'>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FileOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    {/* <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item> */}
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    )
}

export default Navbar