import React, {ReactNode} from "react";

function Scroll({list}: {list: Array<ReactNode>}) {
    return <div className={'px-[20px] absolute w-full h-full overflow-y-scroll py-[6px]'}>
        {[...list]}
    </div>
}

export default React.memo(Scroll)
