import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Create</Nav.Link>
                        <Nav.Link as={Link} to="/OnSale">On Sale</Nav.Link>

                    </Nav>
                    <Nav>
                        {account ? (

                            <Button variant="outline-light">
                                {account.slice(0, 5) + '...' + account.slice(38, 42)}
                            </Button>


                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;