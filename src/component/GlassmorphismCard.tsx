import {ReactNode} from "react";
import styles from './GlassmorphismCard.module.scss'

export default function GlassmorphismCard(props: {children: ReactNode}) {
    return <div className={styles.card}>{props.children}</div>
}
