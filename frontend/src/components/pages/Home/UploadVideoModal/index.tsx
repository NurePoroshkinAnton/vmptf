import { Button, Form, Input, Modal, Upload, message } from "antd"
import styles from "./styles.module.scss"
import { useState } from "react"
import { UploadChangeParam, UploadFile } from "antd/es/upload"
import { CdnService } from "@/api/cdn/CdnService"
import { UploadVideoDto } from "@/types/models/videos/dto/UploadVideoDto"
import { VideoService } from "@/api/videos/VideoService"
import { videoStore } from "@/store/videos"

interface UploadVideoModalProps {
    isOpen: boolean
    setOpen: (value: boolean) => void
}

interface UploadFileResponse {
    id: string
}

interface UploadFormValues {
    title: string
}

export function UploadVideoModal({ isOpen, setOpen }: UploadVideoModalProps) {
    const [fileId, setFileId] = useState<string | null>(null)
    const [previewId, setPreviewId] = useState<string | null>(null)
    const [fileUpload, setFileUpload] = useState<UploadFile[]>([])
    const [previewUpload, setPreviewUpload] = useState<UploadFile[]>([])
    const [form] = Form.useForm()

    function beforeUpload(state: string | null) {
        if (state) {
            message.error("You can upload only one file.")
            return false
        }
    }

    async function handleUploadSuccess(
        args: UploadChangeParam<UploadFile<UploadFileResponse>>,
        setState: (value: string | null) => void,
        setFile: (value: UploadFile[]) => void
    ) {
        const { file } = args

        if (file.response) {
            const id = file.response.id
            setState(id)
        }

        setFile([file])
    }

    async function removeUpload(
        uploadId: string | null,
        setState: (value: string | null) => void
    ) {
        if (!uploadId) {
            return false
        }

        try {
            await CdnService.remove(uploadId)
            setState(null)
        } catch (error) {
            message.error("An error occured while removing video")
            return false
        }
    }

    function clearUploads() {
        setFileUpload([])
        setPreviewUpload([])
    }

    async function handleSubmit(values: UploadFormValues) {
        if (!fileId || !previewId) {
            return
        }

        const dto: UploadVideoDto = { ...values, fileId, previewId }
        try {
            await VideoService.upload(dto)
            setFileId(null)
            setPreviewId(null)
            setOpen(false)
            videoStore.invalidate()
            form.setFieldsValue({ title: "" })
            clearUploads()
        } catch (error) {
            message.error("An error occured while uploading video")
        }
    }

    return (
        <Modal
            open={isOpen}
            footer={null}
            onCancel={() => setOpen(false)}
            title="Upload a new video"
        >
            <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Form.Item name="title" label="Title" required>
                    <Input />
                </Form.Item>
                <div className={styles["form-item"]}>
                    <div className={styles["form-label"]}>Video</div>
                    <Upload.Dragger
                        multiple={false}
                        action={`${
                            import.meta.env.VITE_API_BASE_URL
                        }/cdn/upload`}
                        withCredentials
                        onChange={(args) =>
                            handleUploadSuccess(args, setFileId, setFileUpload)
                        }
                        onRemove={() => removeUpload(fileId, setFileId)}
                        maxCount={1}
                        beforeUpload={() => beforeUpload(fileId)}
                        fileList={fileUpload}
                        accept="video/*"
                    />
                </div>
                <div className={styles["form-item"]}>
                    <div className={styles["form-label"]}>Preview</div>
                    <Upload.Dragger
                        multiple={false}
                        action={`${
                            import.meta.env.VITE_API_BASE_URL
                        }/cdn/upload`}
                        withCredentials
                        onChange={(args) =>
                            handleUploadSuccess(
                                args,
                                setPreviewId,
                                setPreviewUpload
                            )
                        }
                        onRemove={() => removeUpload(previewId, setPreviewId)}
                        maxCount={1}
                        beforeUpload={() => beforeUpload(previewId)}
                        accept="image/*"
                        fileList={previewUpload}
                    />
                </div>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{ width: "100%" }}
                        disabled={!(fileId && previewId)}
                    >
                        Upload
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

