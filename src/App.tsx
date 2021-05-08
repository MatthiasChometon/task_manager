import React from 'react';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import routes from './config/routes';
import axios from 'axios';

axios.defaults.baseURL = 'https://6091661250c25500176781bb.mockapi.io';

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Container className="mt-5 mb-5">
            <Switch>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props: RouteComponentProps<any>) => (
                      <route.component
                        name={route.name}
                        {...props}
                        {...route.props}
                      />
                    )}
                  />
                );
              })}
            </Switch>
          </Container>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}
export default App;