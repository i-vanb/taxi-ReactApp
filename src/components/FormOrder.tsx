import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import {checkAddress, getCrew, reverseGeocoding, setAddress, setPosition, toggleGeocode} from "../redux/actions";
import {connect} from "react-redux";
import {getUniqueKey} from "../utilities";


const FormOrder: React.FC = (props) => {
// @ts-ignore
    const {isError, errorText, house, street, isReverseGeocode, setGeocode, getAddresses, suggestions, setPosition, setNewAddress, getDriver, drivers} = props
    const [address, setAddress] = useState<string>('')
    const [isShowPrompt, setIsShowPrompt] = useState<boolean>(false)

    const setAddressHandler = (addressObj:any) => {
        const {address, position} = addressObj
        setAddress(address.street + ', ' + address.houseNumber)
        setNewAddress(address.street, address.houseNumber)
        setPosition({lat: position.lat, lon: position.lng})
        getDriver(position.lat, position.lng)
        setGeocode(true)
    }

    const changeAddressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
        getAddresses(event.target.value)
    }

    const changeGeocodeDirection = () => {
        setIsShowPrompt(true)
        if(isReverseGeocode) {
            setGeocode(false)
            setAddress(street+', '+ house)
        }
    }

    return (
        <Form>
            <Form.Group className='position-relative' controlId="formBasicEmail">
                <Form.Label>Откуда</Form.Label>
                <Form.Control
                    onChange={changeAddressHandler}
                    onFocus={changeGeocodeDirection}
                    onMouseOut={()=> {
                        setTimeout(()=>setIsShowPrompt(false), 100)
                    }}
                    value={isReverseGeocode? street+', '+ house : address}
                    type="text"
                    placeholder="Улица, дом"
                    autoComplete="off"
                />
                {/* @ts-ignore*/}
                {isShowPrompt && suggestions.map(i => {
                    return (
                        <div onClick={()=>setAddressHandler(i)}
                            key={getUniqueKey()} className='bg-transparent position-absolute w-100 bg-light text-secondary border-bottom'>{
                            i.address.street + ', ' + i.address.houseNumber
                        }</div>)})}
                <Form.Text className="text-muted">
                    <div className="w-100 text-right">
                        {isError ? <span className="badge-warning">{errorText}</span> :
                            isShowPrompt && suggestions.length && address ?
                                <span>&nbsp;</span> : isReverseGeocode?'':'адрес не найден'
                        }
                    </div>
                </Form.Text>
            </Form.Group>
        </Form>
    )}

const mapStateToProps = (state: any) => {
    return {
        isError: state.map.address.error.status,
        errorText: state.map.address.error.text,
        street: state.map.address.street,
        house: state.map.address.houseNumber,
        isReverseGeocode: state.map.settings.isReverseGeocode,
        suggestions: state.map.suggestions,
        drivers: state.crew
    }
}

const mapDispatchToProps = {
    setPosition,
    setNewAddress: setAddress,
    getDriver: getCrew,
    getAddresses: checkAddress,
    setGeocode: toggleGeocode,

}

export default connect(mapStateToProps, mapDispatchToProps)(FormOrder)
