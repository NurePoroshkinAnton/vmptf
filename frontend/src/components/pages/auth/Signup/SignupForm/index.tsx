import { Button, Col, Form, Input, Row } from "antd"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom"

export default function SignupForm() {
    const navigate = useNavigate()

    return (
        <Form layout="vertical" className={styles["signup-form"]}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="First name">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Last name">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Email">
                <Input type="password" />
            </Form.Item>
            <Form.Item label="Password">
                <Input.Password type="password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" className={styles["submit-button"]}>
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

