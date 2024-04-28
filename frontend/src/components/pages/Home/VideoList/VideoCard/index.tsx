import styles from "./styles.module.scss"
import mockPreview1 from "@/static/images/mock-preview-1.jpg"

export default function VideoCard() {
    return (
        <div className={styles["card-wrapper"]}>
            <img className={styles["preview"]} src={mockPreview1} />
            <div className={styles["title"]}>What a wonderful title!</div>
            <div className={styles["stats"]}>
                <div>30k views · 3 days ago</div>
                <div>Jane Doe</div>
            </div>
        </div>
    )
}

