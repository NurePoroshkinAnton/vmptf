import { CommentsService } from "@/api/comments/CommentService"
import { authStore } from "@/store/auth"
import { commentsStore } from "@/store/comments"
import { Comment } from "@/types/models/comments/Comment"
import { getCreatedAtCaption } from "@/utils/getCreatedAtCaption"
import { CloseOutlined } from "@ant-design/icons"
import { Button, message } from "antd"
import styles from "./styles.module.scss"

interface CommentCardProps {
    comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
    const user = authStore.user

    async function removeComment() {
        try {
            await CommentsService.remove(comment.id)
            commentsStore.invalidate()
        } catch (error) {
            message.error(
                "An error occured while removing a comment. Try again later."
            )
        }
    }

    return (
        <div className={styles["comment-card"]}>
            <div className={styles["caption"]}>
                <b>{comment.user.nickname}</b> ·{" "}
                {getCreatedAtCaption(comment.createdAt)}
                {comment.user.id === user?.id && (
                    <Button
                        icon={<CloseOutlined />}
                        shape="circle"
                        type="text"
                        onClick={removeComment}
                        className={styles["remove-button"]}
                    />
                )}
            </div>
            <div>{comment.text}</div>
        </div>
    )
}

