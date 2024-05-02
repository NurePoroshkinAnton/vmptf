import { authStore } from "@/store/auth"
import { SignupDto } from "@/types/models/auth/dto/SignupDto"
import { Button, Form, Input } from "antd"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"

function SignupFormComponent() {
    const navigate = useNavigate()

    function handleSubmit(values: SignupDto) {
        authStore.signup(values).then(() => navigate("/"))
    }

    return (
        <Form
            layout="vertical"
            className={styles["signup-form"]}
            onFinish={handleSubmit}
        >
            <Form.Item label="Nickname" name="nickname">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input.Password type="password" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles["submit-button"]}
                >
                    Signup
                </Button>
                <Button
                    type="default"
                    ghost
                    onClick={() => navigate("../signin")}
                >
                    Use existing account
                </Button>
            </Form.Item>
        </Form>
    )
}

const SignupForm = observer(SignupFormComponent)
export default SignupForm

