import { Typography } from "antd"
import styles from "./styles.module.scss"
import SignupForm from "./SignupForm"

export default function Signup() {
    return (
        <div className={styles["signin-wrapper"]}>
            <Typography.Text className={styles["signup-message"]}>
                Create a new account
            </Typography.Text>
            <SignupForm />
        </div>
    )
}

