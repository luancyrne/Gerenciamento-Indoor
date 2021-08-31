import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../../styles/css/layout.css';
import 'antd/dist/antd.css';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { FiHome, FiUsers } from 'react-icons/fi';
import { FaProjectDiagram } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import whiteLogo from '../../styles/images/whiteLogo.png';
import { Typography } from 'antd';

const { Title } = Typography;

const Layout = (props) => {

    return (
        <main style={{ display: 'flex', height: '100%', width: '100%' }}>
            <menu style={{minWidth:'200px', width: '10%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(90deg,#ff773b,#ff8e24 35%,#ff8e24)' }}>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <img style={{ width: '100px', margin: '20px' }} src={whiteLogo} alt="CNX Telecom - Você sempre conectado!" />
                </div>
                <Navigation
                    activeItemId="/management/members"
                    onSelect={({ itemId }) => {
                    }}
                    items={[
                        {
                            title: 'Dashboard',
                            itemId: '/dashboard',
                            elemBefore: () => <FiHome />,
                        },
                        {
                            title: 'Management',
                            itemId: '/management',
                            elemBefore: () => <FiUsers />,
                            subNav: [
                                {
                                    title: 'Projects',
                                    itemId: '/management/projects',
                                    elemBefore: () => <FaProjectDiagram />,
                                },
                                {
                                    title: 'Members',
                                    itemId: '/management/members',
                                    elemBefore: () => <MdCardMembership />,
                                },
                            ],
                        },
                        {
                            title: 'Another Item',
                            itemId: '/another',
                            subNav: [
                                {
                                    title: 'Teams',
                                    itemId: '/management/teams',
                                },
                            ],
                        },
                    ]}
                />
            </menu>
            <div style={{ height: '96.9%', width: '100%', marginLeft: '30px', marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
                <div>
                    <Title level={3}>{props.title}</Title>
                </div>
                {props.children}
            </div>
        </main>
    )
}

export default Layout;