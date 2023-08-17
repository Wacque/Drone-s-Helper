import ReactECharts from 'echarts-for-react';
import {ActivityItem} from "./MainContent.tsx";
import {AppContext} from "../provider/AppProvider.tsx";
import {useContext} from "react";
import {convertMilliseconds} from "./StreamItem.tsx";
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
                    breadcrumb: false,
                    tooltip: {
                        backgroundColor: "black",
                        textStyle: {
                          color: "white",
                          fontFamily: "Roboto Mono"
                        },
                        itemStyle: {
                          backgroundColor: "black"
                        },
                        formatter: function (params: any) {
                            return (
                                params.data.name + " duration " +
                                convertMilliseconds(params.data.value)
                            );
                        }
                    },
                    data: convertToDataItemList(activities),
                    label: {
                        position: 'insideTopLeft',
                        fontFamily: "Roboto Mono",
                    },

                    levels: [
                        {
                            itemStyle: {
                                borderColor: '#fff',
                            },

                            color: [
                                "hsl(36, 100%, 40%)",
                                "hsl(36, 91.11111111111111%, 35.55555555555556%)",
                                "hsl(36, 82.22222222222223%, 31.111111111111107%)",
                                "hsl(36, 73.33333333333333%, 26.666666666666663%)",
                                "hsl(36, 64.44444444444444%, 22.222222222222214%)",
                                "hsl(36, 55.55555555555556%, 17.77777777777778%)",
                                "hsl(36, 46.666666666666664%, 13.33333333333333%)",
                                "hsl(36, 37.77777777777778%, 8.888888888888882%)",
                                "hsl(36, 28.88888888888889%, 4.444444444444445%)",
                                "hsl(36, 20%, 0%)"
                            ]
                        }
                    ],
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
