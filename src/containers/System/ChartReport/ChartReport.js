import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ChartReport.scss';
import {
    BarChart,
    Bar,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ComposedChart,
} from 'recharts';

class ChartReport extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let dataMonth = [
            {
                name: 'Tháng 10',
                Patient: 4000,
                Revenue: 2400,
                amt: 2400,
            },
            {
                name: 'Tháng 11',
                Patient: 3000,
                Revenue: 1398,
                amt: 2210,
            },
            {
                name: 'Tháng 12',
                Patient: 5000,
                Revenue: 9800,
                amt: 2290,
            },
            {
                name: 'Tháng 1',
                Patient: 4780,
                Revenue: 5908,
                amt: 2000,
            },
            {
                name: 'Tháng 2',
                Patient: 9890,
                Revenue: 8800,
                amt: 2181,
            },
            {
                name: 'Tháng 3',
                Patient: 2390,
                Revenue: 3800,
                amt: 2500,
            },
            {
                name: 'Tháng 4',
                Patient: 3490,
                Revenue: 4300,
                amt: 2100,
            },
        ];
        let dataSpecialty = [
            {
                name: 'Cơ xương khớp',
                Completed: 4000,
                Scheduled: 4200,
                amt: 2400,
            },
            {
                name: 'Thần kinh',
                Completed: 3000,
                Scheduled: 3980,
                amt: 2210,
            },
            {
                name: 'Hô Hấp',
                Completed: 7000,
                Scheduled: 9800,
                amt: 2290,
            },
            {
                name: 'Tim mạch',
                Completed: 2780,
                Scheduled: 3908,
                amt: 2000,
            },
            {
                name: 'Tai mũi họng',
                Completed: 3890,
                Scheduled: 4800,
                amt: 2181,
            },
            {
                name: 'Da liễu',
                Completed: 2390,
                Scheduled: 3800,
                amt: 2500,
            },
            {
                name: 'Tiêu hóa',
                Completed: 3490,
                Scheduled: 4300,
                amt: 2100,
            },
        ];

        let dataAge = [
            {
                name: '0-5',
                Scheduled: 4000,
                Patient: 6200,
                amt: 2400,
            },
            {
                name: '5-15',
                Scheduled: 3000,
                Patient: 2980,
                amt: 2210,
            },
            {
                name: '15-22',
                Scheduled: 7000,
                Patient: 3800,
                amt: 2290,
            },
            {
                name: '22-30',
                Scheduled: 2780,
                Patient: 3908,
                amt: 2000,
            },
            {
                name: '30-40',
                Scheduled: 3890,
                Patient: 4800,
                amt: 2181,
            },
            {
                name: '50-60',
                Scheduled: 2390,
                Patient: 6800,
                amt: 2500,
            },
            {
                name: '>60',
                Scheduled: 3490,
                Patient: 9300,
                amt: 2100,
            },
        ];
        return (
            <>
                <div className="chart-container">
                    <div className="chart-rate-month chart">
                        <h2>Tỉ lệ bệnh nhân và doanh thu theo tháng</h2>
                        <LineChart
                            width={800}
                            height={300}
                            data={dataMonth}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Revenue"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                            <Line type="monotone" dataKey="Patient" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                    <div className="chart-specialty chart">
                        <h2>Tỉ lệ người bệnh đặt lịch theo từng chuyên khoa</h2>
                        <BarChart
                            width={800}
                            height={300}
                            data={dataSpecialty}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Scheduled" fill="#8884d8" />
                            <Bar dataKey="Completed" fill="#82ca9d" />
                        </BarChart>
                    </div>
                    <div className="chart-age chart">
                        <h2>Tỉ lệ bệnh nhân đặt lịch theo từng độ tuổi</h2>
                        <ComposedChart
                            width={800}
                            height={400}
                            data={dataAge}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" scale="band" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Patient" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="Patient" stroke="#ff7300" />
                        </ComposedChart>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartReport);
