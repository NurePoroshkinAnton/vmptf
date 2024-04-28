import authBanner from "@/static/images/signin-banner.svg"
import { Typography } from "antd"
import styles from "./styles.module.scss"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
    return (
        <div className={styles["auth-layout"]}>
            <div className={styles["content-wrapper"]}>
                <Typography.Title>Welcome to MyTube!</Typography.Title>
                <Outlet />
            </div>
            <div className={styles["auth-banner-wrapper"]}>
                <img src={authBanner} className={styles["auth-banner"]} />
            </div>
        </div>
    )
}

