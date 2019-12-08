import React, {useEffect, useState} from 'react';
import {HorizontalGridLines, LineMarkSeries, XAxis, XYPlot, YAxis,} from 'react-vis';

import {timeFormat, HintFormatter, HintType} from 'components/graphs/utility/HintFormatter';
import {SensorData} from 'stores/SensorDataStore';

import './Graphs.scss';


interface IProps {
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
    height: number;
    width: number;
    data: SensorData[];
}

interface RoomData {
    data: FormattedData[];
}

export interface FormattedData {
    x: Date;
    y: number;
}

const xAxisFormat: React.FC<Date> = (time: Date) => {
    time = new Date(time);
    return (
        <tspan>
            <tspan x="0" dy="1em">{timeFormat(time)}</tspan>
        </tspan>
    );
};

export const LineGraph: React.FC<IProps> = (props: IProps) => {
    const [hint, setHint] = useState();
    const [data, setData] = useState();
    const [loadingFinished, setLoadingFinished] = useState(false);

    useEffect(() => {
        if (props.data !== undefined) {
            props.data.forEach((room) => {
                const tempArray: RoomData = { data:[] };
                room.data.forEach((value) => {
                    tempArray.data.push({ x: value.timestamp, y: value.value });
                });
                setData((oldData: RoomData[]) => {
                    if (oldData) return [...oldData, tempArray];
                    else return [tempArray];
                });
            });
            setLoadingFinished(true);
        }
    }, [props.data]);

    return (
        <div>
            <h1>{props.title}</h1>
            <XYPlot
                width={props.width}
                height={props.height}
                margin={{right: 20}}>
                <HorizontalGridLines />

                {loadingFinished &&
                    data.map((roomData: RoomData, index: number) => {
                        return (
                            <LineMarkSeries
                                key={index}
                                data={roomData.data}
                                onValueMouseOver={(hint: FormattedData): void => setHint(hint)}
                                onSeriesMouseOut={(): void => setHint('')}
                            />
                        );
                    })
                }

                <XAxis title={props.xAxisTitle} tickFormat={xAxisFormat}/>
                <YAxis title={props.yAxisTitle} />
                {hint ? HintFormatter({values: hint, type: HintType.LineGraphDate}) : null}
            </XYPlot>
        </div>
    );
};
