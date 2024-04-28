import { Typography } from "antd"
import styles from "./styles.module.scss"
import SigninForm from "./SigninForm"

export default function Signin() {
    return (
        <div className={styles["signin-wrapper"]}>
            <Typography.Text className={styles["signin-message"]}>
                Singin to your account
            </Typography.Text>
            <SigninForm />
        </div>
    )
}

