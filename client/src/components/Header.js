import React from "react";

import { Nav, Navbar, NavbarToggler, Collapse, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { ROLES } from "../shared/consts";

const Header = (props) => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          {context.authUser ? (
            <>
              <Navbar light expand="md">
                <div className="container">
                  <NavbarToggler onClick={props.toggleNav} />
                  <Collapse isOpen={props.isNavOpen} navbar>
                    <Nav navbar>
                      {context.authUser.role === ROLES.TEACHER && (
                        <NavItem>
                          <NavLink className="nav-link" to="/home">
                            Home
                          </NavLink>
                        </NavItem>
                      )}
                      {context.authUser.role === ROLES.TEACHER && (
                        <NavItem>
                          <NavLink className="nav-link" to="/exam/create">
                            Create Exam
                          </NavLink>
                        </NavItem>
                      )}
                      {context.authUser.role === ROLES.TEACHER && (
                        <NavItem>
                          <NavLink className="nav-link" to="/exam/execute">
                            Execute Exam
                          </NavLink>
                        </NavItem>
                      )}
                      {context.authUser.role === ROLES.TEACHER && (
                        <NavItem>
                          <NavLink className="nav-link" to="/exam/showreport">
                            Show Report
                          </NavLink>
                        </NavItem>
                      )}
                      <NavItem>
                        <NavLink
                          className="nav-link"
                          to="/logout"
                          onClick={() => context.logoutUser()}
                        >
                          Logout
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </div>
              </Navbar>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default Header;
