import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ThemeContext from '../contexts/theme';
import Nav from './Nav';
import Loading from './Loading';

const Popular = lazy(() => import('./Popular'));
const Battle = lazy(() => import('./Battle'));
const Results = lazy(() => import('./Results'));

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme => (theme === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav theme={theme} toggleTheme={toggleTheme} />
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/results' component={Results} />
                <Route render={() => <p>404 Not Found</p>} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
