import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {SingIn} from '../pages/SignIn';

const AuthRoutes: React.FC = () => (
    <Switch>
        <Route component={SingIn} />
    </Switch>
);

export default AuthRoutes;