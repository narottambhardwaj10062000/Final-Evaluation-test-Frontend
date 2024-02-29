import React, { useEffect } from 'react'
// import './Settings.css';
import styles from "./SettingsPage.module.css";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// import Setting from './forms/Setting';

export default function SettingsPage() {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch({ type: "SELECTED_MENU", payload: 'Settings' });
    // })

    return (
        <div className={styles.settingContainer}>
            <div className={styles.settingHeader}>Settings</div>
            <div className={styles.settingForm}>
                {/* <Setting /> */}
            </div>
        </div>
    )
}