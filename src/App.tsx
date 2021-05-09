import React from 'react';
import Navbar from "./components/navbar/NavApp";
import Footer from "./components/footer/Footer";
import Container from 'react-bootstrap/Container';
import { HashRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import Routes from './config/Routes';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/style/globalStyles";
import { blueTheme, greenTheme } from "./config/style/Themes"
import axios from 'axios';

axios.defaults.baseURL = 'https://6091661250c25500176781bb.mockapi.io';

interface IState {
  theme: string
}

class App extends React.Component<IState> {
  readonly state = { theme: 'blue' };

  themeToggler = (newTheme: string) => {
    this.setState({
      theme: newTheme
    })
  }
  render() {
    return (
      <div>
        <ThemeProvider theme={this.state.theme === 'blue' ? blueTheme : greenTheme}>
          <>
            <GlobalStyles />
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
                          setNewTheme={this.themeToggler}
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
          </>
        </ThemeProvider>
      </div>
    )
  }
}
export default App;