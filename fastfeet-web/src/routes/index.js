import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Router';
import Signin from '../pages/Signin/index';
import Orders from '../pages/Orders/index';
import OrderForm from '../pages/OrderForm/index';
import DeliveryMan from '../pages/DeliveryMan';
import DeliveryManForm from '../pages/DeliveryManForm';
import Recipient from '../pages/Recipient';
import RegistrationForm from '../pages/RecipientForm';

import Problem from '../pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/deliveryman" exact component={DeliveryMan} isPrivate />
      <Route path="/recipients" exact component={Recipient} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />
      <Route path="/orders/orderform" component={OrderForm} isPrivate />
      <Route
        path="/recipients/recipientform"
        component={RegistrationForm}
        isPrivate
      />
      <Route
        path="/deliveryman/deliverymanform"
        component={DeliveryManForm}
        isPrivate
      />

      <Route path="/" component={() => <h1>404 Page not found</h1>} />
    </Switch>
  );
}
