import {
    CheckOutlined,
    CloseOutlined,
    CommentOutlined,
} from "@ant-design/icons"
import { Avatar, Button, Input, InputRef, message } from "antd"
import styles from "./styles.module.scss"
import { useEffect, useRef, useState } from "react"
import { CommentsService } from "@/api/comments/CommentService"
import { commentsStore } from "@/store/comments"

interface AddCommentProps {
    videoId: string
}

export default function AddCommnet({ videoId }: AddCommentProps) {
    const [isEditing, setEditing] = useState<boolean>(false)
    const [comment, setComment] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)

    const inputRef = useRef<InputRef>(null)

    function handleInputFocus() {
        setEditing(true)
    }

    function handleCancel() {
        setComment("")
        setEditing(false)
    }

    async function addComment() {
        try {
            setLoading(true)
            await CommentsService.create({ text: comment, videoId })
            commentsStore.invalidate()
        } catch (error) {
            message.error(
                "An error occured while submitting your comment. Try again later"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!inputRef.current) {
            return
        }
        const input = inputRef.current.input
        input?.addEventListener("focus", handleInputFocus)

        return () => {
            input?.removeEventListener("focus", handleInputFocus)
        }
    }, [])

    return (
        <div className={styles["add-comment-wrapper"]}>
            <Avatar icon={<CommentOutlined />} />
            <Input
                variant="borderless"
                placeholder="Add a comment..."
                ref={inputRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            {isEditing && (
                <>
                    <Button
                        icon={<CheckOutlined />}
                        shape="circle"
                        onClick={addComment}
                        loading={isLoading}
                    />
                    <Button
                        icon={<CloseOutlined />}
                        shape="circle"
                        disabled={isLoading}
                        onClick={handleCancel}
                    />
                </>
            )}
        </div>
    )
}

