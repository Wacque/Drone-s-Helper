import {ReactNode} from "react";
import styles from './GlassmorphismCard.module.scss'

export default function GlassmorphismCard(
    {title, children}: { children: ReactNode, title?: string }
) {
    return <div className={styles.card}>
        {title ? <div className={styles.title}>{title}</div> : null}
        <div>
            {children}
        </div>
    </div>
}
