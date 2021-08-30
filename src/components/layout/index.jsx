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
import whiteLogo from '../../styles/images/whiteLogo.png'
import { Card } from 'primereact/card';

const Layout = (props) => {

    return (
        <main style={{ display: 'flex', height: '100%', width: '100%' }}>
            <menu style={{ width: '10%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(90deg,#ff773b,#ff8e24 35%,#ff8e24)' }}>
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
            <Card title={props.title} style={{ width: '90%' }}>
                {props.children}
            </Card>
        </main>
    )
}

export default Layout;