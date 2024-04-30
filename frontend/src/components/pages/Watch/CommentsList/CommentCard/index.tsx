import styles from "./styles.module.scss"

export default function CommentCard() {
    return (
        <div className={styles["comment-card"]}>
            <div style={{ marginBottom: "2px" }}>
                <b>Rick Astley</b> · 2y ago
            </div>
            <div>
                1 BILLION views for Never Gonna Give You Up! Amazing, crazy,
                wonderful!
            </div>
        </div>
    )
}

