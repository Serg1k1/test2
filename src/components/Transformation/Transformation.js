import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import useTimeService from '../../services/TransformationService';
import GoogleMaps from './input';
import { getLatLng } from '../../utils/geodecode';

import './transformation.scss';

const Transformation = () => {
    const [currLocation, setCurrLocaction] = useState(null);
    const [neededLocation, setNeededLocation] = useState(null);
    const [timeDifference, setTimeDifference] = useState(null);

    const { getCityTime, loadingStatus } = useTimeService();

    async function getTimeDifference() {
        if (currLocation?.place_id && neededLocation?.place_id) {
            const fromLocation = await getLatLng(currLocation.place_id);
            const toLocation = await getLatLng(neededLocation.place_id);


            const currTime = await getCityTime(fromLocation.latitude, fromLocation.longitude)
            const needTime = await getCityTime(toLocation.latitude, toLocation.longitude)

            const result = needTime.hour - currTime.hour;

            setTimeDifference(result)
        } else {
            setTimeDifference(null)
        }
    }

    useEffect(() => {


    }, [currLocation])

    return (
        <div className="transformation">
            <div className="transformation__container">
                <div className="transformation__inputs">
                    <div className="transformation__input">
                        <h4 className='transformation__input-title' >Select your location</h4>
                        <GoogleMaps setLocation={setCurrLocaction} currPos={true} />
                    </div>

                    <div className="transformation__result">{loadingStatus === 'loading' ? 'loading...' : timeDifference === null ? 'Please fill all the fields' : `${timeDifference} hours the time difference`}</div>
                    <div className="transformation__input">
                        <h4 className='transformation__input-title' >Select needed location</h4>
                        <GoogleMaps setLocation={setNeededLocation} currPos={false} />
                    </div>
                </div>
                <div className="transformation__submit">
                    <Button onClick={getTimeDifference} variant="contained" >Check the difference</Button>
                </div>
            </div>
        </div>
    )

}

export default Transformation;