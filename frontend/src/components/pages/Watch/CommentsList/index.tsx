import { observer } from "mobx-react-lite"
import CommentCard from "./CommentCard"
import { commentsStore } from "@/store/comments"
import styles from "./styles.module.scss"
import AddCommnet from "../AddComment"
import { ReactNode } from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import Intersector from "@/components/utils/Intersector"

function CommentsListComponent() {
    const comments = commentsStore.comments
    const isLoading = commentsStore.isLoading

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
            <div className={styles["count"]}>
                {Math.max(0, commentsStore.total)} Comment
                {commentsStore.total === 1 ? "" : "s"}
            </div>
            <AddCommnet videoId={commentsStore.videoId!} />
            <div className={styles["list-wrapper"]}>{commentsRender}</div>
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
            <Intersector
                callback={async () => {
                    console.log("Intersector")

                    if (!commentsStore.videoId) {
                        return
                    }

                    commentsStore.fetchComments({
                        page: commentsStore.page + 1,
                        perPage: commentsStore.perPage,
                        videoId: commentsStore.videoId,
                    })
                }}
            />
        </div>
    )
}

const CommentsList = observer(CommentsListComponent)
export default CommentsList

