// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Calendar from 'routes/Calendar';
import WorkOrders from 'routes/WorkOrders';
import Properties from 'routes/Properties';
import HouseManagers from 'routes/HouseManagers';
import Vendors from 'routes/Vendors';
import EmailTemplates from 'routes/EmailTemplates';
import Users from 'routes/Users';
import s from './style.scss';

const MainSection = () => (
  <div className={s.MainSection}>
    <Switch>
      <Route path="/calendar" component={Calendar} />
      <Route path="/workOrders" component={WorkOrders} />
      <Route path="/properties" component={Properties} />
      <Route path="/houseManagers" component={HouseManagers} />
      <Route path="/vendors" component={Vendors} />
      <Route path="/emailTemplates" component={EmailTemplates} />
      <Route path="/users" component={Users} />
      <Route component={() => <div>Not found</div>} />
    </Switch>
  </div>
);

export default MainSection;
