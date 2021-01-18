import React from 'react';
import {Card} from "react-bootstrap";
import logo from '../logo.png'

type Car = {
    mark: string, model: string, color:string, number:string
}

const DriverCard: React.FC<Car> = ({mark, model, color, number}) => {
    return (
        <Card className="w-50 mx-auto mb-2">
            <Card.Body>
                <div className="row justify-content-around">
                    <div className="flex-grow-0 p-2">
                        <img src={logo} width={50} className='logo' alt='taxi logo'/>
                    </div>
                    <div className="flex-grow-1 p-2">
                        <div className="text-dark">{mark + model}</div>
                        <div className="text-secondary">{color}</div>
                        <div className="mx-auto w-50 badge-warning rounded-pill">{number}</div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}


export default DriverCard;
