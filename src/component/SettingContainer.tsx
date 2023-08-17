import GlassmorphismCard from "./GlassmorphismCard.tsx";
import styles from './VideoContainer.module.scss'

export default function SettingContainer() {
    const alerts = ['Sitting', 'Drinking', 'Staring', 'Posturing']
    const waterMethod = ["By frequency", "By water intake"]

    return <div className={`${styles.videoContainer} fixed bottom-[110px] left-[20px]`}>
        <GlassmorphismCard>
            <div className={'w-[400px] p-[20px]'}>
                <div className={'text-thePrimary mb-[10px]'}>ALERT</div>
                <div className={'grid grid-cols-4 gap-[10px]'}>
                    {
                        ...alerts.map(item =>  <div className={'h-[40px] cursor-pointer text-[12px] border border-thePrimary flex items-center justify-center text-white'}>{item}</div>)
                    }
                </div>
                <div className={'text-thePrimary mb-[10px]  mt-[16px]'}>WATER ESTIMATION METHOD</div>
                <div className={'grid grid-cols-2 gap-[10px] mb-[10px]'}>
                    <div className={'h-[40px] text-[12px] border border-thePrimary cursor-pointer flex items-center justify-center text-white'}>{waterMethod[0]}</div>
                    <div className={'h-[40px] text-[12px] border border-b-gray-400 cursor-pointer flex items-center justify-center text-gray-400'}>{waterMethod[1]}</div>
                </div>
            </div>
        </GlassmorphismCard>
    </div>
}
