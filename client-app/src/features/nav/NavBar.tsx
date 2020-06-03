import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import '../../app/layout/styles.css'

interface IProps {
    openCreateForm: () => void

}

const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt="Logo" style={{ marginRight: '10px' }} />
                        Reactivities
                </Menu.Item >
                <Menu.Item name='Acivities' />
                <Menu.Item>
                    <Button onClick={openCreateForm} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
