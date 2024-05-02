import { authStore } from "@/store/auth"
import { SigninDto } from "@/types/models/auth/dto/SigninDto"
import { Button, Form, Input } from "antd"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"

function SigninFormComponent() {
    const navigate = useNavigate()

    function handleSubmit(values: SigninDto) {
        authStore.signin(values).then(() => navigate("/"))
    }

    return (
        <Form
            layout="vertical"
            className={styles["signin-form"]}
            onFinish={handleSubmit}
        >
            <Form.Item label="Email" name="email">
                <Input type="email" />
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
const SigninForm = observer(SigninFormComponent)
export default SigninForm

