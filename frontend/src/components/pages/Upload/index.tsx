import { Button, Form, Input, Upload } from "antd"

interface UploadFormValues {
    name: string
    description: string
    video: File
    preview: File
}

export default function UploadPage() {
    function handleSubmit(values: UploadFormValues) {
        console.log("submit")
        console.log(values)
    }

    return (
        <Form<UploadFormValues> onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input />
            </Form.Item>
            <Form.Item name="video" label="Video">
                <Upload.Dragger />
            </Form.Item>
            <Form.Item name="preview" label="Preview">
                <Upload.Dragger
                    withCredentials
                    action={"http://localhost:8000/api/cdn/upload"}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}

