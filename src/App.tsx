import React from 'react';
import Navbar from "./components/navbar/NavApp";
import Footer from "./components/footer/Footer";
import Container from 'react-bootstrap/Container';
import { HashRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import Routes from './config/Routes';
import axios from 'axios';

axios.defaults.baseURL = 'https://6091661250c25500176781bb.mockapi.io';

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <HashRouter >
          <Navbar />
          <Container className="mt-5 mb-5">
            <Switch>
              {Routes.map((route, index) => {
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
        </HashRouter>
      </div>
    )
  }
}
export default App;