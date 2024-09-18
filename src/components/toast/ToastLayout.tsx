import React from "react";
import { useDispatch } from "react-redux";
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import { TOAST } from "../../redux/interfaces/toastState.interface";


const ToastProvider = () => {

    const dispatch = useDispatch()

    // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
    const { notifications, dismissNotification } = useNotifications();

    const handleDissmissNoti = (id: string) => {
        dismissNotification(id)
        dispatch({type: TOAST, payload: {}})
    }

    return (
        <div>
        <NotificationsSystem
            // 2. Pass the notifications you want Reapop to display.
            notifications={notifications}
            // 3. Pass the function used to dismiss a notification.
            dismissNotification={(id) => handleDissmissNoti(id)}
            // 4. Pass a builtIn theme or a custom theme.
            theme={atalhoTheme}
        />
        </div>
    );
};

export default ToastProvider;