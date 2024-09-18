import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NotificationsProvider, setUpNotifications } from 'reapop';
import ToastLayout from './components/toast/ToastLayout';

// Config reapop
setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    dismissAfter: 5000,
    showDismissButton: true
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationsProvider>
        <ToastLayout />
        <App />
      </NotificationsProvider>
    </Provider>
  </React.StrictMode>
);

