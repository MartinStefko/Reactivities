import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import "../../app/layout/styles.css";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        {/* NavLink is just Link with activeClassName property for styling */}
        <Menu.Item header as={NavLink} to="/" exact>
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Acivities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
