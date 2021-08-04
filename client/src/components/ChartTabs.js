import { useState } from "react";
import { Card, Row, Tab, Tabs } from "react-bootstrap";
import ChartTemp from './ChartTemp';
import ChartHumidity from './ChartHumidity';
import ChartWindSpeed from './ChartWindSpeed';
import ChartPressure from './ChartPressure';
import '../App.css'

function ChartTabs() {

    const cardstyled = {
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '3px',
        borderRadius: '20px',
        borderColor: 'rgb(110, 189, 142)',
        color: '#04AB70'
    }

    const [key, setKey] = useState('temp');

    //3743011 default

    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3" >
                    <Tab eventKey="temp" title="온도">
                        <ChartTemp />
                    </Tab>
                    <Tab eventKey="humidity" title="습도">
                        <ChartHumidity />
                    </Tab>
                    <Tab eventKey="windspeed" title="풍속">
                        <ChartWindSpeed />
                    </Tab>
                    <Tab eventKey="pressure" title="기압">
                        <ChartPressure />
                    </Tab>
                </Tabs>
            </Card>
        </Row>
    )
}

export default ChartTabs;