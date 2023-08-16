import ReactECharts from 'echarts-for-react';
import {ActivityItem} from "./MainContent.tsx";
import {AppContext} from "../provider/AppProvider.tsx";
import {useContext} from "react";
interface DataItem {
    name: string;
    id: number;
    value: number;
}
export default function ActivitiesTreeMap() {
    const {activities} = useContext(AppContext);

    function convertToDataItemList(dataList: ActivityItem[]): DataItem[] {
        const resultMap: { [key: string]: { value: number; id: number } } = {};

        // 遍历数据列表，累计每个标签的时长并记录其 duration 作为 id
        dataList.forEach(data => {
            if (resultMap[data.label]) {
                resultMap[data.label].value += data.duration;
            } else {
                resultMap[data.label] = {
                    value: data.duration,
                    id: data.duration
                };
            }
        });

        // 将累计的时长转换为 DataItem 格式
        const result: DataItem[] = [];
        for (const label in resultMap) {
            result.push({
                name: label,
                value: resultMap[label].value,
                id: resultMap[label].id
            });
        }

        return result;
    }

    const getOption = function () {
        return {
            title: {
                top: 5,
                left: 'center',
                bottom: 5
            },
            tooltip: {},
            series: [
                {
                    type: 'treemap',
                    tooltip: {

                    },
                    data: convertToDataItemList(activities),
                    label: {
                        position: 'insideTopLeft',

                        rich: {
                            budget: {
                                fontSize: 22,
                                lineHeight: 30,
                                color: 'yellow'
                            },
                            household: {
                                fontSize: 14,
                                color: '#fff'
                            },
                            label: {
                                fontSize: 9,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                color: '#fff',
                                borderRadius: 2,
                                padding: [2, 4],
                                lineHeight: 25,
                                align: 'right'
                            },
                            name: {
                                fontSize: 12,
                                color: '#fff'
                            },
                            hr: {
                                width: '100%',
                                borderColor: 'rgba(255,255,255,0.2)',
                                borderWidth: 0.5,
                                height: 0,
                                lineHeight: 10
                            }
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        background: "red"
                    },
                }
            ]
        }
    }

    return <ReactECharts
        style={{width: "100%", height: "100%"}}
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
    />
}
