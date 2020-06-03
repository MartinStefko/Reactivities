import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import '../../app/layout/styles.css'

const NavBar = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt="Logo" style={{ marginRight: '10px' }} />
                        Reactivities
                </Menu.Item >
                <Menu.Item name='Acivities' />
                <Menu.Item>
                    <Button positive content='friends' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
