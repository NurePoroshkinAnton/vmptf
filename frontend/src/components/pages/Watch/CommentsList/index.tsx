import { observer } from "mobx-react-lite"
import CommentCard from "./CommentCard"
import { commentsStore } from "@/store/comments"
import styles from "./styles.module.scss"
import AddCommnet from "../AddComment"
import { ReactNode } from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

function CommentsListComponent() {
    const comments = commentsStore.comments
    const isLoading = commentsStore.isLoading

    if (isLoading) {
        return <div>Loading...</div>
    }

    let commentsRender: ReactNode = (
        <div className={styles["no-comments"]}>
            No comments here :( Be the first one to leave a comment!
        </div>
    )

    if (comments.length > 0) {
        commentsRender = comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
        ))
    }

    return (
        <div className={styles["comments-list-wrapper"]}>
            <div className={styles["count"]}>{comments.length} Comments</div>
            <AddCommnet videoId={commentsStore.videoId!} />
            {commentsRender}
            <Spin
                style={{ width: "100%" }}
                spinning={isLoading}
                indicator={
                    <LoadingOutlined
                        style={{ fontSize: 24 }}
                        spin={isLoading}
                    />
                }
            />
        </div>
    )
}

const CommentsList = observer(CommentsListComponent)
export default CommentsList

