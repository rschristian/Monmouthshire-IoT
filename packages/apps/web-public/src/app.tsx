import preact, { h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, route, Route, Router, RouterOnChangeArgs } from 'preact-router';
import { jwtService } from 'ts-api-toolkit';

import Home from 'routes/home';
import Login from 'routes/login';
import Register from 'routes/register';

export const App: preact.FunctionalComponent = () => {
    const [currentUrl, setCurrentUrl] = useState<string>(getCurrentUrl());

    const publicRoutes = ['/register', '/login'];

    const authGuard = (): void => {
        if (!publicRoutes.includes(currentUrl) && jwtService.getToken() == null) {
            // TODO: Necessary until https://github.com/preactjs/preact-router/issues/357 is resolved
            setTimeout(() => route('/login'));
        }
    };

    return (
        <div id="app">
            {authGuard()}
            <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Router>
        </div>
    );
};
