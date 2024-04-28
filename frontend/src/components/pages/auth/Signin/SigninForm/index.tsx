import { Button, Form, Input } from "antd"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom"

export default function SigninForm() {
    const navigate = useNavigate()

    return (
        <Form layout="vertical" className={styles["signin-form"]}>
            <Form.Item label="Email">
                <Input type="email" />
            </Form.Item>
            <Form.Item label="Password">
                <Input.Password type="password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" className={styles["submit-button"]}>
                    Let me in
                </Button>
                <Button
                    type="default"
                    ghost
                    onClick={() => navigate("../signup")}
                >
                    Create new accounnt
                </Button>
            </Form.Item>
        </Form>
    )
}

