import React from 'react';
import {Header} from "./components/Header";
import FormOrder from "./components/FormOrder";
import MyMap from "./components/MyMap";
import {Container, Row, Col, Button} from "react-bootstrap";
import {connect} from "react-redux";
import DriverCard from "./components/driverCard";
import logo from "./logo.png";
import {getUniqueKey} from "./utilities";
import {prepareOrder} from "./redux/actions";


const App:React.FC = (props) => {

    //@ts-ignore
    const {isError, errorText, street, house, drivers, setOrder, orders, lat, lon} = props

    const orderHandler = () => {
        const crew_id = drivers[0].crew_id
        const address = street + ', ' + house
        setOrder(crew_id, address, lat, lon)
    }

    console.log(orders)

    const carList = () => {
        if (drivers?.length) {
            return (
                drivers.map((i:any) =>
                    <Row key={getUniqueKey()}
                         className="row bg-light border-bottom border-secondary justify-content-around align-items-center p-2">
                        <Col xs={2} className="">
                            <img src={logo} width={40} className='logo' alt='taxi logo'/>
                        </Col>
                        <Col xs={8}>
                            <div>{i.car_mark + ' ' + i.car_model}</div>
                            <div className="small font-italic">{i.car_color}</div>
                        </Col>
                        <Col xs={2} className="badge-dark small rounded-pill">
                            {Math.round(i.distance)}
                        </Col>
                    </Row>
                )
            )
        }
    }

    const carCard = () => {
        if (drivers?.length) {
            return (
                <div className="center m2">
                    <span className="text-secondary small">Подходящий экипаж</span>
                    <DriverCard mark={drivers[0].car_mark}
                                model={drivers[0].car_model}
                                color={drivers[0].car_color}
                                number={drivers[0].car_number}
                    />
                </div>
            )
        }
    }


    return (

        <>
            <Header/>
            <Container>
                <h4 className="center my-2 text-secondary">Заказать такси</h4>
                <FormOrder/>
                {drivers && carCard()}
                <Row>
                    <Col xs='8'>
                        <MyMap/>
                    </Col>
                    <Col>
                        {drivers && carList()}
                    </Col>
                </Row>
                <div className="center w-100 mb-2 mt-2">
                    <Button
                        variant={isError || !house ? "secondary" : "primary"}
                        onClick={orderHandler}
                        disabled={isError || !house}
                    >Заказать
                    </Button>
                </div>
            </Container>
        </>

    );
}

const mapStateToProps = (state: any) => {
    return {
        isError: state.map.address.error.status,
        errorText: state.map.address.error.text,
        street: state.map.address.street,
        house: state.map.address.houseNumber,
        drivers: state.crew,
        orders: state.order,
        lat: state.map.position.lat,
        lon: state.map.position.lon
    }
}

const mapDispatchToProps = {
    setOrder: prepareOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
